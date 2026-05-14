"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  getSupabaseBrowserClient,
  hasSupabaseBrowserConfig,
} from "@/src/lib/supabase";

type AuthMode = "sign-in" | "sign-up" | "reset" | "update-password";

type LoginScreenProps = {
  initialMode: AuthMode;
  nextPath: string;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

export function LoginScreen({ initialMode, nextPath }: LoginScreenProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(() =>
    hasSupabaseBrowserConfig()
      ? ""
      : "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  );

  const title = useMemo(() => {
    if (mode === "sign-up") {
      return "Create your account";
    }

    if (mode === "reset") {
      return "Reset your password";
    }

    if (mode === "update-password") {
      return "Choose a new password";
    }

    return "Welcome back";
  }, [mode]);

  useEffect(() => {
    if (!hasSupabaseBrowserConfig()) {
      return;
    }

    const supabase = getSupabaseBrowserClient();

    void supabase.auth.getSession().then(({ data }) => {
      if (data.session && mode !== "update-password") {
        router.replace(nextPath);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("update-password");
        return;
      }

      if (session && mode !== "update-password") {
        router.replace(nextPath);
      }
    });

    return () => subscription.unsubscribe();
  }, [mode, nextPath, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasSupabaseBrowserConfig()) {
      setErrorMessage(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      );
      return;
    }

    setIsBusy(true);
    setMessage("");
    setErrorMessage("");

    try {
      const supabase = getSupabaseBrowserClient();

      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login?mode=update-password&next=${encodeURIComponent(nextPath)}`,
        });

        if (error) {
          throw error;
        }

        setMessage("Password reset email sent.");
        return;
      }

      if (mode === "update-password") {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          throw error;
        }

        setMessage("Password updated.");
        router.replace(nextPath);
        return;
      }

      const credentials = { email, password };
      const { data, error } =
        mode === "sign-up"
          ? await supabase.auth.signUp(credentials)
          : await supabase.auth.signInWithPassword(credentials);

      if (error) {
        throw error;
      }

      if (data.session) {
        router.replace(nextPath);
        return;
      }

      setMessage("Check your email to confirm your account.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 text-[#111827] sm:px-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_28px_90px_rgba(17,24,39,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[22rem] flex-col justify-between bg-[#111827] px-6 py-7 text-white sm:px-8">
          <div>
            <p className="font-display text-4xl font-semibold italic">
              ShearSync
            </p>
            <h1 className="mt-8 max-w-sm text-3xl font-semibold tracking-tight sm:text-4xl">
              Manage your booking business with a secure account.
            </h1>
          </div>
          <p className="mt-8 max-w-sm text-sm leading-6 text-white/72">
            Your Supabase session is used for sign in, password recovery, and
            authenticated ShearSync API requests.
          </p>
        </div>

        <div className="px-5 py-7 sm:px-8 sm:py-9">
          <div className="flex flex-wrap gap-2">
            {(["sign-in", "sign-up", "reset"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMode(item);
                  setMessage("");
                  setErrorMessage("");
                }}
                className={[
                  "h-10 rounded-2xl px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25",
                  mode === item
                    ? "bg-[#4F46E5] text-white"
                    : "border border-[#E5E7EB] bg-[#F9FAFB] text-[#4B5563]",
                ].join(" ")}
              >
                {item === "sign-in"
                  ? "Sign in"
                  : item === "sign-up"
                    ? "Sign up"
                    : "Reset"}
              </button>
            ))}
          </div>

          <h2 className="mt-8 text-3xl font-semibold tracking-tight">
            {title}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            {mode !== "update-password" ? (
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                  Email
                </span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
            ) : null}

            {mode === "sign-in" || mode === "sign-up" ? (
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                  Password
                </span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  type="password"
                  autoComplete={
                    mode === "sign-up" ? "new-password" : "current-password"
                  }
                  required
                />
              </label>
            ) : null}

            {mode === "update-password" ? (
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                  New password
                </span>
                <input
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </label>
            ) : null}

            {message ? (
              <p className="rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-sm font-semibold text-[#15803D]">
                {message}
              </p>
            ) : null}

            {errorMessage ? (
              <p className="rounded-2xl border border-[#FECACA] bg-[#FFF7F7] px-4 py-3 text-sm font-semibold text-[#B91C1C]">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isBusy}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-[#4F46E5] px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(79,70,229,0.23)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy
                ? "Working..."
                : mode === "sign-up"
                  ? "Create account"
                  : mode === "reset"
                    ? "Send reset email"
                    : mode === "update-password"
                      ? "Update password"
                      : "Sign in"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
