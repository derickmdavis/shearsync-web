import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({ getAutomationBootstrap: vi.fn(), getEmailTemplate: vi.fn(), getProjectedReturnReminderSettings: vi.fn(), getRebookNudgeSettings: vi.fn(), updateAutomationChannels: vi.fn(), updateEmailTemplateMode: vi.fn(), updateProjectedReturnReminderSettings: vi.fn(), updateRebookNudgeSettings: vi.fn(), updateSimpleEmailTemplate: vi.fn(), previewSimpleEmailTemplate: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/src/lib/api")>()), ...api }));
vi.mock("@/src/lib/auth/active-account", () => auth);
vi.mock("@/src/components/workspace/WorkspaceShell", () => ({ WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>, workspaceStyles: new Proxy({}, { get: () => "" }) }));

import { ApiError } from "@/src/lib/api";
import { RebookNudgesDetailScreen } from "./RebookNudgesDetailScreen";

function control(overrides: Record<string, unknown> = {}) { return { key: "rebook_nudges", label: "Rebook Nudges", feature_available: true, unavailable_reason: null, mode: "approval_required", pending_approval_count: 2, queued_count: 3, scheduled_count: 1, status_label: "Review", settings_version: 4, timing: null, settings: null, content_rules: null, templates: [], channels: { email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null } }, ...overrides }; }

describe("RebookNudgesDetailScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
    api.getAutomationBootstrap.mockResolvedValue({ controls: [control()] });
    api.getProjectedReturnReminderSettings.mockResolvedValue({ offset_days: 0, revision: 4, timezone: "America/Denver", local_send_time: "10:00" });
    api.getRebookNudgeSettings.mockResolvedValue({ approvalRequired: true });
    api.getEmailTemplate.mockResolvedValue({ allowedVariables: [], mode: "simple", simple: { notes: null } });
    api.updateProjectedReturnReminderSettings.mockResolvedValue({ offset_days: -7, revision: 5, timezone: "America/Denver", local_send_time: "10:00" });
    api.updateRebookNudgeSettings.mockResolvedValue({ approvalRequired: false });
    api.updateAutomationChannels.mockResolvedValue({ settings_version: 5, channels: { email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null } } });
  });

  it("serializes before-date timing and review behavior independently", async () => {
    render(<RebookNudgesDetailScreen />);
    await screen.findByRole("button", { name: "On date" });
    fireEvent.click(screen.getByRole("button", { name: "Before" }));
    fireEvent.change(screen.getByLabelText("Days from projected date"), { target: { value: "7" } });
    fireEvent.click(screen.getByRole("button", { name: "Save timing" }));
    await waitFor(() => expect(api.updateProjectedReturnReminderSettings).toHaveBeenCalledWith("token-1", { offset_days: -7, expected_revision: 4 }));

    fireEvent.click(screen.getByRole("radio", { name: /Send automatically/ }));
    fireEvent.click(screen.getByRole("button", { name: "Save sending behavior" }));
    await waitFor(() => expect(api.updateRebookNudgeSettings).toHaveBeenCalledWith("token-1", { approvalRequired: false }));
    expect(await screen.findByLabelText("Personal note")).not.toBeNull();
    expect(screen.getByText("Ready for a refresh?")).not.toBeNull();
  });

  it("preserves the stylist draft while reloading the revision after a timing conflict", async () => {
    api.updateProjectedReturnReminderSettings.mockRejectedValueOnce(new ApiError("Conflict", 409));
    api.getProjectedReturnReminderSettings.mockResolvedValueOnce({ offset_days: 0, revision: 4, timezone: "America/Denver", local_send_time: "10:00" }).mockResolvedValueOnce({ offset_days: 5, revision: 6, timezone: "America/Denver", local_send_time: "10:00" });
    render(<RebookNudgesDetailScreen />);
    fireEvent.click(await screen.findByRole("button", { name: "Before" }));
    fireEvent.change(screen.getByLabelText("Days from projected date"), { target: { value: "9" } });
    fireEvent.click(screen.getByRole("button", { name: "Save timing" }));
    expect(await screen.findByText(/Your draft has not been replaced/)).not.toBeNull();
    expect((screen.getByLabelText("Days from projected date") as HTMLInputElement).value).toBe("9");
    fireEvent.click(screen.getByRole("button", { name: "Save timing" }));
    await waitFor(() => expect(api.updateProjectedReturnReminderSettings).toHaveBeenLastCalledWith("token-1", { offset_days: -9, expected_revision: 6 }));
  });

  it("does not load the template editor until Email is enabled", async () => {
    api.getAutomationBootstrap.mockResolvedValue({ controls: [control({ channels: { email: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null } } })] });
    render(<RebookNudgesDetailScreen />);
    expect(await screen.findByText("Enable Email above to personalize the email template.")).not.toBeNull();
    expect(api.getEmailTemplate).not.toHaveBeenCalled();
  });

  it("retains the confirmed timing result when a later operational save fails", async () => {
    api.updateRebookNudgeSettings.mockRejectedValueOnce(new Error("Review service unavailable"));
    render(<RebookNudgesDetailScreen />);
    fireEvent.click(await screen.findByRole("button", { name: "Before" }));
    fireEvent.change(screen.getByLabelText("Days from projected date"), { target: { value: "7" } });
    fireEvent.click(screen.getByRole("button", { name: "Save timing" }));
    await waitFor(() => expect(api.updateProjectedReturnReminderSettings).toHaveBeenCalled());
    fireEvent.click(screen.getByRole("radio", { name: /^Send automatically/ }));
    fireEvent.click(screen.getByRole("button", { name: "Save sending behavior" }));
    expect(await screen.findByText("Timing saved. Review service unavailable")).not.toBeNull();
    expect((screen.getByLabelText("Days from projected date") as HTMLInputElement).value).toBe("7");
  });
});
