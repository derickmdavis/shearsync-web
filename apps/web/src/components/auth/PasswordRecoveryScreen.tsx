"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  clearPasswordRecoveryInProgress,
  consumePasswordRecoveryCallback,
  isPasswordRecoveryCallback,
  isPasswordRecoveryInProgress,
  setPasswordRecoveryInProgress,
} from "@/src/lib/auth/password-recovery";
import { getAuthRecoveryUrl } from "@/src/lib/config/public";
import {
  getSupabaseBrowserClient,
  hasSupabaseBrowserConfig,
} from "@/src/lib/supabase";

type RecoveryView = "request" | "loading" | "update" | "invalid" | "complete";

type PasswordRecoveryScreenProps = {
  mode?: "forgot" | "reset";
};

function getRecoveryErrorMessage() {
  return "This password-reset link is invalid or has expired. Request a new link to continue.";
}

export function PasswordRecoveryScreen({
  mode = "reset",
}: PasswordRecoveryScreenProps) {
  const router = useRouter();
  const attemptedCallback = useRef<string | null>(null);
  const redirectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [view, setView] = useState<RecoveryView>(
    mode === "forgot" ? "request" : "loading",
  );
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(() =>
    hasSupabaseBrowserConfig()
      ? ""
      : "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  );

  useEffect(() => {
    if (mode === "forgot") {
      return;
    }

    if (!hasSupabaseBrowserConfig()) {
      return;
    }

    let isActive = true;
    const supabase = getSupabaseBrowserClient();
    const callbackUrl = window.location.href;

    async function initializeRecovery() {
      if (isPasswordRecoveryCallback(callbackUrl)) {
        if (attemptedCallback.current === callbackUrl) {
          return;
        }

        attemptedCallback.current = callbackUrl;
        setView("loading");
        setErrorMessage("");

        try {
          await consumePasswordRecoveryCallback(supabase, callbackUrl);
          setPasswordRecoveryInProgress();
          // Do not retain a one-time recovery code or tokens in browser history.
          window.history.replaceState({}, document.title, "/reset-password");
          if (isActive) {
            setView("update");
          }
        } catch {
          clearPasswordRecoveryInProgress();
          if (isActive) {
            setView("invalid");
            setErrorMessage(getRecoveryErrorMessage());
          }
        }
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (!isActive) {
        return;
      }

      if (isPasswordRecoveryInProgress() && !error && data.session) {
        setView("update");
        return;
      }

      clearPasswordRecoveryInProgress();
      setView("invalid");
      setErrorMessage(getRecoveryErrorMessage());
    }

    void initializeRecovery();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setPasswordRecoveryInProgress();
        if (isActive) {
          setView("update");
          setErrorMessage("");
        }
      }
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [mode]);

  useEffect(() => {
    return () => {
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
    };
  }, []);

  async function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasSupabaseBrowserConfig()) {
      return;
    }

    setIsBusy(true);
    setMessage("");
    setErrorMessage("");

    try {
      await getSupabaseBrowserClient().auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        { redirectTo: getAuthRecoveryUrl() },
      );

      // This wording is deliberately identical for every address and response.
      setMessage(
        "If an account exists for that email, we’ve sent a password-reset link.",
      );
    } catch {
      // Do not reveal auth-provider errors from a password-recovery request.
      setMessage(
        "If an account exists for that email, we’ve sent a password-reset link.",
      );
    } finally {
      setIsBusy(false);
    }
  }

  async function handlePasswordUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newPassword) {
      setErrorMessage("Enter a new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Your passwords do not match.");
      return;
    }

    setIsBusy(true);
    setMessage("");
    setErrorMessage("");

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw error;
      }

      await supabase.auth.signOut();
      clearPasswordRecoveryInProgress();
      setView("complete");
      setMessage("Password updated. You can now sign in.");
      redirectTimeout.current = setTimeout(() => {
        router.replace("/login?passwordReset=success");
      }, 2000);
    } catch {
      setErrorMessage("We couldn’t update your password. Please request a new link and try again.");
    } finally {
      setIsBusy(false);
    }
  }

  const title =
    view === "update"
      ? "Choose a new password"
      : view === "complete"
        ? "Password updated"
        : view === "invalid"
          ? "Reset link expired"
          : "Reset your password";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 text-foreground sm:px-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_28px_90px_rgba(17,17,17,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[22rem] flex-col justify-between bg-[#111111] px-6 py-7 text-white sm:px-8">
          <div>
            <p className="font-display text-4xl font-semibold tracking-tight">
              Root &amp; Foil
            </p>
            <h1 className="mt-8 max-w-sm text-3xl font-semibold tracking-tight sm:text-4xl">
              The business side of beauty
            </h1>
          </div>
        </div>

        <div className="px-5 py-7 sm:px-8 sm:py-9">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>

          {view === "loading" ? (
            <p className="mt-6 text-sm text-muted">
              Verifying your reset link…
            </p>
          ) : null}

          {view === "request" ? (
            <form onSubmit={handleRequest} className="mt-6 grid gap-4">
              <p className="text-sm leading-6 text-muted">
                Enter your email and we’ll send you a secure link to choose a new password.
              </p>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                  Email
                </span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <SubmitButton isBusy={isBusy}>Send reset link</SubmitButton>
            </form>
          ) : null}

          {view === "update" ? (
            <form onSubmit={handlePasswordUpdate} className="mt-6 grid gap-4">
              <p className="text-sm leading-6 text-muted">
                Choose a new password for your account.
              </p>
              <PasswordField
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                disabled={isBusy}
              />
              <PasswordField
                label="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                disabled={isBusy}
              />
              <SubmitButton isBusy={isBusy}>Update password</SubmitButton>
            </form>
          ) : null}

          {view === "complete" ? (
            <div className="mt-6 grid gap-4">
              <p className="text-sm leading-6 text-muted">
                You can now sign in. Redirecting you to sign in…
              </p>
              <button
                type="button"
                onClick={() => router.replace("/login?passwordReset=success")}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                Continue to sign in
              </button>
            </div>
          ) : null}

          {view === "invalid" ? (
            <div className="mt-6 grid gap-4">
              <p className="text-sm leading-6 text-muted">
                This reset link has expired or has already been used. Request a new one to continue.
              </p>
              <Link
                href="/forgot-password"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                Send a new link
              </Link>
            </div>
          ) : null}

          {message ? <Notice tone="success">{message}</Notice> : null}
          {errorMessage ? <Notice tone="error">{errorMessage}</Notice> : null}

          <p className="mt-6 text-sm text-muted">
            <Link href="/login" className="font-semibold text-brand underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        type="password"
        autoComplete="new-password"
        disabled={disabled}
        required
      />
    </label>
  );
}

function SubmitButton({ isBusy, children }: { isBusy: boolean; children: string }) {
  return (
    <button
      type="submit"
      disabled={isBusy}
      className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isBusy ? "Working…" : children}
    </button>
  );
}

function Notice({ tone, children }: { tone: "success" | "error"; children: string }) {
  const colorClassName =
    tone === "success"
      ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]"
      : "border-[#FECACA] bg-[#FFF7F7] text-[#B91C1C]";

  return (
    <p
      className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold ${colorClassName}`}
    >
      {children}
    </p>
  );
}
