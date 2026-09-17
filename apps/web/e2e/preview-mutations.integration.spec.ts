import { expect, test } from "@playwright/test";

const apiBaseUrl = process.env.BOOKING_API_INTEGRATION_URL?.replace(/\/$/, "");
const accessToken = process.env.BOOKING_API_INTEGRATION_ACCESS_TOKEN;
const slug = process.env.BOOKING_API_INTEGRATION_SLUG;

test.describe("booking preview mutation protection (backend integration)", () => {
  test.skip(
    !apiBaseUrl || !accessToken || !slug,
    "Set BOOKING_API_INTEGRATION_URL, BOOKING_API_INTEGRATION_ACCESS_TOKEN, and BOOKING_API_INTEGRATION_SLUG to run against the API integration environment.",
  );

  test("rejects public booking mutations made with a preview capability", async ({ request }) => {
    const created = await request.post(`${apiBaseUrl}/api/settings/booking-preview-sessions`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        slug,
        draft_overrides: {},
        client_context: {
          source: "booking-settings-preview",
          schema_version: "booking_preview_draft.v1",
        },
      },
    });
    expect(created.status()).toBe(201);
    const createdBody = (await created.json()) as { data: { preview_url: string } };
    const previewToken = new URL(createdBody.data.preview_url).searchParams.get("preview");
    expect(previewToken).toMatch(/^PVW_/);

    const forbiddenMutations = [
      ["/api/public/booking-intake", { stylist_slug: slug, full_name: "Test Client", phone: "+17205550103" }],
      ["/api/public/bookings", { stylist_slug: slug, service_id: "service-e2e", requested_datetime: "2030-01-01T10:00:00Z", guest_first_name: "Test", guest_last_name: "Client", guest_phone: "+17205550103" }],
      [`/api/public/stylists/${slug}/waitlist`, { requestedDate: "2030-01-01", clientName: "Test Client", clientEmail: "test@example.com" }],
      ["/api/public/appointment-reference-photos/upload-intent", { reference_photo_upload_token: "placeholder", content_type: "image/jpeg", input_size_bytes: 1, display_content_type: "image/jpeg", thumbnail_content_type: "image/jpeg" }],
      ["/api/public/appointment-reference-photos", { reference_photo_upload_token: "placeholder", image_id: "image-e2e", storage_path: "placeholder", thumbnail_path: "placeholder", content_type: "image/jpeg", file_size_bytes: 1 }],
    ] as const;

    for (const [path, data] of forbiddenMutations) {
      const response = await request.post(`${apiBaseUrl}${path}`, {
        headers: { "X-Booking-Preview-Token": previewToken ?? "" },
        data,
      });

      expect(response.status(), path).toBe(403);
      await expect(response.json()).resolves.toMatchObject({
        error: { code: "preview_mutation_forbidden" },
      });
    }
  });
});
