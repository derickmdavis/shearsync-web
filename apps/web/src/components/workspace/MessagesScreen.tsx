"use client";

import { useEffect, useRef, useState } from "react";
import {
  ApiError,
  getAutomationBootstrap,
  setAutomationEnabled,
  type AutomationBootstrap,
  type AutomationChannelCapability,
  type AutomationControl,
} from "@/src/lib/api";
import { AccountLifecycleError, withActiveAccount } from "@/src/lib/auth/active-account";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

type LoadState = "loading" | "ready" | "error";

function errorText(error: unknown) {
  if (error instanceof AccountLifecycleError) return "Your account is not active. Restore access to view messages.";
  if (error instanceof ApiError && error.status === 401) return "Your session has expired. Please sign in again.";
  if (error instanceof ApiError && error.status === 403) return "You do not have access to messaging settings for this account.";
  if (error instanceof ApiError && error.status === 404) return "Messaging automation is not available for this account.";
  if (error instanceof ApiError && (error.status === 0 || error.status >= 500)) return "The messaging service is temporarily unavailable. Try again.";
  return "Unable to load message automation status. Try again.";
}

function titleFromKey(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function timingValue(value: number | boolean | null) {
  if (value === null) return "Not set";
  return typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
}

function channelDescription(name: string, channel: AutomationChannelCapability) {
  if (!channel.available) return channel.unavailable_reason || `${name} is unavailable`;
  return channel.enabled ? `${name} enabled` : `${name} off`;
}

function AutomationCard({ control, changing, onEnabledChange }: { control: AutomationControl; changing: boolean; onEnabledChange: (enabled: boolean) => void }) {
  const channels: ReadonlyArray<readonly [string, AutomationChannelCapability]> = [
    ["Email", control.channels.email],
    ["SMS", control.channels.sms],
  ];
  const timing = Object.entries(control.timing).filter(([, value]) => value !== null);

  return <article className={styles.automationCard}>
    <header className={styles.automationCardHeader}>
      <div>
        <h2>{control.label}</h2>
        <p>{control.mode === "approval_required" ? "Approval required before sending" : control.mode === "automatic" ? "Sends automatically" : "Automation status"}</p>
      </div>
      <div className={styles.automationCardActions}>
        <span className={`${styles.automationStatus} ${control.enabled && control.feature_available ? styles.automationStatusOn : ""}`}>{control.status_label}</span>
        <label className={styles.automationToggle}>
          <span>Automation</span>
          <input type="checkbox" checked={control.enabled} disabled={!control.feature_available || changing} onChange={(event) => onEnabledChange(event.target.checked)} />
          <i aria-hidden="true" />
        </label>
      </div>
    </header>

    {!control.feature_available ? <p className={styles.automationNotice}>{control.unavailable_reason || "This automation is unavailable for this account."}</p> : null}

    <dl className={styles.automationDetails}>
      <div><dt>Master automation</dt><dd>{control.enabled ? "On" : "Off"}</dd></div>
      {channels.map(([name, channel]) => <div key={name}><dt>{name}</dt><dd>{channelDescription(name, channel)}</dd></div>)}
      <div><dt>Pending approval</dt><dd>{control.pending_approval_count}</dd></div>
      <div><dt>Queued / scheduled</dt><dd>{control.queued_count} / {control.scheduled_count}</dd></div>
      {timing.map(([key, value]) => <div key={key}><dt>{titleFromKey(key)}</dt><dd>{timingValue(value)}</dd></div>)}
    </dl>

    {control.templates.length ? <section className={styles.automationTemplates} aria-label={`${control.label} templates`}>
      <h3>Template{control.templates.length === 1 ? "" : "s"}</h3>
      {control.templates.map((template) => <details key={`${template.automationKey}-${template.effectiveSubject}`}>
        <summary><span>{template.effectiveSubject || "Untitled message"}</span><small>{template.source === "custom" ? "Custom" : "Default"}</small></summary>
        <div className={styles.automationTemplateBody}>
          <p><b>Subject</b>{template.effectiveSubject || "—"}</p>
          <p><b>Message</b>{template.effectiveBody || "—"}</p>
          {template.allowedVariables.length ? <p><b>Available variables</b>{template.allowedVariables.join(", ")}</p> : null}
        </div>
      </details>)}
    </section> : <p className={styles.automationNoTemplate}>No message template is configured.</p>}
  </article>;
}

export function MessagesScreen() {
  const [state, setState] = useState<LoadState>("loading");
  const [data, setData] = useState<AutomationBootstrap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const [changingKey, setChangingKey] = useState<string | null>(null);
  const requestVersion = useRef(0);

  useEffect(() => {
    const version = ++requestVersion.current;
    void withActiveAccount((accessToken) => getAutomationBootstrap(accessToken))
      .then((result) => {
        if (version !== requestVersion.current) return;
        setData(result); setState("ready");
      })
      .catch((cause: unknown) => {
        if (version !== requestVersion.current) return;
        setError(errorText(cause)); setState("error");
      });
  }, [reload]);

  function reloadMessages() {
    setError(null);
    if (!data) setState("loading");
    setReload((value) => value + 1);
  }

  async function changeAutomation(control: AutomationControl, enabled: boolean) {
    setChangingKey(control.key);
    setError(null);
    try {
      const refreshed = await withActiveAccount(async (accessToken) => {
        await setAutomationEnabled(accessToken, control.key, enabled);
        return getAutomationBootstrap(accessToken);
      });
      setData(refreshed);
      setState("ready");
    } catch (cause) {
      setError(errorText(cause));
      setState("error");
    } finally {
      setChangingKey(null);
    }
  }

  return <WorkspaceShell active="messages"><section className={styles.messagesPage}>
    <PageHeading title="Messages" subtitle="See which client communications are active and the message each automation will send." action={<button className={styles.secondaryButton} type="button" onClick={reloadMessages} disabled={state === "loading"}>Refresh</button>} />
    {state === "error" ? <section className={styles.messagesStatus} role="alert"><p>{error}</p><button className={styles.secondaryButton} type="button" onClick={reloadMessages}>Try again</button></section> : null}
    {state === "loading" && !data ? <section className={styles.messagesStatus} aria-busy="true"><p>Loading message automation status…</p></section> : null}
    {data ? <>
      <section className={styles.messagesOverview} aria-label="Messaging overview">
        <div><strong>{data.summary.enabled_count}</strong><span>Automations on</span></div>
        <div><strong>{data.summary.available_count}</strong><span>Available</span></div>
        <div><strong>{data.customers_reached.unique_clients}</strong><span>Clients reached in the last {data.customers_reached.window_days} days</span></div>
      </section>
      <div className={styles.automationGrid}>{data.controls.map((control) => <AutomationCard control={control} changing={changingKey === control.key} onEnabledChange={(enabled) => void changeAutomation(control, enabled)} key={control.key} />)}</div>
    </> : null}
  </section></WorkspaceShell>;
}
