import { useMemo, useState } from "react";
import type { PublicSlot } from "@/src/lib/api";
import {
  addDaysToDate,
  buildWeekDateOptions,
  formatDateChip,
  formatMonthLabel,
  formatTimezoneLabel,
  getTodayDateValue,
  startOfWeek,
} from "@/src/lib/booking-format";
import { TimeSlotGrid } from "@/src/components/booking/TimeSlotGrid";

type TimeStepProps = {
  dates: string[];
  disabledDates?: string[];
  selectedDate?: string;
  selectedSlot?: PublicSlot | null;
  slots: PublicSlot[];
  loading: boolean;
  error?: string | null;
  timezone?: string | null;
  onDateSelect: (date: string) => void;
  onSlotSelect: (slot: PublicSlot) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function TimeStep({
  dates,
  disabledDates = [],
  selectedDate,
  selectedSlot,
  slots,
  loading,
  error,
  timezone,
  onDateSelect,
  onSlotSelect,
  onBack,
  onContinue,
}: TimeStepProps) {
  const disabledDateSet = new Set(disabledDates);
  const today = useMemo(() => getTodayDateValue(), []);
  const minimumWeekStart = useMemo(() => startOfWeek(today), [today]);
  const [visibleWeekStart, setVisibleWeekStart] = useState(() =>
    startOfWeek(selectedDate || dates[0] || today),
  );
  const visibleDates = useMemo(
    () => buildWeekDateOptions(visibleWeekStart),
    [visibleWeekStart],
  );

  return (
    <div>
      <div>
        <h2 className="text-[30px] font-semibold tracking-tight text-foreground">
          Choose a date &amp; time
        </h2>
        <p className="mt-2 text-sm text-muted">
          Browse weeks or jump to any future day to check availability.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-foreground">
            {formatMonthLabel(visibleWeekStart, timezone)}
          </p>
          <p className="mt-1 text-xs font-medium text-muted">
            {formatTimezoneLabel(timezone)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setVisibleWeekStart(addDaysToDate(visibleWeekStart, -7))}
            disabled={visibleWeekStart <= minimumWeekStart}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-brand/35 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Show previous week"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => setVisibleWeekStart(addDaysToDate(visibleWeekStart, 7))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-brand/35"
            aria-label="Show next week"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Jump to date
          <input
            type="date"
            value={selectedDate || ""}
            min={today}
            onChange={(event) => {
              const nextDate = event.target.value;

              if (!nextDate || nextDate < today) {
                return;
              }

              setVisibleWeekStart(startOfWeek(nextDate));
              onDateSelect(nextDate);
            }}
            className="h-11 rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-brand"
          />
        </label>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {visibleDates.map((date) => {
          const selected = date === selectedDate;
          const unavailable = disabledDateSet.has(date);
          const isPastDate = date < today;
          const disabled = !selected && (unavailable || isPastDate);
          const [weekdayLabel, dayLabel] = formatDateChip(date, timezone).split(" ");

          return (
            <button
              key={date}
              type="button"
              onClick={() => {
                if (!disabled) {
                  setVisibleWeekStart(startOfWeek(date));
                  onDateSelect(date);
                }
              }}
              disabled={disabled}
              aria-disabled={disabled}
              className={[
                "min-w-16 rounded-2xl border px-3 py-3 text-center transition-all disabled:cursor-not-allowed",
                selected
                  ? "border-brand bg-brand text-white shadow-[0_14px_24px_rgba(109,79,242,0.18)]"
                  : disabled
                    ? "border-border bg-zinc-100 text-zinc-400 opacity-70"
                    : "border-border bg-white text-foreground",
                !selected && !disabled ? "hover:border-brand/35" : "",
              ].join(" ")}
            >
              <span className="block text-[11px] font-medium opacity-90">
                {weekdayLabel}
              </span>
              <span className="mt-1 block text-base font-semibold">
                {dayLabel}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 min-h-52 rounded-3xl bg-zinc-50 p-4">
        {loading ? (
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-12 animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm leading-6 text-red-500">{error}</p>
        ) : slots.length ? (
          <TimeSlotGrid
            slots={slots}
            selectedSlot={selectedSlot}
            timeZone={timezone}
            onSelect={onSlotSelect}
          />
        ) : (
          <div className="flex h-full min-h-44 items-center justify-center text-center">
            <p className="max-w-xs text-sm leading-6 text-muted">
              No available times for this date.
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={!selectedSlot}
        aria-disabled={!selectedSlot}
        className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(109,79,242,0.26)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:transform-none disabled:opacity-50 disabled:shadow-none"
      >
        Continue
        <ArrowIcon />
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
      >
        Back
      </button>
    </div>
  );
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={[
        "h-4 w-4",
        direction === "left" ? "rotate-180" : "",
      ].join(" ")}
    >
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
