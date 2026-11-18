"use client";

import { useCallback, useEffect, useState } from "react";
import { AutomationChannelSwitchGroup, AutomationDetailShell, AutomationQueueImpact, AutomationReviewModeSelector, AutomationServerPreviewPanel } from "@/src/components/automations";
import { canUpdateAutomationChannel, getAutomationBootstrap, getAutomationMutationFailure, getProjectedReturnReminderSettings, getRebookNudgeSettings, updateAutomationChannels, updateProjectedReturnReminderSettings, updateRebookNudgeSettings, type AutomationControl, type AutomationMutationFailure, type ProjectedReturnReminderSettings } from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { SimpleEmailTemplateNotePanel } from "./EmailTemplateEditorScreen";
import { useSimpleEmailTemplateEditor } from "./useSimpleEmailTemplateEditor";
import styles from "./rebook-nudges-detail.module.css";

type ResourceState = "loading" | "ready" | "error";
function errorMessage(error: unknown) { return error instanceof Error && error.message ? error.message : "Unable to update rebook nudges. Try again."; }
function validOffset(value: number) { return Number.isInteger(value) && value >= -30 && value <= 30; }

export function RebookNudgesDetailScreen() {
  const [control, setControl] = useState<AutomationControl | null>(null);
  const [state, setState] = useState<ResourceState>("loading");
  const [channelPending, setChannelPending] = useState<"email" | "sms" | null>(null);
  const [timing, setTiming] = useState<ProjectedReturnReminderSettings | null>(null);
  const [timingDraft, setTimingDraft] = useState(0);
  const [timingState, setTimingState] = useState<ResourceState>("loading");
  const [timingSaving, setTimingSaving] = useState(false);
  const [timingConflict, setTimingConflict] = useState<number | null>(null);
  const [approvalBaseline, setApprovalBaseline] = useState<boolean | null>(null);
  const [approvalDraft, setApprovalDraft] = useState<boolean | null>(null);
  const [approvalState, setApprovalState] = useState<ResourceState>("loading");
  const [approvalSaving, setApprovalSaving] = useState(false);
  const [notice, setNotice] = useState<{ tone: "success" | "warning" | "error"; message: string } | null>(null);
  const [queueImpact, setQueueImpact] = useState<{ cancelledCount: number; createdCount: number } | null>(null);
  const [savedSections, setSavedSections] = useState<string[]>([]);

  const loadControl = useCallback(async () => {
    const bootstrap = await withActiveAccount((token) => getAutomationBootstrap(token));
    const current = bootstrap.controls.find((candidate) => candidate.key === "rebook_nudges") ?? null;
    if (!current) throw new Error("Rebook nudges are not available for this account.");
    return current;
  }, []);
  const loadTiming = useCallback(async () => withActiveAccount((token) => getProjectedReturnReminderSettings(token)), []);
  const loadApproval = useCallback(async () => withActiveAccount((token) => getRebookNudgeSettings(token)), []);

  useEffect(() => { let active = true; void loadControl().then((value) => { if (active) { setControl(value); setState("ready"); } }).catch((error) => { if (active) { setNotice({ tone: "error", message: errorMessage(error) }); setState("error"); } }); return () => { active = false; }; }, [loadControl]);
  useEffect(() => { let active = true; void loadTiming().then((value) => { if (active) { setTiming(value); setTimingDraft(value.offset_days); setTimingState("ready"); } }).catch(() => { if (active) setTimingState("error"); }); return () => { active = false; }; }, [loadTiming]);
  useEffect(() => { let active = true; void loadApproval().then((value) => { if (active) { setApprovalBaseline(value.approvalRequired); setApprovalDraft(value.approvalRequired); setApprovalState("ready"); } }).catch(() => { if (active) setApprovalState("error"); }); return () => { active = false; }; }, [loadApproval]);

  const emailEnabled = Boolean(control?.feature_available && control.channels.email.available && control.channels.email.enabled);
  const editor = useSimpleEmailTemplateEditor("rebook_nudge", emailEnabled);
  const timingDirection = timingDraft < 0 ? "before" : timingDraft > 0 ? "after" : "on";
  const timingDays = Math.abs(timingDraft) || 1;

  async function retryControl() { try { setState("loading"); setControl(await loadControl()); setState("ready"); } catch (error) { setNotice({ tone: "error", message: errorMessage(error) }); setState("error"); } }
  async function retryTiming() { try { setTimingState("loading"); const value = await loadTiming(); setTiming(value); setTimingDraft(value.offset_days); setTimingConflict(null); setTimingState("ready"); } catch { setTimingState("error"); } }
  async function retryApproval() { try { setApprovalState("loading"); const value = await loadApproval(); setApprovalBaseline(value.approvalRequired); setApprovalDraft(value.approvalRequired); setApprovalState("ready"); } catch { setApprovalState("error"); } }

  async function changeChannel(channel: "email" | "sms", enabled: boolean) {
    if (!control || !canUpdateAutomationChannel(control, channel) || typeof control.settings_version !== "number") return;
    const previous = control;
    setChannelPending(channel); setNotice(null); setQueueImpact(null);
    setControl({ ...control, channels: { ...control.channels, [channel]: { ...control.channels[channel], enabled } } });
    try {
      const result = await withActiveAccount((token) => updateAutomationChannels(token, "rebook_nudges", { settings_version: control.settings_version as number, [channel]: enabled }));
      setControl((current) => current ? { ...current, enabled: result.enabled ?? current.enabled, channels: result.channels ?? current.channels, settings_version: result.settings_version ?? current.settings_version } : current);
      const reconciliation = result.queue_reconciliation;
      if (reconciliation?.cancelled_count || reconciliation?.created_count) setQueueImpact({ cancelledCount: reconciliation.cancelled_count ?? 0, createdCount: reconciliation.created_count ?? 0 });
      setSavedSections((current) => [...new Set([...current, "Delivery channels"])]); setNotice({ tone: "success", message: `${channel === "email" ? "Email" : "Text"} delivery updated.` });
    } catch (error) {
      setControl(previous);
      const failure: AutomationMutationFailure = getAutomationMutationFailure(error);
      if (failure === "conflict") { const latest = await loadControl().catch(() => null); if (latest) { setControl(latest); setNotice({ tone: "warning", message: "This automation changed elsewhere. The latest channel settings were reloaded; review them before trying again." }); } else setNotice({ tone: "error", message: "This automation changed elsewhere. Reload before trying again." }); }
      else if (failure === "forbidden") setNotice({ tone: "error", message: "You do not have permission to update this channel." });
      else setNotice({ tone: "error", message: errorMessage(error) });
    } finally { setChannelPending(null); }
  }

  function setTimingDirection(direction: "before" | "on" | "after") { setTimingConflict(null); setTimingDraft(direction === "on" ? 0 : direction === "before" ? -timingDays : timingDays); }
  function setDays(value: string) { const days = Number(value); if (Number.isInteger(days) && days >= 1 && days <= 30) { setTimingConflict(null); setTimingDraft(timingDirection === "before" ? -days : timingDirection === "after" ? days : 0); } }

  async function saveTiming() {
    if (!timing || !validOffset(timingDraft)) { setNotice({ tone: "error", message: "Choose On date or a whole number from 1 to 30 days before or after it." }); return; }
    setTimingSaving(true); setNotice(null); setTimingConflict(null);
    try {
      const saved = await withActiveAccount((token) => updateProjectedReturnReminderSettings(token, { offset_days: timingDraft, expected_revision: timing.revision }));
      setTiming(saved); setTimingDraft(saved.offset_days); setSavedSections((current) => [...new Set([...current, "Timing"])]); setNotice({ tone: "success", message: "Rebook timing saved." });
    } catch (error) {
      if (getAutomationMutationFailure(error) === "conflict") {
        const draftToKeep = timingDraft;
        const latest = await loadTiming().catch(() => null);
        if (latest) { setTiming(latest); setTimingDraft(draftToKeep); setTimingConflict(latest.offset_days); setNotice({ tone: "warning", message: "Timing changed elsewhere. The latest revision is loaded; your unsaved timing is still selected for review and retry." }); }
        else setNotice({ tone: "error", message: "Timing changed elsewhere. Reload before trying again." });
      } else { const saved = savedSections.length ? `${savedSections.join(" and ")} saved. ` : ""; setNotice({ tone: "error", message: `${saved}${errorMessage(error)}` }); setSavedSections([]); }
    } finally { setTimingSaving(false); }
  }

  async function saveApproval() {
    if (approvalDraft === null || approvalBaseline === null || approvalDraft === approvalBaseline) { setNotice({ tone: "success", message: "Sending behavior is already saved." }); return; }
    setApprovalSaving(true); setNotice(null);
    try {
      const saved = await withActiveAccount((token) => updateRebookNudgeSettings(token, { approvalRequired: approvalDraft }));
      setApprovalBaseline(saved.approvalRequired); setApprovalDraft(saved.approvalRequired); setSavedSections((current) => [...new Set([...current, "Sending behavior"])]); setNotice({ tone: "success", message: "Sending behavior saved." });
    } catch (error) { const saved = savedSections.length ? `${savedSections.join(" and ")} saved. ` : ""; setNotice({ tone: "error", message: `${saved}${errorMessage(error)}` }); setSavedSections([]); }
    finally { setApprovalSaving(false); }
  }

  const combinedNotice = notice ?? editor.notice;
  return <AutomationDetailShell title="Rebook Nudges" subtitle="Configure timing, text, and approval rules." backHref="/messages" backLabel="Messages" state={state} onRetry={() => void retryControl()} notice={combinedNotice} dirty={editor.dirty || (timing ? timingDraft !== timing.offset_days : false) || approvalDraft !== approvalBaseline} preview={<AutomationServerPreviewPanel title="Sample template" preview={emailEnabled ? editor.preview : null} loading={emailEnabled && editor.previewing} sample={<div className={styles.sampleTemplate}><p>Sample</p><h2>Ready for a refresh?</h2><span>The server will tailor this rebooking message to each client&apos;s projected return date.</span></div>} />} optionalContent={queueImpact ? <AutomationQueueImpact cancelledCount={queueImpact.cancelledCount} createdCount={queueImpact.createdCount} /> : null}>
    {control ? <><AutomationChannelSwitchGroup automationLabel="Rebook Nudges" channels={control.channels} disabled={!control.feature_available} pendingChannel={channelPending} onChange={changeChannel} />{!control.feature_available ? <p className={styles.unavailable}>{control.unavailable_reason || "This automation is unavailable for this account."}</p> : null}<section className={styles.card}><header><div><h2>Projected return timing</h2><p>Schedule this nudge relative to each client&apos;s generated projected return date.</p></div></header>{timingState === "loading" ? <p>Loading timing…</p> : timingState === "error" ? <button type="button" onClick={() => void retryTiming()}>Retry timing</button> : <><div className={styles.segmented} role="group" aria-label="Rebook timing"><button className={timingDirection === "before" ? styles.segmentedActive : ""} type="button" onClick={() => setTimingDirection("before")}>Before</button><button className={timingDirection === "on" ? styles.segmentedActive : ""} type="button" onClick={() => setTimingDirection("on")}>On date</button><button className={timingDirection === "after" ? styles.segmentedActive : ""} type="button" onClick={() => setTimingDirection("after")}>After</button></div>{timingDirection !== "on" ? <label className={styles.daysInput}>Days<input aria-label="Days from projected date" type="number" min="1" max="30" step="1" value={timingDays} onChange={(event) => setDays(event.target.value)} /></label> : <p className={styles.timingDescription}>The reminder is scheduled on the generated projected date.</p>}{timingConflict !== null ? <p className={styles.conflict}>Server timing is currently {timingConflict === 0 ? "on the projected date" : `${Math.abs(timingConflict)} days ${timingConflict < 0 ? "before" : "after"} it`}. Your draft has not been replaced.</p> : null}<button type="button" disabled={timingSaving} onClick={() => void saveTiming()}>{timingSaving ? "Saving timing…" : "Save timing"}</button></>}</section><section className={styles.reviewCard}>{approvalState === "loading" ? <p>Loading sending behavior…</p> : approvalState === "error" ? <button type="button" onClick={() => void retryApproval()}>Retry sending behavior</button> : <><AutomationReviewModeSelector value={approvalDraft ? "approval_required" : "automatic"} disabled={approvalSaving} onChange={(value) => { setApprovalDraft(value === "approval_required"); setNotice(null); }} /><button type="button" disabled={approvalSaving} onClick={() => void saveApproval()}>{approvalSaving ? "Saving behavior…" : "Save sending behavior"}</button></>}</section>{emailEnabled ? editor.state === "ready" ? <SimpleEmailTemplateNotePanel editor={editor} onInteraction={() => setNotice(null)} /> : <section className={styles.emailDisabled}>{editor.state === "error" ? <><strong>Email template unavailable</strong><span>{editor.notice?.message || "Reload the template to try again."}</span><button type="button" onClick={editor.retry}>Retry email template</button></> : <><strong>Loading email template…</strong><span>Preparing the Simple note editor.</span></>}</section> : <section className={styles.emailDisabled}><strong>Email template</strong><span>Enable Email above to personalize the email template.</span></section>}</> : null}
  </AutomationDetailShell>;
}
