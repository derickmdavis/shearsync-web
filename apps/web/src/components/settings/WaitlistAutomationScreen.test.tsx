import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({ getAutomationBootstrap: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/src/lib/api")>()), ...api }));
vi.mock("@/src/lib/auth/active-account", () => auth);
vi.mock("@/src/components/workspace/WorkspaceShell", () => ({ WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>, workspaceStyles: new Proxy({}, { get: () => "" }) }));

import { WaitlistAutomationScreen } from "./WaitlistAutomationScreen";

function waitlist(overrides: Record<string, unknown> = {}) {
  return { key: "waitlist_match", label: "Waitlist", feature_available: true, unavailable_reason: null, mode: null, status_label: "Watching for matches", settings_version: null, pending_approval_count: 2, queued_count: 5, scheduled_count: 3, timing: null, settings: null, content_rules: null, templates: [], channels: { email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: false, enabled: false, unavailable_reason: "Text notifications are unavailable", unavailable_reason_code: "unavailable" } }, ...overrides };
}

describe("WaitlistAutomationScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
  });

  it("renders server capability, channels, counts, and the queue workflow without template controls", async () => {
    api.getAutomationBootstrap.mockResolvedValue({ controls: [waitlist()] });
    render(<WaitlistAutomationScreen />);

    expect(await screen.findByText("Watching for matches")).not.toBeNull();
    expect(screen.getByText("Queued matches")).not.toBeNull();
    expect(screen.getByText("5")).not.toBeNull();
    expect(screen.getByText("Text notifications are unavailable")).not.toBeNull();
    expect(screen.getByRole("link", { name: "Open waitlist queue" }).getAttribute("href")).toBe("/messages?tab=manage&focus=waitlist");
    expect(screen.queryByText("Email template")).toBeNull();
    expect(screen.queryByText("Reminder timing")).toBeNull();
  });

  it("surfaces the server unavailable reason without offering a mutation", async () => {
    api.getAutomationBootstrap.mockResolvedValue({ controls: [waitlist({ feature_available: false, unavailable_reason: "Enable the waitlist feature first." })] });
    render(<WaitlistAutomationScreen />);
    expect(await screen.findByText("Enable the waitlist feature first.")).not.toBeNull();
    expect(screen.queryByRole("checkbox")).toBeNull();
  });
});
