"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ApiError,
  createClient,
  getAccountProfile,
  getClientDetail,
  getClients,
  type ClientDetail,
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
  preferredContactMethod: "" | "text" | "call" | "email" | "instagram";
  source: "" | "referral" | "instagram" | "walk-in" | "existing-client" | "other";
  isVip: boolean;
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
const clientDetailCache = new Map<string, ClientDetail>();
const EMPTY_CREATE_FORM: CreateClientFormState = {
  firstName: "",
  lastName: "",
  preferredName: "",
  phone: "",
  email: "",
  birthday: "",
  preferredContactMethod: "",
  source: "",
  isVip: false,
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
  const [query, setQuery] = useState<ClientsListQuery>(INITIAL_QUERY);
  const [page, setPage] = useState<ClientsPage | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<ClientsLoadState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [detailLoadState, setDetailLoadState] = useState<ClientDetailLoadState>("idle");
  const [detailErrorMessage, setDetailErrorMessage] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [detailRefreshVersion, setDetailRefreshVersion] = useState(0);
  const requestVersion = useRef(0);
  const detailRequestVersion = useRef(0);
  const handledDetailRefreshVersion = useRef(0);
  const pageRef = useRef<ClientsPage | null>(null);
  const handledRefreshVersion = useRef(0);
  const cacheKey = useMemo(() => queryCacheKey(query), [query]);

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

      if (!accountTimezone) {
        accountTimezone = (await getAccountProfile(accessToken)).timezone;
        accountTimezoneCache.set(accountId, accountTimezone);
      }

      if (cached && !isRefresh) {
        return { page: cached, timezone: accountTimezone };
      }

      const result = await getClients(accessToken, query, {
        signal: controller.signal,
      });
      clientsPageCache.set(scopedCacheKey, result);
      return { page: result, timezone: accountTimezone };
    })
      .then((result) => {
        if (controller.signal.aborted || version !== requestVersion.current) {
          return;
        }

        pageRef.current = result.page;
        setPage(result.page);
        setTimezone(result.timezone);
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
    <PageHeading title="Clients" subtitle="Build lasting relationships with every client." action={<button className={styles.primaryButton} type="button" onClick={() => setIsCreateOpen(true)}>＋ Add Client</button>} />
    {loadState === "refreshing" ? <p className={styles.clientsRefresh} role="status">Refreshing clients…</p> : null}
    {loadState === "loading" ? <ClientsStatus title="Loading clients…" /> : null}
    {loadState === "error" ? <ClientsStatus title="Unable to load clients" message={errorMessage ?? undefined} action={<button className={styles.secondaryButton} type="button" onClick={() => setRefreshVersion((value) => value + 1)}>Try again</button>} /> : null}
    {loadState !== "loading" && loadState !== "error" && isEmpty ? <ClientsStatus title="No clients yet" message="Clients you add or book will appear here." /> : null}
    {loadState !== "loading" && loadState !== "error" && isNoResults ? <ClientsStatus title="No clients found" message="Try a different search." /> : null}
    {page && timezone && page.data.length > 0 ? <><div className={styles.clientsLayout}><section className={styles.clientTableWrap}><table className={styles.clientTable}><thead><tr><th>Name</th><th>Last Seen</th><th>Visits</th><th>Total Spent</th><th>Next Appointment</th></tr></thead><tbody>{page.data.map((client) => <tr className={selectedClientId === client.id ? styles.selectedRow : ""} key={client.id}><td><button className={styles.clientRowSelect} type="button" onClick={() => selectClient(client.id)} aria-pressed={selectedClientId === client.id}><span className={styles.clientAvatar}>{initials(client)}</span><strong>{displayName(client)}</strong>{client.is_vip ? <span className={styles.vipPill}>VIP</span> : null}</button></td><td>{formatDate(client.last_visit_at, timezone)}</td><td>{client.completed_visit_count}</td><td>{formatMoney(client.total_spend)}</td><td>{client.has_future_appointment && client.next_appointment_at ? <span className={styles.nextPill}>{formatAppointment(client.next_appointment_at, timezone)}</span> : <span className={styles.muted}>No upcoming appointment</span>}</td></tr>)}</tbody></table></section><ClientDetailPanel selectedClientId={selectedClientId} detail={detail} loadState={detailLoadState} errorMessage={detailErrorMessage} onRetry={retryClientDetail} /></div>{page.totalCount > page.pageSize ? <nav className={styles.clientsPagination} aria-label="Client list pagination"><span>Page {page.page} of {Math.max(1, Math.ceil(page.totalCount / page.pageSize))}</span><button className={styles.secondaryButton} type="button" onClick={() => changePage(page.page - 1)} disabled={page.page <= 1 || loadState === "refreshing"}>Previous</button><button className={styles.secondaryButton} type="button" onClick={() => changePage(page.page + 1)} disabled={(!page.nextCursor && page.page * page.pageSize >= page.totalCount) || loadState === "refreshing"}>Next</button></nav> : null}</> : null}
    {isCreateOpen ? <CreateClientDialog onClose={() => setIsCreateOpen(false)} onCreated={handleClientCreated} /> : null}
  </section></WorkspaceShell>;
}

function ClientsStatus({ title, message, action }: { title: string; message?: string; action?: React.ReactNode }) {
  return <section className={styles.clientsStatus} role="status"><h2>{title}</h2>{message ? <p>{message}</p> : null}{action ? <div>{action}</div> : null}</section>;
}

function ClientDetailPanel({ selectedClientId, detail, loadState, errorMessage, onRetry }: { selectedClientId: string | null; detail: ClientDetail | null; loadState: ClientDetailLoadState; errorMessage: string | null; onRetry: () => void }) {
  if (!selectedClientId) {
    return <aside className={styles.clientDetail}><p className={styles.clientDetailPlaceholder}>Select a client to view their details.</p></aside>;
  }

  if (loadState === "loading") {
    return <aside className={styles.clientDetail}><p className={styles.clientDetailPlaceholder} role="status">Loading client details…</p></aside>;
  }

  if (loadState === "error" || !detail) {
    return <aside className={styles.clientDetail}><p className={styles.clientDetailPlaceholder}>Unable to load client details{errorMessage ? `: ${errorMessage}` : "."}</p><button className={styles.secondaryButton} type="button" onClick={onRetry}>Try again</button></aside>;
  }

  const { client, identity, snapshot, next_appointment: nextAppointment, next_appointment_summary: nextSummary } = detail;
  return <aside className={styles.clientDetail}><div className={styles.clientProfile}><span className={`${styles.clientAvatar} ${styles.largeAvatar}`}>{identity.avatar_initials || initials(client)}</span><div><h2>{identity.display_name}</h2>{identity.is_vip ? <span className={styles.vipPill}>VIP Client</span> : null}</div></div><DetailSection title="Contact"><p>{client.phone ?? "No phone number"}</p><p>{client.email ?? "No email address"}</p></DetailSection><DetailSection title="Client Stats"><div className={styles.clientStats}><div><b>{snapshot.total_completed_visits}</b><span>Total Visits</span></div><div><b>{formatMoney(snapshot.total_spent)}</b><span>Total Value</span></div><div><b>{snapshot.last_visit_label ?? "—"}</b><span>Last Seen</span></div></div></DetailSection><DetailSection title="Next Appointment">{nextAppointment && nextSummary ? <><strong>{nextSummary.when_label ?? "Upcoming appointment"}</strong><p>{[nextSummary.duration_label, nextSummary.status_label].filter(Boolean).join(" · ")}</p></> : <p>No upcoming appointment.</p>}</DetailSection></aside>;
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className={styles.infoSection}><h3>{title}</h3>{children}</section>;
}

function CreateClientDialog({ onClose, onCreated }: { onClose: () => void; onCreated: (client: ClientRow, accountId: string) => void }) {
  const [form, setForm] = useState<CreateClientFormState>(EMPTY_CREATE_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(false);

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
      ...(form.preferredContactMethod ? { preferred_contact_method: form.preferredContactMethod } : {}),
      ...(form.source ? { source: form.source } : {}),
      is_vip: form.isVip,
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

  return <div className={styles.clientDialogBackdrop} role="presentation"><section className={styles.clientDialog} role="dialog" aria-modal="true" aria-labelledby="create-client-title"><header className={styles.clientDialogHeader}><div><h2 id="create-client-title">Add Client</h2><p>Create a client profile for your workspace.</p></div><button className={styles.closePanel} type="button" aria-label="Close add client" onClick={onClose} disabled={submitting}>×</button></header><form onSubmit={handleSubmit}><div className={styles.clientFormGrid}><label>First name<input value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} autoComplete="given-name" /></label><label>Last name<input value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} autoComplete="family-name" /></label><label>Preferred name<input value={form.preferredName} onChange={(event) => updateField("preferredName", event.target.value)} /></label><label>Birthday <span>DD/MM</span><input value={form.birthday} onChange={(event) => updateField("birthday", event.target.value)} placeholder="24/09" inputMode="numeric" /></label><label>Phone<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" /></label><label>Email<input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" /></label><label>Preferred contact method<select value={form.preferredContactMethod} onChange={(event) => updateField("preferredContactMethod", event.target.value as CreateClientFormState["preferredContactMethod"])}><option value="">No preference</option><option value="text">Text</option><option value="call">Call</option><option value="email">Email</option><option value="instagram">Instagram</option></select></label><label>Source<select value={form.source} onChange={(event) => updateField("source", event.target.value as CreateClientFormState["source"])}><option value="">Not specified</option><option value="referral">Referral</option><option value="instagram">Instagram</option><option value="walk-in">Walk-in</option><option value="existing-client">Existing client</option><option value="other">Other</option></select></label></div><label className={styles.clientVipToggle}><input type="checkbox" checked={form.isVip} onChange={(event) => updateField("isVip", event.target.checked)} /> Mark as VIP</label>{errorMessage ? <p className={styles.clientFormError} role="alert">{errorMessage}</p> : null}<div className={styles.clientDialogActions}><button className={styles.secondaryButton} type="button" onClick={onClose} disabled={submitting}>Cancel</button>{requiresVerification ? <button className={styles.primaryButton} type="button" disabled={submitting} onClick={() => { const body = buildBody(); if (body) { void verifyAmbiguousCreate(body); } }}>{submitting ? "Checking…" : "Check for Client"}</button> : <button className={styles.primaryButton} type="submit" disabled={submitting}>{submitting ? "Adding…" : "Add Client"}</button>}</div></form></section></div>;
}
