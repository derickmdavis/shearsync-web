import type { Metadata } from "next";
import { BookingFlow } from "@/src/components/booking/BookingFlow";
import { BookingPreviewFlow } from "@/src/components/booking/BookingPreviewFlow";
import { PreviewRetryButton } from "@/src/components/booking/PreviewRetryButton";
import { PreviewUrlCleanup } from "@/src/components/booking/PreviewUrlCleanup";
import {
  ApiError,
  getPublicStylist,
  resolveBookingPreviewSession,
  type BookingPreviewContext,
  type PublicStylist,
} from "@/src/lib/api";

type BookingPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    ref?: string | string[];
    preview?: string | string[];
  }>;
};

type PreviewFailure =
  | "unavailable"
  | "expired"
  | "malformed"
  | "retry"
  | "restricted";

const SUPPORTED_BOOKING_PREVIEW_SCHEMA_VERSION = "booking_preview_context.v1";
const PREVIEW_RESOLVER_CODES = new Set([
  "preview_resolved",
  "invalid_preview_context",
  "preview_session_not_found",
  "preview_session_expired",
  "validation_failed",
  "preview_rate_limited",
  "preview_session_failed",
  "preview_not_authorized",
  "preview_mutation_forbidden",
  "booking_slug_unavailable",
]);

export async function generateMetadata({
  searchParams,
}: Pick<BookingPageProps, "searchParams">): Promise<Metadata> {
  const params = await searchParams;

  return params.preview !== undefined ? { referrer: "no-referrer" } : {};
}

export default async function BookingPage(props: BookingPageProps) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const previewToken = getFirstSearchParamValue(searchParams.preview);

  if (searchParams.preview !== undefined) {
    if (!previewToken) {
      return <PreviewErrorScreen failure="malformed" />;
    }

    let preview: BookingPreviewContext | null = null;
    let previewFailure: PreviewFailure | null = null;

    try {
      const resolvedPreview = await resolveBookingPreviewSession(previewToken, slug);

      if (!isBookingPreviewContext(resolvedPreview)) {
        // Treat an unexpected resolver payload as unavailable rather than
        // passing incomplete data to the client preview flow.
        previewFailure = "unavailable";
        recordPreviewResolverOutcome(502, "invalid_preview_context");
      } else {
        preview = resolvedPreview;
        recordPreviewResolverOutcome(200, "preview_resolved");
      }
    } catch (error) {
      // Never fall back to the production stylist endpoint in preview mode.
      // That endpoint records a public booking-page view.
      preview = null;
      previewFailure = getPreviewFailure(error);
      recordPreviewResolverOutcome(
        getPreviewResolverStatus(error),
        getPreviewResolverCode(error),
      );
    }

    if (!preview) {
      return <PreviewErrorScreen failure={previewFailure ?? "unavailable"} />;
    }

    return (
      <main className="px-4 py-6 sm:px-6 sm:py-10 lg:py-14">
        <PreviewUrlCleanup />
        <div className="mx-auto w-full max-w-[430px] lg:max-w-[980px]">
          <BookingPreviewFlow
            preview={preview}
            stylist={toPreviewStylist(preview)}
            previewToken={previewToken}
          />
        </div>
      </main>
    );
  }

  const referralCode = getFirstSearchParamValue(searchParams.ref);

  let stylist: PublicStylist | null = null;

  try {
    stylist = await getPublicStylist(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return (
        <main className="flex min-h-screen items-center justify-center px-4 py-10">
          <div className="w-full max-w-[430px] rounded-[30px] border border-white/80 bg-card p-8 text-center shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
            <p className="font-display text-4xl font-semibold italic text-foreground">
              DripDesk
            </p>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
              Stylist not found
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              We couldn&apos;t find that booking page. Please double-check the
              link or contact your stylist directly.
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-[430px] rounded-[30px] border border-white/80 bg-card p-8 shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Booking unavailable
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            {error instanceof Error
              ? error.message
              : "We couldn't load this booking page right now."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-[430px] lg:max-w-[980px]">
        <BookingFlow
          slug={slug}
          stylist={stylist}
          initialReferralCode={referralCode}
        />
      </div>
    </main>
  );
}

function toPreviewStylist(preview: BookingPreviewContext): PublicStylist {
  const { profile } = preview;

  return {
    // The preview resolver deliberately omits production-only fields such as
    // stylist ID, phone, timezone, and feature flags. The booking UI treats
    // these values as optional, so only adapt the returned public page model.
    slug: preview.slug,
    display_name:
      profile.display_name || profile.business_name || "Booking preview",
    bio: profile.bio,
    instagram: profile.instagram,
    cover_photo_url: profile.cover_photo_url,
    business_name: profile.business_name,
    booking_enabled: profile.booking_enabled,
    booking_request_form_enabled: profile.booking_request_form_enabled,
    booking_request_form: isBookingInquiryForm(profile.booking_request_form)
      ? profile.booking_request_form
      : { enabled: false, questions: [] },
  };
}

function isBookingPreviewContext(value: unknown): value is BookingPreviewContext {
  if (!isRecord(value) || value.preview_mode !== true) {
    return false;
  }

  if (
    typeof value.expires_at !== "string" ||
    !value.expires_at ||
    typeof value.slug !== "string" ||
    !value.slug ||
    value.schema_version !== SUPPORTED_BOOKING_PREVIEW_SCHEMA_VERSION ||
    !isRecord(value.profile) ||
    !isRecord(value.preview_capabilities)
  ) {
    return false;
  }

  const { profile, preview_capabilities: capabilities } = value;

  return (
    isNullableString(profile.display_name) &&
    isNullableString(profile.bio) &&
    isNullableString(profile.instagram) &&
    isNullableString(profile.intro) &&
    isNullableString(profile.intro_description) &&
    isNullableString(profile.cover_photo_url) &&
    isNullableString(profile.business_name) &&
    typeof profile.booking_enabled === "boolean" &&
    typeof profile.booking_request_form_enabled === "boolean" &&
    typeof capabilities.allow_public_reads === "boolean" &&
    typeof capabilities.allow_booking_submission === "boolean" &&
    typeof capabilities.allow_waitlist_submission === "boolean" &&
    typeof capabilities.allow_uploads === "boolean" &&
    typeof capabilities.allow_payments === "boolean" &&
    typeof capabilities.allow_analytics === "boolean"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNullableString(value: unknown) {
  return value === null || typeof value === "string";
}

function isBookingInquiryForm(value: unknown) {
  return isRecord(value)
    && typeof value.enabled === "boolean"
    && Array.isArray(value.questions)
    && value.questions.length === 3;
}

function recordPreviewResolverOutcome(status: number, code: string) {
  // This is intentionally server-only operational telemetry. Keep it limited
  // to an aggregate status/code pair: a preview URL is a bearer capability.
  console.info(
    "booking_preview_resolver",
    JSON.stringify({
      status: Number.isInteger(status) && status >= 100 && status <= 599
        ? status
        : 502,
      code: PREVIEW_RESOLVER_CODES.has(code) ? code : "unknown",
    }),
  );
}

function getPreviewResolverStatus(error: unknown) {
  return error instanceof ApiError ? error.status : 502;
}

function getPreviewResolverCode(error: unknown) {
  return error instanceof ApiError ? error.code ?? "unknown" : "unknown";
}

function getPreviewFailure(error: unknown): PreviewFailure {
  if (error instanceof ApiError) {
    switch (error.code) {
      case "preview_session_not_found":
        return "unavailable";
      case "preview_session_expired":
        return "expired";
      case "validation_failed":
      case "invalid_preview_draft":
        return "malformed";
      case "preview_rate_limited":
      case "preview_session_failed":
        return "retry";
      case "preview_not_authorized":
      case "preview_mutation_forbidden":
      case "booking_slug_unavailable":
        return "restricted";
    }

    if (error.status === 404) return "unavailable";
    if (error.status === 410) return "expired";
    if (error.status === 400) return "malformed";
    if (error.status === 403) return "restricted";
    if (error.status === 409) return "restricted";
    if (error.status === 429 || error.status >= 500) return "retry";
  }

  return "retry";
}

function PreviewErrorScreen({ failure }: { failure: PreviewFailure }) {
  const isRetryable = failure === "retry";
  const title = failure === "expired" ? "Preview expired" : "Preview unavailable";
  const message =
    failure === "expired"
      ? "This preview expired. Return to Settings to create a new one."
      : failure === "unavailable"
        ? "This preview link is unavailable."
        : failure === "malformed"
          ? "This preview link is malformed and cannot be opened."
          : failure === "restricted"
            ? "This preview cannot be opened with the current booking settings."
            : "We couldn't load this preview right now. Please try again.";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-[430px] rounded-[30px] border border-white/80 bg-card p-8 text-center shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
        <p className="font-display text-4xl font-semibold italic text-foreground">
          DripDesk
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          {message}
        </p>
        {isRetryable ? <PreviewRetryButton /> : null}
        <a
          href="/account"
          className="mt-5 inline-flex text-sm font-semibold text-brand underline decoration-brand/60 underline-offset-4"
        >
          Return to Settings
        </a>
      </div>
    </main>
  );
}

function getFirstSearchParamValue(value?: string | string[]) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const trimmedValue = rawValue?.trim();

  return trimmedValue || null;
}
