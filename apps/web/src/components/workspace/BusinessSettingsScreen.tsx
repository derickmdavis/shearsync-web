"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  ApiError,
  createOffDay,
  deleteOffDay,
  getAvailability,
  getOffDays,
  updateAvailability,
  type AvailabilityDay,
  type AvailabilitySettings,
  type AvailabilityWindow,
  type OffDay,
} from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { ProfileSettingsScreen } from "@/src/components/settings/ProfileSettingsScreen";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

type Screen = "profile" | "schedule" | "time-off";
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

function emptyDays(): AvailabilityDay[] {
  return weekdays.map((_, dayOfWeek) => ({ dayOfWeek: dayOfWeek as AvailabilityDay["dayOfWeek"], isOpen: false, windows: [] }));
}

function normalizedDays(value: AvailabilitySettings): AvailabilityDay[] {
  const byDay = new Map(value.days.map((day) => [day.dayOfWeek, day]));
  return emptyDays().map((empty) => {
    const day = byDay.get(empty.dayOfWeek);
    if (!day) return empty;
    return { ...day, windows: [...day.windows].sort(compareWindows) };
  });
}

function compareWindows(left: AvailabilityWindow, right: AvailabilityWindow) {
  return left.startTime.localeCompare(right.startTime) || left.endTime.localeCompare(right.endTime) || left.clientAudience.localeCompare(right.clientAudience);
}

export function validateAvailability(days: AvailabilityDay[]): string | null {
  if (days.length !== 7 || new Set(days.map((day) => day.dayOfWeek)).size !== 7) return "Availability must include each day of the week exactly once.";
  for (const day of days) {
    if (!day.isOpen && day.windows.length) return `${weekdays[day.dayOfWeek]} is closed and cannot have booking windows.`;
    if (day.isOpen && !day.windows.length) return `${weekdays[day.dayOfWeek]} needs at least one booking window.`;
    const windows = [...day.windows].sort(compareWindows);
    for (const window of windows) {
      if (!timePattern.test(window.startTime) || !timePattern.test(window.endTime) || window.startTime >= window.endTime) return `${weekdays[day.dayOfWeek]} has an invalid time window.`;
    }
    for (let index = 0; index < windows.length; index += 1) {
      for (let next = index + 1; next < windows.length; next += 1) {
        if (windows[index].clientAudience === windows[next].clientAudience && windows[next].startTime < windows[index].endTime) return `${weekdays[day.dayOfWeek]} has overlapping ${windows[index].clientAudience} windows.`;
      }
    }
  }
  return null;
}

function sortedDays(days: AvailabilityDay[]) {
  return [...days].sort((left, right) => left.dayOfWeek - right.dayOfWeek).map((day) => ({ ...day, windows: [...day.windows].sort(compareWindows) }));
}

function errorMessage(error: unknown) {
  if (error instanceof ApiError) return error.status === 403 ? "You no longer have access to these settings." : error.message || "Unable to save changes.";
  return "Unable to save changes. Try again.";
}

function date(value: Date) { return value.toISOString().slice(0, 10); }
function offDayRows(value: unknown): OffDay[] { if (Array.isArray(value)) return value as OffDay[]; const root = value && typeof value === "object" ? value as Record<string, unknown> : {}; const data = root.data; return Array.isArray(data) ? data as OffDay[] : Array.isArray(root.items) ? root.items as OffDay[] : []; }

export function BusinessSettingsScreen({ screen }: { screen: Screen }) {
  if (screen === "profile") return <ProfileSettingsScreen />;
  return screen === "schedule" ? <ScheduleSettingsScreen /> : <TimeOffSettingsScreen />;
}

function ScheduleSettingsScreen() {
  const [days, setDays] = useState<AvailabilityDay[]>(emptyDays());
  const [timezone, setTimezone] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    void withActiveAccount((token) => getAvailability(token)).then((availability) => {
      if (!active) return;
      setDays(normalizedDays(availability));
      setTimezone(availability.timezone);
      setState("ready");
    }).catch((error) => { if (active) { setNotice(errorMessage(error)); setState("error"); } });
    return () => { active = false; };
  }, []);

  function updateDay(dayOfWeek: AvailabilityDay["dayOfWeek"], update: (day: AvailabilityDay) => AvailabilityDay) {
    setDays((current) => current.map((day) => day.dayOfWeek === dayOfWeek ? update(day) : day));
    setNotice(null);
  }

  function toggleDay(dayOfWeek: AvailabilityDay["dayOfWeek"], isOpen: boolean) {
    updateDay(dayOfWeek, (day) => ({ ...day, isOpen, windows: isOpen ? (day.windows.length ? day.windows : [{ startTime: "09:00", endTime: "17:00", clientAudience: "all" }]) : [] }));
  }

  function updateWindow(dayOfWeek: AvailabilityDay["dayOfWeek"], index: number, update: Partial<AvailabilityWindow>) {
    updateDay(dayOfWeek, (day) => ({ ...day, windows: day.windows.map((window, windowIndex) => windowIndex === index ? { ...window, ...update } : window) }));
  }

  async function save() {
    const ordered = sortedDays(days);
    const invalid = validateAvailability(ordered);
    if (invalid) { setNotice(invalid); return; }
    setSaving(true); setNotice(null);
    try {
      const saved = await withActiveAccount((token) => updateAvailability(token, ordered));
      setDays(normalizedDays(saved));
      setTimezone(saved.timezone);
      setNotice("Schedule saved.");
      window.dispatchEvent(new Event("rootfoil:availability-settings-changed"));
    } catch (error) { setNotice(errorMessage(error)); } finally { setSaving(false); }
  }

  return <WorkspaceShell active="settings"><section className={styles.businessSettings}><PageHeading title="Schedule" subtitle="Set weekly booking hours for every client audience." />
    <a className={styles.timeOffLink} href="/settings/time-off">Manage time off →</a>
    {timezone ? <p className={styles.servicesMessage}>Hours are interpreted in {timezone}.</p> : null}
    {notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}
    {state === "loading" ? <section className={styles.clientsStatus}>Loading schedule…</section> : null}
    {state === "error" ? <section className={styles.clientsStatus}><p>{notice}</p><button className={styles.secondaryButton} type="button" onClick={() => window.location.reload()}>Try again</button></section> : null}
    {state === "ready" ? <section className={styles.scheduleEditor}>{days.map((day) => <section key={day.dayOfWeek} aria-label={`${weekdays[day.dayOfWeek]} availability`}>
      <label><input type="checkbox" checked={day.isOpen} onChange={(event) => toggleDay(day.dayOfWeek, event.target.checked)} /> {weekdays[day.dayOfWeek]}</label>
      {day.isOpen ? <div>{day.windows.map((window, index) => <div key={`${day.dayOfWeek}-${index}`}><input aria-label={`${weekdays[day.dayOfWeek]} window ${index + 1} start`} type="time" value={window.startTime} onChange={(event) => updateWindow(day.dayOfWeek, index, { startTime: event.target.value })} /><span>to</span><input aria-label={`${weekdays[day.dayOfWeek]} window ${index + 1} end`} type="time" value={window.endTime} onChange={(event) => updateWindow(day.dayOfWeek, index, { endTime: event.target.value })} /><select aria-label={`${weekdays[day.dayOfWeek]} window ${index + 1} audience`} value={window.clientAudience} onChange={(event) => updateWindow(day.dayOfWeek, index, { clientAudience: event.target.value as AvailabilityWindow["clientAudience"] })}><option value="all">All clients</option><option value="new">New clients</option><option value="returning">Returning clients</option></select>{day.windows.length > 1 ? <button className={styles.secondaryButton} type="button" onClick={() => updateDay(day.dayOfWeek, (current) => ({ ...current, windows: current.windows.filter((_, windowIndex) => windowIndex !== index) }))}>Remove window</button> : null}</div>)}</div> : null}
      {day.isOpen ? <button className={styles.secondaryButton} type="button" onClick={() => updateDay(day.dayOfWeek, (current) => ({ ...current, windows: [...current.windows, { startTime: "09:00", endTime: "17:00", clientAudience: "all" }] }))}>Add window</button> : null}
    </section>)}<button className={styles.primaryButton} type="button" disabled={saving} onClick={() => void save()}>{saving ? "Saving…" : "Save schedule"}</button></section> : null}
  </section></WorkspaceShell>;
}

function TimeOffSettingsScreen() {
  const [offDays, setOffDays] = useState<OffDay[]>([]); const [state, setState] = useState<"loading" | "ready" | "error">("loading"); const [notice, setNotice] = useState<string | null>(null); const [saving, setSaving] = useState(false); const [offDate, setOffDate] = useState(""); const [reason, setReason] = useState("");
  const reload = () => { setState("loading"); void withActiveAccount(async (token) => { const start = date(new Date()); const end = date(new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0)); return getOffDays(token, start, end); }).then((value) => { setOffDays(offDayRows(value)); setState("ready"); }).catch((error) => { setNotice(errorMessage(error)); setState("error"); }); };
  useEffect(() => { const timer = window.setTimeout(reload, 0); return () => window.clearTimeout(timer); }, []);
  async function add(event: FormEvent) { event.preventDefault(); if (!offDate) return; setSaving(true); try { await withActiveAccount((token) => createOffDay(token, { start_date: offDate, reason: reason.trim() || undefined })); setOffDate(""); setReason(""); reload(); } catch (error) { setNotice(errorMessage(error)); } finally { setSaving(false); } }
  async function remove(id: string) { setSaving(true); try { await withActiveAccount((token) => deleteOffDay(token, id)); setOffDays((current) => current.filter((item) => item.id !== id)); } catch (error) { setNotice(errorMessage(error)); } finally { setSaving(false); } }
  return <WorkspaceShell active="settings"><section className={styles.businessSettings}><PageHeading title="Time off" subtitle="Block dates when you are unavailable." />{notice ? <p className={styles.servicesMessage}>{notice}</p> : null}{state === "loading" ? <section className={styles.clientsStatus}>Loading settings…</section> : null}{state === "error" ? <section className={styles.clientsStatus}><p>{notice}</p><button className={styles.secondaryButton} type="button" onClick={reload}>Try again</button></section> : null}{state === "ready" ? <><form className={styles.settingsForm} onSubmit={add}><label>Date<input type="date" value={offDate} onChange={(event) => setOffDate(event.target.value)} required /></label><label>Reason (optional)<input value={reason} onChange={(event) => setReason(event.target.value)} /></label><button className={styles.primaryButton} disabled={saving}>Add time off</button></form><section className={styles.timeOffList}>{offDays.length ? offDays.map((item) => <div key={item.id}><span><b>{item.start_date ?? item.date}</b>{item.reason ? ` · ${item.reason}` : ""}</span><button className={styles.secondaryButton} type="button" disabled={saving} onClick={() => void remove(item.id)}>Remove</button></div>) : <p>No upcoming time off.</p>}</section></> : null}</section></WorkspaceShell>;
}
