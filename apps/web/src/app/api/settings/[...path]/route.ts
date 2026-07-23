import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function forwardSettingsRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  // Settings routes use the same backend-for-frontend pattern as account
  // routes: the browser talks to this Next app, and this handler forwards to
  // the API that owns authorization and persistence.
  const target = new URL(`/api/settings/${path.join("/")}`, API_BASE_URL);
  const requestUrl = new URL(request.url);
  // Materialize JSON bodies before forwarding because Request streams are
  // single-use in Route Handlers.
  const requestBody =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  target.search = requestUrl.search;

  const headers = new Headers(request.headers);
  // Let fetch set the upstream Host header for the backend origin.
  headers.delete("host");

  const response = await fetchWithTimeout(target, {
    method: request.method,
    headers,
    body: requestBody,
    cache: "no-store",
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function accountProxyError(error: unknown) {
  // The frontend API helper unwraps this envelope and turns it into ApiError.
  return Response.json(
    {
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Unable to reach the account service.",
      },
    },
    { status: 502 },
  );
}

export async function GET(request: Request, context: RouteContext) {
  try {
    return await forwardSettingsRequest(request, context);
  } catch (error) {
    return accountProxyError(error);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    return await forwardSettingsRequest(request, context);
  } catch (error) {
    return accountProxyError(error);
  }
}
