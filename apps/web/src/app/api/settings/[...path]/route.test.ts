import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/src/app/api/settings/[...path]/route";

describe("settings proxy", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not forward upstream compression/framing or cookie headers", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: { timezone: "America/Denver" } }), {
        headers: {
          "Content-Type": "application/json",
          "Content-Encoding": "gzip",
          "Content-Length": "999",
          "Set-Cookie": "upstream-session=unexpected",
          "X-Request-Id": "request-1",
        },
      }),
    );

    const response = await GET(
      new Request("http://web.test/api/settings/profile", {
        headers: { Authorization: "Bearer token-1" },
      }),
      { params: Promise.resolve({ path: ["profile"] }) },
    );

    expect(response.headers.get("content-encoding")).toBeNull();
    expect(response.headers.get("content-length")).toBeNull();
    expect(response.headers.get("set-cookie")).toBeNull();
    expect(response.headers.get("x-request-id")).toBe("request-1");
    await expect(response.json()).resolves.toEqual({
      data: { timezone: "America/Denver" },
    });
  });

  it("returns a stable error without exposing upstream exception text", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("internal upstream hostname"));

    const response = await GET(
      new Request("http://web.test/api/settings/profile"),
      { params: Promise.resolve({ path: ["profile"] }) },
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: { message: "Unable to reach the account service." },
    });
  });
});
