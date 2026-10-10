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
  enabled: boolean;
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  validateContact: () => boolean;
  previewMode?: boolean;
  variant?: "details" | "services";
};

export function BookingInquiryCard({ slug, config, enabled: enabledByStylist, contact, validateContact, previewMode = false, variant = "details" }: Props) {
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

  const enabled = enabledByStylist && form?.enabled === true;
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
        guest_first_name: contact.firstName.trim(),
        guest_last_name: contact.lastName.trim(),
        guest_phone: contact.phone.trim(),
        guest_email: contact.email.trim(),
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
  const serviceEntry = variant === "services";
  return <>
    <section className="rounded-2xl border border-[#b7bba9] bg-[#eef0e6] p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white font-display text-[27px] text-brand" aria-hidden="true">{serviceEntry ? "?" : "✦"}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[28px] leading-7 font-medium text-foreground">{serviceEntry ? "Need help choosing?" : "Booking inquiry"}</h3>
          <p className="mt-1 text-sm leading-5 text-muted">{serviceEntry ? "Send a booking inquiry." : "Not sure what to book? I’d like help choosing."}</p>
        </div>
        <button type="button" onClick={() => void openInquiry()} aria-label="Open booking inquiry" className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl text-brand transition-transform hover:translate-x-0.5">›</button>
      </div>
    </section>
    {open ? <div className="fixed inset-0 z-50 flex items-end bg-black/45 p-0 sm:items-center sm:justify-center sm:p-6" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="booking-inquiry-title" className="max-h-[94dvh] w-full overflow-y-auto rounded-t-3xl bg-card p-6 shadow-2xl sm:max-w-xl sm:rounded-3xl sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">Booking inquiry</p><h2 id="booking-inquiry-title" className="mt-5 font-display text-[46px] leading-[0.9] font-medium tracking-[-0.04em] text-foreground">Tell me what you’re looking for</h2><p className="mt-4 font-display text-[22px] leading-7 text-muted">A few details will help me recommend the right service.</p></div><button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} aria-label="Close booking inquiry" className="min-h-10 min-w-10 rounded-full text-2xl text-brand hover:bg-black/5">×</button></div>
        {success ? <div className="py-10"><h3 className="font-display text-[38px] leading-none font-medium text-foreground">Your inquiry is on its way.</h3><p className="mt-4 text-sm leading-6 text-muted">Thanks for sharing what you’re looking for. The stylist will follow up using the contact details you provided. This does not reserve an appointment.</p><button type="button" onClick={() => setOpen(false)} className="mt-8 min-h-12 w-full rounded-xl bg-brand px-5 font-display text-[23px] text-white">Close</button></div> : <div className="mt-9 space-y-7">
          <InquiryTextarea number="1" label={prompt("desired_outcome") ?? "What are you hoping to achieve with your hair?"} value={desiredOutcome} onChange={setDesiredOutcome} />
          <InquiryTextarea number="2" label={prompt("hair_history") ?? "Describe your current hair and any recent coloring."} value={hairHistory} onChange={setHairHistory} />
          <div><p className="font-display text-[29px] leading-8 font-medium text-foreground">Add inspiration photos (optional)</p><p className="mt-2 text-sm text-muted">{prompt("optional_photos") ?? "Add photos to provide more context."}</p><BookingInquiryPhotoUpload sessionId={sessionId} disabled={submitting || previewMode} onChange={setPhotoIds} onBusyChange={setPhotosBusy} /></div>
          <p className="text-sm leading-6 text-muted">I’ll follow up using the contact details you provided.</p>
          {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
          <button type="button" disabled={submitting || photosBusy || (!sessionId && !previewMode)} onClick={() => void submit()} className="min-h-14 w-full rounded-xl bg-brand px-5 font-display text-[25px] text-white disabled:opacity-60">{submitting ? "Sending inquiry..." : photosBusy ? "Finishing photos…" : "Send inquiry"}</button>
        </div>}
      </section>
    </div> : null}
  </>;
}

function InquiryTextarea({ number, label, value, onChange }: { number: string; label: string; value: string; onChange: (value: string) => void }) {
  const id = `booking-inquiry-${number}`;
  return <label htmlFor={id} className="block"><span className="font-display text-[29px] leading-8 font-medium text-foreground">{label}</span><textarea id={id} value={value} maxLength={2000} onChange={(event) => onChange(event.target.value)} className="mt-3 min-h-32 w-full rounded-xl border border-border/70 bg-white p-4 text-base leading-6 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" /></label>;
}
