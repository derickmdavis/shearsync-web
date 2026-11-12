import Link from "next/link";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";
import { InsightsScreenClient } from "./InsightsScreenClient";

export function InsightsScreen() {
  return <InsightsScreenClient />;
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

type SettingsHubItem = { label: string; description: string; icon: string; href?: string };
const settingsGroups: ReadonlyArray<{ title: string; items: ReadonlyArray<SettingsHubItem> }> = [
  { title: "Business", items: [
    { label: "Profile", description: "Name, contact info, location, and timezone", icon: "⌖", href: "/settings/profile" },
    { label: "Services", description: "Manage bookable services", icon: "✂", href: "/settings/services" },
    { label: "Schedule", description: "Working hours and time off", icon: "▣", href: "/settings/schedule" },
  ] },
  { title: "Booking", items: [
    { label: "Booking settings", description: "Availability rules and preferences", icon: "⚙", href: "/settings/booking-settings" },
    { label: "Booking page", description: "Public page, request form, and sharing", icon: "↗", href: "/settings/booking-page" },
    { label: "Payment methods", description: "Payment links and instructions", icon: "▤" },
  ] },
  { title: "Account", items: [
    { label: "Account", description: "Sign-in and account details", icon: "◎", href: "/settings/account" },
    { label: "Subscription", description: "Plan and billing", icon: "▭", href: "/billing" },
    { label: "Help & support", description: "Get in touch", icon: "?", href: "/help" },
  ] },
];

export function SettingsScreen() {
  return <WorkspaceShell active="settings"><section className={styles.settingsHub}>
    <PageHeading title="Settings" subtitle="Manage your business, your way." />
    <div className={styles.settingsGroupGrid}>{settingsGroups.map((group) => <section className={styles.settingsGroup} key={group.title}><h2>{group.title}</h2><div className={styles.settingsCard} style={{ display: "grid", overflow: "hidden", borderRadius: 18, background: "rgba(255, 251, 245, .94)", boxShadow: "0 9px 24px rgba(81, 54, 22, .055)" }}>{group.items.map((item) => item.href ? <Link className={styles.settingsCardRow} style={{ display: "grid", gridTemplateColumns: "48px minmax(0, 1fr) auto", alignItems: "center", gap: 11, minHeight: 81, padding: "12px 13px", borderBottom: "1px solid #eee2d2" }} href={item.href} key={item.label}><span className={styles.settingsCardIcon} style={{ display: "grid", placeItems: "center", width: 48, height: 48, border: "1px solid #efddc4", borderRadius: "50%", background: "#fff4e3", color: "#b77928", fontSize: 21 }} aria-hidden="true">{item.icon}</span><span><b style={{ display: "block", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 18 }}> {item.label}</b><small style={{ display: "block", marginTop: 4, color: "#61708a", fontSize: 12, lineHeight: 1.3 }}>{item.description}</small></span><i style={{ color: "#60728d", fontSize: 27, fontStyle: "normal" }} aria-hidden="true">›</i></Link> : <div className={`${styles.settingsCardRow} ${styles.settingsUnavailable}`} style={{ display: "grid", gridTemplateColumns: "48px minmax(0, 1fr) auto", alignItems: "center", gap: 11, minHeight: 81, padding: "12px 13px", borderBottom: "1px solid #eee2d2" }} key={item.label}><span className={styles.settingsCardIcon} style={{ display: "grid", placeItems: "center", width: 48, height: 48, border: "1px solid #efddc4", borderRadius: "50%", background: "#fff4e3", color: "#b77928", fontSize: 21 }} aria-hidden="true">{item.icon}</span><span><b style={{ display: "block", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 18 }}>{item.label}</b><small style={{ display: "block", marginTop: 4, color: "#867a6c", fontSize: 12, lineHeight: 1.3 }}>{item.description} · Coming soon</small></span><i style={{ color: "#60728d", fontSize: 27, fontStyle: "normal" }} aria-hidden="true">›</i></div>)}</div></section>)}</div>
  </section></WorkspaceShell>;
}

export function BusinessDetailsScreen() {
  return <WorkspaceShell active="settings"><section className={styles.settingsPage}><SettingsNav activeItem="Business Details" /><div className={styles.settingsContent}><PageHeading title="Business Details" subtitle="Manage your business information and preferences." />
    <form className={styles.businessForm}>{fields.map(([section, group]) => <FormSection key={section} title={section} fields={group} />)}<section className={styles.formSection}><h2>Business Preferences</h2><div className={`${styles.formGrid} ${styles.preferenceGrid}`}><SelectInput label="Time Zone" value="(GMT-7) Mountain Time (Denver)" /><SelectInput label="Currency" value="USD ($)" /></div></section><div className={styles.saveRow}><button className={styles.primaryButton} type="button">Save Changes</button></div></form></div></section></WorkspaceShell>;
}

function SettingsNav({ activeItem }: { activeItem: "Business Details" | "Services" }) {
  return <aside className={styles.settingsNav}><h2>Settings</h2>{settingsItems.map((item, index) => {
    if (item === "Account") return <Link className={styles.settingsNavLink} href="/settings/account" key={item}><span>◉</span>{item}</Link>;
    if (item === "Services") return <Link className={`${styles.settingsNavLink} ${activeItem === item ? styles.settingsActive : ""}`} href="/settings/services" key={item}><span>▤</span>{item}</Link>;
    if (item === "Business Details") return <Link className={`${styles.settingsNavLink} ${activeItem === item ? styles.settingsActive : ""}`} href="/settings/business-details" key={item}><span>▣</span>{item}</Link>;
    if (item === "Billing") return <Link className={styles.settingsNavLink} href="/billing" key={item}><span>▧</span>{item}</Link>;
    return <button className={activeItem === item ? styles.settingsActive : ""} key={item}><span>{index === 0 ? "▣" : "▧"}</span>{item}</button>;
  })}</aside>;
}

function FormSection({ title, fields }: { title: string; fields: readonly FormField[] }) { return <section className={styles.formSection}><h2>{title}</h2><div className={styles.formGrid}>{fields.map(([label, value, width]) => <label className={width === "wide" ? styles.wideField : ""} key={label}><span>{label}</span><input defaultValue={value} /></label>)}</div></section>; }
function SelectInput({ label, value }: { label: string; value: string }) { return <label><span>{label}</span><select defaultValue={value}><option>{value}</option></select></label>; }
