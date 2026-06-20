import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createClientReferralLink,
  createPublicBooking,
  getClientReferralLink,
  getClientReferralStats,
  getClients,
  getPublicAvailability,
  getPublicServices,
  getPublicSlots,
  joinWaitlist,
  resolvePublicReferral,
} from "@/src/lib/api";

describe("public booking api helpers", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("includes booking_context_token when loading services", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await getPublicServices("maya-johnson", "token-1");

    expect(fetch).toHaveBeenCalledWith(
      "/api/public/services/maya-johnson?booking_context_token=token-1",
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it("includes booking_context_token when loading raw availability", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await getPublicAvailability("maya-johnson", "token-2");

    expect(fetch).toHaveBeenCalledWith(
      "/api/public/availability/maya-johnson?booking_context_token=token-2",
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it("includes booking_context_token when loading slots", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          data: { date: "2026-05-04", timezone: "America/Denver", slots: [] },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    await getPublicSlots(
      "maya-johnson",
      ["service-1", "service-2"],
      "2026-05-04",
      "token-3",
    );

    expect(fetch).toHaveBeenCalledWith(
      "/api/public/availability/maya-johnson/slots?date=2026-05-04&service_id=service-1&booking_context_token=token-3",
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it("posts booking_context_token when creating a public booking", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            stylist_slug: "maya-johnson",
            service_id: "service-1",
            service_name: "Haircut",
            service_duration_minutes: 60,
            service_price: 95,
            appointment_date: "2026-06-15T09:00:00-06:00",
            status: "scheduled",
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    await createPublicBooking({
      stylist_slug: "maya-johnson",
      service_id: "service-1",
      requested_datetime: "2026-06-15T09:00:00-06:00",
      guest_first_name: "Jane",
      guest_last_name: "Smith",
      guest_email: "jane@example.com",
      guest_phone: "(720) 555-0103",
      booking_context_token: "token-4",
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/public/bookings",
      expect.objectContaining({
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({
          stylist_slug: "maya-johnson",
          service_id: "service-1",
          requested_datetime: "2026-06-15T09:00:00-06:00",
          guest_first_name: "Jane",
          guest_last_name: "Smith",
          guest_email: "jane@example.com",
          guest_phone: "(720) 555-0103",
          booking_context_token: "token-4",
        }),
      }),
    );
  });

  it("shows a readable booking-service error for browser load failures", async () => {
    vi.mocked(fetch).mockRejectedValue(new TypeError("Load failed"));

    await expect(getPublicServices("maya-johnson", "token-1")).rejects.toEqual(
      expect.objectContaining({
        message: "Unable to reach the booking service. Please try again.",
        status: 0,
      }),
    );
  });

  it("posts public waitlist entries through the booking api", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            id: "waitlist-1",
            requestedDate: "2026-06-15",
            serviceId: "service-1",
            clientName: "Ava Martinez",
            status: "active",
            source: "public_booking",
            createdAt: "2026-05-13T12:00:00.000Z",
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    await joinWaitlist("maya-johnson", {
      requestedDate: "2026-06-15",
      serviceId: "service-1",
      clientName: "Ava Martinez",
      clientEmail: "ava@example.com",
      clientPhone: null,
      requestedTimePreference: "Morning preferred",
      note: "Anytime after 10am.",
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/public/stylists/maya-johnson/waitlist",
      expect.objectContaining({
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({
          requestedDate: "2026-06-15",
          serviceId: "service-1",
          clientName: "Ava Martinez",
          clientEmail: "ava@example.com",
          clientPhone: null,
          requestedTimePreference: "Morning preferred",
          note: "Anytime after 10am.",
        }),
      }),
    );
  });
});

describe("authenticated clients api helpers", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads clients with a bearer token and sorts by client name", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          data: [
            makeCustomer({ id: "2", first_name: "Zoey", last_name: "Ray" }),
            makeCustomer({ id: "1", first_name: "Ava", last_name: "Martinez" }),
          ],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const clients = await getClients("token-1");

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/clients",
      expect.objectContaining({
        cache: "no-store",
        headers: expect.any(Headers),
      }),
    );
    expect(
      (vi.mocked(fetch).mock.calls[0]?.[1]?.headers as Headers).get(
        "Authorization",
      ),
    ).toBe("Bearer token-1");
    expect(clients.map((client) => client.id)).toEqual(["1", "2"]);
  });

  it("unwraps null referral-link responses", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(getClientReferralLink("client-1", "token-1")).resolves.toBeNull();

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/clients/client-1/referral-link",
      expect.objectContaining({
        cache: "no-store",
        headers: expect.any(Headers),
      }),
    );
  });

  it("calls client referral helper paths with bearer auth", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ data: makeReferralLink() }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ data: makeReferralStats() }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

    await createClientReferralLink("client 1", "token-1");
    await getClientReferralStats("client 1", "token-1");

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      "http://localhost:3000/api/clients/client%201/referral-link",
      expect.objectContaining({
        cache: "no-store",
        method: "POST",
        headers: expect.any(Headers),
      }),
    );
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      "http://localhost:3000/api/clients/client%201/referral-stats",
      expect.objectContaining({
        cache: "no-store",
        headers: expect.any(Headers),
      }),
    );
    expect(
      (vi.mocked(fetch).mock.calls[0]?.[1]?.headers as Headers).get(
        "Authorization",
      ),
    ).toBe("Bearer token-1");
  });
});

describe("public referral api helpers", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("resolves public referral codes through the public proxy", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            referralLinkId: "referral-link-1",
            referralCode: "rf_client123",
            referralUrl: "https://dripdesk.test/r/rf_client123",
            stylistSlug: "maya-johnson",
            bookingUrl: "https://dripdesk.test/book/maya-johnson",
            expiresAt: "2026-08-01T00:00:00.000Z",
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    await expect(resolvePublicReferral("rf client123")).resolves.toEqual(
      expect.objectContaining({
        referralCode: "rf_client123",
        stylistSlug: "maya-johnson",
      }),
    );

    expect(fetch).toHaveBeenCalledWith(
      "/api/public/referrals/rf%20client123",
      expect.objectContaining({ cache: "no-store" }),
    );
  });
});

function makeCustomer(
  overrides: Partial<Awaited<ReturnType<typeof getClients>>[number]>,
) {
  return {
    id: "client-1",
    user_id: "user-1",
    first_name: "Ava",
    last_name: "Martinez",
    preferred_name: null,
    phone: null,
    phone_normalized: null,
    email: null,
    instagram: null,
    birthday: null,
    notes: null,
    preferred_contact_method: null,
    tags: null,
    source: null,
    reminder_consent: null,
    total_spend: null,
    last_visit_at: null,
    created_at: "2026-05-12T18:00:00.000Z",
    updated_at: "2026-05-12T18:00:00.000Z",
    ...overrides,
  };
}

function makeReferralLink() {
  return {
    id: "referral-link-1",
    user_id: "user-1",
    client_id: "client-1",
    referral_code: "rf_client123",
    referral_url: "https://dripdesk.test/r/rf_client123",
    status: "active",
    created_at: "2026-05-12T18:00:00.000Z",
    updated_at: "2026-05-12T18:00:00.000Z",
  };
}

function makeReferralStats() {
  return {
    referral_link_id: "referral-link-1",
    referral_code: "rf_client123",
    referral_url: "https://dripdesk.test/r/rf_client123",
    opened_count: 3,
    booking_attributed_count: 1,
  };
}
