import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({ getProjectedReturnReminderSettings: vi.fn(), updateProjectedReturnReminderSettings: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/src/lib/api")>()), ...api }));
vi.mock("@/src/lib/auth/active-account", () => auth);
vi.mock("@/src/components/workspace/WorkspaceShell", () => ({
  WorkspaceShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
  PageHeading: ({ title }: { title: string }) => <h1>{title}</h1>,
  workspaceStyles: new Proxy({}, { get: () => "" }),
}));

import { ProjectedReturnReminderSettingsScreen } from "./ProjectedReturnReminderSettingsScreen";

const initial = { offset_days: -7, revision: 4, timezone: "America/Denver", local_send_time: "10:00" };
const current = { offset_days: -3, revision: 5, timezone: "America/Denver", local_send_time: "10:00" };

describe("ProjectedReturnReminderSettingsScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
    api.getProjectedReturnReminderSettings.mockResolvedValueOnce(initial).mockResolvedValueOnce(current);
    api.updateProjectedReturnReminderSettings.mockRejectedValueOnce({ status: 409, code: "return_revision_conflict" }).mockResolvedValueOnce({ ...current, offset_days: -2, revision: 6 });
  });

  it("reloads a revision conflict and requires an explicit retry with the current revision", async () => {
    render(<ProjectedReturnReminderSettingsScreen />);
    const offset = await screen.findByLabelText(/Reminder offset/);
    fireEvent.change(offset, { target: { value: "-2" } });
    fireEvent.click(screen.getByRole("button", { name: "Save timing" }));
    await waitFor(() => expect(api.updateProjectedReturnReminderSettings).toHaveBeenCalledWith("token-1", { offset_days: -2, expected_revision: 4 }));
    expect(await screen.findByRole("button", { name: "Retry save with current revision" })).not.toBeNull();
    expect(api.updateProjectedReturnReminderSettings).toHaveBeenCalledTimes(1);
    expect((screen.getByLabelText(/Reminder offset/) as HTMLInputElement).value).toBe("-3");

    fireEvent.change(screen.getByLabelText(/Reminder offset/), { target: { value: "-2" } });
    fireEvent.click(screen.getByRole("button", { name: "Save timing" }));
    await waitFor(() => expect(api.updateProjectedReturnReminderSettings).toHaveBeenLastCalledWith("token-1", { offset_days: -2, expected_revision: 5 }));
  });
});
