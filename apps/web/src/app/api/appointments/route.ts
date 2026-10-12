import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";
import { buildSafeProxyResponseHeaders } from "@/src/lib/api-proxy";

async function forwardAppointmentsRequest(request: Request) {
  const target = new URL("/api/appointments", API_BASE_URL);
  const body = request.method === "GET" || request.method === "HEAD"
    ? undefined
    : await request.text();
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

async function handle(request: Request) {
  try {
    return await forwardAppointmentsRequest(request);
  } catch {
    return appointmentsProxyError();
  }
}

export const POST = handle;
