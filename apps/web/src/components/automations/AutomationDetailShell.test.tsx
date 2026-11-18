import { readFileSync } from "node:fs";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/src/components/workspace/WorkspaceShell", () => ({ WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main> }));

import { AutomationChannelSwitchGroup, AutomationDetailShell, AutomationQueueImpact, AutomationReviewModeSelector, AutomationServerPreviewPanel } from "./index";

describe("automation detail primitives", () => {
  beforeEach(() => { vi.restoreAllMocks(); });

  it("renders responsive-detail content, delivery controls, and queue impact", () => {
    const changeChannel = vi.fn();
    const changeReview = vi.fn();
    render(<AutomationDetailShell title="Appointment Reminders" subtitle="Choose channels, timing, and reminder copy." notice={{ tone: "success", message: "Email settings saved." }} preview={<AutomationServerPreviewPanel sample={<p>Sample email</p>} />} optionalContent={<p>Optional personal note</p>}><AutomationChannelSwitchGroup automationLabel="Appointment Reminders" channels={{ email: { available: true, enabled: true, unavailable_reason: null, unavailable_reason_code: null }, sms: { available: false, enabled: false, unavailable_reason: "Text setup is required.", unavailable_reason_code: "setup_required" } }} onChange={changeChannel} /><AutomationReviewModeSelector value="approval_required" onChange={changeReview} /><AutomationQueueImpact cancelledCount={2} createdCount={1} /></AutomationDetailShell>);

    expect(screen.getByRole("heading", { name: "Appointment Reminders" })).not.toBeNull();
    expect(screen.getByText("Email settings saved.")).not.toBeNull();
    expect(screen.getByText("Text setup is required.")).not.toBeNull();
    expect(screen.getByText("2 pending messages were cancelled. 1 message was added to the queue.")).not.toBeNull();
    expect(screen.getAllByRole("status")).toHaveLength(2);
    expect(screen.getByLabelText("Email preview")).not.toBeNull();
    fireEvent.click(screen.getByRole("checkbox", { name: "Enable Email for Appointment Reminders" }));
    expect(changeChannel).toHaveBeenCalledWith("email", false);
    fireEvent.click(screen.getByRole("radio", { name: /Send automatically/ }));
    expect(changeReview).toHaveBeenCalledWith("automatic");
    expect(screen.getByText("Sample email")).not.toBeNull();
  });

  it("renders loading and recoverable error states", () => {
    const retry = vi.fn();
    const { rerender } = render(<AutomationDetailShell title="Birthday Notes" subtitle="Configure birthday messages." state="loading" />);
    expect(screen.getByText("Loading automation settings…")).not.toBeNull();
    rerender(<AutomationDetailShell title="Birthday Notes" subtitle="Configure birthday messages." state="error" onRetry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("prompts before leaving a dirty draft", () => {
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    render(<AutomationDetailShell title="Thank You Emails" subtitle="Configure thank-you messages." dirty />);
    fireEvent.click(screen.getByRole("link", { name: "Back to Messages" }));
    expect(confirm).toHaveBeenCalledWith("Discard unsaved automation changes?");
  });

  it("keeps a sticky desktop preview and stacks the sample below controls on mobile", () => {
    const css = readFileSync(`${process.cwd()}/src/components/automations/automation-detail.module.css`, "utf8");
    expect(css).toContain(".previewRail { position:sticky");
    expect(css).toContain("@media (max-width:760px)");
    expect(css).toContain(".layout { grid-template-columns:1fr; gap:14px; }");
    expect(css).toContain(".previewRail { position:static; }");
  });
});
