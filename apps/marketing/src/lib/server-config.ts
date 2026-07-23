const LOCAL_BACKEND_API_ORIGIN = "http://localhost:3000";
const DEFAULT_FETCH_TIMEOUT_MS = 15000;

export function getBackendApiOrigin() {
  const candidate = process.env.API_BASE_URL?.trim() || LOCAL_BACKEND_API_ORIGIN;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }

    return url.origin;
  } catch {
    throw new Error("API_BASE_URL must be a valid absolute HTTP(S) URL.");
  }
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = DEFAULT_FETCH_TIMEOUT_MS,
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const upstreamSignal = init.signal;

  function handleUpstreamAbort() {
    controller.abort();
  }

  if (upstreamSignal?.aborted) {
    controller.abort();
  } else {
    upstreamSignal?.addEventListener("abort", handleUpstreamAbort, {
      once: true,
    });
  }

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
    upstreamSignal?.removeEventListener("abort", handleUpstreamAbort);
  }
}
