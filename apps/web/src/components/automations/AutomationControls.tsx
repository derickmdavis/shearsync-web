"use client";

import type { AutomationChannelCapability, EmailCopyPreview } from "@/src/lib/api";
import styles from "./automation-detail.module.css";

export type AutomationChannel = "email" | "sms";

type ChannelSwitchGroupProps = {
  automationLabel: string;
  channels: Record<AutomationChannel, AutomationChannelCapability>;
  disabled?: boolean;
  pendingChannel?: AutomationChannel | null;
  onChange?: (channel: AutomationChannel, enabled: boolean) => void;
};

const channelLabels: Record<AutomationChannel, string> = { email: "Email", sms: "Text" };

export function AutomationChannelSwitchGroup({ automationLabel, channels, disabled = false, pendingChannel = null, onChange }: ChannelSwitchGroupProps) {
  return <fieldset className={styles.controlCard}><legend>Delivery channels</legend><p className={styles.controlHelp}>Turn on the channels available for this automation.</p><div className={styles.channelList}>{(Object.keys(channelLabels) as AutomationChannel[]).map((channel) => {
    const capability = channels[channel];
    const unavailable = !capability.available;
    const pending = pendingChannel === channel;
    return <div className={styles.channelRow} key={channel}><div><strong>{channelLabels[channel]}</strong>{unavailable && capability.unavailable_reason ? <small>{capability.unavailable_reason}</small> : null}</div><label className={styles.switchLabel}><span className="sr-only">Enable {channelLabels[channel]} for {automationLabel}</span><input type="checkbox" checked={capability.enabled} disabled={disabled || unavailable || pending || !onChange} onChange={(event) => onChange?.(channel, event.target.checked)} /><i aria-hidden="true" /><em aria-hidden="true">{pending ? "Saving…" : unavailable ? "Unavailable" : capability.enabled ? "On" : "Off"}</em></label></div>;
  })}</div></fieldset>;
}

type ReviewModeSelectorProps = {
  value: "automatic" | "approval_required";
  disabled?: boolean;
  onChange?: (value: "automatic" | "approval_required") => void;
};

export function AutomationReviewModeSelector({ value, disabled = false, onChange }: ReviewModeSelectorProps) {
  return <fieldset className={styles.controlCard}><legend>Sending behavior</legend><p className={styles.controlHelp}>Choose whether messages send immediately or wait for your review.</p><div className={styles.reviewChoices}><label><input type="radio" name="automation-send-mode" checked={value === "automatic"} disabled={disabled || !onChange} onChange={() => onChange?.("automatic")} /><span><strong>Send automatically</strong><small>Messages send when they become eligible.</small></span></label><label><input type="radio" name="automation-send-mode" checked={value === "approval_required"} disabled={disabled || !onChange} onChange={() => onChange?.("approval_required")} /><span><strong>Review before sending</strong><small>Messages stay in your approval queue.</small></span></label></div></fieldset>;
}

export function AutomationQueueImpact({ cancelledCount = 0, createdCount = 0 }: { cancelledCount?: number; createdCount?: number }) {
  if (!cancelledCount && !createdCount) return null;
  const details = [cancelledCount ? `${cancelledCount} pending ${cancelledCount === 1 ? "message was" : "messages were"} cancelled` : null, createdCount ? `${createdCount} ${createdCount === 1 ? "message was" : "messages were"} added to the queue` : null].filter(Boolean).join(". ");
  return <p className={styles.queueImpact} role="status">{details}.</p>;
}

type ServerPreviewPanelProps = {
  title?: string;
  preview?: EmailCopyPreview | null;
  loading?: boolean;
  sample?: React.ReactNode;
};

export function AutomationServerPreviewPanel({ title = "Sample template", preview, loading = false, sample }: ServerPreviewPanelProps) {
  return <section className={styles.previewPanel} aria-label="Email preview"><header><div><p>Preview</p><h2>{title}</h2></div><span>Sample</span></header>{loading ? <p className={styles.previewLoading}>Rendering preview…</p> : preview ? <><p className={styles.previewSubject}><b>Subject</b>{preview.subject}</p><iframe className={styles.previewFrame} title="Rendered email preview" sandbox="" srcDoc={preview.html} /><details className={styles.previewText}><summary>Plain-text version</summary><pre>{preview.text}</pre></details></> : sample ? <div className={styles.previewSample}>{sample}</div> : <p className={styles.previewLoading}>Preview unavailable until the template loads.</p>}</section>;
}
