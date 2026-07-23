const LOCAL_WEB_APP_ORIGIN = "http://localhost:3001";
const LOCAL_MARKETING_ORIGIN = "http://localhost:3000";
const LOCAL_BACKEND_API_ORIGIN = "http://localhost:3000";
const PRODUCTION_WEB_APP_ORIGIN = "https://rootfoil.app";
const PRODUCTION_MARKETING_ORIGIN = "https://rootfoil.com";

function getDefaultOrigin(localOrigin: string, productionOrigin: string) {
  return process.env.NODE_ENV === "production"
    ? productionOrigin
    : localOrigin;
}

function getAbsoluteOrigin(
  name: string,
  value: string | undefined,
  fallback: string,
) {
  const candidate = value?.trim() || fallback;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }

    return url.origin;
  } catch {
    throw new Error(`${name} must be a valid absolute HTTP(S) URL.`);
  }
}

function joinOriginAndPath(origin: string, path = "/") {
  return new URL(path.startsWith("/") ? path : `/${path}`, `${origin}/`).toString();
}

export function getWebAppOrigin() {
  return getAbsoluteOrigin(
    "NEXT_PUBLIC_WEB_APP_URL",
    process.env.NEXT_PUBLIC_WEB_APP_URL,
    getDefaultOrigin(LOCAL_WEB_APP_ORIGIN, PRODUCTION_WEB_APP_ORIGIN),
  );
}

export function getMarketingOrigin() {
  return getAbsoluteOrigin(
    "NEXT_PUBLIC_MARKETING_URL",
    process.env.NEXT_PUBLIC_MARKETING_URL,
    getDefaultOrigin(LOCAL_MARKETING_ORIGIN, PRODUCTION_MARKETING_ORIGIN),
  );
}

export function getBrowserApiOrigin() {
  return getAbsoluteOrigin(
    "NEXT_PUBLIC_API_BASE_URL",
    process.env.NEXT_PUBLIC_API_BASE_URL,
    LOCAL_BACKEND_API_ORIGIN,
  );
}

export function getSupabaseBrowserConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
  } catch {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must be a valid absolute HTTP(S) URL.");
  }

  return { url, anonKey };
}

export function getWebAppUrl(path = "/") {
  return joinOriginAndPath(getWebAppOrigin(), path);
}

export function getAuthRecoveryUrl(nextPath: string) {
  const params = new URLSearchParams({ mode: "update-password" });
  if (nextPath) {
    params.set("next", nextPath);
  }

  return getWebAppUrl(`/login?${params.toString()}`);
}
