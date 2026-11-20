import { describe, expect, it } from "vitest";
import { getAuthRecoveryUrl } from "./public";

describe("getAuthRecoveryUrl", () => {
  it("uses the active browser origin instead of deployment URL configuration", () => {
    expect(getAuthRecoveryUrl()).toBe(
      `${window.location.origin}/reset-password`,
    );
  });

  it("uses the exact production reset-password destination", () => {
    expect(getAuthRecoveryUrl("https://www.rootfoil.app")).toBe(
      "https://www.rootfoil.app/reset-password",
    );
  });

  it("canonicalizes the production apex host to www", () => {
    expect(getAuthRecoveryUrl("https://rootfoil.app")).toBe(
      "https://www.rootfoil.app/reset-password",
    );
  });

  it("preserves the active origin for local and preview deployments", () => {
    expect(getAuthRecoveryUrl("https://rootfoil-preview.vercel.app")).toBe(
      "https://rootfoil-preview.vercel.app/reset-password",
    );
  });
});
