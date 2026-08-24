import type { Session } from "@supabase/supabase-js";

const PASSWORD_RECOVERY_STORAGE_KEY = "rootfoil.password-recovery";

type PasswordRecoveryAuthClient = {
  auth: {
    exchangeCodeForSession: (code: string) => Promise<{
      data: { session: Session | null };
      error: Error | null;
    }>;
    setSession: (tokens: {
      access_token: string;
      refresh_token: string;
    }) => Promise<{
      data: { session: Session | null };
      error: Error | null;
    }>;
  };
};

function getRecoveryTokens(url: URL) {
  const params = new URLSearchParams(url.hash.slice(1));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  return accessToken && refreshToken
    ? { accessToken, refreshToken }
    : null;
}

export function isPasswordRecoveryCallback(url: string) {
  const parsed = new URL(url);
  return Boolean(parsed.searchParams.get("code") || getRecoveryTokens(parsed));
}

export async function consumePasswordRecoveryCallback(
  client: PasswordRecoveryAuthClient,
  url: string,
) {
  const parsed = new URL(url);
  const code = parsed.searchParams.get("code");
  let result;

  if (code) {
    result = await client.auth.exchangeCodeForSession(code);
  } else {
    const tokens = getRecoveryTokens(parsed);
    if (!tokens) {
      throw new Error("Invalid or expired password recovery link.");
    }

    result = await client.auth.setSession({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });
  }

  if (result.error || !result.data.session) {
    throw result.error ?? new Error("Invalid or expired password recovery link.");
  }

  return result.data.session;
}

export function setPasswordRecoveryInProgress() {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(PASSWORD_RECOVERY_STORAGE_KEY, "true");
  }
}

export function isPasswordRecoveryInProgress() {
  return (
    typeof window !== "undefined" &&
    window.sessionStorage.getItem(PASSWORD_RECOVERY_STORAGE_KEY) === "true"
  );
}

export function clearPasswordRecoveryInProgress() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(PASSWORD_RECOVERY_STORAGE_KEY);
  }
}
