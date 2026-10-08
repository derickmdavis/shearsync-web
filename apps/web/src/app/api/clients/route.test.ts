import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "@/src/app/api/clients/route";

describe("clients collection proxy", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("forwards collection query parameters and bearer authentication", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: [] }), {
        headers: { "Content-Type": "application/json" },
      }),
    );

    const response = await GET(
      new Request("http://web.test/api/clients?page=1&pageSize=25", {
        headers: { Authorization: "Bearer token-1" },
      }),
    );

    const [url, init] = vi.mocked(fetch).mock.calls[0] ?? [];
    expect(String(url)).toBe("http://localhost:3000/api/clients?page=1&pageSize=25");
    expect(init?.method).toBe("GET");
    expect(
      (vi.mocked(fetch).mock.calls[0]?.[1]?.headers as Headers).get("Authorization"),
    ).toBe("Bearer token-1");
    await expect(response.json()).resolves.toEqual({ data: [] });
  });

  it("forwards collection creation bodies", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: { id: "client-1" } }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const body = JSON.stringify({ first_name: "Ava", last_name: "Martinez" });

    await POST(
      new Request("http://web.test/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    );

    const [url, init] = vi.mocked(fetch).mock.calls[0] ?? [];
    expect(String(url)).toBe("http://localhost:3000/api/clients");
    expect(init).toMatchObject({ method: "POST", body });
  });
});
