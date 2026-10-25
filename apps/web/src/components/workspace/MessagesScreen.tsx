"use client";

import { useEffect, useRef, useState } from "react";
import {
  ApiError,
  getActivityDashboard,
  getBookingInquiries,
  getSentOutreach,
  getAutomationBootstrap,
  setAutomationEnabled,
  type AutomationBootstrap,
  type AutomationChannelCapability,
  type AutomationControl,
} from "@/src/lib/api";
import { AccountLifecycleError, withActiveAccount } from "@/src/lib/auth/active-account";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

type LoadState = "loading" | "ready" | "error";
type MessageTab = "overview" | "sent" | "manage";

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

function dashboardCount(value: unknown, keys: string[]) {
  const root = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const data = root.data && typeof root.data === "object" ? root.data as Record<string, unknown> : root;
  for (const key of keys) {
    const item = data[key];
    if (typeof item === "number") return item;
    if (item && typeof item === "object" && typeof (item as Record<string, unknown>).count === "number") return (item as Record<string, number>).count;
  }
  return null;
}

function listItems(value: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(value)) return value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object");
  if (!value || typeof value !== "object") return [];
  const record = value as Record<string, unknown>;
  return listItems(record.data ?? record.items ?? record.results ?? []);
}
function itemTitle(item: Record<string, unknown>) { return String(item.client_name ?? item.clientName ?? item.recipient_name ?? item.recipientName ?? item.subject ?? "Client communication"); }
function itemDetail(item: Record<string, unknown>) { return String(item.message ?? item.preview ?? item.subject ?? item.service_name ?? item.status ?? "No additional details"); }

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
  const [tab, setTab] = useState<MessageTab>("manage");
  const [state, setState] = useState<LoadState>("loading");
  const [data, setData] = useState<AutomationBootstrap | null>(null);
  const [dashboard, setDashboard] = useState<unknown>(null);
  const [inquiries, setInquiries] = useState<Array<Record<string, unknown>>>([]);
  const [sent, setSent] = useState<Array<Record<string, unknown>>>([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [tabError, setTabError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const [changingKey, setChangingKey] = useState<string | null>(null);
  const requestVersion = useRef(0);

  useEffect(() => {
    const refreshMessages = () => setReload((value) => value + 1);
    globalThis.addEventListener("rootfoil:appointments-changed", refreshMessages);
    return () => globalThis.removeEventListener("rootfoil:appointments-changed", refreshMessages);
  }, []);

  useEffect(() => {
    const version = ++requestVersion.current;
    void withActiveAccount(async (accessToken) => {
      const [automation, attention] = await Promise.all([
        getAutomationBootstrap(accessToken),
        getActivityDashboard(accessToken).catch(() => null),
      ]);
      return { automation, attention };
    })
      .then((result) => {
        if (version !== requestVersion.current) return;
        setData(result.automation); setDashboard(result.attention); setState("ready");
      })
      .catch((cause: unknown) => {
        if (version !== requestVersion.current) return;
        setError(errorText(cause)); setState("error");
      });
  }, [reload]);

  useEffect(() => {
    if (tab === "manage") return;
    let active = true; setTabLoading(true); setTabError(null);
    void withActiveAccount((token) => tab === "overview" ? getBookingInquiries(token) : getSentOutreach(token))
      .then((result) => { if (!active) return; if (tab === "overview") setInquiries(listItems(result)); else setSent(listItems(result)); })
      .catch((cause) => { if (active) setTabError(errorText(cause)); })
      .finally(() => { if (active) setTabLoading(false); });
    return () => { active = false; };
  }, [tab, reload]);

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
        const [automation, attention] = await Promise.all([getAutomationBootstrap(accessToken), getActivityDashboard(accessToken).catch(() => null)]);
        return { automation, attention };
      });
      setData(refreshed.automation); setDashboard(refreshed.attention);
      setState("ready");
    } catch (cause) {
      setError(errorText(cause));
      setState("error");
    } finally {
      setChangingKey(null);
    }
  }

  return <WorkspaceShell active="messages"><section className={styles.messagesPage}>
    <PageHeading title="Messages" subtitle="Keep your clients engaged." action={<button className={styles.secondaryButton} type="button" onClick={reloadMessages} disabled={state === "loading"}>Refresh</button>} />
    <nav className={styles.localTabs} aria-label="Messages sections"><button className={tab === "overview" ? styles.localTabActive : ""} type="button" onClick={() => setTab("overview")} aria-current={tab === "overview" ? "page" : undefined}>Overview</button><button className={tab === "sent" ? styles.localTabActive : ""} type="button" onClick={() => setTab("sent")} aria-current={tab === "sent" ? "page" : undefined}>Sent</button><button className={tab === "manage" ? styles.localTabActive : ""} type="button" onClick={() => setTab("manage")} aria-current={tab === "manage" ? "page" : undefined}>Manage</button></nav>
    {tab === "manage" ? <header className={styles.messagesSectionHeading}><h2>Always on</h2><p>Automated touchpoints that keep clients engaged.</p></header> : null}
    {state === "error" ? <section className={styles.messagesStatus} role="alert"><p>{error}</p><button className={styles.secondaryButton} type="button" onClick={reloadMessages}>Try again</button></section> : null}
    {state === "loading" && !data ? <section className={styles.messagesStatus} aria-busy="true"><p>Loading message automation status…</p></section> : null}
    {tab === "overview" ? <MessageList title="Booking inquiries" description="Actionable requests from your booking page." items={inquiries} loading={tabLoading} error={tabError} empty="No actionable booking inquiries." /> : null}
    {tab === "sent" ? <MessageList title="Sent communications" description="Recent outreach sent to clients." items={sent} loading={tabLoading} error={tabError} empty="No sent communications yet." /> : null}
    {tab === "manage" && data ? <>
      <section className={styles.messagesOverview} aria-label="Messaging overview">
        <div><strong>{dashboardCount(dashboard, ["booking_inquiries", "bookingInquiries", "inquiries"]) ?? "—"}</strong><span>Booking inquiries needing attention</span></div>
        <div><strong>{dashboardCount(dashboard, ["pending_approvals", "pendingApprovals", "approvals"]) ?? "—"}</strong><span>Pending approvals</span></div>
        <div><strong>{dashboardCount(dashboard, ["waitlist", "active_waitlist", "activeWaitlist"]) ?? "—"}</strong><span>Clients on the waitlist</span></div>
      </section>
      <div className={styles.automationGrid}>{data.controls.map((control) => <AutomationCard control={control} changing={changingKey === control.key} onEnabledChange={(enabled) => void changeAutomation(control, enabled)} key={control.key} />)}</div>
    </> : null}
  </section></WorkspaceShell>;
}

function MessageList({ title, description, items, loading, error, empty }: { title: string; description: string; items: Array<Record<string, unknown>>; loading: boolean; error: string | null; empty: string }) {
  return <section className={styles.servicesPanel}><header className={styles.servicesPanelHeader}><div><h2>{title}</h2><p>{description}</p></div></header>{loading ? <p>Loading…</p> : null}{error ? <p className={styles.servicesMessage} role="alert">{error}</p> : null}{!loading && !error && !items.length ? <p className={styles.servicesEmpty}>{empty}</p> : null}<div className={styles.serviceList}>{items.map((item, index) => <article className={styles.serviceRow} key={String(item.id ?? index)}><div><strong>{itemTitle(item)}</strong><span>{itemDetail(item)}</span></div><span className={styles.serviceState}>{String(item.status ?? item.channel ?? "View")}</span></article>)}</div></section>;
}
