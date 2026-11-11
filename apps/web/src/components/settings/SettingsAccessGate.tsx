"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  getAccountAccess,
  getAccountDeletionStatus,
  type AccountAccess,
  type AccountDeletionStatus,
} from "@/src/lib/api";
import {
  ACCOUNT_LIFECYCLE_EVENT,
} from "@/src/lib/auth/account-lifecycle-events";
import { PROTECTED_ACCOUNT_DATA_CLEARED_EVENT } from "@/src/lib/auth/protected-data";
import { getSupabaseBrowserClient } from "@/src/lib/supabase";

type GateState =
  | { status: "loading" }
  | { status: "ready"; access: AccountAccess; deletion: AccountDeletionStatus }
  | { status: "signed-out" }
  | { status: "error" };

const deletionStates = new Set<AccountDeletionStatus["status"]>([
  "pending",
  "processing",
  "failed_retryable",
]);

function isActive(access: AccountAccess) {
  return access.isActive && access.status === "active";
}

/**
 * Blocks all Settings children until the account and deletion state are known.
 * It deliberately owns no resource cache: unmounting children on a lifecycle
 * transition stops their effects and prevents protected drafts from remaining
 * visible behind a renewal or deletion screen.
 */
export function SettingsAccessGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<GateState>({ status: "loading" });
  const requestVersion = useRef(0);

  const load = useCallback(async () => {
    const version = ++requestVersion.current;
    setState({ status: "loading" });
    const { data, error } = await getSupabaseBrowserClient().auth.getSession();
    const token = data.session?.access_token;
    if (error || !token) {
      if (version === requestVersion.current) setState({ status: "signed-out" });
      return;
    }

    try {
      const [access, deletion] = await Promise.all([
        getAccountAccess(token),
        getAccountDeletionStatus(token),
      ]);
      if (version === requestVersion.current) setState({ status: "ready", access, deletion });
    } catch {
      if (version === requestVersion.current) setState({ status: "error" });
    }
  }, []);

  useEffect(() => () => { requestVersion.current += 1; }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    const hideProtectedContent = () => setState({ status: "loading" });
    window.addEventListener(PROTECTED_ACCOUNT_DATA_CLEARED_EVENT, hideProtectedContent);
    return () => window.removeEventListener(PROTECTED_ACCOUNT_DATA_CLEARED_EVENT, hideProtectedContent);
  }, []);

  useEffect(() => {
    const refreshForLifecycleChange = () => {
      void load();
    };
    window.addEventListener(ACCOUNT_LIFECYCLE_EVENT, refreshForLifecycleChange);
    return () => window.removeEventListener(ACCOUNT_LIFECYCLE_EVENT, refreshForLifecycleChange);
  }, [load]);

  useEffect(() => {
    if (state.status !== "ready") return;
    if (deletionStates.has(state.deletion.status)) return;
    if (!isActive(state.access)) router.replace("/billing?from=settings");
  }, [router, state]);

  // This confirmation screen intentionally survives the sign-out immediately
  // following a successful deletion request.
  if (pathname === "/settings/account/delete/requested") return <>{children}</>;

  if (state.status === "loading") return <GateNotice title="Checking account access…" detail="Your settings are loading securely." />;
  if (state.status === "signed-out") return <GateNotice title="Sign in required" detail="Sign in to manage your settings." action={<Link href="/login">Sign in</Link>} />;
  if (state.status === "error") return <GateNotice title="Settings are temporarily unavailable" detail="We couldn’t confirm your account access. Please try again." action={<button type="button" onClick={() => void load()}>Try again</button>} />;

  if (deletionStates.has(state.deletion.status)) {
    return <DeletionPendingState status={state.deletion.status} />;
  }

  if (!isActive(state.access)) {
    return <GateNotice title="Taking you to billing…" detail="Your account needs renewal before Settings can be opened." />;
  }

  return <>{children}</>;
}

function GateNotice({ title, detail, action }: { title: string; detail: string; action?: ReactNode }) {
  return <main style={pageStyle}><section style={cardStyle} aria-live="polite"><h1 style={headingStyle}>{title}</h1><p style={detailStyle}>{detail}</p>{action ? <div style={actionStyle}>{action}</div> : null}</section></main>;
}

function DeletionPendingState({ status }: { status: AccountDeletionStatus["status"] }) {
  const retryable = status === "failed_retryable";
  return <main style={pageStyle}><section style={cardStyle} role="status"><h1 style={headingStyle}>Account deletion is in progress</h1><p style={detailStyle}>{retryable ? "Your deletion request needs additional processing. Your account remains unavailable while we complete it." : "Your account and public booking page are unavailable while your deletion request is processed."}</p><p style={detailStyle}>Normal Settings and account data are hidden during this process.</p><div style={actionStyle}><a href="mailto:support@rootandfoil.com">Contact support</a><Link href="/login">Return to sign in</Link></div></section></main>;
}

const pageStyle = { minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px", background: "#fffdf8" } as const;
const cardStyle = { width: "min(100%, 560px)", padding: "32px", border: "1px solid #ead9c0", borderRadius: "18px", background: "#fff", boxShadow: "0 12px 30px rgba(81, 54, 22, .08)" } as const;
const headingStyle = { margin: 0, fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "32px" } as const;
const detailStyle = { margin: "12px 0 0", color: "#5f6675", lineHeight: 1.5 } as const;
const actionStyle = { display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "24px", color: "#8a5528", fontWeight: 700 } as const;
