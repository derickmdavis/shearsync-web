"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ApiError,
  joinWaitlist,
  type CreateWaitlistInput,
} from "@/src/lib/api";
import { getTodayDateValue } from "@/src/lib/booking-format";
import { isValidEmail } from "@/src/components/booking/booking-flow-utils";

type WaitlistCalloutProps = {
  slug: string;
  selectedDate: string;
  selectedServiceId?: string | null;
  selectedService?: { name: string; durationMinutes: number; price: number } | null;
  defaultClientName: string;
  defaultClientEmail: string;
  defaultClientPhone: string;
};

type WaitlistFormErrors = Partial<{
  requestedDates: string;
  clientName: string;
  clientEmail: string;
  contact: string;
}>;

export function WaitlistCallout({
  slug,
  selectedDate,
  selectedServiceId,
  selectedService,
  defaultClientName,
  defaultClientEmail,
  defaultClientPhone,
}: WaitlistCalloutProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-4 rounded-[16px] border border-brand/20 bg-brand-soft p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-[0_2px_8px_rgba(17,24,39,0.06)]">
            <CalendarIcon />
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-[15px] font-bold text-foreground">
              No availability for the day you need?
            </h4>
            <p className="mt-1 text-sm leading-6 text-muted">
              No time that works? We’ll email you if a matching opening becomes available.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-3 inline-flex h-11 items-center justify-center rounded-2xl bg-brand px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(183,121,61,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/25"
            >
              Join waitlist
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <WaitlistDialog
          slug={slug}
          selectedDate={selectedDate}
          selectedServiceId={selectedServiceId}
          selectedService={selectedService}
          defaultClientName={defaultClientName}
          defaultClientEmail={defaultClientEmail}
          defaultClientPhone={defaultClientPhone}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

function WaitlistDialog({
  slug,
  selectedDate,
  selectedServiceId,
  selectedService,
  defaultClientName,
  defaultClientEmail,
  defaultClientPhone,
  onClose,
}: WaitlistCalloutProps & { onClose: () => void }) {
  const today = getTodayDateValue();
  const [requestedDates, setRequestedDates] = useState<string[]>([selectedDate]);
  const [dateToAdd, setDateToAdd] = useState("");
  const [clientName, setClientName] = useState(defaultClientName);
  const [clientEmail, setClientEmail] = useState(defaultClientEmail);
  const [clientPhone, setClientPhone] = useState(defaultClientPhone);
  const [timePreference, setTimePreference] = useState<"anytime" | "range">("anytime");
  const [requestedStartTime, setRequestedStartTime] = useState("09:00");
  const [requestedEndTime, setRequestedEndTime] = useState("17:00");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<WaitlistFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // The dialog is rendered as an overlay rather than a routed page, so it
    // owns its Escape-key close behavior while mounted.
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function validate() {
    // Client-side validation improves UX only; the backend still validates
    // feature access, duplicate entries, and final payload shape.
    const nextErrors: WaitlistFormErrors = {};
    const trimmedEmail = clientEmail.trim();
    const trimmedPhone = clientPhone.trim();

    if (!requestedDates.length) {
      nextErrors.requestedDates = "Choose at least one date.";
    } else if (requestedDates.some((date) => date < today)) {
      nextErrors.requestedDates = "Dates must be today or later.";
    }

    if (!clientName.trim()) {
      nextErrors.clientName = "Name is required.";
    }

    if (!trimmedEmail) {
      nextErrors.clientEmail = "Email is required.";
    }

    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      nextErrors.clientEmail = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    const payload: CreateWaitlistInput = {
      // This shape mirrors POST /api/public/stylists/:slug/waitlist.
      requestedDates,
      serviceId: selectedServiceId || "",
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim() || null,
      timePreference,
      requestedStartTime: timePreference === "range" ? requestedStartTime : null,
      requestedEndTime: timePreference === "range" ? requestedEndTime : null,
      note: note.trim() || null,
    };

    setSubmitting(true);

    try {
      await joinWaitlist(slug, payload);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(getWaitlistErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-[#111827]/45 px-4 py-4 sm:items-center sm:py-6"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        aria-describedby="waitlist-description"
        className="max-h-[calc(100vh-2rem)] w-full max-w-[430px] overflow-y-auto rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_30px_90px_rgba(17,24,39,0.22)] sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {submitted ? (
          <div>
            <h2
              id="waitlist-title"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              You&apos;re on the waitlist
            </h2>
            <p
              id="waitlist-description"
              className="mt-3 text-sm leading-6 text-muted"
            >
              We’ll email you if a matching opening becomes available. Everyone waiting for that opening may be notified; the first person to book gets it.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(183,121,61,0.22)]"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="waitlist-title"
                  className="text-2xl font-semibold tracking-tight text-foreground"
                >
                  Join the waitlist
                </h2>
                <p
                  id="waitlist-description"
                  className="mt-2 text-sm leading-6 text-muted"
                >
                  Choose up to 3 days that work for you. We’ll email you if a matching opening becomes available.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-warm"
                aria-label="Close waitlist form"
              >
                <CloseIcon />
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              {selectedService ? <div className="rounded-2xl bg-surface-warm px-4 py-3 text-sm text-foreground"><strong>{selectedService.name}</strong><p className="mt-1 text-muted">{selectedService.durationMinutes} min · ${selectedService.price}</p></div> : null}
              <Field label="Days that work" htmlFor="waitlist-requested-date">
                <div className="flex flex-wrap gap-2">
                  {requestedDates.map((date) => <span key={date} className="inline-flex h-10 items-center gap-2 rounded-xl border border-brand/30 bg-brand-soft px-3 text-sm"><span>{new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00`))}</span><button type="button" aria-label={`Remove ${date}`} onClick={() => setRequestedDates((dates) => dates.filter((value) => value !== date))}>×</button></span>)}
                </div>
                {requestedDates.length < 3 ? <div className="mt-2 flex gap-2"><input id="waitlist-requested-date" type="date" min={today} value={dateToAdd} onChange={(event) => setDateToAdd(event.target.value)} className="h-11 flex-1 rounded-xl border border-border px-3 text-sm"/><button type="button" onClick={() => { if (dateToAdd && !requestedDates.includes(dateToAdd)) { setRequestedDates((dates) => [...dates, dateToAdd]); setDateToAdd(""); } }} className="rounded-xl border border-brand px-3 text-sm font-semibold text-brand">+ Add another day</button></div> : null}
                <p className="mt-2 text-xs text-muted">You can add up to 3 days.</p>
                {errors.requestedDates ? <ErrorText>{errors.requestedDates}</ErrorText> : null}
              </Field>
              <Field label="Name" htmlFor="waitlist-client-name">
                <input
                  id="waitlist-client-name"
                  type="text"
                  value={clientName}
                  onChange={(event) => {
                    setClientName(event.target.value);
                    setErrors((current) => ({
                      ...current,
                      clientName: undefined,
                    }));
                  }}
                  className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
                {errors.clientName ? <ErrorText>{errors.clientName}</ErrorText> : null}
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email (required)" htmlFor="waitlist-client-email">
                  <input
                    id="waitlist-client-email"
                    type="email"
                    value={clientEmail}
                    onChange={(event) => {
                      setClientEmail(event.target.value);
                      setErrors((current) => ({
                        ...current,
                        clientEmail: undefined,
                        contact: undefined,
                      }));
                    }}
                    className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                  {errors.clientEmail ? <ErrorText>{errors.clientEmail}</ErrorText> : null}
                </Field>

                <Field label="Phone" htmlFor="waitlist-client-phone">
                  <input
                    id="waitlist-client-phone"
                    type="tel"
                    value={clientPhone}
                    onChange={(event) => {
                      setClientPhone(event.target.value);
                      setErrors((current) => ({
                        ...current,
                        contact: undefined,
                      }));
                    }}
                    className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </Field>
              </div>
              <Field label="What times work?" htmlFor="waitlist-anytime">
                <label className="flex items-center gap-2 text-sm"><input id="waitlist-anytime" type="radio" checked={timePreference === "anytime"} onChange={() => setTimePreference("anytime")} /> Any time that day</label>
                <label className="mt-3 flex items-center gap-2 text-sm"><input type="radio" checked={timePreference === "range"} onChange={() => setTimePreference("range")} /> Choose a time range</label>
                {timePreference === "range" ? <div className="mt-3 grid grid-cols-2 gap-3"><label className="text-xs text-muted">Earliest time<input aria-label="Earliest time" type="time" value={requestedStartTime} onChange={(event) => setRequestedStartTime(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm"/></label><label className="text-xs text-muted">Latest time<input aria-label="Latest time" type="time" value={requestedEndTime} onChange={(event) => setRequestedEndTime(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm"/></label></div> : null}
              </Field>

              <Field label="Note" htmlFor="waitlist-note">
                <textarea
                  id="waitlist-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Anything the pro should know?"
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </Field>

              <p className="rounded-2xl bg-surface-warm px-4 py-3 text-xs leading-5 text-muted">
                If an opening becomes available, we’ll email everyone waiting for that time. Appointments are first come, first served and are not held.
              </p>

              {submitError ? (
                <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(183,121,61,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:transform-none disabled:opacity-60 disabled:shadow-none"
              >
                {submitting ? "Joining waitlist..." : "Join waitlist"}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function Field({
  children,
  htmlFor,
  label,
}: {
  children: ReactNode;
  htmlFor: string;
  label: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-sm leading-5 text-red-600">{children}</p>;
}

function getWaitlistErrorMessage(error: unknown) {
  // Map backend statuses to customer-friendly copy while preserving useful 400
  // validation messages from the API contract.
  const message = error instanceof Error ? error.message : "";
  const normalizedMessage = message.trim().toLowerCase();

  if (error instanceof ApiError) {
    if (error.status === 403) {
      return "Waitlist is not available for this stylist.";
    }

    if (error.status === 404) {
      return "This booking page could not be found.";
    }

    if (error.status === 409) {
      return "You're already on the waitlist for this date.";
    }

    if (error.status === 400) {
      if (normalizedMessage === "please provide either an email address or phone number.") {
        return "Please provide either an email address or phone number.";
      }

      if (message.trim()) {
        return message;
      }

      return "Please check your waitlist details and try again.";
    }
  }

  if (normalizedMessage === "waitlist is not available for this stylist.") {
    return "Waitlist is not available for this stylist.";
  }

  return "We couldn't add you to the waitlist. Please try again.";
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6 3v3m8-3v3M4.5 8.5h11M5 5h10a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 15 16H5a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 5 5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="m6 6 8 8M14 6l-8 8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
