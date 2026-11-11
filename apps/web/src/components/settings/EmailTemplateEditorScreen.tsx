"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getEmailTemplate,
  previewAdvancedEmailTemplate,
  previewEmailTemplate,
  previewSimpleEmailTemplate,
  resetEmailTemplate,
  updateAdvancedEmailTemplate,
  updateEmailTemplate,
  updateEmailTemplateMode,
  updateSimpleEmailTemplate,
  type EmailCopyPreview,
  type EmailTemplate,
  type EmailTemplateKey,
} from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "@/src/components/workspace/WorkspaceShell";

type EditorMode = "simple" | "advanced";
type ContentDraft = { subject: string; body: string };

const labels: Record<EmailTemplateKey, string> = {
  booking_confirmation: "Booking confirmation", appointment_reminder: "Appointment reminder", rebook_nudge: "Rebook nudge", thank_you: "Thank-you email", birthday: "Birthday reminder",
};

function isModeTemplate(key: EmailTemplateKey): key is "booking_confirmation" | "appointment_reminder" {
  return key === "booking_confirmation" || key === "appointment_reminder";
}

function message(error: unknown) { return error instanceof Error && error.message ? error.message : "Unable to update this email template. Try again."; }
function contentFrom(template: EmailTemplate): ContentDraft { return { subject: template.subject ?? "", body: template.body ?? "" }; }
function simpleFrom(template: EmailTemplate) {
  const record = template as Record<string, unknown>;
  const nested = record.simple && typeof record.simple === "object" ? record.simple as Record<string, unknown> : {};
  return typeof nested.notes === "string" ? nested.notes : typeof record.notes === "string" ? record.notes : "";
}
function validateContent(draft: ContentDraft) {
  if (!draft.subject.trim() || !draft.body.trim()) return "Subject and message are required.";
  if (draft.subject.length > 160) return "Subject must be 160 characters or fewer.";
  if (draft.body.length > 4000) return "Message must be 4,000 characters or fewer.";
  return null;
}
function normalizeNotes(notes: string) { return notes.replace(/\r\n?/g, "\n").trim() || null; }

export function EmailTemplateEditorScreen({ templateKey }: { templateKey: EmailTemplateKey }) {
  const supportsModes = isModeTemplate(templateKey);
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [advancedDraft, setAdvancedDraft] = useState<ContentDraft>({ subject: "", body: "" });
  const [simpleDraft, setSimpleDraft] = useState("");
  const [editorMode, setEditorMode] = useState<EditorMode>("advanced");
  const [preview, setPreview] = useState<EmailCopyPreview | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [activating, setActivating] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    let active = true;
    void withActiveAccount((token) => getEmailTemplate(token, templateKey)).then((value) => {
      if (!active) return;
      setTemplate(value); setAdvancedDraft(contentFrom(value)); setSimpleDraft(simpleFrom(value));
      if (supportsModes && value.configuration?.mode) setEditorMode(value.configuration.mode);
    }).catch((error) => { if (active) setNotice(message(error)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [supportsModes, templateKey]);

  function insertVariable(variable: string) { setAdvancedDraft((draft) => ({ ...draft, body: `${draft.body}${variable}` })); }

  async function save() {
    if (!template) return;
    if (supportsModes && editorMode === "simple") {
      const notes = normalizeNotes(simpleDraft);
      if (simpleDraft.length > 2000) { setNotice("Simple notes must be 2,000 characters or fewer."); return; }
      setSaving(true); setNotice(null);
      try { const saved = await withActiveAccount((token) => updateSimpleEmailTemplate(token, templateKey, { notes })); setTemplate(saved); setSimpleDraft(simpleFrom(saved) || notes || ""); setNotice("Simple template saved."); } catch (error) { setNotice(message(error)); } finally { setSaving(false); }
      return;
    }
    const invalid = validateContent(advancedDraft);
    if (invalid) { setNotice(invalid); return; }
    setSaving(true); setNotice(null);
    try {
      const saved = await withActiveAccount((token) => supportsModes ? updateAdvancedEmailTemplate(token, templateKey, advancedDraft) : updateEmailTemplate(token, templateKey, advancedDraft));
      setTemplate(saved); setAdvancedDraft(contentFrom(saved)); setNotice("Template saved.");
    } catch (error) { setNotice(message(error)); } finally { setSaving(false); }
  }

  async function requestPreview() {
    if (!template) return;
    if (supportsModes && editorMode === "simple") {
      if (simpleDraft.length > 2000) { setNotice("Simple notes must be 2,000 characters or fewer."); return; }
      setPreviewing(true); setNotice(null);
      try { setPreview(await withActiveAccount((token) => previewSimpleEmailTemplate(token, templateKey, { notes: normalizeNotes(simpleDraft) }))); } catch (error) { setNotice(message(error)); } finally { setPreviewing(false); }
      return;
    }
    const invalid = validateContent(advancedDraft);
    if (invalid) { setNotice(invalid); return; }
    setPreviewing(true); setNotice(null);
    try { setPreview(await withActiveAccount((token) => supportsModes ? previewAdvancedEmailTemplate(token, templateKey, advancedDraft) : previewEmailTemplate(token, templateKey, advancedDraft))); } catch (error) { setNotice(message(error)); } finally { setPreviewing(false); }
  }

  async function activate(mode: EditorMode) {
    if (!supportsModes) return;
    setActivating(true); setNotice(null);
    try { const saved = await withActiveAccount((token) => updateEmailTemplateMode(token, templateKey, mode)); setTemplate(saved); setNotice(`${mode === "simple" ? "Simple" : "Advanced"} delivery mode is now active.`); } catch (error) { setNotice(message(error)); } finally { setActivating(false); }
  }

  async function reset() {
    if (!template) return;
    setSaving(true); setNotice(null);
    try {
      const saved = await withActiveAccount((token) => resetEmailTemplate(token, templateKey));
      setTemplate(saved); setAdvancedDraft(contentFrom(saved)); setSimpleDraft(simpleFrom(saved)); setPreview(null); setConfirmReset(false); setNotice("Template restored to the server default.");
    } catch (error) { setNotice(message(error)); } finally { setSaving(false); }
  }

  const liveMode = template?.configuration?.mode;
  return <WorkspaceShell active="settings"><section className={styles.settingsContent}>
    <PageHeading title={labels[templateKey]} subtitle="Edit the email content that the automation service delivers." />
    <p className={styles.servicesMessage}>Templates are independent from automation master switches and queues. <Link href="/settings/automations">View automation overview</Link></p>
    {notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}
    {loading ? <section className={styles.servicesPanel}>Loading template…</section> : null}
    {!loading && !template ? <section className={styles.servicesPanel} role="alert"><p>Template could not load.</p><button className={styles.secondaryButton} type="button" onClick={() => window.location.reload()}>Try again</button></section> : null}
    {template ? <section className={styles.servicesPanel}>
      <p>Source: {template.source ?? "server default"}{template.defaultVersion ? ` · Default version ${template.defaultVersion}` : ""}</p>
      {supportsModes ? <><p>Live delivery mode: <b>{liveMode ?? "unknown"}</b>. Selecting an editor tab does not change delivery.</p><div className={styles.saveRow}><button className={editorMode === "simple" ? styles.primaryButton : styles.secondaryButton} type="button" onClick={() => setEditorMode("simple")}>Simple editor</button><button className={editorMode === "advanced" ? styles.primaryButton : styles.secondaryButton} type="button" onClick={() => setEditorMode("advanced")}>Advanced editor</button></div>{liveMode !== editorMode ? <button className={styles.secondaryButton} type="button" disabled={activating} onClick={() => void activate(editorMode)}>{activating ? "Activating…" : `Activate ${editorMode} delivery mode`}</button> : null}</> : null}
      {(!supportsModes || editorMode === "advanced") ? <><label>Subject<input maxLength={160} value={advancedDraft.subject} onChange={(event) => setAdvancedDraft({ ...advancedDraft, subject: event.target.value })} /></label><label>Message<textarea maxLength={4000} value={advancedDraft.body} onChange={(event) => setAdvancedDraft({ ...advancedDraft, body: event.target.value })} /></label><fieldset><legend>Variables</legend><p>Variables are supplied by the template service and are inserted unchanged into the message.</p><div className={styles.saveRow}>{template.allowedVariables.map((variable) => <button className={styles.secondaryButton} type="button" key={variable} onClick={() => insertVariable(variable)}>{variable}</button>)}</div></fieldset></> : <label>Simple notes <small>Optional · 2,000 characters maximum. The server renders the final layout.</small><textarea maxLength={2000} value={simpleDraft} onChange={(event) => setSimpleDraft(event.target.value)} /></label>}
      <div className={styles.saveRow}><button className={styles.secondaryButton} type="button" disabled={saving || previewing} onClick={() => void requestPreview()}>{previewing ? "Rendering preview…" : "Preview"}</button><button className={styles.primaryButton} type="button" disabled={saving || previewing} onClick={() => void save()}>{saving ? "Saving…" : "Save template"}</button><button className={styles.secondaryButton} type="button" disabled={saving} onClick={() => setConfirmReset(true)}>Reset to default</button></div>
      {confirmReset ? <section role="alert"><p>Reset this template to the server default? This replaces the current editor drafts.</p><button className={styles.primaryButton} type="button" disabled={saving} onClick={() => void reset()}>Confirm reset</button><button className={styles.secondaryButton} type="button" disabled={saving} onClick={() => setConfirmReset(false)}>Cancel</button></section> : null}
    </section> : null}
    {preview ? <section className={styles.servicesPanel} aria-label="Email preview"><h2>Server preview</h2><p><b>Subject</b><br />{preview.subject}</p><p><b>Plain text</b><br />{preview.text}</p><iframe title="Rendered email preview" sandbox="" srcDoc={preview.html} style={{ width: "100%", minHeight: 320, border: "1px solid #ead9c0", borderRadius: 8, background: "#fff" }} /></section> : null}
  </section></WorkspaceShell>;
}
