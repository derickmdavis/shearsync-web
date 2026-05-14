import { API_BASE_URL } from "@/src/lib/api";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function forwardSettingsRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const target = new URL(`/api/settings/${path.join("/")}`, API_BASE_URL);
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

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function accountProxyError(error: unknown) {
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
