import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({
  getEmailTemplate: vi.fn(), updateEmailTemplate: vi.fn(), previewEmailTemplate: vi.fn(), resetEmailTemplate: vi.fn(),
  updateEmailTemplateMode: vi.fn(), updateSimpleEmailTemplate: vi.fn(), previewSimpleEmailTemplate: vi.fn(),
  updateAdvancedEmailTemplate: vi.fn(), previewAdvancedEmailTemplate: vi.fn(),
}));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/src/lib/api")>()), ...api }));
vi.mock("@/src/lib/auth/active-account", () => auth);
vi.mock("@/src/components/workspace/WorkspaceShell", () => ({
  WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
  PageHeading: ({ title }: { title: string }) => <h1>{title}</h1>,
  workspaceStyles: new Proxy({}, { get: () => "" }),
}));

import { EmailTemplateEditorScreen } from "./EmailTemplateEditorScreen";

const template = {
  subject: "Your appointment is confirmed", body: "Hi {{client_name}}", allowedVariables: ["{{client_name}}"], source: "custom" as const,
  configuration: { mode: "simple" as const, layoutVersion: "v1" }, notes: "Bring your confirmation number.",
};

describe("EmailTemplateEditorScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
    api.getEmailTemplate.mockResolvedValue(template);
    api.updateEmailTemplateMode.mockResolvedValue({ ...template, configuration: { mode: "advanced", layoutVersion: "v1" } });
  });

  it("keeps simple and advanced drafts independent and changes delivery mode only explicitly", async () => {
    render(<EmailTemplateEditorScreen templateKey="booking_confirmation" />);
    await screen.findByRole("button", { name: "Advanced editor" });

    fireEvent.click(screen.getByRole("button", { name: "Advanced editor" }));
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Advanced subject" } });
    expect(api.updateEmailTemplateMode).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Simple editor" }));
    fireEvent.change(screen.getByLabelText(/Simple notes/), { target: { value: "Simple draft" } });
    fireEvent.click(screen.getByRole("button", { name: "Advanced editor" }));
    expect((screen.getByLabelText("Subject") as HTMLInputElement).value).toBe("Advanced subject");

    fireEvent.click(screen.getByRole("button", { name: "Activate advanced delivery mode" }));
    await waitFor(() => expect(api.updateEmailTemplateMode).toHaveBeenCalledWith("token-1", "booking_confirmation", "advanced"));
  });
});
