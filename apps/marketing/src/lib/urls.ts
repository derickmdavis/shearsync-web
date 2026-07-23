const LOCAL_MARKETING_ORIGIN = "http://localhost:3000";
const LOCAL_WEB_APP_ORIGIN = "http://localhost:3001";
const PRODUCTION_MARKETING_ORIGIN = "https://rootfoil.com";
const PRODUCTION_WEB_APP_ORIGIN = "https://rootfoil.app";

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

export function getMarketingOrigin() {
  return getAbsoluteOrigin(
    "NEXT_PUBLIC_MARKETING_URL",
    process.env.NEXT_PUBLIC_MARKETING_URL,
    getDefaultOrigin(LOCAL_MARKETING_ORIGIN, PRODUCTION_MARKETING_ORIGIN),
  );
}

export function getWebAppOrigin() {
  return getAbsoluteOrigin(
    "NEXT_PUBLIC_WEB_APP_URL",
    process.env.NEXT_PUBLIC_WEB_APP_URL,
    getDefaultOrigin(LOCAL_WEB_APP_ORIGIN, PRODUCTION_WEB_APP_ORIGIN),
  );
}

export function getWebAppUrl(path = "/") {
  return joinOriginAndPath(getWebAppOrigin(), path);
}
