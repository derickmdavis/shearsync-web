import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

const apiOrigin = "https://api.example.test";

function request(body: unknown) {
  return new Request("https://rootfoil.com/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("forwards a valid signup to the current early-access endpoint", async () => {
    vi.stubEnv("API_BASE_URL", apiOrigin);
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ success: true, message: "You're on the list." }, { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(request({ full_name: "  Katie Johnson ", email: "Katie@Example.COM", source: "homepage_waitlist" }));

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ success: true, message: "You're on the list." });
    expect(fetchMock).toHaveBeenCalledWith(
      new URL("/api/public/early-access", apiOrigin),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ fullName: "Katie Johnson", email: "katie@example.com", source: "homepage_waitlist" }),
      }),
    );
  });

  it.each([
    [400, { success: false, message: "Please enter a valid email address." }],
    [429, { error: { message: "Too many requests. Please try again shortly." } }],
  ])("preserves a safe %i upstream response", async (status, body) => {
    vi.stubEnv("API_BASE_URL", apiOrigin);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(body, { status })));

    const response = await POST(request({ full_name: "Katie Johnson", email: "katie@example.com" }));

    expect(response.status).toBe(status);
    await expect(response.json()).resolves.toEqual(body);
  });

  it("returns a generic gateway error when the upstream service cannot be reached", async () => {
    vi.stubEnv("API_BASE_URL", apiOrigin);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    const response = await POST(request({ full_name: "Katie Johnson", email: "katie@example.com" }));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ error: { message: "Unable to join the waitlist." } });
  });
});
