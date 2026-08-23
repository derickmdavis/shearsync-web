"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ApiError,
  cancelManagedAppointment,
  normalizePublicAppointmentLink,
  resolvePublicAppointmentLink,
  rescheduleManagedAppointment,
  type PublicManagedAppointment,
} from "@/src/lib/api";
import { formatCurrency, formatDuration } from "@/src/lib/booking-format";

type ShortCodeManageAppointmentClientProps = {
  shortCode: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "temporary-unavailable" }
  | { status: "ready"; appointment: PublicManagedAppointment };

type Mode = "details" | "cancel" | "reschedule" | "success";

const SHORT_CODE_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

export function ShortCodeManageAppointmentClient({
  shortCode,
}: ShortCodeManageAppointmentClientProps) {
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [mode, setMode] = useState<Mode>("details");
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");

  useEffect(() => {
    let disposed = false;

    async function resolveLink() {
      if (!SHORT_CODE_PATTERN.test(shortCode)) {
        setLoadState({ status: "unavailable" });
        return;
      }

      setLoadState({ status: "loading" });
      try {
        const response = await resolvePublicAppointmentLink(shortCode);
        if (disposed) return;

        if (!response.valid) {
          setLoadState({ status: "unavailable" });
          return;
        }

        setLoadState({
          status: "ready",
          appointment: normalizePublicAppointmentLink(response),
        });
      } catch (error) {
        if (!disposed) {
          setLoadState({
            status:
              error instanceof ApiError && [400, 401, 404, 410].includes(error.status)
                ? "unavailable"
                : "temporary-unavailable",
          });
        }
      }
    }

    void resolveLink();
    return () => {
      disposed = true;
    };
  }, [shortCode]);

  const appointment =
    loadState.status === "ready" ? loadState.appointment : null;
  const timezone = appointment?.business_timezone || "UTC";
  const dateTimeValue = useMemo(
    () =>
      appointment
        ? formatDateTimeInput(appointment.appointment_date, timezone)
        : "",
    [appointment, timezone],
  );

  function openReschedule() {
    setSelectedDateTime(dateTimeValue);
    setActionError(null);
    setMode("reschedule");
  }

  async function confirmCancel() {
    if (!appointment?.can_cancel) return;

    setSubmitting(true);
    setActionError(null);
    try {
      const updated = await cancelManagedAppointment(shortCode, "short-code");
      setLoadState({ status: "ready", appointment: updated });
      setSuccessMessage("Your appointment has been cancelled.");
      setMode("success");
    } catch (error) {
      setActionError(actionErrorMessage(error, "cancel"));
    } finally {
      setSubmitting(false);
    }
  }

  async function submitReschedule() {
    if (!appointment?.can_reschedule) return;

    const isoDateTime = toOffsetIsoDateTime(selectedDateTime, timezone);
    if (!isoDateTime) {
      setActionError("Choose a valid date and time.");
      return;
    }

    setSubmitting(true);
    setActionError(null);
    try {
      const updated = await rescheduleManagedAppointment(shortCode, "short-code", {
        newAppointmentDate: isoDateTime,
      });
      setLoadState({ status: "ready", appointment: updated });
      setSuccessMessage(
        updated.status === "pending"
          ? "Your new time has been requested and is awaiting approval."
          : "Your appointment has been rescheduled.",
      );
      setMode("success");
    } catch (error) {
      setActionError(actionErrorMessage(error, "reschedule"));
    } finally {
      setSubmitting(false);
    }
  }

  if (loadState.status === "loading") {
    return <ManageShell><LoadingCard /></ManageShell>;
  }

  if (loadState.status === "unavailable") {
    return <UnavailableCard />;
  }

  if (loadState.status === "temporary-unavailable") {
    return (
      <ManageShell>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Appointment temporarily unavailable
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Please contact your stylist for help with this appointment.
        </p>
      </ManageShell>
    );
  }

  const currentAppointment = loadState.appointment;

  return (
    <ManageShell>
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
        Manage appointment
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        Hi, {currentAppointment.client_name}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {currentAppointment.business_name || currentAppointment.stylist_display_name}
      </p>

      {mode === "details" ? (
        <>
          <AppointmentDetails appointment={currentAppointment} timezone={timezone} />
          <PolicyText appointment={currentAppointment} />
          <div className="mt-5 grid gap-3">
            {currentAppointment.can_reschedule ? (
              <button
                type="button"
                disabled={submitting}
                onClick={openReschedule}
                className={primaryButtonClass}
              >
                Reschedule appointment
              </button>
            ) : currentAppointment.reschedule_disabled_reason ? (
              <DisabledAction text={currentAppointment.reschedule_disabled_reason} />
            ) : null}
            {currentAppointment.can_cancel ? (
              <button
                type="button"
                disabled={submitting}
                onClick={() => { setActionError(null); setMode("cancel"); }}
                className={secondaryButtonClass}
              >
                Cancel appointment
              </button>
            ) : currentAppointment.cancel_disabled_reason ? (
              <DisabledAction text={currentAppointment.cancel_disabled_reason} />
            ) : null}
          </div>
        </>
      ) : null}

      {mode === "cancel" ? (
        <section className="mt-7">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Cancel this appointment?
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            This will release the time on your stylist&apos;s calendar.
          </p>
          <ActionError message={actionError} />
          <button type="button" disabled={submitting} onClick={confirmCancel} className={`${primaryButtonClass} mt-5 bg-danger shadow-[0_18px_32px_rgba(239,68,68,0.18)] hover:bg-red-600`}>
            {submitting ? "Cancelling..." : "Yes, cancel appointment"}
          </button>
          <BackButton disabled={submitting} onClick={() => setMode("details")} />
        </section>
      ) : null}

      {mode === "reschedule" ? (
        <section className="mt-7">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Choose a new time
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Times are shown in {timezone}. Your stylist will confirm availability.
          </p>
          <label className="mt-5 block text-sm font-semibold text-foreground" htmlFor="appointment-date-time">
            New appointment date and time
          </label>
          <input
            id="appointment-date-time"
            type="datetime-local"
            value={selectedDateTime}
            disabled={submitting}
            onChange={(event) => { setSelectedDateTime(event.target.value); setActionError(null); }}
            className="mt-2 h-12 w-full rounded-xl border border-border bg-white px-3 text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-70"
          />
          <ActionError message={actionError} />
          <button type="button" disabled={submitting} onClick={submitReschedule} className={`${primaryButtonClass} mt-5`}>
            {submitting ? "Rescheduling..." : "Request new time"}
          </button>
          <BackButton disabled={submitting} onClick={() => setMode("details")} />
        </section>
      ) : null}

      {mode === "success" ? (
        <section className="mt-7">
          <div className="rounded-2xl border border-border bg-brand-soft p-5">
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-brand">Done</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{successMessage}</h2>
          </div>
          <AppointmentDetails appointment={currentAppointment} timezone={timezone} />
          <button type="button" onClick={() => setMode("details")} className={`${primaryButtonClass} mt-5`}>
            View appointment
          </button>
        </section>
      ) : null}
    </ManageShell>
  );
}

const primaryButtonClass = "flex h-14 w-full items-center justify-center rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70";
const secondaryButtonClass = "flex h-14 w-full items-center justify-center rounded-2xl border border-border bg-white px-5 text-base font-semibold text-foreground transition-colors hover:bg-surface-warm disabled:cursor-wait disabled:opacity-70";

function ManageShell({ children }: { children: React.ReactNode }) {
  return <div className="rounded-[30px] border border-white/80 bg-card p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] sm:p-8">{children}</div>;
}

function LoadingCard() {
  return <div className="space-y-4"><div className="h-5 w-36 animate-pulse rounded bg-zinc-100" /><div className="h-9 w-48 animate-pulse rounded bg-zinc-100" /><div className="h-44 animate-pulse rounded-3xl bg-zinc-50" /></div>;
}

function UnavailableCard() {
  return <ManageShell><h1 className="text-3xl font-semibold tracking-tight text-foreground">This appointment link is no longer available.</h1><p className="mt-3 text-sm leading-6 text-muted">Please contact your stylist.</p></ManageShell>;
}

function AppointmentDetails({ appointment, timezone }: { appointment: PublicManagedAppointment; timezone: string }) {
  return <div className="mt-7 rounded-[22px] border border-border bg-white p-5 shadow-[0_2px_10px_rgba(17,17,17,0.035)]"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-muted">Service</p><h2 className="mt-1 text-xl font-semibold text-foreground">{appointment.service_name}</h2></div><StatusBadge status={appointment.status} /></div><dl className="mt-5 space-y-4"><DetailRow label="When"><span>{formatAppointmentDate(appointment.appointment_date, timezone)}<small className="mt-1 block text-muted">{timezone}</small></span></DetailRow><DetailRow label="Duration"><span>{formatDuration(appointment.service_duration_minutes)}</span></DetailRow><DetailRow label="Price"><span>{formatCurrency(appointment.service_price)}</span></DetailRow><DetailRow label="Stylist"><span>{appointment.stylist_display_name}</span></DetailRow></dl></div>;
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex items-start justify-between gap-4 border-t border-border pt-4"><dt className="text-sm font-semibold text-muted">{label}</dt><dd className="text-right font-semibold text-foreground">{children}</dd></div>;
}

function StatusBadge({ status }: { status: string }) {
  const tone = status.toLowerCase() === "cancelled" ? "bg-red-50 text-red-600" : status.toLowerCase() === "pending" ? "bg-amber-50 text-amber-700" : "bg-brand-soft text-brand";
  return <span className={`inline-flex h-8 shrink-0 items-center rounded-full px-3 text-xs font-bold capitalize ${tone}`}>{status}</span>;
}

function PolicyText({ appointment }: { appointment: PublicManagedAppointment }) {
  const messages = [appointment.reschedule_policy_text, appointment.cancellation_policy_text].filter(Boolean);
  return messages.length ? <div className="mt-5 space-y-2 text-sm leading-6 text-muted">{messages.map((message) => <p key={message}>{message}</p>)}</div> : null;
}

function DisabledAction({ text }: { text: string }) {
  return <p className="rounded-xl bg-surface-warm px-4 py-3 text-sm leading-6 text-muted">{text}</p>;
}

function ActionError({ message }: { message: string | null }) {
  return message ? <p role="alert" className="mt-4 text-sm leading-6 text-red-600">{message}</p> : null;
}

function BackButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return <button type="button" disabled={disabled} onClick={onClick} className="mt-3 flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-muted hover:text-foreground disabled:opacity-70">Back</button>;
}

function formatAppointmentDate(value: string, timezone: string) {
  try {
    return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: timezone }).format(new Date(value));
  } catch {
    return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(value));
  }
}

function formatDateTimeInput(value: string, timezone: string) {
  try {
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(value));
    const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
    return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}`;
  } catch { return ""; }
}

function toOffsetIsoDateTime(value: string, timezone: string) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  const [date, time] = value.split("T");
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const localAsUtc = Date.UTC(year, month - 1, day, hour, minute);
  let instant = localAsUtc - timezoneOffsetAt(new Date(localAsUtc), timezone);
  instant = localAsUtc - timezoneOffsetAt(new Date(instant), timezone);
  const offset = timezoneOffsetAt(new Date(instant), timezone);
  const sign = offset >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(offset);
  const offsetHours = String(Math.floor(absoluteOffset / 3_600_000)).padStart(2, "0");
  const offsetMinutes = String((absoluteOffset % 3_600_000) / 60_000).padStart(2, "0");
  return `${value}:00${sign}${offsetHours}:${offsetMinutes}`;
}

function timezoneOffsetAt(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((item) => item.type === type)?.value ?? 0);
  return Date.UTC(part("year"), part("month") - 1, part("day"), part("hour"), part("minute"), part("second")) - date.getTime();
}

function actionErrorMessage(error: unknown, action: "cancel" | "reschedule") {
  if (!(error instanceof ApiError)) return `Unable to ${action} this appointment right now. Please contact your stylist.`;
  if (error.status === 409 && error.message) return error.message;
  if (error.status === 429) return "This service is temporarily unavailable. Please contact your stylist.";
  if ([400, 404, 410].includes(error.status)) return "This appointment link is no longer available. Please contact your stylist.";
  return `Unable to ${action} this appointment right now. Please contact your stylist.`;
}
