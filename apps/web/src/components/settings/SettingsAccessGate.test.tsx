import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({
  getAccountAccess: vi.fn(),
  getAccountDeletionStatus: vi.fn(),
}));
const auth = vi.hoisted(() => ({
  getSession: vi.fn(),
}));
const navigation = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock("@/src/lib/api", () => api);
vi.mock("@/src/lib/supabase", () => ({
  getSupabaseBrowserClient: () => ({ auth }),
}));
vi.mock("next/navigation", () => ({
  usePathname: () => "/settings/profile",
  useRouter: () => navigation,
}));

import { SettingsAccessGate } from "./SettingsAccessGate";

const activeAccess = { isActive: true, status: "active" };
const noDeletion = { status: "none" };

describe("SettingsAccessGate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.getSession.mockResolvedValue({ data: { session: { access_token: "token" } }, error: null });
    api.getAccountAccess.mockResolvedValue(activeAccess);
    api.getAccountDeletionStatus.mockResolvedValue(noDeletion);
  });

  it("does not render protected children while a deletion is pending", async () => {
    api.getAccountDeletionStatus.mockResolvedValue({ status: "pending" });
    render(<SettingsAccessGate><p>Protected draft</p></SettingsAccessGate>);

    expect(await screen.findByText("Account deletion is in progress")).not.toBeNull();
    expect(screen.queryByText("Protected draft")).toBeNull();
  });

  it("routes inactive accounts to renewal without rendering children", async () => {
    api.getAccountAccess.mockResolvedValue({ isActive: false, status: "inactive" });
    render(<SettingsAccessGate><p>Protected draft</p></SettingsAccessGate>);

    await waitFor(() => expect(navigation.replace).toHaveBeenCalledWith("/billing?from=settings"));
    expect(screen.queryByText("Protected draft")).toBeNull();
  });
});
