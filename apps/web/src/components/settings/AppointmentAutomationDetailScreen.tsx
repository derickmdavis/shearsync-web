"use client";

import { useCallback, useEffect, useState } from "react";
import { AutomationChannelSwitchGroup, AutomationDetailShell, AutomationQueueImpact, AutomationServerPreviewPanel } from "@/src/components/automations";
import { canUpdateAutomationChannel, getAutomationBootstrap, getAutomationMutationFailure, updateAutomationChannels, type AutomationControl, type AutomationControlKey, type AutomationMutationFailure, type EmailTemplateKey } from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { SimpleEmailTemplateNotePanel } from "./EmailTemplateEditorScreen";
import { useSimpleEmailTemplateEditor } from "./useSimpleEmailTemplateEditor";
import styles from "./appointment-automation-detail.module.css";

type AppointmentAutomationKey = "booking_confirmations" | "appointment_reminders";

const details: Record<AppointmentAutomationKey, { title: string; subtitle: string; templateKey: EmailTemplateKey }> = {
  booking_confirmations: { title: "Booking Confirmations", subtitle: "Choose channels and personalize the confirmation email.", templateKey: "booking_confirmation" },
  appointment_reminders: { title: "Appointment Reminders", subtitle: "Choose channels, timing, and reminder copy.", templateKey: "appointment_reminder" },
};

function message(error: unknown) { return error instanceof Error && error.message ? error.message : "Unable to update this automation. Try again."; }
function timingLabel(minutes: unknown) {
  if (typeof minutes !== "number" || !Number.isFinite(minutes) || minutes <= 0) return null;
  if (minutes % 1440 === 0) return `${minutes / 1440} ${minutes === 1440 ? "day" : "days"} before the appointment`;
  if (minutes % 60 === 0) return `${minutes / 60} ${minutes === 60 ? "hour" : "hours"} before the appointment`;
  return `${minutes} minutes before the appointment`;
}

export function AppointmentAutomationDetailScreen({ controlKey }: { controlKey: AppointmentAutomationKey }) {
  const detail = details[controlKey];
  const [control, setControl] = useState<AutomationControl | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [pendingChannel, setPendingChannel] = useState<"email" | "sms" | null>(null);
  const [notice, setNotice] = useState<{ tone: "success" | "warning" | "error"; message: string } | null>(null);
  const [queueImpact, setQueueImpact] = useState<{ cancelledCount: number; createdCount: number } | null>(null);

  const loadControl = useCallback(async () => {
    const bootstrap = await withActiveAccount((token) => getAutomationBootstrap(token));
    const current = bootstrap.controls.find((candidate) => candidate.key === controlKey) ?? null;
    if (!current) throw new Error("This automation is not available for this account.");
    return current;
  }, [controlKey]);

  useEffect(() => {
    let active = true;
    void loadControl().then((current) => {
      if (!active) return;
      setControl(current); setNotice(null); setQueueImpact(null); setState("ready");
    }).catch((error) => {
      if (!active) return;
      setNotice({ tone: "error", message: message(error) }); setState("error");
    });
    return () => { active = false; };
  }, [loadControl]);

  const emailEnabled = Boolean(control?.feature_available && control.channels.email.available && control.channels.email.enabled);
  const editor = useSimpleEmailTemplateEditor(detail.templateKey, emailEnabled);
  const leadTime = controlKey === "appointment_reminders" ? timingLabel(control?.timing?.lead_time_minutes) : null;

  async function reloadControl() {
    try {
      setState("loading");
      const current = await loadControl();
      setControl(current); setQueueImpact(null); setState("ready");
      return current;
    } catch (error) {
      setNotice({ tone: "error", message: message(error) }); setState("error");
      return null;
    }
  }

  async function changeChannel(channel: "email" | "sms", enabled: boolean) {
    if (!control || !canUpdateAutomationChannel(control, channel) || typeof control.settings_version !== "number") return;
    const previous = control;
    const settingsVersion = control.settings_version;
    setPendingChannel(channel); setNotice(null); setQueueImpact(null);
    setControl({ ...control, channels: { ...control.channels, [channel]: { ...control.channels[channel], enabled } } });
    try {
      const result = await withActiveAccount((token) => updateAutomationChannels(token, controlKey as AutomationControlKey, { settings_version: settingsVersion, [channel]: enabled }));
      setControl((current) => current ? { ...current, enabled: result.enabled ?? current.enabled, channels: result.channels ?? current.channels, settings_version: result.settings_version ?? current.settings_version } : current);
      const reconciliation = result.queue_reconciliation;
      if (reconciliation?.cancelled_count || reconciliation?.created_count) setQueueImpact({ cancelledCount: reconciliation.cancelled_count ?? 0, createdCount: reconciliation.created_count ?? 0 });
      setNotice({ tone: "success", message: `${channel === "email" ? "Email" : "Text"} delivery updated.` });
    } catch (error) {
      setControl(previous);
      const failure: AutomationMutationFailure = getAutomationMutationFailure(error);
      if (failure === "conflict") {
        const latest = await loadControl().catch(() => null);
        if (latest) { setControl(latest); setNotice({ tone: "warning", message: "This automation changed elsewhere. The latest channel settings were reloaded; review them before trying again." }); }
        else setNotice({ tone: "error", message: "This automation changed elsewhere. Reload before trying again." });
      } else if (failure === "forbidden") setNotice({ tone: "error", message: "You do not have permission to update this channel." });
      else setNotice({ tone: "error", message: message(error) });
    } finally { setPendingChannel(null); }
  }

  const combinedNotice = notice ?? editor.notice;
  return <AutomationDetailShell title={detail.title} subtitle={detail.subtitle} backHref="/messages" backLabel="Messages" state={state} onRetry={() => void reloadControl()} notice={combinedNotice} dirty={editor.dirty} preview={<AutomationServerPreviewPanel title="Sample template" preview={emailEnabled ? editor.preview : null} loading={emailEnabled && editor.previewing} sample={<div className={styles.sampleTemplate}><p>Sample</p><h2>{controlKey === "booking_confirmations" ? "Your appointment is booked!" : "Your appointment is tomorrow"}</h2><span>The server will include the appointment details and manage-appointment action.</span></div>} />} optionalContent={queueImpact ? <AutomationQueueImpact cancelledCount={queueImpact.cancelledCount} createdCount={queueImpact.createdCount} /> : null}>
    {control ? <><AutomationChannelSwitchGroup automationLabel={detail.title} channels={control.channels} disabled={!control.feature_available} pendingChannel={pendingChannel} onChange={changeChannel} />{!control.feature_available ? <p className={styles.unavailable}>{control.unavailable_reason || "This automation is unavailable for this account."}</p> : null}{leadTime ? <section className={styles.timingCard}><p>Reminder timing</p><strong>{leadTime}</strong><span>This timing is set by your account and cannot be changed here.</span></section> : null}{emailEnabled ? editor.state === "ready" ? <SimpleEmailTemplateNotePanel editor={editor} onInteraction={() => setNotice(null)} /> : <section className={styles.emailDisabled}>{editor.state === "error" ? <><strong>Email template unavailable</strong><span>{editor.notice?.message || "Reload the template to try again."}</span><button type="button" onClick={editor.retry}>Retry email template</button></> : <><strong>Loading email template…</strong><span>Preparing the Simple note editor.</span></>}</section> : <section className={styles.emailDisabled}><strong>Email template</strong><span>Enable Email above to personalize the email template.</span></section>}</> : null}
  </AutomationDetailShell>;
}
