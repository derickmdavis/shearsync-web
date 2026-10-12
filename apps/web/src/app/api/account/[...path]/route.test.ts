import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/src/app/api/account/[...path]/route";

describe("account proxy", () => {
  beforeEach(() => vi.stubGlobal("fetch", vi.fn()));
  afterEach(() => vi.unstubAllGlobals());

  it("forwards deletion requests and bearer authentication", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ data: { status: "pending" } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));
    const body = JSON.stringify({ confirmation: "DELETE", clientRequestId: "attempt-1" });

    const response = await POST(new Request("http://web.test/api/account/deletion-request", {
      method: "POST",
      headers: { Authorization: "Bearer token-1", "Content-Type": "application/json" },
      body,
    }), { params: Promise.resolve({ path: ["deletion-request"] }) });

    const [url, init] = vi.mocked(fetch).mock.calls[0] ?? [];
    expect(String(url)).toBe("http://localhost:3000/api/account/deletion-request");
    expect(init).toMatchObject({ method: "POST", body });
    expect((init?.headers as Headers).get("Authorization")).toBe("Bearer token-1");
    await expect(response.json()).resolves.toEqual({ data: { status: "pending" } });
  });
});
