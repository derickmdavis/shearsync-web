"use client";

import Link from "next/link";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import { WorkspaceShell } from "@/src/components/workspace/WorkspaceShell";
import styles from "./automation-detail.module.css";

export type AutomationDetailState = "loading" | "ready" | "error";
export type AutomationNoticeTone = "info" | "success" | "warning" | "error";

export type AutomationNotice = {
  tone?: AutomationNoticeTone;
  message: string;
};

type AutomationDetailShellProps = {
  title: string;
  subtitle: string;
  backHref?: string;
  backLabel?: string;
  state?: AutomationDetailState;
  notice?: AutomationNotice | null;
  dirty?: boolean;
  onRetry?: () => void;
  children?: ReactNode;
  preview?: ReactNode;
  optionalContent?: ReactNode;
};

export function AutomationNoticeMessage({ notice }: { notice: AutomationNotice }) {
  return <p className={`${styles.notice} ${styles[`notice${notice.tone === "success" ? "Success" : notice.tone === "warning" ? "Warning" : notice.tone === "error" ? "Error" : "Info"}`]}`} role={notice.tone === "error" ? "alert" : "status"}>{notice.message}</p>;
}

export function AutomationDetailShell({
  title,
  subtitle,
  backHref = "/messages",
  backLabel = "Messages",
  state = "ready",
  notice,
  dirty = false,
  onRetry,
  children,
  preview,
  optionalContent,
}: AutomationDetailShellProps) {
  useEffect(() => {
    if (!dirty) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [dirty]);

  function confirmLeaving(event: MouseEvent<HTMLAnchorElement>) {
    if (!dirty || window.confirm("Discard unsaved automation changes?")) return;
    event.preventDefault();
  }

  return <WorkspaceShell active="settings"><section className={styles.page} aria-labelledby="automation-detail-title">
    <Link aria-label={`Back to ${backLabel}`} className={styles.backLink} href={backHref} onClick={confirmLeaving}>‹ Back to {backLabel}</Link>
    <header className={styles.heading}><h1 id="automation-detail-title">{title}</h1><p>{subtitle}</p></header>
    {notice ? <AutomationNoticeMessage notice={notice} /> : null}
    {state === "loading" ? <section className={styles.statePanel} aria-busy="true">Loading automation settings…</section> : null}
    {state === "error" ? <section className={styles.statePanel} role="alert"><p>Automation settings could not load.</p>{onRetry ? <button className={styles.retryButton} type="button" onClick={onRetry}>Try again</button> : null}</section> : null}
    {state === "ready" ? <div className={styles.layout}><div className={styles.controls}>{children}{optionalContent ? <div className={styles.optionalContent}>{optionalContent}</div> : null}</div>{preview ? <aside className={styles.previewRail}>{preview}</aside> : null}</div> : null}
  </section></WorkspaceShell>;
}
