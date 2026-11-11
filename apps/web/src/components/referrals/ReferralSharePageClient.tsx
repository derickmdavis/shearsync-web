"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ApiError,
  resolvePublicReferralShare,
  type PublicReferralShare,
} from "@/src/lib/api";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; data: PublicReferralShare }
  | { status: "unavailable" }
  | { status: "failure" };

export function ReferralSharePageClient({ referralCode }: { referralCode: string }) {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [notice, setNotice] = useState<string | null>(null);
  const [manualCopy, setManualCopy] = useState(false);
  const [sharing, setSharing] = useState(false);

  const load = useCallback(async () => {
    setState({ status: "loading" });
    setNotice(null);
    setManualCopy(false);

    try {
      const data = await resolvePublicReferralShare(referralCode);
      setState({ status: "ready", data });
    } catch (error) {
      setState(
        error instanceof ApiError && [404, 410].includes(error.status)
          ? { status: "unavailable" }
          : { status: "failure" },
      );
    }
  }, [referralCode]);

  useEffect(() => {
    // Schedule the initial asynchronous lookup after mount. This avoids a
    // synchronous state transition during React's effect flush.
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  if (state.status === "loading") return <ShareShell><LoadingState /></ShareShell>;
  if (state.status === "unavailable") return <ShareShell><UnavailableState /></ShareShell>;
  if (state.status === "failure") return <ShareShell><FailureState onRetry={load} /></ShareShell>;

  const { data } = state;
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function share() {
    if (!canShare || sharing) {
      setNotice("Sharing isn’t available here. Copy your link instead.");
      return;
    }

    setSharing(true);
    setNotice(null);
    try {
      await navigator.share({
        title: data.share.title,
        text: data.share.text,
        url: data.referralUrl,
      });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setNotice("Sharing isn’t available here. Copy your link instead.");
      }
    } finally {
      setSharing(false);
    }
  }

  async function copyLink() {
    setNotice(null);
    setManualCopy(false);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(data.referralUrl);
      setNotice("Link copied");
    } catch {
      setManualCopy(true);
      setNotice("Select and copy this link, then send it to a friend.");
    }
  }

  return (
    <ShareShell>
      <header className="text-center">
        <p className="font-display text-[2rem] font-semibold leading-none text-[#1c1713]">Root &amp; Foil</p>
        <h1 className="mt-10 font-display text-5xl font-medium leading-[0.92] tracking-[-0.035em] text-[#1c1713] sm:text-[3.5rem]">
          Share {data.stylist.displayName} with a friend
        </h1>
        <p className="mt-5 text-base text-[#504840]">We&apos;ve written a message for you.</p>
      </header>

      <section className="mt-7 rounded-2xl bg-[#f1ece4] p-5 text-left" aria-label="Message preview">
        <p className="text-[1.05rem] leading-7 text-[#28221e]">{data.share.text}</p>
        <a className="mt-3 block break-all text-[1.02rem] font-medium leading-6 underline decoration-[#857466] underline-offset-2" href={data.referralUrl}>
          {data.referralUrl}
        </a>
      </section>

      <div className="mt-5 grid gap-3">
        {canShare ? <button type="button" className="share-primary" onClick={() => void share()} disabled={sharing}>{sharing ? "Opening share…" : "Share"}</button> : null}
        <button type="button" className="share-secondary" onClick={() => void copyLink()}>Copy link</button>
      </div>
      <p className="mt-5 min-h-6 text-center text-sm text-[#514943]" aria-live="polite">{notice}</p>
      {manualCopy ? <label className="mt-1 block text-sm font-medium text-[#514943]">Referral link<textarea readOnly value={data.referralUrl} className="mt-2 block min-h-20 w-full resize-y rounded-xl border border-[#b8aaa0] bg-white p-3 text-sm text-[#28221e]" onFocus={(event) => event.currentTarget.select()} /></label> : null}
      <p className="mt-7 text-center text-sm text-[#70665e]">No app or account needed.</p>
    </ShareShell>
  );
}

function ShareShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#fdfaf5] px-6 py-[max(2rem,env(safe-area-inset-top))] text-[#1c1713]"><div className="mx-auto w-full max-w-[460px]">{children}</div></main>;
}

function LoadingState() { return <div className="animate-pulse pt-16" aria-live="polite"><div className="mx-auto h-8 w-36 rounded bg-[#e9e1d7]" /><div className="mx-auto mt-10 h-28 w-10/12 rounded-2xl bg-[#eee7df]" /><div className="mt-9 h-28 rounded-2xl bg-[#eee7df]" /><p className="mt-6 text-center text-sm text-[#70665e]">Loading your sharing link…</p></div>; }
function UnavailableState() { return <section className="pt-24 text-center"><p className="font-display text-4xl font-semibold">Root &amp; Foil</p><h1 className="mt-10 font-display text-4xl leading-tight">This referral link is unavailable.</h1><p className="mt-4 leading-7 text-[#514943]">Please ask your stylist for a current booking link.</p></section>; }
function FailureState({ onRetry }: { onRetry: () => void }) { return <section className="pt-24 text-center"><p className="font-display text-4xl font-semibold">Root &amp; Foil</p><h1 className="mt-10 font-display text-4xl leading-tight">We couldn&apos;t load this link. Please try again.</h1><button className="share-primary mt-8" type="button" onClick={onRetry}>Try again</button></section>; }
