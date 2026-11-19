"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ApiError,
  createClient,
  createClientNote,
  createClientFormula,
  deleteClient,
  decideAppointment,
  getAccountProfile,
  getClientAppointmentsPage,
  getClientDetail,
  getClientFormula,
  getClientFormulasPage,
  getClientMessageHistoryPage,
  getClientNotesPage,
  getClientReturnTiming,
  getClients,
  getServices,
  updateClient,
  updateClientNote,
  type ClientDetail,
  type ClientNote,
  type CreateClientBody,
  type ClientRow,
  type ClientsListQuery,
  type ClientsPage,
} from "@/src/lib/api";
import { AccountLifecycleError, withActiveAccount } from "@/src/lib/auth/active-account";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

type ClientsLoadState = "loading" | "ready" | "refreshing" | "error";
type ClientDetailLoadState = "idle" | "loading" | "ready" | "error";
type CreateClientFormState = {
  firstName: string;
  lastName: string;
  preferredName: string;
  phone: string;
  email: string;
  birthday: string;
};

const INITIAL_QUERY: Required<Omit<ClientsListQuery, "search">> = {
  page: 1,
  pageSize: 25,
  sort: "updated_at",
  direction: "desc",
  filter: "all",
};

const clientsPageCache = new Map<string, ClientsPage>();
const accountTimezoneCache = new Map<string, string>();
const formulasTabCache = new Map<string, boolean>();
const clientDetailCache = new Map<string, ClientDetail>();
const EMPTY_CREATE_FORM: CreateClientFormState = {
  firstName: "",
  lastName: "",
  preferredName: "",
  phone: "",
  email: "",
  birthday: "",
};

function queryCacheKey(query: ClientsListQuery) {
  return JSON.stringify({
    search: query.search?.trim() || "",
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 25,
    sort: query.sort ?? "updated_at",
    direction: query.direction ?? "desc",
    filter: query.filter ?? "all",
  });
}

function displayName(client: ClientRow) {
  return client.preferred_name?.trim() || `${client.first_name} ${client.last_name}`.trim();
}

function initials(client: ClientRow) {
  if (client.avatar_initials?.trim()) {
    return client.avatar_initials.trim();
  }

  return displayName(client)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatMoney(value: ClientRow["total_spend"]) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string | null, timezone: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
}

function formatAppointment(value: string, timezone: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getClientErrorMessage(error: unknown, subject: "clients" | "client" | "mutation") {
  if (error instanceof AccountLifecycleError) {
    return "Your account is not active. Restore account access to continue.";
  }

  if (error instanceof ApiError) {
    if (error.status === 400) {
      return subject === "mutation"
        ? "Please review the client information and try again."
        : "The client request was not valid. Refresh and try again.";
    }
    if (error.status === 403) {
      return "You no longer have access to these client records.";
    }
    if (error.status === 404) {
      return "This client is no longer available in this account.";
    }
    if (error.status === 429) {
      return `Too many requests. Try again${error.retryAfterSeconds ? ` in ${error.retryAfterSeconds} seconds` : " shortly"}.`;
    }
    if (error.status === 0 || error.status >= 500) {
      return "The client service is temporarily unavailable. Please try again.";
    }
  }

  return "Unable to complete the client request. Please try again.";
}

function isAmbiguousMutationFailure(error: unknown) {
  return error instanceof ApiError && (error.status === 0 || error.status >= 500);
}

function isValidBirthday(value: string) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) {
    return false;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const date = new Date(2000, month - 1, day);
  return date.getFullYear() === 2000 && date.getMonth() === month - 1 && date.getDate() === day;
}

export function ClientsScreenClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState<ClientsListQuery>(INITIAL_QUERY);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState<ClientsPage | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [formulasEnabled, setFormulasEnabled] = useState(true);
  const [loadState, setLoadState] = useState<ClientsLoadState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [detailLoadState, setDetailLoadState] = useState<ClientDetailLoadState>("idle");
  const [detailErrorMessage, setDetailErrorMessage] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [detailRefreshVersion, setDetailRefreshVersion] = useState(0);
  const requestVersion = useRef(0);
  const detailRequestVersion = useRef(0);
  const handledDetailRefreshVersion = useRef(0);
  const pageRef = useRef<ClientsPage | null>(null);
  const handledRefreshVersion = useRef(0);
  const cacheKey = useMemo(() => queryCacheKey(query), [query]);

  useEffect(() => {
    if (typeof globalThis.matchMedia !== "function") return;
    const media = globalThis.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const refreshClients = () => { clientsPageCache.clear(); clientDetailCache.clear(); setRefreshVersion((value) => value + 1); if (selectedClientId) setDetailRefreshVersion((value) => value + 1); };
    globalThis.addEventListener("rootfoil:appointments-changed", refreshClients);
    return () => globalThis.removeEventListener("rootfoil:appointments-changed", refreshClients);
  }, [selectedClientId]);

  useEffect(() => { const timer = globalThis.setTimeout(() => setQuery((current) => ({ ...current, search: searchInput.trim() || undefined, page: 1 })), 300); return () => globalThis.clearTimeout(timer); }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();
    const version = ++requestVersion.current;
    const isRefresh = refreshVersion !== handledRefreshVersion.current;
    handledRefreshVersion.current = refreshVersion;
    setLoadState(pageRef.current ? "refreshing" : "loading");
    setErrorMessage(null);

    void withActiveAccount(async (accessToken, _access, accountId) => {
      const scopedCacheKey = `${accountId}:${cacheKey}`;
      const cached = clientsPageCache.get(scopedCacheKey);
      let accountTimezone = accountTimezoneCache.get(accountId);
      let accountFormulasEnabled = formulasTabCache.get(accountId);

      if (!accountTimezone || accountFormulasEnabled === undefined) {
        const profile = await getAccountProfile(accessToken);
        accountTimezone = profile.timezone ?? "UTC";
        accountFormulasEnabled = profile.client_formulas_tab_enabled ?? true;
        accountTimezoneCache.set(accountId, accountTimezone);
        formulasTabCache.set(accountId, accountFormulasEnabled);
      }

      if (cached && !isRefresh) {
        return { page: cached, timezone: accountTimezone, formulasEnabled: accountFormulasEnabled };
      }

      const result = await getClients(accessToken, query, {
        signal: controller.signal,
      });
      clientsPageCache.set(scopedCacheKey, result);
      return { page: result, timezone: accountTimezone, formulasEnabled: accountFormulasEnabled };
    })
      .then((result) => {
        if (controller.signal.aborted || version !== requestVersion.current) {
          return;
        }

        pageRef.current = result.page;
        setPage(result.page);
        setTimezone(result.timezone);
        setFormulasEnabled(result.formulasEnabled);
        setLoadState("ready");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || version !== requestVersion.current) {
          return;
        }

        setLoadState("error");
        setErrorMessage(getClientErrorMessage(error, "clients"));
      });

    return () => controller.abort();
  }, [cacheKey, query, refreshVersion]);

  useEffect(() => {
    const refreshProfilePreferences = () => {
      formulasTabCache.clear();
      void withActiveAccount(async (accessToken, _access, accountId) => {
        const profile = await getAccountProfile(accessToken);
        const enabled = profile.client_formulas_tab_enabled ?? true;
        formulasTabCache.set(accountId, enabled);
        return enabled;
      }).then(setFormulasEnabled).catch(() => undefined);
    };
    globalThis.addEventListener("rootfoil:profile-settings-changed", refreshProfilePreferences);
    return () => globalThis.removeEventListener("rootfoil:profile-settings-changed", refreshProfilePreferences);
  }, []);

  useEffect(() => {
    if (!selectedClientId) {
      return;
    }

    const controller = new AbortController();
    const version = ++detailRequestVersion.current;
    const isRefresh = detailRefreshVersion !== handledDetailRefreshVersion.current;
    handledDetailRefreshVersion.current = detailRefreshVersion;

    void withActiveAccount(async (accessToken, _access, accountId) => {
      const cacheKey = `${accountId}:${selectedClientId}`;
      const cached = clientDetailCache.get(cacheKey);

      if (cached && !isRefresh) {
        return cached;
      }

      const result = await getClientDetail(selectedClientId, accessToken, {
        signal: controller.signal,
      });
      clientDetailCache.set(cacheKey, result);
      return result;
    })
      .then((result) => {
        if (controller.signal.aborted || version !== detailRequestVersion.current) {
          return;
        }

        setDetail(result);
        setDetailLoadState("ready");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || version !== detailRequestVersion.current) {
          return;
        }

        if (error instanceof ApiError && error.status === 404) {
          setSelectedClientId(null);
          setDetail(null);
          setDetailLoadState("idle");
          setDetailErrorMessage(null);
          setRefreshVersion((value) => value + 1);
          return;
        }

        setDetailLoadState("error");
        setDetailErrorMessage(getClientErrorMessage(error, "client"));
      });

    return () => controller.abort();
  }, [detailRefreshVersion, selectedClientId]);

  const isNoResults = Boolean(query.search?.trim()) && page?.data.length === 0;
  const isEmpty = !query.search?.trim() && page?.data.length === 0;

  function selectClient(clientId: string) {
    if (clientId === selectedClientId) {
      return;
    }

    setSelectedClientId(clientId);
    setDetail(null);
    setDetailLoadState("loading");
    setDetailErrorMessage(null);
  }

  function retryClientDetail() {
    setDetail(null);
    setDetailLoadState("loading");
    setDetailErrorMessage(null);
    setDetailRefreshVersion((value) => value + 1);
  }

  function closeClientDetail() {
    setSelectedClientId(null);
    setDetail(null);
    setDetailLoadState("idle");
    setDetailErrorMessage(null);
  }

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage === (query.page ?? 1)) {
      return;
    }

    setSelectedClientId(null);
    setDetail(null);
    setDetailLoadState("idle");
    setDetailErrorMessage(null);
    setQuery((current) => ({ ...current, page: nextPage }));
  }

  function handleClientCreated(client: ClientRow, accountId: string) {
    for (const key of clientsPageCache.keys()) {
      if (key.startsWith(`${accountId}:`)) {
        clientsPageCache.delete(key);
      }
    }

    setIsCreateOpen(false);
    selectClient(client.id);
    setRefreshVersion((value) => value + 1);
  }

  return <WorkspaceShell active="clients"><section>
    <PageHeading title="Clients" subtitle="Every relationship, every detail." action={<span className={styles.clientHeadingActions}><button className={styles.secondaryButton} type="button" onClick={() => setIsImportOpen(true)}>Import</button><button className={styles.primaryButton} type="button" onClick={() => setIsCreateOpen(true)}>＋ Add Client</button></span>} />
    <label className={styles.clientSearch}><span aria-hidden="true">⌕</span><input aria-label="Search clients" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search clients by name, phone, or notes" /></label>
    {loadState === "refreshing" ? <p className={styles.clientsRefresh} role="status">Refreshing clients…</p> : null}
    {loadState === "loading" ? <ClientsStatus title="Loading clients…" /> : null}
    {loadState === "error" ? <ClientsStatus title="Unable to load clients" message={errorMessage ?? undefined} action={<button className={styles.secondaryButton} type="button" onClick={() => setRefreshVersion((value) => value + 1)}>Try again</button>} /> : null}
    {loadState !== "loading" && loadState !== "error" && isEmpty ? <ClientsStatus title="No clients yet" message="Clients you add or book will appear here." /> : null}
    {loadState !== "loading" && loadState !== "error" && isNoResults ? <ClientsStatus title="No clients found" message="Try a different search." /> : null}
    {page && timezone && page.data.length > 0 ? <><div className={styles.clientsLayout}><section className={styles.clientTableWrap}><p className={styles.clientCount}>{page.totalCount} client{page.totalCount === 1 ? "" : "s"}</p>{!isMobile ? <table className={styles.clientTable}><thead><tr><th>Name</th><th>Last Seen</th><th>Visits</th><th>Total Spent</th><th>Next Appointment</th></tr></thead><tbody>{page.data.map((client) => <tr className={selectedClientId === client.id ? styles.selectedRow : ""} key={client.id}><td><button className={styles.clientRowSelect} type="button" onClick={() => selectClient(client.id)} aria-pressed={selectedClientId === client.id}><span className={styles.clientAvatar}>{initials(client)}</span><strong>{displayName(client)}</strong>{client.is_vip ? <span className={styles.vipPill}>VIP</span> : null}</button></td><td>{formatDate(client.last_visit_at, timezone)}</td><td>{client.completed_visit_count}</td><td>{formatMoney(client.total_spend)}</td><td>{client.has_future_appointment && client.next_appointment_at ? <span className={styles.nextPill}>{formatAppointment(client.next_appointment_at, timezone)}</span> : <span className={styles.muted}>No upcoming appointment</span>}</td></tr>)}</tbody></table> : <div className={styles.clientMobileList}>{page.data.map((client) => <button className={`${styles.clientMobileRow} ${selectedClientId === client.id ? styles.selectedRow : ""}`} type="button" onClick={() => selectClient(client.id)} aria-pressed={selectedClientId === client.id} key={client.id}><span className={styles.clientMobileIdentity}><strong>{displayName(client)}</strong>{client.is_vip ? <span className={styles.vipPill}>VIP</span> : null}</span><strong className={styles.clientMobileSpend}>{formatMoney(client.total_spend)}</strong><span>{formatDate(client.last_visit_at, timezone)} · {client.completed_visit_count} visit{client.completed_visit_count === 1 ? "" : "s"}</span><span className={styles.clientMobileNext}>{client.has_future_appointment && client.next_appointment_at ? formatAppointment(client.next_appointment_at, timezone) : "No upcoming appointment"}</span></button>)}</div>}</section><ClientDetailPanel selectedClientId={selectedClientId} detail={detail} loadState={detailLoadState} errorMessage={detailErrorMessage} formulasEnabled={formulasEnabled} onClose={closeClientDetail} onRetry={retryClientDetail} onChanged={() => { clientDetailCache.clear(); clientsPageCache.clear(); setDetailRefreshVersion((value) => value + 1); setRefreshVersion((value) => value + 1); }} /></div>{page.totalCount > page.pageSize ? <nav className={styles.clientsPagination} aria-label="Client list pagination"><span>Page {page.page} of {Math.max(1, Math.ceil(page.totalCount / page.pageSize))}</span><button className={styles.secondaryButton} type="button" onClick={() => changePage(page.page - 1)} disabled={page.page <= 1 || loadState === "refreshing"}>Previous</button><button className={styles.secondaryButton} type="button" onClick={() => changePage(page.page + 1)} disabled={(!page.nextCursor && page.page * page.pageSize >= page.totalCount) || loadState === "refreshing"}>Next</button></nav> : null}</> : null}
    {isCreateOpen ? <CreateClientDialog onClose={() => setIsCreateOpen(false)} onCreated={handleClientCreated} /> : null}
    {isImportOpen ? <ImportClientsDialog onClose={() => setIsImportOpen(false)} onImported={() => setRefreshVersion((value) => value + 1)} /> : null}
  </section></WorkspaceShell>;
}

function ClientsStatus({ title, message, action }: { title: string; message?: string; action?: React.ReactNode }) {
  return <section className={styles.clientsStatus} role="status"><h2>{title}</h2>{message ? <p>{message}</p> : null}{action ? <div>{action}</div> : null}</section>;
}

type ProfileTab = "profile" | "history" | "formulas";
function ClientDetailPanel({ selectedClientId, detail, loadState, errorMessage, formulasEnabled, onClose, onRetry, onChanged }: { selectedClientId: string | null; detail: ClientDetail | null; loadState: ClientDetailLoadState; errorMessage: string | null; formulasEnabled: boolean; onClose: () => void; onRetry: () => void; onChanged: () => void }) {
  const className = `${styles.clientDetail} ${selectedClientId ? styles.clientDetailMobileOpen : ""}`;
  if (!selectedClientId) {
    return <aside className={className}><p className={styles.clientDetailPlaceholder}>Select a client to view their details.</p></aside>;
  }
  if (loadState === "loading") {
    return <aside className={className}><button className={styles.closePanel} type="button" onClick={onClose} aria-label="Close client details">×</button><p className={styles.clientDetailPlaceholder} role="status">Loading client details…</p></aside>;
  }
  if (loadState === "error" || !detail) {
    return <aside className={className}><button className={styles.closePanel} type="button" onClick={onClose} aria-label="Close client details">×</button><p className={styles.clientDetailPlaceholder}>Unable to load client details{errorMessage ? `: ${errorMessage}` : "."}</p><button className={styles.secondaryButton} type="button" onClick={onRetry}>Try again</button></aside>;
  }
  return <ClientLoadedDetail detail={detail} formulasEnabled={formulasEnabled} onClose={onClose} onChanged={onChanged} />;
}

function ClientLoadedDetail({ detail, formulasEnabled, onClose, onChanged }: { detail: ClientDetail; formulasEnabled: boolean; onClose: () => void; onChanged: () => void }) {
  const { client, identity, snapshot, next_appointment: nextAppointment, next_appointment_summary: nextSummary } = detail;
  const [tab, setTab] = useState<ProfileTab>("profile"); const [saving, setSaving] = useState(false); const [mutationError, setMutationError] = useState<string | null>(null); const [returnTiming, setReturnTiming] = useState<Record<string, unknown> | null>(null); const [editing, setEditing] = useState(false); const [edit, setEdit] = useState({ first_name: client.first_name, last_name: client.last_name, phone: client.phone ?? "", email: client.email ?? "", birthday: client.birthday ?? "" });
  useEffect(() => { setTab("profile"); setReturnTiming(null); if (!nextAppointment) void withActiveAccount((token) => getClientReturnTiming(client.id, token)).then(setReturnTiming).catch(() => undefined); }, [client.id, nextAppointment]);
  async function save(body: Parameters<typeof updateClient>[2]) { setSaving(true); setMutationError(null); try { await withActiveAccount((token) => updateClient(client.id, token, body)); onChanged(); } catch (cause) { setMutationError(getClientErrorMessage(cause, "mutation")); } finally { setSaving(false); } }
  async function decision(value: "accept" | "reject") { const appointmentId = typeof nextAppointment?.id === "string" ? nextAppointment.id : null; if (!appointmentId) return; setSaving(true); setMutationError(null); try { await withActiveAccount((token) => decideAppointment(appointmentId, token, value)); onChanged(); } catch (cause) { setMutationError(getClientErrorMessage(cause, "mutation")); } finally { setSaving(false); } }
  async function saveEdit() { const first_name = edit.first_name.trim(); const last_name = edit.last_name.trim(); const phone = edit.phone.trim(); const email = edit.email.trim(); if (!first_name || !last_name || (phone && phone.replace(/\D/g, "").length < 10) || (email && !/^\S+@\S+\.\S+$/.test(email))) { setMutationError("Enter both names, a 10-digit phone number, and a valid email address."); return; } await save({ first_name, last_name, phone: phone || null, email: email || null, birthday: edit.birthday.trim() || null }); setEditing(false); }
  async function remove() { if (!globalThis.confirm(`Delete ${identity.display_name}? This cannot be undone.`)) return; setSaving(true); setMutationError(null); try { await withActiveAccount((token) => deleteClient(client.id, token)); onChanged(); onClose(); } catch (cause) { setMutationError(getClientErrorMessage(cause, "mutation")); } finally { setSaving(false); } }
  const activeTab = !formulasEnabled && tab === "formulas" ? "profile" : tab;
  const tabs = (["profile", "history"] as ProfileTab[]).concat(formulasEnabled ? ["formulas"] : []);
  const status = String(nextAppointment?.status ?? nextSummary?.status_label ?? "").toLowerCase();
  const canDecide = Boolean(nextAppointment && (status.includes("pending") || status.includes("request")));
  return <aside className={`${styles.clientDetail} ${styles.clientDetailMobileOpen}`}><button className={styles.closePanel} type="button" onClick={onClose} aria-label="Close client details">×</button><header className={styles.clientProfile}><span className={`${styles.clientAvatar} ${styles.largeAvatar}`}>{identity.avatar_initials || initials(client)}</span><div className={styles.clientProfileIdentity}><h2>{identity.display_name}</h2><label className={styles.clientVipToggle}><input aria-label="VIP client" type="checkbox" checked={identity.is_vip} disabled={saving} onChange={(event) => void save({ is_vip: event.target.checked })} /><span>VIP</span></label></div></header><nav className={styles.clientProfileTabs} aria-label="Client profile sections">{tabs.map((item) => <button type="button" className={activeTab === item ? styles.clientProfileTabActive : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</nav>{mutationError ? <p className={styles.clientFormError} role="alert">{mutationError}</p> : null}{activeTab === "profile" ? <><DetailSection title="Contact"><div className={styles.clientContact}><p>{client.phone ? <a href={`tel:${client.phone}`}>Phone <span>{client.phone}</span></a> : "No phone number"}</p><p>{client.email ? <a href={`mailto:${client.email}`}>Email <span>{client.email}</span></a> : "No email address"}</p></div><button className={`${styles.secondaryButton} ${styles.clientEditButton}`} type="button" onClick={() => setEditing(true)}>Edit client</button></DetailSection>{editing ? <DetailSection title="Edit Client"><div className={styles.clientFormulaCreate}><input aria-label="First name" value={edit.first_name} onChange={(event) => setEdit({ ...edit, first_name: event.target.value })} /><input aria-label="Last name" value={edit.last_name} onChange={(event) => setEdit({ ...edit, last_name: event.target.value })} /><input aria-label="Phone number" value={edit.phone} onChange={(event) => setEdit({ ...edit, phone: event.target.value })} /><input aria-label="Email" value={edit.email} onChange={(event) => setEdit({ ...edit, email: event.target.value })} /><input aria-label="Birthday MM/DD" value={edit.birthday} onChange={(event) => setEdit({ ...edit, birthday: event.target.value })} placeholder="MM/DD" /><button className={styles.primaryButton} type="button" disabled={saving} onClick={() => void saveEdit()}>Save client</button><button className={styles.secondaryButton} type="button" disabled={saving} onClick={() => setEditing(false)}>Cancel</button><button className={styles.secondaryButton} type="button" disabled={saving} onClick={() => void remove()}>Delete client</button></div></DetailSection> : null}<DetailSection title="Client Snapshot"><div className={styles.clientStats}><div><b>{snapshot.total_completed_visits}</b><span>Visits</span></div><div><b>{formatMoney(snapshot.total_spent)}</b><span>Lifetime spend</span></div><div><b>{snapshot.average_ticket == null ? "—" : formatMoney(snapshot.average_ticket)}</b><span>Avg. ticket</span></div><div><b>{snapshot.average_days_between_visits == null ? "—" : `${snapshot.average_days_between_visits}d`}</b><span>Between visits</span></div><div><b>{snapshot.last_visit_label ?? "—"}</b><span>Last visit</span></div><div><b>{snapshot.member_since_label ?? "—"}</b><span>Member since</span></div></div>{client.birthday ? <p>Birthday: {client.birthday}</p> : null}</DetailSection><DetailSection title="Next Appointment">{nextAppointment && nextSummary ? <><strong>{nextSummary.when_label ?? "Upcoming appointment"}</strong><p>{[nextSummary.duration_label, nextSummary.status_label].filter(Boolean).join(" · ")}</p>{canDecide ? <p><button className={styles.secondaryButton} type="button" disabled={saving} onClick={() => void decision("accept")}>Approve</button> <button className={styles.secondaryButton} type="button" disabled={saving} onClick={() => void decision("reject")}>Reject</button></p> : null}</> : <div className={styles.clientAppointmentEmpty}>{returnTiming ? <p>{String(returnTiming.label ?? returnTiming.status ?? "Return timing available")}</p> : <p>No upcoming appointment.</p>}<a className={styles.secondaryButton} href={`/calendar?client=${encodeURIComponent(client.id)}`}>Book appointment</a></div>}</DetailSection><ClientNotes clientId={client.id} legacyNotes={client.notes} /><ClientPhotos detail={detail} /></> : null}{activeTab === "history" ? <ClientHistory clientId={client.id} initialBookings={detail.recent_history.data} initialCursor={detail.recent_history.next_cursor} referrals={detail.referral_history} /> : null}{activeTab === "formulas" ? <ClientFormulas clientId={client.id} /> : null}</aside>;
}

function ClientHistory({ clientId, initialBookings, initialCursor, referrals }: { clientId: string; initialBookings: Array<Record<string, unknown>>; initialCursor: string | null; referrals?: ClientDetail["referral_history"] }) { const [bookings, setBookings] = useState(initialBookings); const [bookingCursor, setBookingCursor] = useState(initialCursor); const [messages, setMessages] = useState<Array<Record<string, unknown>>>([]); const [messageCursor, setMessageCursor] = useState<string | null>(null); const [state, setState] = useState<"loading" | "ready" | "error">("loading"); useEffect(() => { setBookings(initialBookings); setBookingCursor(initialCursor); setState("loading"); void withActiveAccount((token) => getClientMessageHistoryPage(clientId, token)).then((page) => { setMessages(page.data); setMessageCursor(page.nextCursor); setState("ready"); }).catch(() => setState("error")); }, [clientId, initialBookings, initialCursor]); const moreBookings = () => void withActiveAccount((token) => getClientAppointmentsPage(clientId, token, bookingCursor)).then((page) => { setBookings((old) => [...old, ...page.data.filter((item) => !old.some((saved) => saved.id === item.id))]); setBookingCursor(page.nextCursor); }); const moreMessages = () => void withActiveAccount((token) => getClientMessageHistoryPage(clientId, token, messageCursor)).then((page) => { setMessages((old) => [...old, ...page.data.filter((item) => !old.some((saved) => saved.id === item.id))]); setMessageCursor(page.nextCursor); }); return <><DetailSection title="Booking History"><HistoryRows items={bookings} empty="No bookings yet." />{bookingCursor ? <button className={styles.secondaryButton} type="button" onClick={moreBookings}>Load more bookings</button> : null}</DetailSection>{referrals ? <DetailSection title="Referral History">{referrals.length ? <div className={styles.clientHistory}>{referrals.map((item) => <div key={item.client_id}><strong>{item.client_name}</strong><span>{item.first_appointment_at ?? "First appointment unavailable"}</span></div>)}</div> : null}</DetailSection> : null}<DetailSection title="Message History">{state === "loading" ? <p>Loading…</p> : null}{state === "error" ? <p>Unable to load message history.</p> : null}<HistoryRows items={messages} empty="No messages yet." />{messageCursor ? <button className={styles.secondaryButton} type="button" onClick={moreMessages}>Load more messages</button> : null}</DetailSection></>; }
function HistoryRows({ items, empty }: { items: Array<Record<string, unknown>>; empty: string }) { return items.length ? <div className={styles.clientHistory}>{items.map((item, index) => <div key={String(item.id ?? index)}><strong>{String(item.service_name ?? item.subject ?? item.kind ?? item.status ?? "Record")}</strong><span>{String(item.appointment_date ?? item.sentAt ?? item.sent_at ?? item.created_at ?? "")}</span></div>)}</div> : <p>{empty}</p>; }

function ClientNotes({ clientId, legacyNotes }: { clientId: string; legacyNotes: string | null }) { const [notes, setNotes] = useState<ClientNote[]>([]); const [cursor, setCursor] = useState<string | null>(null); const [draft, setDraft] = useState(""); const [error, setError] = useState<string | null>(null); const [available, setAvailable] = useState(true); const pendingKey = useRef<string | null>(null); const load = (next?: string | null) => void withActiveAccount((token) => getClientNotesPage(clientId, token, next)).then((page) => { setNotes((old) => next ? [...old, ...page.data.filter((note) => !old.some((saved) => saved.id === note.id))] : page.data); setCursor(page.next_cursor); }).catch(() => setAvailable(false)); useEffect(() => { setNotes([]); setAvailable(true); pendingKey.current = null; load(); }, [clientId]); async function add() { const content = draft.trim(); if (!content || content.length > 5000) { setError("Notes must be between 1 and 5,000 characters."); return; } setError(null); const key = pendingKey.current ?? crypto.randomUUID(); pendingKey.current = key; try { const note = await withActiveAccount((token) => createClientNote(clientId, token, content, key)); setNotes((old) => [note, ...old]); setDraft(""); pendingKey.current = null; } catch { setError("Unable to add note. Your draft is still here; try again."); } } return <DetailSection title="Notes">{available ? <><div className={styles.clientHistory}>{notes.slice(0, 2).map((note) => <div key={note.id}><strong>{note.author_type === "customer" ? "Client" : note.author_display_name ?? "Staff"}</strong><span>{note.content}</span>{note.permissions.can_edit && note.author_type !== "customer" ? <button className={styles.secondaryButton} type="button" onClick={() => { const content = globalThis.prompt("Edit note", note.content); if (content?.trim()) void withActiveAccount((token) => updateClientNote(clientId, note.id, token, content.trim(), note.version)).then((saved) => setNotes((old) => old.map((item) => item.id === saved.id ? saved : item))).catch(() => setError("This note changed elsewhere. Refresh and review it.")); }}>Edit</button> : null}</div>)}</div><label className={styles.clientNotes}>Add note<textarea value={draft} maxLength={5000} onChange={(event) => setDraft(event.target.value)} /><button className={styles.secondaryButton} type="button" onClick={() => void add()}>Add note</button></label>{cursor ? <button className={styles.secondaryButton} type="button" onClick={() => load(cursor)}>View all notes</button> : null}</> : <p>{legacyNotes ? legacyNotes : "Notes are unavailable until the separate notes service is enabled."}</p>}{error ? <p className={styles.clientFormError} role="alert">{error}</p> : null}</DetailSection>; }
function ClientPhotos({ detail }: { detail: ClientDetail }) { const history = detail.visual_history; if (!history || !history.history_available) return <DetailSection title="Photos"><p>{history ? "Photo history is unavailable for this client." : "No photos yet."}</p></DetailSection>; const photos = history.data.filter((photo) => photo.thumbnail_url).sort((a, b) => b.created_at.localeCompare(a.created_at)); return <DetailSection title="Photos">{photos.length ? <div className={styles.clientHistory}>{photos.slice(0, 3).map((photo) => <a key={photo.id} href={photo.full_url ?? photo.thumbnail_url ?? "#"} target="_blank" rel="noreferrer">{photo.caption ?? photo.service_label ?? photo.source_label}</a>)}</div> : <p>No photos yet.</p>}</DetailSection>; }

function ClientFormulas({ clientId }: { clientId: string }) { const [items, setItems] = useState<Array<Record<string, unknown>>>([]); const [cursor, setCursor] = useState<string | null>(null); const [services, setServices] = useState<Array<{ id: string; name: string }>>([]); const [serviceId, setServiceId] = useState(""); const [notes, setNotes] = useState(""); const [selected, setSelected] = useState<Record<string, unknown> | null>(null); const load = (next?: string | null) => void withActiveAccount((token) => getClientFormulasPage(clientId, token, next)).then((page) => { setItems((current) => next ? [...current, ...page.data] : page.data); setCursor(page.nextCursor); }).catch(() => undefined); useEffect(() => { load(); void withActiveAccount((token) => getServices(token)).then((rows) => setServices(rows.map((row) => ({ id: row.id, name: row.name })))); }, [clientId]); async function create() { if (!serviceId) return; await withActiveAccount((token) => createClientFormula(clientId, token, { service_id: serviceId, notes })); setServiceId(""); setNotes(""); load(); } return <DetailSection title="Formulas"><div className={styles.clientFormulaCreate}><select value={serviceId} onChange={(event) => setServiceId(event.target.value)}><option value="">Choose service</option>{services.map((service) => <option value={service.id} key={service.id}>{service.name}</option>)}</select><input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Formula notes" /><button className={styles.secondaryButton} type="button" onClick={() => void create()} disabled={!serviceId}>Add formula</button></div>{items.map((item, index) => <button className={styles.clientFormulaRow} type="button" key={String(item.id ?? index)} onClick={() => void withActiveAccount((token) => getClientFormula(clientId, String(item.id), token)).then((value) => setSelected(value as Record<string, unknown>))}><strong>{String(item.service_name ?? item.name ?? "Formula")}</strong><span>{String(item.notes ?? item.created_at ?? "View detail")}</span></button>)}{cursor ? <button className={styles.secondaryButton} type="button" onClick={() => load(cursor)}>Load more</button> : null}{selected ? <pre className={styles.clientFormulaDetail}>{JSON.stringify(selected, null, 2)}</pre> : null}</DetailSection>; }

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className={styles.infoSection}><h3>{title}</h3>{children}</section>;
}

function CreateClientDialog({ onClose, onCreated }: { onClose: () => void; onCreated: (client: ClientRow, accountId: string) => void }) {
  const [form, setForm] = useState<CreateClientFormState>(EMPTY_CREATE_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  function dismiss() {
    if (submitting) return;
    if (Object.values(form).some((value) => value.trim()) && !globalThis.confirm("Discard this new client? Your entered details will be lost.")) return;
    onClose();
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || submitting) return;
      if (Object.values(form).some((value) => value.trim()) && !globalThis.confirm("Discard this new client? Your entered details will be lost.")) return;
      onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [form, onClose, submitting]);

  function updateField<Key extends keyof CreateClientFormState>(key: Key, value: CreateClientFormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function buildBody(): CreateClientBody | null {
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const birthday = form.birthday.trim();

    if (!firstName || !lastName) {
      setErrorMessage("First and last name are required.");
      return null;
    }

    if (!phone && !email) {
      setErrorMessage("Enter a phone number or email address.");
      return null;
    }

    if (birthday && !isValidBirthday(birthday)) {
      setErrorMessage("Birthday must use DD/MM and be a valid calendar date.");
      return null;
    }

    return {
      first_name: firstName,
      last_name: lastName,
      ...(phone ? { phone } : {}),
      ...(email ? { email } : {}),
      ...(form.preferredName.trim() ? { preferred_name: form.preferredName.trim() } : {}),
      ...(birthday ? { birthday } : {}),
    };
  }

  async function verifyAmbiguousCreate(body: CreateClientBody) {
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await withActiveAccount(async (accessToken, _access, accountId) => {
        const page = await getClients(accessToken, {
          ...INITIAL_QUERY,
          search: `${body.first_name} ${body.last_name}`,
        });
        const client = page.data.find((candidate) =>
          candidate.first_name.trim().toLocaleLowerCase() === body.first_name.toLocaleLowerCase()
          && candidate.last_name.trim().toLocaleLowerCase() === body.last_name.toLocaleLowerCase()
          && ((body.email && candidate.email?.trim().toLocaleLowerCase() === body.email.toLocaleLowerCase())
            || (body.phone && candidate.phone?.trim() === body.phone)),
        );
        return client ? { client, accountId } : null;
      });

      if (result) {
        onCreated(result.client, result.accountId);
        return;
      }

      setErrorMessage("No matching client was found yet. Refresh the list before choosing whether to submit again.");
    } catch (error) {
      setErrorMessage(getClientErrorMessage(error, "clients"));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = buildBody();
    if (!body || requiresVerification) {
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await withActiveAccount(async (accessToken, _access, accountId) => ({
        client: await createClient(accessToken, body),
        accountId,
      }));
      onCreated(result.client, result.accountId);
    } catch (error) {
      if (isAmbiguousMutationFailure(error)) {
        setRequiresVerification(true);
        setErrorMessage("We could not confirm whether the client was created. Check for the client before submitting again.");
      } else {
        setErrorMessage(getClientErrorMessage(error, "mutation"));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return <div className={`${styles.clientDialogBackdrop} ${styles.clientCreateBackdrop}`} role="presentation"><section className={`${styles.clientDialog} ${styles.clientCreateDialog}`} role="dialog" aria-modal="true" aria-labelledby="create-client-title"><header className={styles.clientCreateHeader}><button className={styles.clientCreateBack} type="button" aria-label="Back to clients" onClick={dismiss} disabled={submitting}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg></button><h2 id="create-client-title">Add Client</h2><button className={styles.clientCreateClose} type="button" aria-label="Close add client" onClick={dismiss} disabled={submitting}>×</button></header><form className={styles.clientCreateForm} onSubmit={handleSubmit}><div className={styles.clientFormGrid}><label>First name<input ref={firstInputRef} value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} autoComplete="given-name" /></label><label>Last name<input value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} autoComplete="family-name" /></label><label>Preferred name <span>(optional)</span><input value={form.preferredName} onChange={(event) => updateField("preferredName", event.target.value)} autoComplete="nickname" /></label><label>Birthday <span>(optional)</span><input aria-label="Birthday DD/MM" value={form.birthday} onChange={(event) => updateField("birthday", event.target.value)} placeholder="DD/MM" inputMode="numeric" /></label><label>Phone<input type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" inputMode="tel" /></label><label>Email<input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" autoCapitalize="none" autoCorrect="off" /></label></div>{errorMessage ? <p className={styles.clientFormError} role="alert">{errorMessage}</p> : null}<footer className={styles.clientCreateActions}><button className={`${styles.secondaryButton} ${styles.clientCreateCancel}`} type="button" onClick={dismiss} disabled={submitting}>Cancel</button>{requiresVerification ? <button className={styles.primaryButton} type="button" disabled={submitting} onClick={() => { const body = buildBody(); if (body) { void verifyAmbiguousCreate(body); } }}>{submitting ? "Checking…" : "Check for Client"}</button> : <button className={styles.primaryButton} type="submit" disabled={submitting}>{submitting ? "Adding…" : "Add Client"}</button>}</footer></form></section></div>;
}

function ImportClientsDialog({ onClose, onImported }: { onClose: () => void; onImported: () => void }) {
  const [csv, setCsv] = useState(""); const [error, setError] = useState<string | null>(null); const [saving, setSaving] = useState(false); const [result, setResult] = useState<string | null>(null);
  function useFile(file?: File) { if (!file) return; const reader = new FileReader(); reader.onload = () => setCsv(String(reader.result ?? "")); reader.readAsText(file); }
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const lines = csv.split(/\r?\n/).map((line) => line.trim()).filter(Boolean); const rows = lines.slice(1).map((line) => line.split(",").map((part) => part.trim())); const candidates = rows.map(([first_name, last_name, phone, email]) => ({ first_name, last_name, ...(phone ? { phone } : {}), ...(email ? { email } : {}) })).filter((row) => row.first_name && row.last_name && (row.phone || row.email)); if (!candidates.length) { setError("Use a CSV with headers: first_name,last_name,phone,email."); return; } setSaving(true); setError(null); try { await withActiveAccount(async (token) => { for (const client of candidates) await createClient(token, client); }); setResult(`${candidates.length} client${candidates.length === 1 ? "" : "s"} imported.`); onImported(); } catch (cause) { setError(getClientErrorMessage(cause, "mutation")); } finally { setSaving(false); } }
  return <div className={styles.clientDialogBackdrop} role="presentation"><section className={styles.clientDialog} role="dialog" aria-modal="true" aria-labelledby="import-clients-title"><header className={styles.clientDialogHeader}><div><h2 id="import-clients-title">Import clients</h2><p>Upload a CSV with first_name, last_name, phone, and email columns.</p></div><button className={styles.closePanel} type="button" onClick={onClose} aria-label="Close import">×</button></header><form onSubmit={submit}><label className={styles.clientNotes}>CSV file<input type="file" accept=".csv,text/csv" onChange={(event) => useFile(event.target.files?.[0])} /><textarea value={csv} onChange={(event) => setCsv(event.target.value)} placeholder={"first_name,last_name,phone,email\nJordan,Lee,5551234567,jordan@example.com"} /></label>{error ? <p className={styles.clientFormError}>{error}</p> : null}{result ? <p className={styles.clientsRefresh}>{result}</p> : null}<div className={styles.clientDialogActions}><button className={styles.secondaryButton} type="button" onClick={onClose}>Close</button><button className={styles.primaryButton} type="submit" disabled={saving}>{saving ? "Importing…" : "Import clients"}</button></div></form></section></div>;
}
