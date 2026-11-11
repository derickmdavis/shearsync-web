import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({
  getRebookNudgeSettings: vi.fn(), getThankYouEmailSettings: vi.fn(), getBirthdayReminderSettings: vi.fn(),
  updateRebookNudgeSettings: vi.fn(), updateThankYouEmailSettings: vi.fn(), updateBirthdayReminderSettings: vi.fn(),
  previewRebookNudgeSettings: vi.fn(), previewThankYouEmailSettings: vi.fn(),
}));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/src/lib/api")>()), ...api }));
vi.mock("@/src/lib/auth/active-account", () => auth);
vi.mock("@/src/components/workspace/WorkspaceShell", () => ({
  WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
  PageHeading: ({ title }: { title: string }) => <h1>{title}</h1>,
  workspaceStyles: new Proxy({}, { get: () => "" }),
}));

import { EmailAutomationSettingsScreen } from "./AutomationSpecificSettingsScreen";

const rebook = {
  approvalRequired: true, defaultRebookIntervalDays: 42, subjectTemplate: "Time for {{client_name}}", greeting: "Hello", customMessageBlock: null,
  configured: true, availableTokens: ["client_name", "business_name"],
};

describe("EmailAutomationSettingsScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
    api.getRebookNudgeSettings.mockResolvedValue(rebook);
    api.previewRebookNudgeSettings.mockResolvedValue({ subject: "Preview", text: "Text preview", html: "<p>Preview</p>" });
    api.updateRebookNudgeSettings.mockImplementation((_token: string, patch: object) => Promise.resolve({ ...rebook, ...patch }));
  });

  it("previews an unsaved draft and saves only changed rebook fields", async () => {
    render(<EmailAutomationSettingsScreen kind="rebook" />);
    const greeting = await screen.findByLabelText("Greeting");
    fireEvent.change(greeting, { target: { value: "Welcome back" } });
    fireEvent.click(screen.getByRole("button", { name: "Preview email" }));
    await waitFor(() => expect(api.previewRebookNudgeSettings).toHaveBeenCalledWith("token-1", {
      subjectTemplate: "Time for {{client_name}}", greeting: "Welcome back", customMessageBlock: null,
    }));
    expect(api.updateRebookNudgeSettings).not.toHaveBeenCalled();
    expect(await screen.findByText("Text preview")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Save settings" }));
    await waitFor(() => expect(api.updateRebookNudgeSettings).toHaveBeenCalledWith("token-1", { greeting: "Welcome back" }));
  });
});
