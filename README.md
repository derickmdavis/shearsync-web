# ShearSync Booking Web

Public booking flow for ShearSync stylist booking links. The app is a Next.js
App Router project that renders stylist-specific booking pages and proxies
browser API calls to the booking service.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3001/book/[slug]` with a stylist slug from the API.
The root route at `http://localhost:3001` only shows a small project placeholder.

## Environment

Configure the booking API base URL and Supabase Auth client:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Use public/frontend-safe Supabase values only. Never expose
`SUPABASE_SERVICE_ROLE_KEY` in this app. Authenticated account requests are sent
directly to the API with `Authorization: Bearer <supabase_access_token>`.
Browser public booking requests prefer the local Next route proxy under
`/api/public/*`, which forwards to the same API base URL.

## Scripts

```bash
npm run dev
npm run lint
npm test
npm run build
npm run start
```

`dev` and `start` run on port `3001`.

## Project Shape

- `src/app/book/[slug]/page.tsx` loads the public stylist profile and renders
  the booking flow.
- `src/app/api/public/[...path]/route.ts` proxies public booking API calls.
- `src/components/booking/BookingFlow.tsx` coordinates the booking experience.
- `src/lib/api.ts` contains public API client helpers and response types.
- `src/lib/booking-format.ts` contains formatting and booking utility helpers.

## Verification

Run these before shipping booking-flow changes:

```bash
npm run lint
npm test
npm run build
```
