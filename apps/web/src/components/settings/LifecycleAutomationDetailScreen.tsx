"use client";

import { useCallback, useEffect, useState } from "react";
import { AutomationChannelSwitchGroup, AutomationDetailShell, AutomationQueueImpact, AutomationReviewModeSelector, AutomationServerPreviewPanel } from "@/src/components/automations";
import { canUpdateAutomationChannel, getAutomationBootstrap, getAutomationMutationFailure, getBirthdayReminderSettings, getThankYouEmailSettings, updateAutomationChannels, updateBirthdayReminderSettings, updateThankYouEmailSettings, type AutomationControl, type AutomationMutationFailure } from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { SimpleEmailTemplateNotePanel } from "./EmailTemplateEditorScreen";
import { useSimpleEmailTemplateEditor } from "./useSimpleEmailTemplateEditor";
import styles from "./lifecycle-automation-detail.module.css";

type LifecycleKind = "thank-you" | "birthday";
type ResourceState = "loading" | "ready" | "error";

const detail = {
  "thank-you": { controlKey: "thank_you_emails", templateKey: "thank_you", title: "Thank You Emails", subtitle: "Configure review behavior and email copy.", sample: "Thanks for coming in!" },
  birthday: { controlKey: "birthday_reminders", templateKey: "birthday", title: "Birthday Notes", subtitle: "Configure review behavior and birthday email copy.", sample: "Happy birthday!" },
} as const;

function errorMessage(error: unknown) { return error instanceof Error && error.message ? error.message : "Unable to update this automation. Try again."; }
function thankYouDelay(value: unknown) { return typeof value === "object" && value !== null && "sendDelayHours" in value && typeof value.sendDelayHours === "number" ? value.sendDelayHours : null; }

export function LifecycleAutomationDetailScreen({ kind }: { kind: LifecycleKind }) {
  const config = detail[kind];
  const [control, setControl] = useState<AutomationControl | null>(null);
  const [state, setState] = useState<ResourceState>("loading");
  const [channelPending, setChannelPending] = useState<"email" | "sms" | null>(null);
  const [approvalBaseline, setApprovalBaseline] = useState<boolean | null>(null);
  const [approvalDraft, setApprovalDraft] = useState<boolean | null>(null);
  const [thankYouDelayBaseline, setThankYouDelayBaseline] = useState<number | null>(null);
  const [approvalState, setApprovalState] = useState<ResourceState>("loading");
  const [approvalSaving, setApprovalSaving] = useState(false);
  const [notice, setNotice] = useState<{ tone: "success" | "warning" | "error"; message: string } | null>(null);
  const [queueImpact, setQueueImpact] = useState<{ cancelledCount: number; createdCount: number } | null>(null);

  const loadControl = useCallback(async () => {
    const bootstrap = await withActiveAccount((token) => getAutomationBootstrap(token));
    const current = bootstrap.controls.find((candidate) => candidate.key === config.controlKey) ?? null;
    if (!current) throw new Error(`${config.title} are not available for this account.`);
    return current;
  }, [config.controlKey, config.title]);
  const loadApproval = useCallback(async () => withActiveAccount((token) => kind === "thank-you" ? getThankYouEmailSettings(token) : getBirthdayReminderSettings(token)), [kind]);

  useEffect(() => { let active = true; void loadControl().then((value) => { if (active) { setControl(value); setState("ready"); } }).catch((error) => { if (active) { setNotice({ tone: "error", message: errorMessage(error) }); setState("error"); } }); return () => { active = false; }; }, [loadControl]);
  useEffect(() => { let active = true; void loadApproval().then((value) => { if (active) { setApprovalBaseline(value.approvalRequired); setApprovalDraft(value.approvalRequired); setThankYouDelayBaseline(thankYouDelay(value)); setApprovalState("ready"); } }).catch(() => { if (active) setApprovalState("error"); }); return () => { active = false; }; }, [loadApproval]);

  const emailEnabled = Boolean(control?.feature_available && control.channels.email.available && control.channels.email.enabled);
  const editor = useSimpleEmailTemplateEditor(config.templateKey, emailEnabled);

  async function retryControl() { try { setState("loading"); setControl(await loadControl()); setState("ready"); } catch (error) { setNotice({ tone: "error", message: errorMessage(error) }); setState("error"); } }
  async function retryApproval() { try { setApprovalState("loading"); const value = await loadApproval(); setApprovalBaseline(value.approvalRequired); setApprovalDraft(value.approvalRequired); setThankYouDelayBaseline(thankYouDelay(value)); setApprovalState("ready"); } catch { setApprovalState("error"); } }

  async function changeChannel(channel: "email" | "sms", enabled: boolean) {
    if (!control || !canUpdateAutomationChannel(control, channel) || typeof control.settings_version !== "number") return;
    const previous = control;
    setChannelPending(channel); setNotice(null); setQueueImpact(null);
    setControl({ ...control, channels: { ...control.channels, [channel]: { ...control.channels[channel], enabled } } });
    try {
      const result = await withActiveAccount((token) => updateAutomationChannels(token, config.controlKey, { settings_version: control.settings_version as number, [channel]: enabled }));
      setControl((current) => current ? { ...current, enabled: result.enabled ?? current.enabled, channels: result.channels ?? current.channels, settings_version: result.settings_version ?? current.settings_version } : current);
      const reconciliation = result.queue_reconciliation;
      if (reconciliation?.cancelled_count || reconciliation?.created_count) setQueueImpact({ cancelledCount: reconciliation.cancelled_count ?? 0, createdCount: reconciliation.created_count ?? 0 });
      setNotice({ tone: "success", message: `${channel === "email" ? "Email" : "Text"} delivery updated.` });
    } catch (error) {
      setControl(previous);
      const failure: AutomationMutationFailure = getAutomationMutationFailure(error);
      if (failure === "conflict") { const latest = await loadControl().catch(() => null); if (latest) { setControl(latest); setNotice({ tone: "warning", message: "This automation changed elsewhere. The latest channel settings were reloaded; review them before trying again." }); } else setNotice({ tone: "error", message: "This automation changed elsewhere. Reload before trying again." }); }
      else if (failure === "forbidden") setNotice({ tone: "error", message: "You do not have permission to update this channel." });
      else setNotice({ tone: "error", message: errorMessage(error) });
    } finally { setChannelPending(null); }
  }

  async function saveApproval() {
    const delayNeedsUpdate = kind === "thank-you" && thankYouDelayBaseline !== 24;
    if (approvalDraft === null || approvalBaseline === null || (approvalDraft === approvalBaseline && !delayNeedsUpdate)) { setNotice({ tone: "success", message: "Sending behavior is already saved." }); return; }
    setApprovalSaving(true); setNotice(null);
    try {
      const saved = await withActiveAccount((token) => kind === "thank-you"
        ? updateThankYouEmailSettings(token, { approvalRequired: approvalDraft, sendDelayHours: 24 })
        : updateBirthdayReminderSettings(token, { approvalRequired: approvalDraft }));
      setApprovalBaseline(saved.approvalRequired); setApprovalDraft(saved.approvalRequired); setThankYouDelayBaseline(thankYouDelay(saved)); setNotice({ tone: "success", message: "Sending behavior saved." });
    } catch (error) { setNotice({ tone: "error", message: errorMessage(error) }); }
    finally { setApprovalSaving(false); }
  }

  const combinedNotice = notice ?? editor.notice;
  const birthdayQueue = kind === "birthday" && typeof control?.queued_count === "number" ? control.queued_count : null;
  return <AutomationDetailShell title={config.title} subtitle={config.subtitle} backHref="/messages" backLabel="Messages" state={state} onRetry={() => void retryControl()} notice={combinedNotice} dirty={editor.dirty || approvalDraft !== approvalBaseline || (kind === "thank-you" && thankYouDelayBaseline !== null && thankYouDelayBaseline !== 24)} preview={<AutomationServerPreviewPanel title="Sample template" preview={emailEnabled ? editor.preview : null} loading={emailEnabled && editor.previewing} sample={<div className={styles.sampleTemplate}><p>Sample</p><h2>{config.sample}</h2><span>{kind === "thank-you" ? "The server will include the visit details and referral action." : "The server will personalize this birthday note and booking invitation."}</span></div>} />} optionalContent={queueImpact ? <AutomationQueueImpact cancelledCount={queueImpact.cancelledCount} createdCount={queueImpact.createdCount} /> : null}>
    {control ? <><AutomationChannelSwitchGroup automationLabel={config.title} channels={control.channels} disabled={!control.feature_available} pendingChannel={channelPending} onChange={changeChannel} />{!control.feature_available ? <p className={styles.unavailable}>{control.unavailable_reason || "This automation is unavailable for this account."}</p> : null}{kind === "thank-you" ? <section className={styles.infoCard}><p>Delivery timing</p><strong>24 hours after the appointment</strong><span>This mobile-aligned delay is sent whenever you save the sending behavior.</span></section> : null}{birthdayQueue !== null ? <section className={styles.infoCard}><p>Queued birthday notes</p><strong>{birthdayQueue}</strong><span>Messages currently waiting in the automation queue.</span></section> : null}<section className={styles.reviewCard}>{approvalState === "loading" ? <p>Loading sending behavior…</p> : approvalState === "error" ? <button type="button" onClick={() => void retryApproval()}>Retry sending behavior</button> : <><AutomationReviewModeSelector value={approvalDraft ? "approval_required" : "automatic"} disabled={approvalSaving} onChange={(value) => { setApprovalDraft(value === "approval_required"); setNotice(null); }} /><button type="button" disabled={approvalSaving} onClick={() => void saveApproval()}>{approvalSaving ? "Saving behavior…" : "Save sending behavior"}</button></>}</section>{emailEnabled ? editor.state === "ready" ? <SimpleEmailTemplateNotePanel editor={editor} onInteraction={() => setNotice(null)} /> : <section className={styles.emailDisabled}>{editor.state === "error" ? <><strong>Email template unavailable</strong><span>{editor.notice?.message || "Reload the template to try again."}</span><button type="button" onClick={editor.retry}>Retry email template</button></> : <><strong>Loading email template…</strong><span>Preparing the Simple note editor.</span></>}</section> : <section className={styles.emailDisabled}><strong>Email template</strong><span>Enable Email above to personalize the email template.</span></section>}</> : null}
  </AutomationDetailShell>;
}
