import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { resolvePublicReferralShare } = vi.hoisted(() => ({
  resolvePublicReferralShare: vi.fn(),
}));

vi.mock("@/src/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/src/lib/api")>("@/src/lib/api");
  return { ...actual, resolvePublicReferralShare };
});

import { ReferralSharePageClient } from "./ReferralSharePageClient";

const share = {
  stylist: { displayName: "Olivia", businessName: "Olivia Hair Studio" },
  referralUrl: "https://go.rootfoil.app/a7K2q",
  share: {
    title: "Book with Olivia",
    text: "I love getting my hair done by Olivia! Here’s their booking link:",
  },
};

describe("ReferralSharePageClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("renders only resolved public presentation data and copies the canonical URL", async () => {
    resolvePublicReferralShare.mockResolvedValue(share);
    render(<ReferralSharePageClient referralCode="a7K2q" />);

    expect(screen.getByText("Loading your sharing link…")).toBeTruthy();
    expect(await screen.findByRole("heading", { name: "Share Olivia with a friend" })).toBeTruthy();
    expect(screen.getByText(share.referralUrl)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith(share.referralUrl));
    expect(screen.getByText("Link copied")).toBeTruthy();
  });

  it("offers a selectable manual fallback when clipboard access fails", async () => {
    resolvePublicReferralShare.mockResolvedValue(share);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    render(<ReferralSharePageClient referralCode="a7K2q" />);
    await screen.findByRole("heading", { name: "Share Olivia with a friend" });

    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    expect(await screen.findByDisplayValue(share.referralUrl)).toBeTruthy();
    expect(screen.getByText("Select and copy this link, then send it to a friend.")).toBeTruthy();
  });

  it("keeps cancellation quiet and makes Share reusable", async () => {
    resolvePublicReferralShare.mockResolvedValue(share);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: vi.fn().mockRejectedValue(new DOMException("cancelled", "AbortError")),
    });
    render(<ReferralSharePageClient referralCode="a7K2q" />);
    await screen.findByRole("heading", { name: "Share Olivia with a friend" });

    fireEvent.click(screen.getByRole("button", { name: "Share" }));
    await waitFor(() => expect(navigator.share).toHaveBeenCalledWith({ title: share.share.title, text: share.share.text, url: share.referralUrl }));
    expect(screen.queryByText(/Sharing isn’t available/)).toBeNull();
    expect(screen.getByRole("button", { name: "Share" })).toBeTruthy();
  });
});
