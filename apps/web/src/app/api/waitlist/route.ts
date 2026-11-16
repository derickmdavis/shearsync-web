import { forwardMessagingRequest, messagingProxyError } from "../messaging-proxy";

async function handle(request: Request) { try { return await forwardMessagingRequest(request, "/api/waitlist"); } catch { return messagingProxyError(); } }
export const GET = handle;
