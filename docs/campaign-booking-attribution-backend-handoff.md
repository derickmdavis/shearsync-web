# Campaign booking attribution: backend handoff

## Summary

Campaign emails are being delivered and are visible in the management screen, but bookings made through those emails are not credited to the campaign. The immediate production failure is that the campaign CTA URL does **not** redirect to a booking URL carrying an attribution handoff.

The backend must make the campaign-link endpoint resolve a public campaign-link code, create or retrieve a short-lived single-use booking-attribution handoff, and redirect the browser to the matching public booking page with that handoff. The existing web booking flow will capture the handoff and include the resulting opaque attribution token when it creates the booking.

## Production evidence

The actual campaign URL supplied during investigation was:

```text
https://www.rootfoil.app/api/public/campaign-links/_0dtDDnR0Xau6i7XEeBYOE0Y0CKyqRmp
```

Observed in Chrome DevTools Network on November 11, 2026:

- The document request for `_0dtDDnR0Xau6i7XEeBYOE0Y0CKyqRmp` returned **HTTP 200**.
- The browser remained at `/api/public/campaign-links/_0dtDDnR0Xau6i7XEeBYOE0Y0CKyqRmp`.
- No follow-up `/book/{stylist-slug}` document request occurred.
- Therefore no `booking_attribution_handoff_token` ever reached the booking page.

A working campaign CTA must instead return a redirect (`302`, `303`, or `307`) with a `Location` header pointing to `/book/{stylist-slug}` and containing an opaque `booking_attribution_handoff_token` query parameter.

## What already exists in the web application

The web app already implements the client side of this contract:

1. `BookingAttributionGate` on `/book/{slug}` reads `booking_attribution_handoff_token` from the URL.
2. It calls `POST /api/public/booking-attribution-contexts/capture` with that handoff value.
3. On a successful capture, it stores the returned opaque `bookingAttributionToken` locally for that stylist, removes the handoff from the visible URL, and renders the booking flow.
4. When the guest confirms their appointment, `POST /api/public/bookings` includes `booking_attribution_token`.
5. The browser clears the stored token after a successful booking because one handoff is intended to credit one booking.

The Next.js public API route is a transparent proxy to the configured backend. It does not manufacture redirects or attribution values. A `200` response from the campaign-link endpoint is therefore an upstream backend/configuration behavior, not a browser-layout issue.

## Required public redirect contract

### Request

```http
GET /api/public/campaign-links/{campaign_link_code}
```

Example:

```http
GET /api/public/campaign-links/_0dtDDnR0Xau6i7XEeBYOE0Y0CKyqRmp
```

### Successful response

Use `303 See Other` (preferred for a browser navigation) or `302 Found`.

```http
HTTP/1.1 303 See Other
Location: https://www.rootfoil.app/book/{stylist-slug}?booking_attribution_handoff_token={opaque-single-use-handoff}
Cache-Control: no-store, private
Referrer-Policy: no-referrer
```

Requirements:

- `{stylist-slug}` must be resolved from the server-side campaign-link record, never accepted from the URL caller.
- `{opaque-single-use-handoff}` must be high-entropy, unguessable, short-lived, and bound to the campaign link and stylist.
- The opaque handoff is the only campaign-attribution value exposed in the redirect URL. Do not expose campaign IDs, recipient IDs, client IDs, stylist IDs, or raw database keys.
- Build the destination from a server-side allowlisted web origin (`https://www.rootfoil.app`) and the resolved slug. Do not accept a caller-provided return URL or redirect target.
- The endpoint must not return an HTML document or a JSON success payload for a browser CTA. It must redirect.
- Add `Cache-Control: no-store, private` to prevent link capabilities from being cached by browsers, email clients, or intermediaries.

## Backend data and trust model

### Campaign-link resolution

Resolve `{campaign_link_code}` server-side to a record containing, at minimum:

- campaign link ID;
- campaign ID;
- recipient/client ID, if the campaign is recipient-specific;
- account/stylist ID and public booking slug;
- active/revoked status;
- campaign and recipient eligibility state.

Do not trust any campaign, stylist, recipient, or account identifier from the browser.

### Handoff record

Create a dedicated handoff record or an equivalent signed/capability-backed representation. It must support atomic single-use capture.

Suggested fields:

| Field | Purpose |
| --- | --- |
| `id` | Internal primary key. |
| `token_hash` | Hash of the opaque handoff; never persist the plaintext token if avoidable. |
| `campaign_link_id` | Source link used for campaign credit. |
| `campaign_id` | Campaign to credit. |
| `recipient_id` | Recipient when applicable. |
| `stylist_id` | Account permitted to receive the booking. |
| `stylist_slug` | Expected public booking-page slug. |
| `expires_at` | Short expiry, e.g. 15 minutes. |
| `captured_at` | Set atomically during capture. |
| `consumed_at` | Set atomically when the final booking is created. |
| `booking_id` | Set once the credited booking is committed. |
| `revoked_at` | Supports campaign/link cancellation. |

The handoff token must be distinct from the later `booking_attribution_token`. Treat both values as bearer capabilities: redact them from logs, error messages, analytics payloads, and ordinary URLs after capture.

## Required capture endpoint

The web app already calls this endpoint after the redirect:

```http
POST /api/public/booking-attribution-contexts/capture
Content-Type: application/json

{
  "booking_attribution_handoff_token": "{opaque-single-use-handoff}"
}
```

On success, atomically claim the handoff (or prevent concurrent duplicate claims) and issue a second, opaque booking-attribution token:

```http
HTTP/1.1 200 OK
Cache-Control: no-store, private

{
  "data": {
    "bookingAttributionToken": "{opaque-booking-token}",
    "expiresAt": "2026-11-11T21:00:00.000Z"
  }
}
```

The issued booking token must remain bound to the same stylist and campaign link. It must not be possible to use it for a booking on a different stylist or account.

Recommended error behavior:

| Condition | Status | Stable error code |
| --- | ---: | --- |
| Unknown or malformed handoff | 404 or 400 | `booking_attribution_context_unavailable` |
| Expired, revoked, or already captured handoff | 410 | `booking_attribution_context_unavailable` |
| Rate limited | 429 | `rate_limited` |
| Unexpected failure | 500 | `internal_error` |

Do not return a token in an error payload. The web flow is deliberately additive: if capture fails it can still let a guest book, but that booking will correctly have no campaign attribution.

## Required booking-create behavior

The existing browser booking request contains:

```json
{
  "stylist_slug": "{resolved booking slug}",
  "service_id": "{service id}",
  "requested_datetime": "{ISO datetime}",
  "booking_context_token": "{existing booking-context token}",
  "booking_attribution_token": "{opaque-booking-token}"
}
```

At `POST /api/public/bookings`, the backend must:

1. Resolve and validate the booking context as it does today.
2. If `booking_attribution_token` is present, resolve it server-side.
3. Reject it with `409` and `booking_attribution_context_stylist_mismatch` if its bound stylist/account does not match the resolved booking context.
4. Reject it with `410` and `booking_attribution_context_unavailable` if it is expired, revoked, invalid, or already consumed.
5. In the **same database transaction** that creates the appointment, persist the resolved attribution facts on the booking (at minimum `campaign_link_id`, `campaign_id`, and, where applicable, `recipient_id`) and mark the attribution token/hand-off consumed with the new booking ID.
6. Commit once. A successful booking response must mean the booking and campaign attribution were both persisted; do not enqueue attribution as a best-effort post-commit job.

The backend must derive all credit from the token lookup. Never accept a campaign ID, link ID, client ID, recipient ID, or stylist ID supplied by the browser as attribution evidence.

## Pseudocode

```ts
async function openCampaignLink(code: string) {
  const link = await resolveActiveCampaignLink(code); // campaign, recipient, stylist, slug
  if (!link) return notFoundOrGone();

  const handoff = await issueHandoff({
    campaignLinkId: link.id,
    campaignId: link.campaignId,
    recipientId: link.recipientId,
    stylistId: link.stylistId,
    stylistSlug: link.stylistSlug,
    expiresAt: nowPlusMinutes(15),
  });

  return redirect303(
    `https://www.rootfoil.app/book/${encodeURIComponent(link.stylistSlug)}` +
    `?booking_attribution_handoff_token=${encodeURIComponent(handoff.plaintextToken)}`,
    { cacheControl: "private, no-store", referrerPolicy: "no-referrer" },
  );
}

async function createBooking(request: CreateBookingRequest) {
  return database.transaction(async (tx) => {
    const context = await resolveBookingContext(tx, request.booking_context_token);
    const attribution = request.booking_attribution_token
      ? await resolveUsableAttribution(tx, request.booking_attribution_token)
      : null;

    if (attribution && attribution.stylistId !== context.stylistId) {
      throw apiError(409, "booking_attribution_context_stylist_mismatch");
    }

    const booking = await insertBooking(tx, context, request, attribution);
    if (attribution) {
      await consumeAttribution(tx, attribution.id, booking.id); // conditional, one row only
    }
    return booking;
  });
}
```

Use conditional updates/unique constraints so two concurrent submissions cannot consume one attribution token twice.

## Verification plan

### Production smoke test

Use a new internal test campaign after deployment. Do not reuse the example URL above if campaign links are single-use or expire.

1. Open the campaign CTA with Chrome DevTools Network and **Preserve log** enabled.
2. Verify `GET /api/public/campaign-links/{code}` returns `302` or `303`, not `200`.
3. Verify the `Location` header contains `/book/{slug}?booking_attribution_handoff_token=...`.
4. Verify `POST /api/public/booking-attribution-contexts/capture` returns `200` and a token plus expiry.
5. Complete a valid booking.
6. Verify `POST /api/public/bookings` sends `booking_attribution_token`.
7. Verify the appointment row and campaign-management reporting both show the resolved campaign/link credit.
8. Verify the same attribution token cannot credit a second booking.

### Automated tests required

- Valid campaign code redirects to the resolved stylist booking URL with a handoff.
- Unknown, expired, revoked, and ineligible campaign codes do not redirect to booking.
- Redirect destination cannot be controlled through request input.
- Two concurrent capture attempts result in at most one usable booking attribution token/handoff claim.
- Capture fails after expiry and after revocation.
- Booking creation persists appointment and campaign attribution in one transaction.
- Booking creation rejects an attribution token tied to a different stylist.
- Booking creation rejects a previously consumed attribution token.
- A normal booking without an attribution token still succeeds and has no campaign credit.
- Logs and error responses never contain the example code, handoff token, booking attribution token, recipient information, or campaign IDs.

## Deployment checklist

1. Deploy the backend redirect and capture/create persistence changes.
2. Confirm production `API_BASE_URL` for the web application points to that backend, not to the web application itself.
3. Send a fresh internal campaign and run the smoke test above.
4. Confirm email-provider click tracking preserves the redirect and query string.
5. Enable campaign sending only after the campaign-management screen reflects a completed test booking.
6. Monitor redirect rate, capture success rate, attributed booking count, and capture/create error codes separately.

## Ownership and current blocker

The web repository contains the booking-page capture and submission behavior but does not contain the campaign-link backend implementation, email sender/template source, or backend database schema. The backend team must implement or repair `GET /api/public/campaign-links/{code}` and the durable attribution persistence described here.
