import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({ getAutomationBootstrap: vi.fn(), getEmailTemplate: vi.fn(), previewSimpleEmailTemplate: vi.fn(), updateAutomationChannels: vi.fn(), updateEmailTemplateMode: vi.fn(), updateSimpleEmailTemplate: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/src/lib/api")>()), ...api }));
vi.mock("@/src/lib/auth/active-account", () => auth);
vi.mock("@/src/components/workspace/WorkspaceShell", () => ({ WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>, workspaceStyles: new Proxy({}, { get: () => "" }) }));

import { ApiError } from "@/src/lib/api";
import { AppointmentAutomationDetailScreen } from "./AppointmentAutomationDetailScreen";

function control(overrides: Record<string, unknown> = {}) {
  return { key: "appointment_reminders", label: "Appointment Reminders", feature_available: true, unavailable_reason: null, mode: "automatic", pending_approval_count: 1, queued_count: 3, scheduled_count: 4, status_label: "Active", settings_version: 7, timing: { lead_time_minutes: 1440 }, settings: null, content_rules: null, templates: [], channels: { email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null } }, ...overrides };
}

describe("AppointmentAutomationDetailScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
    api.getAutomationBootstrap.mockResolvedValue({ controls: [control()] });
    api.getEmailTemplate.mockResolvedValue({ allowedVariables: [], mode: "simple", simple: { notes: null } });
    api.updateAutomationChannels.mockResolvedValue({ settings_version: 8, channels: { email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null } }, queue_reconciliation: { cancelled_count: 2, created_count: 1 } });
  });

  it("shows server channels, read-only lead time, and reconciles an optimistic channel update", async () => {
    render(<AppointmentAutomationDetailScreen controlKey="appointment_reminders" />);
    expect(await screen.findByText("1 day before the appointment")).not.toBeNull();
    expect(await screen.findByLabelText("Personal note")).not.toBeNull();
    fireEvent.click(screen.getByRole("checkbox", { name: "Enable Text for Appointment Reminders" }));
    expect(screen.getByText("Saving…")).not.toBeNull();
    await waitFor(() => expect(api.updateAutomationChannels).toHaveBeenCalledWith("token-1", "appointment_reminders", { settings_version: 7, sms: true }));
    expect(await screen.findByText("2 pending messages were cancelled. 1 message was added to the queue.")).not.toBeNull();
    expect(screen.getByText("Text delivery updated.")).not.toBeNull();
  });

  it("hides the email editor while Email is disabled", async () => {
    api.getAutomationBootstrap.mockResolvedValue({ controls: [control({ key: "booking_confirmations", channels: { email: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null } } })] });
    render(<AppointmentAutomationDetailScreen controlKey="booking_confirmations" />);
    expect(await screen.findByText("Enable Email above to personalize the email template.")).not.toBeNull();
    expect(screen.queryByLabelText("Personal note")).toBeNull();
    expect(api.getEmailTemplate).not.toHaveBeenCalled();
  });

  it("rolls back, reloads, and explains a channel-version conflict", async () => {
    api.updateAutomationChannels.mockRejectedValueOnce(new ApiError("Conflict", 409));
    api.getAutomationBootstrap.mockResolvedValueOnce({ controls: [control()] }).mockResolvedValueOnce({ controls: [control({ settings_version: 9, channels: { email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null } } })] });
    render(<AppointmentAutomationDetailScreen controlKey="appointment_reminders" />);
    fireEvent.click(await screen.findByRole("checkbox", { name: "Enable Text for Appointment Reminders" }));
    expect(await screen.findByText(/This automation changed elsewhere/)).not.toBeNull();
    expect(api.getAutomationBootstrap).toHaveBeenCalledTimes(2);
    expect((screen.getByRole("checkbox", { name: "Enable Text for Appointment Reminders" }) as HTMLInputElement).checked).toBe(true);
  });

  it("does not offer an unsupported channel write when the server version is null", async () => {
    api.getAutomationBootstrap.mockResolvedValue({ controls: [control({ settings_version: null })] });
    render(<AppointmentAutomationDetailScreen controlKey="appointment_reminders" />);
    const text = await screen.findByRole("checkbox", { name: "Enable Text for Appointment Reminders" });
    fireEvent.click(text);
    expect(api.updateAutomationChannels).not.toHaveBeenCalled();
    expect((text as HTMLInputElement).checked).toBe(false);
  });

  it("rolls back and explains a forbidden channel write", async () => {
    api.updateAutomationChannels.mockRejectedValueOnce(new ApiError("Forbidden", 403));
    render(<AppointmentAutomationDetailScreen controlKey="appointment_reminders" />);
    fireEvent.click(await screen.findByRole("checkbox", { name: "Enable Text for Appointment Reminders" }));
    expect(await screen.findByText("You do not have permission to update this channel.")).not.toBeNull();
    expect((screen.getByRole("checkbox", { name: "Enable Text for Appointment Reminders" }) as HTMLInputElement).checked).toBe(false);
  });
});
