import { fetchWithTimeout, getBackendApiOrigin } from "@/src/lib/server-config";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORWARDED_STATUSES = new Set([201, 400, 429]);

type WaitlistPayload = {
  full_name?: unknown;
  email?: unknown;
  source?: unknown;
};

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let payload: WaitlistPayload;

  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return Response.json(
      { error: { message: "Please enter your full name and email address." } },
      { status: 400 },
    );
  }

  const fullName =
    typeof payload.full_name === "string" ? payload.full_name.trim() : "";
  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source =
    typeof payload.source === "string" && payload.source.trim()
      ? payload.source.trim()
      : "homepage_waitlist";

  if (!fullName || !EMAIL_PATTERN.test(email)) {
    return Response.json(
      { error: { message: "Please enter a valid full name and email address." } },
      { status: 400 },
    );
  }

  try {
    const target = new URL(
      "/api/public/early-access",
      getBackendApiOrigin(),
    );
    const response = await fetchWithTimeout(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        source,
      }),
      cache: "no-store",
    });

    const body = await safeJson(response);

    if (FORWARDED_STATUSES.has(response.status) && body !== null) {
      return Response.json(body, { status: response.status });
    }

    return Response.json(
      { error: { message: "Unable to join the waitlist." } },
      { status: 502 },
    );
  } catch {
    return Response.json(
      { error: { message: "Unable to join the waitlist." } },
      { status: 502 },
    );
  }
}
