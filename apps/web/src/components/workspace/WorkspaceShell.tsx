import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./workspace.module.css";

export type WorkspaceSection = "insights" | "calendar" | "clients" | "settings";

type WorkspaceShellProps = {
  active: WorkspaceSection;
  children: ReactNode;
};

const navItems = [
  { href: "/calendar", label: "Calendar", icon: "□", section: "calendar" },
  { href: "/clients", label: "Clients", icon: "♧", section: "clients" },
  { href: "/settings/business-details", label: "Settings", icon: "⚙", section: "settings" },
] as const;

export function WorkspaceShell({ active, children }: WorkspaceShellProps) {
  return (
    <main className={styles.workspace}>
      <aside className={styles.sidebar} aria-label="Primary navigation">
        <Link className={styles.brand} href="/calendar" aria-label="Root and Foil calendar">
          <span className={styles.brandMark} aria-hidden="true"><i /><i /><i /></span>
          <span>Root <em>&amp;</em> Foil</span>
        </Link>

        <nav className={styles.primaryNav}>
          {navItems.map((item) => (
            <Link
              className={`${styles.navItem} ${item.section === active ? styles.navItemActive : ""}`}
              href={item.href}
              key={item.label}
            >
              <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className={styles.utilityNav} aria-label="Utility navigation">
          <a className={styles.navItem} href="#help"><span className={styles.navIcon} aria-hidden="true">?</span>Help</a>
        </nav>
      </aside>

      <section className={styles.shellMain}>
        <header className={styles.topbar}>
          <label className={styles.globalSearch}>
            <span aria-hidden="true">⌕</span>
            <input aria-label="Search" placeholder="Search clients, appointments, or notes..." />
          </label>
          <div className={styles.userTools}>
            <button className={styles.iconButton} type="button" aria-label="Notifications">♧</button>
            <span className={styles.avatar} aria-hidden="true">DD</span>
            <button className={styles.userMenu} type="button">Derick Davis <span aria-hidden="true">⌄</span></button>
          </div>
        </header>
        <div className={styles.pageCanvas}>{children}</div>
      </section>
    </main>
  );
}

export function PageHeading({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <header className={styles.pageHeading}>
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </header>
  );
}

export { styles as workspaceStyles };
