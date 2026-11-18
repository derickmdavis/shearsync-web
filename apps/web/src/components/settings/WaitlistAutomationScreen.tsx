"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AutomationDetailShell } from "@/src/components/automations";
import { getAutomationBootstrap, type AutomationChannelCapability, type AutomationControl } from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import styles from "./waitlist-automation.module.css";

function errorMessage(error: unknown) { return error instanceof Error && error.message ? error.message : "Unable to load waitlist status. Try again."; }
function channelStatus(channel: AutomationChannelCapability) { return !channel.available ? "Unavailable" : channel.enabled ? "On" : "Off"; }

export function WaitlistAutomationScreen() {
  const [control, setControl] = useState<AutomationControl | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [notice, setNotice] = useState<{ tone: "error"; message: string } | null>(null);

  const load = useCallback(async () => {
    const bootstrap = await withActiveAccount((token) => getAutomationBootstrap(token));
    const waitlist = bootstrap.controls.find((candidate) => candidate.key === "waitlist_match") ?? null;
    if (!waitlist) throw new Error("Waitlist matching is not available for this account.");
    return waitlist;
  }, []);

  useEffect(() => {
    let active = true;
    void load().then((value) => { if (active) { setControl(value); setNotice(null); setState("ready"); } }).catch((error) => { if (active) { setNotice({ tone: "error", message: errorMessage(error) }); setState("error"); } });
    return () => { active = false; };
  }, [load]);

  async function retry() {
    try { setState("loading"); setControl(await load()); setNotice(null); setState("ready"); }
    catch (error) { setNotice({ tone: "error", message: errorMessage(error) }); setState("error"); }
  }

  const metrics = control ? [
    ["Queued matches", control.queued_count],
    ["Scheduled notifications", control.scheduled_count],
    ["Pending review", control.pending_approval_count],
  ].filter((metric): metric is [string, number] => typeof metric[1] === "number") : [];

  return <AutomationDetailShell title="Waitlist" subtitle="Monitor client requests and the matches created for newly available appointments." backHref="/messages" backLabel="Messages" state={state} onRetry={() => void retry()} notice={notice}>
    {control ? <><section className={styles.statusCard}><header><div><p>Operational status</p><h2>{control.feature_available ? control.status_label || "Available" : "Unavailable"}</h2></div><span className={control.feature_available ? styles.available : styles.unavailable}>{control.feature_available ? "Available" : "Unavailable"}</span></header>{!control.feature_available ? <p className={styles.reason}>{control.unavailable_reason || "Waitlist matching is unavailable for this account."}</p> : <p>Waitlist matching watches for client requests and open appointments. Channel availability is determined by the server.</p>}</section>
      <section className={styles.channelCard} aria-labelledby="waitlist-channels"><h2 id="waitlist-channels">Supported channels</h2><div>{(["email", "sms"] as const).map((channel) => { const capability = control.channels[channel]; return <article key={channel}><div><strong>{channel === "email" ? "Email" : "Text"}</strong>{!capability.available && capability.unavailable_reason ? <small>{capability.unavailable_reason}</small> : null}</div><span className={capability.available && capability.enabled ? styles.channelOn : ""}>{channelStatus(capability)}</span></article>; })}</div></section>
      {metrics.length ? <section className={styles.metrics} aria-label="Waitlist activity">{metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</section> : null}
      <section className={styles.workflowCard}><div><h2>Waitlist queue</h2><p>Review active client requests and follow up on matching opportunities from Messages.</p></div><Link href="/messages?tab=manage&focus=waitlist">Open waitlist queue</Link></section>
    </> : null}
  </AutomationDetailShell>;
}
