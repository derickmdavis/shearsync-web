import { StrictMode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  BookingAttributionGate,
  clearStoredBookingAttribution,
  getStoredBookingAttribution,
  saveStoredBookingAttribution,
  useBookingAttribution,
} from "@/src/components/booking/BookingAttributionGate";
import { ApiError } from "@/src/lib/api";

const captureBookingAttributionContext = vi.hoisted(() => vi.fn());

vi.mock("@/src/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/src/lib/api")>(
    "@/src/lib/api",
  );

  return {
    ...actual,
    captureBookingAttributionContext,
  };
});

function AttributionProbe({ testId = "attribution" }: { testId?: string }) {
  const attribution = useBookingAttribution();

  return <div data-testid={testId}>{attribution?.token ?? "none"}</div>;
}

function renderGate({
  strictMode = false,
  testId,
  stylistSlug = "maya-johnson",
}: {
  strictMode?: boolean;
  testId?: string;
  stylistSlug?: string;
} = {}) {
  const gate = (
    <BookingAttributionGate stylistSlug={stylistSlug}>
      <AttributionProbe testId={testId} />
    </BookingAttributionGate>
  );

  return render(strictMode ? <StrictMode>{gate}</StrictMode> : gate);
}

describe("BookingAttributionGate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  it("scrubs only the handoff, captures it, and exposes the page-scoped record", async () => {
    captureBookingAttributionContext.mockResolvedValue({
      bookingAttributionToken: "opaque-booking-token",
      expiresAt: "2026-11-06T12:00:00.000Z",
    });
    window.history.replaceState(
      {},
      "",
      "/book/maya-johnson?booking_attribution_handoff_token=handoff-token&ref=rf_client123&service_id=service-1&date=2026-11-04&booking_context_token=context-token&booking_inquiry_token=inquiry-token#details",
    );

    renderGate();

    await waitFor(() => {
      expect(screen.getByTestId("attribution").textContent).toBe(
        "opaque-booking-token",
      );
    });

    expect(captureBookingAttributionContext).toHaveBeenCalledWith("handoff-token");
    expect(window.location.search).toBe(
      "?ref=rf_client123&service_id=service-1&date=2026-11-04&booking_context_token=context-token&booking_inquiry_token=inquiry-token",
    );
    expect(window.location.hash).toBe("#details");
    expect(sessionStorage.getItem("rf.pending_attribution_handoff")).toBeNull();
    expect(
      JSON.parse(localStorage.getItem("rf.booking_attribution.v1") ?? "{}"),
    ).toEqual({
      "maya-johnson": {
        token: "opaque-booking-token",
        expiresAt: "2026-11-06T12:00:00.000Z",
        stylistSlug: "maya-johnson",
      },
    });
  });

  it("allows the normal booking flow after a terminal capture failure", async () => {
    captureBookingAttributionContext.mockRejectedValue(
      new ApiError("Invalid handoff", 404, undefined, "booking_attribution_handoff_invalid"),
    );
    window.history.replaceState(
      {},
      "",
      "/book/maya-johnson?booking_attribution_handoff_token=expired-handoff",
    );

    renderGate();

    await waitFor(() => {
      expect(screen.getByTestId("attribution").textContent).toBe("none");
    });

    expect(sessionStorage.getItem("rf.pending_attribution_handoff")).toBeNull();
  });

  it("discards a pending handoff when the current stylist does not match", async () => {
    sessionStorage.setItem(
      "rf.pending_attribution_handoff",
      JSON.stringify({
        handoff: "stylist-a-handoff",
        stylistSlug: "stylist-a",
        retryAttempted: false,
      }),
    );
    window.history.replaceState({}, "", "/book/stylist-b");

    renderGate({ stylistSlug: "stylist-b" });

    await waitFor(() => {
      expect(screen.getByTestId("attribution").textContent).toBe("none");
    });

    expect(captureBookingAttributionContext).not.toHaveBeenCalled();
    expect(sessionStorage.getItem("rf.pending_attribution_handoff")).toBeNull();
  });

  it("shares one capture request across a remount while the exchange is in flight", async () => {
    let resolveCapture!: (value: {
      bookingAttributionToken: string;
      expiresAt: string;
    }) => void;
    captureBookingAttributionContext.mockReturnValue(
      new Promise((resolve) => {
        resolveCapture = resolve;
      }),
    );
    window.history.replaceState(
      {},
      "",
      "/book/maya-johnson?booking_attribution_handoff_token=single-flight-handoff",
    );

    const firstRender = renderGate({ strictMode: true });

    await waitFor(() => {
      expect(captureBookingAttributionContext).toHaveBeenCalledTimes(1);
    });
    expect(screen.queryByTestId("attribution")).toBeNull();
    expect(screen.getByRole("status").getAttribute("aria-busy")).toBe("true");
    expect(screen.getByRole("status").textContent).toContain(
      "Preparing your booking",
    );

    firstRender.unmount();
    renderGate();
    resolveCapture({
      bookingAttributionToken: "opaque-booking-token",
      expiresAt: "2026-11-06T12:00:00.000Z",
    });

    await waitFor(() => {
      expect(screen.getByTestId("attribution").textContent).toBe(
        "opaque-booking-token",
      );
    });

    expect(captureBookingAttributionContext).toHaveBeenCalledTimes(1);
  });

  it("restores only a valid attribution record for the current stylist", async () => {
    localStorage.setItem(
      "rf.booking_attribution.v1",
      JSON.stringify({
        "maya-johnson": {
          token: "stored-token",
          expiresAt: "2026-11-06T12:00:00.000Z",
          stylistSlug: "maya-johnson",
        },
        "other-stylist": {
          token: "other-token",
          expiresAt: "2026-11-06T12:00:00.000Z",
          stylistSlug: "other-stylist",
        },
      }),
    );

    renderGate();

    await waitFor(() => {
      expect(screen.getByTestId("attribution").textContent).toBe("stored-token");
    });
    expect(captureBookingAttributionContext).not.toHaveBeenCalled();
  });

  it("removes expired or malformed persisted records before returning them", () => {
    localStorage.setItem(
      "rf.booking_attribution.v1",
      JSON.stringify({
        "maya-johnson": {
          token: "expired-token",
          expiresAt: "2020-01-01T00:00:00.000Z",
          stylistSlug: "maya-johnson",
        },
        malformed: { token: "missing-required-fields" },
      }),
    );

    expect(getStoredBookingAttribution("maya-johnson")).toBeNull();
    expect(localStorage.getItem("rf.booking_attribution.v1")).toBeNull();
  });

  it("bounds persisted attribution records by stylist slug", () => {
    const expiresAt = "2026-11-06T12:00:00.000Z";

    for (let index = 0; index < 11; index += 1) {
      saveStoredBookingAttribution({
        token: `token-${index}`,
        expiresAt,
        stylistSlug: `stylist-${index}`,
      });
    }

    const records = JSON.parse(
      localStorage.getItem("rf.booking_attribution.v1") ?? "{}",
    ) as Record<string, unknown>;
    expect(Object.keys(records)).toHaveLength(10);
    expect(records["stylist-0"]).toBeUndefined();
    expect(getStoredBookingAttribution("stylist-10")?.token).toBe("token-10");
  });

  it("clears only the rejected stylist's persisted attribution", () => {
    saveStoredBookingAttribution({
      token: "maya-token",
      expiresAt: "2026-11-06T12:00:00.000Z",
      stylistSlug: "maya-johnson",
    });
    saveStoredBookingAttribution({
      token: "other-token",
      expiresAt: "2026-11-06T12:00:00.000Z",
      stylistSlug: "other-stylist",
    });

    clearStoredBookingAttribution("maya-johnson");

    expect(getStoredBookingAttribution("maya-johnson")).toBeNull();
    expect(getStoredBookingAttribution("other-stylist")?.token).toBe("other-token");
  });

  it("makes one controlled retry after an ambiguous capture network failure", async () => {
    captureBookingAttributionContext
      .mockRejectedValueOnce(new ApiError("Network unavailable", 0))
      .mockResolvedValueOnce({
        bookingAttributionToken: "retried-token",
        expiresAt: "2026-11-06T12:00:00.000Z",
      });
    window.history.replaceState(
      {},
      "",
      "/book/maya-johnson?booking_attribution_handoff_token=retry-handoff",
    );

    renderGate();

    await waitFor(() => {
      expect(screen.getByTestId("attribution").textContent).toBe("retried-token");
    });

    expect(captureBookingAttributionContext).toHaveBeenCalledTimes(2);
    expect(sessionStorage.getItem("rf.pending_attribution_handoff")).toBeNull();
  });

  it("stops after the single controlled retry across a reload", async () => {
    captureBookingAttributionContext
      .mockRejectedValueOnce(new ApiError("Network unavailable", 0))
      .mockRejectedValueOnce(new ApiError("Network unavailable", 0));
    window.history.replaceState(
      {},
      "",
      "/book/maya-johnson?booking_attribution_handoff_token=retry-limit-handoff",
    );

    const firstRender = renderGate();

    await waitFor(() => {
      expect(screen.getByTestId("attribution").textContent).toBe("none");
    });

    expect(captureBookingAttributionContext).toHaveBeenCalledTimes(2);
    expect(sessionStorage.getItem("rf.pending_attribution_handoff")).toContain(
      '"retryAttempted":true',
    );

    firstRender.unmount();
    renderGate();

    await waitFor(() => {
      expect(screen.getByTestId("attribution").textContent).toBe("none");
    });
    expect(captureBookingAttributionContext).toHaveBeenCalledTimes(2);
    expect(sessionStorage.getItem("rf.pending_attribution_handoff")).toBeNull();
  });

  it("keeps each tab's captured context after another tab updates local storage", async () => {
    captureBookingAttributionContext
      .mockResolvedValueOnce({
        bookingAttributionToken: "first-tab-token",
        expiresAt: "2026-11-06T12:00:00.000Z",
      })
      .mockResolvedValueOnce({
        bookingAttributionToken: "second-tab-token",
        expiresAt: "2026-11-06T12:00:00.000Z",
      });
    window.history.replaceState(
      {},
      "",
      "/book/maya-johnson?booking_attribution_handoff_token=first-tab-handoff",
    );

    renderGate({ testId: "first-tab" });

    await waitFor(() => {
      expect(screen.getByTestId("first-tab").textContent).toBe("first-tab-token");
    });

    window.history.replaceState(
      {},
      "",
      "/book/maya-johnson?booking_attribution_handoff_token=second-tab-handoff",
    );
    renderGate({ testId: "second-tab" });

    await waitFor(() => {
      expect(screen.getByTestId("second-tab").textContent).toBe("second-tab-token");
    });

    expect(screen.getByTestId("first-tab").textContent).toBe("first-tab-token");
    expect(getStoredBookingAttribution("maya-johnson")?.token).toBe(
      "second-tab-token",
    );
  });
});
