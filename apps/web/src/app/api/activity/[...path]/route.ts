import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";
import { buildSafeProxyResponseHeaders } from "@/src/lib/api-proxy";

type RouteContext = { params: Promise<{ path: string[] }> };

async function forwardActivityRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const target = new URL(`/api/activity/${path.join("/")}`, API_BASE_URL);
  target.search = new URL(request.url).search;
  const headers = new Headers(request.headers);
  headers.delete("host");
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.text();
  const response = await fetchWithTimeout(target, { method: request.method, headers, body, cache: "no-store" });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: buildSafeProxyResponseHeaders(response.headers),
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    return await forwardActivityRequest(request, context);
  } catch {
    return Response.json({ error: { message: "Unable to reach the messaging service." } }, { status: 502 });
  }
}

export async function GET(request: Request, context: RouteContext) {
  try {
    return await forwardActivityRequest(request, context);
  } catch {
    return Response.json({ error: { message: "Unable to reach the messaging service." } }, { status: 502 });
  }
}
