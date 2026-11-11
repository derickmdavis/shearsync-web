import { ApiError } from "@/src/lib/api";
import { resolveReferralShare } from "@/src/lib/referral-share";

type RouteContext = {
  params: Promise<{ code: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { code } = await context.params;

  try {
    const data = await resolveReferralShare(code);
    return Response.json({ data }, { headers: noStoreHeaders() });
  } catch (error) {
    const status = publicShareStatus(error);
    const message = status === 404 || status === 410
      ? "This referral link is unavailable."
      : "Unable to load this referral link.";

    return Response.json(
      { error: { message } },
      { status, headers: noStoreHeaders() },
    );
  }
}

function publicShareStatus(error: unknown) {
  if (error instanceof ApiError && [404, 410, 429].includes(error.status)) {
    return error.status;
  }

  return 502;
}

function noStoreHeaders() {
  return {
    "Cache-Control": "private, no-store, max-age=0",
    "Referrer-Policy": "same-origin",
  };
}
