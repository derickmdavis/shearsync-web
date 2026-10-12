import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";
import { buildSafeProxyResponseHeaders } from "@/src/lib/api-proxy";

type RouteContext = { params: Promise<{ path: string[] }> };

async function forwardAppointmentsRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const target = new URL(`/api/appointments/${path.join("/")}`, API_BASE_URL);
  const requestUrl = new URL(request.url);
  const body = request.method === "GET" || request.method === "HEAD"
    ? undefined
    : await request.text();
  target.search = requestUrl.search;
  const headers = new Headers(request.headers);
  headers.delete("host");
  const response = await fetchWithTimeout(target, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: buildSafeProxyResponseHeaders(response.headers),
  });
}

function appointmentsProxyError() {
  return Response.json(
    { error: { message: "Unable to reach the appointments service." } },
    { status: 502 },
  );
}

async function handle(request: Request, context: RouteContext) {
  try {
    return await forwardAppointmentsRequest(request, context);
  } catch {
    return appointmentsProxyError();
  }
}

export const GET = handle;
export const PATCH = handle;
