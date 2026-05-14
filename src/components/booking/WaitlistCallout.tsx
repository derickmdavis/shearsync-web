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
  defaultClientName: string;
  defaultClientEmail: string;
  defaultClientPhone: string;
};

type WaitlistFormErrors = Partial<{
  requestedDate: string;
  clientName: string;
  clientEmail: string;
  contact: string;
}>;

export function WaitlistCallout({
  slug,
  selectedDate,
  selectedServiceId,
  defaultClientName,
  defaultClientEmail,
  defaultClientPhone,
}: WaitlistCalloutProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-4 rounded-[16px] border border-[rgba(109,77,242,0.18)] bg-[rgba(109,77,242,0.05)] p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-[0_2px_8px_rgba(17,24,39,0.06)]">
            <CalendarIcon />
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-[15px] font-bold text-[#111827]">
              No availability for the day you need?
            </h4>
            <p className="mt-1 text-sm leading-6 text-[#6B7280]">
              Join the waitlist and the stylist can contact you if something
              opens.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-3 inline-flex h-11 items-center justify-center rounded-2xl bg-brand px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(109,79,242,0.22)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#6D4DF2]/25"
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
  defaultClientName,
  defaultClientEmail,
  defaultClientPhone,
  onClose,
}: WaitlistCalloutProps & { onClose: () => void }) {
  const today = getTodayDateValue();
  const [requestedDate, setRequestedDate] = useState(selectedDate);
  const [clientName, setClientName] = useState(defaultClientName);
  const [clientEmail, setClientEmail] = useState(defaultClientEmail);
  const [clientPhone, setClientPhone] = useState(defaultClientPhone);
  const [requestedTimePreference, setRequestedTimePreference] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<WaitlistFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function validate() {
    const nextErrors: WaitlistFormErrors = {};
    const trimmedEmail = clientEmail.trim();
    const trimmedPhone = clientPhone.trim();

    if (!requestedDate) {
      nextErrors.requestedDate = "Requested date is required.";
    } else if (requestedDate < today) {
      nextErrors.requestedDate = "Requested date must be today or later.";
    }

    if (!clientName.trim()) {
      nextErrors.clientName = "Name is required.";
    }

    if (!trimmedEmail && !trimmedPhone) {
      nextErrors.contact = "Please provide either an email address or phone number.";
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
      requestedDate,
      serviceId: selectedServiceId || null,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim() || null,
      clientPhone: clientPhone.trim() || null,
      requestedTimePreference: requestedTimePreference.trim() || null,
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
              className="text-2xl font-semibold tracking-tight text-[#111827]"
            >
              You&apos;re on the waitlist
            </h2>
            <p
              id="waitlist-description"
              className="mt-3 text-sm leading-6 text-[#6B7280]"
            >
              The stylist can contact you if something opens. Joining the
              waitlist does not reserve an appointment time.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(109,79,242,0.22)]"
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
                  className="text-2xl font-semibold tracking-tight text-[#111827]"
                >
                  Join the waitlist
                </h2>
                <p
                  id="waitlist-description"
                  className="mt-2 text-sm leading-6 text-[#6B7280]"
                >
                  Tell us what day works for you. The stylist can contact you if
                  something opens.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition-colors hover:bg-zinc-50"
                aria-label="Close waitlist form"
              >
                <CloseIcon />
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <Field label="Requested date" htmlFor="waitlist-requested-date">
                <input
                  id="waitlist-requested-date"
                  type="date"
                  min={today}
                  value={requestedDate}
                  onChange={(event) => {
                    setRequestedDate(event.target.value);
                    setErrors((current) => ({
                      ...current,
                      requestedDate: undefined,
                    }));
                  }}
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition-colors focus:border-[#6D4DF2] focus:ring-2 focus:ring-[#6D4DF2]/15"
                />
                {errors.requestedDate ? <ErrorText>{errors.requestedDate}</ErrorText> : null}
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
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition-colors focus:border-[#6D4DF2] focus:ring-2 focus:ring-[#6D4DF2]/15"
                />
                {errors.clientName ? <ErrorText>{errors.clientName}</ErrorText> : null}
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" htmlFor="waitlist-client-email">
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
                    className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition-colors focus:border-[#6D4DF2] focus:ring-2 focus:ring-[#6D4DF2]/15"
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
                    className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition-colors focus:border-[#6D4DF2] focus:ring-2 focus:ring-[#6D4DF2]/15"
                  />
                </Field>
              </div>
              {errors.contact ? <ErrorText>{errors.contact}</ErrorText> : null}

              <Field label="Preferred time" htmlFor="waitlist-time-preference">
                <input
                  id="waitlist-time-preference"
                  type="text"
                  value={requestedTimePreference}
                  onChange={(event) => setRequestedTimePreference(event.target.value)}
                  placeholder="Morning preferred"
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#6D4DF2] focus:ring-2 focus:ring-[#6D4DF2]/15"
                />
              </Field>

              <Field label="Note" htmlFor="waitlist-note">
                <textarea
                  id="waitlist-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Anything the stylist should know?"
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#6D4DF2] focus:ring-2 focus:ring-[#6D4DF2]/15"
                />
              </Field>

              <p className="rounded-2xl bg-zinc-50 px-4 py-3 text-xs leading-5 text-[#6B7280]">
                Joining the waitlist does not reserve an appointment time.
              </p>

              {submitError ? (
                <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(109,79,242,0.22)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:transform-none disabled:opacity-60 disabled:shadow-none"
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
