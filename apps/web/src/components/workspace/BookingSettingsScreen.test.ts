import { describe, expect, it } from "vitest";
import { bookingRulesPatch, validateBookingPage, validateBookingRules } from "./BookingSettingsScreen";
import type { BookingRules, StylistSettingsProfile } from "@/src/lib/api";

function rules(): BookingRules {
  return {
    leadTimeHours: 2, sameDayBookingAllowed: true, sameDayBookingCutoff: "15:00", maxBookingWindowDays: 365,
    cancellationWindowHours: 24, lateCancellationFeeEnabled: true, lateCancellationFeeType: "flat", lateCancellationFeeValue: 25,
    allowCancellationAfterCutoff: false, rescheduleWindowHours: 24, maxReschedules: 2, sameDayReschedulingAllowed: false,
    preserveAppointmentHistory: true, newClientApprovalRequired: false, newClientBookingWindowDays: 30,
    restrictServicesForNewClients: true, restrictedServiceIds: ["service-1"],
  };
}

describe("booking policy helpers", () => {
  it("creates a minimal patch and preserves dependent fee values when disabled", () => {
    const baseline = rules();
    const draft = { ...baseline, lateCancellationFeeEnabled: false };
    expect(bookingRulesPatch(baseline, draft)).toEqual({ lateCancellationFeeEnabled: false });
    expect(draft.lateCancellationFeeValue).toBe(25);
    expect(draft.lateCancellationFeeType).toBe("flat");
  });

  it("allows unchanged conditional values but rejects invalid policy bounds", () => {
    expect(validateBookingRules(rules())).toBeNull();
    expect(validateBookingRules({ ...rules(), leadTimeHours: 49, maxBookingWindowDays: 2 })).toMatch(/cannot exceed/);
    expect(validateBookingRules({ ...rules(), sameDayBookingCutoff: "25:00" })).toMatch(/valid time/);
  });
});

describe("booking page validation", () => {
  const profile: StylistSettingsProfile = {
    id: "booking-1", user_id: "user-1", slug: "maya-hair", display_name: "Maya Hair", bio: null, intro: null, intro_description: null, instagram: null, cover_photo_url: null,
    booking_enabled: true, booking_request_form_enabled: true, booking_request_form_questions: null, intelligent_scheduling_enabled: true, created_at: "2026-01-01", updated_at: "2026-01-01",
  };
  const prompts = { desired_outcome: "What would you like?", hair_history: "Tell us your history.", optional_photos: "Optional photos" };

  it("validates the public link, cover URL, and fixed inquiry prompts", () => {
    expect(validateBookingPage(profile, prompts)).toBeNull();
    expect(validateBookingPage({ ...profile, slug: "Maya Hair" }, prompts)).toMatch(/lowercase/);
    expect(validateBookingPage({ ...profile, cover_photo_url: "not-a-url" }, prompts)).toMatch(/valid URL/);
    expect(validateBookingPage(profile, { ...prompts, hair_history: "" })).toMatch(/hair history/);
  });
});
