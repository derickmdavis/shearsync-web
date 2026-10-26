"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./workspace.module.css";

export type WorkspaceSection = "insights" | "calendar" | "clients" | "messages" | "import" | "settings" | "help";

type WorkspaceShellProps = {
  active: WorkspaceSection;
  children: ReactNode;
};

const navItems = [
  { href: "/insights", label: "Insights", icon: "insights", section: "insights" },
  { href: "/messages", label: "Messages", icon: "messages", section: "messages" },
  { href: "/calendar", label: "Calendar", icon: "calendar", section: "calendar" },
  { href: "/clients", label: "Clients", icon: "clients", section: "clients" },
  { href: "/settings", label: "Settings", icon: "settings", section: "settings" },
] as const;

function BrandLockup() {
  return <Image className={styles.sidebarLogo} src="/branding/root-and-foil-sidebar-logo.png" alt="Root & Foil" width={160} height={160} priority />;
}

function NavigationIcon({ name }: { name: (typeof navItems)[number]["icon"] }) {
  const paths = {
    insights: <><path d="m3 10 9-7 9 7v10H3z" /><path d="M9 21v-7h6v7" /></>,
    messages: <><path d="M4 4v6h6" /><path d="M4.7 10A8 8 0 1 0 7 5.2" /><path d="M12 8v5l3 2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18M7 14h3m4 0h3m-10 4h3m4 0h3" /></>,
    clients: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M15 21v-2a4 4 0 0 1 6-3.5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.65 2.65-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56v.09h-3.75v-.09a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.65-2.65.06-.06A1.7 1.7 0 0 0 5.2 15a1.7 1.7 0 0 0-1.56-1.03h-.09v-3.75h.09A1.7 1.7 0 0 0 5.2 9.19a1.7 1.7 0 0 0-.34-1.88L4.8 7.25 7.45 4.6l.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56v-.09h3.75v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.65 2.65-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.09v3.75h-.09A1.7 1.7 0 0 0 19.4 15Z" /></>,
  } as const;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function WorkspaceShell({ active, children }: WorkspaceShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    menuPanel.current?.querySelector<HTMLElement>("a")?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <main className={styles.workspace}>
      <aside className={styles.sidebar} aria-label="Primary navigation">
        <Link className={styles.brand} href="/calendar" aria-label="Root and Foil calendar">
          <BrandLockup />
        </Link>

        <nav className={styles.primaryNav}>
          {navItems.map((item) => (
            <Link
              className={`${styles.navItem} ${item.section === active ? styles.navItemActive : ""}`}
              href={item.href}
              key={item.label}
            >
              <span className={styles.navIcon}><NavigationIcon name={item.icon} /></span>
              {item.label}
            </Link>
          ))}
        </nav>

      </aside>

      <section className={styles.shellMain}>
        <header className={styles.topbar}>
          <Link className={styles.mobileBrand} href="/calendar" aria-label="Root and Foil calendar"><span className={styles.mobileWordmark}>Root <i>&amp;</i> Foil</span></Link>
          <label className={styles.globalSearch}>
            <span aria-hidden="true">⌕</span>
            <input aria-label="Search" placeholder="Search clients, appointments, or notes..." />
          </label>
          <div className={styles.userTools}>
            <span className={styles.avatar} aria-hidden="true">DD</span>
            <span className={styles.userMenu}>Derick Davis</span>
          </div>
          <div className={styles.mobileNavigation}>
            <button ref={menuButton} className={styles.mobileMenuButton} type="button" aria-expanded={menuOpen} aria-controls="workspace-menu" onClick={() => setMenuOpen((open) => !open)}><span>Menu</span><span aria-hidden="true">☰</span></button>
            {menuOpen ? <div className={styles.mobileMenuBackdrop} onClick={() => setMenuOpen(false)}>
              <nav id="workspace-menu" ref={menuPanel} aria-label="Mobile primary navigation" onClick={(event) => event.stopPropagation()}>
                <button className={styles.mobileMenuClose} type="button" onClick={() => setMenuOpen(false)}>Close <span aria-hidden="true">×</span></button>
              {navItems.map((item) => <Link className={`${styles.mobileNavItem} ${item.section === active ? styles.mobileNavItemActive : ""}`} href={item.href} key={item.label}>
                <span className={styles.navIcon}><NavigationIcon name={item.icon} /></span>{item.label}
              </Link>)}
              </nav>
            </div> : null}
          </div>
        </header>
        <div className={styles.pageCanvas}>{children}</div>
        <nav className={styles.mobileTabBar} aria-label="Primary navigation">
          {navItems.map((item) => <Link className={`${styles.mobileTab} ${item.section === active ? styles.mobileTabActive : ""}`} href={item.href} aria-current={item.section === active ? "page" : undefined} key={item.label}>
            <span className={styles.navIcon}><NavigationIcon name={item.icon} /></span><span>{item.label}</span>
          </Link>)}
        </nav>
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
