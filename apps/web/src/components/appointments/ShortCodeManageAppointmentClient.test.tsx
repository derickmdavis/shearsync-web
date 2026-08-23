import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ShortCodeManageAppointmentClient } from "@/src/components/appointments/ShortCodeManageAppointmentClient";

const api = vi.hoisted(() => ({
  resolve: vi.fn(),
  normalize: vi.fn(),
  cancel: vi.fn(),
  reschedule: vi.fn(),
}));

vi.mock("@/src/lib/api", () => ({
  ApiError: class ApiError extends Error {
    status = 0;
  },
  resolvePublicAppointmentLink: api.resolve,
  normalizePublicAppointmentLink: api.normalize,
  cancelManagedAppointment: api.cancel,
  rescheduleManagedAppointment: api.reschedule,
}));

const appointment = {
  appointment_id: "appointment-1",
  client_id: "client-1",
  stylist_id: "stylist-1",
  stylist_slug: "maya",
  stylist_display_name: "Maya",
  business_name: "Maya Studio",
  client_name: "Katie",
  service_name: "Cut & Style",
  service_duration_minutes: 60,
  service_price: 85,
  appointment_date: "2026-09-12T14:30:00-06:00",
  business_timezone: "America/Denver",
  status: "scheduled",
  can_cancel: true,
  can_reschedule: true,
};

describe("ShortCodeManageAppointmentClient", () => {
  it("renders valid link details without any authenticated session", async () => {
    api.resolve.mockResolvedValue({ valid: true });
    api.normalize.mockReturnValue(appointment);

    render(<ShortCodeManageAppointmentClient shortCode="Ab3xY7KpQ9" />);

    await waitFor(() => expect(screen.getByText("Hi, Katie")).toBeTruthy());
    expect(screen.getByText("Maya Studio")).toBeTruthy();
    expect(screen.getByText("Cut & Style")).toBeTruthy();
    expect(api.resolve).toHaveBeenCalledWith("Ab3xY7KpQ9");
  });

  it("uses safe copy for a valid-false response", async () => {
    api.resolve.mockResolvedValue({ valid: false, reason: "expired" });

    render(<ShortCodeManageAppointmentClient shortCode="Ab3xY7KpQ9" />);

    await waitFor(() => {
      expect(
        screen.getByText("This appointment link is no longer available."),
      ).toBeTruthy();
    });
  });

  it("cancels and refreshes the visible appointment", async () => {
    api.resolve.mockResolvedValue({ valid: true });
    api.normalize.mockReturnValue(appointment);
    api.cancel.mockResolvedValue({ ...appointment, status: "cancelled" });

    render(<ShortCodeManageAppointmentClient shortCode="Ab3xY7KpQ9" />);
    await screen.findByRole("button", { name: "Cancel appointment" });
    fireEvent.click(screen.getByRole("button", { name: "Cancel appointment" }));
    fireEvent.click(screen.getByRole("button", { name: "Yes, cancel appointment" }));

    await waitFor(() => {
      expect(api.cancel).toHaveBeenCalledWith("Ab3xY7KpQ9", "short-code");
    });
    expect(screen.getByText("Your appointment has been cancelled.")).toBeTruthy();
    expect(screen.getByText("cancelled")).toBeTruthy();
  });

  it("sends a timezone offset ISO datetime when rescheduling", async () => {
    api.resolve.mockResolvedValue({ valid: true });
    api.normalize.mockReturnValue(appointment);
    api.reschedule.mockResolvedValue({ ...appointment, appointment_date: "2026-09-13T14:30:00-06:00" });

    render(<ShortCodeManageAppointmentClient shortCode="Ab3xY7KpQ9" />);
    await screen.findByRole("button", { name: "Reschedule appointment" });
    fireEvent.click(screen.getByRole("button", { name: "Reschedule appointment" }));
    fireEvent.change(screen.getByLabelText("New appointment date and time"), {
      target: { value: "2026-09-12T14:30" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Request new time" }));

    await waitFor(() => {
      expect(api.reschedule).toHaveBeenCalledWith("Ab3xY7KpQ9", "short-code", {
        newAppointmentDate: "2026-09-12T14:30:00-06:00",
      });
    });
  });
});
