import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";
import { buildSafeProxyResponseHeaders } from "@/src/lib/api-proxy";

export async function forwardMessagingRequest(request: Request, backendPath: string) {
  const target = new URL(backendPath, API_BASE_URL);
  target.search = new URL(request.url).search;
  const headers = new Headers(request.headers);
  headers.delete("host");
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.text();
  const response = await fetchWithTimeout(target, { method: request.method, headers, body, cache: "no-store" });
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: buildSafeProxyResponseHeaders(response.headers) });
}

export function messagingProxyError() {
  return Response.json({ error: { message: "Unable to reach the messaging service." } }, { status: 502 });
}
