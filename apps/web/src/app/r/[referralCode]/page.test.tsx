import { describe, expect, it, vi } from "vitest";

const { redirect, resolvePublicReferral } = vi.hoisted(() => ({
  redirect: vi.fn(),
  resolvePublicReferral: vi.fn(),
}));

vi.mock("next/navigation", () => ({ redirect }));
vi.mock("@/src/lib/api", () => ({ resolvePublicReferral }));

import ReferralPage from "./page";

describe("ReferralPage", () => {
  it("redirects using the resolver's matched stylist and referral code", async () => {
    resolvePublicReferral.mockResolvedValue({
      referralCode: "rf_campaign_client_123",
      stylistSlug: "olivia-hair",
    });

    await ReferralPage({ params: Promise.resolve({ referralCode: "opaque-link-code" }) });

    expect(resolvePublicReferral).toHaveBeenCalledWith("opaque-link-code");
    expect(redirect).toHaveBeenCalledWith(
      "/book/olivia-hair?ref=rf_campaign_client_123",
    );
  });
});
