import { ApiError, getAccountAccess, type AccountAccess } from "@/src/lib/api";
import { getSupabaseBrowserClient } from "@/src/lib/supabase";

export class AccountLifecycleError extends Error {
  readonly access: AccountAccess;

  constructor(access: AccountAccess) {
    super("This account is not active.");
    this.name = "AccountLifecycleError";
    this.access = access;
  }
}

async function getAccessToken() {
  const { data } = await getSupabaseBrowserClient().auth.getSession();
  const accessToken = data.session?.access_token;
  const accountId = data.session?.user.id;

  if (!accessToken || !accountId) {
    throw new ApiError("You need to sign in to continue.", 401);
  }

  return { accessToken, accountId };
}

function assertActiveAccount(access: AccountAccess) {
  if (!access.isActive || access.status !== "active") {
    throw new AccountLifecycleError(access);
  }
}

/**
 * Runs an authenticated product request only after the API confirms the
 * account is active. A 401 refreshes the Supabase session once and reruns the
 * exact callback, allowing callers to preserve their request body/query.
 */
export async function withActiveAccount<T>(
  request: (
    accessToken: string,
    access: AccountAccess,
    accountId: string,
  ) => Promise<T>,
) {
  async function attempt(accessToken: string, accountId: string) {
    const access = await getAccountAccess(accessToken);
    assertActiveAccount(access);
    return request(accessToken, access, accountId);
  }

  const { accessToken, accountId } = await getAccessToken();

  try {
    return await attempt(accessToken, accountId);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error;
    }
  }

  const { data, error } = await getSupabaseBrowserClient().auth.refreshSession();
  const refreshedToken = data.session?.access_token;

  if (error || !refreshedToken) {
    throw new ApiError("Your session has expired. Please sign in again.", 401);
  }

  return attempt(refreshedToken, accountId);
}
