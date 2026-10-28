"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WorkspaceShell, workspaceStyles as shell } from "@/src/components/workspace/WorkspaceShell";
import { ApiError, createAccountDeletionRequest, type AccountDeletionRequest } from "@/src/lib/api";
import { getSupabaseBrowserClient } from "@/src/lib/supabase";
import styles from "./account-deletion.module.css";

const settingsItems = ["Business Details", "Services", "Billing", "Account"];

function AccountSettingsNav() {
  return (
    <aside className={styles.settingsNav} aria-label="Settings navigation">
      <h2>Settings</h2>
      {settingsItems.map((item) => (
        item === "Account" ? (
          <Link className={styles.settingsActive} href="/settings/account" key={item}><span aria-hidden="true">◉</span>{item}</Link>
        ) : item === "Services" ? (
          <Link href="/settings/services" key={item}><span aria-hidden="true">○</span>{item}</Link>
        ) : item === "Billing" ? (
          <Link href="/billing" key={item}><span aria-hidden="true">○</span>{item}</Link>
        ) : (
          <Link href="/settings/business-details" key={item}><span aria-hidden="true">○</span>{item}</Link>
        )
      ))}
    </aside>
  );
}

function Breadcrumb({ current }: { current: string }) {
  return <p className={styles.breadcrumb}><Link href="/settings/account">Settings</Link><span>/</span><Link href="/settings/account">Account</Link><span>/</span><strong>{current}</strong></p>;
}

export function AccountSecurityScreen() {
  return (
    <WorkspaceShell active="settings">
      <section className={styles.settingsPage}>
        <AccountSettingsNav />
        <div className={styles.content}>
          <p className={styles.breadcrumb}><span>Settings</span><span>/</span><strong>Account</strong></p>
          <h1>Account &amp; Security</h1>
          <p className={styles.intro}>Manage your account information, password, and security settings.</p>

          <section className={styles.accountCard} aria-label="Account settings">
            <AccountRow label="Email Address" detail="Used for sign in and important notifications." value="derick@dendobarber.com" action="Edit" />
            <AccountRow label="Password" detail="Keep your account secure with a strong password." value="••••••••••••" action="Edit" />
            <AccountRow label="Two-Factor Authentication" detail="Add an extra layer of security to your account." value="Not enabled" action="Enable" />
          </section>

          <section className={styles.dangerCard}>
            <span className={styles.dangerIcon} aria-hidden="true">♲</span>
            <div><h2>Delete Account</h2><p>Permanently delete your account and all associated data.</p></div>
            <Link className={styles.deleteOutline} href="/settings/account/delete">Delete Account</Link>
          </section>
        </div>
      </section>
    </WorkspaceShell>
  );
}

function AccountRow({ label, detail, value, action }: { label: string; detail: string; value: string; action: string }) {
  return <div className={styles.accountRow}><div><h2>{label}</h2><p>{detail}</p></div><span className={styles.rowValue}>{value}</span><button type="button" className={styles.rowAction}>{action}</button></div>;
}

export function DeleteAccountScreen() {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState("");
  const [reason, setReason] = useState("");
  const [clientRequestId, setClientRequestId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const canSubmit = confirmation === "DELETE" && !isSubmitting;

  function getClientRequestId() {
    if (clientRequestId) return clientRequestId;
    const nextId = crypto.randomUUID();
    setClientRequestId(nextId);
    return nextId;
  }

  async function submitDeletionRequest() {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const { data, error } = await getSupabaseBrowserClient().auth.getSession();
      const accessToken = data.session?.access_token;
      if (error || !accessToken) throw new ApiError("Your session has expired. Please sign in again.", 401);

      const response = await createAccountDeletionRequest(accessToken, {
        confirmation: "DELETE",
        ...(reason.trim() ? { reason: reason.trim() } : {}),
        clientRequestId: getClientRequestId(),
      });
      if (!isAcceptedDeletion(response)) throw new ApiError("The account service returned an invalid response.", 502);

      // Do not leave protected product data rendered after acceptance.
      await getSupabaseBrowserClient().auth.signOut();
      router.replace(`/settings/account/delete/requested?scheduledDeletionAt=${encodeURIComponent(response.scheduledDeletionAt)}`);
    } catch (error) {
      setErrorMessage(getSubmissionError(error));
      setIsSubmitting(false);
    }
  }

  return (
    <WorkspaceShell active="settings">
      <section className={styles.flowPage}>
        <Breadcrumb current="Delete Account" />
        <h1>Delete Your Account</h1>
        <p className={styles.intro}>We&apos;re sorry to see you go. Before you continue, please review the following information and confirm that you understand what will happen.</p>
        <section className={styles.warning} role="alert"><span aria-hidden="true">△</span><div><strong>This request is final.</strong><p>Account access and public booking stop immediately. The account service will permanently delete your data at its scheduled time; self-service undo is not available.</p></div></section>
        <section className={styles.confirmCard}>
          <h2>What will be deleted?</h2>
          <ul>
            <li>Your business profile and settings</li><li>All client information and appointment history</li><li>Messages and notes</li><li>Your public booking page <em>(disabled immediately)</em></li><li>All integrations and connected services</li>
          </ul>
          <form onSubmit={(event) => { event.preventDefault(); if (canSubmit) void submitDeletionRequest(); }}>
            <div className={styles.confirmFields}>
              <label>Type “DELETE” to confirm<input value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="off" /></label>
              <label>Optional feedback<textarea value={reason} onChange={(event) => setReason(event.target.value.slice(0, 1000))} maxLength={1000} /></label>
            </div>
            {errorMessage ? <p className={styles.errorMessage} role="alert">{errorMessage}</p> : null}
            <div className={styles.actions}><Link className={styles.cancelButton} href="/settings/account">Cancel</Link><button className={styles.deleteButton} type="submit" disabled={!canSubmit}>{isSubmitting ? "Submitting…" : "Delete My Account"}</button></div>
          </form>
        </section>
      </section>
    </WorkspaceShell>
  );
}

export function DeletionRequestedScreen({
  scheduledDeletionAt,
}: {
  scheduledDeletionAt: string | null;
}) {
  const formattedDeletionDate = formatDeletionDate(scheduledDeletionAt);
  return <WorkspaceShell active="settings"><section className={styles.flowPage}>
    <Breadcrumb current="Delete Account" />
    <section className={styles.successBanner}><span aria-hidden="true">✓</span><div><h1>Account deletion requested</h1><p>Your account access and public booking page have been disabled.</p><small>Your account and data are scheduled for permanent deletion <strong>{formattedDeletionDate}</strong>. You have been signed out; self-service undo is not available.</small></div></section>
    <div className={styles.requestGrid}>
      <section className={styles.timelineCard}><h2>What happens next?</h2><ol>
        <li className={styles.complete}><span>✓</span><div><strong>Access and public booking disabled</strong><p>Your account is no longer available for sign-in or new client bookings.</p></div><small>Completed</small></li>
        <li className={styles.current}><span>2</span><div><strong>Deletion scheduled</strong><p>The account service will permanently remove account data at the scheduled time.</p></div><small>{formattedDeletionDate}</small></li>
      </ol></section>
      <aside className={styles.cancelCard}><h2>Questions?</h2><p>If you have questions about this deletion request, contact our support team.</p><a href="mailto:support@rootandfoil.com">Contact Support →</a></aside>
    </div>
  </section></WorkspaceShell>;
}

function isAcceptedDeletion(
  response: AccountDeletionRequest,
): response is AccountDeletionRequest & { scheduledDeletionAt: string } {
  return response.status === "pending" && typeof response.requestId === "string" && response.requestId.length > 0 && typeof response.requestedAt === "string" && !Number.isNaN(Date.parse(response.requestedAt)) && typeof response.scheduledDeletionAt === "string" && !Number.isNaN(Date.parse(response.scheduledDeletionAt)) && response.completedAt === null && response.publicBookingDisabled === true && typeof response.message === "string";
}

function getSubmissionError(error: unknown) {
  if (!(error instanceof ApiError)) return "We could not submit your request. Please try again.";
  if (error.status === 400) return "Please review your confirmation and try again.";
  if (error.status === 401) return "Your session has expired. Please sign in again.";
  if (error.status === 409 && error.code === "active_administrator") return "Transfer or disable your administrator role before requesting deletion.";
  if (error.status === 429) return "Too many deletion requests. Please try again later.";
  if (error.status === 0 || error.status >= 500) return "We could not submit your request. Please try again.";
  return error.message;
}

function formatDeletionDate(value: string | null) {
  if (!value || Number.isNaN(Date.parse(value))) return "at the scheduled time provided by the account service";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "your local time";
  return `${new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short", timeZoneName: "short" }).format(new Date(value))} (${timezone})`;
}

export function AccountDeletedScreen() {
  return <main className={styles.deletedPage}>
    <header className={styles.publicHeader}><Link className={styles.publicBrand} href="/" aria-label="Root and Foil home"><Image src="/branding/root-and-foil-logo.png" width={1137} height={1132} alt="Root and Foil" priority style={{ display: "block", width: 74, height: 74, objectFit: "contain" }} /></Link><nav><Link href="/login">Sign In</Link><Link className={styles.createAccount} href="/login">Create Account</Link></nav></header>
    <section className={styles.deletedCard}><span className={styles.deletedCheck} aria-hidden="true">✓</span><h1>Your account has been deleted</h1><p>Your Root &amp; Foil account and all associated data have been permanently removed.</p><small>Thank you for being part of the Root &amp; Foil community.<br />We hope to see you back in the future.</small><Link href="/" className={shell.primaryButton}>Return to Home</Link></section>
  </main>;
}
