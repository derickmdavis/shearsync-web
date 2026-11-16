import { forwardMessagingRequest, messagingProxyError } from "../../messaging-proxy";

type RouteContext = { params: Promise<{ path: string[] }> };
async function handle(request: Request, context: RouteContext) { try { const { path } = await context.params; return await forwardMessagingRequest(request, `/api/campaign-drafts/${path.join("/")}`); } catch { return messagingProxyError(); } }
export const GET = handle;
export const POST = handle;
export const PATCH = handle;
export const DELETE = handle;
