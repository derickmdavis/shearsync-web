import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createPublicBooking,
  getClients,
  getPublicAvailability,
  getPublicServices,
  getPublicSlots,
  joinWaitlist,
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
      "/api/public/availability/maya-johnson/slots?date=2026-05-04&service_id=service-1&service_ids=service-1&service_ids=service-2&booking_context_token=token-3",
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
