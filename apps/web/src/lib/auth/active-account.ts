import { ApiError, getAccountAccess, getAccountDeletionStatus, type AccountAccess, type AccountDeletionStatus } from "@/src/lib/api";
import { getSupabaseBrowserClient } from "@/src/lib/supabase";

export class AccountLifecycleError extends Error {
  readonly access: AccountAccess;
  readonly deletion: AccountDeletionStatus | null;

  constructor(access: AccountAccess, deletion: AccountDeletionStatus | null = null) {
    super(deletion ? "This account is being deleted." : "This account is not active.");
    this.name = "AccountLifecycleError";
    this.access = access;
    this.deletion = deletion;
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

function assertActiveAccount(access: AccountAccess, deletion: AccountDeletionStatus) {
  if (["pending", "processing", "failed_retryable"].includes(deletion.status)) {
    throw new AccountLifecycleError(access, deletion);
  }
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
    const [access, deletion] = await Promise.all([
      getAccountAccess(accessToken),
      getAccountDeletionStatus(accessToken),
    ]);
    assertActiveAccount(access, deletion);
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
