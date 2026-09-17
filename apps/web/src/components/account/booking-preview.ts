import type {
  BookingPreviewDraftOverrides,
  StylistSettingsProfile,
} from "@/src/lib/api";
import { ApiError } from "@/src/lib/api";
import type { PublicProfileForm } from "@/src/components/account/account-types";

function normalizePreviewText(value: string) {
  return value.trim() ? value : null;
}

export type BookingPreviewCreationError = {
  message: string;
  canRefreshSettings?: boolean;
  cooldownSeconds?: number;
};

export function getBookingPreviewCreationError(
  error: unknown,
): BookingPreviewCreationError {
  if (error instanceof ApiError) {
    switch (error.code) {
      case "invalid_preview_draft":
        return {
          message:
            "Some preview fields are invalid. Review the display name, Instagram handle, bio, and intro copy, then try again.",
        };
      case "preview_not_authorized":
        return {
          message:
            "Your saved booking link needs to be refreshed before you can create a preview.",
          canRefreshSettings: true,
        };
      case "booking_slug_unavailable":
        return {
          message:
            "Save or repair your booking link before creating a preview.",
        };
      case "preview_rate_limited":
        return {
          message:
            "Preview creation is temporarily limited. Wait a few seconds, then try again.",
          cooldownSeconds: error.retryAfterSeconds ?? 5,
        };
      case "preview_session_failed":
        return { message: "We couldn't create the preview. Please try again." };
    }
  }

  return { message: "We couldn't create the preview. Please try again." };
}

export function buildBookingPreviewDraftOverrides(
  form: PublicProfileForm,
  persisted: StylistSettingsProfile,
): BookingPreviewDraftOverrides {
  const overrides: BookingPreviewDraftOverrides = {};
  const displayName = normalizePreviewText(form.display_name);
  const instagram = normalizePreviewText(form.instagram);
  const bio = normalizePreviewText(form.bio);
  const intro = normalizePreviewText(form.intro);
  const introDescription = normalizePreviewText(form.intro_description);

  if (displayName !== persisted.display_name) {
    overrides.display_name = displayName;
  }

  if (instagram !== persisted.instagram) {
    overrides.instagram = instagram;
  }

  if (bio !== persisted.bio) {
    overrides.bio = bio;
  }

  if (intro !== persisted.intro) {
    overrides.intro = intro;
  }

  if (introDescription !== persisted.intro_description) {
    overrides.intro_description = introDescription;
  }

  if (
    form.booking_request_form_enabled !==
    persisted.booking_request_form_enabled
  ) {
    overrides.booking_request_form_enabled =
      form.booking_request_form_enabled;
  }

  return overrides;
}
