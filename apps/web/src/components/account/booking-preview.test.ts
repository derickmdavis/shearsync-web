import { describe, expect, it } from "vitest";
import {
  buildBookingPreviewDraftOverrides,
  getBookingPreviewCreationError,
} from "@/src/components/account/booking-preview";
import type {
  StylistSettingsProfile,
} from "@/src/lib/api";
import { ApiError } from "@/src/lib/api";
import type { PublicProfileForm } from "@/src/components/account/account-types";

const persisted: StylistSettingsProfile = {
  id: "stylist-1",
  user_id: "user-1",
  slug: "maya-johnson",
  display_name: "Maya Johnson",
  bio: "Lived-in color specialist",
  instagram: "mayajohnsonhair",
  cover_photo_url: "https://cdn.example.com/cover.jpg",
  booking_enabled: true,
  booking_request_form_enabled: false,
  created_at: "2026-09-16T12:00:00.000Z",
  updated_at: "2026-09-16T12:00:00.000Z",
};

const form: PublicProfileForm = {
  slug: "unsaved-new-slug",
  display_name: "Maya at North Loop",
  bio: "",
  instagram: "@maya-new",
  cover_photo_url: "https://example.com/draft-cover.jpg",
  booking_enabled: false,
  booking_request_form_enabled: true,
};

describe("buildBookingPreviewDraftOverrides", () => {
  it("sends only supported changes and serializes cleared text as null", () => {
    expect(buildBookingPreviewDraftOverrides(form, persisted)).toEqual({
      display_name: "Maya at North Loop",
      instagram: "@maya-new",
      bio: null,
      booking_request_form_enabled: true,
    });
  });

  it("omits fields that still match the persisted settings", () => {
    expect(
      buildBookingPreviewDraftOverrides(
        {
          ...form,
          slug: "another-unsaved-slug",
          display_name: persisted.display_name,
          bio: persisted.bio ?? "",
          instagram: persisted.instagram ?? "",
          booking_request_form_enabled:
            persisted.booking_request_form_enabled,
        },
        persisted,
      ),
    ).toEqual({});
  });
});

describe("getBookingPreviewCreationError", () => {
  it.each([
    ["invalid_preview_draft", "Some preview fields are invalid", false],
    ["preview_not_authorized", "saved booking link needs to be refreshed", true],
    ["booking_slug_unavailable", "Save or repair your booking link", false],
    ["preview_rate_limited", "Preview creation is temporarily limited", false],
    ["preview_session_failed", "couldn't create the preview", false],
  ])("maps %s to a safe actionable creation state", (code, message, canRefresh) => {
    const result = getBookingPreviewCreationError(
      new ApiError("PVW_secret backend diagnostic", 400, undefined, code),
    );

    expect(result.message).toContain(message);
    expect(result.message).not.toContain("PVW_secret");
    expect(result.canRefreshSettings ?? false).toBe(canRefresh);
  });

  it("uses the API retry delay for rate-limited preview creation", () => {
    expect(
      getBookingPreviewCreationError(
        new ApiError(
          "Internal preview rate-limit diagnostic",
          429,
          undefined,
          "preview_rate_limited",
          12,
        ),
      ),
    ).toMatchObject({ cooldownSeconds: 12 });
  });
});
