import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({ getEmailTemplate: vi.fn(), updateEmailTemplateMode: vi.fn(), updateSimpleEmailTemplate: vi.fn(), previewSimpleEmailTemplate: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/src/lib/api")>()), ...api }));
vi.mock("@/src/lib/auth/active-account", () => auth);
vi.mock("@/src/components/workspace/WorkspaceShell", () => ({ WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>, workspaceStyles: new Proxy({}, { get: () => "" }) }));

import { EmailTemplateEditorScreen } from "./EmailTemplateEditorScreen";
import { normalizeNotes, useSimpleEmailTemplateEditor } from "./useSimpleEmailTemplateEditor";

const template = { allowedVariables: [], source: "custom" as const, mode: "advanced" as const, simple: { notes: "Bring your confirmation number.", layoutVersion: "v1" } };

describe("EmailTemplateEditorScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
    api.getEmailTemplate.mockResolvedValue(template);
    api.updateSimpleEmailTemplate.mockResolvedValue({ ...template, mode: "advanced", simple: { notes: "A warm note", layoutVersion: "v1" } });
    api.updateEmailTemplateMode.mockResolvedValue({ ...template, mode: "simple" });
    api.previewSimpleEmailTemplate.mockResolvedValue({ subject: "Your appointment", text: "Plain preview", html: "<p>Preview</p>" });
  });

  it("uses Simple preview and save endpoints for every template key", async () => {
    render(<EmailTemplateEditorScreen templateKey="birthday" />);
    const note = await screen.findByLabelText("Personal note");
    fireEvent.change(note, { target: { value: " A warm\r\nnote " } });
    fireEvent.click(screen.getByRole("button", { name: "Preview" }));
    await waitFor(() => expect(api.previewSimpleEmailTemplate).toHaveBeenCalledWith("token-1", "birthday", { notes: "A warm\nnote" }));
    expect(screen.getByTitle("Rendered email preview").getAttribute("sandbox")).toBe("");
    expect(screen.getByText("Plain-text version")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Save personal note" }));
    await waitFor(() => expect(api.updateSimpleEmailTemplate).toHaveBeenCalledWith("token-1", "birthday", { notes: "A warm\nnote" }));
    await waitFor(() => expect(api.updateEmailTemplateMode).toHaveBeenCalledWith("token-1", "birthday", "simple"));
    expect(screen.getByText("Personal note saved and Simple delivery mode is active.")).not.toBeNull();
    expect(screen.queryByRole("button", { name: /Advanced editor/ })).toBeNull();
  });

  it("surfaces a partial save when Simple activation fails", async () => {
    api.updateEmailTemplateMode.mockRejectedValueOnce(new Error("Activation failed"));
    render(<EmailTemplateEditorScreen templateKey="rebook_nudge" />);
    fireEvent.change(await screen.findByLabelText("Personal note"), { target: { value: "See you soon" } });
    fireEvent.click(screen.getByRole("button", { name: "Save personal note" }));
    expect(await screen.findByText(/Your personal note was saved, but Simple delivery mode could not be activated/)).not.toBeNull();
    expect(api.getEmailTemplate).toHaveBeenCalledTimes(2);
  });

  it("normalizes empty and multiline notes before requests", () => {
    expect(normalizeNotes(" \r\n ")).toBeNull();
    expect(normalizeNotes(" One\rTwo\r\nThree ")).toBe("One\nTwo\nThree");
  });

  it("saves an empty note as null", async () => {
    render(<EmailTemplateEditorScreen templateKey="thank_you" />);
    fireEvent.change(await screen.findByLabelText("Personal note"), { target: { value: "  \r\n" } });
    fireEvent.click(screen.getByRole("button", { name: "Save personal note" }));
    await waitFor(() => expect(api.updateSimpleEmailTemplate).toHaveBeenCalledWith("token-1", "thank_you", { notes: null }));
  });

  it("ignores a stale preview after the draft changes", async () => {
    let resolvePreview: ((value: { subject: string; text: string; html: string }) => void) | undefined;
    api.previewSimpleEmailTemplate.mockImplementationOnce(() => new Promise((resolve) => { resolvePreview = resolve; }));
    const { result } = renderHook(() => useSimpleEmailTemplateEditor("birthday"));
    await waitFor(() => expect(result.current.state).toBe("ready"));
    act(() => { result.current.changeDraft("First note"); void result.current.requestPreview(); });
    act(() => result.current.changeDraft("Replacement note"));
    await act(async () => { resolvePreview?.({ subject: "Old", text: "Old preview", html: "<p>Old</p>" }); });
    expect(result.current.preview).toBeNull();
  });
});
