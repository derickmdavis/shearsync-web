import { API_BASE_URL } from "@/src/lib/api";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function forwardRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const target = new URL(`/api/public/${path.join("/")}`, API_BASE_URL);
  const requestUrl = new URL(request.url);
  const requestBody =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  target.search = requestUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: requestBody,
    cache: "no-store",
  });

  if (response.status >= 500) {
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
        responseBody: await response.clone().text(),
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
