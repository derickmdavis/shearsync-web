"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WorkspaceShell, workspaceStyles as shell } from "@/src/components/workspace/WorkspaceShell";
import styles from "./account-deletion.module.css";

const settingsItems = ["Business Details", "Services", "Staff", "Availability", "Notifications", "Integrations", "Billing", "Account"];

function AccountSettingsNav() {
  return (
    <aside className={styles.settingsNav} aria-label="Settings navigation">
      <h2>Settings</h2>
      {settingsItems.map((item) => (
        item === "Account" ? (
          <Link className={styles.settingsActive} href="/settings/account" key={item}><span aria-hidden="true">◉</span>{item}</Link>
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
  const [password, setPassword] = useState("");
  const canSubmit = confirmation === "DELETE" && password.length > 0;

  return (
    <WorkspaceShell active="settings">
      <section className={styles.flowPage}>
        <Breadcrumb current="Delete Account" />
        <h1>Delete Your Account</h1>
        <p className={styles.intro}>We&apos;re sorry to see you go. Before you continue, please review the following information and confirm that you understand what will happen.</p>
        <section className={styles.warning} role="alert"><span aria-hidden="true">△</span><div><strong>This action cannot be undone.</strong><p>Your account, business information, clients, appointments, and all data will be permanently deleted.</p></div></section>
        <section className={styles.confirmCard}>
          <h2>What will be deleted?</h2>
          <ul>
            <li>Your business profile and settings</li><li>All client information and appointment history</li><li>Messages and notes</li><li>Your public booking page <em>(disabled immediately)</em></li><li>All integrations and connected services</li>
          </ul>
          <form onSubmit={(event) => { event.preventDefault(); if (canSubmit) router.push("/settings/account/delete/requested"); }}>
            <div className={styles.confirmFields}>
              <label>Type “DELETE” to confirm<input value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="off" /></label>
              <label>Your password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>
            </div>
            <div className={styles.actions}><Link className={styles.cancelButton} href="/settings/account">Cancel</Link><button className={styles.deleteButton} type="submit" disabled={!canSubmit}>Delete My Account</button></div>
          </form>
        </section>
      </section>
    </WorkspaceShell>
  );
}

export function DeletionRequestedScreen() {
  return <WorkspaceShell active="settings"><section className={styles.flowPage}>
    <Breadcrumb current="Delete Account" />
    <section className={styles.successBanner}><span aria-hidden="true">✓</span><div><h1>Account deletion requested</h1><p>Your account is scheduled for permanent deletion.</p><small>We&apos;ve disabled your public booking page immediately. Your account and all data will be permanently deleted in <strong>14 days (Oct 21, 2026)</strong> unless you cancel this request.</small></div></section>
    <div className={styles.requestGrid}>
      <section className={styles.timelineCard}><h2>What happens next?</h2><ol>
        <li className={styles.complete}><span>✓</span><div><strong>Public booking page disabled</strong><p>Your booking page is no longer visible to new clients.</p></div><small>Completed<br />Oct 7, 2026, 2:14 PM</small></li>
        <li className={styles.current}><span>2</span><div><strong>14-day waiting period</strong><p>You can cancel this request anytime within 14 days.</p></div><small>In progress<br />Oct 7 – Oct 21, 2026</small></li>
        <li><span>3</span><div><strong>Account permanently deleted</strong><p>All data will be permanently removed after 14 days.</p></div><small>Pending<br />Oct 21, 2026</small></li>
      </ol></section>
      <aside className={styles.cancelCard}><h2>Need to change your mind?</h2><p>You can cancel your deletion request within 14 days and your account will be fully restored.</p><Link className={styles.cancelDeletion} href="/settings/account">Cancel Deletion Request</Link><h3>Questions?</h3><p>If you have any questions, please contact our support team.</p><a href="mailto:support@rootandfoil.com">Contact Support →</a></aside>
    </div>
  </section></WorkspaceShell>;
}

export function AccountDeletedScreen() {
  return <main className={styles.deletedPage}>
    <header className={styles.publicHeader}><Link className={styles.publicBrand} href="/" aria-label="Root and Foil home"><Image src="/branding/root-and-foil-logo.png" width={1137} height={1132} alt="Root and Foil" priority style={{ display: "block", width: 74, height: 74, objectFit: "contain" }} /></Link><nav><Link href="/login">Sign In</Link><Link className={styles.createAccount} href="/login">Create Account</Link></nav></header>
    <section className={styles.deletedCard}><span className={styles.deletedCheck} aria-hidden="true">✓</span><h1>Your account has been deleted</h1><p>Your Root &amp; Foil account and all associated data have been permanently removed.</p><small>Thank you for being part of the Root &amp; Foil community.<br />We hope to see you back in the future.</small><Link href="/" className={shell.primaryButton}>Return to Home</Link></section>
  </main>;
}
