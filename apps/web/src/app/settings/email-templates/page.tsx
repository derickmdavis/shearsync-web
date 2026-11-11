import Link from "next/link";
import { WorkspaceShell, PageHeading, workspaceStyles as styles } from "@/src/components/workspace/WorkspaceShell";

const templates = [
  ["booking_confirmation", "Booking confirmation"], ["appointment_reminder", "Appointment reminder"], ["rebook_nudge", "Rebook nudge"], ["thank_you", "Thank-you email"], ["birthday", "Birthday reminder"],
] as const;

export default function EmailTemplatesPage() {
  return <WorkspaceShell active="settings"><section className={styles.settingsContent}><PageHeading title="Email templates" subtitle="Edit the content used by client communication automations." /><div className={styles.servicesPanel}>{templates.map(([key, label]) => <Link className={styles.serviceRow} href={`/settings/email-templates/${key}`} key={key}><span>{label}</span><span>›</span></Link>)}</div></section></WorkspaceShell>;
}
