import { API_BASE_URL, fetchWithTimeout } from "@/src/lib/api";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DUPLICATE_STATUSES = new Set([200, 201, 204, 409]);

type WaitlistPayload = {
  full_name?: unknown;
  email?: unknown;
  source?: unknown;
};

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
    const target = new URL("/api/public/early-access-requests", API_BASE_URL);
    const response = await fetchWithTimeout(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        source,
      }),
      cache: "no-store",
    });

    if (DUPLICATE_STATUSES.has(response.status)) {
      return Response.json({ ok: true }, { status: 200 });
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
