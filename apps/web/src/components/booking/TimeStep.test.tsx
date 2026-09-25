import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TimeStep } from "@/src/components/booking/TimeStep";

describe("TimeStep", () => {
  it("shows the waitlist prompt above the upcoming day cards", () => {
    render(
      <TimeStep
        selectedDate="2099-01-16"
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
    const upcomingDay = screen.getByText("Jan 15");

    expect(
      waitlistPrompt.compareDocumentPosition(upcomingDay) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
  });
});
