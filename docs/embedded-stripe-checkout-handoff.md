# Embedded Stripe Checkout handoff

## Goal

Keep a signed-in Root & Foil user in the Billing screen while they enter payment details for a new subscription. Stripe must continue to own payment collection, authentication, and recurring billing; Root & Foil must continue to treat the verified Stripe webhook as the authority for access.

This changes **new-subscription Checkout only**. The Stripe Customer Portal remains a hosted Stripe page for payment-method updates, invoices, cancellation, and permitted plan changes.

## Current baseline

Today the web app sends this authenticated request:

```http
POST /api/billing/checkout
Authorization: Bearer <Supabase access token>
Content-Type: application/json

{ "interval": "month" }
```

The API creates a Stripe Checkout Session in redirect mode and returns a Stripe-hosted `url`. The web app calls `window.location.assign(url)`.

The relevant code is:

| Responsibility | Current location |
| --- | --- |
| Web billing screen | `shearsync-booking-web/apps/web/src/components/billing/BillingScreen.tsx` |
| Web API proxy | `shearsync-booking-web/apps/web/src/app/api/billing/[...path]/route.ts` |
| Web typed API client | `shearsync-booking-web/apps/web/src/lib/api.ts` |
| API Checkout creation | `shearsync-api/src/services/stripeBillingService.ts` |
| API Checkout controller | `shearsync-api/src/controllers/billingController.ts` |

## Target flow

```text
Signed-in user selects Monthly or Annual
            |
            v
Web POSTs interval + bearer token to API
            |
            v
API verifies account, prevents duplicate subscription,
creates Stripe Checkout Session with ui_mode=embedded
            |
            v
API returns only session client_secret (+ optional session ID)
            |
            v
Web mounts Stripe Embedded Checkout in the Billing page
            |
            v
Stripe collects and confirms payment
            |
            v
Stripe webhook -> API normalizes subscription -> projects entitlement
            |
            v
Web opens /billing/success or refreshes Billing summary until API says active
```

Do **not** mark the account paid merely because the embedded component reports completion. Completion is a useful UI signal only; `GET /api/account/access` and `GET /api/billing/summary`, after webhook processing, remain the source of truth.

---

## API repository: required work

Repository: `shearsync-api`

### 1. Change Checkout Session creation to Embedded Checkout

Update `stripeBillingService.createCheckoutSession` to create the existing subscription Checkout Session in embedded mode.

Keep all existing safety behavior:

- Authenticate from the bearer token server-side; never accept a browser-supplied user ID.
- Keep the active-local-subscription guard and its `409 billing_subscription_exists` response.
- Continue to select Stripe Prices solely from `STRIPE_MONTHLY_PRICE_ID` and `STRIPE_ANNUAL_PRICE_ID`.
- Keep the existing Stripe Customer reuse/creation logic and the `rootfoil_user_id` metadata.
- Keep the Stripe webhook and entitlement-projection pipeline unchanged.
- Do not return customer IDs, Price IDs, subscription IDs, or the Stripe secret key.

The Checkout Session needs the Stripe embedded UI mode, subscription mode, the selected server-side Price, customer, metadata, and a Root & Foil return URL. Embedded Checkout uses a `return_url`; do not continue to rely on redirect-mode-only `success_url`/`cancel_url` behavior. Use the existing `WEB_APP_URL` resolver to form a return URL such as:

```text
https://www.rootfoil.app/billing/success?session_id={CHECKOUT_SESSION_ID}
```

The API must return the session’s **client secret**, not its redirect URL.

### 2. Revise the API contract

Keep the request exactly as-is:

```json
{ "interval": "month" }
```

Replace the successful response with:

```json
{
  "data": {
    "clientSecret": "<short-lived Checkout Session client secret>",
    "sessionId": "cs_..."
  }
}
```

`clientSecret` is intentionally usable by the browser for this one Checkout Session. It is not an API credential, Customer ID, or durable value. Do not persist it in the database, local storage, logs, analytics, or the URL.

The existing error contract remains:

| Response | Required web behavior |
| --- | --- |
| `401` | Existing session refresh/sign-in handling |
| `409`, `billing_subscription_exists` | Refresh summary, hide purchase options, offer Manage billing |
| `503` | Show a retry-safe billing-unavailable message |
| Other `4xx`/`5xx` | Generic retry-safe error; do not leak Stripe details |

### 3. Keep Portal behavior separate

`POST /api/billing/portal` remains redirect-based. It returns a short-lived Stripe Customer Portal URL and needs no embedded-Checkout change.

The Stripe Dashboard Customer Portal configuration controls cancellation, payment-method management, invoice history, and whether monthly/annual switching is allowed. The API should not create a second subscription for an existing subscriber.

### 4. Environment and Stripe Dashboard prerequisites

Production API service variables:

```dotenv
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_ANNUAL_PRICE_ID=price_...
WEB_APP_URL=https://www.rootfoil.app
```

Test mode uses matching `sk_test_...` and test Price IDs. Never mix test and live keys/prices.

Ensure both Stripe Prices are represented in the backend billing-price records/migrations. The webhook maps Stripe’s Price to the normalized plan and interval shown in Root & Foil’s billing summary.

Continue delivering these Stripe events to the API webhook:

- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

### 5. API tests

Add or update tests that verify:

- Valid month and year requests create `mode: "subscription"` sessions in embedded UI mode.
- The selected request interval maps only to the configured server-side Stripe Price.
- The return URL is rooted at configured `WEB_APP_URL`.
- A successful response exposes `clientSecret` and `sessionId`, not `url` or provider IDs.
- An active local subscription returns the existing `409 billing_subscription_exists` response.
- Missing Stripe key/Price/return URL produces the expected safe error.
- Webhook updates still normalize the subscription and project entitlement correctly.

---

## Web repository: required work

Repository: `shearsync-booking-web`

### 1. Add the public Stripe browser key

Add this deployment variable to the web app only:

```dotenv
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

Use a `pk_test_...` value in test deployments. A Stripe publishable key is designed for browser use. Do not put `STRIPE_SECRET_KEY`, webhook secrets, Price IDs, customer IDs, or subscription IDs in this repository’s browser environment.

Validate the variable in the existing public configuration layer. Provide a clear unavailable state if it is not configured; do not attempt Checkout without it.

### 2. Add Stripe.js and mount Embedded Checkout

Add Stripe’s browser libraries (`@stripe/stripe-js` and `@stripe/react-stripe-js`) to the web workspace. Load Stripe with the publishable key once, outside React rendering.

Replace the current redirect portion of `startCheckout` in `BillingScreen.tsx`:

```ts
const checkout = await createBillingCheckout(token, interval);
window.location.assign(checkout.url);
```

with this behavior:

1. Disable both plan buttons and request the new API response.
2. Store the returned `clientSecret` in React state only.
3. Render `EmbeddedCheckoutProvider` and `EmbeddedCheckout` using that client secret.
4. Keep the selected plan visible and offer a clear, non-destructive “Back to plans” control before payment completion.
5. Do not write the client secret to local storage, session storage, URL parameters, logs, or error tracking.

An inline panel is recommended for this product: after a plan click, replace the plan-selection area with a titled Checkout panel while retaining the access explanation above it. A modal is also acceptable, but must be keyboard accessible and have an intentional close/back behavior.

### 3. Completion and return handling

On Stripe Embedded Checkout completion:

- Navigate to `/billing/success`, or invoke the same confirmation state used by that route.
- Continue the existing 3-second polling for up to 30 seconds.
- Confirm success only when `access.mode === "full"` and billing summary contains an active/trialing/canceling subscription.
- On timeout, retain “Refresh status” and the link back to `/billing`.

The browser must never grant access solely because Stripe reports completion or because a `session_id` appears in the URL.

### 4. Preserve the billing states

The existing UI behavior remains required:

- Loading both access and billing summary in parallel.
- Trial/promotional full access: show purchase options.
- Active subscriber: show plan, interval, paid-through/renewal date, cancellation state, and Manage billing; hide purchase choices.
- Read-only: prominent recovery copy and plan options.
- Blocked/deletion/suspension: no purchase path.
- `409`: reload summary and route the user toward Manage billing.
- `503`: safe temporary-unavailability copy and retry.
- Portal session: keep the current hosted redirect behavior.

### 5. Browser security / deployment checks

If Root & Foil enforces a Content Security Policy, allow Stripe for the embedded component:

```text
script-src https://js.stripe.com
frame-src https://js.stripe.com
```

Use Stripe’s official React integration rather than manually constructing iframes or collecting card fields yourself.

### 6. Web tests

Add component/API tests for:

- API client parses `clientSecret`/`sessionId` and no longer expects `url`.
- Clicking Monthly or Annual mounts checkout with the correct short-lived secret.
- Both plan buttons are disabled while a Checkout Session is being created.
- A `409` refreshes billing state and does not render a second purchase path.
- Completion does not independently set entitlement; only refreshed API data does.
- Missing publishable key and API errors render safe, actionable UI.
- The client secret is absent from rendered URLs and persisted browser storage.

---

## Stripe Dashboard decisions

These are product decisions, not frontend code:

1. Create Monthly and Annual recurring Prices under the same Root & Foil Product.
2. In the Customer Portal, decide whether users can:
   - update payment methods,
   - view invoices,
   - cancel,
   - switch monthly and annual plans.
3. If plan switching is enabled, decide whether it is immediate/prorated or starts at the next renewal. For Root & Foil, the recommended policy is **monthly → annual at the next monthly renewal**, avoiding an unexpected immediate $250 charge.
4. Configure Stripe branding, support information, and receipt/customer emails.

## End-to-end acceptance checklist

Use Stripe test mode before production:

1. Sign in as a billing test account with no active subscription.
2. Open `/billing`; monthly and annual plan choices appear.
3. Select Monthly; embedded Checkout appears without leaving `www.rootfoil.app`.
4. Complete payment with `4242 4242 4242 4242`, any future expiration, and any CVC.
5. Verify the webhook reaches the API and the return/confirmation view waits for the normalized subscription.
6. Verify `/billing` then shows the correct plan, interval, paid-through/renewal date, and Manage billing.
7. Verify a second purchase attempt is blocked and instead points to Manage billing.
8. Open Manage billing; verify payment method, invoice, cancellation, and configured plan-switch options.
9. Cancel in the portal; verify the UI says the subscription cancels at the end of the current period and retains access through that date.
10. Repeat with Annual and test a configured monthly/annual transition.
11. Repeat in live mode only after test mode passes, with live keys and live Prices.

## Reference

- [Stripe Embedded Checkout and Checkout UI options](https://docs.stripe.com/payments/checkout)
- [Stripe Customer Portal configuration](https://docs.stripe.com/customer-management/configure-portal)
- [Stripe Pricing Table limitations](https://docs.stripe.com/payments/checkout/pricing-table)
