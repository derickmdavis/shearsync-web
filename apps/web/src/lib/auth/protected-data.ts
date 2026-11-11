/**
 * Signals in-memory Settings resources to discard account-scoped data before
 * a lifecycle transition. Settings currently keep drafts in component state,
 * so unmounting the protected shell clears them; the event also gives future
 * caches one central invalidation point.
 */
export const PROTECTED_ACCOUNT_DATA_CLEARED_EVENT = "rootfoil:protected-account-data-cleared";

export function clearProtectedAccountData() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PROTECTED_ACCOUNT_DATA_CLEARED_EVENT));
}
