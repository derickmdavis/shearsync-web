import { describe, expect, it, vi } from "vitest";
import {
  ACCOUNT_LIFECYCLE_EVENT,
  lifecycleCodeFromApiError,
  notifyAccountLifecycle,
} from "./account-lifecycle-events";

describe("account lifecycle events", () => {
  it("recognizes lifecycle codes returned in either the error or details", () => {
    expect(lifecycleCodeFromApiError("account_inactive", undefined)).toBe("account_inactive");
    expect(lifecycleCodeFromApiError(undefined, { code: "account_deletion_pending" })).toBe("account_deletion_pending");
    expect(lifecycleCodeFromApiError("not_allowed", { code: "other" })).toBeNull();
  });

  it("notifies the active browser shell", () => {
    const listener = vi.fn();
    window.addEventListener(ACCOUNT_LIFECYCLE_EVENT, listener);
    notifyAccountLifecycle("account_deletion_pending");
    expect(listener).toHaveBeenCalledOnce();
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail).toBe("account_deletion_pending");
    window.removeEventListener(ACCOUNT_LIFECYCLE_EVENT, listener);
  });
});
