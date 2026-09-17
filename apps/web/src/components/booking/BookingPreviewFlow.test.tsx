import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BookingPreviewFlow } from "@/src/components/booking/BookingPreviewFlow";
import type { BookingPreviewContext, PublicStylist } from "@/src/lib/api";
import * as bookingApi from "@/src/lib/api";

const bookingApiMocks = vi.hoisted(() => ({
  createPublicBooking: vi.fn(),
  createPublicBookingIntake: vi.fn(),
  createPublicReferencePhotoUploadIntent: vi.fn(),
  finalizePublicReferencePhoto: vi.fn(),
  getPublicServices: vi.fn(),
  joinWaitlist: vi.fn(),
}));

vi.mock("@/src/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/src/lib/api")>(
    "@/src/lib/api",
  );

  return { ...actual, ...bookingApiMocks };
});

const stylist: PublicStylist = {
  slug: "maya-johnson",
  display_name: "Maya at North Loop",
  bio: "Lived-in color specialist",
  intro: "Tell us about yourself",
  intro_description: "Share your contact details before choosing a service.",
  instagram: "maya-new",
  cover_photo_url: null,
  business_name: "Maya Studio",
  booking_enabled: true,
  booking_request_form_enabled: true,
};

function createPreview(
  overrides: Partial<BookingPreviewContext["preview_capabilities"]> = {},
): BookingPreviewContext {
  return {
    preview_mode: true,
    expires_at: "2026-09-16T12:15:00.000Z",
    slug: "maya-johnson",
    profile: {
      display_name: "Maya at North Loop",
      bio: "Lived-in color specialist",
      instagram: "maya-new",
      intro: "Tell us about yourself",
      intro_description: "Share your contact details before choosing a service.",
      cover_photo_url: null,
      business_name: "Maya Studio",
      booking_enabled: true,
      booking_request_form_enabled: true,
    },
    preview_capabilities: {
      allow_public_reads: true,
      allow_booking_submission: false,
      allow_waitlist_submission: false,
      allow_uploads: false,
      allow_payments: false,
      allow_analytics: false,
      ...overrides,
    },
    schema_version: "booking_preview_context.v1",
  };
}

describe("BookingPreviewFlow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a read-only preview and only reads public service data", async () => {
    vi.mocked(bookingApi.getPublicServices).mockResolvedValue([
      {
        id: "service-1",
        name: "Signature Cut",
        description: "A tailored cut and finish.",
        durationMinutes: 60,
        price: 95,
        isActive: true,
        isDefault: false,
        sortOrder: 0,
      },
    ]);

    render(
      <BookingPreviewFlow
        preview={createPreview()}
        stylist={stylist}
        previewToken="PVW_preview-token"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Preview — booking is disabled" }),
    ).toBeTruthy();
    expect(await screen.findByText("Signature Cut")).toBeTruthy();
    expect(screen.getByText("Tell us about yourself")).toBeTruthy();
    expect(
      screen.getByText("Share your contact details before choosing a service."),
    ).toBeTruthy();
    expect(bookingApi.getPublicServices).toHaveBeenCalledWith("maya-johnson");
    expect(bookingApi.createPublicBookingIntake).not.toHaveBeenCalled();
    expect(bookingApi.createPublicBooking).not.toHaveBeenCalled();
    expect(bookingApi.joinWaitlist).not.toHaveBeenCalled();
    expect(
      bookingApi.createPublicReferencePhotoUploadIntent,
    ).not.toHaveBeenCalled();
    expect(bookingApi.finalizePublicReferencePhoto).not.toHaveBeenCalled();
    expect(screen.queryByPlaceholderText("Enter your full name")).toBeNull();
    expect(
      screen.queryByRole("button", { name: /book appointment/i }),
    ).toBeNull();
  });

  it("does not read services when public reads are disallowed", () => {
    render(
      <BookingPreviewFlow
        preview={createPreview({ allow_public_reads: false })}
        stylist={stylist}
        previewToken="PVW_preview-token"
      />,
    );

    expect(bookingApi.getPublicServices).not.toHaveBeenCalled();
    expect(
      screen.getByText("Public service data is unavailable for this preview."),
    ).toBeTruthy();
  });
});
