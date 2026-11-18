"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ApiError,
  getAccountAccess,
  getActivityApprovals,
  getBookingInquiries,
  getCampaigns,
  getCampaign,
  cancelCampaign,
  createCampaignDraft,
  deleteCampaignDraft,
  estimateCampaignAudience,
  getCampaignConfiguration,
  getCampaignDraft,
  getCampaignEmailHeroImages,
  getCampaignTemplates,
  getClients,
  previewCampaignDraft,
  submitCampaignDraft,
  updateCampaignDraft,
  validateCampaignDraft,
  cancelScheduledOutreach,
  getPendingOutreachApprovals,
  getScheduledOutreach,
  getSentOutreach,
  getWaitlistEntries,
  getAutomationBootstrap,
  type AccountAccess,
  type AutomationChannelCapability,
  type AutomationControl,
  type CampaignDraft,
  type CampaignTemplate,
  type ClientRow,
  getAutomationTemplateKey,
} from "@/src/lib/api";
import { AccountLifecycleError, withActiveAccount } from "@/src/lib/auth/active-account";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

type MessageTab = "manage" | "scheduled" | "sent";
type MessageRecord = Record<string, unknown>;
type SourceState = { key: string; label: string; records: MessageRecord[]; count: number; available: boolean | null; nextCursor: string | null; error?: string };
type TabSnapshot = { tab: MessageTab; sources: SourceState[]; loadedAt: number; access: AccountAccess; timezone: string; stale?: boolean };

const tabCopy: Record<MessageTab, { heading: string; description: string; empty: string }> = {
  manage: { heading: "Manage", description: "Review inbound client work and message settings.", empty: "You’re all caught up. Nothing needs your attention right now." },
  scheduled: { heading: "Scheduled Communications", description: "Upcoming client outreach and messages awaiting approval.", empty: "Nothing scheduled." },
  sent: { heading: "Sent", description: "Recent campaigns and automated client messages.", empty: "No sent communications yet." },
};

function errorText(error: unknown) {
  if (error instanceof AccountLifecycleError) return "Your account is not active. Restore access to view messages.";
  if (error instanceof ApiError && error.status === 401) return "Your session has expired. Please sign in again.";
  if (error instanceof ApiError && error.status === 403) return "You do not have access to messages for this account.";
  if (error instanceof ApiError && error.status === 404) return "Messaging is not available for this account.";
  if (error instanceof ApiError && (error.status === 0 || error.status >= 500)) return "The messaging service is temporarily unavailable. Try again.";
  return "Unable to load messages. Try again.";
}

function listItems(value: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(value)) return value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object");
  if (!value || typeof value !== "object") return [];
  const record = value as Record<string, unknown>;
  return listItems(record.data ?? record.items ?? record.results ?? []);
}

async function settledSource(key: string, label: string, request: Promise<unknown>) {
  try {
    const value = await request;
    const records = listItems(value);
    const available = value && typeof value === "object" && typeof (value as { available?: unknown }).available === "boolean"
      ? (value as { available: boolean }).available
      : null;
    const nextCursor = value && typeof value === "object" && typeof (value as { next_cursor?: unknown }).next_cursor === "string" ? (value as { next_cursor: string }).next_cursor : null;
    return { key, label, records, count: records.length, available, nextCursor } satisfies SourceState;
  } catch (error) {
    return { key, label, records: [], count: 0, available: null, nextCursor: null, error: errorText(error) } satisfies SourceState;
  }
}

function sourceByKey(snapshot: TabSnapshot, key: string) { return snapshot.sources.find((source) => source.key === key); }
function text(value: unknown) { return typeof value === "string" && value.trim() ? value.trim() : null; }
function nameFor(record: MessageRecord, fallback: string) { const recipient = record.recipient && typeof record.recipient === "object" ? record.recipient as MessageRecord : null; return text(record.preferred_name) ?? text(record.client_name) ?? text(record.clientName) ?? text(record.recipient_name) ?? text(record.recipientName) ?? text(record.first_name) ?? text(record.guest_name) ?? text(recipient?.display_name) ?? text(record.guest_email) ?? text(record.guest_phone) ?? fallback; }
function metadataFor(record: MessageRecord) { return record.metadata && typeof record.metadata === "object" && !Array.isArray(record.metadata) ? record.metadata as MessageRecord : {}; }
function isOpenInquiry(record: MessageRecord) { return text(record.status) !== "closed"; }
function isAppointmentApproval(record: MessageRecord) { const metadata = metadataFor(record); const type = text(record.event_type) ?? text(record.eventType); const appointmentId = text(record.appointment_id) ?? text(metadata.appointment_id); return type === "booking_created" && Boolean(appointmentId); }
function detailFor(kind: "inquiries" | "approvals" | "waitlist", record: MessageRecord) {
  const metadata = metadataFor(record);
  if (kind === "inquiries") {
    const desiredOutcome = text(record.desired_outcome) ?? text(metadata.desired_outcome) ?? text((record.inquiry_answers as MessageRecord | null)?.desired_outcome);
    const photoCount = Array.isArray(record.photo_upload_ids) ? record.photo_upload_ids.length : Array.isArray(record.uploaded_photos) ? record.uploaded_photos.length : 0;
    return desiredOutcome ?? (photoCount ? `${photoCount} uploaded photo${photoCount === 1 ? "" : "s"}` : "No desired outcome provided");
  }
  if (kind === "approvals") return [text(record.service_name) ?? text(metadata.service_name), text(record.requested_datetime) ?? text(metadata.requested_datetime) ?? text(record.appointment_date) ?? text(metadata.appointment_date), text(record.notes) ?? text(metadata.notes)].filter(Boolean).join(" · ") || "Appointment approval requested";
  const dates = Array.isArray(record.requested_dates) ? record.requested_dates.filter((date): date is string => typeof date === "string") : [];
  return [dates.join(", "), text(record.note) ?? text(metadata.note)].filter(Boolean).join(" · ") || "Waitlist request";
}

function NeedsAttention({ snapshot, initialExpanded = null }: { snapshot: TabSnapshot; initialExpanded?: "inquiries" | "approvals" | "waitlist" | null }) {
  const [expanded, setExpanded] = useState<"inquiries" | "approvals" | "waitlist" | null>(initialExpanded);
  const inquirySource = sourceByKey(snapshot, "inquiries");
  const approvalSource = sourceByKey(snapshot, "approvals");
  const waitlistSource = sourceByKey(snapshot, "waitlist");
  const categories = [
    { key: "inquiries" as const, title: "Booking Inquiries", records: inquirySource?.records.filter(isOpenInquiry) ?? [] },
    { key: "approvals" as const, title: "Pending Approvals", records: approvalSource?.records.filter(isAppointmentApproval) ?? [] },
    { key: "waitlist" as const, title: "Waitlist", records: waitlistSource?.available === true ? waitlistSource.records : [] },
  ].filter((category) => category.records.length > 0);

  if (!categories.length) return <p className={styles.servicesEmpty}>You’re all caught up. Nothing needs your attention right now.</p>;
  return <div className={styles.attentionList}>{categories.map((category) => {
    const isExpanded = expanded === category.key;
    return <section className={styles.attentionCard} key={category.key}>
      <button className={styles.attentionSummary} type="button" onClick={() => setExpanded(isExpanded ? null : category.key)} aria-expanded={isExpanded} aria-controls={`attention-${category.key}`}>
        <span><strong>{category.title}</strong><small>{category.records.length} {category.records.length === 1 ? "item" : "items"}</small></span><b aria-hidden="true">{isExpanded ? "−" : "+"}</b>
      </button>
      {isExpanded ? <div className={styles.attentionRows} id={`attention-${category.key}`}>{category.records.map((record, index) => <article className={styles.attentionRow} key={String(record.id ?? `${category.key}-${index}`)}><div><strong>{nameFor(record, category.key === "inquiries" ? "Booking inquiry" : "Client")}</strong><span>{detailFor(category.key, record)}</span></div></article>)}</div> : null}
    </section>;
  })}</div>;
}

function editorHref(key: string) {
  if (key === "waitlist_match") return "/settings/automations/waitlist";
  const templateKey = getAutomationTemplateKey(key);
  const paths: Record<string, string> = {
    booking_confirmations: "/settings/email-templates/booking_confirmation",
    appointment_reminders: "/settings/email-templates/appointment_reminder",
    rebook_nudges: "/settings/automations/rebook-nudges",
    rebooking_nudges: "/settings/automations/rebook-nudges",
    thank_you_emails: "/settings/automations/thank-you-emails",
    birthday_reminders: "/settings/automations/birthday-reminders",
  };
  return templateKey ? paths[key] : "/messages#automations";
}

function channelStatus(channel: AutomationChannelCapability) {
  if (!channel.available) return "Unavailable";
  return channel.enabled ? "On" : "Off";
}

function isAutomationActive(control: AutomationControl) {
  return control.feature_available && [control.channels.email, control.channels.sms].some((channel) => channel.available && channel.enabled);
}

function automationMetrics(control: AutomationControl) {
  return [
    ["Queued", control.queued_count],
    ["Scheduled", control.scheduled_count],
    ["Pending approval", control.pending_approval_count],
  ].filter((metric): metric is [string, number] => typeof metric[1] === "number");
}

function AlwaysOnAutomations({ source }: { source: SourceState | undefined }) {
  const controls = (source?.records ?? []) as AutomationControl[];

  return <section className={styles.alwaysOnSection} aria-labelledby="always-on-heading">
    <header className={styles.messagesSectionHeading}><h2 id="always-on-heading">Always on</h2><p>Automated touchpoints that keep clients engaged.</p></header>
    {source?.error ? <p className={styles.servicesWarning}>Automation status could not be loaded. Refresh to try again.</p> : null}
    {!source?.error && !controls.length ? <p className={styles.servicesEmpty}>No message automations are configured.</p> : null}
    <div className={styles.automationGrid}>{controls.map((control) => {
      const active = isAutomationActive(control);
      const channels: ReadonlyArray<readonly [string, AutomationChannelCapability]> = [["Email", control.channels.email], ["Text", control.channels.sms]];
      const metrics = automationMetrics(control);
      const waitlist = control.key === "waitlist_match";
      return <article className={styles.automationCard} key={control.key}>
        <header className={styles.automationCardHeader}><div><h3>{control.label}</h3><p>{control.mode === "approval_required" ? "Review before sending" : control.mode === "automatic" ? "Sends automatically" : waitlist ? "Matches clients with open appointments" : "Automation status"}</p></div><span className={`${styles.automationStatus} ${active ? styles.automationStatusOn : ""}`}>{control.feature_available ? active ? "Active" : "Inactive" : "Unavailable"}</span></header>
        {!control.feature_available ? <p className={styles.automationNotice}>{control.unavailable_reason || "This automation is unavailable for this account."}</p> : null}
        <p className={styles.automationServerStatus}>Server status: {control.status_label}</p>
        <div className={styles.automationChannelList}>{channels.map(([name, channel]) => <div key={name}><span>{name}</span><span className={channel.available && channel.enabled ? styles.automationChannelOn : ""}>{channelStatus(channel)}</span>{!channel.available && channel.unavailable_reason ? <small>{channel.unavailable_reason}</small> : null}</div>)}</div>
        {metrics.length ? <dl className={styles.automationMetrics}>{metrics.map(([label, count]) => <div key={label}><dt>{label}</dt><dd>{count}</dd></div>)}</dl> : null}
        <footer className={styles.automationFooter}><Link className={styles.secondaryButton} href={editorHref(control.key)} aria-label={waitlist ? "View waitlist" : `Configure ${control.label}`}>{waitlist ? "View waitlist" : "Configure"}</Link></footer>
      </article>;
    })}</div>
  </section>;
}

function campaignStatus(record: MessageRecord) { return (text(record.lifecycle_status) ?? text(record.status) ?? "unknown").toLowerCase(); }
function campaignName(record: MessageRecord) { return text(record.name) ?? text(record.campaign_name) ?? "Untitled campaign"; }
function campaignDate(record: MessageRecord) { return text(record.scheduled_at) ?? text(record.send_at) ?? text(record.updated_at) ?? text(record.created_at); }
function campaignAudience(record: MessageRecord) {
  for (const key of ["eligible_count", "recipient_count", "total_recipients"]) if (typeof record[key] === "number") return `${record[key]} recipient${record[key] === 1 ? "" : "s"}`;
  return null;
}

function draftRevision(draft: CampaignDraft) { return typeof draft.revision === "number" ? draft.revision : 0; }
function draftContent(draft: CampaignDraft) { return draft.content ?? {}; }
function uuidKey() { return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function clientLabel(client: ClientRow) { return client.preferred_name || [client.first_name, client.last_name].filter(Boolean).join(" ") || "Unnamed client"; }
function responseRoot(value: unknown): MessageRecord { return value && typeof value === "object" ? ((value as MessageRecord).data && typeof (value as MessageRecord).data === "object" ? (value as MessageRecord).data as MessageRecord : value as MessageRecord) : {}; }
function numberAt(record: MessageRecord | null | undefined, key: string) { const value = record?.[key]; return typeof value === "number" && Number.isFinite(value) ? value : null; }
function recordAt(record: MessageRecord | null | undefined, key: string) { const value = record?.[key]; return value && typeof value === "object" && !Array.isArray(value) ? value as MessageRecord : null; }
function displayMoment(value: unknown) { const date = typeof value === "string" ? new Date(value) : null; return date && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date) : "Unavailable"; }
function displayMoney(cents: number | null, currency: string | null) { return cents === null ? "Unavailable" : new Intl.NumberFormat(undefined, { style: "currency", currency: currency || "USD" }).format(cents / 100); }

function CampaignDetail({ campaignId, readOnly, onChanged }: { campaignId: string; readOnly: boolean; onChanged: () => void }) {
  const [detail, setDetail] = useState<MessageRecord | null>(null);
  const [recipients, setRecipients] = useState<MessageRecord[]>([]);
  const [recipientCursor, setRecipientCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingRecipients, setLoadingRecipients] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const [campaign, sent] = await withActiveAccount(async (token) => Promise.all([getCampaign(token, campaignId), getSentOutreach(token)]));
      const sentRows = sent && Array.isArray(sent.data) ? sent.data : [];
      setDetail(campaign); setRecipients(sentRows.filter((row) => text(row.campaign_id) === campaignId || text(row.campaignId) === campaignId)); setRecipientCursor(sent?.next_cursor ?? null);
    } catch (cause) { setError(errorText(cause)); } finally { setLoading(false); }
  };
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, [campaignId]); // eslint-disable-line react-hooks/exhaustive-deps
  async function moreRecipients() {
    if (!recipientCursor) return;
    setLoadingRecipients(true);
    try { const page = await withActiveAccount((token) => getSentOutreach(token, recipientCursor)); setRecipients((current) => { const known = new Set(current.map((row) => String(row.id))); return [...current, ...page.data.filter((row) => (text(row.campaign_id) === campaignId || text(row.campaignId) === campaignId) && !known.has(String(row.id)))]; }); setRecipientCursor(page.next_cursor); }
    catch (cause) { setError(errorText(cause)); } finally { setLoadingRecipients(false); }
  }
  async function cancel() {
    setCancelling(true); setError(null);
    try { const campaign = await withActiveAccount((token) => cancelCampaign(token, campaignId)); setDetail((current) => ({ ...current, ...campaign })); setCancelOpen(false); onChanged(); }
    catch (cause) { if (cause instanceof ApiError && cause.status === 409) { await load(); setError("This campaign is already sending or no longer cancellable. Its latest status is shown."); } else setError(errorText(cause)); } finally { setCancelling(false); }
  }
  if (loading) return <div className={styles.campaignDetail} aria-busy="true">Loading campaign details…</div>;
  if (!detail) return <div className={styles.campaignDetail} role="alert"><p>{error || "Campaign details are unavailable."}</p><button className={styles.secondaryButton} type="button" onClick={() => void load()}>Try again</button></div>;
  const metrics = recordAt(detail, "metrics") ?? recordAt(detail, "summary") ?? {};
  const recipientMetrics = recordAt(metrics, "recipients") ?? {};
  const attribution = recordAt(metrics, "attribution") ?? {};
  const delivery = recordAt(metrics, "delivery_analytics") ?? {};
  const opens = recordAt(delivery, "opens"); const clicks = recordAt(delivery, "clicks");
  const allowed = actionAllowed(detail, "cancel");
  const scheduled = text(detail.scheduled_for) ?? text(detail.scheduled_at);
  const issues = Array.isArray(detail.delivery_issues) ? detail.delivery_issues.filter((item): item is MessageRecord => Boolean(item) && typeof item === "object") : [];
  const appointments = Array.isArray(detail.attributed_appointments) ? detail.attributed_appointments.filter((item): item is MessageRecord => Boolean(item) && typeof item === "object") : null;
  const bookedCount = numberAt(attribution, "booked_count");
  const appointmentsValid = appointments !== null && bookedCount !== null && appointments.length === bookedCount && new Set(appointments.map((row) => String(row.appointment_id))).size === appointments.length;
  const analyticsValue = (metric: MessageRecord | null, key: string) => metric?.available === false ? "Unavailable" : numberAt(metric, key) === null ? "Unavailable" : String(numberAt(metric, key));
  const lifecycle = campaignStatus(detail);
  return <div className={styles.campaignDetail}>
    {error ? <p className={styles.servicesWarning} role="alert">{error}</p> : null}
    <div className={styles.campaignTiming}><span><b>Status</b>{campaignStatus(detail)}</span><span><b>Created</b>{displayMoment(detail.created_at)}</span><span><b>{scheduled ? "Scheduled for" : "Last updated"}</b>{displayMoment(scheduled ?? detail.updated_at)}</span><span><b>Attribution ends</b>{displayMoment(detail.campaign_attribution_eligible_until)}</span></div>
    {lifecycle === "partially_failed" || lifecycle === "failed" || (numberAt(recipientMetrics, "failed") ?? 0) > 0 ? <p className={styles.servicesWarning}>{lifecycle === "failed" ? "This campaign failed to send." : "This campaign had delivery failures. Review the delivery issues below."}</p> : null}
    <section><h3>Delivery</h3><div className={styles.campaignMetrics}>{(["total", "eligible", "queued", "sending", "sent", "delivered", "failed", "skipped", "cancelled"] as const).map((key) => <div key={key}><strong>{numberAt(recipientMetrics, key) ?? "Unavailable"}</strong><span>{key.replace(/_/g, " ")}</span></div>)}<div><strong>{analyticsValue(opens, "unique")}</strong><span>unique opens</span></div><div><strong>{analyticsValue(clicks, "unique")}</strong><span>unique clicks</span></div></div>
      {numberAt(recipientMetrics, "failed") && issues.length ? <div className={styles.campaignIssues}><h4>Delivery issues</h4>{issues.map((issue, index) => <p key={`${text(issue.code) ?? index}-${text(issue.message) ?? ""}`}><strong>{numberAt(issue, "recipient_count") ?? 0} affected</strong> · {text(issue.message) ?? "Delivery failed"}{numberAt(issue, "max_attempt_count") ? ` after ${numberAt(issue, "max_attempt_count")} attempts` : ""}</p>)}</div> : null}
    </section>
    <section><h3>Business impact</h3><div className={styles.campaignMetrics}><div><strong>{bookedCount ?? "Unavailable"}</strong><span>appointments booked</span></div><div><strong>{displayMoney(numberAt(attribution, "booked_revenue_cents"), text(attribution.currency))}</strong><span>attributed revenue</span></div><div><strong>{numberAt(metrics, "link_visits_approximate") ?? "Unavailable"}</strong><span>link visits (approximate)</span></div></div>
      {!appointmentsValid ? <p className={styles.servicesWarning}>Attributed appointment details are unavailable.</p> : appointments.length ? <div className={styles.campaignAppointmentList}>{appointments.map((appointment) => <Link key={String(appointment.appointment_id)} href={`/calendar?appointment=${encodeURIComponent(String(appointment.appointment_id))}`}><strong>{text(appointment.client_name) ?? "Client unavailable"}</strong><span>{Array.isArray(appointment.service_names) && appointment.service_names.length ? appointment.service_names.join(" · ") : "Services unavailable"} · {displayMoment(appointment.starts_at)}{text(appointment.referrer_name) ? ` · Referred by ${text(appointment.referrer_name)}` : ""}</span></Link>)}</div> : <p className={styles.servicesEmpty}>No appointments have been attributed to this campaign.</p>}
    </section>
    <section><h3>Recipients</h3><p className={styles.campaignScope}>Showing loaded terminal recipient history from the last 30 days. Recipient details outside that scope are not available here.</p>{recipients.length ? <div className={styles.campaignRecipientList}>{recipients.map((recipient) => <div key={String(recipient.id)}><span><strong>{nameFor(recipient, "Recipient")}</strong><small>{text(recipient.status) ?? "Terminal"} · {displayMoment(recipient.sent_at ?? recipient.sentAt)}</small></span><span className={styles.scheduledActions}>{navigationLinks(recipient).map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</span></div>)}</div> : <p className={styles.servicesEmpty}>No terminal recipients loaded in the last 30 days.</p>}{recipientCursor ? <button className={styles.secondaryButton} type="button" disabled={loadingRecipients} onClick={() => void moreRecipients()}>{loadingRecipients ? "Loading…" : "Load more recipients"}</button> : null}</section>
    {allowed && !readOnly ? <footer className={styles.campaignDetailActions}>{cancelOpen ? <div className={styles.cancelConfirmation} role="alertdialog" aria-modal="true" aria-label="Cancel scheduled campaign" onKeyDown={(event) => { if (event.key === "Escape" && !cancelling) setCancelOpen(false); }}><p>Cancel this scheduled campaign? Messages that have already started sending cannot be stopped.</p><div><button className={styles.secondaryButton} type="button" disabled={cancelling} onClick={() => setCancelOpen(false)}>Keep campaign</button><button className={styles.dangerButton} type="button" disabled={cancelling} onClick={() => void cancel()}>{cancelling ? "Cancelling…" : "Cancel campaign"}</button></div></div> : <button className={styles.dangerButton} type="button" onClick={() => setCancelOpen(true)}>Cancel scheduled campaign</button>}</footer> : null}
  </div>;
}

function CampaignComposer({ draftId, readOnly, onClose, onChanged }: { draftId: string; readOnly: boolean; onClose: () => void; onChanged: () => void }) {
  const [draft, setDraft] = useState<CampaignDraft | null>(null);
  const [templates, setTemplates] = useState<CampaignTemplate[]>([]);
  const [heroImages, setHeroImages] = useState<MessageRecord[]>([]);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [clientSearch, setClientSearch] = useState("");
  const [stage, setStage] = useState<"setup" | "content" | "review">("setup");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [validationToken, setValidationToken] = useState<string | null>(null);
  const [submissionKey, setSubmissionKey] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<MessageRecord | null>(null);
  const [conflict, setConflict] = useState<{ patch: Record<string, unknown>; currentRevision: number | null } | null>(null);

  const load = async () => {
    setBusy(true); setError(null);
    try {
      const result = await withActiveAccount(async (token) => {
        const [loadedDraft, firstCatalog, heroImagePage, configuration] = await Promise.all([getCampaignDraft(token, draftId), getCampaignTemplates(token), getCampaignEmailHeroImages(token), getCampaignConfiguration(token)]);
        const catalog = [...firstCatalog.data]; let cursor = firstCatalog.next_cursor;
        while (cursor) { const page = await getCampaignTemplates(token, cursor); catalog.push(...page.data); cursor = page.next_cursor; }
        return { loadedDraft, catalog, heroImages: heroImagePage.data, configuration };
      });
      setDraft(result.loadedDraft); setTemplates(result.catalog); setHeroImages(result.heroImages);
      if (!result.loadedDraft.timezone && result.configuration.timezone) setDraft((current) => current ? { ...current, timezone: result.configuration.timezone } : current);
    } catch (cause) { setError(errorText(cause)); }
    finally { setBusy(false); }
  };
  // The draft ID is the external resource key; loading it is the effect's purpose.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, [draftId]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timer = globalThis.setTimeout(() => void withActiveAccount((token) => getClients(token, { search: clientSearch, pageSize: 25 })).then((page) => setClients(page.data)).catch(() => setClients([])), 180);
    return () => globalThis.clearTimeout(timer);
  }, [clientSearch]);

  async function save(patch: Record<string, unknown>, nextStage?: "setup" | "content" | "review") {
    if (!draft || !draftRevision(draft)) return;
    setBusy(true); setError(null); setNotice(null);
    try {
      const updated = await withActiveAccount((token) => updateCampaignDraft(token, draftId, { revision: draftRevision(draft), ...patch }));
      setDraft(updated); setValidationToken(null); setSubmissionKey(null); setConflict(null); if (nextStage) setStage(nextStage); onChanged();
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 409) {
        const detail = cause.details && typeof cause.details === "object" ? cause.details as MessageRecord : {};
        setConflict({ patch, currentRevision: typeof detail.current_revision === "number" ? detail.current_revision : null });
        setError("This campaign was updated elsewhere. Choose which version to keep.");
      } else setError(errorText(cause));
    } finally { setBusy(false); }
  }
  async function keepChanges() {
    if (!conflict) return;
    setBusy(true);
    try { const latest = await withActiveAccount((token) => getCampaignDraft(token, draftId)); setDraft(latest); await save(conflict.patch); }
    catch (cause) { setError(errorText(cause)); setBusy(false); }
  }
  async function acceptServerVersion() { await load(); setConflict(null); setError(null); }
  async function audienceEstimate(audience: Record<string, unknown>, buttons: string[]) {
    try { const result = await withActiveAccount((token) => estimateCampaignAudience(token, { audience, link_buttons: buttons })); setEstimate(responseRoot(result)); }
    catch (cause) { setError(errorText(cause)); }
  }
  async function showPreview() {
    setBusy(true); setError(null);
    try { const result = await withActiveAccount((token) => previewCampaignDraft(token, draftId, "Sara")); const root = responseRoot(result); setPreview(text(root.html) ?? "Preview is unavailable."); }
    catch (cause) { setError(errorText(cause)); } finally { setBusy(false); }
  }
  async function validate() {
    if (!draft) return;
    setBusy(true); setError(null);
    try { const result = await withActiveAccount((token) => validateCampaignDraft(token, draftId, draftRevision(draft))); if (!result.validation_token) throw new ApiError("Campaign validation did not return a submission token.", 502); setValidationToken(result.validation_token); setSubmissionKey(uuidKey()); setNotice("Campaign is ready to submit."); }
    catch (cause) { setError(errorText(cause)); } finally { setBusy(false); }
  }
  async function submit() {
    if (!draft || !validationToken || !submissionKey) return;
    setBusy(true); setError(null);
    try { await withActiveAccount((token) => submitCampaignDraft(token, draftId, draft.send_mode === "scheduled" ? "schedule" : "send", { revision: draftRevision(draft), validation_token: validationToken }, submissionKey)); setNotice(draft.send_mode === "scheduled" ? "Campaign scheduled." : "Campaign is sending."); onChanged(); onClose(); }
    catch (cause) { setError(cause instanceof ApiError ? cause.message : errorText(cause)); } finally { setBusy(false); }
  }
  async function discard() {
    if (!globalThis.confirm("Discard this campaign draft? This cannot be undone.")) return;
    setBusy(true); try { await withActiveAccount((token) => deleteCampaignDraft(token, draftId)); onChanged(); onClose(); } catch (cause) { setError(errorText(cause)); } finally { setBusy(false); }
  }
  if (!draft && busy) return <section className={styles.campaignComposer} aria-busy="true">Loading campaign…</section>;
  if (!draft) return <section className={styles.campaignComposer} role="alert"><p>{error || "Campaign could not be loaded."}</p><button className={styles.secondaryButton} onClick={() => void load()} type="button">Try again</button></section>;
  const content = draftContent(draft); const audience = draft.audience ?? { mode: "everyone", client_ids: [] }; const selectedIds = audience.client_ids ?? []; const templateLocked = Boolean(draft.template_id);
  const buttons = draft.link_buttons ?? [];
  return <section className={styles.campaignComposer} aria-label="Campaign editor">
    <header className={styles.servicesPanelHeader}><div><h2>{draft.name || "New campaign"}</h2><p>Saved draft · revision {draftRevision(draft)}</p></div><button className={styles.secondaryButton} type="button" onClick={onClose}>Close</button></header>
    <nav className={styles.campaignSteps} aria-label="Campaign steps">{(["setup", "content", "review"] as const).map((item, index) => <button type="button" key={item} className={stage === item ? styles.campaignStepActive : ""} onClick={() => setStage(item)}>{index + 1}. {item}</button>)}</nav>
    {error ? <p className={styles.servicesWarning} role="alert">{error}</p> : null}{notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}
    {conflict ? <div className={styles.campaignConflict}><p>The server has a newer revision{conflict.currentRevision ? ` (${conflict.currentRevision})` : ""}.</p><button className={styles.secondaryButton} type="button" disabled={busy} onClick={() => void acceptServerVersion()}>Use server version</button><button className={styles.primaryButton} type="button" disabled={busy} onClick={() => void keepChanges()}>Keep my changes</button></div> : null}
    {stage === "setup" ? <div className={styles.campaignForm}>
      <label>Campaign name<input value={draft.name ?? ""} maxLength={60} disabled={readOnly || busy} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
      <fieldset><legend>Send</legend><label><input type="radio" checked={(draft.send_mode ?? "now") === "now"} disabled={readOnly || busy} onChange={() => setDraft({ ...draft, send_mode: "now", send_at: null })} /> Send now</label><label><input type="radio" checked={draft.send_mode === "scheduled"} disabled={readOnly || busy} onChange={() => setDraft({ ...draft, send_mode: "scheduled" })} /> Schedule</label>{draft.send_mode === "scheduled" ? <input type="datetime-local" value={(draft.send_at ?? "").slice(0, 16)} disabled={readOnly || busy} onChange={(event) => setDraft({ ...draft, send_at: event.target.value ? new Date(event.target.value).toISOString() : null })} /> : null}</fieldset>
      <fieldset><legend>Audience</legend><label><input type="radio" checked={audience.mode !== "specific"} disabled={readOnly || busy} onChange={() => setDraft({ ...draft, audience: { mode: "everyone", client_ids: [] } })} /> Everyone</label><label><input type="radio" checked={audience.mode === "specific"} disabled={readOnly || busy} onChange={() => setDraft({ ...draft, audience: { mode: "specific", client_ids: selectedIds } })} /> Specific clients</label>{audience.mode === "specific" ? <><input placeholder="Search clients" value={clientSearch} onChange={(event) => setClientSearch(event.target.value)} /><div className={styles.campaignClientList}>{clients.map((client) => <label key={client.id}><input type="checkbox" checked={selectedIds.includes(client.id)} onChange={(event) => { const ids = event.target.checked ? [...selectedIds, client.id] : selectedIds.filter((id) => id !== client.id); setDraft({ ...draft, audience: { mode: "specific", client_ids: ids } }); }} /> {clientLabel(client)}</label>)}</div></> : null}</fieldset>
      <button className={styles.secondaryButton} type="button" disabled={readOnly || busy} onClick={() => void audienceEstimate(draft.audience ?? { mode: "everyone", client_ids: [] }, buttons)}>Check eligibility</button>{estimate ? <p className={styles.campaignEligibility}>{typeof estimate.eligible_count === "number" ? `${estimate.eligible_count} eligible recipients` : "Eligibility feedback is available when you validate."}{text(estimate.ineligible_reason) ? ` ${text(estimate.ineligible_reason)}` : ""}</p> : null}
      <footer><button className={styles.dangerButton} type="button" disabled={readOnly || busy} onClick={() => void discard()}>Discard</button><button className={styles.primaryButton} type="button" disabled={readOnly || busy || !(draft.name ?? "").trim()} onClick={() => void save({ name: draft.name, send_mode: draft.send_mode ?? "now", send_at: draft.send_mode === "scheduled" ? draft.send_at : null, timezone: draft.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone, audience: draft.audience ?? { mode: "everyone", client_ids: [] } }, "content")}>Save & continue</button></footer>
    </div> : null}
    {stage === "content" ? <div className={styles.campaignForm}>
      <fieldset><legend>Template</legend><label><input type="radio" checked={!draft.template_id} disabled={readOnly || busy} onChange={() => void save({ template_id: null })} /> Blank email</label>{templates.map((template) => <label key={template.id}><input type="radio" checked={draft.template_id === template.id} disabled={readOnly || busy} onChange={() => void save({ template_id: template.id })} /> {template.name}{template.link_type === "referral_link" ? " · Referral" : ""}</label>)}</fieldset>
      {templateLocked ? <label>Optional message<textarea value={content.additional_message ?? ""} maxLength={2000} disabled={readOnly || busy} onChange={(event) => setDraft({ ...draft, content: { ...content, additional_message: event.target.value } })} /></label> : <><label>Subject<input value={content.subject ?? ""} maxLength={100} disabled={readOnly || busy} onChange={(event) => setDraft({ ...draft, content: { ...content, subject: event.target.value } })} /></label><label>Message<textarea value={content.message ?? ""} maxLength={2000} disabled={readOnly || busy} onChange={(event) => setDraft({ ...draft, content: { ...content, message: event.target.value } })} /></label><fieldset><legend>Links</legend>{(["booking_link", "referral_link"] as const).map((link) => <label key={link}><input type="checkbox" checked={buttons.includes(link)} onChange={(event) => setDraft({ ...draft, link_buttons: event.target.checked ? [...buttons, link] : buttons.filter((button) => button !== link) })} /> {link === "booking_link" ? "Booking link" : "Referral link"}</label>)}</fieldset></>}
      <label>Hero image<select value={draft.hero_image_id ?? ""} disabled={readOnly || busy} onChange={(event) => setDraft({ ...draft, hero_image_id: event.target.value || null })}><option value="">No hero image</option>{heroImages.map((image) => <option key={String(image.id)} value={String(image.id)}>{text(image.name) ?? text(image.alt_text) ?? "Campaign image"}</option>)}</select></label>
      <footer><button className={styles.secondaryButton} type="button" disabled={busy} onClick={() => void showPreview()}>Preview</button><button className={styles.primaryButton} type="button" disabled={readOnly || busy} onClick={() => void save({ ...(templateLocked ? { content: { additional_message: content.additional_message ?? null } } : { content: { subject: content.subject ?? null, message: content.message ?? null }, link_buttons: buttons }), hero_image_id: draft.hero_image_id ?? null }, "review")}>Save & review</button></footer>
      {preview ? <iframe className={styles.campaignPreview} title="Campaign email preview" sandbox="" srcDoc={preview} /> : null}
    </div> : null}
    {stage === "review" ? <div className={styles.campaignReview}><p><strong>{draft.name}</strong> will {draft.send_mode === "scheduled" ? `send at ${draft.send_at || "the selected time"}` : "send now"}.</p><p>{audience.mode === "specific" ? `${selectedIds.length} selected clients` : "Everyone"} · {buttons.length ? buttons.join(", ").replace(/_/g, " ") : "No links"}</p><button className={styles.secondaryButton} type="button" disabled={busy} onClick={() => void showPreview()}>Preview email</button><button className={styles.primaryButton} type="button" disabled={readOnly || busy} onClick={() => void validate()}>{validationToken ? "Validated" : "Validate campaign"}</button><button className={styles.primaryButton} type="button" disabled={readOnly || busy || !validationToken || !submissionKey} onClick={() => void submit()}>{busy ? "Submitting…" : draft.send_mode === "scheduled" ? "Schedule campaign" : "Send campaign"}</button>{preview ? <iframe className={styles.campaignPreview} title="Campaign email preview" sandbox="" srcDoc={preview} /> : null}</div> : null}
  </section>;
}

function CampaignList({ source, readOnly, onChanged, onEditDraft }: { source: SourceState | undefined; readOnly: boolean; onChanged: () => void; onEditDraft: (draftId: string) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const campaigns = (source?.records ?? []).filter((record) => ["draft", "scheduled", "sending"].includes(campaignStatus(record)));

  async function createDraft() {
    setCreating(true); setNotice(null);
    try {
      const draft = await withActiveAccount((token) => createCampaignDraft(token));
      setNotice("Campaign draft created."); onEditDraft(draft.id);
      onChanged();
    } catch (cause) { setNotice(errorText(cause)); }
    finally { setCreating(false); }
  }

  return <section className={styles.campaignSection} aria-labelledby="campaigns-heading">
    <header className={styles.servicesPanelHeader}><div><h2 id="campaigns-heading">Campaigns</h2><p>Planned one-time outreach.</p></div><button className={styles.primaryButton} type="button" disabled={readOnly || creating} onClick={() => void createDraft()}>{creating ? "Creating…" : "New Campaign"}</button></header>
    {readOnly ? <p className={styles.servicesWarning}>Campaign creation is unavailable while this account is read-only.</p> : null}
    {notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}
    {source?.error ? <p className={styles.servicesWarning}>Campaigns could not be loaded. Refresh to try again.</p> : null}
    {!source?.error && !campaigns.length ? <p className={styles.servicesEmpty}>No draft, scheduled, or sending campaigns.</p> : null}
    <div className={styles.campaignList}>{campaigns.map((campaign, index) => {
      const id = String(campaign.id ?? `campaign-${index}`);
      const isExpanded = expanded === id;
      const status = campaignStatus(campaign);
      const date = campaignDate(campaign);
      const audience = campaignAudience(campaign);
      return <article className={styles.campaignCard} key={id}><button className={styles.campaignSummary} type="button" onClick={() => setExpanded(isExpanded ? null : id)} aria-expanded={isExpanded} aria-controls={`campaign-${id}`}><span><strong>{campaignName(campaign)}</strong><small><em className={`${styles.campaignStatusChip} ${status === "scheduled" ? styles.campaignStatusScheduled : status === "sending" ? styles.campaignStatusSending : status === "draft" ? styles.campaignStatusDraft : ""}`}>{status}</em>{date ? ` · ${date}` : ""}</small></span><b aria-hidden="true">{isExpanded ? "−" : "+"}</b></button>{isExpanded ? <div className={styles.campaignDetails} id={`campaign-${id}`}><p>{audience ? `Audience: ${audience}` : "Audience summary unavailable."}</p>{status === "draft" && campaign.id ? <button className={styles.secondaryButton} type="button" onClick={() => onEditDraft(String(campaign.id))}>Resume editing</button> : campaign.id ? <CampaignDetail campaignId={String(campaign.id)} readOnly={readOnly} onChanged={onChanged} /> : null}</div> : null}</article>;
    })}</div>
  </section>;
}

function localDate(dateTime: string | null, timezone: string) {
  if (!dateTime) return null;
  const date = new Date(dateTime);
  if (Number.isNaN(date.getTime())) return null;
  const formatter = (timeZone: string) => new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" });
  try {
    const parts = formatter(timezone).formatToParts(date);
    const value = (kind: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === kind)?.value;
    return `${value("year")}-${value("month")}-${value("day")}`;
  } catch {
    const parts = formatter("UTC").formatToParts(date);
    const value = (kind: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === kind)?.value;
    return `${value("year")}-${value("month")}-${value("day")}`;
  }
}

function dateTimeFor(record: MessageRecord) { return text(record.scheduled_at) ?? text(record.send_at) ?? text(record.scheduled_for) ?? text(record.created_at); }
function labelForType(record: MessageRecord, fallback: string) { return (text(record.message_type) ?? text(record.automation_key) ?? text(record.type) ?? fallback).replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function dayDistance(date: string, today: string) { return Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000); }
function actionAllowed(record: MessageRecord, action: string) { const actions = record.allowed_actions; return Array.isArray(actions) ? actions.includes(action) : Boolean(actions && typeof actions === "object" && (actions as Record<string, unknown>)[action]); }
function resourceId(record: MessageRecord, key: "client" | "appointment" | "campaign") { const direct = text(record[`${key}_id`]); const recipient = record.recipient && typeof record.recipient === "object" ? record.recipient as MessageRecord : null; return direct ?? (key === "client" ? text(recipient?.client_id) : null); }
function navigationLinks(record: MessageRecord) {
  const links: Array<{ label: string; href: string }> = [];
  const clientId = resourceId(record, "client"); const appointmentId = resourceId(record, "appointment"); const campaignId = resourceId(record, "campaign");
  if (clientId && actionAllowed(record, "view_client")) links.push({ label: "Client", href: `/clients?client=${encodeURIComponent(clientId)}` });
  if (appointmentId && actionAllowed(record, "view_appointment")) links.push({ label: "Appointment", href: `/calendar?appointment=${encodeURIComponent(appointmentId)}` });
  if (campaignId && (actionAllowed(record, "view_campaign") || actionAllowed(record, "view"))) links.push({ label: "Campaign", href: `/messages?tab=manage&campaign=${encodeURIComponent(campaignId)}` });
  return links;
}

function ScheduledCommunications({ snapshot, readOnly, onChanged }: { snapshot: TabSnapshot; readOnly: boolean; onChanged: () => void }) {
  const [expanded, setExpanded] = useState({ next: true, future: false });
  const [cancelTarget, setCancelTarget] = useState<MessageRecord | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const scheduled = sourceByKey(snapshot, "scheduled")?.records ?? [];
  const approvals = sourceByKey(snapshot, "approvals")?.records ?? [];
  const campaigns = (sourceByKey(snapshot, "campaigns")?.records ?? []).filter((record) => ["scheduled", "sending"].includes(campaignStatus(record)));
  const timezone = snapshot.timezone;
  const today = localDate(new Date().toISOString(), timezone) ?? localDate(new Date().toISOString(), "UTC")!;
  const rows = [...scheduled.map((record) => ({ record, kind: "message" })), ...approvals.map((record) => ({ record, kind: "approval" }))];
  const groups = { next: [] as typeof rows, future: [] as typeof rows };
  for (const row of rows) {
    const date = localDate(dateTimeFor(row.record), timezone);
    if (date && dayDistance(date, today) >= 0 && dayDistance(date, today) <= 2) groups.next.push(row);
    else groups.future.push(row);
  }
  const campaignGroups = { next: [] as MessageRecord[], future: [] as MessageRecord[] };
  for (const campaign of campaigns) {
    const date = localDate(dateTimeFor(campaign), timezone);
    if (date && dayDistance(date, today) >= 0 && dayDistance(date, today) <= 2) campaignGroups.next.push(campaign);
    else campaignGroups.future.push(campaign);
  }
  const hasItems = rows.length > 0 || campaigns.length > 0;

  async function cancelMessage() {
    if (!cancelTarget || typeof cancelTarget.id !== "string") return;
    const scheduledSendId = cancelTarget.id;
    setCancelling(true); setNotice(null);
    try {
      await withActiveAccount((token) => cancelScheduledOutreach(token, scheduledSendId));
      setCancelTarget(null);
      setNotice("Message cancelled. This does not turn off the automation for future messages.");
      onChanged();
    } catch (cause) {
      setCancelTarget(null);
      if ((cause instanceof ApiError || (cause && typeof cause === "object")) && (cause as ApiError).status === 409) {
        setNotice("This message is already being sent. The schedule was refreshed.");
        onChanged();
      } else setNotice(errorText(cause));
    } finally { setCancelling(false); }
  }

  return <>{notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}{cancelTarget ? <section className={styles.cancelConfirmation} role="alertdialog" aria-modal="true" aria-label="Cancel scheduled message" onKeyDown={(event) => { if (event.key === "Escape" && !cancelling) setCancelTarget(null); }}><p>Cancel this message? This does not turn off the automation for future messages.</p><div><button className={styles.serviceDeleteConfirm} type="button" disabled={cancelling} onClick={() => void cancelMessage()}>{cancelling ? "Cancelling…" : "Cancel message"}</button><button className={styles.secondaryButton} type="button" disabled={cancelling} onClick={() => setCancelTarget(null)}>Keep message</button></div></section> : null}{!hasItems ? <section className={styles.messagesEmptyState}><strong>Nothing scheduled.</strong><span>When you schedule outreach or a campaign, it will appear here.</span></section> : <div className={styles.scheduledGroups}>{(["next", "future"] as const).map((group) => {
    const individual = groups[group]; const groupedCampaigns = campaignGroups[group]; const isExpanded = expanded[group];
    if (!individual.length && !groupedCampaigns.length) return null;
    return <section className={styles.scheduledGroup} key={group}><button className={styles.scheduledGroupSummary} type="button" onClick={() => setExpanded((current) => ({ ...current, [group]: !current[group] }))} aria-expanded={isExpanded} aria-controls={`scheduled-${group}`}><span>{group === "next" ? "Next 3 days" : "Future"}</span><b aria-hidden="true">{isExpanded ? "−" : "+"}</b></button>{isExpanded ? <div id={`scheduled-${group}`}>
      {individual.length ? <div className={styles.scheduledTableWrap}><table className={styles.scheduledTable}><thead><tr><th>Date</th><th>Name</th><th>Type</th><th>Actions</th></tr></thead><tbody>{individual.map(({ record, kind }, index) => { const links = navigationLinks(record); const cancellable = kind === "message" && actionAllowed(record, "cancel") && record.can_cancel !== false; return <tr key={String(record.id ?? `${kind}-${index}`)}><td>{localDate(dateTimeFor(record), timezone) ?? "Date unavailable"}</td><td>{nameFor(record, "Client")}</td><td>{kind === "approval" ? "Approval" : labelForType(record, "Message")}</td><td><span className={styles.scheduledActions}>{links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}{cancellable ? <button type="button" disabled={readOnly} onClick={() => setCancelTarget(record)}>Cancel</button> : null}</span></td></tr>; })}</tbody></table></div> : null}
      {groupedCampaigns.length ? <div className={styles.scheduledTableWrap}><table className={styles.scheduledTable}><thead><tr><th>Date</th><th>Name</th><th>Sent</th><th>Actions</th></tr></thead><tbody>{groupedCampaigns.map((campaign, index) => { const id = text(campaign.id); const canView = actionAllowed(campaign, "view") || actionAllowed(campaign, "view_campaign"); return <tr key={String(campaign.id ?? `campaign-${index}`)}><td>{localDate(dateTimeFor(campaign), timezone) ?? "Date unavailable"}</td><td>{campaignName(campaign)}</td><td>{typeof campaign.sent_count === "number" ? campaign.sent_count : "—"}</td><td>{id && canView ? <span className={styles.scheduledActions}><Link href={`/messages?tab=manage&campaign=${encodeURIComponent(id)}`}>Campaign</Link></span> : null}</td></tr>; })}</tbody></table></div> : null}
    </div> : null}</section>;
  })}</div>}</>;
}

function uniqueRecords(records: MessageRecord[]) {
  const seen = new Set<string>();
  return records.filter((record, index) => { const key = text(record.id) ?? `row-${index}`; if (seen.has(key)) return false; seen.add(key); return true; });
}

function sentAt(record: MessageRecord) { return text(record.sent_at) ?? text(record.sentAt) ?? text(record.delivered_at) ?? text(record.deliveredAt) ?? text(record.created_at); }
function sentTimestamp(record: MessageRecord) { const value = sentAt(record); const timestamp = value ? Date.parse(value) : Number.NaN; return Number.isNaN(timestamp) ? null : timestamp; }

function SentHistory({ snapshot, readOnly, onChanged }: { snapshot: TabSnapshot; readOnly: boolean; onChanged: () => void }) {
  const source = sourceByKey(snapshot, "sent");
  const [items, setItems] = useState(() => uniqueRecords(source?.records ?? []));
  const [nextCursor, setNextCursor] = useState(source?.nextCursor ?? null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState({ recent: true, earlier: false });
  const [now] = useState(() => Date.now());
  const lowerBound = now - 30 * 24 * 60 * 60 * 1000;
  const recentBound = now - 3 * 24 * 60 * 60 * 1000;
  const automated = items.filter((record) => !text(record.campaign_id) && !text(record.campaignId)).filter((record) => { const timestamp = sentTimestamp(record); return timestamp !== null && timestamp >= lowerBound && timestamp <= now; });
  const recent = automated.filter((record) => (sentTimestamp(record) ?? 0) >= recentBound);
  const earlier = automated.filter((record) => (sentTimestamp(record) ?? 0) < recentBound);
  const terminalCampaigns = (sourceByKey(snapshot, "campaigns")?.records ?? []).filter((record) => !["draft", "scheduled", "sending"].includes(campaignStatus(record)));

  async function loadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true); setLoadMoreError(null);
    try {
      const page = await withActiveAccount((token) => getSentOutreach(token, nextCursor));
      setItems((current) => uniqueRecords([...current, ...page.data]));
      setNextCursor(page.next_cursor);
    } catch (cause) { setLoadMoreError(errorText(cause)); }
    finally { setLoadingMore(false); }
  }

  return <div className={styles.sentHistory}>
    <section className={styles.sentCampaigns} aria-labelledby="sent-campaigns-heading"><header className={styles.messagesSectionHeading}><h2 id="sent-campaigns-heading">Campaigns</h2><p>Completed and other terminal campaign outcomes.</p></header>{!terminalCampaigns.length ? <p className={styles.servicesEmpty}>No completed campaigns loaded.</p> : <div className={styles.campaignList}>{terminalCampaigns.map((campaign, index) => { const id = String(campaign.id ?? `campaign-${index}`); const isExpanded = expandedCampaign === id; const status = campaignStatus(campaign); return <article className={styles.campaignCard} key={id}><button className={styles.campaignSummary} type="button" onClick={() => setExpandedCampaign(isExpanded ? null : id)} aria-expanded={isExpanded} aria-controls={`sent-campaign-${id}`}><span><strong>{campaignName(campaign)}</strong><small><em className={styles.campaignStatusChip}>{status}</em>{campaignDate(campaign) ? ` · ${campaignDate(campaign)}` : ""}</small></span><b aria-hidden="true">{isExpanded ? "−" : "+"}</b></button>{isExpanded && campaign.id ? <div className={styles.campaignDetails} id={`sent-campaign-${id}`}><CampaignDetail campaignId={String(campaign.id)} readOnly={readOnly} onChanged={onChanged} /></div> : null}</article>; })}</div>}</section>
    <section className={styles.sentMessages} aria-labelledby="sent-messages-heading"><header className={styles.messagesSectionHeading}><h2 id="sent-messages-heading">Automated messages</h2><p>Showing {automated.length} loaded message{automated.length === 1 ? "" : "s"} from the last 30 days.</p></header>{loadMoreError ? <p className={styles.servicesWarning}>{loadMoreError}</p> : null}{!automated.length ? <p className={styles.servicesEmpty}>No automated messages in the loaded 30-day history.</p> : <div className={styles.scheduledGroups}>{(["recent", "earlier"] as const).map((group) => { const records = group === "recent" ? recent : earlier; const isExpanded = expanded[group]; if (!records.length) return null; return <section className={styles.scheduledGroup} key={group}><button className={styles.scheduledGroupSummary} type="button" onClick={() => setExpanded((current) => ({ ...current, [group]: !current[group] }))} aria-expanded={isExpanded}>{group === "recent" ? "Recent" : "Earlier"}</button>{isExpanded ? <div className={styles.scheduledTableWrap}><table className={styles.scheduledTable}><thead><tr><th>Date</th><th>Client</th><th>Type</th></tr></thead><tbody>{records.map((record, index) => <tr key={String(record.id ?? `sent-${index}`)}><td>{localDate(sentAt(record), snapshot.timezone) ?? "Date unavailable"}</td><td>{nameFor(record, "Client")}</td><td>{labelForType(record, "Message")}</td></tr>)}</tbody></table></div> : null}</section>; })}</div>}{nextCursor ? <button className={styles.secondaryButton} type="button" disabled={loadingMore} onClick={() => void loadMore()}>{loadingMore ? "Loading…" : "Load more"}</button> : null}</section>
  </div>;
}

async function loadTab(accessToken: string, tab: MessageTab) {
  const accessPromise = getAccountAccess(accessToken);
  const timezonePromise = tab === "scheduled" || tab === "sent" ? getAutomationBootstrap(accessToken).then((bootstrap) => bootstrap.account_timezone || "UTC").catch(() => "UTC") : Promise.resolve("UTC");
  const sources = tab === "manage"
    ? await Promise.all([
      settledSource("inquiries", "Booking inquiries", getBookingInquiries(accessToken)),
      settledSource("approvals", "Appointment approvals", getActivityApprovals(accessToken)),
      settledSource("waitlist", "Waitlist", getWaitlistEntries(accessToken)),
      settledSource("automations", "Automations", getAutomationBootstrap(accessToken).then((bootstrap) => ({ data: bootstrap.controls }))),
      settledSource("campaigns", "Campaigns", getCampaigns(accessToken)),
    ])
    : tab === "scheduled"
      ? await Promise.all([
        settledSource("scheduled", "Scheduled messages", getScheduledOutreach(accessToken)),
        settledSource("approvals", "Messages awaiting approval", getPendingOutreachApprovals(accessToken)),
        settledSource("campaigns", "Scheduled campaigns", getCampaigns(accessToken)),
      ])
      : await Promise.all([
        settledSource("sent", "Automated messages", getSentOutreach(accessToken)),
        settledSource("campaigns", "Campaigns", getCampaigns(accessToken)),
      ]);
  return { sources, access: await accessPromise, timezone: await timezonePromise };
}

export function MessagesScreen({ initialTab = "scheduled", focusWaitlist = false }: { initialTab?: MessageTab; focusWaitlist?: boolean }) {
  const [tab, setTab] = useState<MessageTab>(initialTab);
  const [snapshots, setSnapshots] = useState<Partial<Record<MessageTab, TabSnapshot>>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const cache = useRef<Partial<Record<MessageTab, TabSnapshot>>>({});
  const requestVersion = useRef(0);

  useEffect(() => {
    const refreshMessages = () => { setRefreshing(true); setRefreshVersion((value) => value + 1); };
    globalThis.addEventListener("rootfoil:appointments-changed", refreshMessages);
    return () => globalThis.removeEventListener("rootfoil:appointments-changed", refreshMessages);
  }, []);

  useEffect(() => {
    const version = ++requestVersion.current;
    void withActiveAccount((accessToken) => loadTab(accessToken, tab))
      .then(({ sources, access, timezone }) => {
        if (version !== requestVersion.current) return;
        const allSourcesFailed = sources.every((source) => source.error);
        const prior = cache.current[tab];
        if (allSourcesFailed && prior) {
          setSnapshots((current) => ({ ...current, [tab]: { ...prior, stale: true } }));
          setLoadError("We couldn’t load any message data. Try again.");
          return;
        }
        const next = { tab, sources, access, timezone, loadedAt: Date.now() } satisfies TabSnapshot;
        cache.current[tab] = next;
        setSnapshots((current) => ({ ...current, [tab]: next }));
        setLoadError(allSourcesFailed ? "We couldn’t load any message data. Try again." : null);
      })
      .catch((error) => { if (version === requestVersion.current) setLoadError(errorText(error)); })
      .finally(() => { if (version === requestVersion.current) setRefreshing(false); });
  }, [refreshVersion, tab]);

  const current = snapshots[tab] ?? null;
  const copy = tabCopy[tab];
  const failures = current?.sources.filter((source) => source.error) ?? [];
  const stale = current?.stale === true;
  const readOnly = current?.access.mode === "read_only";
  const unavailable = current?.access.mode === "blocked" || current?.access.isActive === false;

  function refresh() { setRefreshing(true); setRefreshVersion((value) => value + 1); }

  return <WorkspaceShell active="messages"><section className={styles.messagesPage}>
    <PageHeading title="Messages" subtitle="Keep your clients engaged." action={<button className={styles.secondaryButton} type="button" onClick={refresh} disabled={refreshing}>{refreshing ? "Refreshing…" : "Refresh"}</button>} />
    <nav className={styles.localTabs} aria-label="Messages sections">
      {(Object.keys(tabCopy) as MessageTab[]).map((candidate) => <button className={tab === candidate ? styles.localTabActive : ""} type="button" key={candidate} onClick={() => setTab(candidate)} aria-current={tab === candidate ? "page" : undefined}>{candidate === "manage" ? "Manage" : candidate === "scheduled" ? "Scheduled" : "Sent"}</button>)}
    </nav>
    <header className={styles.messagesSectionHeading}><h2>{copy.heading}</h2><p>{copy.description}</p></header>
    {readOnly ? <p className={styles.servicesWarning} role="status">This account is read-only. You can view messages, but actions and changes are unavailable.</p> : null}
    {unavailable ? <section className={styles.messagesStatus} role="alert"><p>Messages are unavailable while this account is inactive.</p></section> : null}
    {stale ? <section className={styles.messagesStatus} role="status"><p>We couldn’t refresh messages. Showing previously loaded data.</p><button className={styles.secondaryButton} type="button" onClick={refresh} disabled={refreshing}>Try again</button></section> : null}
    {loadError && !current ? <section className={styles.messagesStatus} role="alert"><p>{loadError}</p><button className={styles.secondaryButton} type="button" onClick={refresh} disabled={refreshing}>Try again</button></section> : null}
    {!current && !loadError ? <section className={styles.messagesStatus} aria-busy="true"><p>Loading messages…</p></section> : null}
    {current && !unavailable ? <section className={styles.servicesPanel} aria-live="polite">
      {failures.length ? <p className={styles.servicesWarning}>Some message data could not be loaded: {failures.map((source) => source.label).join(", ")}. <button className={styles.secondaryButton} type="button" onClick={refresh} disabled={refreshing}>Retry</button></p> : null}
      {tab === "manage" ? <NeedsAttention key={focusWaitlist ? "waitlist" : "default"} snapshot={current} initialExpanded={focusWaitlist ? "waitlist" : null} /> : tab === "scheduled" ? <ScheduledCommunications snapshot={current} readOnly={Boolean(readOnly)} onChanged={refresh} /> : <SentHistory key={current.loadedAt} snapshot={current} readOnly={Boolean(readOnly)} onChanged={refresh} />}
    </section> : null}
    {current && !unavailable && tab === "manage" ? <AlwaysOnAutomations source={sourceByKey(current, "automations")} /> : null}
    {current && !unavailable && tab === "manage" ? <CampaignList source={sourceByKey(current, "campaigns")} readOnly={Boolean(readOnly)} onChanged={refresh} onEditDraft={setActiveDraftId} /> : null}
    {activeDraftId && current && !unavailable ? <CampaignComposer draftId={activeDraftId} readOnly={Boolean(readOnly)} onClose={() => setActiveDraftId(null)} onChanged={refresh} /> : null}
  </section></WorkspaceShell>;
}
