import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getPublicAvailability,
  getPublicServices,
  getPublicSlots,
} from "@/src/lib/api";

describe("public booking api helpers", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("includes booking_context_token when loading services", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await getPublicServices("maya-johnson", "token-1");

    expect(fetch).toHaveBeenCalledWith(
      "/api/public/services/maya-johnson?booking_context_token=token-1",
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it("includes booking_context_token when loading raw availability", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await getPublicAvailability("maya-johnson", "token-2");

    expect(fetch).toHaveBeenCalledWith(
      "/api/public/availability/maya-johnson?booking_context_token=token-2",
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it("includes booking_context_token when loading slots", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          data: { date: "2026-05-04", timezone: "America/Denver", slots: [] },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    await getPublicSlots(
      "maya-johnson",
      ["service-1", "service-2"],
      "2026-05-04",
      "token-3",
    );

    expect(fetch).toHaveBeenCalledWith(
      "/api/public/availability/maya-johnson/slots?date=2026-05-04&service_id=service-1&service_ids=service-1&service_ids=service-2&booking_context_token=token-3",
      expect.objectContaining({ cache: "no-store" }),
    );
  });
});
