import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BookingPage, {
  generateMetadata,
} from "@/src/app/book/[slug]/page";
import {
  ApiError,
  getPublicStylist,
  resolveBookingPreviewSession,
} from "@/src/lib/api";

vi.mock("@/src/components/booking/BookingFlow", () => ({
  BookingFlow: ({
    initialReferralCode,
  }: {
    initialReferralCode?: string | null;
  }) => <div data-testid="booking-flow" data-ref={initialReferralCode ?? ""} />,
}));

vi.mock("@/src/components/booking/BookingPreviewFlow", () => ({
  BookingPreviewFlow: () => <div data-testid="booking-preview-flow" />,
}));

vi.mock("@/src/components/booking/PreviewUrlCleanup", () => ({
  PreviewUrlCleanup: () => <div data-testid="preview-url-cleanup" />,
}));

vi.mock("@/src/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/src/lib/api")>(
    "@/src/lib/api",
  );

  return {
    ...actual,
    getPublicStylist: vi.fn(),
    resolveBookingPreviewSession: vi.fn(),
  };
});

describe("BookingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses a no-referrer document policy only for preview URLs", async () => {
    await expect(
      generateMetadata({
        searchParams: Promise.resolve({ preview: "PVW_opaque-token" }),
      }),
    ).resolves.toEqual({ referrer: "no-referrer" });

    await expect(
      generateMetadata({ searchParams: Promise.resolve({ ref: "rf_client123" }) }),
    ).resolves.toEqual({});
  });

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

  it("resolves preview data without reading the production stylist profile", async () => {
    vi.mocked(resolveBookingPreviewSession).mockResolvedValue({
      preview_mode: true,
      expires_at: "2026-09-16T12:15:00.000Z",
      slug: "maya-johnson",
      profile: {
        display_name: "Maya at North Loop",
        bio: null,
        instagram: "maya-new",
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
      },
      schema_version: "booking_preview_context.v1",
    });

    render(
      await BookingPage({
        params: Promise.resolve({ slug: "maya-johnson" }),
        searchParams: Promise.resolve({
          preview: "PVW_opaque-token",
          ref: "rf_should_not_be_used",
        }),
      }),
    );

    expect(resolveBookingPreviewSession).toHaveBeenCalledWith(
      "PVW_opaque-token",
      "maya-johnson",
    );
    expect(getPublicStylist).not.toHaveBeenCalled();
    expect(screen.getByTestId("preview-url-cleanup")).toBeTruthy();
    expect(screen.getByTestId("booking-preview-flow")).toBeTruthy();
    expect(screen.queryByTestId("booking-flow")).toBeNull();
  });

  it("shows a token-safe unavailable screen for missing preview sessions", async () => {
    vi.mocked(resolveBookingPreviewSession).mockRejectedValue(
      new ApiError(
        "The preview PVW_secret and its draft values are unavailable.",
        404,
        undefined,
        "preview_session_not_found",
      ),
    );

    render(
      await BookingPage({
        params: Promise.resolve({ slug: "maya-johnson" }),
        searchParams: Promise.resolve({ preview: "PVW_secret" }),
      }),
    );

    expect(screen.getByText("This preview link is unavailable.")).toBeTruthy();
    expect(screen.queryByText(/PVW_secret/)).toBeNull();
    expect(screen.getByRole("link", { name: "Return to Settings" })).toHaveProperty(
      "href",
      expect.stringMatching(/\/account$/),
    );
    expect(getPublicStylist).not.toHaveBeenCalled();
    expect(screen.queryByTestId("booking-preview-flow")).toBeNull();
  });

  it("records only aggregate, token-safe resolver failure telemetry", async () => {
    const consoleInfo = vi.spyOn(console, "info").mockImplementation(() => {});
    vi.mocked(resolveBookingPreviewSession).mockRejectedValue(
      new ApiError(
        "PVW_secret resolver diagnostics must never reach telemetry.",
        404,
        { token: "PVW_secret" },
        "preview_session_not_found",
      ),
    );

    await BookingPage({
      params: Promise.resolve({ slug: "maya-johnson" }),
      searchParams: Promise.resolve({ preview: "PVW_secret" }),
    });

    expect(consoleInfo).toHaveBeenCalledWith(
      "booking_preview_resolver",
      JSON.stringify({ status: 404, code: "preview_session_not_found" }),
    );
    expect(consoleInfo.mock.calls.flat().join(" ")).not.toContain("PVW_secret");
    expect(consoleInfo.mock.calls.flat().join(" ")).not.toContain("maya-johnson");
    consoleInfo.mockRestore();
  });

  it("does not render a preview flow for malformed resolver data", async () => {
    vi.mocked(resolveBookingPreviewSession).mockResolvedValue({
      preview_mode: true,
      expires_at: "2026-09-16T12:15:00.000Z",
      slug: "maya-johnson",
      profile: {
        display_name: "Maya",
        bio: null,
        instagram: null,
        cover_photo_url: null,
        business_name: null,
        booking_enabled: true,
        booking_request_form_enabled: false,
      },
      // Missing preview_capabilities simulates a partial/unsupported API payload.
      schema_version: "booking_preview_context.v1",
    } as never);

    render(
      await BookingPage({
        params: Promise.resolve({ slug: "maya-johnson" }),
        searchParams: Promise.resolve({ preview: "PVW_secret" }),
      }),
    );

    expect(screen.getByText("This preview link is unavailable.")).toBeTruthy();
    expect(screen.queryByTestId("booking-preview-flow")).toBeNull();
    expect(getPublicStylist).not.toHaveBeenCalled();
  });

  it("rejects unsupported preview schema versions before rendering", async () => {
    vi.mocked(resolveBookingPreviewSession).mockResolvedValue({
      preview_mode: true,
      expires_at: "2026-09-16T12:15:00.000Z",
      slug: "maya-johnson",
      profile: {
        display_name: "Maya",
        bio: null,
        instagram: null,
        cover_photo_url: null,
        business_name: null,
        booking_enabled: true,
        booking_request_form_enabled: false,
      },
      preview_capabilities: {
        allow_public_reads: true,
        allow_booking_submission: false,
        allow_waitlist_submission: false,
        allow_uploads: false,
        allow_payments: false,
        allow_analytics: false,
      },
      schema_version: "booking_preview_context.v2",
    } as never);

    render(
      await BookingPage({
        params: Promise.resolve({ slug: "maya-johnson" }),
        searchParams: Promise.resolve({ preview: "PVW_secret" }),
      }),
    );

    expect(screen.getByText("This preview link is unavailable.")).toBeTruthy();
    expect(screen.queryByTestId("booking-preview-flow")).toBeNull();
    expect(getPublicStylist).not.toHaveBeenCalled();
  });

  it.each([
    [400, "validation_failed", "This preview link is malformed", false],
    [403, "preview_not_authorized", "This preview cannot be opened", false],
    [404, "preview_session_not_found", "This preview link is unavailable", false],
    [409, "booking_slug_unavailable", "This preview cannot be opened", false],
    [410, "preview_session_expired", "This preview expired", false],
    [429, "preview_rate_limited", "We couldn't load this preview", true],
    [500, "preview_session_failed", "We couldn't load this preview", true],
  ])(
    "handles resolver status %i without exposing capability details",
    async (status, code, expectedMessage, hasRetry) => {
      vi.mocked(resolveBookingPreviewSession).mockRejectedValueOnce(
        new ApiError("PVW_secret resolver diagnostic", status, undefined, code),
      );

      render(
        await BookingPage({
          params: Promise.resolve({ slug: "maya-johnson" }),
          searchParams: Promise.resolve({ preview: "PVW_secret" }),
        }),
      );

      expect(screen.getByText(new RegExp(expectedMessage))).toBeTruthy();
      const retryButton = screen.queryByRole("button", {
        name: "Retry preview",
      });
      if (hasRetry) {
        expect(retryButton).toBeTruthy();
      } else {
        expect(retryButton).toBeNull();
      }
      expect(screen.queryByText(/PVW_secret/)).toBeNull();
      expect(getPublicStylist).not.toHaveBeenCalled();
      expect(screen.queryByTestId("booking-flow")).toBeNull();
    },
  );

  it("uses safe expired and retryable preview states", async () => {
    vi.mocked(resolveBookingPreviewSession).mockRejectedValueOnce(
      new ApiError("PVW_secret expired", 410, undefined, "preview_session_expired"),
    );

    const expired = await BookingPage({
      params: Promise.resolve({ slug: "maya-johnson" }),
      searchParams: Promise.resolve({ preview: "PVW_secret" }),
    });
    const { unmount } = render(expired);

    expect(
      screen.getByText("This preview expired. Return to Settings to create a new one."),
    ).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Retry preview" })).toBeNull();

    unmount();
    vi.mocked(resolveBookingPreviewSession).mockRejectedValueOnce(
      new ApiError("PVW_secret backend details", 500, undefined, "preview_session_failed"),
    );

    render(
      await BookingPage({
        params: Promise.resolve({ slug: "maya-johnson" }),
        searchParams: Promise.resolve({ preview: "PVW_secret" }),
      }),
    );

    expect(screen.getByRole("button", { name: "Retry preview" })).toBeTruthy();
    expect(screen.queryByText(/PVW_secret/)).toBeNull();
  });
});
