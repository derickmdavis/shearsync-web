"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ApiError, getAccountProfile, getCalendarDay, type CalendarAppointment, type CalendarAvailableSlot, type CalendarDay } from "@/src/lib/api";
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
function addMonths(date: string, amount: number) { const [year, month, day] = date.split("-").map(Number); const next = new Date(Date.UTC(year, month - 1 + amount, 1)); const lastDay = new Date(Date.UTC(next.getUTCFullYear(), next.getUTCMonth() + 1, 0)).getUTCDate(); return new Date(Date.UTC(next.getUTCFullYear(), next.getUTCMonth(), Math.min(day, lastDay))).toISOString().slice(0, 10); }
function startOfWeek(date: string) { const day = new Date(`${date}T00:00:00Z`).getUTCDay(); return addDays(date, day === 0 ? -6 : 1 - day); }
function startOfCalendarMonth(date: string) { const first = `${date.slice(0, 7)}-01`; return addDays(first, -new Date(`${first}T00:00:00Z`).getUTCDay()); }
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
  const [view, setView] = useState<CalendarView>("month");
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
  const [selectedDate, setSelectedDate] = useState(() => dateInTimezone(new Date(), DEFAULT_TIMEZONE));
  const [days, setDays] = useState<Record<string, CalendarDay>>({});
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [prefill, setPrefill] = useState<BookingPrefill | null>(null);
  const [appointmentTarget, setAppointmentTarget] = useState<{ appointmentId: string } | { prefill?: BookingPrefill } | null>(null);
  const requestVersion = useRef(0);
  const weekStart = startOfWeek(selectedDate);
  const visibleDates = useMemo(() => view === "day" ? [selectedDate] : view === "week" ? Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)) : Array.from({ length: 42 }, (_, index) => addDays(startOfCalendarMonth(selectedDate), index)), [selectedDate, view, weekStart]);

  useEffect(() => {
    const refreshAvailability = () => { cache.clear(); setRefresh((value) => value + 1); };
    globalThis.addEventListener("rootfoil:availability-settings-changed", refreshAvailability);
    return () => globalThis.removeEventListener("rootfoil:availability-settings-changed", refreshAvailability);
  }, []);

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

  const heading = view === "month" ? formatDate(`${selectedDate.slice(0, 7)}-01`, timezone, { month: "long", year: "numeric" }) : view === "day" ? formatDate(selectedDate, timezone, { weekday: "long", month: "short", day: "numeric", year: "numeric" }) : `${formatDate(visibleDates[0], timezone, { month: "short", day: "numeric" })} – ${formatDate(visibleDates[6], timezone, { month: "short", day: "numeric", year: "numeric" })}`;
  const selectGap = (date: string, slot: CalendarAvailableSlot) => { const next = { ...slot, date }; setSelectedDate(date); setPrefill(next); setAppointmentTarget({ prefill: next }); };
  const move = (amount: number) => { setSelectedDate((date) => view === "month" ? addMonths(date, amount) : addDays(date, amount * (view === "day" ? 1 : 7))); setPrefill(null); };
  const handleMutation = (appointment: { appointment_date: string }, _previousDate?: string) => { const nextDate = dateInTimezone(new Date(appointment.appointment_date), timezone); cache.clear(); globalThis.dispatchEvent(new CustomEvent("rootfoil:appointments-changed")); setSelectedDate(nextDate); setRefresh((value) => value + 1); };
  const selectedDay = days[selectedDate];
  const summaryDates = view === "month" ? visibleDates.filter((date) => date.startsWith(selectedDate.slice(0, 7))) : visibleDates;
  const aggregate = aggregateSummaries(summaryDates, days);
  const summary = view === "day" ? selectedDay?.summary : undefined;
  const totalAppointments = view === "day" ? summary?.totalAppointments : aggregate?.totalAppointments;
  const bookedMinutes = view === "day" ? summary?.bookedMinutes : aggregate?.bookedMinutes;
  const capacity = view === "day" ? capacityValue(summary) : aggregate?.capacity ?? "Unavailable";

  return <WorkspaceShell active="calendar"><section><PageHeading title="Calendar" subtitle="Your schedule at a glance." action={<button className={styles.primaryButton} type="button" onClick={() => setAppointmentTarget({})}>＋ New</button>} />
    {error ? <p className={styles.calendarMessage} role="alert">{error}</p> : null}
    <nav className={`${styles.calendarTabs} ${view === "month" ? styles.monthTabs : ""}`} aria-label="Calendar view"><button className={view === "day" ? styles.calendarTabActive : ""} type="button" onClick={() => setView("day")} aria-current={view === "day" ? "page" : undefined}>Daily</button><button className={view === "week" ? styles.calendarTabActive : ""} type="button" onClick={() => setView("week")} aria-current={view === "week" ? "page" : undefined}>Weekly</button><button className={view === "month" ? styles.calendarTabActive : ""} type="button" onClick={() => setView("month")} aria-current={view === "month" ? "page" : undefined}>Monthly</button></nav>
    {view === "month" ? <div className={styles.monthOverview}><CalendarControls heading={heading} onToday={() => { setSelectedDate(dateInTimezone(new Date(), timezone)); setPrefill(null); }} onMove={move} /><CalendarMetrics totalAppointments={totalAppointments} bookedMinutes={bookedMinutes} capacity={capacity} loading={loadState === "loading"} /></div> : <><CalendarControls heading={heading} onToday={() => { setSelectedDate(dateInTimezone(new Date(), timezone)); setPrefill(null); }} onMove={move} /><CalendarMetrics totalAppointments={totalAppointments} bookedMinutes={bookedMinutes} capacity={capacity} loading={loadState === "loading"} /></>}
    {view === "month" ? <CalendarMonthView dates={visibleDates} days={days} selectedDate={selectedDate} timezone={timezone} loading={loadState === "loading"} error={loadState === "error" ? error : null} onSelect={setSelectedDate} onAppointment={(appointmentId) => setAppointmentTarget({ appointmentId })} onRetry={() => setRefresh((value) => value + 1)} onViewWeek={() => setView("week")} /> : loadState === "error" ? <section className={styles.calendarStatus}><p>Calendar data could not be loaded.</p><button className={styles.secondaryButton} type="button" onClick={() => setRefresh((value) => value + 1)}>Try again</button></section> : <div className={styles.calendarLayout}><section className={`${styles.calendarGrid} ${view === "day" ? styles.calendarDailyGrid : ""}`} aria-label={`${view === "day" ? "Daily" : "Weekly"} calendar`} aria-busy={loadState === "loading"}><div className={styles.calendarHeaders} style={{ gridTemplateColumns: `45px repeat(${visibleDates.length}, minmax(120px, 1fr))` }}><div />{visibleDates.map((date) => <button type="button" className={date === selectedDate ? styles.selectedDay : ""} onClick={() => setSelectedDate(date)} key={date}><b>{formatDate(date, timezone, { weekday: "short" })}</b><span>{formatDate(date, timezone, { month: "short", day: "numeric" })}</span></button>)}</div><div className={styles.calendarBody}><div className={styles.timeLabels}>{labels.map((label) => <span key={label}>{label}</span>)}</div><div className={styles.calendarDays} style={{ gridTemplateColumns: `repeat(${visibleDates.length}, minmax(120px, 1fr))` }}>{visibleDates.map((date) => <DayColumn date={date} day={days[date]} timezone={timezone} selected={date === selectedDate} onSelect={() => setSelectedDate(date)} onGap={selectGap} onAppointment={(appointmentId) => setAppointmentTarget({ appointmentId })} key={date} />)}</div></div></section><DayRail date={selectedDate} day={selectedDay} timezone={timezone} loading={loadState === "loading"} prefill={prefill} onGap={selectGap} /></div>}
    {appointmentTarget ? <AppointmentDialog target={appointmentTarget} timezone={timezone} onClose={() => setAppointmentTarget(null)} onMutated={handleMutation} /> : null}
  </section></WorkspaceShell>;
}

function CalendarControls({ heading, onToday, onMove }: { heading: string; onToday: () => void; onMove: (amount: number) => void }) { return <div className={styles.calendarControls}><button className={styles.secondaryButton} type="button" onClick={onToday}>Today</button><button className={styles.squareButton} type="button" onClick={() => onMove(-1)} aria-label="Previous period">‹</button><strong aria-live="polite">{heading}</strong><button className={styles.squareButton} type="button" onClick={() => onMove(1)} aria-label="Next period">›</button></div>; }
function CalendarMetrics({ totalAppointments, bookedMinutes, capacity, loading }: { totalAppointments: number | undefined; bookedMinutes: number | undefined; capacity: string; loading: boolean }) { return <section className={styles.calendarMetrics} aria-label="Calendar summary" aria-busy={loading}><article><span aria-hidden="true">▣</span><strong>{totalAppointments ?? "—"}</strong><small>Appointments</small></article><article><span aria-hidden="true">◷</span><strong>{bookedMinutes === undefined ? "—" : formatMinutes(bookedMinutes)}</strong><small>Booked time</small></article><article><span aria-hidden="true">◔</span><strong>{capacity}</strong><small>Capacity filled</small></article></section>; }

function dayCapacity(day?: CalendarDay) { const value = day?.summary.capacity_filled_rate; if (typeof value === "number") return Math.round(value * 100); const workingMinutes = day?.summary.workingMinutes ?? 0; return workingMinutes > 0 ? Math.round(((day?.summary.bookedMinutes ?? 0) / workingMinutes) * 100) : null; }
function CalendarMonthView({ dates, days, selectedDate, timezone, loading, error, onSelect, onAppointment, onRetry, onViewWeek }: { dates: string[]; days: Record<string, CalendarDay>; selectedDate: string; timezone: string; loading: boolean; error: string | null; onSelect: (date: string) => void; onAppointment: (id: string) => void; onRetry: () => void; onViewWeek: () => void }) {
  const selected = days[selectedDate]; const monthKey = selectedDate.slice(0, 7); const currentDates = dates.filter((date) => date.startsWith(monthKey));
  const weekDates = Array.from({ length: 7 }, (_, index) => addDays(startOfWeek(selectedDate), index)); const weekDays = weekDates.map((date) => days[date]).filter(Boolean) as CalendarDay[];
  const weekAppointments = weekDays.reduce((total, day) => total + day.summary.totalAppointments, 0); const weekBooked = weekDays.reduce((total, day) => total + day.summary.bookedMinutes, 0); const working = weekDays.reduce((total, day) => total + day.summary.workingMinutes, 0);
  const trend = currentDates.map((date) => dayCapacity(days[date]) ?? 0); const selectedCapacity = dayCapacity(selected);
  return <div className={styles.monthDashboard}>
    <section className={styles.monthGridCard} aria-label="Monthly calendar" aria-busy={loading}>
      <div className={styles.monthWeekdays}>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => <span key={label}>{label}</span>)}</div>
      <div className={styles.monthDays}>{dates.map((date) => { const day = days[date]; const inMonth = date.startsWith(monthKey); const appointments = day?.appointments ?? []; const capacity = dayCapacity(day); return <button className={`${styles.monthDay} ${date === selectedDate ? styles.monthDaySelected : ""} ${!inMonth ? styles.monthDayOutside : ""}`} type="button" onClick={() => onSelect(date)} key={date}><span className={styles.monthDayTop}><b>{formatDate(date, timezone, { day: "numeric" })}</b>{capacity !== null ? <small>{capacity}%</small> : null}</span><span className={styles.monthMarkers} aria-label={`${appointments.length} appointments`}>{appointments.slice(0, 3).map((appointment) => <i className={tone(appointment.status)} key={appointment.id} />)}{appointments.length > 3 ? <em>+{appointments.length - 3}</em> : null}</span></button>; })}</div>
      {loading ? <div className={styles.monthLoading}>Loading your month…</div> : null}
      {error ? <div className={styles.monthInlineError} role="alert"><span>{error}</span><button type="button" onClick={onRetry}>Try again</button></div> : null}
    </section>
    <aside className={styles.monthDetailRail} aria-label="Selected day details"><header className={styles.monthDetailHeader}><h2>{formatDate(selectedDate, timezone, { weekday: "long", month: "short", day: "numeric", year: "numeric" })}</h2><div><button type="button" onClick={() => onSelect(addDays(selectedDate, -1))} aria-label="Previous day">‹</button><button type="button" onClick={() => onSelect(addDays(selectedDate, 1))} aria-label="Next day">›</button></div></header><div className={styles.monthDayStats}><div><b>▣</b><strong>{selected?.summary.totalAppointments ?? 0}</strong><span>Appointments</span></div><div><b>◷</b><strong>{formatMinutes(selected?.summary.bookedMinutes ?? 0)}</strong><span>Booked</span></div><div><b>◉</b><strong>{selectedCapacity === null ? "—" : `${selectedCapacity}%`}</strong><span>Capacity filled</span></div></div><section className={styles.monthAppointments}><h3>Appointments ({selected?.appointments.length ?? 0})</h3>{selected?.appointments.length ? selected.appointments.map((appointment) => <button type="button" onClick={() => onAppointment(appointment.id)} className={styles.monthAppointment} key={appointment.id}><time>{formatInstant(appointment.start_time, timezone)}</time><span><b>{appointment.client_name ?? "Client"}</b><small>{appointment.services.join(", ") || appointment.service_name || "Service"}</small></span><em>{appointment.status.replace("_", " ")}</em></button>) : <p>No appointments scheduled.</p>}</section><section className={styles.monthContext}><div className={styles.monthContextHeading}><h3>Week of {formatDate(weekDates[0], timezone, { month: "short", day: "numeric" })} – {formatDate(weekDates[6], timezone, { month: "short", day: "numeric" })}</h3><button type="button" onClick={onViewWeek}>View Week →</button></div><div className={styles.monthWeekStats}><span><b>{working ? `${Math.round((weekBooked / working) * 100)}%` : "—"}</b>Capacity</span><span><b>{weekAppointments}</b>Appointments</span><span><b>{formatMinutes(weekBooked)}</b>Booked</span></div></section><section className={styles.monthTrend}><div><h3>Monthly Capacity Trend</h3><b>{trend.length ? `${Math.round(trend.reduce((a, b) => a + b, 0) / trend.length)}% avg` : "—"}</b></div><TrendLine values={trend} /></section></aside>
  </div>;
}
function TrendLine({ values }: { values: number[] }) { const sampled = values.filter((_, index) => index % Math.ceil(Math.max(values.length, 1) / 12) === 0); const points = sampled.length ? sampled.map((value, index) => `${index * (100 / Math.max(sampled.length - 1, 1))},${30 - Math.min(26, value * .26)}`).join(" ") : "0,30 100,30"; return <svg className={styles.monthTrendChart} viewBox="0 0 100 32" preserveAspectRatio="none" aria-label="Monthly capacity trend"><polyline points={`0,32 ${points} 100,32`} fill="rgba(205,142,49,.12)" stroke="none" /><polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" /></svg>; }

function DayColumn({ date, day, timezone, selected, onSelect, onGap, onAppointment }: { date: string; day?: CalendarDay; timezone: string; selected: boolean; onSelect: () => void; onGap: (date: string, slot: CalendarAvailableSlot) => void; onAppointment: (appointmentId: string) => void }) { return <div className={`${styles.dayColumn} ${selected ? styles.selectedCalendarColumn : ""}`} onClick={onSelect} role="presentation">{day?.appointments.map((appointment) => <button className={`${styles.eventBlock} ${tone(appointment.status)}`} style={blockStyle(appointment.start_time, appointment.duration_minutes, timezone)} type="button" onClick={(event) => { event.stopPropagation(); onAppointment(appointment.id); }} key={appointment.id}><b>{appointment.client_name ?? "Client"}</b><span>{appointment.services.join(", ") || appointment.service_name || "Service"}</span><small>{appointment.status.replace("_", " ")}</small></button>)}{day?.availableSlots.filter((slot) => slot.canBook).map((slot) => <button className={`${styles.eventBlock} ${styles.openSlot}`} style={blockStyle(slot.startTime, slot.durationMinutes, timezone)} type="button" onClick={(event) => { event.stopPropagation(); onGap(date, slot); }} key={slot.id}><b>Open</b><span>Book now</span></button>)}</div>; }

function DayRail({ date, day, timezone, loading, prefill, onGap }: { date: string; day?: CalendarDay; timezone: string; loading: boolean; prefill: BookingPrefill | null; onGap: (date: string, slot: CalendarAvailableSlot) => void }) { const summary = day?.summary; return <aside className={styles.detailRail}><h2>{formatDate(date, timezone, { weekday: "long", month: "short", day: "numeric", year: "numeric" })}</h2>{loading && !day ? <p className={styles.emptySchedule}>Loading schedule…</p> : <><div className={styles.dayStats}><div><b>▣</b><strong>{summary?.totalAppointments ?? 0}</strong><span>Appts</span></div><div><b>◷</b><strong>{formatMinutes(summary?.bookedMinutes ?? 0)}</strong><span>Booked</span></div><div><b>◉</b><strong>{summary?.freeMinutesRemaining == null ? "—" : formatMinutes(summary.freeMinutesRemaining)}</strong><span>Free</span></div></div>{prefill?.date === date ? <div className={styles.bookingPrefill}><strong>New appointment</strong><span>{formatInstant(prefill.startTime, timezone)}–{formatInstant(prefill.endTime, timezone)} prefilled.</span><small>Open gaps are not guaranteed; availability is confirmed when saved.</small></div> : null}<div className={styles.railTabs}><button className={styles.railTabActive} type="button">Appointments ({day?.appointments.length ?? 0})</button></div><div className={styles.appointmentList}>{day?.appointments.length ? day.appointments.map((appointment) => <div className={styles.appointmentItem} key={appointment.id}><time>{formatInstant(appointment.start_time, timezone)}</time><div><strong>{appointment.client_name ?? "Client"}</strong><span>{appointment.services.join(", ") || appointment.service_name || "Service"}</span></div><span className={styles.calendarStatusPill}>{appointment.status.replace("_", " ")}</span></div>) : <p className={styles.emptySchedule}>No appointments scheduled.</p>}</div>{day?.availableSlots.some((slot) => slot.canBook) ? <div className={styles.openGapList}><h3>Open gaps</h3>{day.availableSlots.filter((slot) => slot.canBook).map((slot) => <button type="button" onClick={() => onGap(date, slot)} key={slot.id}><span>{formatInstant(slot.startTime, timezone)}</span><b>Book now</b></button>)}</div> : null}</>}</aside>; }
