"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { WorkspaceShell } from "@/src/components/workspace/WorkspaceShell";
import {
  ApiError,
  createBillingCheckout,
  createBillingPortal,
  getAccountAccess,
  getBillingSummary,
  type AccountAccess,
  type BillingSummary,
} from "@/src/lib/api";
import { getSupabaseBrowserClient } from "@/src/lib/supabase";
import { getStripePublishableKey } from "@/src/lib/config/public";
import styles from "./billing.module.css";

type BillingData = { access: AccountAccess; summary: BillingSummary };
type LoadState = "loading" | "ready" | "unavailable" | "error";

// Load Stripe only once, outside React rendering.
const stripePublishableKey = getStripePublishableKey();
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

const reasonCopy: Record<string, string> = {
  paid_subscription: "Your subscription is active.",
  trial_grant: "Your trial is active.",
  promotional_grant: "Your promotional access is active.",
  administrative_grant: "Your access is active.",
  no_qualifying_entitlement: "Your account is in read-only mode. Subscribe to resume booking, messaging, and editing.",
  administrative_force_read_only: "Your account is currently in read-only mode.",
  administrative_suspension: "This account is currently unavailable.",
  account_deletion_pending: "This account is currently unavailable.",
  account_deletion_failed: "This account is currently unavailable.",
};

function formatDate(value: string | null | undefined) {
  if (!value || Number.isNaN(Date.parse(value))) return null;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

function accessMode(data: BillingData) {
  return data.summary.access.mode ?? data.access.mode ?? "full";
}

function getErrorMessage(error: unknown, action: "load" | "checkout" | "portal") {
  if (!(error instanceof ApiError)) return "We couldn’t complete that request. Please try again.";
  if (error.status === 401) return "Your session has expired. Please sign in again.";
  if (error.status === 503) return "Billing is temporarily unavailable. Please try again later.";
  if (action === "checkout" && error.status === 409 && error.code === "billing_subscription_exists") return "A subscription already exists for this account.";
  if (action === "portal" && error.status === 404 && error.code === "billing_customer_not_found") return "No billing account was found. Choose a plan to get started.";
  if (action === "load" && error.status >= 500) return "Billing is temporarily unavailable. Please try again later.";
  return "We couldn’t complete that request. Please try again.";
}

function BillingSettingsNav() {
  return <aside className={styles.settingsNav} aria-label="Settings navigation">
    <h2>Settings</h2>
    <Link href="/settings/business-details"><span aria-hidden="true">○</span>Business Details</Link>
    <Link href="/settings/services"><span aria-hidden="true">○</span>Services</Link>
    <Link className={styles.active} href="/billing"><span aria-hidden="true">◉</span>Billing</Link>
    <Link href="/settings/account"><span aria-hidden="true">○</span>Account</Link>
  </aside>;
}

export function BillingScreen({ confirmation = false }: { confirmation?: boolean }) {
  const router = useRouter();
  const [state, setState] = useState<LoadState>("loading");
  const [billing, setBilling] = useState<BillingData | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<"month" | "year" | null>(null);
  const [checkout, setCheckout] = useState<{ clientSecret: string; interval: "month" | "year" } | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [pollAttempts, setPollAttempts] = useState(0);

  const load = useCallback(async () => {
    setState("loading");
    setMessage(null);
    try {
      const { data, error } = await getSupabaseBrowserClient().auth.getSession();
      const token = data.session?.access_token;
      if (error || !token) throw new ApiError("Your session has expired.", 401);
      const [access, summary] = await Promise.all([getAccountAccess(token), getBillingSummary(token)]);
      setBilling({ access, summary });
      setState("ready");
      return { access, summary };
    } catch (error) {
      setState(error instanceof ApiError && (error.status === 0 || error.status >= 500) ? "unavailable" : "error");
      setMessage(getErrorMessage(error, "load"));
      return null;
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    if (!confirmation || state !== "ready" || !billing || (accessMode(billing) === "full" && !!billing.summary.subscription)) return;
    if (pollAttempts >= 10) return;
    const timer = window.setTimeout(() => { setPollAttempts((attempt) => attempt + 1); void load(); }, 3000);
    return () => window.clearTimeout(timer);
  }, [billing, confirmation, load, pollAttempts, state]);

  async function withToken<T>(request: (token: string) => Promise<T>) {
    const { data, error } = await getSupabaseBrowserClient().auth.getSession();
    const token = data.session?.access_token;
    if (error || !token) throw new ApiError("Your session has expired.", 401);
    return request(token);
  }

  async function startCheckout(interval: "month" | "year") {
    if (!stripePromise) {
      setMessage("Checkout is temporarily unavailable because Stripe is not configured for this deployment.");
      return;
    }
    setMessage(null);
    setCheckoutLoading(interval);
    try {
      const checkout = await withToken((token) => createBillingCheckout(token, interval));
      setCheckout({ clientSecret: checkout.clientSecret, interval });
    } catch (error) {
      if (error instanceof ApiError && error.status === 409 && error.code === "billing_subscription_exists") void load();
      setMessage(getErrorMessage(error, "checkout"));
      setCheckoutLoading(null);
    }
  }

  function returnToPlans() {
    setCheckout(null);
    setCheckoutLoading(null);
    setMessage(null);
  }

  async function openPortal() {
    setMessage(null);
    setPortalLoading(true);
    try {
      const portal = await withToken(createBillingPortal);
      window.location.assign(portal.url);
    } catch (error) {
      setMessage(getErrorMessage(error, "portal"));
      if (error instanceof ApiError && error.status === 404) void load();
      setPortalLoading(false);
    }
  }

  const mode = billing ? accessMode(billing) : null;
  const subscription = billing?.summary.subscription ?? null;
  // Stripe completion is only a UI signal. Access remains pending until the
  // webhook-projected API state reports an eligible subscription.
  const confirmed = Boolean(
    billing
      && mode === "full"
      && subscription
      && ["active", "trialing", "canceling"].includes(subscription.status),
  );
  const processingTimedOut = confirmation && state === "ready" && !confirmed && pollAttempts >= 10;

  return <WorkspaceShell active="settings"><section className={styles.page}>
    <BillingSettingsNav />
    <main className={styles.content}>
      {confirmation ? <ConfirmationBanner confirmed={confirmed} timedOut={processingTimedOut} onRefresh={load} loading={state === "loading"} /> : null}
      <p className={styles.breadcrumb}><Link href="/settings">Settings</Link><span>/</span><strong>Billing</strong></p>
      <h1>Billing &amp; Access</h1>
      <p className={styles.intro}>Manage your Root &amp; Foil subscription and account access.</p>

      {state === "loading" ? <LoadingCard /> : null}
      {state === "unavailable" ? <StatusCard title="Billing is temporarily unavailable" detail={message ?? "Please try again later."} onRefresh={load} /> : null}
      {state === "error" ? <StatusCard title="We couldn’t load billing" detail={message ?? "Please try again."} onRefresh={load} /> : null}
      {state === "ready" && billing && mode === "blocked" ? <BlockedCard /> : null}
      {state === "ready" && billing && mode !== "blocked" ? <BillingDetails
        billing={billing}
        message={message}
        checkoutLoading={checkoutLoading}
        checkout={checkout}
        checkoutAvailable={Boolean(stripePromise)}
        portalLoading={portalLoading}
        onCheckout={startCheckout}
        onPortal={openPortal}
        onBackToPlans={returnToPlans}
        onCheckoutComplete={() => router.push("/billing/success")}
      /> : null}
    </main>
  </section></WorkspaceShell>;
}

function ConfirmationBanner({ confirmed, timedOut, onRefresh, loading }: { confirmed: boolean; timedOut: boolean; onRefresh: () => Promise<unknown>; loading: boolean }) {
  if (confirmed) return <section className={`${styles.confirmation} ${styles.confirmed}`} role="status"><div><strong>Subscription confirmed</strong><p>Your access is active and your billing details are up to date.</p></div><Link href="/billing">View billing</Link></section>;
  if (timedOut) return <section className={styles.confirmation} role="status"><div><strong>Your payment may still be processing.</strong><p>Refresh in a moment or contact support if access has not updated.</p></div><span><button type="button" onClick={() => void onRefresh()} disabled={loading}>{loading ? "Refreshing…" : "Refresh status"}</button><Link href="/billing">Back to billing</Link></span></section>;
  return <section className={styles.confirmation} role="status"><span className={styles.spinner} aria-hidden="true" /><div><strong>We’re confirming your subscription.</strong><p>This usually takes only a few seconds. Please keep this page open.</p></div></section>;
}

function LoadingCard() { return <section className={styles.loadingCard} aria-live="polite"><span className={styles.spinner} aria-hidden="true" />Loading your billing details…</section>; }
function StatusCard({ title, detail, onRefresh }: { title: string; detail: string; onRefresh: () => Promise<unknown> }) { return <section className={styles.statusCard} role="alert"><h2>{title}</h2><p>{detail}</p><button type="button" onClick={() => void onRefresh()}>Try again</button></section>; }
function BlockedCard() { return <section className={styles.blocked} role="alert"><h2>This account is currently unavailable.</h2><p>Purchases are unavailable while this account is in its current state. If you need help, contact support.</p><a href="mailto:support@rootandfoil.com">Contact support</a></section>; }

function BillingDetails({ billing, message, checkoutLoading, checkout, checkoutAvailable, portalLoading, onCheckout, onPortal, onBackToPlans, onCheckoutComplete }: { billing: BillingData; message: string | null; checkoutLoading: "month" | "year" | null; checkout: { clientSecret: string; interval: "month" | "year" } | null; checkoutAvailable: boolean; portalLoading: boolean; onCheckout: (interval: "month" | "year") => void; onPortal: () => void; onBackToPlans: () => void; onCheckoutComplete: () => void }) {
  const subscription = billing.summary.subscription;
  const mode = accessMode(billing);
  const reason = billing.summary.access.reason ?? billing.access.entitlement?.reason;
  const endDate = formatDate(billing.summary.access.effective_until ?? billing.access.entitlement?.effective_until);
  const paidThrough = formatDate(subscription?.paid_through);
  const isReadOnly = mode === "read_only";
  const purchasing = checkoutLoading !== null;

  return <>
    <section className={`${styles.accessCard} ${isReadOnly ? styles.recovery : ""}`}>
      <div><span className={styles.eyebrow}>Current access</span><h2>{isReadOnly ? "Read-only" : "Full access"}</h2><p>{reasonCopy[reason ?? ""] ?? (isReadOnly ? reasonCopy.no_qualifying_entitlement : "Your account has access to Root & Foil.")}</p></div>
      <dl><div><dt>Access ends</dt><dd>{endDate ?? "No scheduled end"}</dd></div>{subscription ? <div><dt>{subscription.cancels_at_period_end ? "Access through" : "Renews on"}</dt><dd>{paidThrough ?? "—"}</dd></div> : null}</dl>
    </section>
    {message ? <p className={styles.error} role="alert">{message}</p> : null}
    {subscription ? <section className={styles.subscriptionCard}><div><span className={styles.eyebrow}>Your plan</span><h2>{subscription.plan}</h2><p>{subscription.interval === "year" ? "Annual plan" : "Monthly plan"}{paidThrough ? ` · Access through ${paidThrough}` : ""}</p>{subscription.cancels_at_period_end ? <p className={styles.cancellation}>Cancels at the end of the current billing period.</p> : null}</div><button className={styles.secondaryButton} type="button" onClick={onPortal} disabled={portalLoading}>{portalLoading ? "Opening…" : "Manage billing"}</button></section> : checkout ? <EmbeddedCheckoutPanel checkout={checkout} onBack={onBackToPlans} onComplete={onCheckoutComplete} /> : <PlanOptions loading={purchasing} active={checkoutLoading} onCheckout={onCheckout} unavailable={!checkoutAvailable} />}
  </>;
}

function PlanOptions({ loading, active, onCheckout, unavailable }: { loading: boolean; active: "month" | "year" | null; onCheckout: (interval: "month" | "year") => void; unavailable: boolean }) {
  return <section className={styles.plans} aria-label="Subscription plans"><div className={styles.plan}><span>Monthly</span><strong>$25<small>/month</small></strong><button type="button" onClick={() => onCheckout("month")} disabled={loading || unavailable}>{active === "month" ? "Starting checkout…" : "Choose monthly"}</button></div><div className={`${styles.plan} ${styles.featured}`}><span>Annual <i>Best value</i></span><strong>$250<small>/year</small></strong><button type="button" onClick={() => onCheckout("year")} disabled={loading || unavailable}>{active === "year" ? "Starting checkout…" : "Choose annual"}</button></div>{unavailable ? <p className={styles.error} role="alert">Checkout is temporarily unavailable. Please try again later or contact support.</p> : null}</section>;
}

function EmbeddedCheckoutPanel({ checkout, onBack, onComplete }: { checkout: { clientSecret: string; interval: "month" | "year" }; onBack: () => void; onComplete: () => void }) {
  return <section className={styles.subscriptionCard} style={{ display: "block" }} aria-label="Secure checkout"><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 18 }}><div><span className={styles.eyebrow}>Secure checkout</span><h2>{checkout.interval === "year" ? "Annual plan" : "Monthly plan"}</h2><p>Payment is securely collected by Stripe.</p></div><button className={styles.secondaryButton} type="button" onClick={onBack}>Back to plans</button></div>{stripePromise ? <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: checkout.clientSecret, onComplete }}><EmbeddedCheckout /></EmbeddedCheckoutProvider> : null}</section>;
}
