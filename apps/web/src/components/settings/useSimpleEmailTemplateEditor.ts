"use client";

import { useEffect, useRef, useState } from "react";
import { getEmailTemplate, previewSimpleEmailTemplate, updateEmailTemplateMode, updateSimpleEmailTemplate, type EmailCopyPreview, type EmailTemplate, type EmailTemplateKey } from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";

export type SimpleTemplateNotice = { tone: "success" | "warning" | "error"; message: string };

function errorMessage(error: unknown) { return error instanceof Error && error.message ? error.message : "Unable to update this email template. Try again."; }
export function normalizeNotes(notes: string) { return notes.replace(/\r\n?/g, "\n").trim() || null; }
function notesFrom(template: EmailTemplate) { return template.simple?.notes ?? (typeof template.notes === "string" ? template.notes : ""); }
function modeFrom(template: EmailTemplate) { return template.mode ?? template.configuration?.mode ?? null; }

export function useSimpleEmailTemplateEditor(templateKey: EmailTemplateKey, enabled = true) {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [draft, setDraft] = useState("");
  const [baseline, setBaseline] = useState("");
  const [preview, setPreview] = useState<EmailCopyPreview | null>(null);
  const [notice, setNotice] = useState<SimpleTemplateNotice | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const previewRequest = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    void withActiveAccount((token) => getEmailTemplate(token, templateKey)).then((value) => {
      if (!active) return;
      const notes = notesFrom(value);
      setTemplate(value); setDraft(notes); setBaseline(normalizeNotes(notes) ?? ""); setPreview(null); setNotice(null); setState("ready");
    }).catch((error) => {
      if (!active) return;
      setNotice({ tone: "error", message: errorMessage(error) }); setState("error");
    });
    return () => { active = false; };
  }, [enabled, loadAttempt, templateKey]);

  const normalizedDraft = normalizeNotes(draft);
  const noteLength = normalizedDraft?.length ?? 0;
  const dirty = (normalizedDraft ?? "") !== baseline;
  const busy = saving || previewing;
  const currentMode = template ? modeFrom(template) : null;

  function changeDraft(value: string) { previewRequest.current += 1; setDraft(value); setPreview(null); setNotice(null); }
  function retry() { setLoadAttempt((value) => value + 1); }

  async function requestPreview() {
    if (noteLength > 2000) { setNotice({ tone: "error", message: "Personal notes must be 2,000 characters or fewer." }); return; }
    const request = ++previewRequest.current;
    setPreviewing(true); setNotice(null);
    try {
      const result = await withActiveAccount((token) => previewSimpleEmailTemplate(token, templateKey, { notes: normalizedDraft }));
      if (request === previewRequest.current) setPreview(result);
    } catch (error) {
      if (request === previewRequest.current) setNotice({ tone: "error", message: errorMessage(error) });
    } finally {
      if (request === previewRequest.current) setPreviewing(false);
    }
  }

  async function save() {
    if (!template) return;
    if (noteLength > 2000) { setNotice({ tone: "error", message: "Personal notes must be 2,000 characters or fewer." }); return; }
    setSaving(true); setNotice(null);
    try {
      const saved = await withActiveAccount((token) => updateSimpleEmailTemplate(token, templateKey, { notes: normalizedDraft }));
      const savedNotes = normalizeNotes(notesFrom(saved)) ?? normalizedDraft ?? "";
      setTemplate(saved); setDraft(savedNotes); setBaseline(savedNotes);
      if (modeFrom(saved) !== "simple") {
        try {
          const activated = await withActiveAccount((token) => updateEmailTemplateMode(token, templateKey, "simple"));
          setTemplate(activated); setNotice({ tone: "success", message: "Personal note saved and Simple delivery mode is active." });
        } catch (error) {
          try { setTemplate(await withActiveAccount((token) => getEmailTemplate(token, templateKey))); } catch { /* Keep the confirmed note baseline when reconciliation is unavailable. */ }
          setNotice({ tone: "warning", message: `Your personal note was saved, but Simple delivery mode could not be activated. Reload before retrying. ${errorMessage(error)}` });
        }
      } else setNotice({ tone: "success", message: "Personal note saved." });
    } catch (error) { setNotice({ tone: "error", message: errorMessage(error) }); }
    finally { setSaving(false); }
  }

  const modeNotice = currentMode && currentMode !== "simple" ? { tone: "warning" as const, message: "This template is currently using Advanced delivery. Saving will preserve your note, then switch delivery to Simple mode." } : null;
  return { state, template, draft, noteLength, dirty, busy, saving, previewing, preview, notice: notice ?? modeNotice, currentMode, changeDraft, requestPreview, save, retry };
}
