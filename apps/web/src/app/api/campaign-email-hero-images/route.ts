import { forwardMessagingRequest, messagingProxyError } from "../messaging-proxy";

export async function GET(request: Request) { try { return await forwardMessagingRequest(request, "/api/campaign-email-hero-images"); } catch { return messagingProxyError(); } }
