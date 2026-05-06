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
  submitting: boolean;
  error?: string | null;
  timezone?: string | null;
  bookingBehavior?: PublicBookingBehavior | null;
  onNotesChange: (value: string) => void;
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
  submitting,
  error,
  timezone,
  bookingBehavior,
  onNotesChange,
  onEdit,
  onSubmit,
}: ConfirmStepProps) {
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
          <div className="rounded-2xl border border-border bg-zinc-50 p-4">
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
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:border-brand"
        />
        <p className="mt-2 text-right text-xs text-muted">{notes.length}/250</p>
      </label>

      {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

      <button
        type="button"
        disabled={submitting}
        onClick={onSubmit}
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(109,79,242,0.26)] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? "Booking..." : "Book Appointment"}
        <ArrowIcon />
      </button>
    </div>
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
