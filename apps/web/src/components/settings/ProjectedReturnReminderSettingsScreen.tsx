"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ApiError,
  getProjectedReturnReminderSettings,
  updateProjectedReturnReminderSettings,
  type ProjectedReturnReminderSettings,
} from "@/src/lib/api";
import { withActiveAccount } from "@/src/lib/auth/active-account";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "@/src/components/workspace/WorkspaceShell";

function errorText(error: unknown) { return error instanceof Error && error.message ? error.message : "Unable to update projected-return timing. Try again."; }
function isRevisionConflict(error: unknown) { return (error instanceof ApiError || (error && typeof error === "object")) && (error as ApiError).status === 409 && (error as ApiError).code === "return_revision_conflict"; }

export function ProjectedReturnReminderSettingsScreen() {
  const [baseline, setBaseline] = useState<ProjectedReturnReminderSettings | null>(null);
  const [offsetDays, setOffsetDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [conflicted, setConflicted] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const settings = await withActiveAccount((token) => getProjectedReturnReminderSettings(token));
      setBaseline(settings); setOffsetDays(settings.offset_days);
      return settings;
    } catch (error) { setNotice(errorText(error)); return null; } finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function save() {
    if (!baseline) return;
    if (!Number.isInteger(offsetDays) || offsetDays < -30 || offsetDays > 30) { setNotice("Offset must be a whole number from -30 to +30 days."); return; }
    setSaving(true); setNotice(null); setConflicted(false);
    try {
      const saved = await withActiveAccount((token) => updateProjectedReturnReminderSettings(token, { offset_days: offsetDays, expected_revision: baseline.revision }));
      setBaseline(saved); setOffsetDays(saved.offset_days); setNotice("Projected-return timing saved.");
    } catch (error) {
      if (isRevisionConflict(error)) {
        const current = await load();
        if (current) {
          setConflicted(true);
          setNotice("Projected-return timing changed elsewhere. The current setting has been reloaded; review it, choose an offset, and save again.");
        }
      } else setNotice(errorText(error));
    } finally { setSaving(false); }
  }

  return <WorkspaceShell active="settings"><section className={styles.settingsContent}>
    <PageHeading title="Rebooking" subtitle="Set when projected-return reminders are processed." />
    {notice ? <p className={styles.servicesMessage} role="status">{notice}</p> : null}
    {loading && !baseline ? <section className={styles.servicesPanel}>Loading rebooking settings…</section> : null}
    {!loading && !baseline ? <section className={styles.servicesPanel} role="alert"><p>Rebooking settings could not load.</p><button className={styles.secondaryButton} type="button" onClick={() => void load()}>Try again</button></section> : null}
    {baseline ? <section className={styles.servicesPanel}>
      <label>Reminder offset (days)<small>Use -30 to +30. Negative values send before the projected return date; 0 sends on the date.</small><input type="number" min={-30} max={30} step="1" value={offsetDays} onChange={(event) => { setOffsetDays(Number(event.target.value)); setConflicted(false); }} /></label>
      <dl className={styles.automationDetails}><div><dt>Business timezone</dt><dd>{baseline.timezone}</dd></div><div><dt>Local send time</dt><dd>{baseline.local_send_time}</dd></div></dl>
      {conflicted ? <p className={styles.servicesMessage}>The server setting is now loaded at revision {baseline.revision}. Your next Save timing action is an explicit retry using this revision.</p> : null}
      <button className={styles.primaryButton} type="button" disabled={saving || loading} onClick={() => void save()}>{saving ? "Saving…" : conflicted ? "Retry save with current revision" : "Save timing"}</button>
    </section> : null}
  </section></WorkspaceShell>;
}
