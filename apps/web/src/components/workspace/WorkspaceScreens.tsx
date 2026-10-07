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

const calendarEvents = [
  { day: 0, start: 1, length: 1.35, name: "Alexis R.", service: "Haircut", tone: "blush" },
  { day: 0, start: 4.2, length: 1.35, name: "Open", service: "", tone: "green" },
  { day: 0, start: 5.7, length: 1.2, name: "Color", service: "Touch Up", tone: "blue" },
  { day: 1, start: 2.8, length: 1.25, name: "New Client", service: "Consult", tone: "blue" },
  { day: 2, start: .8, length: 1.4, name: "Gia M.", service: "Highlights", tone: "lavender" },
  { day: 2, start: 4.2, length: 1.35, name: "Alexis E.", service: "Long Haircut", tone: "blush" },
  { day: 2, start: 6.25, length: 1.25, name: "Amara D.", service: "Haircut", tone: "blush" },
  { day: 4, start: 1.0, length: 1.8, name: "Iris P.", service: "Color", tone: "yellow" },
  { day: 4, start: 5.5, length: 1.45, name: "Priya S.", service: "Child Style", tone: "yellow" },
];
const times = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];
const days = [["Mon", "Oct 5"], ["Tue", "Oct 6"], ["Wed", "Oct 7"], ["Thu", "Oct 8"], ["Fri", "Oct 9"]];

export function CalendarScreen() {
  return <WorkspaceShell active="calendar"><section>
    <PageHeading title="Calendar" subtitle="Your schedule, designed around your day." action={<button className={styles.primaryButton} type="button">＋ Book Appointment</button>} />
    <div className={styles.calendarControls}><button className={styles.secondaryButton}>Today</button><button className={styles.squareButton}>‹</button><strong>Oct 5 – Oct 11, 2026</strong><button className={styles.squareButton}>›</button><div className={styles.segmented}><button>Day</button><button className={styles.segmentedActive}>Week</button><button>Month</button></div></div>
    <div className={styles.calendarLayout}><section className={styles.calendarGrid} aria-label="Weekly calendar">
      <div className={styles.calendarHeaders}><div />{days.map(([day, date], index) => <div className={index === 2 ? styles.selectedDay : ""} key={day}><b>{day}</b><span>{date}</span></div>)}</div>
      <div className={styles.calendarBody}><div className={styles.timeLabels}>{times.map((time) => <span key={time}>{time}</span>)}</div><div className={styles.calendarDays}>{days.map(([, date], index) => <div className={`${styles.dayColumn} ${index === 2 ? styles.todayColumn : ""}`} key={date}>{calendarEvents.filter((event) => event.day === index).map((event) => <div className={`${styles.eventBlock} ${styles[event.tone]}`} style={{ top: `${event.start * 9.09}%`, height: `${event.length * 9.09}%` }} key={`${event.name}-${event.start}`}><b>{event.name}</b><span>{event.service}</span></div>)}</div>)}</div></div>
    </section><DayDetailRail /></div>
  </section></WorkspaceShell>;
}

function DayDetailRail() {
  const appointments = [["9:00 AM", "Alexis Flores", "Signature Haircut · 1h", "Completed"], ["12:00 PM", "Gia Martinez", "Highlights · 1h 30m", "Completed"], ["2:00 PM", "Open", "1h", "Book now"], ["4:00 PM", "Amara Diaz", "Transformational Haircut · 1h 30m", ""]];
  return <aside className={styles.detailRail}><h2>Wednesday, Oct 7, 2026</h2><div className={styles.dayStats}><div><b>▣</b><strong>8</strong><span>Appts</span></div><div><b>◷</b><strong>7h 45m</strong><span>Booked</span></div><div><b>◉</b><strong>97%</strong><span>Capacity</span></div></div><div className={styles.railTabs}><button className={styles.railTabActive}>Appointments (8)</button><button>Waitlist (2)</button></div><div className={styles.appointmentList}>{appointments.map(([time, client, service, status]) => <div className={styles.appointmentItem} key={time}><time>{time}</time><div><strong className={client === "Open" ? styles.openText : ""}>{client}</strong><span>{service}</span></div>{status && <span className={`${styles.statusPill} ${status === "Book now" ? styles.bookPill : ""}`}>{status}</span>}</div>)}</div><div className={styles.quickActions}><h3>Quick Actions</h3><div><button>＋<span>Add Appointment</span></button><button>▣<span>Block Time</span></button><button>▱<span>Add Note</span></button></div></div></aside>;
}

const clients = [
  ["Alexis Flores", "AF", "2 weeks ago", "34", "$366", "Nov 2, 8:00 AM"], ["Gia Martinez", "GM", "2 months ago", "18", "$165", "Oct 14, 9:30 AM"], ["Q.A. De Luna", "QD", "1 month ago", "9", "$85", "—"], ["Sam Feller", "SF", "5 months ago", "7", "$95", "Oct 29, 4:00 PM"], ["Harper Ellis", "HE", "3 days ago", "24", "$440", "Oct 16, 12:00 PM"], ["Amara Diaz", "AD", "1 week ago", "12", "$326", "Oct 11, 4:00 PM"], ["Iris Parker", "IP", "3 weeks ago", "8", "$145", "Pending appointment..."], ["Casey Watson", "CW", "1 month ago", "5", "$120", "—"],
];

export function ClientsScreen() {
  return <WorkspaceShell active="clients"><section>
    <PageHeading title="Clients" subtitle="Build lasting relationships with every client." action={<button className={styles.primaryButton} type="button">＋ Add Client</button>} />
    <div className={styles.clientFilters}><label className={styles.clientSearch}><span>⌕</span><input placeholder="Search clients by name, phone, or notes..." /></label><button className={styles.secondaryButton}>▱ &nbsp; Filter</button></div><div className={styles.filterChips}>{["All Clients 123", "At Risk 33", "New 21", "VIP 18", "No Upcoming 28"].map((chip, index) => <button className={index === 0 ? styles.filterChipActive : ""} key={chip}>{chip}</button>)}</div>
    <div className={styles.clientsLayout}><section className={styles.clientTableWrap}><table className={styles.clientTable}><thead><tr><th>Name</th><th>Last Seen</th><th>Visits</th><th>Total Spent</th><th>Next Appointment</th></tr></thead><tbody>{clients.map(([name, initials, lastSeen, visits, spent, next]) => <tr className={name === "Alexis Flores" ? styles.selectedRow : ""} key={name}><td><span className={styles.clientAvatar}>{initials}</span><strong>{name}</strong></td><td>{lastSeen}</td><td>{visits}</td><td>{spent}</td><td>{next === "—" ? <span className={styles.muted}>—</span> : <span className={styles.nextPill}>{next}</span>}</td></tr>)}</tbody></table></section><ClientDetail /></div>
  </section></WorkspaceShell>;
}

function ClientDetail() { return <aside className={styles.clientDetail}><button className={styles.closePanel} aria-label="Close client panel">×</button><div className={styles.clientProfile}><span className={`${styles.clientAvatar} ${styles.largeAvatar}`}>AF</span><div><h2>Alexis E. Flores</h2><span className={styles.vipPill}>♕ &nbsp;VIP Client</span></div><button className={styles.editButton}>Edit</button></div><div className={styles.clientTabs}><button className={styles.clientTabActive}>Overview</button><button>History</button><button>Notes</button></div><InfoSection title="Contact"><p>⌁ &nbsp;+1 300 555 0193</p><p>✉ &nbsp;alexisflores@email.com</p></InfoSection><InfoSection title="Client Stats"><div className={styles.clientStats}><div><b>34</b><span>Total Visits</span></div><div><b>$365</b><span>Total Value</span></div><div><b>2 weeks ago</b><span>Last Seen</span></div></div></InfoSection><InfoSection title="Next Appointment"><strong>↗ &nbsp;Nov 2, 2026 · 8:00 AM</strong><p>Signature Haircut · 1h</p></InfoSection><div className={styles.detailActions}><button>Reschedule</button><button>Add Note</button></div></aside>; }

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) { return <section className={styles.infoSection}><h3>{title}</h3>{children}</section>; }

const settingsItems = ["Business Details", "Services", "Staff", "Availability", "Notifications", "Integrations", "Billing"];
type FormField = readonly [label: string, value: string, width?: "wide"];

const fields: ReadonlyArray<readonly [title: string, fields: readonly FormField[]]> = [
  ["Business Information", [["Full Name", "Derick Davis"], ["Business Name", "DenDoBarber"], ["Phone Number", "+1 303-619-3143"], ["Email Address", "derrick@dendobarber.com"]]],
  ["Location", [["Address Line 1", "123 Main Street", "wide"], ["Address Line 2 (optional)", "Suite, unit, or floor", "wide"], ["City", "Denver"], ["State", "CO"], ["Zip Code", "80202"]]],
];

export function SettingsScreen() {
  return <WorkspaceShell active="settings"><section className={styles.settingsPage}><aside className={styles.settingsNav}><h2>Settings</h2>{settingsItems.map((item, index) => <button className={index === 0 ? styles.settingsActive : ""} key={item}><span>{["▣", "▤", "♧", "□", "♧", "⌘", "▧"][index]}</span>{item}</button>)}</aside><div className={styles.settingsContent}><PageHeading title="Business Details" subtitle="Manage your business information and preferences." />
    <form className={styles.businessForm}>{fields.map(([section, group]) => <FormSection key={section} title={section} fields={group} />)}<section className={styles.formSection}><h2>Business Preferences</h2><div className={`${styles.formGrid} ${styles.preferenceGrid}`}><SelectInput label="Time Zone" value="(GMT-7) Mountain Time (Denver)" /><SelectInput label="Currency" value="USD ($)" /></div></section><div className={styles.saveRow}><button className={styles.primaryButton} type="button">Save Changes</button></div></form></div></section></WorkspaceShell>;
}

function FormSection({ title, fields }: { title: string; fields: readonly FormField[] }) { return <section className={styles.formSection}><h2>{title}</h2><div className={styles.formGrid}>{fields.map(([label, value, width]) => <label className={width === "wide" ? styles.wideField : ""} key={label}><span>{label}</span><input defaultValue={value} /></label>)}</div></section>; }
function SelectInput({ label, value }: { label: string; value: string }) { return <label><span>{label}</span><select defaultValue={value}><option>{value}</option></select></label>; }
