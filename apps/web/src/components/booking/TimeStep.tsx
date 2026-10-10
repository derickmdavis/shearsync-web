import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import type { PublicSlot } from "@/src/lib/api";
import {
  addDaysToDate,
  formatMonthLabel,
  formatTime,
  getTodayDateValue,
} from "@/src/lib/booking-format";

type AvailabilityDayPreview = {
  date: string;
  slots: PublicSlot[];
};

type TimeStepProps = {
  selectedDate?: string;
  selectedSlot?: PublicSlot | null;
  upcomingDays: AvailabilityDayPreview[];
  loading: boolean;
  error?: string | null;
  timezone?: string | null;
  waitlistCta?: ReactNode;
  onDateSelect: (date: string) => void;
  onSlotSelect: (slot: PublicSlot) => void;
  onBack: () => void;
  onContinue: () => void;
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function TimeStep({
  selectedDate,
  selectedSlot,
  upcomingDays,
  loading,
  error,
  timezone,
  waitlistCta,
  onDateSelect,
  onSlotSelect,
  onBack,
  onContinue,
}: TimeStepProps) {
  const today = useMemo(() => getTodayDateValue(), []);
  const nextAvailableDay = upcomingDays[0] ?? null;
  const [calendarMonthStart, setCalendarMonthStart] = useState(() =>
    getMonthStart(selectedDate || nextAvailableDay?.date || today),
  );
  const calendarDates = useMemo(
    () => buildMonthDateOptions(calendarMonthStart),
    [calendarMonthStart],
  );
  const selectedDay = selectedDate
    ? upcomingDays.find((day) => day.date === selectedDate) ?? null
    : null;
  const showEmptyState = !loading && !error && upcomingDays.length === 0;

  function handleSlotSelection(slot: PublicSlot) {
    if (!selectedDate) return;
    onDateSelect(selectedDate);
    onSlotSelect(slot);
  }

  return (
    <div className="pb-5">
      <div>
        <h2 className="font-display text-[40px] leading-[0.92] font-medium tracking-[-0.045em] text-foreground sm:text-[47px]">
          Choose a time
        </h2>
        <p className="mt-3 font-display text-[20px] leading-6 text-muted">
          Select a date and appointment time.
        </p>
      </div>

      <div className="mt-9">
        {loading && !nextAvailableDay ? <LoadingState /> : null}

        {error ? (
          <InfoCard>
            <p className="text-sm leading-6 text-red-500">{error}</p>
          </InfoCard>
        ) : null}

        <section className="border-b border-border/60 pb-7" aria-label="Appointment calendar">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCalendarMonthStart((month) => addMonthsToDate(month, -1))}
              disabled={calendarMonthStart <= getMonthStart(today)}
              className="inline-flex h-10 w-10 items-center justify-center text-brand transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Show previous month"
            >
              <ArrowIcon direction="left" />
            </button>

            <p className="font-display text-[27px] font-medium text-foreground">
              {formatMonthLabel(calendarMonthStart, timezone)}
            </p>

            <button
              type="button"
              onClick={() => setCalendarMonthStart((month) => addMonthsToDate(month, 1))}
              className="inline-flex h-10 w-10 items-center justify-center text-brand transition-colors hover:bg-brand-soft"
              aria-label="Show next month"
            >
              <ArrowIcon />
            </button>
          </div>

          <div className="mt-7 grid grid-cols-7 gap-y-3">
            {WEEKDAY_LABELS.map((day) => (
              <span
                key={day}
                className="text-center text-[10px] font-semibold tracking-[0.16em] text-[#705640] uppercase"
              >
                {day}
              </span>
            ))}

            {calendarDates.map((date) => {
              const isSelected = date === selectedDate;
              const isPastDate = date < today;
              const isCurrentMonth = date.slice(0, 7) === calendarMonthStart.slice(0, 7);

              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => {
                    if (!isPastDate) onDateSelect(date);
                  }}
                  disabled={isPastDate}
                  className={[
                    "mx-auto flex h-9 w-9 items-center justify-center rounded-full font-display text-[19px] leading-none transition-colors",
                    isSelected
                      ? "bg-brand text-white shadow-[0_8px_18px_rgba(176,122,62,0.2)]"
                      : isPastDate
                        ? "text-foreground/30"
                        : isCurrentMonth
                          ? "text-foreground hover:bg-brand-soft"
                          : "text-foreground/25 hover:bg-brand-soft",
                  ].join(" ")}
                >
                  {formatDayNumber(date, timezone)}
                </button>
              );
            })}
          </div>
        </section>

        {!loading && !error && waitlistCta ? waitlistCta : null}

        {!loading && !error && !showEmptyState ? (
          <>
          <section className="mt-7">
            <div className="flex items-center gap-5" aria-hidden="true">
              <span className="h-px flex-1 bg-border/60" />
              <span className="font-display text-[31px] leading-none text-brand">✦</span>
              <span className="h-px flex-1 bg-border/60" />
            </div>
          </section>

          <section className="mt-7">
            <h3 className="font-display text-[27px] leading-7 font-medium text-foreground">
              {selectedDate ? formatSelectedDate(selectedDate, timezone) : "Choose a date"}
            </h3>
            {selectedDay ? (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {selectedDay.slots.map((slot) => (
                  <TimeSlotPill
                    key={slot.start}
                    slot={slot}
                    selected={selectedSlot?.start === slot.start}
                    timeZone={timezone}
                    onSelect={() => handleSlotSelection(slot)}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">
                No appointment times are available for this date.
              </p>
            )}
          </section>
          </>
        ) : null}

        {showEmptyState ? (
          <InfoCard>
            <h3 className="font-display text-[28px] font-medium text-foreground">No available times</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Choose a different date or check back later.</p>
          </InfoCard>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={loading || !selectedSlot}
        aria-disabled={loading || !selectedSlot}
        className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 font-display text-[23px] font-medium text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:transform-none disabled:opacity-50 disabled:shadow-none"
      >
        {loading ? "Checking..." : "Continue"}
        <ArrowIcon />
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
      >
        Back
      </button>
    </div>
  );
}

function InfoCard({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-border/70 bg-white/70 p-5">{children}</div>;
}

function TimeSlotPill({
  slot,
  selected,
  timeZone,
  onSelect,
}: {
  slot: PublicSlot;
  selected: boolean;
  timeZone?: string | null;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        "inline-flex h-[52px] w-full items-center justify-center whitespace-nowrap rounded-xl border px-2 font-display text-[17px] leading-none font-medium transition-all",
        selected
          ? "border-brand bg-brand text-white shadow-[0_8px_18px_rgba(176,122,62,0.2)]"
          : "border-border/70 bg-white/65 text-foreground hover:border-brand hover:bg-brand-soft",
      ].join(" ")}
    >
      {formatTime(slot.start, timeZone)}
    </button>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <InfoCard key={index}>
          <div className="h-20 animate-pulse rounded-xl bg-brand-soft" />
        </InfoCard>
      ))}
    </div>
  );
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={["h-5 w-5", direction === "left" ? "rotate-180" : ""].join(" ")}>
      <path d="M4 10h12m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function getMonthStart(date: string) {
  return `${date.slice(0, 7)}-01`;
}

function addMonthsToDate(date: string, amount: number) {
  const target = new Date(`${date}T12:00:00`);
  target.setMonth(target.getMonth() + amount, 1);
  return `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, "0")}-01`;
}

function buildMonthDateOptions(monthStart: string) {
  const monthDate = new Date(`${monthStart}T12:00:00`);
  const firstWeekday = monthDate.getDay();
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const gridStart = addDaysToDate(monthStart, -firstWeekday);
  return Array.from({ length: cellCount }, (_, index) => addDaysToDate(gridStart, index));
}

function formatDayNumber(date: string, timeZone?: string | null) {
  return new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: timeZone ?? undefined }).format(new Date(`${date}T12:00:00`));
}

function formatSelectedDate(date: string, timeZone?: string | null) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: timeZone ?? undefined }).format(new Date(`${date}T12:00:00`));
}
