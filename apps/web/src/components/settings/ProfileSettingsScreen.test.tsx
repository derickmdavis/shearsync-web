import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({ getAccountProfile: vi.fn(), updateAccountProfile: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/src/lib/api")>()), ...api }));
vi.mock("@/src/lib/auth/active-account", () => auth);
vi.mock("@/src/components/workspace/WorkspaceShell", () => ({
  WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
  PageHeading: ({ title }: { title: string }) => <h1>{title}</h1>,
  workspaceStyles: { businessSettings: "", servicesMessage: "", clientsStatus: "", settingsForm: "", secondaryButton: "", serviceToggle: "", primaryButton: "" },
}));

import { ProfileSettingsScreen } from "./ProfileSettingsScreen";

const profile = {
  id: "profile-1", email: "stylist@example.com", full_name: "Maya", phone_number: "+13035551212", business_name: "Maya Hair", timezone: "America/Denver", avatar_image_id: null,
  location: { name: "The Studio", address_line_1: "123 Main", address_line_2: null, city: "Denver", region: "CO", postal_code: "80202", country_code: "US" },
  waitlist_enabled: false, client_formulas_tab_enabled: true, created_at: "2026-01-01", updated_at: "2026-01-01",
};

describe("ProfileSettingsScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
    api.getAccountProfile.mockResolvedValue(profile);
    api.updateAccountProfile.mockImplementation((_token: string, patch: object) => Promise.resolve({ ...profile, ...patch, location: "location" in patch ? (patch as { location: typeof profile.location | null }).location : profile.location }));
  });

  it("confirms a structured location clear and sends only the null location patch", async () => {
    render(<ProfileSettingsScreen />);
    await screen.findByDisplayValue("123 Main");
    fireEvent.click(screen.getByRole("button", { name: "Clear business location" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirm clear location" }));
    fireEvent.click(screen.getByRole("button", { name: "Save profile" }));

    await waitFor(() => expect(api.updateAccountProfile).toHaveBeenCalledWith("token-1", { location: null }));
    expect(api.updateAccountProfile.mock.calls[0]?.[1]).not.toHaveProperty("location_label");
  });
});
