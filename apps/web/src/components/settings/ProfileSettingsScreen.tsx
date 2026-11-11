"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  ApiError,
  getAccountProfile,
  updateAccountProfile,
  type AccountProfile,
  type AccountProfileUpdate,
  type BusinessLocation,
} from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { useSettingsResource } from "@/src/lib/settings/resource-state";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "@/src/components/workspace/WorkspaceShell";

type FormLocation = Omit<BusinessLocation, "name" | "address_line_2" | "region" | "postal_code" | "country_code"> & Pick<BusinessLocation, "name" | "address_line_2" | "region" | "postal_code" | "country_code">;
const emptyLocation: FormLocation = { name: "", address_line_1: "", address_line_2: "", city: "", region: "", postal_code: "", country_code: "" };

function formLocation(location: BusinessLocation | null): FormLocation {
  return location ? { ...location } : emptyLocation;
}

function normalizedLocation(location: FormLocation): BusinessLocation | null {
  const value = Object.fromEntries(Object.entries(location).map(([key, field]) => [key, field?.trim() || null])) as Record<keyof BusinessLocation, string | null>;
  const hasAnyValue = Object.values(value).some(Boolean);
  if (!hasAnyValue) return null;
  return {
    name: value.name,
    address_line_1: value.address_line_1 ?? "",
    address_line_2: value.address_line_2,
    city: value.city ?? "",
    region: value.region,
    postal_code: value.postal_code,
    country_code: value.country_code?.toUpperCase() ?? null,
  };
}

function same(left: unknown, right: unknown) { return JSON.stringify(left) === JSON.stringify(right); }

function validationError(draft: AccountProfile, location: FormLocation) {
  const fullName = draft.full_name?.trim() ?? "";
  if (fullName && fullName.length > 160) return "Your name must be 160 characters or fewer.";
  if (draft.business_name && draft.business_name.trim().length > 180) return "Business name must be 180 characters or fewer.";
  if (draft.phone_number?.trim() && !/^\+[1-9]\d{1,14}$/.test(draft.phone_number.trim())) return "Phone number must use E.164 format, for example +13035551212.";
  if (draft.avatar_image_id && draft.avatar_image_id.length > 255) return "Avatar image ID must be 255 characters or fewer.";
  if (draft.timezone) try { Intl.DateTimeFormat(undefined, { timeZone: draft.timezone }); } catch { return "Choose a valid IANA timezone."; }
  const nextLocation = normalizedLocation(location);
  if (nextLocation) {
    if (!nextLocation.address_line_1 || !nextLocation.city) return "Street address and city are required for a business location.";
    const limits: Array<[string | null, number, string]> = [[nextLocation.name, 120, "Location name"], [nextLocation.address_line_1, 160, "Street address"], [nextLocation.address_line_2, 160, "Address line 2"], [nextLocation.city, 120, "City"], [nextLocation.region, 120, "Region"], [nextLocation.postal_code, 32, "Postal code"]];
    const invalid = limits.find(([value, limit]) => Boolean(value && value.length > limit));
    if (invalid) return `${invalid[2]} is too long.`;
    if (nextLocation.country_code && !/^[A-Z]{2}$/.test(nextLocation.country_code)) return "Country code must contain two letters.";
  }
  return null;
}

function patchFor(baseline: AccountProfile, draft: AccountProfile, location: FormLocation): AccountProfileUpdate {
  const patch: AccountProfileUpdate = {};
  const textFields: Array<keyof Pick<AccountProfile, "full_name" | "phone_number" | "business_name" | "timezone">> = ["full_name", "phone_number", "business_name", "timezone"];
  for (const field of textFields) {
    const value = draft[field]?.trim() || null;
    if (value !== baseline[field]) patch[field] = value;
  }
  const avatar = draft.avatar_image_id?.trim() ?? "";
  if (avatar !== (baseline.avatar_image_id ?? "")) patch.avatar_image_id = avatar;
  if (draft.waitlist_enabled !== baseline.waitlist_enabled) patch.waitlist_enabled = draft.waitlist_enabled;
  if (draft.client_formulas_tab_enabled !== baseline.client_formulas_tab_enabled) patch.client_formulas_tab_enabled = draft.client_formulas_tab_enabled;
  const nextLocation = normalizedLocation(location);
  if (!same(nextLocation, baseline.location)) patch.location = nextLocation;
  return patch;
}

function errorMessage(error: unknown) {
  if (error instanceof ApiError) return error.status === 403 ? "You no longer have access to these settings." : error.message || "Unable to save profile changes.";
  return "Unable to save profile changes. Try again.";
}

export function ProfileSettingsScreen() {
  const resource = useSettingsResource<AccountProfile>();
  const { replaceBaseline } = resource;
  const [location, setLocation] = useState<FormLocation>(emptyLocation);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [notice, setNotice] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    let active = true;
    void withActiveAccount((token) => getAccountProfile(token)).then((profile) => {
      if (!active) return;
      const normalizedProfile = {
        ...profile,
        waitlist_enabled: profile.waitlist_enabled ?? false,
        client_formulas_tab_enabled: profile.client_formulas_tab_enabled ?? true,
      };
      replaceBaseline(normalizedProfile);
      setLocation(formLocation(normalizedProfile.location));
      setState("ready");
    }).catch((error) => {
      if (!active) return;
      setNotice(errorMessage(error));
      setState("error");
    });
    return () => { active = false; };
  }, [replaceBaseline]);

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!resource.draft || !resource.baseline) return;
    const invalid = validationError(resource.draft, location);
    if (invalid) { setNotice(invalid); return; }
    const patch = patchFor(resource.baseline, resource.draft, location);
    if (!Object.keys(patch).length) { setNotice("No profile changes to save."); return; }
    const saved = await resource.save((draft, baseline) => withActiveAccount((token) => updateAccountProfile(token, patchFor(baseline, draft, location))));
    if (!saved) { setNotice(resource.error || "Unable to save profile changes."); return; }
    setLocation(formLocation(saved.location));
    setConfirmClear(false);
    setNotice("Profile saved.");
    window.dispatchEvent(new Event("rootfoil:profile-settings-changed"));
  }

  const draft = resource.draft;
  return <WorkspaceShell active="settings"><section className={styles.businessSettings}><PageHeading title="Profile" subtitle="Manage your business information, location, and preferences." />
    {notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}
    {resource.error ? <p className={styles.servicesMessage} role="alert">{resource.error}</p> : null}
    {state === "loading" ? <section className={styles.clientsStatus}>Loading profile…</section> : null}
    {state === "error" ? <section className={styles.clientsStatus}><p>{notice}</p><button className={styles.secondaryButton} type="button" onClick={() => window.location.reload()}>Try again</button></section> : null}
    {state === "ready" && draft ? <form className={styles.settingsForm} onSubmit={(event) => void save(event)}>
      <label>Business name<input value={draft.business_name ?? ""} maxLength={180} onChange={(event) => resource.updateDraft((value) => ({ ...value, business_name: event.target.value }))} /></label>
      <label>Your name<input value={draft.full_name ?? ""} maxLength={160} onChange={(event) => resource.updateDraft((value) => ({ ...value, full_name: event.target.value }))} /></label>
      <label>Phone <small>Use E.164 format, e.g. +13035551212</small><input value={draft.phone_number ?? ""} onChange={(event) => resource.updateDraft((value) => ({ ...value, phone_number: event.target.value }))} /></label>
      <label>Timezone<input value={draft.timezone ?? ""} onChange={(event) => resource.updateDraft((value) => ({ ...value, timezone: event.target.value }))} /></label>
      <label>Avatar image ID <small>Leave blank to remove it.</small><input value={draft.avatar_image_id ?? ""} maxLength={255} onChange={(event) => resource.updateDraft((value) => ({ ...value, avatar_image_id: event.target.value }))} /></label>
      <fieldset><legend>Business location</legend>
        <label>Location name<input value={location.name ?? ""} maxLength={120} onChange={(event) => setLocation((value) => ({ ...value, name: event.target.value }))} /></label>
        <label>Street address<input value={location.address_line_1} maxLength={160} onChange={(event) => setLocation((value) => ({ ...value, address_line_1: event.target.value }))} /></label>
        <label>Address line 2<input value={location.address_line_2 ?? ""} maxLength={160} onChange={(event) => setLocation((value) => ({ ...value, address_line_2: event.target.value }))} /></label>
        <label>City<input value={location.city} maxLength={120} onChange={(event) => setLocation((value) => ({ ...value, city: event.target.value }))} /></label>
        <label>Region<input value={location.region ?? ""} maxLength={120} onChange={(event) => setLocation((value) => ({ ...value, region: event.target.value }))} /></label>
        <label>Postal code<input value={location.postal_code ?? ""} maxLength={32} onChange={(event) => setLocation((value) => ({ ...value, postal_code: event.target.value }))} /></label>
        <label>Country code<input value={location.country_code ?? ""} maxLength={2} onChange={(event) => setLocation((value) => ({ ...value, country_code: event.target.value }))} /></label>
        {draft.location ? !confirmClear ? <button className={styles.secondaryButton} type="button" onClick={() => setConfirmClear(true)}>Clear business location</button> : <span><p>Clear this full address on save?</p><button className={styles.secondaryButton} type="button" onClick={() => { setLocation(emptyLocation); setConfirmClear(false); }}>Confirm clear location</button><button className={styles.secondaryButton} type="button" onClick={() => setConfirmClear(false)}>Keep location</button></span> : null}
      </fieldset>
      <label className={styles.serviceToggle}><input type="checkbox" checked={draft.waitlist_enabled} onChange={(event) => resource.updateDraft((value) => ({ ...value, waitlist_enabled: event.target.checked }))} /> Enable waitlist</label>
      <label className={styles.serviceToggle}><input type="checkbox" checked={draft.client_formulas_tab_enabled} onChange={(event) => resource.updateDraft((value) => ({ ...value, client_formulas_tab_enabled: event.target.checked }))} /> Show Formulas tab in client details</label>
      <button className={styles.primaryButton} disabled={resource.saving}>{resource.saving ? "Saving…" : "Save profile"}</button>
    </form> : null}
  </section></WorkspaceShell>;
}
