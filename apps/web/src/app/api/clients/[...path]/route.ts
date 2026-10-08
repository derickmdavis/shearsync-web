import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";
import { buildSafeProxyResponseHeaders } from "@/src/lib/api-proxy";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function forwardClientRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const target = new URL(`/api/clients/${path.join("/")}`, API_BASE_URL);
  const requestUrl = new URL(request.url);
  const requestBody =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  target.search = requestUrl.search;

  const headers = new Headers(request.headers);
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

function clientProxyError() {
  return Response.json(
    {
      error: {
        message: "Unable to reach the client service.",
      },
    },
    { status: 502 },
  );
}

async function handle(request: Request, context: RouteContext) {
  try {
    return await forwardClientRequest(request, context);
  } catch {
    return clientProxyError();
  }
}

export const GET = handle;
export const POST = handle;
export const PATCH = handle;
export const DELETE = handle;
