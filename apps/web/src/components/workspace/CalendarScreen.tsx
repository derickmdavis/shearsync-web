"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ApiError, getAccountProfile, getCalendarDay, getCalendarSummary, type CalendarAppointment, type CalendarAvailableSlot, type CalendarDay } from "@/src/lib/api";
import { AccountLifecycleError, withActiveAccount } from "@/src/lib/auth/active-account";
import { AppointmentDialog } from "./AppointmentDialog";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

type LoadState = "loading" | "ready" | "error";
type CalendarView = "day" | "week" | "month";
type BookingPrefill = CalendarAvailableSlot & { date: string };
const cache = new Map<string, CalendarDay>();
const DEFAULT_TIMEZONE = "America/Denver";
const DAY_MS = 86_400_000;
const START = 8 * 60;
const END = 19 * 60;
const labels = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];

function dateInTimezone(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const value = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}
function addDays(date: string, amount: number) { const [year, month, day] = date.split("-").map(Number); return new Date(Date.UTC(year, month - 1, day) + amount * DAY_MS).toISOString().slice(0, 10); }
function startOfWeek(date: string) { const day = new Date(`${date}T00:00:00Z`).getUTCDay(); return addDays(date, day === 0 ? -6 : 1 - day); }
function formatDate(date: string, _timezone: string, options: Intl.DateTimeFormatOptions) { return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...options }).format(new Date(`${date}T00:00:00Z`)); }
function formatInstant(value: string, timezone: string) { return new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "numeric", minute: "2-digit" }).format(new Date(value)); }
function minutesInTimezone(value: string, timezone: string) { const parts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(value)); const data = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value])); return Number(data.hour) * 60 + Number(data.minute); }
function blockStyle(startTime: string, duration: number, timezone: string) { const top = ((minutesInTimezone(startTime, timezone) - START) / (END - START)) * 100; return { top: `${Math.max(0, top)}%`, height: `${Math.min(100 - Math.max(0, top), Math.max(4.5, (duration / (END - START)) * 100))}%` }; }
function tone(status: CalendarAppointment["status"]) { return status === "completed" ? styles.green : status === "pending" ? styles.yellow : status === "no_show" ? styles.lavender : styles.blush; }
function errorText(error: unknown) { if (error instanceof AccountLifecycleError) return "Your account is not active. Restore access to view the calendar."; if (error instanceof ApiError && error.status === 403) return "You no longer have access to this calendar."; if (error instanceof ApiError && (error.status === 0 || error.status >= 500)) return "The calendar service is temporarily unavailable. Try again."; return "Unable to load the calendar. Try again."; }
function formatMinutes(value: number) { const hours = Math.floor(value / 60); const minutes = value % 60; return hours ? `${hours}h${minutes ? ` ${minutes}m` : ""}` : `${minutes}m`; }
function capacityValue(summary?: CalendarDay["summary"]) { if (!summary) return "—"; const status = summary.capacity_status; if (status === "not_configured") return "Set up schedule"; if (status === "closed") return "Closed"; if (status === "unavailable" || summary.capacity_filled_rate == null) return "Unavailable"; return `${Math.round(summary.capacity_filled_rate * 100)}%`; }
function aggregateSummaries(dates: string[], days: Record<string, CalendarDay>) { const loaded = dates.map((date) => days[date]); if (!loaded.length || loaded.some((day) => !day)) return null; const summaries = loaded.map((day) => day.summary); const capacityReady = summaries.every((summary) => summary.capacity_status === "available" && typeof summary.capacity_filled_rate === "number" && typeof summary.workingMinutes === "number" && summary.workingMinutes > 0); return { totalAppointments: summaries.reduce((total, summary) => total + summary.totalAppointments, 0), bookedMinutes: summaries.reduce((total, summary) => total + summary.bookedMinutes, 0), capacity: capacityReady ? `${Math.round((summaries.reduce((total, summary) => total + summary.bookedMinutes, 0) / summaries.reduce((total, summary) => total + summary.workingMinutes, 0)) * 100)}%` : "Unavailable" }; }

export function CalendarScreen() {
  const [view, setView] = useState<CalendarView>("week");
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
  const [selectedDate, setSelectedDate] = useState(() => dateInTimezone(new Date(), DEFAULT_TIMEZONE));
  const [days, setDays] = useState<Record<string, CalendarDay>>({});
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [prefill, setPrefill] = useState<BookingPrefill | null>(null);
  const [appointmentTarget, setAppointmentTarget] = useState<{ appointmentId: string } | { prefill?: BookingPrefill } | null>(null);
  const [monthSummary, setMonthSummary] = useState<unknown>(null);
  const requestVersion = useRef(0);
  const weekStart = startOfWeek(selectedDate);
  const visibleDates = useMemo(() => view === "day" ? [selectedDate] : view === "week" ? Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)) : [], [selectedDate, view, weekStart]);

  useEffect(() => {
    const controller = new AbortController(); const version = ++requestVersion.current;
    setLoadState("loading"); setError(null);
    void withActiveAccount(async (accessToken, _access, accountId) => {
      // A profile lookup supplies the business timezone, but calendar data must
      // remain usable when that separate settings request is temporarily down.
      const profile = await getAccountProfile(accessToken).catch(() => null);
      if (!visibleDates.length) return { timezone: profile?.timezone || DEFAULT_TIMEZONE, loaded: [] as Array<readonly [string, CalendarDay]> };
      const results = await Promise.allSettled(visibleDates.map(async (date) => {
        const key = `${accountId}:${date}`; const cached = cache.get(key);
        if (cached && refresh === 0) return [date, cached] as const;
        const day = await getCalendarDay(date, accessToken, { signal: controller.signal }); cache.set(key, day); return [date, day] as const;
      }));
      const loaded = results.flatMap((result) => result.status === "fulfilled" ? [result.value] : []);
      if (!loaded.length) {
        const failure = results.find((result): result is PromiseRejectedResult => result.status === "rejected");
        throw failure?.reason ?? new Error("No calendar days could be loaded.");
      }
      return { timezone: profile?.timezone || DEFAULT_TIMEZONE, loaded };
    }).then((result) => { if (controller.signal.aborted || version !== requestVersion.current) return; setTimezone(result.timezone); setDays(Object.fromEntries(result.loaded)); setLoadState("ready"); }).catch((cause: unknown) => { if (controller.signal.aborted || version !== requestVersion.current) return; setLoadState("error"); setError(errorText(cause)); });
    return () => controller.abort();
  }, [refresh, visibleDates]);

  useEffect(() => {
    if (view !== "month") { setMonthSummary(null); return; }
    const start = `${selectedDate.slice(0, 7)}-01`;
    const end = new Date(Date.UTC(Number(start.slice(0, 4)), Number(start.slice(5, 7)), 0)).toISOString().slice(0, 10);
    void withActiveAccount((token) => getCalendarSummary(start, end, "week", token)).then(setMonthSummary).catch((cause) => setError(errorText(cause)));
  }, [selectedDate, view]);

  const heading = view === "month" ? formatDate(`${selectedDate.slice(0, 7)}-01`, timezone, { month: "long", year: "numeric" }) : view === "day" ? formatDate(selectedDate, timezone, { weekday: "long", month: "short", day: "numeric", year: "numeric" }) : `${formatDate(visibleDates[0], timezone, { month: "short", day: "numeric" })} – ${formatDate(visibleDates[6], timezone, { month: "short", day: "numeric", year: "numeric" })}`;
  const selectGap = (date: string, slot: CalendarAvailableSlot) => { const next = { ...slot, date }; setSelectedDate(date); setPrefill(next); setAppointmentTarget({ prefill: next }); };
  const move = (amount: number) => { setSelectedDate((date) => addDays(date, amount * (view === "day" ? 1 : view === "month" ? 30 : 7))); setPrefill(null); };
  const handleMutation = (appointment: { appointment_date: string }, _previousDate?: string) => { const nextDate = dateInTimezone(new Date(appointment.appointment_date), timezone); cache.clear(); globalThis.dispatchEvent(new CustomEvent("rootfoil:appointments-changed")); setSelectedDate(nextDate); setRefresh((value) => value + 1); };
  const selectedDay = days[selectedDate];
  const aggregate = aggregateSummaries(visibleDates, days);
  const summary = view === "day" ? selectedDay?.summary : undefined;
  const totalAppointments = view === "day" ? summary?.totalAppointments : aggregate?.totalAppointments;
  const bookedMinutes = view === "day" ? summary?.bookedMinutes : aggregate?.bookedMinutes;
  const capacity = view === "day" ? capacityValue(summary) : aggregate?.capacity ?? "Unavailable";

  return <WorkspaceShell active="calendar"><section><PageHeading title="Calendar" subtitle="Your schedule, designed around your day." action={<button className={styles.primaryButton} type="button" onClick={() => setAppointmentTarget({})}>＋ New</button>} />
    {error ? <p className={styles.calendarMessage} role="alert">{error}</p> : null}
    <nav className={styles.calendarTabs} aria-label="Calendar view"><button className={view === "day" ? styles.calendarTabActive : ""} type="button" onClick={() => setView("day")} aria-current={view === "day" ? "page" : undefined}>Daily</button><button className={view === "week" ? styles.calendarTabActive : ""} type="button" onClick={() => setView("week")} aria-current={view === "week" ? "page" : undefined}>Weekly</button><button className={view === "month" ? styles.calendarTabActive : ""} type="button" onClick={() => setView("month")} aria-current={view === "month" ? "page" : undefined}>Monthly</button></nav>
    <div className={styles.calendarControls}><button className={styles.secondaryButton} type="button" onClick={() => { setSelectedDate(dateInTimezone(new Date(), timezone)); setPrefill(null); }}>Today</button><button className={styles.squareButton} type="button" onClick={() => move(-1)} aria-label="Previous period">‹</button><strong aria-live="polite">{heading}</strong><button className={styles.squareButton} type="button" onClick={() => move(1)} aria-label="Next period">›</button></div>
    <section className={styles.calendarMetrics} aria-label="Calendar summary" aria-busy={loadState === "loading"}><article><span aria-hidden="true">▣</span><strong>{totalAppointments ?? "—"}</strong><small>Appointments</small></article><article><span aria-hidden="true">◷</span><strong>{bookedMinutes === undefined ? "—" : formatMinutes(bookedMinutes)}</strong><small>Booked time</small></article><article><span aria-hidden="true">◔</span><strong>{capacity}</strong><small>Capacity filled</small></article></section>
    {view === "month" ? <MonthlySummary summary={monthSummary} /> : loadState === "error" ? <section className={styles.calendarStatus}><p>Calendar data could not be loaded.</p><button className={styles.secondaryButton} type="button" onClick={() => setRefresh((value) => value + 1)}>Try again</button></section> : <div className={styles.calendarLayout}><section className={styles.calendarGrid} aria-label={`${view === "day" ? "Daily" : "Weekly"} calendar`} aria-busy={loadState === "loading"}><div className={styles.calendarHeaders} style={{ gridTemplateColumns: `45px repeat(${visibleDates.length}, minmax(120px, 1fr))` }}><div />{visibleDates.map((date) => <button type="button" className={date === selectedDate ? styles.selectedDay : ""} onClick={() => setSelectedDate(date)} key={date}><b>{formatDate(date, timezone, { weekday: "short" })}</b><span>{formatDate(date, timezone, { month: "short", day: "numeric" })}</span></button>)}</div><div className={styles.calendarBody}><div className={styles.timeLabels}>{labels.map((label) => <span key={label}>{label}</span>)}</div><div className={styles.calendarDays} style={{ gridTemplateColumns: `repeat(${visibleDates.length}, minmax(120px, 1fr))` }}>{visibleDates.map((date) => <DayColumn date={date} day={days[date]} timezone={timezone} selected={date === selectedDate} onSelect={() => setSelectedDate(date)} onGap={selectGap} onAppointment={(appointmentId) => setAppointmentTarget({ appointmentId })} key={date} />)}</div></div></section><DayRail date={selectedDate} day={selectedDay} timezone={timezone} loading={loadState === "loading"} prefill={prefill} onGap={selectGap} /></div>}
    {appointmentTarget ? <AppointmentDialog target={appointmentTarget} timezone={timezone} onClose={() => setAppointmentTarget(null)} onMutated={handleMutation} /> : null}
  </section></WorkspaceShell>;
}

type MonthlyBucket = { key: string; label: string; appointments: number | null; bookedMinutes: number | null; capacity: string };
function monthlyBuckets(summary: unknown): MonthlyBucket[] { const root = summary && typeof summary === "object" ? summary as Record<string, unknown> : {}; const body = root.data && typeof root.data === "object" ? root.data as Record<string, unknown> : root; const values = Array.isArray(body.buckets) ? body.buckets : Array.isArray(body.days) ? body.days : []; return values.map((raw, index) => { const item = raw as Record<string, unknown>; const nested = item.summary && typeof item.summary === "object" ? item.summary as Record<string, unknown> : item; const appointments = typeof (nested.total_appointments ?? nested.totalAppointments) === "number" ? Number(nested.total_appointments ?? nested.totalAppointments) : null; const bookedMinutes = typeof (nested.booked_minutes ?? nested.bookedMinutes) === "number" ? Number(nested.booked_minutes ?? nested.bookedMinutes) : null; const rate = nested.capacity_filled_rate ?? nested.capacityFilledRate; const status = nested.capacity_status ?? nested.capacityStatus; const capacity = status === "not_configured" ? "Set up schedule" : status === "closed" ? "Closed" : status === "unavailable" || typeof rate !== "number" ? "Unavailable" : `${Math.round(rate * 100)}%`; const start = String(item.start_date ?? item.startDate ?? item.date ?? item.label ?? `Week ${index + 1}`); const end = item.end_date ?? item.endDate; return { key: `${start}-${index}`, label: end ? `${start} – ${end}` : start, appointments, bookedMinutes, capacity }; }); }
function MonthlySummary({ summary }: { summary: unknown }) { const buckets = monthlyBuckets(summary); return <section className={styles.monthCalendar} aria-label="Monthly calendar summary">{!summary ? <p className={styles.emptySchedule}>Loading monthly calendar…</p> : buckets.length ? <div className={styles.monthBucketGrid}>{buckets.map((bucket) => <article key={bucket.key}><h2>{bucket.label}</h2><dl><div><dt>Appointments</dt><dd>{bucket.appointments ?? "—"}</dd></div><div><dt>Booked time</dt><dd>{bucket.bookedMinutes === null ? "—" : formatMinutes(bucket.bookedMinutes)}</dd></div><div><dt>Capacity</dt><dd>{bucket.capacity}</dd></div></dl></article>)}</div> : <p className={styles.emptySchedule}>No monthly calendar data is available.</p>}</section>; }

function DayColumn({ date, day, timezone, selected, onSelect, onGap, onAppointment }: { date: string; day?: CalendarDay; timezone: string; selected: boolean; onSelect: () => void; onGap: (date: string, slot: CalendarAvailableSlot) => void; onAppointment: (appointmentId: string) => void }) { return <div className={`${styles.dayColumn} ${selected ? styles.selectedCalendarColumn : ""}`} onClick={onSelect} role="presentation">{day?.appointments.map((appointment) => <button className={`${styles.eventBlock} ${tone(appointment.status)}`} style={blockStyle(appointment.start_time, appointment.duration_minutes, timezone)} type="button" onClick={(event) => { event.stopPropagation(); onAppointment(appointment.id); }} key={appointment.id}><b>{appointment.client_name ?? "Client"}</b><span>{appointment.services.join(", ") || appointment.service_name || "Service"}</span><small>{appointment.status.replace("_", " ")}</small></button>)}{day?.availableSlots.filter((slot) => slot.canBook).map((slot) => <button className={`${styles.eventBlock} ${styles.openSlot}`} style={blockStyle(slot.startTime, slot.durationMinutes, timezone)} type="button" onClick={(event) => { event.stopPropagation(); onGap(date, slot); }} key={slot.id}><b>Open</b><span>Book now</span></button>)}</div>; }

function DayRail({ date, day, timezone, loading, prefill, onGap }: { date: string; day?: CalendarDay; timezone: string; loading: boolean; prefill: BookingPrefill | null; onGap: (date: string, slot: CalendarAvailableSlot) => void }) { const summary = day?.summary; return <aside className={styles.detailRail}><h2>{formatDate(date, timezone, { weekday: "long", month: "short", day: "numeric", year: "numeric" })}</h2>{loading && !day ? <p className={styles.emptySchedule}>Loading schedule…</p> : <><div className={styles.dayStats}><div><b>▣</b><strong>{summary?.totalAppointments ?? 0}</strong><span>Appts</span></div><div><b>◷</b><strong>{formatMinutes(summary?.bookedMinutes ?? 0)}</strong><span>Booked</span></div><div><b>◉</b><strong>{summary?.freeMinutesRemaining == null ? "—" : formatMinutes(summary.freeMinutesRemaining)}</strong><span>Free</span></div></div>{prefill?.date === date ? <div className={styles.bookingPrefill}><strong>New appointment</strong><span>{formatInstant(prefill.startTime, timezone)}–{formatInstant(prefill.endTime, timezone)} prefilled.</span><small>Open gaps are not guaranteed; availability is confirmed when saved.</small></div> : null}<div className={styles.railTabs}><button className={styles.railTabActive} type="button">Appointments ({day?.appointments.length ?? 0})</button></div><div className={styles.appointmentList}>{day?.appointments.length ? day.appointments.map((appointment) => <div className={styles.appointmentItem} key={appointment.id}><time>{formatInstant(appointment.start_time, timezone)}</time><div><strong>{appointment.client_name ?? "Client"}</strong><span>{appointment.services.join(", ") || appointment.service_name || "Service"}</span></div><span className={styles.calendarStatusPill}>{appointment.status.replace("_", " ")}</span></div>) : <p className={styles.emptySchedule}>No appointments scheduled.</p>}</div>{day?.availableSlots.some((slot) => slot.canBook) ? <div className={styles.openGapList}><h3>Open gaps</h3>{day.availableSlots.filter((slot) => slot.canBook).map((slot) => <button type="button" onClick={() => onGap(date, slot)} key={slot.id}><span>{formatInstant(slot.startTime, timezone)}</span><b>Book now</b></button>)}</div> : null}</>}</aside>; }
