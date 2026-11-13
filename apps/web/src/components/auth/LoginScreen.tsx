"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from "@/src/lib/supabase";
import { getAuthRecoveryUrl } from "@/src/lib/config/public";
import styles from "./auth.module.css";

type AuthMode = "sign-in" | "sign-up" | "reset";
type LoginScreenProps = { initialMode: AuthMode; nextPath: string; passwordResetSuccess?: boolean };

function getErrorMessage(error: unknown) { return error instanceof Error ? error.message : "Something went wrong."; }

export function LoginScreen({ initialMode, nextPath, passwordResetSuccess = false }: LoginScreenProps) {
  const router = useRouter();
  const [mode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState(() => passwordResetSuccess ? "Password updated. You can now sign in." : "");
  const [errorMessage, setErrorMessage] = useState(() => hasSupabaseBrowserConfig() ? "" : "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  const title = useMemo(() => mode === "sign-up" ? "Create your account" : mode === "reset" ? "Reset your password" : "Welcome back.", [mode]);
  const subtitle = mode === "sign-up" ? "Create your Root & Foil account." : mode === "reset" ? "Enter your email to receive a reset link." : "Sign in to your account.";
  const signupHref = `/login?mode=sign-up${nextPath !== "/onboarding" ? `&next=${encodeURIComponent(nextPath)}` : ""}`;

  useEffect(() => {
    if (!hasSupabaseBrowserConfig()) return;
    const supabase = getSupabaseBrowserClient();
    void supabase.auth.getSession().then(({ data }) => { if (data.session && mode !== "reset") router.replace(nextPath); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") { router.replace("/reset-password"); return; }
      if (session && mode !== "reset") router.replace(nextPath);
    });
    return () => subscription.unsubscribe();
  }, [mode, nextPath, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasSupabaseBrowserConfig()) { setErrorMessage("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY."); return; }
    setIsBusy(true); setMessage(""); setErrorMessage("");
    try {
      const supabase = getSupabaseBrowserClient();
      if (mode === "reset") {
        try { await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: getAuthRecoveryUrl() }); } catch { /* Generic response protects account privacy. */ }
        setMessage("If an account exists for that email, we’ve sent a password-reset link.");
        return;
      }
      const credentials = { email: email.trim().toLowerCase(), password };
      const { data, error } = mode === "sign-up" ? await supabase.auth.signUp({ ...credentials, options: { data: { full_name: fullName.trim(), phone_number: phoneNumber.trim() } } }) : await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      if (data.session) { router.replace(nextPath); return; }
      setMessage("Check your email to confirm your account.");
    } catch (error) { setErrorMessage(getErrorMessage(error)); } finally { setIsBusy(false); }
  }

  return <main className={styles.shell}>
    <div className={styles.content}>
      <Image className={styles.brand} src="/branding/root-and-foil-logo.png" alt="Root & Foil" width={1137} height={1132} priority />
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        {mode === "sign-up" ? <><Field label="Your name"><input value={fullName} onChange={(event) => setFullName(event.target.value)} className={styles.input} autoComplete="name" required /></Field><Field label="Phone number"><input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} className={styles.input} autoComplete="tel" required /></Field></> : null}
        <Field label="Email"><input value={email} onChange={(event) => setEmail(event.target.value)} className={styles.input} type="email" autoComplete="email" autoCapitalize="none" placeholder="you@example.com" disabled={isBusy} required /></Field>
        {mode !== "reset" ? <Field label="Password"><div className={styles.inputWrap}><input value={password} onChange={(event) => setPassword(event.target.value)} className={`${styles.input} ${styles.inputPassword}`} type={showPassword ? "text" : "password"} autoComplete={mode === "sign-up" ? "new-password" : "current-password"} disabled={isBusy} required /><button className={styles.passwordToggle} type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</button></div></Field> : null}
        {mode === "sign-in" ? <p className={styles.forgot}><Link href="/forgot-password" className={styles.link}>Forgot password?</Link></p> : null}
        {message ? <p className={`${styles.notice} ${styles.success}`} role="status">{message}</p> : null}
        {errorMessage ? <p className={`${styles.notice} ${styles.error}`} role="alert">{errorMessage}</p> : null}
        <button type="submit" disabled={isBusy} className={styles.button}>{isBusy ? mode === "sign-in" ? "Signing in…" : "Working…" : mode === "sign-up" ? "Create account" : mode === "reset" ? "Send reset email" : "Sign in"}</button>
        {mode === "sign-in" ? <p className={styles.account}>New to Root &amp; Foil? <Link href={signupHref} className={styles.link}>Create an account</Link></p> : <p className={styles.account}><Link href={`/login${nextPath !== "/calendar" ? `?next=${encodeURIComponent(nextPath)}` : ""}`} className={styles.link}>Back to sign in</Link></p>}
      </form>
    </div>
    <footer className={styles.footer}><a className={styles.legalLink} href="https://www.rootfoil.com/privacy-policy" target="_blank" rel="noreferrer">Privacy</a><span className={styles.footerSeparator}>·</span><a className={styles.legalLink} href="https://www.rootfoil.com/terms-of-service" target="_blank" rel="noreferrer">Terms</a></footer>
  </main>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className={styles.field}><span>{label}</span>{children}</label>; }
function Eye() { return <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true"><path d="M1 8s3.7-6.5 10-6.5S21 8 21 8s-3.7 6.5-10 6.5S1 8 1 8Z" stroke="currentColor" strokeWidth="1.7"/><circle cx="11" cy="8" r="2.7" stroke="currentColor" strokeWidth="1.7"/></svg>; }
function EyeOff() { return <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true"><path d="m2 2 18 14M9.2 3.5A10.7 10.7 0 0 1 11 3.3C17.3 3.3 21 9 21 9a17.3 17.3 0 0 1-3.7 3.7M6.3 5.3C2.9 6.7 1 9 1 9s3.7 5.7 10 5.7c.7 0 1.4-.1 2-.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M8.7 7.2a3.3 3.3 0 0 0 4.1 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>; }
