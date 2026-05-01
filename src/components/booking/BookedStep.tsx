"use client";

import type {
  PublicBookingConfirmation,
  PublicService,
  PublicSlot,
  PublicStylist,
} from "@/src/lib/api";
import {
  buildBookingIcs,
  buildSummaryName,
  formatServiceNames,
  formatCurrency,
  formatDuration,
  formatLongDate,
  formatTime,
  sumServiceDurations,
  sumServicePrices,
} from "@/src/lib/booking-format";

type BookedStepProps = {
  confirmation: PublicBookingConfirmation;
  stylist: PublicStylist;
  services: PublicService[];
  slot: PublicSlot;
  onDone: () => void;
};

export function BookedStep({
  confirmation,
  stylist,
  services,
  slot,
  onDone,
}: BookedStepProps) {
  const scheduled = confirmation.status === "scheduled";
  const serviceNames = services.length
    ? formatServiceNames(services)
    : confirmation.service_name;
  const totalDuration = services.length
    ? formatDuration(sumServiceDurations(services))
    : formatDuration(confirmation.service_duration_minutes);
  const totalPrice = services.length
    ? formatCurrency(sumServicePrices(services))
    : formatCurrency(confirmation.service_price);

  function handleAddToCalendar() {
    const file = new Blob(
      [buildBookingIcs(confirmation, stylist, services, slot)],
      {
        type: "text/calendar;charset=utf-8",
      },
    );
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `shearsync-${stylist.slug}-booking.ics`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-[0_20px_35px_rgba(16,185,129,0.22)]">
        <CheckIcon />
      </div>

      <h2 className="mt-6 text-[34px] font-semibold tracking-tight text-foreground">
        {scheduled ? "You're All Set!" : "Request Received"}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        {scheduled
          ? "Your appointment is confirmed."
          : "Your appointment request is awaiting approval."}
      </p>

      <div className="mt-8 rounded-3xl border border-border bg-white p-5 text-left shadow-sm">
        <div className="space-y-4 text-sm">
          <Row
            label="Date"
            value={formatLongDate(
              confirmation.appointment_date,
              confirmation.business_timezone,
            )}
          />
          <Row
            label="Time"
            value={formatTime(
              confirmation.appointment_date,
              confirmation.business_timezone,
            )}
          />
          <Row label="Service" value={serviceNames} />
          <Row label="Duration" value={totalDuration} />
          <Row label="Price" value={totalPrice} />
          <Row label="Business" value={buildSummaryName(stylist)} />
          <Row
            label="Timezone"
            value={confirmation.business_timezone || stylist.timezone || "--"}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCalendar}
        className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(109,79,242,0.26)] transition-transform hover:-translate-y-0.5"
      >
        Add to Calendar
      </button>
      <button
        type="button"
        onClick={onDone}
        className="mt-3 w-full rounded-2xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
      >
        Done
      </button>

      <p className="mt-8 text-xs text-muted">
        Powered by {buildSummaryName(stylist)}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className="text-right font-semibold text-foreground">{value}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path
        d="M5.5 12.5 10 17l8.5-9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}
