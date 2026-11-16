import { forwardMessagingRequest, messagingProxyError } from "../messaging-proxy";

async function handle(request: Request) { try { return await forwardMessagingRequest(request, "/api/campaign-drafts"); } catch { return messagingProxyError(); } }
export const POST = handle;
