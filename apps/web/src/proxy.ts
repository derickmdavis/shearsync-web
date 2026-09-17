import { NextResponse, type NextRequest } from "next/server";

// A preview URL contains a short-lived bearer capability. Apply these headers
// to the document response itself so browsers and intermediary caches do not
// retain or forward the capability before the client removes it from the URL.
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.searchParams.has("preview")) {
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    response.headers.set("Referrer-Policy", "no-referrer");
  }

  return response;
}

export const config = {
  matcher: "/book/:slug",
};
