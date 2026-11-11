import {
  getPublicStylist,
  resolvePublicReferral,
  type PublicReferralShare,
} from "@/src/lib/api";

/**
 * Adapts the existing referral and public-stylist resolvers to the minimal
 * sharing contract. It intentionally discards referral-link IDs, expiry data,
 * and every client/referrer field before the response leaves the server.
 */
export async function resolveReferralShare(
  code: string,
): Promise<PublicReferralShare> {
  const referral = await resolvePublicReferral(code);
  const stylist = await getPublicStylist(referral.stylistSlug);
  const displayName = cleanPresentationName(stylist.display_name)
    || cleanPresentationName(stylist.business_name)
    || "your stylist";
  const businessName = cleanPresentationName(stylist.business_name);

  // The canonical attribution-preserving URL comes solely from the existing
  // referral resolver. Do not reconstruct it from code, slug, or request host.
  const referralUrl = validateReferralUrl(referral.referralUrl);

  return {
    stylist: {
      displayName,
      ...(businessName ? { businessName } : {}),
    },
    referralUrl,
    share: {
      title: `Book with ${displayName}`,
      text: `I love getting my hair done by ${displayName}! Here’s their booking link:`,
    },
  };
}

function cleanPresentationName(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function validateReferralUrl(value: string) {
  const url = new URL(value);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("The referral resolver returned an invalid booking URL.");
  }

  return url.toString();
}
