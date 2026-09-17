import { createServer } from "node:http";

const port = 4010;
const previewToken = "PVW_e2e-preview-token";
const requests = [];

const profile = {
  id: "profile-1",
  email: "maya@example.com",
  full_name: "Maya Johnson",
  phone_number: "(720) 555-0103",
  business_name: "Maya Studio",
  timezone: "America/Denver",
  location_label: "Denver, CO",
  avatar_image_id: null,
  created_at: "2026-09-17T00:00:00.000Z",
  updated_at: "2026-09-17T00:00:00.000Z",
};

const stylist = {
  id: "stylist-1",
  user_id: "user-1",
  slug: "maya-johnson",
  display_name: "Maya Johnson",
  bio: "Lived-in color specialist",
  instagram: "mayajohnsonhair",
  cover_photo_url: null,
  booking_enabled: true,
  booking_request_form_enabled: true,
  created_at: "2026-09-17T00:00:00.000Z",
  updated_at: "2026-09-17T00:00:00.000Z",
};

const plan = {
  tier: "pro",
  status: "active",
  displayName: "Pro",
  smsMonthlyLimit: 500,
  smsUsedThisMonth: 0,
  smsRemainingThisMonth: 500,
  features: {
    bookingPage: true,
    crm: true,
    emailReminders: true,
    smsReminders: true,
    customCoverPhoto: true,
    customSlug: true,
    googleCalendarSync: false,
    weeklyBusinessRecap: false,
    clientExport: false,
  },
};

function send(response, status, body) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Headers": "authorization, content-type, x-booking-preview-token",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(body));
}

createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);
  requests.push({ method: request.method, pathname: url.pathname });

  if (request.method === "OPTIONS") {
    return send(response, 204, null);
  }

  if (url.pathname === "/health") return send(response, 200, { ok: true });
  if (url.pathname === "/__e2e/requests") return send(response, 200, { data: requests });
  if (url.pathname === "/__e2e/reset" && request.method === "POST") {
    requests.length = 0;
    return send(response, 200, { ok: true });
  }

  if (url.pathname === "/api/settings/profile") return send(response, 200, { data: profile });
  if (url.pathname === "/api/settings/booking") return send(response, 200, { data: stylist });
  if (url.pathname === "/api/account/plan") return send(response, 200, { data: plan });
  if (url.pathname === "/api/settings/booking-preview-sessions" && request.method === "POST") {
    return send(response, 201, {
      data: {
        preview_session_id: "preview-e2e-1",
        preview_url: `http://127.0.0.1:3001/book/maya-johnson?preview=${previewToken}`,
        expires_at: "2026-09-17T01:00:00.000Z",
        schema_version: "booking_preview_session.v1",
      },
    });
  }

  if (url.pathname === `/api/public/booking-preview-sessions/${previewToken}`) {
    return send(response, 200, {
      data: {
        preview_mode: true,
        expires_at: "2026-09-17T01:00:00.000Z",
        slug: "maya-johnson",
        profile: {
          display_name: "Maya Johnson",
          bio: "Lived-in color specialist",
          instagram: "mayajohnsonhair",
          cover_photo_url: null,
          business_name: "Maya Studio",
          booking_enabled: true,
          booking_request_form_enabled: true,
        },
        preview_capabilities: {
          allow_public_reads: true,
          allow_booking_submission: false,
          allow_waitlist_submission: false,
          allow_uploads: false,
          allow_payments: false,
          allow_analytics: false,
        },
        schema_version: "booking_preview_context.v1",
      },
    });
  }

  if (url.pathname === "/api/public/services/maya-johnson") {
    return send(response, 200, {
      data: [
        {
          id: "service-1",
          name: "Signature Cut",
          description: null,
          durationMinutes: 60,
          price: 95,
          isActive: true,
          isDefault: false,
          sortOrder: 0,
        },
      ],
    });
  }

  return send(response, 404, { error: { code: "not_found" } });
}).listen(port);
