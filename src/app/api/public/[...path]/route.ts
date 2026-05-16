import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";

const LOG_BODY_LIMIT = 1000;
const SENSITIVE_LOG_KEYS = new Set([
  "authorization",
  "email",
  "guest_email",
  "guest_phone",
  "clientEmail",
  "clientPhone",
  "clientName",
  "full_name",
  "guest_first_name",
  "guest_last_name",
  "name",
  "note",
  "notes",
  "phone",
  "token",
]);

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function forwardRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  // This route is a browser-safe proxy: public booking UI calls same-origin
  // /api/public/* paths, while the backend remains responsible for writes,
  // RLS-sensitive mutations, and validation.
  const target = new URL(`/api/public/${path.join("/")}`, API_BASE_URL);
  const requestUrl = new URL(request.url);
  // Route handlers receive a one-shot body stream, so non-GET requests are
  // materialized before forwarding. Keep payload size in mind if this proxy
  // ever accepts file uploads or large request bodies.
  const requestBody =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  target.search = requestUrl.search;

  const headers = new Headers(request.headers);
  // The upstream API should see its own host, not the public web app host.
  headers.delete("host");

  const response = await fetchWithTimeout(target, {
    method: request.method,
    headers,
    body: requestBody,
    cache: "no-store",
  });

  if (response.status >= 500) {
    // Log enough context to diagnose backend failures without dumping the full
    // booking payload. The response body may still contain backend diagnostics,
    // so production logging should be treated as sensitive.
    const requestSummary =
      path.join("/") === "bookings" && requestBody
        ? summarizeBookingRequest(requestBody)
        : undefined;

    console.error(
      `Public API proxy received 5xx response ${JSON.stringify({
        path: `/api/public/${path.join("/")}`,
        target: target.toString(),
        method: request.method,
        status: response.status,
        requestSummary,
        responseBody: redactAndTruncateLogText(
          await response.clone().text(),
        ),
      })}`,
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function summarizeBookingRequest(rawBody: string) {
  try {
    const payload = JSON.parse(rawBody) as {
      stylist_slug?: string;
      service_id?: string;
      service_ids?: string[];
      requested_datetime?: string;
    };

    return {
      stylist_slug: payload.stylist_slug,
      service_id: payload.service_id,
      service_ids: payload.service_ids,
      requested_datetime: payload.requested_datetime,
    };
  } catch {
    return "unparseable booking payload";
  }
}

function redactAndTruncateLogText(value: string) {
  const redacted = redactLogText(value);

  if (redacted.length <= LOG_BODY_LIMIT) {
    return redacted;
  }

  return `${redacted.slice(0, LOG_BODY_LIMIT)}...[truncated]`;
}

function redactLogText(value: string) {
  try {
    return JSON.stringify(redactLogValue(JSON.parse(value)));
  } catch {
    return value
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
      .replace(/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, "[redacted-phone]")
      .replace(/\bBearer\s+[A-Za-z0-9._~+/=-]+/gi, "Bearer [redacted]");
  }
}

function redactLogValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(redactLogValue);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      SENSITIVE_LOG_KEYS.has(key) ? "[redacted]" : redactLogValue(nestedValue),
    ]),
  );
}

export async function GET(request: Request, context: RouteContext) {
  try {
    return await forwardRequest(request, context);
  } catch (error) {
    return Response.json(
      {
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Unable to reach the booking service.",
        },
      },
      { status: 502 },
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  try {
    return await forwardRequest(request, context);
  } catch (error) {
    return Response.json(
      {
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Unable to reach the booking service.",
        },
      },
      { status: 502 },
    );
  }
}
