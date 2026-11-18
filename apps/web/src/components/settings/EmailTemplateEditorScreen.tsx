"use client";

import { AutomationDetailShell, AutomationServerPreviewPanel } from "@/src/components/automations";
import type { EmailTemplateKey } from "@/src/lib/api";
import { workspaceStyles } from "@/src/components/workspace/WorkspaceShell";
import { useSimpleEmailTemplateEditor } from "./useSimpleEmailTemplateEditor";
import styles from "./email-template-editor.module.css";

const labels: Record<EmailTemplateKey, string> = { booking_confirmation: "Booking confirmations", appointment_reminder: "Appointment reminders", rebook_nudge: "Rebook nudges", thank_you: "Thank You Emails", birthday: "Birthday Notes" };
const subtitles: Record<EmailTemplateKey, string> = { booking_confirmation: "Choose channels and personalize the confirmation email.", appointment_reminder: "Choose channels, timing, and reminder copy.", rebook_nudge: "Configure timing, text, and approval rules.", thank_you: "Configure review behavior and email copy.", birthday: "Configure review behavior and birthday email copy." };

export function SimpleEmailTemplateNotePanel({ editor, onInteraction }: { editor: ReturnType<typeof useSimpleEmailTemplateEditor>; onInteraction?: () => void }) {
  if (editor.state !== "ready" || !editor.template) return null;
  return <section className={`${workspaceStyles.servicesPanel} ${styles.editorCard}`}><header><div><h2>Personal note <span>Optional</span></h2><p>Add a warm note to the server-managed email layout. It is never required to send this automation.</p></div><small>{editor.noteLength.toLocaleString()} / 2,000</small></header>{editor.currentMode && editor.currentMode !== "simple" ? <p className={styles.modeNotice}>Advanced content remains unchanged until you save this Simple note.</p> : null}<label htmlFor="simple-template-notes">Personal note<textarea id="simple-template-notes" maxLength={2000} value={editor.draft} disabled={editor.busy} onChange={(event) => { onInteraction?.(); editor.changeDraft(event.target.value); }} placeholder="Add a warm, personal note for your client (optional)" /></label><footer><button className={workspaceStyles.secondaryButton} type="button" disabled={editor.busy} onClick={() => { onInteraction?.(); void editor.requestPreview(); }}>{editor.previewing ? "Rendering preview…" : "Preview"}</button><button className={workspaceStyles.primaryButton} type="button" disabled={editor.busy || editor.noteLength > 2000} onClick={() => { onInteraction?.(); void editor.save(); }}>{editor.saving ? "Saving…" : "Save personal note"}</button></footer></section>;
}

export function EmailTemplateEditorScreen({ templateKey }: { templateKey: EmailTemplateKey }) {
  const editor = useSimpleEmailTemplateEditor(templateKey);
  return <AutomationDetailShell title={labels[templateKey]} subtitle={subtitles[templateKey]} backHref="/messages" backLabel="Messages" state={editor.state} onRetry={editor.retry} notice={editor.notice} dirty={editor.dirty} preview={<AutomationServerPreviewPanel title="Sample template" preview={editor.preview} loading={editor.previewing} sample={<div className={styles.sampleTemplate}><p>Simple template</p><h3>{labels[templateKey]}</h3><span>The server renders the final layout with your optional personal note.</span></div>} />} optionalContent={<p className={styles.templateFootnote}>The email layout, appointment details, and required footer are managed by the delivery service.</p>}>
    <SimpleEmailTemplateNotePanel editor={editor} />
  </AutomationDetailShell>;
}
