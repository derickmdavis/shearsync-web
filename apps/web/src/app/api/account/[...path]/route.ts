import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";
import { buildSafeProxyResponseHeaders } from "@/src/lib/api-proxy";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function forwardAccountRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  // Account routes proxy authenticated browser calls to the API so the client
  // can stay same-origin while the backend remains the authorization boundary.
  const target = new URL(`/api/account/${path.join("/")}`, API_BASE_URL);
  const requestUrl = new URL(request.url);
  // The request body stream can only be consumed once, so read it before
  // forwarding methods that may carry JSON payloads.
  const requestBody =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  target.search = requestUrl.search;

  const headers = new Headers(request.headers);
  // Do not forward the web app Host header to the backend API origin.
  headers.delete("host");

  const response = await fetchWithTimeout(target, {
    method: request.method,
    headers,
    body: requestBody,
    cache: "no-store",
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: buildSafeProxyResponseHeaders(response.headers),
  });
}

function accountProxyError() {
  // Keep proxy failures in the API envelope shape that the shared client helper
  // expects, even when the upstream API could not be reached.
  return Response.json(
    {
      error: {
        message: "Unable to reach the account service.",
      },
    },
    { status: 502 },
  );
}

export async function GET(request: Request, context: RouteContext) {
  try {
    return await forwardAccountRequest(request, context);
  } catch {
    return accountProxyError();
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    return await forwardAccountRequest(request, context);
  } catch {
    return accountProxyError();
  }
}
