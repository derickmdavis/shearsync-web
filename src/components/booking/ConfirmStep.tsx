import { useRef, useState, type ChangeEvent } from "react";
import type {
  PublicBookingBehavior,
  PublicService,
  PublicSlot,
  PublicStylist,
} from "@/src/lib/api";
import {
  buildSummaryName,
  formatServiceNames,
  formatCurrency,
  formatDuration,
  formatLongDate,
  formatTime,
  sumServiceDurations,
  sumServicePrices,
} from "@/src/lib/booking-format";

type ConfirmStepProps = {
  stylist: PublicStylist;
  services: PublicService[];
  slot: PublicSlot;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  referencePhotoFile?: File | null;
  referencePhotoPreviewUrl?: string | null;
  submitting: boolean;
  error?: string | null;
  timezone?: string | null;
  bookingBehavior?: PublicBookingBehavior | null;
  onNotesChange: (value: string) => void;
  onReferencePhotoSelect: (file: File) => void;
  onReferencePhotoRemove: () => void;
  onEdit: (step: number) => void;
  onSubmit: () => void;
};

export function ConfirmStep({
  stylist,
  services,
  slot,
  fullName,
  email,
  phone,
  notes,
  referencePhotoFile,
  referencePhotoPreviewUrl,
  submitting,
  error,
  timezone,
  bookingBehavior,
  onNotesChange,
  onReferencePhotoSelect,
  onReferencePhotoRemove,
  onEdit,
  onSubmit,
}: ConfirmStepProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [referencePhotoError, setReferencePhotoError] = useState<string | null>(
    null,
  );
  const totalDuration = sumServiceDurations(services);
  const totalPrice = sumServicePrices(services);
  const serviceSummary = formatServiceNames(services);
  const bookingPreviewMessage = bookingBehavior?.requiresApproval
    ? "New client appointments require approval."
    : bookingBehavior?.message;

  return (
    <div>
      <div>
        <h2 className="text-[30px] font-semibold tracking-tight text-foreground">
          Review your booking
        </h2>
        <p className="mt-2 text-sm text-muted">
          Almost done. Please confirm your details.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {bookingBehavior ? (
          <div className="rounded-2xl border border-border bg-surface-warm p-4">
            <p className="text-sm font-semibold text-foreground">
              Booking preview
            </p>
            <p className="mt-1 text-sm leading-6 text-muted">
              {bookingPreviewMessage}
            </p>
            {bookingBehavior.requiresApproval ? (
              <p className="mt-2 text-sm leading-6 text-muted">
                Please watch your email for a final confirmation.
              </p>
            ) : null}
          </div>
        ) : null}

        <ReviewCard title="Your Details" action={() => onEdit(1)}>
          <p className="font-medium text-foreground">{fullName}</p>
          <p className="mt-1 text-sm text-muted">{phone}</p>
          {email ? <p className="mt-1 text-sm text-muted">{email}</p> : null}
        </ReviewCard>

        <ReviewCard title="Your Services" action={() => onEdit(1)}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">{serviceSummary}</p>
              <p className="mt-1 text-sm text-muted">
                {buildSummaryName(stylist)}
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="font-medium text-foreground">
                {formatDuration(totalDuration)}
              </p>
              <p className="mt-1 text-muted">{formatCurrency(totalPrice)}</p>
            </div>
          </div>
        </ReviewCard>

        <ReviewCard title="Date & Time" action={() => onEdit(2)}>
          <p className="font-medium text-foreground">
            {formatLongDate(slot.start, timezone)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {formatTime(slot.start, timezone)}
          </p>
          <p className="mt-1 text-sm text-muted">{timezone}</p>
        </ReviewCard>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-foreground">
          Add a note (optional)
        </span>
        <textarea
          value={notes}
          onChange={(event) => onNotesChange(event.target.value.slice(0, 250))}
          rows={4}
          placeholder="Anything we should know?"
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <p className="mt-2 text-right text-xs text-muted">{notes.length}/250</p>
      </label>

      <section className="mt-5 text-left">
        <h3 className="text-sm font-semibold text-foreground">
          Add a reference photo (optional)
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          Share an inspiration photo, current hair photo, or style reference to
          help your stylist prepare.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/pjpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          className="sr-only"
          onChange={handleReferencePhotoChange}
        />

        {referencePhotoFile ? (
          <div className="mt-4 rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center gap-3">
              {referencePhotoPreviewUrl ? (
                <span
                  aria-hidden="true"
                  className="h-16 w-16 shrink-0 rounded-xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${referencePhotoPreviewUrl})`,
                  }}
                />
              ) : (
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-brand/20 text-brand">
                  <ImageIcon />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {referencePhotoFile.name}
                </p>
                <p className="mt-1 text-xs text-muted">
                  Ready to upload after booking
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setReferencePhotoError(null);
                  onReferencePhotoRemove();
                }}
                className="shrink-0 text-sm font-semibold text-brand"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 flex min-h-24 w-full items-center justify-between gap-4 rounded-2xl border border-dashed border-brand/40 bg-white px-4 py-4 text-left transition hover:border-brand hover:bg-brand/5"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/30 text-brand">
                <ImageIcon />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  Add a reference photo
                </span>
                <span className="mt-1 block text-xs text-muted">
                  JPG, PNG, or WebP up to 5 MB
                </span>
              </span>
            </span>
            <span className="shrink-0 rounded-full border border-brand/50 px-4 py-2 text-xs font-semibold text-brand">
              Upload Photo
            </span>
          </button>
        )}

        {referencePhotoError ? (
          <p className="mt-2 text-sm text-red-500">{referencePhotoError}</p>
        ) : null}
      </section>

      {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

      <button
        type="button"
        disabled={submitting}
        onClick={onSubmit}
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? "Booking..." : "Book Appointment"}
        <ArrowIcon />
      </button>
    </div>
  );

  function handleReferencePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!isAcceptedReferencePhoto(file)) {
      setReferencePhotoError(
        "We couldn't use that photo. Please choose a JPG, PNG, or WebP image.",
      );
      return;
    }

    setReferencePhotoError(null);
    onReferencePhotoSelect(file);
  }
}

const ACCEPTED_REFERENCE_PHOTO_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/webp",
] as const;

const ACCEPTED_REFERENCE_PHOTO_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
] as const;

function isAcceptedReferencePhoto(file: File) {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  return (
    ACCEPTED_REFERENCE_PHOTO_TYPES.some(
      (contentType) => contentType === type,
    ) ||
    ACCEPTED_REFERENCE_PHOTO_EXTENSIONS.some((extension) =>
      name.endsWith(extension),
    )
  );
}

type ReviewCardProps = {
  title: string;
  children: React.ReactNode;
  action: () => void;
};

function ReviewCard({ title, children, action }: ReviewCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <button
          type="button"
          onClick={action}
          className="text-sm font-semibold text-brand"
        >
          Edit
        </button>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="M4 10h12m-4-4 4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="15"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m6.5 16 3.2-3.4 2.4 2.3 2.6-3.1L18 16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" />
    </svg>
  );
}
