"use client";

import { useEffect, useRef, useState } from "react";
import {
  createPublicBookingInquiry,
  createPublicBookingInquirySession,
  type BookingInquiryFormConfig,
} from "@/src/lib/api";
import { BookingInquiryPhotoUpload } from "@/src/components/booking/BookingInquiryPhotoUpload";

type Props = {
  slug: string;
  config?: BookingInquiryFormConfig;
  phone: string;
  email: string;
  validateContact: () => boolean;
  previewMode?: boolean;
};

export function BookingInquiryCard({ slug, config, phone, email, validateContact, previewMode = false }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<BookingInquiryFormConfig | undefined>(config);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [desiredOutcome, setDesiredOutcome] = useState("");
  const [hairHistory, setHairHistory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photoIds, setPhotoIds] = useState<string[]>([]);
  const [photosBusy, setPhotosBusy] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const enabled = config?.enabled === true;
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!enabled) return null;

  async function openInquiry() {
    if (!validateContact()) return;
    setError(null);
    setOpen(true);
    if (previewMode) return;
    if (sessionId) return;
    try {
      const session = await createPublicBookingInquirySession(slug);
      setSessionId(session.inquiry_session_id);
      setForm(session.booking_request_form);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn't start your inquiry. Please try again.");
    }
  }

  async function submit() {
    if (!validateContact() || (!sessionId && !previewMode)) return;
    const desired = desiredOutcome.trim();
    const history = hairHistory.trim();
    if (!desired || !history) {
      setError("Please answer the first two questions.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      if (previewMode) {
        setSuccess(true);
        return;
      }
      await createPublicBookingInquiry({
        inquiry_session_id: sessionId!,
        guest_phone: phone.trim(),
        guest_email: email.trim() || undefined,
        inquiry_answers: { desired_outcome: desired, hair_history: history, optional_photo_upload_ids: photoIds },
      });
      setSuccess(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn't send your inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const prompt = (id: string) => form?.questions.find((question) => question.id === id)?.prompt;
  return <>
    <section className="mt-6 rounded-3xl border border-brand/30 bg-brand-soft/45 p-4 sm:flex sm:items-center sm:gap-4 sm:p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand" aria-hidden="true">?</span>
      <div className="mt-3 min-w-0 sm:mt-0 sm:flex-1">
        <h3 className="text-base font-semibold text-foreground">Not sure what to book?</h3>
        <p className="mt-1 text-sm leading-5 text-muted">Answer a few questions and the stylist will reach out with more guidance.</p>
        <p className="mt-2 inline-flex rounded-full bg-white px-2 py-1 text-xs font-medium text-muted">3 questions set by your stylist</p>
      </div>
      <button type="button" onClick={() => void openInquiry()} className="mt-4 min-h-11 w-full rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark sm:mt-0 sm:w-auto">
        Answer a few questions
      </button>
    </section>
    {open ? <div className="fixed inset-0 z-50 flex items-end bg-black/45 p-0 sm:items-center sm:justify-center sm:p-6" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="booking-inquiry-title" className="max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl bg-card p-5 shadow-2xl sm:max-w-xl sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between gap-4"><div><h2 id="booking-inquiry-title" className="text-2xl font-semibold text-foreground">Booking Inquiry</h2><p className="mt-1 text-sm leading-5 text-muted">Answer a few quick questions and your stylist will reach out with more guidance.</p></div><button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} aria-label="Close booking inquiry" className="min-h-10 min-w-10 rounded-full text-xl text-muted hover:bg-black/5">×</button></div>
        {success ? <div className="py-10 text-center"><h3 className="text-xl font-semibold text-foreground">Inquiry sent</h3><p className="mt-2 text-sm leading-6 text-muted">Your stylist will review your answers and reach out with more guidance.</p><button type="button" onClick={() => setOpen(false)} className="mt-6 min-h-11 rounded-xl bg-brand px-5 text-sm font-semibold text-white">Close</button></div> : <div className="mt-6 space-y-5">
          <p className="text-xs font-medium text-muted">3 questions set by your stylist</p>
          <InquiryTextarea number="1" label={prompt("desired_outcome") ?? "What are you hoping to achieve with your hair?"} value={desiredOutcome} onChange={setDesiredOutcome} />
          <InquiryTextarea number="2" label={prompt("hair_history") ?? "Describe your current hair and any recent coloring."} value={hairHistory} onChange={setHairHistory} />
          <div><p className="text-sm font-semibold text-foreground">3. {prompt("optional_photos") ?? "Optional photos"}</p><p className="mt-1 text-sm text-muted">Clients can add photos to provide more context.</p><BookingInquiryPhotoUpload sessionId={sessionId} disabled={submitting || previewMode} onChange={setPhotoIds} onBusyChange={setPhotosBusy} /></div>
          {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
          <button type="button" disabled={submitting || photosBusy || (!sessionId && !previewMode)} onClick={() => void submit()} className="min-h-12 w-full rounded-xl bg-brand px-5 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Sending inquiry..." : photosBusy ? "Finishing photos…" : "Send inquiry"}</button>
        </div>}
      </section>
    </div> : null}
  </>;
}

function InquiryTextarea({ number, label, value, onChange }: { number: string; label: string; value: string; onChange: (value: string) => void }) {
  const id = `booking-inquiry-${number}`;
  return <label htmlFor={id} className="block"><span className="text-sm font-semibold text-foreground">{number}. {label}</span><textarea id={id} value={value} maxLength={2000} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" /></label>;
}
