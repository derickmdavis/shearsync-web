import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

describe("campaign proxy", () => {
  beforeEach(() => vi.stubGlobal("fetch", vi.fn()));
  afterEach(() => vi.unstubAllGlobals());

  it("forwards audience estimates with authentication and request body", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ data: { eligible_count: 4 } }), { headers: { "Content-Type": "application/json" } }));
    const body = JSON.stringify({ audience: "all" });

    const response = await POST(new Request("http://web.test/api/campaigns/audience/estimate", {
      method: "POST",
      headers: { Authorization: "Bearer token-1", "Content-Type": "application/json" },
      body,
    }), { params: Promise.resolve({ path: ["audience", "estimate"] }) });

    const [url, init] = vi.mocked(fetch).mock.calls[0] ?? [];
    expect(String(url)).toBe("http://localhost:3000/api/campaigns/audience/estimate");
    expect(init).toMatchObject({ method: "POST", body });
    expect((init?.headers as Headers).get("Authorization")).toBe("Bearer token-1");
    await expect(response.json()).resolves.toEqual({ data: { eligible_count: 4 } });
  });
});
