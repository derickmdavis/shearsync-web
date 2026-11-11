# Referral sharing handoff

## Discovery and implementation in this repository

- Web app: Next.js App Router in `apps/web`; public routes use `src/app`, and the only proxy is `src/proxy.ts` (it only applies to `/book/:slug`).
- Existing durable referral resolution is `GET /api/public/referrals/{code}`, consumed by `src/lib/api.ts` and the public redirect page at `src/app/r/[referralCode]/page.tsx`.
- The redirect preserves attribution by sending the visitor to `/book/{stylistSlug}?ref={referralCode}`. Booking submission continues to send this code from `BookingFlow.tsx`.
- This change adds `/share/{code}` and a same-origin, read-only adapter at `GET /api/public/referral-shares/{code}`. The adapter calls the existing referral resolver and public stylist resolver, then strips all internal resolver fields before responding.
- The page never creates a short code or reconstructs a booking URL. It shares/copies `referralUrl` returned by the existing resolver.

## Current web contract

`GET /api/public/referral-shares/{code}` returns `200`:

```json
{
  "data": {
    "stylist": { "displayName": "Olivia", "businessName": "Olivia Hair Studio" },
    "referralUrl": "https://www.rootfoil.app/r/rf_client123",
    "share": {
      "title": "Book with Olivia",
      "text": "I love getting my hair done by Olivia! Here’s their booking link:"
    }
  }
}
```

The current repository's canonical direct referral URL format is `/r/{code}`, not `go.rootfoil.app/{code}`. It redirects to the attribution-preserving booking route. `404` and `410` are returned as unavailable, `429` is preserved, and unexpected/network failures return `502`. Responses are `private, no-store`.

`/share/{code}` is a public route; it has loading, unavailable, retryable failure, Web Share, clipboard, and manual-copy states. It returns no client/referrer identity, campaign-recipient data, or referral-link IDs to the browser. The Web Share payload uses separate `text` and `url` fields, so the URL is present once.

The booking page now emits server-rendered Open Graph metadata using its public stylist profile. Messaging crawlers must follow the existing `/r/{code}` redirect to reach it; validate that behavior in production.

## Backend and email work still required

This workspace contains neither the backend source nor email templates/sender configuration. Before the email CTA is enabled:

1. Confirm `GET /api/public/referrals/{code}` applies the existing regular/campaign eligibility and attribution rules without creating a visit, consuming a handoff, or exposing private data.
   At `POST /api/public/bookings`, treat `stylist_slug` and `referral_code` as
   untrusted, independently supplied input. Resolve the code server-side and
   reject it unless its referral-link stylist exactly matches the requested
   stylist. Derive the credited client/referrer and campaign solely from that
   resolved referral record; never accept a client, referrer, campaign, or
   referral-link ID from the browser. Persist the resolved referral-link ID
   and its campaign/referrer relationship atomically with appointment creation
   so a later lookup cannot silently re-pair the booking.
2. Prefer moving the adapter's minimal contract into the backend as `GET /api/public/referral-shares/{code}`. Keep `referralUrl` canonical, validate its configured origin server-side, and return only public presentation fields. The web adapter can then be retired or changed to a simple proxy.
3. Update only automated referral and referral-campaign templates: CTA **Share your link** → `https://www.rootfoil.app/share/{code}`; show the direct canonical `referralUrl` below it. Plain text must label both URLs. Preserve provider tracking/unsubscribe/custom copy and ensure copying the fallback is not a tracking wrapper.
4. Deploy in order: backend resolver/metadata readiness, this web release, production smoke test with an internal valid code, then email CTA activation. Rollback email CTA to the direct referral link while retaining `/share/{code}` for already-sent mail.

No device/email-client verification was possible in this repository. In particular, verify iPhone Safari, Android Chrome, Apple Mail/Gmail/Outlook embedded browsers, cancellation, clipboard denial, crawler preview fetches, and regular plus campaign attribution end-to-end.
