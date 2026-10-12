"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ApiError, createAppointment, getAppointment, getAppointmentActivity, getClientAppointmentHistory, getClients, getServices, updateAppointment,
  type Appointment, type AppointmentActivity, type CalendarAvailableSlot, type ClientRow, type Service,
} from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { workspaceStyles as styles } from "./WorkspaceShell";

type Target = { appointmentId: string; prefill?: never } | { appointmentId?: never; prefill?: CalendarAvailableSlot & { date: string } };
type Props = { target: Target; timezone: string; onClose: () => void; onMutated: (appointment: Appointment, previousDate?: string) => void };
type Draft = { clientId: string; appointmentDate: string; duration: string; serviceIds: string[]; notes: string; status: Appointment["status"] };

function key() { return globalThis.crypto?.randomUUID?.() ?? `appointment-${Date.now()}-${Math.random().toString(36).slice(2)}`; }
function errorMessage(error: unknown) { if (error instanceof ApiError && error.status === 409) return "That time is no longer available. Choose another time and try again."; if (error instanceof ApiError && error.status === 400) return "Review the appointment details and try again."; return "Unable to save this appointment. Try again."; }
function validationErrors(error: unknown) { if (!(error instanceof ApiError) || !error.details || typeof error.details !== "object") return {}; const details = error.details as { fieldErrors?: Record<string, string[] | undefined> }; return Object.fromEntries(Object.entries(details.fieldErrors ?? {}).map(([field, messages]) => [field, messages?.[0] ?? "Invalid value"])); }
function toInput(instant: string, timezone: string) { const date = new Date(instant); const parts = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date); const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value])); return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`; }
function asStylistInstant(value: string, timezone: string) { const requested = Date.parse(`${value}:00Z`); let instant = requested; for (let index = 0; index < 2; index += 1) { const parts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(new Date(instant)); const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value])); const displayed = Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day), Number(values.hour), Number(values.minute), Number(values.second)); instant += requested - displayed; } return new Date(instant).toISOString(); }
function displayMoney(minor: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(minor / 100); }

export function AppointmentDialog({ target, timezone, onClose, onMutated }: Props) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [activity, setActivity] = useState<AppointmentActivity[]>([]);
  const [historyCount, setHistoryCount] = useState<number | null>(null);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editing, setEditing] = useState(!target.appointmentId);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [detailRefresh, setDetailRefresh] = useState(0);

  useEffect(() => {
    let active = true; setLoading(true); setError(null);
    void withActiveAccount(async (accessToken) => {
      const [catalog, clientPage, detail] = await Promise.all([
        getServices(accessToken), getClients(accessToken, { page: 1, pageSize: 100 }),
        target.appointmentId ? getAppointment(target.appointmentId, accessToken) : Promise.resolve(null),
      ]);
      const [nextActivity, history] = detail ? await Promise.all([
        getAppointmentActivity(detail.id, accessToken), getClientAppointmentHistory(detail.client_id, accessToken, { status: "all", limit: 10 }),
      ]) : [[], null];
      return { catalog, clients: clientPage.data, detail, nextActivity, history };
    }).then((result) => {
      if (!active) return;
      setServices(result.catalog); setClients(result.clients); setAppointment(result.detail); setActivity(result.nextActivity); setHistoryCount(result.history?.data.length ?? null);
      const initial = result.detail ? {
        clientId: result.detail.client_id, appointmentDate: toInput(result.detail.appointment_date, timezone), duration: String(result.detail.duration_minutes),
        serviceIds: result.detail.service_ids?.filter((id): id is string => Boolean(id)) ?? [], notes: result.detail.notes ?? "", status: result.detail.status,
      } : { clientId: "", appointmentDate: target.prefill ? toInput(target.prefill.startTime, timezone) : "", duration: String(target.prefill?.durationMinutes ?? 60), serviceIds: [], notes: "", status: "scheduled" as const };
      setDraft(initial); setLoading(false);
    }).catch((cause: unknown) => { if (active) { if (cause instanceof ApiError && cause.status === 404 && target.appointmentId) { onClose(); return; } setError(errorMessage(cause)); setLoading(false); } });
    return () => { active = false; };
  }, [target, detailRefresh]);

  const selectedServices = useMemo(() => draft?.serviceIds.map((id) => services.find((service) => service.id === id)).filter((service): service is Service => Boolean(service)) ?? [], [draft, services]);
  const clientName = appointment?.client_name ?? clients.find((client) => client.id === draft?.clientId && (client.preferred_name || `${client.first_name} ${client.last_name}`));
  function update<K extends keyof Draft>(field: K, value: Draft[K]) { setDraft((current) => current ? { ...current, [field]: value } : current); }
  function toggleService(id: string) { setDraft((current) => current ? { ...current, serviceIds: current.serviceIds.includes(id) ? current.serviceIds.filter((serviceId) => serviceId !== id) : [...current.serviceIds, id] } : current); }
  function moveService(id: string, direction: -1 | 1) { setDraft((current) => { if (!current) return current; const index = current.serviceIds.indexOf(id); const next = index + direction; if (index < 0 || next < 0 || next >= current.serviceIds.length) return current; const serviceIds = [...current.serviceIds]; [serviceIds[index], serviceIds[next]] = [serviceIds[next], serviceIds[index]]; return { ...current, serviceIds }; }); }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!draft || !draft.clientId || !draft.appointmentDate || !draft.serviceIds.length || Number(draft.duration) <= 0) { setError("Choose a client, time, duration, and at least one service."); return; }
    setSaving(true); setError(null); setFieldErrors({});
    try {
      const previousDate = appointment?.appointment_date;
      const appointmentDate = asStylistInstant(draft.appointmentDate, timezone);
      const saved = await withActiveAccount((accessToken) => appointment ? updateAppointment(appointment.id, accessToken, { client_id: draft.clientId, appointment_date: appointmentDate, duration_minutes: Number(draft.duration), notes: draft.notes || null, status: draft.status, service_ids: draft.serviceIds }) : createAppointment(accessToken, { client_id: draft.clientId, appointment_date: appointmentDate, duration_minutes: Number(draft.duration), service_ids: draft.serviceIds, status: draft.status, booking_source: "internal", notes: draft.notes || null }, key()));
      onMutated(saved, previousDate);
      if (!appointment) {
        onClose();
        return;
      }
      setAppointment(saved); setEditing(false); setDetailRefresh((value) => value + 1);
    } catch (cause) { setFieldErrors(validationErrors(cause)); setError(errorMessage(cause)); if (cause instanceof ApiError && cause.code === "appointment_service_not_found") setDetailRefresh((value) => value + 1); } finally { setSaving(false); }
  }
  async function status(status: Appointment["status"]) { if (!appointment) return; setSaving(true); setError(null); try { const saved = await withActiveAccount((accessToken) => updateAppointment(appointment.id, accessToken, { status })); onMutated(saved, appointment.appointment_date); setAppointment(saved); setDetailRefresh((value) => value + 1); } catch (cause) { setFieldErrors(validationErrors(cause)); setError(errorMessage(cause)); } finally { setSaving(false); } }

  return <div className={styles.clientDialogBackdrop} role="presentation"><section className={`${styles.clientDialog} ${styles.appointmentDialog}`} role="dialog" aria-modal="true" aria-labelledby="appointment-dialog-title"><header className={styles.clientDialogHeader}><div><h2 id="appointment-dialog-title">{appointment ? "Appointment" : "Book appointment"}</h2><p>{appointment ? "Appointment details are recorded snapshots." : "Create an internal appointment from your complete service catalog."}</p></div><button className={styles.closePanel} type="button" onClick={onClose} aria-label="Close appointment" disabled={saving}>×</button></header>{loading || !draft ? <p className={styles.emptySchedule}>Loading appointment…</p> : <>{error ? <p className={styles.servicesMessage} role="alert">{error}</p> : null}{appointment && !editing ? <AppointmentDetail appointment={appointment} activity={activity} historyCount={historyCount} clientName={typeof clientName === "string" ? clientName : null} onEdit={() => setEditing(true)} onCancel={() => void status("cancelled")} onComplete={() => void status("completed")} saving={saving} /> : <form onSubmit={submit}><div className={styles.clientFormGrid}><label>Client<select value={draft.clientId} onChange={(event) => update("clientId", event.target.value)}><option value="">Select a client</option>{clients.map((client) => <option value={client.id} key={client.id}>{client.preferred_name || `${client.first_name} ${client.last_name}`}</option>)}</select>{fieldErrors.client_id ? <small className={styles.fieldError}>{fieldErrors.client_id}</small> : null}</label><label>Start time<input type="datetime-local" value={draft.appointmentDate} onChange={(event) => update("appointmentDate", event.target.value)} />{fieldErrors.appointment_date ? <small className={styles.fieldError}>{fieldErrors.appointment_date}</small> : null}</label><label>Duration (minutes)<input type="number" min="1" value={draft.duration} onChange={(event) => update("duration", event.target.value)} />{fieldErrors.duration_minutes ? <small className={styles.fieldError}>{fieldErrors.duration_minutes}</small> : null}</label><label>Status<select value={draft.status} onChange={(event) => update("status", event.target.value as Draft["status"])}><option value="scheduled">Scheduled</option><option value="pending">Pending</option><option value="completed">Completed</option><option value="no_show">No show</option></select></label><label className={styles.serviceDescription}>Notes<textarea value={draft.notes} onChange={(event) => update("notes", event.target.value)} /></label></div><section className={styles.appointmentServices}><h3>Services</h3><p>Select in appointment order. Catalog prices are snapshotted when saved.</p>{fieldErrors.service_ids ? <small className={styles.fieldError}>{fieldErrors.service_ids}</small> : null}{services.map((service) => <div className={!service.isActive ? styles.serviceInactive : ""} key={service.id}><label><input type="checkbox" checked={draft.serviceIds.includes(service.id)} onChange={() => toggleService(service.id)} /> <span>{service.name} · {service.durationMinutes} min · ${service.price.toFixed(2)} {!service.isActive ? "(inactive)" : ""}</span></label>{draft.serviceIds.includes(service.id) ? <span><button type="button" onClick={() => moveService(service.id, -1)}>↑</button><button type="button" onClick={() => moveService(service.id, 1)}>↓</button></span> : null}</div>)}</section><div className={styles.clientDialogActions}>{appointment ? <button className={styles.secondaryButton} type="button" onClick={() => setEditing(false)} disabled={saving}>Cancel</button> : null}<button className={styles.primaryButton} type="submit" disabled={saving}>{saving ? "Saving…" : appointment ? "Save changes" : "Create appointment"}</button></div></form>}</>}</section></div>;
}

function AppointmentDetail({ appointment, activity, historyCount, clientName, onEdit, onCancel, onComplete, saving }: { appointment: Appointment; activity: AppointmentActivity[]; historyCount: number | null; clientName: string | null; onEdit: () => void; onCancel: () => void; onComplete: () => void; saving: boolean }) { return <div className={styles.appointmentDetail}><section><h3>{clientName || appointment.client_name || "Client"}</h3><p>{appointment.start_time || appointment.appointment_date} · {appointment.duration_minutes} min · {appointment.status.replace("_", " ")}</p></section><section><h3>Booked services</h3>{appointment.service_lines?.length ? <ul>{appointment.service_lines.map((line) => <li key={line.id}><span>{line.service_name_snapshot}</span><b>{displayMoney(line.booked_amount_minor)}</b></li>)}</ul> : <p>No recorded service lines.</p>}</section><section><h3>Client history</h3><p>{historyCount === null ? "Loading history…" : `${historyCount} recent appointment${historyCount === 1 ? "" : "s"} loaded.`}</p></section><section><h3>Activity</h3>{activity.length ? <ul>{activity.map((event) => <li key={event.id}>{event.event_type.replaceAll("_", " ")}</li>)}</ul> : <p>No activity recorded.</p>}</section><div className={styles.clientDialogActions}><button className={styles.secondaryButton} type="button" onClick={onEdit} disabled={saving}>Edit / reschedule</button>{appointment.status !== "completed" && appointment.status !== "cancelled" ? <button className={styles.secondaryButton} type="button" onClick={onComplete} disabled={saving}>Mark completed</button> : null}{appointment.status !== "cancelled" ? <button className={styles.serviceDelete} type="button" onClick={onCancel} disabled={saving}>Cancel appointment</button> : null}</div></div>; }
