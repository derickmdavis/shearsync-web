import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BookingPage from "@/src/app/book/[slug]/page";
import { getPublicStylist } from "@/src/lib/api";

vi.mock("@/src/components/booking/BookingFlow", () => ({
  BookingFlow: ({
    initialReferralCode,
  }: {
    initialReferralCode?: string | null;
  }) => <div data-testid="booking-flow" data-ref={initialReferralCode ?? ""} />,
}));

vi.mock("@/src/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/src/lib/api")>(
    "@/src/lib/api",
  );

  return {
    ...actual,
    getPublicStylist: vi.fn(),
  };
});

describe("BookingPage", () => {
  it("passes the ref search param into the booking flow", async () => {
    vi.mocked(getPublicStylist).mockResolvedValue({
      id: "stylist-1",
      slug: "maya-johnson",
      display_name: "Maya Johnson",
      bio: null,
      cover_photo_url: null,
      instagram: null,
      booking_enabled: true,
      business_name: "Maya Johnson Hair",
      phone_number: null,
      timezone: "America/Denver",
    });

    render(
      await BookingPage({
        params: Promise.resolve({ slug: "maya-johnson" }),
        searchParams: Promise.resolve({ ref: "rf_client123" }),
      }),
    );

    expect(screen.getByTestId("booking-flow").getAttribute("data-ref")).toBe(
      "rf_client123",
    );
  });
});
