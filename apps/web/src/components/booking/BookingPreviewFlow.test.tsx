import { fireEvent, render, screen } from "@testing-library/react";
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
      screen.getByRole("heading", { name: "Booking is disabled" }),
    ).toBeTruthy();
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
    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { value: "Preview Client" },
    });
    fireEvent.change(screen.getByPlaceholderText("(555) 123-4567"), {
      target: { value: "555-0100" },
    });
    fireEvent.click(
      await screen.findByRole("button", { name: "Select Services" }),
    );
    expect(await screen.findByText("Signature Cut")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Signature Cut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByText("Choose a date & time")).toBeTruthy();
    expect(
      screen.getByText("Sample times illustrate the booking flow and are not live availability."),
    ).toBeTruthy();
    fireEvent.click(screen.getAllByRole("button", { name: /10:00/i })[0]!);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByText("Review your booking")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Booking is disabled in preview" }),
    ).toHaveProperty("disabled", true);
    expect(
      screen.queryByRole("button", { name: /book appointment/i }),
    ).toBeNull();
    expect(bookingApi.createPublicBookingIntake).not.toHaveBeenCalled();
    expect(bookingApi.createPublicBooking).not.toHaveBeenCalled();
    expect(bookingApi.joinWaitlist).not.toHaveBeenCalled();
    expect(
      bookingApi.createPublicReferencePhotoUploadIntent,
    ).not.toHaveBeenCalled();
    expect(bookingApi.finalizePublicReferencePhoto).not.toHaveBeenCalled();
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
    expect(screen.getByRole("button", { name: "Select Services" })).toHaveProperty(
      "disabled",
      true,
    );
  });

  it("keeps one selected service and clears a sample time when it changes", async () => {
    vi.mocked(bookingApi.getPublicServices).mockResolvedValue([
      {
        id: "service-1",
        name: "Signature Cut",
        description: null,
        durationMinutes: 60,
        price: 95,
        isActive: true,
        isDefault: false,
        sortOrder: 0,
      },
      {
        id: "service-2",
        name: "Gloss Refresh",
        description: null,
        durationMinutes: 45,
        price: 65,
        isActive: true,
        isDefault: false,
        sortOrder: 1,
      },
    ]);

    render(
      <BookingPreviewFlow
        preview={createPreview()}
        stylist={stylist}
        previewToken="PVW_preview-token"
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { value: "Preview Client" },
    });
    fireEvent.change(screen.getByPlaceholderText("(555) 123-4567"), {
      target: { value: "555-0100" },
    });
    fireEvent.click(
      await screen.findByRole("button", { name: "Select Services" }),
    );

    const signatureCut = screen.getByRole("button", { name: /Signature Cut/i });
    const glossRefresh = screen.getByRole("button", { name: /Gloss Refresh/i });
    fireEvent.click(signatureCut);
    expect(signatureCut.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(glossRefresh);
    expect(signatureCut.getAttribute("aria-pressed")).toBe("false");
    expect(glossRefresh.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByText("Choose a date & time")).toBeTruthy();
    fireEvent.click(screen.getAllByRole("button", { name: /10:00/i })[0]!);
    expect(screen.getByRole("button", { name: "Continue" })).toHaveProperty(
      "disabled",
      false,
    );

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    fireEvent.click(screen.getByRole("button", { name: /Signature Cut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByText("Choose a date & time")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Continue" })).toHaveProperty(
      "disabled",
      true,
    );
  });
});
