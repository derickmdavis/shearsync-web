import { describe, expect, it } from "vitest";
import { validateAvailability } from "./BusinessSettingsScreen";
import type { AvailabilityDay } from "@/src/lib/api";

function week(): AvailabilityDay[] {
  return Array.from({ length: 7 }, (_, dayOfWeek) => ({ dayOfWeek: dayOfWeek as AvailabilityDay["dayOfWeek"], isOpen: false, windows: [] }));
}

describe("validateAvailability", () => {
  it("accepts a normalized week, including overlapping windows for different audiences", () => {
    const days = week();
    days[1] = { dayOfWeek: 1, isOpen: true, windows: [
      { startTime: "09:00", endTime: "12:00", clientAudience: "new" },
      { startTime: "09:00", endTime: "17:00", clientAudience: "returning" },
    ] };
    expect(validateAvailability(days)).toBeNull();
  });

  it("rejects open days with no window and overlapping windows for one audience", () => {
    const emptyOpen = week();
    emptyOpen[1] = { dayOfWeek: 1, isOpen: true, windows: [] };
    expect(validateAvailability(emptyOpen)).toMatch(/needs at least one/);

    const overlap = week();
    overlap[1] = { dayOfWeek: 1, isOpen: true, windows: [
      { startTime: "09:00", endTime: "12:00", clientAudience: "all" },
      { startTime: "11:00", endTime: "15:00", clientAudience: "all" },
    ] };
    expect(validateAvailability(overlap)).toMatch(/overlapping all/);
  });

  it("rejects a closed day that retains windows", () => {
    const days = week();
    days[0] = { dayOfWeek: 0, isOpen: false, windows: [{ startTime: "09:00", endTime: "10:00", clientAudience: "all" }] };
    expect(validateAvailability(days)).toMatch(/closed/);
  });
});
