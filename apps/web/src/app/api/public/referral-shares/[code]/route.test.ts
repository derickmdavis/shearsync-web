import { describe, expect, it, vi } from "vitest";

const { resolveReferralShare } = vi.hoisted(() => ({ resolveReferralShare: vi.fn() }));

vi.mock("@/src/lib/referral-share", () => ({ resolveReferralShare }));
vi.mock("@/src/lib/api", () => ({
  ApiError: class ApiError extends Error {
    constructor(message: string, readonly status: number) { super(message); }
  },
}));

import { ApiError } from "@/src/lib/api";
import { GET } from "./route";

describe("referral share public resolver", () => {
  it("returns the minimal public share model without caching", async () => {
    resolveReferralShare.mockResolvedValue({ referralUrl: "https://go.rootfoil.app/a7K2q" });
    const response = await GET(new Request("https://www.rootfoil.app/api/public/referral-shares/a7K2q"), { params: Promise.resolve({ code: "a7K2q" }) });
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toContain("no-store");
    expect(await response.json()).toEqual({ data: { referralUrl: "https://go.rootfoil.app/a7K2q" } });
  });

  it("preserves unavailable status without exposing backend details", async () => {
    resolveReferralShare.mockRejectedValue(new ApiError("internal referral details", 404));
    const response = await GET(new Request("https://www.rootfoil.app/api/public/referral-shares/nope"), { params: Promise.resolve({ code: "nope" }) });
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: { message: "This referral link is unavailable." } });
  });
});
