"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { clearPasswordRecoveryInProgress, consumePasswordRecoveryCallback, isPasswordRecoveryCallback, isPasswordRecoveryInProgress, setPasswordRecoveryInProgress } from "@/src/lib/auth/password-recovery";
import { getAuthRecoveryUrl } from "@/src/lib/config/public";
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from "@/src/lib/supabase";
import styles from "./auth.module.css";

type RecoveryView = "request" | "loading" | "update" | "invalid" | "complete";
type PasswordRecoveryScreenProps = { mode?: "forgot" | "reset" };
const recoveryError = "This password-reset link is invalid or has expired. Request a new link to continue.";

export function PasswordRecoveryScreen({ mode = "reset" }: PasswordRecoveryScreenProps) {
  const router = useRouter();
  const attemptedCallback = useRef<string | null>(null);
  const redirectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [view, setView] = useState<RecoveryView>(mode === "forgot" ? "request" : "loading");
  const [email, setEmail] = useState(""); const [newPassword, setNewPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState("");
  const [isBusy, setIsBusy] = useState(false); const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(() => hasSupabaseBrowserConfig() ? "" : "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");

  useEffect(() => {
    if (mode === "forgot" || !hasSupabaseBrowserConfig()) return;
    let isActive = true; const supabase = getSupabaseBrowserClient(); const callbackUrl = window.location.href;
    async function initializeRecovery() {
      if (isPasswordRecoveryCallback(callbackUrl)) {
        if (attemptedCallback.current === callbackUrl) return;
        attemptedCallback.current = callbackUrl; setView("loading"); setErrorMessage("");
        try { await consumePasswordRecoveryCallback(supabase, callbackUrl); setPasswordRecoveryInProgress(); window.history.replaceState({}, document.title, "/reset-password"); if (isActive) setView("update"); }
        catch { clearPasswordRecoveryInProgress(); if (isActive) { setView("invalid"); setErrorMessage(recoveryError); } }
        return;
      }
      const { data, error } = await supabase.auth.getSession(); if (!isActive) return;
      if (isPasswordRecoveryInProgress() && !error && data.session) { setView("update"); return; }
      clearPasswordRecoveryInProgress(); setView("invalid"); setErrorMessage(recoveryError);
    }
    void initializeRecovery();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => { if (event === "PASSWORD_RECOVERY") { setPasswordRecoveryInProgress(); if (isActive) { setView("update"); setErrorMessage(""); } } });
    return () => { isActive = false; subscription.unsubscribe(); };
  }, [mode]);
  useEffect(() => () => { if (redirectTimeout.current) clearTimeout(redirectTimeout.current); }, []);

  async function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!hasSupabaseBrowserConfig()) return; setIsBusy(true); setMessage(""); setErrorMessage("");
    try { await getSupabaseBrowserClient().auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: getAuthRecoveryUrl() }); } catch { /* Keep reset responses generic. */ }
    finally { setMessage("If an account exists for that email, we’ve sent a password-reset link."); setIsBusy(false); }
  }
  async function handlePasswordUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!newPassword) { setErrorMessage("Enter a new password."); return; } if (newPassword !== confirmPassword) { setErrorMessage("Your passwords do not match."); return; }
    setIsBusy(true); setMessage(""); setErrorMessage("");
    try { const { error } = await getSupabaseBrowserClient().auth.updateUser({ password: newPassword }); if (error) throw error; await getSupabaseBrowserClient().auth.signOut(); clearPasswordRecoveryInProgress(); setView("complete"); setMessage("Password updated. You can now sign in."); redirectTimeout.current = setTimeout(() => router.replace("/login?passwordReset=success"), 2000); }
    catch { setErrorMessage("We couldn’t update your password. Please request a new link and try again."); } finally { setIsBusy(false); }
  }
  const title = view === "update" ? "Choose a new password" : view === "complete" ? "Password updated" : view === "invalid" ? "Reset link expired" : "Reset your password";

  return <main className={styles.shell}><div className={styles.content}>
    <Image className={styles.brand} src="/branding/root-and-foil-logo.png" alt="Root & Foil" width={1137} height={1132} priority />
    <h1 className={styles.heading}>{title}</h1>
    <p className={styles.subtitle}>{view === "update" ? "Choose a new password for your account." : view === "complete" ? "You can now sign in. Redirecting you to sign in…" : view === "invalid" ? "Request a new link to continue." : "Enter your email and we’ll send you a secure link."}</p>
    {view === "loading" ? <p className={styles.helper}>Verifying your reset link…</p> : null}
    {view === "request" ? <form onSubmit={handleRequest} className={styles.form}><Field label="Email"><input value={email} onChange={(event) => setEmail(event.target.value)} className={styles.input} type="email" autoComplete="email" autoCapitalize="none" placeholder="you@example.com" disabled={isBusy} required /></Field><SubmitButton isBusy={isBusy}>Send reset link</SubmitButton></form> : null}
    {view === "update" ? <form onSubmit={handlePasswordUpdate} className={styles.form}><Field label="New password"><input value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={styles.input} type="password" autoComplete="new-password" disabled={isBusy} required /></Field><Field label="Confirm new password"><input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={styles.input} type="password" autoComplete="new-password" disabled={isBusy} required /></Field><SubmitButton isBusy={isBusy}>Update password</SubmitButton></form> : null}
    {view === "complete" ? <div className={styles.form}><button type="button" onClick={() => router.replace("/login?passwordReset=success")} className={styles.button}>Continue to sign in</button></div> : null}
    {view === "invalid" ? <div className={styles.form}><Link href="/forgot-password" className={styles.button}>Send a new link</Link></div> : null}
    {message ? <p className={`${styles.notice} ${styles.success}`} role="status">{message}</p> : null}{errorMessage ? <p className={`${styles.notice} ${styles.error}`} role="alert">{errorMessage}</p> : null}
    <p className={styles.account}><Link href="/login" className={styles.link}>Back to sign in</Link></p>
  </div><footer className={styles.footer}><a className={styles.legalLink} href="https://www.rootfoil.com/privacy-policy" target="_blank" rel="noreferrer">Privacy</a><span className={styles.footerSeparator}>·</span><a className={styles.legalLink} href="https://www.rootfoil.com/terms-of-service" target="_blank" rel="noreferrer">Terms</a></footer></main>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className={styles.field}><span>{label}</span>{children}</label>; }
function SubmitButton({ isBusy, children }: { isBusy: boolean; children: string }) { return <button type="submit" disabled={isBusy} className={styles.button}>{isBusy ? "Working…" : children}</button>; }
