import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";
import { buildSafeProxyResponseHeaders } from "@/src/lib/api-proxy";
async function forward(request: Request) { const target = new URL("/api/off-days", API_BASE_URL); target.search = new URL(request.url).search; const headers = new Headers(request.headers); headers.delete("host"); const response = await fetchWithTimeout(target, { method: request.method, headers, body: request.method === "GET" ? undefined : await request.text(), cache: "no-store" }); return new Response(response.body, { status: response.status, statusText: response.statusText, headers: buildSafeProxyResponseHeaders(response.headers) }); }
async function handle(request: Request) { try { return await forward(request); } catch { return Response.json({ error: { message: "Unable to reach time off settings." } }, { status: 502 }); } }
export const GET = handle; export const POST = handle;
