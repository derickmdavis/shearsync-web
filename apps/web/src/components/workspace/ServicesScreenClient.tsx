"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ApiError,
  createService,
  deleteService,
  getBookingRules,
  getServices,
  reorderServices,
  updateBookingRules,
  updateService,
  type BookingRules,
  type CreateServiceBody,
  type Service,
} from "@/src/lib/api";
import { AccountLifecycleError, withActiveAccount } from "@/src/lib/auth/active-account";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

type LoadState = "loading" | "ready" | "error";
type ServiceDraft = {
  name: string;
  durationMinutes: string;
  price: string;
  isActive: boolean;
  isDefault: boolean;
  category: string;
  description: string;
};

const EMPTY_DRAFT: ServiceDraft = {
  name: "", durationMinutes: "", price: "", isActive: true, isDefault: false, category: "", description: "",
};
const catalogCache = new Map<string, Service[]>();
const bookingRulesCache = new Map<string, BookingRules>();

function errorMessage(error: unknown) {
  if (error instanceof AccountLifecycleError) return "Your account is not active. Restore account access to manage services.";
  if (error instanceof ApiError) {
    if (error.status === 400) return "Review the service details and try again.";
    if (error.status === 403) return "You no longer have access to these settings.";
    if (error.status === 404) return "That service is no longer available. The catalog was refreshed.";
    if (error.status === 0 || error.status >= 500) return "The services service is temporarily unavailable. Try again.";
  }
  return "Unable to update services. Try again.";
}

function draftFor(service: Service): ServiceDraft {
  return {
    name: service.name,
    durationMinutes: String(service.durationMinutes),
    price: String(service.price),
    isActive: service.isActive,
    isDefault: service.isDefault,
    category: service.category ?? "",
    description: service.description ?? "",
  };
}

function toServiceBody(draft: ServiceDraft): CreateServiceBody | null {
  const durationMinutes = Number(draft.durationMinutes);
  const price = Number(draft.price);
  if (!draft.name.trim() || !Number.isFinite(durationMinutes) || durationMinutes <= 0 || !Number.isFinite(price) || price < 0) return null;
  return {
    name: draft.name.trim(), durationMinutes, price, isActive: draft.isActive, isDefault: draft.isDefault,
    ...(draft.category.trim() ? { category: draft.category.trim() } : {}),
    ...(draft.description.trim() ? { description: draft.description.trim() } : {}),
  };
}

export function ServicesScreenClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [rules, setRules] = useState<BookingRules | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [message, setMessage] = useState<string | null>(null);
  const [editing, setEditing] = useState<Service | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [savingRules, setSavingRules] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const requestVersion = useRef(0);

  const load = async (force = false) => {
    const version = ++requestVersion.current;
    setLoadState((state) => state === "ready" ? "ready" : "loading");
    setMessage(null);
    try {
      const result = await withActiveAccount(async (accessToken, _access, accountId) => {
        const cachedServices = catalogCache.get(accountId);
        const cachedRules = bookingRulesCache.get(accountId);
        if (!force && cachedServices && cachedRules) return { accountId, services: cachedServices, rules: cachedRules };
        const [nextServices, nextRules] = await Promise.all([getServices(accessToken), getBookingRules(accessToken)]);
        catalogCache.set(accountId, nextServices);
        bookingRulesCache.set(accountId, nextRules);
        return { accountId, services: nextServices, rules: nextRules };
      });
      if (version !== requestVersion.current) return;
      setServices(result.services);
      setRules(result.rules);
      setLoadState("ready");
    } catch (error) {
      if (version !== requestVersion.current) return;
      setLoadState("error");
      setMessage(errorMessage(error));
    }
  };

  useEffect(() => { void load(); }, []); // Initial data is account-scoped by the caches above.

  const missingRestrictedIds = useMemo(() => {
    if (!rules) return [];
    const ids = new Set(services.map((service) => service.id));
    return rules.restrictedServiceIds.filter((id) => !ids.has(id));
  }, [rules, services]);

  async function refreshAfterMutation() {
    await load(true);
  }

  async function saveService(draft: ServiceDraft) {
    const body = toServiceBody(draft);
    if (!body) { setMessage("Enter a name, a positive duration, and a valid non-negative price."); return; }
    setSubmitting(true); setMessage(null);
    try {
      await withActiveAccount(async (accessToken) => editing ? updateService(editing.id, accessToken, body) : createService(accessToken, body));
      setEditing(undefined);
      await refreshAfterMutation();
    } catch (error) {
      setMessage(errorMessage(error));
      await refreshAfterMutation();
    } finally { setSubmitting(false); }
  }

  async function toggleActive(service: Service) {
    setSubmitting(true); setMessage(null);
    try {
      await withActiveAccount((accessToken) => updateService(service.id, accessToken, { isActive: !service.isActive }));
      await refreshAfterMutation();
    } catch (error) { setMessage(errorMessage(error)); await refreshAfterMutation(); } finally { setSubmitting(false); }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setSubmitting(true); setMessage(null);
    try {
      await withActiveAccount((accessToken) => deleteService(deleteTarget.id, accessToken));
      setDeleteTarget(null);
      await refreshAfterMutation();
    } catch (error) { setMessage(errorMessage(error)); await refreshAfterMutation(); } finally { setSubmitting(false); }
  }

  async function moveService(targetId: string) {
    const sourceId = draggedId;
    setDraggedId(null);
    if (!sourceId || sourceId === targetId) return;
    const previous = services;
    const sourceIndex = previous.findIndex((service) => service.id === sourceId);
    const targetIndex = previous.findIndex((service) => service.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;
    const reordered = [...previous];
    const [source] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, source);
    setServices(reordered);
    setSubmitting(true); setMessage(null);
    try {
      const result = await withActiveAccount((accessToken) => reorderServices(accessToken, reordered.map((service) => service.id)));
      setServices(result);
      await refreshAfterMutation();
    } catch (error) { setMessage(errorMessage(error)); setServices(previous); await refreshAfterMutation(); } finally { setSubmitting(false); }
  }

  function toggleRestriction(serviceId: string) {
    setRules((current) => current ? {
      ...current,
      restrictedServiceIds: current.restrictedServiceIds.includes(serviceId)
        ? current.restrictedServiceIds.filter((id) => id !== serviceId)
        : [...current.restrictedServiceIds, serviceId],
    } : current);
  }

  async function saveRules() {
    if (!rules) return;
    setSavingRules(true); setMessage(null);
    try {
      await withActiveAccount(async (accessToken) => updateBookingRules(accessToken, {
        restrictServicesForNewClients: rules.restrictServicesForNewClients,
        restrictedServiceIds: rules.restrictedServiceIds,
      }));
      await refreshAfterMutation();
    } catch (error) { setMessage(errorMessage(error)); await refreshAfterMutation(); } finally { setSavingRules(false); }
  }

  return <WorkspaceShell active="settings"><section className={styles.settingsPage}>
    <ServicesSettingsNav />
    <div className={styles.settingsContent}>
      <PageHeading title="Services" subtitle="Manage the services available for clients to book." action={<button className={styles.primaryButton} type="button" onClick={() => setEditing(null)}>Add service</button>} />
      {message ? <p className={styles.servicesMessage} role="alert">{message}</p> : null}
      {loadState === "loading" ? <section className={styles.servicesPanel}><p>Loading your service catalog…</p></section> : null}
      {loadState === "error" ? <section className={styles.servicesPanel}><p>We couldn’t load your service settings.</p><button className={styles.secondaryButton} type="button" onClick={() => void load(true)}>Try again</button></section> : null}
      {loadState === "ready" ? <>
        <section className={styles.servicesPanel}><header className={styles.servicesPanelHeader}><div><h2>Service catalog</h2><p>Drag services into display order. Inactive services remain available for historical corrections and manual bookings.</p></div></header>
          <div className={styles.serviceList} aria-label="Service catalog">
            {services.map((service) => <article className={`${styles.serviceRow} ${!service.isActive ? styles.serviceInactive : ""}`} key={service.id} draggable={!submitting} onDragStart={() => setDraggedId(service.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => void moveService(service.id)}>
              <span className={styles.serviceDrag} aria-label={`Drag ${service.name}`} title="Drag to reorder">⠿</span>
              <div><strong>{service.name}</strong><span>{service.category ? `${service.category} · ` : ""}{service.durationMinutes} min · ${service.price.toFixed(2)}</span>{service.description ? <small>{service.description}</small> : null}</div>
              <span className={`${styles.serviceState} ${service.isActive ? "" : styles.serviceStateInactive}`}>{service.isActive ? "Active" : "Inactive"}</span>
              <div className={styles.serviceRowActions}><button className={styles.editButton} type="button" disabled={submitting} onClick={() => setEditing(service)}>Edit</button><button className={styles.editButton} type="button" disabled={submitting} onClick={() => void toggleActive(service)}>{service.isActive ? "Deactivate" : "Activate"}</button><button className={styles.serviceDelete} type="button" disabled={submitting} onClick={() => setDeleteTarget(service)}>Delete</button></div>
            </article>)}
            {!services.length ? <p className={styles.servicesEmpty}>No services yet. Add your first service to begin booking.</p> : null}
          </div>
        </section>
        {rules ? <section className={styles.servicesPanel}><header className={styles.servicesPanelHeader}><div><h2>New-client service restrictions</h2><p>These only affect new clients booking through your public page. Manual staff bookings always use the full catalog.</p></div></header>
          <label className={styles.serviceToggle}><input type="checkbox" checked={rules.restrictServicesForNewClients} onChange={(event) => setRules({ ...rules, restrictServicesForNewClients: event.target.checked })} /> Hide selected services from new clients</label>
          {rules.restrictServicesForNewClients ? <div className={styles.restrictionList}>{services.map((service) => <label key={service.id}><input type="checkbox" checked={rules.restrictedServiceIds.includes(service.id)} onChange={() => toggleRestriction(service.id)} /> <span>{service.name}{!service.isActive ? " (inactive)" : ""}</span></label>)}</div> : null}
          {missingRestrictedIds.length ? <p className={styles.servicesWarning}>Review required: {missingRestrictedIds.length} saved restricted service ID{missingRestrictedIds.length === 1 ? " is" : "s are"} no longer in the catalog.</p> : null}
          <div className={styles.saveRow}><button className={styles.primaryButton} type="button" disabled={savingRules} onClick={() => void saveRules()}>{savingRules ? "Saving…" : "Save restrictions"}</button></div>
        </section> : null}
      </> : null}
    </div>
    {editing !== undefined ? <ServiceDialog service={editing} submitting={submitting} onClose={() => setEditing(undefined)} onSave={saveService} /> : null}
    {deleteTarget ? <DeleteServiceDialog service={deleteTarget} submitting={submitting} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} /> : null}
  </section></WorkspaceShell>;
}

function ServicesSettingsNav() { return <aside className={styles.settingsNav}><h2>Settings</h2><Link className={styles.settingsNavLink} href="/settings/business-details"><span>▣</span>Business Details</Link><Link className={`${styles.settingsNavLink} ${styles.settingsActive}`} href="/settings/services"><span>▤</span>Services</Link><button type="button"><span>▧</span>Billing</button><Link className={styles.settingsNavLink} href="/settings/account"><span>◉</span>Account</Link></aside>; }

function ServiceDialog({ service, submitting, onClose, onSave }: { service: Service | null; submitting: boolean; onClose: () => void; onSave: (draft: ServiceDraft) => Promise<void> }) {
  const [draft, setDraft] = useState<ServiceDraft>(() => service ? draftFor(service) : EMPTY_DRAFT);
  function update<K extends keyof ServiceDraft>(key: K, value: ServiceDraft[K]) { setDraft((current) => ({ ...current, [key]: value })); }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void onSave(draft); }
  return <div className={styles.clientDialogBackdrop} role="presentation"><section className={styles.clientDialog} role="dialog" aria-modal="true" aria-labelledby="service-dialog-title"><header className={styles.clientDialogHeader}><div><h2 id="service-dialog-title">{service ? "Edit service" : "Add service"}</h2><p>Services in this catalog are used for staff appointments and public booking.</p></div><button className={styles.closePanel} type="button" aria-label="Close service form" onClick={onClose} disabled={submitting}>×</button></header><form onSubmit={submit}><div className={styles.clientFormGrid}><label>Service name<input value={draft.name} onChange={(event) => update("name", event.target.value)} autoFocus /></label><label>Category<input value={draft.category} onChange={(event) => update("category", event.target.value)} /></label><label>Duration (minutes)<input type="number" min="1" value={draft.durationMinutes} onChange={(event) => update("durationMinutes", event.target.value)} /></label><label>Price<input type="number" min="0" step="0.01" value={draft.price} onChange={(event) => update("price", event.target.value)} /></label><label className={styles.serviceDescription}>Description<textarea value={draft.description} onChange={(event) => update("description", event.target.value)} /></label></div><label className={styles.serviceToggle}><input type="checkbox" checked={draft.isActive} onChange={(event) => update("isActive", event.target.checked)} /> Active and available publicly</label><label className={styles.serviceToggle}><input type="checkbox" checked={draft.isDefault} onChange={(event) => update("isDefault", event.target.checked)} /> Mark as default service</label><div className={styles.clientDialogActions}><button className={styles.secondaryButton} type="button" onClick={onClose} disabled={submitting}>Cancel</button><button className={styles.primaryButton} type="submit" disabled={submitting}>{submitting ? "Saving…" : "Save service"}</button></div></form></section></div>;
}

function DeleteServiceDialog({ service, submitting, onClose, onConfirm }: { service: Service; submitting: boolean; onClose: () => void; onConfirm: () => Promise<void> }) { return <div className={styles.clientDialogBackdrop} role="presentation"><section className={styles.clientDialog} role="dialog" aria-modal="true" aria-labelledby="delete-service-title"><header className={styles.clientDialogHeader}><div><h2 id="delete-service-title">Delete {service.name}?</h2><p>This removes it from the catalog. Historical appointment service lines are retained.</p></div></header><div className={styles.clientDialogActions}><button className={styles.secondaryButton} type="button" disabled={submitting} onClick={onClose}>Cancel</button><button className={styles.serviceDeleteConfirm} type="button" disabled={submitting} onClick={() => void onConfirm()}>{submitting ? "Deleting…" : "Delete service"}</button></div></section></div>; }
