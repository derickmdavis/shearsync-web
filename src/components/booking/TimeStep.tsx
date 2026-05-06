import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import type { PublicSlot } from "@/src/lib/api";
import {
  addDaysToDate,
  buildWeekDateOptions,
  formatMonthLabel,
  formatMonthDay,
  formatShortWeekday,
  formatTime,
  getTodayDateValue,
  startOfWeek,
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
  onDateSelect: (date: string) => void;
  onSlotSelect: (slot: PublicSlot) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function TimeStep({
  selectedDate,
  selectedSlot,
  upcomingDays,
  loading,
  error,
  timezone,
  onDateSelect,
  onSlotSelect,
  onBack,
  onContinue,
}: TimeStepProps) {
  const today = useMemo(() => getTodayDateValue(), []);
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  const nextAvailableDay = upcomingDays[0] ?? null;
  const [calendarWeekStart, setCalendarWeekStart] = useState(() =>
    startOfWeek(selectedDate || nextAvailableDay?.date || today),
  );
  const calendarDates = useMemo(
    () => buildWeekDateOptions(calendarWeekStart),
    [calendarWeekStart],
  );
  const visibleUpcomingDays = useMemo(() => {
    const defaultDays = upcomingDays.slice(0, 3);
    const selectedDay = selectedDate
      ? upcomingDays.find((day) => day.date === selectedDate)
      : null;

    if (
      selectedDay &&
      !defaultDays.some((day) => day.date === selectedDay.date)
    ) {
      return [...defaultDays, selectedDay];
    }

    return defaultDays;
  }, [selectedDate, upcomingDays]);

  const showEmptyState = !loading && !error && upcomingDays.length === 0;

  function handleSlotSelection(date: string, slot: PublicSlot) {
    onDateSelect(date);
    onSlotSelect(slot);
  }

  return (
    <div>
      <div>
        <h2 className="text-[30px] font-semibold tracking-tight text-foreground">
          Choose a date &amp; time
        </h2>
        <p className="mt-2 text-sm text-muted">
          Browse upcoming availability or jump to a different date.
        </p>
      </div>

      <div className="mt-7">
        {loading && !nextAvailableDay ? <LoadingState /> : null}

        {error ? (
          <InfoCard>
            <p className="text-sm leading-6 text-red-500">{error}</p>
          </InfoCard>
        ) : null}

        <div className="mt-3 rounded-[16px] border border-[#E5E7EB] bg-white p-4 shadow-[0_2px_10px_rgba(17,24,39,0.035)]">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                setCalendarWeekStart((currentWeekStart) =>
                  addDaysToDate(currentWeekStart, -7),
                )
              }
              disabled={addDaysToDate(calendarWeekStart, -7) < startOfWeek(today)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Show previous week"
            >
              <ArrowIcon direction="left" />
            </button>

            <p className="text-[15px] font-bold text-[#111827]">
              {formatMonthLabel(calendarWeekStart, timezone)}
            </p>

            <button
              type="button"
              onClick={() =>
                setCalendarWeekStart((currentWeekStart) =>
                  addDaysToDate(currentWeekStart, 7),
                )
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition-colors hover:bg-zinc-50"
              aria-label="Show next week"
            >
              <ArrowIcon />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-2">
            {calendarDates.map((date) => {
              const isSelected = date === selectedDate;
              const isPastDate = date < today;

              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => {
                    if (isPastDate) {
                      return;
                    }

                    onDateSelect(date);
                  }}
                  disabled={isPastDate}
                  className={[
                    "rounded-[12px] border px-2 py-2 text-center transition-colors",
                    isSelected
                      ? "border-[#6D4DF2] bg-[#6D4DF2] text-white"
                      : isPastDate
                        ? "border-[#E5E7EB] bg-zinc-50 text-zinc-400"
                        : "border-[#E5E7EB] bg-white text-[#111827] hover:border-[#6D4DF2] hover:bg-[rgba(109,77,242,0.05)]",
                  ].join(" ")}
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.04em] min-[430px]:text-[11px]">
                    {formatShortWeekday(date, timezone)}
                  </span>
                  <span className="mt-1 block text-[14px] font-bold min-[430px]:text-[15px]">
                    {formatDayNumber(date, timezone)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {!loading && !error && !showEmptyState ? (
          <section className="mt-7">
            <div className="mb-3">
              <h3 className="text-[24px] leading-[30px] font-bold text-[#111827]">
                Upcoming
              </h3>
            </div>

            <div className="space-y-3">
              {visibleUpcomingDays.map((day) => {
                const isSelectedDate = day.date === selectedDate;
                const isExpanded = expandedDays[day.date] ?? false;
                const previewSlots = isExpanded ? day.slots : day.slots.slice(0, 5);
                const hiddenCount = Math.max(day.slots.length - previewSlots.length, 0);

                return (
                  <div
                    key={day.date}
                    className={[
                      "mb-3 rounded-[16px] border border-[#E5E7EB] bg-white p-4 shadow-[0_2px_10px_rgba(17,24,39,0.035)] transition-colors active:bg-zinc-50",
                      isSelectedDate
                        ? "bg-[rgba(109,77,242,0.02)]"
                        : "",
                    ].join(" ")}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[15px] leading-5 font-bold text-[#111827]">
                          {formatShortWeekday(day.date, timezone)}
                        </p>
                        <p className="text-[15px] leading-5 font-bold text-[#111827]">
                          {formatMonthDay(day.date, timezone)}
                        </p>
                      </div>

                      <div className="mt-3 flex min-w-0 flex-col gap-2.5">
                        <div className="inline-flex h-[26px] self-start items-center rounded-full bg-[#F3F4F6] px-[10px] text-[12px] font-bold text-[#6B7280]">
                          {day.slots.length}{" "}
                          {day.slots.length === 1 ? "timeslot" : "timeslots"}
                        </div>

                        <div className="flex flex-wrap gap-[6px]">
                          {previewSlots.map((slot) => (
                            <TimeSlotPill
                              key={slot.start}
                              slot={slot}
                              selected={selectedSlot?.start === slot.start}
                              timeZone={timezone}
                              onSelect={() => handleSlotSelection(day.date, slot)}
                            />
                          ))}

                          {hiddenCount > 0 ? (
                            <TogglePill
                              onClick={() =>
                                setExpandedDays((currentDays) => ({
                                  ...currentDays,
                                  [day.date]: true,
                                }))
                              }
                            >
                              +{hiddenCount} more
                            </TogglePill>
                          ) : null}

                          {isExpanded && day.slots.length > 5 ? (
                            <TogglePill
                              onClick={() =>
                                setExpandedDays((currentDays) => ({
                                  ...currentDays,
                                  [day.date]: false,
                                }))
                              }
                            >
                              Show less
                            </TogglePill>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {showEmptyState ? (
          <InfoCard>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              No available times
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Choose a different date or check back later.
            </p>
          </InfoCard>
        ) : null}

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

function InfoCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[16px] border border-[#E5E7EB] bg-white p-4 shadow-[0_2px_10px_rgba(17,24,39,0.035)]">
      {children}
    </div>
  );
}

type TimeSlotPillProps = {
  slot: PublicSlot;
  selected: boolean;
  timeZone?: string | null;
  onSelect: () => void;
};

function TimeSlotPill({
  slot,
  selected,
  timeZone,
  onSelect,
}: TimeSlotPillProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        "inline-flex h-8 min-w-[70px] cursor-pointer items-center justify-center whitespace-nowrap rounded-[12px] border px-[10px] text-[13px] leading-none font-semibold transition-all min-[430px]:min-w-[72px]",
        selected
          ? "border-[#6D4DF2] bg-[#6D4DF2] text-white"
          : "border-[rgba(109,77,242,0.14)] bg-[rgba(109,77,242,0.08)] text-[#6D4DF2] hover:bg-[rgba(109,77,242,0.12)] active:bg-[rgba(109,77,242,0.16)]",
      ].join(" ")}
    >
      {formatTime(slot.start, timeZone)}
    </button>
  );
}

function TogglePill({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 items-center justify-center rounded-[10px] bg-[#F3F4F6] px-[10px] text-[13px] font-bold text-[#6B7280] transition-colors hover:bg-zinc-200 active:bg-zinc-300"
    >
      {children}
    </button>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <InfoCard key={index}>
          <div className="h-20 animate-pulse rounded-2xl bg-zinc-50" />
        </InfoCard>
      ))}
    </div>
  );
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={["h-4 w-4", direction === "left" ? "rotate-180" : ""].join(" ")}
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

function formatDayNumber(date: string, timeZone?: string | null) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    timeZone: timeZone ?? undefined,
  }).format(new Date(`${date}T12:00:00`));
}
