import Link from "next/link";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

const sparkPaths = ["2,25 14,20 25,22 36,14 48,18 60,10 72,15 86,5", "2,25 14,23 25,18 37,21 48,14 60,16 72,9 86,6", "2,24 14,25 25,16 37,20 49,12 60,15 72,10 86,4"];

const insightSections = [
  { title: "Business Health", icon: "$", metrics: [["$5,220", "Booked Revenue", "+12%", "up"], ["30", "Appointments Booked", "+8%", "up"], ["$110.48", "Avg. $ / Hour", "+6%", "up"]] },
  { title: "Schedule Health", icon: "▣", metrics: [["12%", "Capacity Filled", "+4%", "up"], ["97%", "Remaining Capacity", "-2%", "down"], ["4h 18m", "Avg. Booking Length", "+12%", "up"]] },
  { title: "Client Health", icon: "♧", metrics: [["33", "At-Risk Clients", "-5%", "down"], ["—", "Rebooking Rate", "Checkout history unavailable", "warn"], ["123", "Total Clients", "+11%", "up"]] },
] as const;

export function InsightsScreen() {
  return <WorkspaceShell active="insights"><section className={styles.insights}>
    <PageHeading title="Insights" subtitle="A snapshot of your business health and opportunities." action={<div className={styles.dateControl}><b>▣ &nbsp; Last 30 Days</b><span>Sep 8, 2026 – Oct 7, 2026</span></div>} />
    {insightSections.map((section, sectionIndex) => <section className={styles.metricSection} key={section.title}>
      <h2><span className={styles.sectionIcon}>{section.icon}</span>{section.title}</h2>
      <div className={styles.metricGrid}>{section.metrics.map(([value, label, delta, direction], metricIndex) => <article className={styles.metricCard} key={label}>
        <p className={styles.metricValue}>{value}</p><p className={styles.metricLabel}>{label}</p>
        <svg className={styles.sparkline} viewBox="0 0 90 32" role="img" aria-label={`${label} trend`}><polyline points={sparkPaths[(sectionIndex + metricIndex) % sparkPaths.length]} /></svg>
        <p className={`${styles.metricDelta} ${direction === "down" ? styles.deltaDown : direction === "warn" ? styles.deltaWarn : ""}`}><b>{direction === "up" ? "↑" : direction === "down" ? "↓" : ""} {delta}</b>{direction !== "warn" && " vs. previous period"}</p>
      </article>)}</div>
    </section>)}</section></WorkspaceShell>;
}

const importTools = [
  {
    name: "GlossGenius",
    description: "Import your client list, appointments, and service history from GlossGenius.",
    mark: "G",
  },
  {
    name: "Square",
    description: "Import your client list, appointments, and service history from Square.",
    mark: "S",
  },
] as const;

export function ImportScreen() {
  return <WorkspaceShell active="import"><section className={styles.importPage}>
    <PageHeading title="Import your data" subtitle="Which tool would you like to import your data from?" />
    <div className={styles.importOptions} role="list" aria-label="Import tools">
      {importTools.map((tool) => <button className={styles.importOption} type="button" role="listitem" key={tool.name}>
        <span className={styles.importMark} aria-hidden="true">{tool.mark}</span>
        <span><strong>{tool.name}</strong><small>{tool.description}</small></span>
        <span className={styles.importArrow} aria-hidden="true">→</span>
      </button>)}
    </div>
  </section></WorkspaceShell>;
}

export function ServicesScreen() {
  return <WorkspaceShell active="settings"><section className={styles.settingsPage}>
    <SettingsNav activeItem="Services" />
    <div className={styles.settingsContent}>
      <PageHeading title="Services" subtitle="Manage the services available for clients to book." />
    </div>
  </section></WorkspaceShell>;
}

export function SettingsHomeScreen() {
  return <WorkspaceShell active="help"><section>
    <PageHeading title="Settings" subtitle="Manage your workspace preferences." />
  </section></WorkspaceShell>;
}

export function HelpScreen() {
  return <WorkspaceShell active="settings"><section>
    <PageHeading title="Help" subtitle="How can we help?" />
  </section></WorkspaceShell>;
}

const settingsItems = ["Business Details", "Services", "Billing", "Account"];
type FormField = readonly [label: string, value: string, width?: "wide"];

const fields: ReadonlyArray<readonly [title: string, fields: readonly FormField[]]> = [
  ["Business Information", [["Full Name", "Derick Davis"], ["Business Name", "DenDoBarber"], ["Phone Number", "+1 303-619-3143"], ["Email Address", "derrick@dendobarber.com"]]],
  ["Location", [["Address Line 1", "123 Main Street", "wide"], ["Address Line 2 (optional)", "Suite, unit, or floor", "wide"], ["City", "Denver"], ["State", "CO"], ["Zip Code", "80202"]]],
];

export function SettingsScreen() {
  return <WorkspaceShell active="settings"><section className={styles.settingsPage}><SettingsNav activeItem="Business Details" /><div className={styles.settingsContent}><PageHeading title="Business Details" subtitle="Manage your business information and preferences." />
    <form className={styles.businessForm}>{fields.map(([section, group]) => <FormSection key={section} title={section} fields={group} />)}<section className={styles.formSection}><h2>Business Preferences</h2><div className={`${styles.formGrid} ${styles.preferenceGrid}`}><SelectInput label="Time Zone" value="(GMT-7) Mountain Time (Denver)" /><SelectInput label="Currency" value="USD ($)" /></div></section><div className={styles.saveRow}><button className={styles.primaryButton} type="button">Save Changes</button></div></form></div></section></WorkspaceShell>;
}

function SettingsNav({ activeItem }: { activeItem: "Business Details" | "Services" }) {
  return <aside className={styles.settingsNav}><h2>Settings</h2>{settingsItems.map((item, index) => {
    if (item === "Account") return <Link className={styles.settingsNavLink} href="/settings/account" key={item}><span>◉</span>{item}</Link>;
    if (item === "Services") return <Link className={`${styles.settingsNavLink} ${activeItem === item ? styles.settingsActive : ""}`} href="/settings/services" key={item}><span>▤</span>{item}</Link>;
    if (item === "Business Details") return <Link className={`${styles.settingsNavLink} ${activeItem === item ? styles.settingsActive : ""}`} href="/settings/business-details" key={item}><span>▣</span>{item}</Link>;
    return <button className={activeItem === item ? styles.settingsActive : ""} key={item}><span>{index === 0 ? "▣" : "▧"}</span>{item}</button>;
  })}</aside>;
}

function FormSection({ title, fields }: { title: string; fields: readonly FormField[] }) { return <section className={styles.formSection}><h2>{title}</h2><div className={styles.formGrid}>{fields.map(([label, value, width]) => <label className={width === "wide" ? styles.wideField : ""} key={label}><span>{label}</span><input defaultValue={value} /></label>)}</div></section>; }
function SelectInput({ label, value }: { label: string; value: string }) { return <label><span>{label}</span><select defaultValue={value}><option>{value}</option></select></label>; }
