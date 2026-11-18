import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({
  getAutomationBootstrap: vi.fn(), getEmailTemplate: vi.fn(), previewSimpleEmailTemplate: vi.fn(), updateSimpleEmailTemplate: vi.fn(), updateEmailTemplateMode: vi.fn(),
  getThankYouEmailSettings: vi.fn(), getBirthdayReminderSettings: vi.fn(), updateThankYouEmailSettings: vi.fn(), updateBirthdayReminderSettings: vi.fn(), updateAutomationChannels: vi.fn(),
}));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/src/lib/api")>()), ...api }));
vi.mock("@/src/lib/auth/active-account", () => auth);
vi.mock("@/src/components/workspace/WorkspaceShell", () => ({ WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>, workspaceStyles: new Proxy({}, { get: () => "" }) }));

import { LifecycleAutomationDetailScreen } from "./LifecycleAutomationDetailScreen";

function control(key: "thank_you_emails" | "birthday_reminders", overrides: Record<string, unknown> = {}) {
  return { key, label: key === "thank_you_emails" ? "Thank You Emails" : "Birthday Notes", feature_available: true, unavailable_reason: null, mode: "automatic", pending_approval_count: 0, queued_count: 7, scheduled_count: 0, status_label: "Active", settings_version: 4, timing: null, settings: null, content_rules: null, templates: [], channels: { email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null } }, ...overrides };
}

describe("LifecycleAutomationDetailScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
    api.getEmailTemplate.mockResolvedValue({ allowedVariables: [], mode: "simple", simple: { notes: null } });
    api.getThankYouEmailSettings.mockResolvedValue({ approvalRequired: true, sendDelayHours: 12 });
    api.getBirthdayReminderSettings.mockResolvedValue({ approvalRequired: true, configured: true });
    api.updateThankYouEmailSettings.mockResolvedValue({ approvalRequired: false, sendDelayHours: 24 });
    api.updateBirthdayReminderSettings.mockResolvedValue({ approvalRequired: false, configured: true });
  });

  it("uses the required 24-hour thank-you behavior and Simple template editor", async () => {
    api.getAutomationBootstrap.mockResolvedValue({ controls: [control("thank_you_emails")] });
    render(<LifecycleAutomationDetailScreen kind="thank-you" />);

    expect(await screen.findByText("24 hours after the appointment")).not.toBeNull();
    expect(screen.getByText("Thanks for coming in!")).not.toBeNull();
    expect(await screen.findByLabelText("Personal note")).not.toBeNull();
    expect(screen.queryByLabelText("Subject")).toBeNull();
    expect(screen.queryByLabelText("Greeting")).toBeNull();
    expect(screen.queryByLabelText("Custom message")).toBeNull();

    fireEvent.click(screen.getByRole("radio", { name: /^Send automatically/ }));
    fireEvent.click(screen.getByRole("button", { name: "Save sending behavior" }));
    await waitFor(() => expect(api.updateThankYouEmailSettings).toHaveBeenCalledWith("token-1", { approvalRequired: false, sendDelayHours: 24 }));
  });

  it("shows the birthday queue count and saves its review setting independently", async () => {
    api.getAutomationBootstrap.mockResolvedValue({ controls: [control("birthday_reminders")] });
    render(<LifecycleAutomationDetailScreen kind="birthday" />);

    expect(await screen.findByText("Queued birthday notes")).not.toBeNull();
    expect(screen.getByText("7")).not.toBeNull();
    expect(screen.getByText("Happy birthday!")).not.toBeNull();
    expect(await screen.findByLabelText("Personal note")).not.toBeNull();

    fireEvent.click(screen.getByRole("radio", { name: /^Send automatically/ }));
    fireEvent.click(screen.getByRole("button", { name: "Save sending behavior" }));
    await waitFor(() => expect(api.updateBirthdayReminderSettings).toHaveBeenCalledWith("token-1", { approvalRequired: false }));
  });

  it("does not fetch or expose template controls while Email is disabled", async () => {
    api.getAutomationBootstrap.mockResolvedValue({ controls: [control("birthday_reminders", { channels: { email: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null } } })] });
    render(<LifecycleAutomationDetailScreen kind="birthday" />);
    expect(await screen.findByText("Enable Email above to personalize the email template.")).not.toBeNull();
    expect(screen.queryByLabelText("Personal note")).toBeNull();
    expect(api.getEmailTemplate).not.toHaveBeenCalled();
  });
});
