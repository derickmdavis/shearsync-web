import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({ cancelCampaign: vi.fn(), cancelScheduledOutreach: vi.fn(), createCampaignDraft: vi.fn(), getAccountAccess: vi.fn(), getActivityApprovals: vi.fn(), getAutomationBootstrap: vi.fn(), getAutomationTemplateKey: vi.fn((key: string) => ({ booking_confirmations: "booking_confirmation", appointment_reminders: "appointment_reminder", rebook_nudges: "rebook_nudge", thank_you_emails: "thank_you", birthday_reminders: "birthday" } as Record<string, string>)[key] ?? null), getBookingInquiries: vi.fn(), getCampaign: vi.fn(), getCampaigns: vi.fn(), getPendingOutreachApprovals: vi.fn(), getScheduledOutreach: vi.fn(), getSentOutreach: vi.fn(), getWaitlistEntries: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", () => ({ ...api, ApiError: class ApiError extends Error { constructor(message: string, readonly status: number) { super(message); } } }));
vi.mock("@/src/lib/auth/active-account", () => ({ AccountLifecycleError: class AccountLifecycleError extends Error {}, ...auth }));
vi.mock("./WorkspaceShell", () => ({ WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>, PageHeading: ({ title, action }: { title: string; action?: React.ReactNode }) => <header><h1>{title}</h1>{action}</header>, workspaceStyles: new Proxy({}, { get: () => "" }) }));

import { MessagesScreen } from "./MessagesScreen";

const fullAccess = { status: "active", isActive: true, mode: "full", activatedAt: null, currentPeriodEndsAt: null, deactivatedAt: null };
const automations = { controls: [
  { key: "booking_confirmations", label: "Booking confirmations", enabled: false, feature_available: true, unavailable_reason: null, mode: "automatic", status_label: "Delivered automatically", settings_version: 7, pending_approval_count: 0, queued_count: 4, scheduled_count: 6, channels: { email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null } } },
  { key: "rebook_nudges", label: "Rebook nudges", enabled: true, feature_available: false, unavailable_reason: "Complete setup first.", mode: "approval_required", status_label: "Unavailable", settings_version: null, pending_approval_count: 2, queued_count: 1, scheduled_count: 0, channels: { email: { available: false, enabled: false, unavailable_reason: "Complete setup first.", unavailable_reason_code: "setup_required" }, sms: { available: false, enabled: false, unavailable_reason: "Text is unavailable", unavailable_reason_code: "unavailable" } } },
  { key: "waitlist_match", label: "Waitlist", enabled: false, feature_available: true, unavailable_reason: null, mode: null, status_label: "Watching for matches", settings_version: null, pending_approval_count: null, queued_count: 3, scheduled_count: null, channels: { email: { available: true, enabled: false, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: false, enabled: false, unavailable_reason: "Text notifications are unavailable", unavailable_reason_code: "unavailable" } } },
] };

describe("MessagesScreen shell", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
    api.getAccountAccess.mockResolvedValue(fullAccess);
    api.getBookingInquiries.mockResolvedValue([]);
    api.getActivityApprovals.mockResolvedValue({ data: [] });
    api.getWaitlistEntries.mockResolvedValue({ data: [] });
    api.getScheduledOutreach.mockResolvedValue({ data: [] });
    api.getPendingOutreachApprovals.mockResolvedValue({ data: [] });
    api.getSentOutreach.mockResolvedValue({ data: [], next_cursor: null });
    api.getCampaigns.mockResolvedValue({ data: [] });
    api.getAutomationBootstrap.mockResolvedValue(automations);
    api.createCampaignDraft.mockResolvedValue({ id: "draft-new" });
    api.getCampaign.mockResolvedValue({ id: "campaign-1", status: "scheduled", allowed_actions: ["view", "cancel"], metrics: { recipients: { total: 3, eligible: 3, queued: 3, sending: 0, sent: 0, delivered: 0, failed: 0, skipped: 0, cancelled: 0 }, attribution: { booked_count: 0, booked_revenue_cents: 0, currency: "USD" }, delivery_analytics: { opens: { available: false }, clicks: { available: false } }, link_visits_approximate: 0 }, attributed_appointments: [], delivery_issues: [] });
    api.cancelCampaign.mockResolvedValue({ id: "campaign-1", status: "cancelled" });
    api.cancelScheduledOutreach.mockResolvedValue({ data: { id: "scheduled-1", status: "cancelled" } });
  });

  it("opens Scheduled by default and loads all of its independent sources", async () => {
    render(<MessagesScreen />);

    expect(await screen.findByRole("heading", { name: "Scheduled Communications" })).not.toBeNull();
    expect(screen.getByText("Nothing scheduled.")).not.toBeNull();
    expect(api.getScheduledOutreach).toHaveBeenCalledWith("token-1");
    expect(api.getPendingOutreachApprovals).toHaveBeenCalledWith("token-1");
    expect(api.getCampaigns).toHaveBeenCalledWith("token-1");
  });

  it("groups scheduled messages and campaigns by account-local date", async () => {
    const now = new Date();
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    const futureDay = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString();
    api.getAutomationBootstrap.mockResolvedValue({ ...automations, account_timezone: "UTC" });
    api.getScheduledOutreach.mockResolvedValue({ data: [{ id: "scheduled-1", scheduled_at: nextDay, client_name: "Ava", message_type: "appointment_reminder" }] });
    api.getPendingOutreachApprovals.mockResolvedValue({ data: [{ id: "approval-1", scheduled_at: futureDay, client_name: "Mia" }] });
    api.getCampaigns.mockResolvedValue({ data: [{ id: "campaign-1", status: "scheduled", scheduled_at: futureDay, name: "Holiday color", sent_count: 4 }] });
    render(<MessagesScreen />);

    const next = await screen.findByRole("button", { name: "Next 3 days" });
    expect(next.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Ava")).not.toBeNull();
    const future = screen.getByRole("button", { name: "Future" });
    expect(future.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(future);
    expect(await screen.findByText("Mia")).not.toBeNull();
    expect(screen.getByText("Holiday color")).not.toBeNull();
    expect(screen.getByText("4")).not.toBeNull();
  });

  it("offers authorized scheduled-send navigation and confirms cancellation without disabling the automation", async () => {
    const scheduledAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    api.getScheduledOutreach.mockResolvedValue({ data: [{ id: "scheduled-1", send_at: scheduledAt, recipient: { client_id: "client-1", display_name: "Ava" }, appointment_id: "appointment-1", allowed_actions: ["view_client", "view_appointment", "cancel"], can_cancel: true }] });
    render(<MessagesScreen />);

    expect(await screen.findByRole("link", { name: "Client" })).not.toBeNull();
    expect(screen.getByRole("link", { name: "Client" }).getAttribute("href")).toBe("/clients?client=client-1");
    expect(screen.getByRole("link", { name: "Appointment" }).getAttribute("href")).toBe("/calendar?appointment=appointment-1");
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(await screen.findByRole("alertdialog", { name: "Cancel scheduled message" })).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Cancel message" }));
    await waitFor(() => expect(api.cancelScheduledOutreach).toHaveBeenCalledWith("token-1", "scheduled-1"));
    expect(await screen.findByText("Message cancelled. This does not turn off the automation for future messages.")).not.toBeNull();
  });

  it("shows campaign reporting and only exposes cancellation when the detail authorizes it", async () => {
    api.getCampaigns.mockResolvedValue({ data: [{ id: "campaign-1", status: "scheduled", name: "Holiday color", allowed_actions: ["view", "cancel"] }] });
    render(<MessagesScreen />);
    fireEvent.click(await screen.findByRole("button", { name: "Manage" }));
    fireEvent.click(await screen.findByRole("button", { name: /Holiday color/ }));
    expect(await screen.findByText("Delivery")).not.toBeNull();
    expect(screen.getAllByText("3").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Cancel scheduled campaign" }));
    fireEvent.click(await screen.findByRole("button", { name: "Cancel campaign" }));
    await waitFor(() => expect(api.cancelCampaign).toHaveBeenCalledWith("token-1", "campaign-1"));
  });

  it("separates terminal campaigns from loaded automated-message history and paginates with the opaque cursor", async () => {
    const now = Date.now();
    const recent = new Date(now - 24 * 60 * 60 * 1000).toISOString();
    const earlier = new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString();
    const expired = new Date(now - 31 * 24 * 60 * 60 * 1000).toISOString();
    api.getSentOutreach.mockImplementation((_token: string, cursor?: string) => Promise.resolve(cursor ? { data: [{ id: "sent-1", sent_at: recent, recipient_name: "Ava", message_type: "appointment_reminder" }, { id: "sent-4", sent_at: recent, recipient_name: "Nora", message_type: "birthday_reminder" }], next_cursor: null } : { data: [{ id: "sent-1", sent_at: recent, recipient_name: "Ava", message_type: "appointment_reminder" }, { id: "sent-2", sent_at: earlier, recipient_name: "Mia", message_type: "rebook_nudge" }, { id: "campaign-recipient", campaign_id: "campaign-1", sent_at: recent, recipient_name: "Campaign recipient" }, { id: "expired", sent_at: expired, recipient_name: "Too old" }], next_cursor: "opaque-cursor" }));
    api.getCampaigns.mockResolvedValue({ data: [{ id: "campaign-1", status: "completed", name: "Spring color" }, { id: "campaign-2", status: "scheduled", name: "Upcoming campaign" }] });
    render(<MessagesScreen />);
    fireEvent.click(await screen.findByRole("button", { name: "Sent" }));

    expect(await screen.findByText("Spring color")).not.toBeNull();
    expect(screen.queryByText("Upcoming campaign")).toBeNull();
    expect(screen.getByText("Ava")).not.toBeNull();
    expect(screen.queryByText("Campaign recipient")).toBeNull();
    expect(screen.queryByText("Too old")).toBeNull();
    const earlierGroup = screen.getByRole("button", { name: "Earlier" });
    expect(earlierGroup.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(earlierGroup);
    expect(await screen.findByText("Mia")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Load more" }));
    await waitFor(() => expect(api.getSentOutreach).toHaveBeenLastCalledWith("token-1", "opaque-cursor"));
    expect(await screen.findByText("Nora")).not.toBeNull();
    expect(screen.getAllByText("Ava")).toHaveLength(1);
  });

  it("refreshes and explains a cancellation conflict when sending has started", async () => {
    const scheduledAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    api.getScheduledOutreach.mockResolvedValue({ data: [{ id: "scheduled-1", send_at: scheduledAt, allowed_actions: ["cancel"], can_cancel: true }] });
    api.cancelScheduledOutreach.mockRejectedValue({ status: 409 });
    render(<MessagesScreen />);

    fireEvent.click(await screen.findByRole("button", { name: "Cancel" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel message" }));
    expect(await screen.findByText("This message is already being sent. The schedule was refreshed.")).not.toBeNull();
    await waitFor(() => expect(api.getScheduledOutreach).toHaveBeenCalledTimes(2));
  });

  it("switches to Manage and retains the correct empty state", async () => {
    render(<MessagesScreen />);
    fireEvent.click(await screen.findByRole("button", { name: "Manage" }));

    expect(await screen.findByRole("heading", { name: "Manage" })).not.toBeNull();
    expect(screen.getByText("You’re all caught up. Nothing needs your attention right now.")).not.toBeNull();
    expect(api.getBookingInquiries).toHaveBeenCalledWith("token-1");
    expect(api.getActivityApprovals).toHaveBeenCalledWith("token-1");
    expect(api.getWaitlistEntries).toHaveBeenCalledWith("token-1");
  });

  it("opens the requested waitlist queue in Manage", async () => {
    api.getWaitlistEntries.mockResolvedValue({ available: true, data: [{ id: "waitlist-1", client_name: "Ava", requested_dates: ["2026-12-01"] }] });
    render(<MessagesScreen initialTab="manage" focusWaitlist />);
    expect(await screen.findByRole("heading", { name: "Manage" })).not.toBeNull();
    expect(screen.getByRole("button", { name: /Waitlist/ }).getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Ava")).not.toBeNull();
  });

  it("filters Needs Attention rows and permits only one expanded category", async () => {
    api.getBookingInquiries.mockResolvedValue([
      { id: "inquiry-open", status: "new", preferred_name: "Ava", desired_outcome: "Warm dimensional color" },
      { id: "inquiry-closed", status: "closed", preferred_name: "Hidden" },
    ]);
    api.getActivityApprovals.mockResolvedValue({ data: [
      { id: "approval-open", event_type: "booking_created", metadata: { appointment_id: "appointment-1", service_name: "Gloss" } },
      { id: "not-an-approval", event_type: "booking_created", metadata: {} },
    ] });
    api.getWaitlistEntries.mockResolvedValue({ available: false, data: [{ id: "waitlist-hidden", client_name: "Hidden" }] });
    render(<MessagesScreen />);
    fireEvent.click(await screen.findByRole("button", { name: "Manage" }));

    const inquiries = await screen.findByRole("button", { name: /Booking Inquiries/ });
    expect(screen.getByText("Pending Approvals")).not.toBeNull();
    expect(screen.queryByRole("button", { name: /Waitlist/ })).toBeNull();
    fireEvent.click(inquiries);
    expect(await screen.findByText("Warm dimensional color")).not.toBeNull();
    expect(screen.queryByText("Hidden")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Pending Approvals/ }));
    expect(await screen.findByText("Gloss")).not.toBeNull();
    expect(screen.queryByText("Warm dimensional color")).toBeNull();
  });

  it("renders capability-driven automation summaries without legacy mutation controls", async () => {
    render(<MessagesScreen />);
    fireEvent.click(await screen.findByRole("button", { name: "Manage" }));

    expect(await screen.findByRole("heading", { name: "Always on" })).not.toBeNull();
    expect(screen.getByText("Sends automatically")).not.toBeNull();
    expect(screen.getByText("Review before sending")).not.toBeNull();
    expect(screen.getAllByText("Complete setup first.")).not.toHaveLength(0);
    expect(screen.getByText("Server status: Delivered automatically")).not.toBeNull();
    expect(screen.getAllByText("Queued").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Scheduled").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pending approval").length).toBeGreaterThan(0);
    expect(screen.getByText("Text notifications are unavailable")).not.toBeNull();
    expect(screen.getByRole("link", { name: "Configure Booking confirmations" }).getAttribute("href")).toBe("/settings/email-templates/booking_confirmation");
    expect(screen.getByRole("link", { name: "Configure Rebook nudges" }).getAttribute("href")).toBe("/settings/automations/rebook-nudges");
    expect(screen.getByRole("link", { name: "View waitlist" }).getAttribute("href")).toBe("/settings/automations/waitlist");
    expect(screen.queryByRole("checkbox")).toBeNull();
  });

  it("lists only draft, scheduled, and sending campaigns without inventing audience metrics", async () => {
    api.getCampaigns.mockResolvedValue({ data: [
      { id: "draft-1", status: "draft", name: "Spring refresh" },
      { id: "scheduled-1", lifecycle_status: "scheduled", name: "Holiday color", scheduled_at: "2026-12-01T10:00:00Z", eligible_count: 12 },
      { id: "completed-1", status: "completed", name: "Already sent" },
    ] });
    render(<MessagesScreen />);
    fireEvent.click(await screen.findByRole("button", { name: "Manage" }));

    expect(await screen.findByText("Spring refresh")).not.toBeNull();
    expect(screen.getByText("Holiday color")).not.toBeNull();
    expect(screen.queryByText("Already sent")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Spring refresh/ }));
    expect(await screen.findByText("Audience summary unavailable.")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "New Campaign" }));
    await waitFor(() => expect(api.createCampaignDraft).toHaveBeenCalledWith("token-1"));
  });

  it("shows a partial-data retry state without hiding successful sources", async () => {
    api.getPendingOutreachApprovals.mockRejectedValue(new Error("temporary failure"));
    api.getScheduledOutreach.mockResolvedValue({ data: [{ id: "message-1" }] });
    render(<MessagesScreen />);

    expect(await screen.findByText(/Some message data could not be loaded/)).not.toBeNull();
    expect(screen.getByRole("button", { name: "Future" })).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    await waitFor(() => expect(api.getScheduledOutreach).toHaveBeenCalledTimes(2));
  });

  it("explains read-only access while leaving message data visible", async () => {
    api.getAccountAccess.mockResolvedValue({ ...fullAccess, mode: "read_only" });
    render(<MessagesScreen />);

    expect(await screen.findByText(/This account is read-only/)).not.toBeNull();
  });

  it("keeps cached results visible when every source fails during refresh", async () => {
    render(<MessagesScreen />);
    await screen.findByText("Nothing scheduled.");
    api.getScheduledOutreach.mockRejectedValue(new Error("offline"));
    api.getPendingOutreachApprovals.mockRejectedValue(new Error("offline"));
    api.getCampaigns.mockRejectedValue(new Error("offline"));

    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));

    expect(await screen.findByText("We couldn’t refresh messages. Showing previously loaded data.")).not.toBeNull();
    expect(screen.getByText("Nothing scheduled.")).not.toBeNull();
  });
});
