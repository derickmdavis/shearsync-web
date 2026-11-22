import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import type { PublicSlot } from "@/src/lib/api";
import { TimeStep } from "@/src/components/booking/TimeStep";

describe("TimeStep", () => {
  it("progressively reveals remaining times and preserves an expanded-only selection", () => {
    const slots = Array.from({ length: 7 }, (_, index) => ({
      start: `2099-01-15T${String(index + 9).padStart(2, "0")}:00:00-07:00`,
      end: `2099-01-15T${String(index + 10).padStart(2, "0")}:00:00-07:00`,
    }));

    function TimeStepHarness() {
      const [selectedSlot, setSelectedSlot] = useState<PublicSlot | null>(null);

      return (
        <TimeStep
          selectedDate="2099-01-15"
          selectedSlot={selectedSlot}
          upcomingDays={[{
            date: "2099-01-15",
            slots,
            recommendedSlots: slots.slice(0, 5),
            moreSlots: slots.slice(5),
            hasMore: true,
          }]}
          loading={false}
          onDateSelect={vi.fn()}
          onSlotSelect={setSelectedSlot}
          onBack={vi.fn()}
          onContinue={vi.fn()}
        />
      );
    }

    render(<TimeStepHarness />);

    expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(5);
    fireEvent.click(screen.getByRole("button", { name: "View all available times" }));
    expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(7);

    fireEvent.click(screen.getAllByRole("button", { pressed: false })[5]);
    fireEvent.click(screen.getByRole("button", { name: "Show fewer times" }));

    expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(5);
    expect(screen.getByRole("button", { pressed: true })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "View all available times" }).getAttribute("aria-expanded"),
    ).toBe("false");
  });

  it("shows the waitlist prompt above the upcoming day cards", () => {
    render(
      <TimeStep
        selectedDate="2099-01-15"
        selectedSlot={null}
        upcomingDays={[
          {
            date: "2099-01-15",
            slots: [
              {
                start: "2099-01-15T09:00:00-07:00",
                end: "2099-01-15T10:00:00-07:00",
              },
            ],
          },
        ]}
        loading={false}
        timezone="America/Denver"
        waitlistCta={<div>Waitlist prompt</div>}
        onDateSelect={vi.fn()}
        onSlotSelect={vi.fn()}
        onBack={vi.fn()}
        onContinue={vi.fn()}
      />,
    );

    const waitlistPrompt = screen.getByText("Waitlist prompt");
    const upcomingDay = screen.getByText("Thursday, January 15");

    expect(
      waitlistPrompt.compareDocumentPosition(upcomingDay) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
  });
});
