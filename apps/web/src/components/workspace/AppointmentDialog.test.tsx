import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppointmentDialog } from "@/src/components/workspace/AppointmentDialog";

const api = vi.hoisted(() => ({ createAppointment: vi.fn(), getAppointment: vi.fn(), getAppointmentActivity: vi.fn(), getClientAppointmentHistory: vi.fn(), getClients: vi.fn(), getServices: vi.fn(), updateAppointment: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));
vi.mock("@/src/lib/api", () => ({
  ApiError: class ApiError extends Error { status: number; details?: unknown; code?: string; constructor(message: string, status: number, details?: unknown, code?: string) { super(message); this.status = status; this.details = details; this.code = code; } },
  ...api,
}));
vi.mock("@/src/lib/auth/active-account", () => ({ withActiveAccount: auth.withActiveAccount }));
vi.mock("./WorkspaceShell", () => ({ workspaceStyles: new Proxy({}, { get: (_target, property) => String(property) }) }));

describe("AppointmentDialog", () => {
  beforeEach(() => {
    api.getServices.mockResolvedValue([{ id: "service-1", name: "Cut", durationMinutes: 60, price: 95, isActive: true, isDefault: false, sortOrder: 0 }]);
    api.getClients.mockResolvedValue({ data: [{ id: "client-1", first_name: "Ava", last_name: "Stone", preferred_name: null }] });
    api.createAppointment.mockResolvedValue({ id: "appointment-1", appointment_date: "2026-10-16T15:00:00.000Z" });
    auth.withActiveAccount.mockImplementation((request: (token: string) => unknown) => request("token-1"));
  });
  afterEach(() => vi.clearAllMocks());

  it("retains the appointment draft after an overlap conflict", async () => {
    const { ApiError } = await import("@/src/lib/api");
    api.createAppointment.mockRejectedValueOnce(new ApiError("overlap", 409));
    render(<AppointmentDialog target={{ prefill: { id: "gap-1", startTime: "2026-10-16T15:00:00.000Z", endTime: "2026-10-16T16:00:00.000Z", durationMinutes: 60, canBook: true, date: "2026-10-16" } }} timezone="America/Denver" onClose={vi.fn()} onMutated={vi.fn()} />);
    fireEvent.change(await screen.findByLabelText("Client"), { target: { value: "client-1" } });
    fireEvent.click(screen.getByLabelText(/Cut/));
    fireEvent.click(screen.getByRole("button", { name: "Create appointment" }));
    await screen.findByText("That time is no longer available. Choose another time and try again.");
    expect((screen.getByLabelText("Client") as HTMLSelectElement).value).toBe("client-1");
    expect((screen.getByLabelText(/Cut/) as HTMLInputElement).checked).toBe(true);
  });
});
