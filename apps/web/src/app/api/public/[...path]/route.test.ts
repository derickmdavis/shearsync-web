import { afterEach, describe, expect, it, vi } from "vitest";

const { fetchWithTimeout } = vi.hoisted(() => ({
  fetchWithTimeout: vi.fn(),
}));

vi.mock("@/src/lib/api", () => ({
  API_BASE_URL: "https://api.example.test",
  fetchWithTimeout,
}));

import { GET } from "./route";

describe("public API proxy", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    fetchWithTimeout.mockReset();
  });

  it("redacts preview capability credentials from 5xx diagnostics", async () => {
    const previewToken = "PVW_secret-preview-token";
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    fetchWithTimeout.mockResolvedValue(
      new Response(
        JSON.stringify({
          error: { message: `resolver failed for ${previewToken}` },
        }),
        {
          status: 500,
          headers: {
            "Cache-Control": "private, no-store",
            "Referrer-Policy": "no-referrer",
          },
        },
      ),
    );

    const response = await GET(
      new Request(
        `https://booking.example.test/api/public/booking-preview-sessions/${previewToken}?slug=maya-johnson`,
      ),
      {
        params: Promise.resolve({
          path: ["booking-preview-sessions", previewToken],
        }),
      },
    );

    const logged = consoleError.mock.calls.flat().join(" ");
    expect(response.status).toBe(500);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("Referrer-Policy")).toBe("no-referrer");
    expect(logged).toContain("/api/public/booking-preview-sessions/[redacted]");
    expect(logged).not.toContain(previewToken);
  });

  it("does not echo capability URLs from proxy fetch failures", async () => {
    const previewToken = "PVW_secret-preview-token";
    fetchWithTimeout.mockRejectedValue(
      new Error(
        `failed to fetch https://api.example.test/api/public/booking-preview-sessions/${previewToken}?slug=maya-johnson`,
      ),
    );

    const response = await GET(
      new Request(
        `https://booking.example.test/api/public/booking-preview-sessions/${previewToken}?slug=maya-johnson`,
      ),
      {
        params: Promise.resolve({
          path: ["booking-preview-sessions", previewToken],
        }),
      },
    );

    const body = await response.text();
    expect(response.status).toBe(502);
    expect(body).toContain("Unable to reach the booking service.");
    expect(body).not.toContain(previewToken);
    expect(body).not.toContain("slug=maya-johnson");
  });
});
