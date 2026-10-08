import Link from "next/link";
import Image from "next/image";
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
          <Image className={styles.brandLogo} src="/branding/root-and-foil-logo.png" width={1137} height={1132} alt="Root and Foil" priority />
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
            <span className={styles.avatar} aria-hidden="true">DD</span>
            <span className={styles.userMenu}>Derick Davis</span>
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
