const UNSAFE_PROXY_RESPONSE_HEADERS = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "set-cookie",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

/**
 * Node's fetch transparently decodes compressed upstream response bodies.
 * Never forward the original framing/compression headers with that decoded
 * stream, or browsers will attempt a second decode and reject the response.
 */
export function buildSafeProxyResponseHeaders(upstreamHeaders: Headers) {
  const headers = new Headers();

  upstreamHeaders.forEach((value, key) => {
    if (!UNSAFE_PROXY_RESPONSE_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  return headers;
}
