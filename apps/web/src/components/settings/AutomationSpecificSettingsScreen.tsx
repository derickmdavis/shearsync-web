"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  getBirthdayReminderSettings,
  getRebookNudgeSettings,
  getThankYouEmailSettings,
  previewRebookNudgeSettings,
  previewThankYouEmailSettings,
  updateBirthdayReminderSettings,
  updateRebookNudgeSettings,
  updateThankYouEmailSettings,
  type EmailCopyPreview,
  type RebookNudgeSettings,
  type RebookNudgeUpdate,
  type ThankYouEmailSettings,
  type ThankYouEmailUpdate,
  type BirthdayReminderSettings,
} from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "@/src/components/workspace/WorkspaceShell";

type EmailKind = "rebook" | "thank-you";
type EmailSettings = RebookNudgeSettings | ThankYouEmailSettings;
type CopyField = "subjectTemplate" | "greeting" | "customMessageBlock";

const copyFields: ReadonlyArray<CopyField> = ["subjectTemplate", "greeting", "customMessageBlock"];

function problem(error: unknown) {
  return error instanceof Error && error.message ? error.message : "Unable to update these automation settings. Try again.";
}

function copyPatch(baseline: EmailSettings, draft: EmailSettings) {
  const patch: Record<string, unknown> = {};
  for (const field of copyFields) if (draft[field] !== baseline[field]) patch[field] = draft[field];
  if ("defaultRebookIntervalDays" in draft && draft.defaultRebookIntervalDays !== (baseline as RebookNudgeSettings).defaultRebookIntervalDays) patch.defaultRebookIntervalDays = draft.defaultRebookIntervalDays;
  if ("sendDelayHours" in draft && draft.sendDelayHours !== (baseline as ThankYouEmailSettings).sendDelayHours) patch.sendDelayHours = draft.sendDelayHours;
  if (draft.approvalRequired !== baseline.approvalRequired) patch.approvalRequired = draft.approvalRequired;
  return patch;
}

function validateEmailSettings(kind: EmailKind, draft: EmailSettings) {
  const cadence = kind === "rebook" ? (draft as RebookNudgeSettings).defaultRebookIntervalDays : (draft as ThankYouEmailSettings).sendDelayHours;
  const [minimum, maximum, name] = kind === "rebook" ? [1, 730, "Rebook interval"] : [0, 720, "Send delay"];
  if (!Number.isInteger(cadence) || cadence < minimum || cadence > maximum) return `${name} must be a whole number from ${minimum} to ${maximum}.`;
  if (draft.subjectTemplate && draft.subjectTemplate.length > 160) return "Subject must be 160 characters or fewer.";
  if (draft.customMessageBlock && draft.customMessageBlock.length > 4000) return "Custom message must be 4,000 characters or fewer.";
  return null;
}

function details(kind: EmailKind) {
  return kind === "rebook"
    ? { title: "Rebook nudges", subtitle: "Choose how and when clients receive rebooking reminders.", cadence: "Default rebook interval (days)", description: "This changes the content and approval behavior only. The master automation switch and operational queue stay in Automations." }
    : { title: "Thank-you emails", subtitle: "Choose the approval behavior, timing, and copy for post-appointment thanks.", cadence: "Send delay (hours)", description: "This changes the content and approval behavior only. The master automation switch and operational queue stay in Automations." };
}

export function EmailAutomationSettingsScreen({ kind }: { kind: EmailKind }) {
  const copy = details(kind);
  const [baseline, setBaseline] = useState<EmailSettings | null>(null);
  const [draft, setDraft] = useState<EmailSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [preview, setPreview] = useState<EmailCopyPreview | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void withActiveAccount<EmailSettings>((token) => kind === "rebook" ? getRebookNudgeSettings(token) : getThankYouEmailSettings(token)).then((settings) => {
      if (!active) return;
      setBaseline(settings); setDraft(settings); setNotice(null);
    }).catch((error) => { if (active) setNotice(problem(error)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [kind]);

  function update(field: CopyField, value: string) {
    setDraft((current) => current ? { ...current, [field]: field === "subjectTemplate" || field === "customMessageBlock" ? value || null : value } as EmailSettings : current);
    setNotice(null);
  }

  function insertToken(token: string, field: CopyField) {
    const placeholder = token.startsWith("{{") ? token : `{{${token}}}`;
    setDraft((current) => current ? { ...current, [field]: `${current[field] ?? ""}${placeholder}` } as EmailSettings : current);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!baseline || !draft) return;
    const invalid = validateEmailSettings(kind, draft);
    if (invalid) { setNotice(invalid); return; }
    const patch = copyPatch(baseline, draft);
    if (!Object.keys(patch).length) { setNotice("No changes to save."); return; }
    setSaving(true); setNotice(null);
    try {
      const saved = await withActiveAccount<EmailSettings>((token) => kind === "rebook"
        ? updateRebookNudgeSettings(token, patch as RebookNudgeUpdate)
        : updateThankYouEmailSettings(token, patch as ThankYouEmailUpdate));
      setBaseline(saved); setDraft(saved); setNotice("Automation settings saved.");
    } catch (error) { setNotice(problem(error)); } finally { setSaving(false); }
  }

  async function requestPreview() {
    if (!draft) return;
    const invalid = validateEmailSettings(kind, draft);
    if (invalid) { setNotice(invalid); return; }
    setPreviewing(true); setNotice(null);
    try {
      const previewRequest = kind === "rebook" ? previewRebookNudgeSettings : previewThankYouEmailSettings;
      const result = await withActiveAccount((token) => previewRequest(token, {
        subjectTemplate: draft.subjectTemplate,
        greeting: draft.greeting,
        customMessageBlock: draft.customMessageBlock,
      }));
      setPreview(result);
    } catch (error) { setNotice(problem(error)); } finally { setPreviewing(false); }
  }

  const cadence = draft ? (kind === "rebook" ? (draft as RebookNudgeSettings).defaultRebookIntervalDays : (draft as ThankYouEmailSettings).sendDelayHours) : 0;
  return <WorkspaceShell active="settings"><section className={styles.settingsContent}>
    <PageHeading title={copy.title} subtitle={copy.subtitle} />
    <p className={styles.servicesMessage}>{copy.description} <Link href="/settings/automations">View automation overview</Link></p>
    {notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}
    {loading ? <section className={styles.servicesPanel}>Loading settings…</section> : null}
    {!loading && !draft ? <section className={styles.servicesPanel} role="alert"><p>Settings could not load.</p><button className={styles.secondaryButton} type="button" onClick={() => window.location.reload()}>Try again</button></section> : null}
    {draft ? <form className={styles.servicesPanel} onSubmit={(event) => void save(event)}>
      <label className={styles.serviceToggle}><input type="checkbox" checked={draft.approvalRequired} onChange={(event) => setDraft({ ...draft, approvalRequired: event.target.checked })} /> Require approval before sending</label>
      <label>{copy.cadence}<input type="number" min={kind === "rebook" ? 1 : 0} max={kind === "rebook" ? 730 : 720} step="1" value={cadence} onChange={(event) => setDraft(kind === "rebook" ? { ...draft, defaultRebookIntervalDays: Number(event.target.value) } as RebookNudgeSettings : { ...draft, sendDelayHours: Number(event.target.value) } as ThankYouEmailSettings)} /></label>
      <label>Subject <small>Optional · 160 characters maximum</small><input value={draft.subjectTemplate ?? ""} maxLength={160} onChange={(event) => update("subjectTemplate", event.target.value)} /></label>
      <label>Greeting<textarea value={draft.greeting} onChange={(event) => update("greeting", event.target.value)} /></label>
      <label>Custom message <small>Optional · 4,000 characters maximum</small><textarea maxLength={4000} value={draft.customMessageBlock ?? ""} onChange={(event) => update("customMessageBlock", event.target.value)} /></label>
      <fieldset><legend>Personalization tokens</legend><p>Tokens come from the automation service and are inserted into the custom message.</p><div className={styles.saveRow}>{draft.availableTokens.map((token) => <button className={styles.secondaryButton} type="button" key={token} onClick={() => insertToken(token, "customMessageBlock")}>{token.startsWith("{{") ? token : `{{${token}}}`}</button>)}</div></fieldset>
      <div className={styles.saveRow}><button className={styles.secondaryButton} type="button" disabled={previewing || saving} onClick={() => void requestPreview()}>{previewing ? "Rendering preview…" : "Preview email"}</button><button className={styles.primaryButton} disabled={saving}>{saving ? "Saving…" : "Save settings"}</button></div>
    </form> : null}
    {preview ? <section className={styles.servicesPanel} aria-label="Email preview"><h2>Server preview</h2><p><b>Subject</b><br />{preview.subject}</p><p><b>Plain text</b><br />{preview.text}</p><iframe title="Rendered email preview" sandbox="" srcDoc={preview.html} style={{ width: "100%", minHeight: 320, border: "1px solid #ead9c0", borderRadius: 8, background: "#fff" }} /></section> : null}
  </section></WorkspaceShell>;
}

export function BirthdayReminderSettingsScreen() {
  const [baseline, setBaseline] = useState<BirthdayReminderSettings | null>(null);
  const [draft, setDraft] = useState<BirthdayReminderSettings | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { let active = true; void withActiveAccount((token) => getBirthdayReminderSettings(token)).then((settings) => { if (active) { setBaseline(settings); setDraft(settings); } }).catch((error) => { if (active) setNotice(problem(error)); }); return () => { active = false; }; }, []);
  async function save() {
    if (!baseline || !draft || baseline.approvalRequired === draft.approvalRequired) { setNotice("No changes to save."); return; }
    setSaving(true); setNotice(null);
    try { const saved = await withActiveAccount((token) => updateBirthdayReminderSettings(token, { approvalRequired: draft.approvalRequired })); setBaseline(saved); setDraft(saved); setNotice("Birthday reminder setting saved."); } catch (error) { setNotice(problem(error)); } finally { setSaving(false); }
  }
  return <WorkspaceShell active="settings"><section className={styles.settingsContent}><PageHeading title="Birthday reminders" subtitle="Choose whether birthday messages require approval before sending." /><p className={styles.servicesMessage}>This setting does not enable the birthday automation or manage its operational queue. <Link href="/settings/automations">View automation overview</Link></p>{notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}{!draft ? <section className={styles.servicesPanel}>{notice ? "Settings could not load." : "Loading settings…"}</section> : <section className={styles.servicesPanel}><p>{draft.configured ? "Birthday message content is configured." : "Birthday message content has not been configured yet."}</p><label className={styles.serviceToggle}><input type="checkbox" checked={draft.approvalRequired} onChange={(event) => setDraft({ ...draft, approvalRequired: event.target.checked })} /> Require approval before sending birthday reminders</label><button className={styles.primaryButton} type="button" disabled={saving} onClick={() => void save()}>{saving ? "Saving…" : "Save setting"}</button></section>}</section></WorkspaceShell>;
}
