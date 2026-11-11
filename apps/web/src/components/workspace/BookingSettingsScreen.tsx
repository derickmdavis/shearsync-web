"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  ApiError,
  createBookingPreviewSession,
  getBookingRules,
  getServices,
  getStylistSettingsProfile,
  updateBookingRules,
  updateStylistSettingsProfile,
  type BookingRules,
  type BookingInquiryPrompts,
  type StylistSettingsProfile,
  type StylistSettingsUpdate,
  type UpdateBookingRulesBody,
  type Service,
} from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { useSettingsResource } from "@/src/lib/settings/resource-state";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

type Mode = "page" | "rules";
const DEFAULT_BOOKING_INQUIRY_PROMPTS: BookingInquiryPrompts = {
  desired_outcome: "What are you hoping to achieve with your hair?",
  hair_history: "Describe your current hair and any recent coloring.",
  optional_photos: "Optional photos",
};
const ruleKeys = ["leadTimeHours", "sameDayBookingAllowed", "sameDayBookingCutoff", "maxBookingWindowDays", "cancellationWindowHours", "lateCancellationFeeEnabled", "lateCancellationFeeType", "lateCancellationFeeValue", "allowCancellationAfterCutoff", "rescheduleWindowHours", "maxReschedules", "sameDayReschedulingAllowed", "preserveAppointmentHistory", "newClientApprovalRequired", "newClientBookingWindowDays", "restrictServicesForNewClients", "restrictedServiceIds"] as const satisfies ReadonlyArray<keyof BookingRules>;

function problem(error: unknown) {
  if (error instanceof ApiError) return error.status === 403 ? "You do not have access to these booking settings." : error.message || "Unable to save booking settings.";
  return "Unable to load or save booking settings. Try again.";
}

function same(left: unknown, right: unknown) { return JSON.stringify(left) === JSON.stringify(right); }

export function bookingRulesPatch(baseline: BookingRules, draft: BookingRules): UpdateBookingRulesBody {
  return ruleKeys.reduce<UpdateBookingRulesBody>((patch, key) => {
    if (!same(baseline[key], draft[key])) patch[key] = draft[key] as never;
    return patch;
  }, {});
}

export function validateBookingRules(rules: BookingRules): string | null {
  const nonNegative = [rules.leadTimeHours, rules.cancellationWindowHours, rules.lateCancellationFeeValue, rules.rescheduleWindowHours, rules.newClientBookingWindowDays];
  if (nonNegative.some((value) => !Number.isInteger(value) || value < 0)) return "Hours, fees, and new-client windows must be nonnegative whole numbers.";
  if (!Number.isInteger(rules.maxBookingWindowDays) || rules.maxBookingWindowDays <= 0) return "Booking horizon must be a positive whole number.";
  if (rules.leadTimeHours > rules.maxBookingWindowDays * 24) return "Lead time cannot exceed the booking horizon.";
  if (rules.sameDayBookingAllowed && rules.sameDayBookingCutoff && !/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(rules.sameDayBookingCutoff)) return "Same-day cutoff must be a valid time.";
  if (rules.maxReschedules !== null && rules.maxReschedules !== "unlimited" && (!Number.isInteger(rules.maxReschedules) || rules.maxReschedules < 0)) return "Maximum reschedules must be a nonnegative whole number or unlimited.";
  return null;
}

function NumberField({ label, value, onChange, min = 0, suffix }: { label: string; value: number; onChange: (value: number) => void; min?: number; suffix?: string }) {
  return <label>{label}<input type="number" min={min} step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} />{suffix ? <small>{suffix}</small> : null}</label>;
}

function trimNullable(value: string | null) { const trimmed = value?.trim() ?? ""; return trimmed || null; }

export function validateBookingPage(draft: StylistSettingsProfile, prompts: BookingInquiryPrompts): string | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug.trim()) || draft.slug.trim().length < 2 || draft.slug.trim().length > 80) return "Booking link must use 2–80 lowercase letters, numbers, and hyphens.";
  if (draft.display_name !== null && (!draft.display_name.trim() || draft.display_name.trim().length > 160)) return "Display name must contain 1–160 characters.";
  if (draft.bio && draft.bio.trim().length > 2000) return "About your business must be 2,000 characters or fewer.";
  if (draft.intro && draft.intro.trim().length > 100) return "Introduction must be 100 characters or fewer.";
  if (draft.intro_description && draft.intro_description.trim().length > 500) return "Introduction description must be 500 characters or fewer.";
  if (draft.instagram && draft.instagram.replace(/^@/, "").trim().length > 100) return "Instagram handle must be 100 characters or fewer.";
  if (draft.cover_photo_url) try { new URL(draft.cover_photo_url); } catch { return "Cover photo must be a valid URL."; }
  for (const [key, value] of Object.entries(prompts)) if (!value.trim() || [...value.trim()].length > 240) return `${key.replace(/_/g, " ")} must contain 1–240 characters.`;
  return null;
}

export function BookingSettingsScreen({ mode }: { mode: Mode }) {
  return mode === "page" ? <BookingPageSettings /> : <BookingPolicySettings />;
}

function BookingPageSettings() {
  const resource = useSettingsResource<StylistSettingsProfile>(); const { replaceBaseline } = resource;
  const [prompts, setPrompts] = useState<BookingInquiryPrompts>(DEFAULT_BOOKING_INQUIRY_PROMPTS); const [state, setState] = useState<"loading" | "ready" | "error">("loading"); const [notice, setNotice] = useState<string | null>(null); const [previewing, setPreviewing] = useState(false);
  useEffect(() => { let active = true; void withActiveAccount((token) => getStylistSettingsProfile(token)).then((value) => { if (active) { replaceBaseline(value); setPrompts(value.booking_request_form_questions ?? DEFAULT_BOOKING_INQUIRY_PROMPTS); setState("ready"); } }).catch((error) => { if (active) { setNotice(problem(error)); setState("error"); } }); return () => { active = false; }; }, [replaceBaseline]);
  const booking = resource.draft;
  function update(value: Partial<StylistSettingsProfile>) { resource.updateDraft((current) => ({ ...current, ...value })); setNotice(null); }
  function payload(draft: StylistSettingsProfile): StylistSettingsUpdate { return { slug: draft.slug.trim(), display_name: trimNullable(draft.display_name), bio: trimNullable(draft.bio), intro: trimNullable(draft.intro), intro_description: trimNullable(draft.intro_description), cover_photo_url: draft.cover_photo_url?.trim() || "", instagram: trimNullable(draft.instagram?.replace(/^@/, "") ?? null), booking_enabled: draft.booking_enabled, booking_request_form_enabled: draft.booking_request_form_enabled, booking_request_form_questions: prompts, intelligent_scheduling_enabled: draft.intelligent_scheduling_enabled }; }
  async function save(event: FormEvent) { event.preventDefault(); if (!booking) return; const invalid = validateBookingPage(booking, prompts); if (invalid) { setNotice(invalid); return; } const saved = await resource.save((draft) => withActiveAccount((token) => updateStylistSettingsProfile(token, payload(draft)))); if (saved) { setPrompts(saved.booking_request_form_questions ?? prompts); setNotice("Booking page saved."); } else setNotice(resource.error || "Unable to save booking page."); }
  async function preview() { if (!booking) return; const invalid = validateBookingPage(booking, prompts); if (invalid) { setNotice(invalid); return; } setPreviewing(true); setNotice(null); try { const session = await withActiveAccount((token) => createBookingPreviewSession(token, { slug: booking.slug.trim(), draft_overrides: { display_name: trimNullable(booking.display_name), instagram: trimNullable(booking.instagram?.replace(/^@/, "") ?? null), bio: trimNullable(booking.bio), intro: trimNullable(booking.intro), intro_description: trimNullable(booking.intro_description), booking_request_form_enabled: booking.booking_request_form_enabled, booking_request_form_questions: prompts }, client_context: { source: "web-settings", schema_version: "booking_preview_draft.v1" } })); window.open(session.preview_url, "_blank", "noopener,noreferrer"); setNotice("Preview opened in a new tab. It expires automatically and was not saved."); } catch (error) { setNotice(error instanceof ApiError && error.code === "booking_slug_unavailable" ? "That booking link is already in use. Choose another link before previewing." : problem(error)); } finally { setPreviewing(false); } }
  return <WorkspaceShell active="settings"><section className={styles.settingsContent}><PageHeading title="Booking page" subtitle="Control what clients see before they request a visit." />{notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}{resource.error ? <p className={styles.servicesMessage} role="alert">{resource.error}</p> : null}{state === "loading" ? <section className={styles.servicesPanel}><p>Loading settings…</p></section> : null}{state === "error" ? <section className={styles.servicesPanel}><p>Settings could not load.</p></section> : null}{booking ? <form className={styles.servicesPanel} onSubmit={(event) => void save(event)}><div className={styles.clientFormGrid}><label>Booking link<input value={booking.slug} onChange={(event) => update({ slug: event.target.value })} /></label><label>Display name<input value={booking.display_name ?? ""} onChange={(event) => update({ display_name: event.target.value })} /></label><label className={styles.serviceDescription}>Introduction<textarea value={booking.intro ?? ""} onChange={(event) => update({ intro: event.target.value })} /></label><label className={styles.serviceDescription}>Introduction description<textarea value={booking.intro_description ?? ""} onChange={(event) => update({ intro_description: event.target.value })} /></label><label className={styles.serviceDescription}>About your business<textarea value={booking.bio ?? ""} onChange={(event) => update({ bio: event.target.value })} /></label><label>Instagram<input value={booking.instagram ?? ""} onChange={(event) => update({ instagram: event.target.value })} /></label><label>Cover photo URL<input type="url" value={booking.cover_photo_url ?? ""} onChange={(event) => update({ cover_photo_url: event.target.value })} /></label></div><label className={styles.serviceToggle}><input type="checkbox" checked={booking.booking_enabled} onChange={(event) => update({ booking_enabled: event.target.checked })} /> Accept bookings from your public page</label><label className={styles.serviceToggle}><input type="checkbox" checked={booking.intelligent_scheduling_enabled} onChange={(event) => update({ intelligent_scheduling_enabled: event.target.checked })} /> Use intelligent slot ordering</label><label className={styles.serviceToggle}><input type="checkbox" checked={booking.booking_request_form_enabled} onChange={(event) => update({ booking_request_form_enabled: event.target.checked })} /> Require a booking request form</label><fieldset><legend>Booking inquiry questions</legend><p>Questions 1 and 2 are required long-text responses. Clients can add photos to provide more context.</p>{(["desired_outcome", "hair_history", "optional_photos"] as const).map((key, index) => <label key={key}>Question {index + 1}{index === 2 ? " (optional photos label)" : ""}<textarea value={prompts[key]} maxLength={240} onChange={(event) => setPrompts((current) => ({ ...current, [key]: event.target.value }))} /></label>)}</fieldset><div className={styles.saveRow}><button className={styles.secondaryButton} type="button" disabled={previewing || resource.saving} onClick={() => void preview()}>{previewing ? "Opening preview…" : "Preview draft"}</button><button className={styles.primaryButton} disabled={resource.saving}>{resource.saving ? "Saving…" : "Save booking page"}</button></div></form> : null}</section></WorkspaceShell>;
}

function BookingPolicySettings() {
  const resource = useSettingsResource<BookingRules>();
  const { replaceBaseline } = resource;
  const [services, setServices] = useState<Service[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => { let active = true; void withActiveAccount(async (token) => Promise.all([getBookingRules(token), getServices(token)])).then(([rules, catalog]) => { if (!active) return; replaceBaseline(rules); setServices(catalog); setState("ready"); }).catch((error) => { if (active) { setNotice(problem(error)); setState("error"); } }); return () => { active = false; }; }, [replaceBaseline]);

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!resource.draft || !resource.baseline) return;
    const invalid = validateBookingRules(resource.draft);
    if (invalid) { setNotice(invalid); return; }
    const patch = bookingRulesPatch(resource.baseline, resource.draft);
    if (!Object.keys(patch).length) { setNotice("No booking policy changes to save."); return; }
    const saved = await resource.save((draft, baseline) => withActiveAccount((token) => updateBookingRules(token, bookingRulesPatch(baseline, draft))));
    setNotice(saved ? "Booking policies saved." : resource.error || "Unable to save booking policies.");
  }

  const rules = resource.draft;
  const update = (value: Partial<BookingRules>) => resource.updateDraft((current) => ({ ...current, ...value }));
  const selected = new Set(rules?.restrictedServiceIds ?? []);
  return <WorkspaceShell active="settings"><section className={styles.settingsContent}><PageHeading title="Booking policies" subtitle="Control how, when, and which clients can book." />
    {notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}{resource.error ? <p className={styles.servicesMessage} role="alert">{resource.error}</p> : null}
    {state === "loading" ? <section className={styles.servicesPanel}><p>Loading booking policies…</p></section> : null}{state === "error" ? <section className={styles.servicesPanel}><p>{notice}</p></section> : null}
    {state === "ready" && rules ? <form className={styles.servicesPanel} onSubmit={(event) => void save(event)}>
      <h2>Booking window</h2><NumberField label="Minimum notice" value={rules.leadTimeHours} suffix="hours" onChange={(leadTimeHours) => update({ leadTimeHours })} /><NumberField label="Booking horizon" value={rules.maxBookingWindowDays} min={1} suffix="days" onChange={(maxBookingWindowDays) => update({ maxBookingWindowDays })} />
      <label className={styles.serviceToggle}><input type="checkbox" checked={rules.sameDayBookingAllowed} onChange={(event) => update({ sameDayBookingAllowed: event.target.checked })} /> Allow same-day bookings</label>
      {rules.sameDayBookingAllowed ? <label>Same-day cutoff<input type="time" value={rules.sameDayBookingCutoff ?? ""} onChange={(event) => update({ sameDayBookingCutoff: event.target.value || null })} /></label> : null}
      <h2>Cancellations</h2><NumberField label="Cancellation cutoff" value={rules.cancellationWindowHours} suffix="hours" onChange={(cancellationWindowHours) => update({ cancellationWindowHours })} /><label className={styles.serviceToggle}><input type="checkbox" checked={rules.allowCancellationAfterCutoff} onChange={(event) => update({ allowCancellationAfterCutoff: event.target.checked })} /> Allow cancellation after cutoff</label><label className={styles.serviceToggle}><input type="checkbox" checked={rules.lateCancellationFeeEnabled} onChange={(event) => update({ lateCancellationFeeEnabled: event.target.checked })} /> Charge a late cancellation fee</label>
      {rules.lateCancellationFeeEnabled ? <><label>Fee type<select value={rules.lateCancellationFeeType} onChange={(event) => update({ lateCancellationFeeType: event.target.value as BookingRules["lateCancellationFeeType"] })}><option value="flat">Flat amount</option><option value="percent">Percent</option></select></label><NumberField label="Fee value" value={rules.lateCancellationFeeValue} onChange={(lateCancellationFeeValue) => update({ lateCancellationFeeValue })} /></> : null}
      <h2>Rescheduling</h2><NumberField label="Reschedule window" value={rules.rescheduleWindowHours} suffix="hours" onChange={(rescheduleWindowHours) => update({ rescheduleWindowHours })} /><label>Maximum reschedules<select value={rules.maxReschedules === null ? "" : String(rules.maxReschedules)} onChange={(event) => { const value = event.target.value; update({ maxReschedules: value === "" ? null : value === "unlimited" ? "unlimited" : Number(value) }); }}><option value="">No limit set</option><option value="unlimited">Unlimited</option>{[0, 1, 2, 3, 4, 5].map((value) => <option value={value} key={value}>{value}</option>)}</select></label><label className={styles.serviceToggle}><input type="checkbox" checked={rules.sameDayReschedulingAllowed} onChange={(event) => update({ sameDayReschedulingAllowed: event.target.checked })} /> Allow same-day rescheduling</label>
      <h2>Client policies</h2><label className={styles.serviceToggle}><input type="checkbox" checked={rules.preserveAppointmentHistory} onChange={(event) => update({ preserveAppointmentHistory: event.target.checked })} /> Preserve appointment history</label><label className={styles.serviceToggle}><input type="checkbox" checked={rules.newClientApprovalRequired} onChange={(event) => update({ newClientApprovalRequired: event.target.checked })} /> Require approval for new clients</label><NumberField label="New-client booking window" value={rules.newClientBookingWindowDays} suffix="days" onChange={(newClientBookingWindowDays) => update({ newClientBookingWindowDays })} />
      <h2>New-client service restrictions</h2><label className={styles.serviceToggle}><input type="checkbox" checked={rules.restrictServicesForNewClients} onChange={(event) => update({ restrictServicesForNewClients: event.target.checked })} /> Restrict selected services for new clients</label>{rules.restrictServicesForNewClients ? <fieldset><legend>Unavailable to new clients</legend>{services.map((service) => <label key={service.id}><input type="checkbox" checked={selected.has(service.id)} onChange={(event) => { const next = new Set(selected); event.target.checked ? next.add(service.id) : next.delete(service.id); update({ restrictedServiceIds: [...next] }); }} /> {service.name}</label>)}</fieldset> : null}
      <div className={styles.saveRow}><button className={styles.primaryButton} disabled={resource.saving}>{resource.saving ? "Saving…" : "Save booking policies"}</button></div>
    </form> : null}</section></WorkspaceShell>;
}
