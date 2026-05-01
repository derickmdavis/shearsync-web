import type { PublicSlot } from "@/src/lib/api";
import { formatTime } from "@/src/lib/booking-format";

type TimeSlotGridProps = {
  slots: PublicSlot[];
  selectedSlot?: PublicSlot | null;
  timeZone?: string | null;
  onSelect: (slot: PublicSlot) => void;
};

export function TimeSlotGrid({
  slots,
  selectedSlot,
  timeZone,
  onSelect,
}: TimeSlotGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {slots.map((slot) => {
        const selected = selectedSlot?.start === slot.start;

        return (
          <button
            key={slot.start}
            type="button"
            onClick={() => onSelect(slot)}
            className={[
              "rounded-2xl border px-3 py-3 text-sm font-semibold transition-all",
              selected
                ? "border-brand bg-brand text-white shadow-[0_14px_24px_rgba(109,79,242,0.18)]"
                : "border-border bg-white text-foreground hover:border-brand/35",
            ].join(" ")}
          >
            {formatTime(slot.start, timeZone)}
          </button>
        );
      })}
    </div>
  );
}
