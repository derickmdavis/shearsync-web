export const ACCOUNT_LIFECYCLE_EVENT = "rootfoil:account-lifecycle";

export type AccountLifecycleCode =
  | "account_inactive"
  | "account_deletion_pending";

export function notifyAccountLifecycle(code: AccountLifecycleCode) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<AccountLifecycleCode>(ACCOUNT_LIFECYCLE_EVENT, {
    detail: code,
  }));
}

export function lifecycleCodeFromApiError(
  code: string | undefined,
  details: unknown,
): AccountLifecycleCode | null {
  if (code === "account_inactive" || code === "account_deletion_pending") return code;
  if (!details || typeof details !== "object") return null;
  const detailCode = (details as { code?: unknown }).code;
  return detailCode === "account_inactive" || detailCode === "account_deletion_pending"
    ? detailCode
    : null;
}
