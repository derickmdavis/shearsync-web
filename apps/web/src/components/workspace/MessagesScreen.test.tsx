import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({ getActivityDashboard: vi.fn(), getBookingInquiries: vi.fn(), getSentOutreach: vi.fn(), getAutomationBootstrap: vi.fn(), setAutomationEnabled: vi.fn(), updateAutomationChannels: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", () => ({ ...api, ApiError: class ApiError extends Error { constructor(message: string, readonly status: number, _details?: unknown, readonly code?: string) { super(message); } } }));
vi.mock("@/src/lib/auth/active-account", () => ({ AccountLifecycleError: class AccountLifecycleError extends Error {}, ...auth }));
vi.mock("./WorkspaceShell", () => ({ WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>, PageHeading: ({ title }: { title: string }) => <h1>{title}</h1>, workspaceStyles: new Proxy({}, { get: () => "" }) }));

import { MessagesScreen } from "./MessagesScreen";

const bootstrap = { account_timezone: "America/Denver", summary: { enabled_count: 1, available_count: 1, total_count: 1 }, customers_reached: { unique_clients: 0, window_start: "", window_end: "", timezone: "America/Denver", window_kind: "", window_days: 0, included_message_types: [] }, controls: [{ key: "booking_confirmations", label: "Booking confirmations", enabled: true, feature_available: true, unavailable_reason: null, mode: "automatic", pending_approval_count: 0, queued_count: 1, scheduled_count: 0, status_label: "Active", settings_version: 7, channels: { email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null } }, timing: {}, settings: {}, content_rules: null, templates: [] }] };

describe("MessagesScreen channel controls", () => {
  beforeEach(() => { vi.clearAllMocks(); auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1")); api.getAutomationBootstrap.mockResolvedValue(bootstrap); api.getActivityDashboard.mockResolvedValue({}); api.getSentOutreach.mockResolvedValue([]); api.updateAutomationChannels.mockResolvedValue({ settings_version: 8, email: false, sms: false, queue_reconciliation: { cancelled_count: 1 } }); });

  it("renders sent-message content beside its delivery status", async () => {
    api.getSentOutreach.mockResolvedValue([{ id: "outreach-1", recipient_name: "Katie Stohs", message: "Thanks for visiting—let's plan your next appointment.", status: "sent" }]);
    render(<MessagesScreen />);
    fireEvent.click(screen.getByRole("button", { name: "Sent" }));
    expect(await screen.findByText("Katie Stohs")).not.toBeNull();
    expect(screen.getByText("Thanks for visiting—let's plan your next appointment.")).not.toBeNull();
    expect(screen.getByText("sent")).not.toBeNull();
  });

  it("sends the bootstrap version, then refetches and acknowledges queue reconciliation", async () => {
    render(<MessagesScreen />);
    const email = await screen.findByRole("checkbox", { name: "Enable Email for Booking confirmations" });
    fireEvent.click(email);
    await waitFor(() => expect(api.updateAutomationChannels).toHaveBeenCalledWith("token-1", "booking_confirmations", { settings_version: 7, email: false, sms: false }));
    await waitFor(() => expect(api.getAutomationBootstrap).toHaveBeenCalledTimes(2));
    expect(await screen.findByText("1 queued message was cancelled after the channel change.")).not.toBeNull();
  });

  it("discards a stale channel draft and reloads bootstrap after a version conflict", async () => {
    api.updateAutomationChannels.mockRejectedValue({ status: 409, code: "settings_version_conflict" });
    render(<MessagesScreen />);
    fireEvent.click(await screen.findByRole("checkbox", { name: "Enable Email for Booking confirmations" }));
    expect(await screen.findByText(/Channel preferences changed elsewhere/)).not.toBeNull();
    expect(api.getAutomationBootstrap).toHaveBeenCalledTimes(2);
  });
});
