import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "@/src/proxy";

describe("preview document proxy", () => {
  it("sets no-store and no-referrer headers for preview booking URLs", () => {
    const response = proxy(
      new NextRequest("https://booking.example.test/book/maya?preview=PVW_secret"),
    );

    expect(response.headers.get("Cache-Control")).toBe(
      "private, no-store, max-age=0",
    );
    expect(response.headers.get("Referrer-Policy")).toBe("no-referrer");
  });

  it("does not change production booking-page responses", () => {
    const response = proxy(
      new NextRequest("https://booking.example.test/book/maya?ref=rf_client123"),
    );

    expect(response.headers.get("Cache-Control")).toBeNull();
    expect(response.headers.get("Referrer-Policy")).toBeNull();
    expect(config.matcher).toBe("/book/:slug");
  });
});
