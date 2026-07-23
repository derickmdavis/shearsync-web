# Root & Foil web monorepo

This repository contains two independently deployable Next.js App Router applications. The backend API remains separately deployed and is not part of this repository.

```text
apps/
  marketing/  # rootfoil.com: marketing pages and early-access waitlist
  web/        # rootfoil.app: authentication, account, booking, referrals, and appointment management
```

`apps/ops` is intentionally not created yet. No shared packages are used in this first split; the small shared visual baseline is intentionally duplicated in each app's `globals.css` and brand marks are duplicated in each app's `public/assets/brand` directory.

## Local development

Install workspace dependencies once from the repository root:

```bash
npm install
```

Start the applications independently:

```bash
npm run dev:marketing # http://localhost:3000
npm run dev:web       # http://localhost:3001
```

The prior application used `http://localhost:3000` as its backend fallback. Marketing now uses that port, so configure the backend on a conflict-free local URL such as `http://localhost:3002` in each app's local environment file.

Copy the app-local examples before development:

```bash
cp apps/marketing/.env.example apps/marketing/.env.local
cp apps/web/.env.example apps/web/.env.local
```

Do not put Supabase service-role credentials in either frontend application. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are browser-safe Supabase values used only by the customer web app.

## Commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

App-specific forms are available as `lint:marketing`, `lint:web`, `typecheck:marketing`, `typecheck:web`, `test:marketing`, `test:web`, `build:marketing`, and `build:web`.

## Deployment shape

Create two Vercel projects from this repository later:

| Application | Vercel root directory | Production domain |
| --- | --- | --- |
| Marketing | `apps/marketing` | `rootfoil.com` |
| Customer web | `apps/web` | `rootfoil.app` |

The marketing project requires `NEXT_PUBLIC_MARKETING_URL`, `NEXT_PUBLIC_WEB_APP_URL`, and server-only `API_BASE_URL` for its waitlist proxy. The customer web project requires those public origins plus `NEXT_PUBLIC_API_BASE_URL`, server-only `API_BASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Production values should use `https://rootfoil.com`, `https://rootfoil.app`, and the separately deployed API origin (planned as `https://api.rootfoil.app`). The backend must later allow direct authenticated browser requests from `https://rootfoil.app`. Supabase allowed redirect URLs must include the customer web production and approved preview origins. Legacy-domain redirects are a separate deployment task.
