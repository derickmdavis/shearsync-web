"use client";

import Image from "next/image";
import Link from "next/link";
import { getWebAppUrl } from "@/src/lib/urls";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const MONTHLY_PRICE = "$25";
const loginHref = getWebAppUrl("/login");

const productPillars = [
  {
    icon: "/assets/icons/icon-calendar-bronze.svg",
    title: "Stay booked.",
    body: "Make it effortless for clients to book and keep coming back",
    bullets: [
      "Online booking that’s always open",
      "Automated reminders that reduce no-shows",
      "Waitlist support to fill last-minute openings",
      "Re-book nudges to keep clients coming back",
    ],
    screenshot: "/assets/home/root-and-foil-phone-calendar.png",
    alt: "Root & Foil calendar screen showing appointments, open time, and booking controls",
  },
  {
    icon: "/assets/icons/icon-client-bronze.svg",
    title: "Remember every client.",
    body: "Give every client a personal, consistent experience",
    bullets: [
      "Client notes, preferences, and service history",
      "Color formulas for roots, toners, lighteners, developers, and more",
      "Before-and-after photos tied to each client",
      "Appointment history and rebooking patterns",
    ],
    screenshot: "/assets/home/root-and-foil-phone-clients.png",
    alt: "Root & Foil clients screen showing client list, notes, and client history",
  },
  {
    icon: "/assets/icons/icon-analytics-bronze.svg",
    title: "Grow with clarity",
    body: "Understand your client behavior and trends so you can grow with confidence.",
    bullets: [
      "Revenue, retention, and re-booking at a glance",
      "Average ticket, top services, and add-ons",
      "Trends and insights to guide your next move",
    ],
    screenshot: "/assets/home/root-and-foil-phone-insights.png",
    alt: "Root & Foil dashboard screen showing business snapshot and revenue insights",
  },
];

const philosophyItems = [
  { label: "Focused", icon: "user" },
  { label: "Built for you", icon: "sparkle" },
  { label: "No upgrades", icon: "heart" },
] as const;

const corePricingItems = [
  "Every feature included",
  "No tiers, no add-ons",
  "Cancel anytime",
];

const includedFeatureColumns = [
  [
    "Online booking & custom rules",
    "Waitlist",
    "Client profiles & history",
    "Formula notes & photos",
    "Automated follow-ups",
  ],
  [
    "Business insights & reporting",
    "Rebooking nudges",
    "Referral tracking",
    "Calendar sync",
    "And more",
  ],
];

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Product", href: "#product" },
      { label: "What’s Included", href: "#product" },
      { label: "Pricing", href: "#pricing" },
      { label: "Login", href: loginHref },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#top" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

function MarketingLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "nav";
  className?: string;
}) {
  const styles = {
    primary:
      "border border-[rgba(138,85,40,0.65)] bg-gradient-to-b from-[#C98A44] via-[#B07A3E] to-[#A96A32] text-white shadow-[0_18px_38px_rgba(176,122,62,0.20)] hover:border-brand-dark hover:from-[#B97939] hover:to-[#996534]",
    secondary:
      "border border-[#B07A3E] bg-transparent text-[#4A3728] hover:bg-[rgba(200,164,107,0.10)] hover:text-[#4A3728]",
    nav: "border border-[rgba(138,85,40,0.55)] bg-gradient-to-b from-[#C98A44] to-[#B07A3E] text-white shadow-[0_12px_28px_rgba(176,122,62,0.20)] hover:border-brand-dark hover:from-[#996534] hover:to-[#996534]",
  };

  return (
    <Link
      href={href}
      className={[
        "inline-flex h-11 items-center justify-center rounded-[8px] px-6 font-display text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-[#F6F1E8]",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function MarketingButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "nav";
  className?: string;
}) {
  const styles = {
    primary:
      "border border-[rgba(138,85,40,0.65)] bg-gradient-to-b from-[#C98A44] via-[#B07A3E] to-[#A96A32] text-white shadow-[0_18px_38px_rgba(176,122,62,0.20)] hover:border-brand-dark hover:from-[#B97939] hover:to-[#996534]",
    nav: "border border-[rgba(138,85,40,0.55)] bg-gradient-to-b from-[#C98A44] to-[#B07A3E] text-white shadow-[0_12px_28px_rgba(176,122,62,0.20)] hover:border-brand-dark hover:from-[#996534] hover:to-[#996534]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-11 items-center justify-center rounded-[8px] px-6 font-display text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-[#F6F1E8]",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function BrandLogo() {
  return (
    <Link
      href="#top"
      className="shrink-0 focus:outline-none focus:ring-2 focus:ring-brand/35"
      aria-label="Root & Foil"
    >
      <Image
        src="/assets/brand/root-and-foil-navigation-logo.png"
        alt="Root & Foil"
        width={952}
        height={1094}
        priority
        className="h-11 w-auto object-contain sm:h-12"
      />
    </Link>
  );
}

function HomeNav({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  return (
    <nav
      className="relative z-20 mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-4 px-5 py-5 sm:h-[76px] sm:flex-row sm:items-center sm:px-8 sm:py-0"
      aria-label="Primary"
    >
      <BrandLogo />

      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-6">
        <Link
          href="#product"
          className="font-display text-xs font-semibold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm"
        >
          Product
        </Link>
        <Link
          href="#pricing"
          className="font-display text-xs font-semibold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm"
        >
          Pricing
        </Link>
        <Link
          href={loginHref}
          className="font-display text-xs font-semibold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm"
        >
          Login
        </Link>
        <MarketingButton
          onClick={onJoinWaitlist}
          variant="nav"
          className="h-9 px-4 text-xs sm:h-10 sm:px-5 sm:text-sm"
        >
          Join Waitlist
        </MarketingButton>
      </div>
    </nav>
  );
}

function HomeHero({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#F6F1E8] text-[#111111]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(232,211,163,0.42)_0%,rgba(232,211,163,0.12)_28%,transparent_54%),radial-gradient(circle_at_92%_18%,rgba(214,187,133,0.35)_0%,rgba(214,187,133,0.10)_34%,transparent_62%),linear-gradient(135deg,#F6F1E8_0%,#FFF8E8_48%,#F6F1E8_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.32)_44%,transparent_56%),linear-gradient(300deg,transparent_0%,rgba(200,164,107,0.12)_42%,transparent_65%)] opacity-60" />
      <HomeNav onJoinWaitlist={onJoinWaitlist} />

      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-8 px-5 pb-12 pt-7 sm:px-8 lg:min-h-[610px] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:pb-0 lg:pt-0">
        <div className="max-w-[560px]">
          <p className="inline-flex items-center gap-2 rounded-[4px] border border-[#C8A46B] bg-[#FFFDF8]/35 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.07em] text-brand sm:whitespace-nowrap">
            Designed for independent stylists and barbers
          </p>

          <h1 className="mt-6 max-w-[530px] font-display text-[54px] font-bold leading-[0.9] tracking-normal text-[#111111] sm:text-[72px] lg:text-[78px]">
            Growth starts at the roots.
          </h1>

          <h2 className="mt-5 max-w-[520px] whitespace-nowrap font-display text-[clamp(16px,4.8vw,28px)] font-bold leading-tight tracking-[-0.01em] text-brand sm:text-[32px]">
            You built the roots - we add the lift.
          </h2>

          <p className="mt-5 max-w-[520px] text-[16px] leading-7 text-[#4F4A45] sm:text-[17px]">
            Root &amp; Foil helps you stay booked, remember every client detail, and
            understand your business. Built only for independent hair
            professionals, Root &amp; Foil gives you the tools you need without the
            complexity you don&apos;t, at a price that makes sense.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MarketingButton
              onClick={onJoinWaitlist}
              className="w-full sm:w-auto"
            >
              Join Waitlist
            </MarketingButton>
            <MarketingLink
              href="#product"
              variant="secondary"
              className="w-full !font-sans !text-sm !font-semibold sm:w-auto"
            >
              See What&apos;s Included
            </MarketingLink>
          </div>

        </div>

        <div className="relative -mr-5 min-h-[390px] sm:-mr-8 sm:min-h-[500px] lg:-mr-[calc((100vw-1180px)/2)] lg:h-[610px] lg:min-h-0 lg:self-end">
          <Image
            src="/marketing/stylist-hero.png"
            alt="Female stylist using a tablet in a salon"
            fill
            priority
            sizes="(min-width: 1180px) 660px, (min-width: 1024px) 56vw, 100vw"
            className="object-cover object-[58%_center]"
          />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#F6F1E8] via-[#F6F1E8]/72 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function HomeProductPillars() {
  return (
    <section
      id="product"
      className="border-t border-[rgba(200,164,107,0.30)] bg-transparent px-5 py-20 text-[#111111] sm:px-8 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="font-display text-[38px] font-bold leading-[1.02] tracking-normal sm:text-[48px] lg:text-[56px]">
            Everything you need to grow.
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-[#4F4A45] sm:text-base">
            Root &amp; Foil brings your clients, booking, formulas, follow-ups, and
            business insights together in one focused system designed to help
            independent hair professionals grow.
          </p>
        </div>

        <div className="mt-11 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {productPillars.map((card) => (
            <article
              key={card.title}
              className="flex overflow-hidden rounded-[14px] border border-[rgba(176,122,62,0.35)] bg-[#FFFDF8]/80 shadow-[0_18px_45px_rgba(80,52,25,0.08)]"
            >
              <div className="flex min-h-full w-full flex-col px-6 pb-0 pt-6 sm:px-7 sm:pt-7 lg:px-8 lg:pt-8">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-[rgba(176,122,62,0.30)] bg-[rgba(214,168,90,0.12)]">
                  <Image
                    src={card.icon}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 font-display text-[30px] font-bold leading-[1.02] tracking-normal text-[#111111]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#4F4A45]">
                  {card.body}
                </p>
                <div className="mt-6 h-px w-12 bg-[#B07A3E]" />
                <ul className="mt-6 grid gap-3">
                  {card.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[13px] font-bold leading-5 text-[#4F4A45]"
                    >
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-extrabold leading-none text-white"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex justify-center pt-8">
                  <Image
                    src={card.screenshot}
                    alt={card.alt}
                    width={1122}
                    height={1402}
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 34vw, 78vw"
                    className="h-auto max-h-[360px] w-auto object-contain sm:max-h-[380px] lg:max-h-[410px]"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyIcon({ type }: { type: (typeof philosophyItems)[number]["icon"] }) {
  const className = "h-6 w-6";

  if (type === "user") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 20c.8-4.1 3.3-6.2 7.5-6.2s6.7 2.1 7.5 6.2" />
      </svg>
    );
  }

  if (type === "sparkle") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
        <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
        <path d="m19 3 .6 2.1L22 6l-2.4.9L19 9l-.6-2.1L16 6l2.4-.9L19 3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path d="M20.8 4.9a5.2 5.2 0 0 0-7.4 0L12 6.3l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8.7a5.2 5.2 0 0 0 0-7.4Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-brand text-[11px] font-bold leading-none text-brand" aria-hidden="true">
      ✓
    </span>
  );
}

function PhilosophyMessage({ index }: { index: number }) {
  if (index === 0) {
    return (
      <>
        <h3 className="font-display text-[27px] font-bold leading-[1.05] text-[#111111] sm:text-[30px]">We chose to focus.</h3>
        <p className="mt-4 text-sm leading-7 text-[#4F4A45]">
          Root &amp; Foil is built specifically for independent hair professionals.
          <br />
          Not restaurants. Not gyms.
          <br />
          <span className="font-bold text-brand">Just yours.</span>
        </p>
      </>
    );
  }

  if (index === 1) {
    return (
      <>
        <h3 className="font-display text-[27px] font-bold leading-[1.05] text-[#111111] sm:text-[30px]">Every decision starts with you.</h3>
        <p className="mt-4 text-sm leading-7 text-[#4F4A45]">
          We build with one question in mind:{" "}
          <span className="font-bold text-brand">Will this make it easier to run and grow</span>{" "}
          an independent hair business?
        </p>
      </>
    );
  }

  return (
    <>
      <h3 className="font-display text-[27px] font-bold leading-[1.05] text-[#111111] sm:text-[30px]">Our best ideas aren&apos;t upgrades.</h3>
      <p className="mt-4 text-sm leading-7 text-[#4F4A45]">
        When Root &amp; Foil gets better, every member gets the{" "}
        <span className="font-bold text-brand">better</span> product.
      </p>
    </>
  );
}

function HomePricing({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [activePhilosophy, setActivePhilosophy] = useState(0);

  return (
    <section id="pricing" className="border-t border-[rgba(200,164,107,0.30)] bg-transparent px-5 py-20 text-[#111111] sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="font-display text-[38px] font-bold leading-[1.02] tracking-normal sm:text-[48px] lg:text-[56px]">
            Why Root &amp; Foil feels <span className="text-brand">different.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[780px] text-[15px] leading-7 text-[#4F4A45] sm:text-base">
            We chose to focus so we can build what independent hair professionals actually need and leave out the rest.
          </p>
        </div>

        <div className="mt-12 hidden lg:grid lg:grid-cols-3 lg:divide-x lg:divide-[rgba(200,164,107,0.38)]">
          {philosophyItems.map((item, index) => (
            <article key={item.label} className="px-10 text-center first:pl-0 last:pr-0">
              <div className="mx-auto grid h-[82px] w-[82px] place-items-center rounded-full border border-[rgba(176,122,62,0.12)] bg-[rgba(214,168,90,0.12)] text-brand">
                <PhilosophyIcon type={item.icon} />
              </div>
              <div className="mx-auto mt-6 max-w-[270px]">
                <PhilosophyMessage index={index} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-9 lg:hidden">
          <div className="grid grid-cols-3 overflow-hidden rounded-full border border-[rgba(176,122,62,0.38)] p-1" role="tablist" aria-label="Why Root & Foil feels different">
            {philosophyItems.map((item, index) => {
              const selected = activePhilosophy === index;
              return (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  id={`philosophy-tab-${index}`}
                  aria-selected={selected}
                  aria-controls="philosophy-panel"
                  onClick={() => setActivePhilosophy(index)}
                  className={`flex min-h-12 items-center justify-center gap-1 rounded-full px-1 text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 ${selected ? "border border-[rgba(176,122,62,0.32)] bg-[#FFFDF8] text-brand" : "text-[#4F4A45]"}`}
                >
                  <span className="shrink-0"><PhilosophyIcon type={item.icon} /></span>
                  <span className="leading-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

          <article id="philosophy-panel" role="tabpanel" aria-labelledby={`philosophy-tab-${activePhilosophy}`} className="mt-5 rounded-[20px] border border-[rgba(200,164,107,0.32)] bg-[#FFFDF8]/50 px-6 py-8 text-center sm:px-10">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[rgba(176,122,62,0.12)] bg-[rgba(214,168,90,0.12)] text-brand">
              <PhilosophyIcon type={philosophyItems[activePhilosophy].icon} />
            </div>
            <div className="mx-auto mt-5 max-w-[360px]">
              <PhilosophyMessage index={activePhilosophy} />
            </div>
            <div className="mt-6 flex justify-center gap-3" aria-label={`Showing ${philosophyItems[activePhilosophy].label}`}>
              {philosophyItems.map((item, index) => (
                <span key={item.label} className={`h-2 w-2 rounded-full ${index === activePhilosophy ? "bg-brand" : "bg-[#DDD6CF]"}`} aria-hidden="true" />
              ))}
            </div>
          </article>
        </div>

        <div className="mt-12 overflow-hidden rounded-[18px] border border-[rgba(200,164,107,0.48)] bg-[#FFFDF8]/75 sm:mt-16">
          <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
            <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
              <h2 className="font-display text-[34px] font-bold leading-[1.02] text-[#111111] sm:text-[42px]">One straightforward price.</h2>
              <div className="mt-6 flex items-end gap-2">
                <span className="font-display text-[68px] font-bold leading-none text-brand sm:text-[82px]">{MONTHLY_PRICE}</span>
                <span className="pb-2 text-base font-bold text-[#1F1A17]">/month</span>
              </div>
              <div className="mt-6 h-px w-36 bg-[rgba(200,164,107,0.62)]" />
              <ul className="mt-7 grid gap-4">
                {corePricingItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-[#4F4A45]">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[rgba(200,164,107,0.38)] px-6 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-12">
              <h3 className="max-w-[390px] font-display text-[28px] font-bold leading-[1.08] text-[#111111] sm:text-[34px]">Everything you need to run and grow your hair business.</h3>
              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-8">
                {includedFeatureColumns.map((column, columnIndex) => (
                  <ul key={columnIndex} className="grid content-start gap-4">
                    {column.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-[11px] font-medium leading-5 text-[#4F4A45] sm:gap-3 sm:text-sm">
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 pb-8 sm:px-10 sm:pb-10 lg:pb-12">
            <MarketingButton onClick={onJoinWaitlist} className="h-14 w-full !border-[#111111] !bg-[#111111] !px-8 !font-sans !text-base !text-white !shadow-none hover:!bg-[#2A2522] sm:mx-auto sm:w-[352px]">
              Join the waitlist
            </MarketingButton>
          </div>
        </div>
      </div>
    </section>
  );
}

type WaitlistErrors = {
  fullName?: string;
  email?: string;
  form?: string;
};

function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<WaitlistErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const validate = () => {
    const nextErrors: WaitlistErrors = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          source: "homepage_waitlist",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit waitlist request.");
      }

      setSubmitted(true);
    } catch {
      setErrors({
        form: "We couldn't join the waitlist right now. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-dvh items-start justify-center overflow-y-auto bg-[#111111]/62 px-3 py-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-[3px] sm:px-6 sm:py-6 lg:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={submitted ? "waitlist-success-title" : "waitlist-title"}
        className="relative w-full max-w-[940px] overflow-hidden rounded-[16px] border border-[rgba(214,168,90,0.50)] bg-[#FFFDF8] text-[#111111] shadow-[0_32px_95px_rgba(17,17,17,0.34)] sm:rounded-[22px] lg:my-auto"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="fixed right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-[60] grid h-11 w-11 place-items-center rounded-full border border-[rgba(176,122,62,0.24)] bg-[#FFFDF8]/95 text-2xl leading-none text-[#111111] shadow-[0_10px_30px_rgba(17,17,17,0.18)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand/35 sm:absolute sm:right-4 sm:top-4 sm:h-9 sm:w-9 sm:border-0 sm:bg-transparent sm:shadow-none sm:hover:bg-[#111111]/5"
          aria-label="Close waitlist form"
        >
          ×
        </button>

        {submitted ? (
          <WaitlistSuccessState />
        ) : (
          <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_8%,rgba(214,168,90,0.25),transparent_32%),linear-gradient(145deg,#FFFDF8_0%,#FAF7F2_100%)] px-5 pb-6 pt-14 sm:px-10 sm:py-9 lg:px-12 lg:py-12">
              <Image
                src="/assets/brand/root-and-foil-chair-mark.png"
                alt=""
                width={416}
                height={473}
                aria-hidden="true"
                className="h-9 w-auto object-contain sm:h-12"
              />
              <h2
                id="waitlist-title"
                className="mt-5 max-w-[360px] font-display text-[38px] font-bold leading-[0.95] tracking-normal text-[#111111] sm:mt-7 sm:text-[58px]"
              >
                Request{" "}
                <span className="text-[#B7793D]">early access</span>
              </h2>
              <p className="mt-4 max-w-[420px] text-sm leading-6 text-[#4F4A45] sm:mt-6 sm:text-[15px] sm:leading-7">
                Root & Foil is opening to a small group of independent stylists
                and barbers before public launch.
              </p>
              <p className="mt-3 max-w-[420px] text-sm font-bold leading-6 text-[#1C1C1E] sm:mt-4">
                Join the list and we&apos;ll reach out when we&apos;re ready.
              </p>

              <ul className="mt-5 grid gap-3 sm:mt-8 sm:gap-4">
                {[
                  "Built for independent stylists & barbers",
                  "Simple to use. Powerful results.",
                  "Be among the first to get access",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm font-bold leading-5 text-[#4F4A45] sm:items-center"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#D6A85A] bg-[#D6A85A]/15 text-sm leading-none text-[#B7793D]"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-px w-20 bg-[#D6A85A] sm:mt-9" />
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#B7793D] sm:mt-4">
                Thank you for your interest!
              </p>
            </div>

            <div className="relative overflow-hidden px-5 py-6 sm:px-10 sm:py-9 lg:px-12 lg:py-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(214,168,90,0.24),transparent_30%),linear-gradient(160deg,rgba(250,247,242,0.82),rgba(255,255,255,0.96))]" />
              <div className="relative">
                <form className="grid gap-4 sm:gap-5" onSubmit={handleSubmit} noValidate>
                  <WaitlistField
                    id="waitlist-full-name"
                    label="Full name"
                    value={fullName}
                    placeholder="Your full name"
                    autoComplete="name"
                    error={errors.fullName}
                    onChange={(value) => {
                      setFullName(value);
                      if (errors.fullName) {
                        setErrors((current) => ({
                          ...current,
                          fullName: undefined,
                        }));
                      }
                    }}
                  />
                  <WaitlistField
                    id="waitlist-email"
                    label="Email address"
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    autoComplete="email"
                    error={errors.email}
                    onChange={(value) => {
                      setEmail(value);
                      if (errors.email) {
                        setErrors((current) => ({
                          ...current,
                          email: undefined,
                        }));
                      }
                    }}
                  />

                  {errors.form ? (
                    <p className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                      {errors.form}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-[8px] border border-[rgba(138,85,40,0.65)] bg-gradient-to-b from-[#C98A44] via-[#B07A3E] to-[#A96A32] px-6 font-display text-sm font-semibold text-white shadow-[0_18px_38px_rgba(176,122,62,0.20)] transition hover:border-brand-dark hover:from-[#B97939] hover:to-[#996534] focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-[#FFFDF8] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? "Joining..." : "Join the waitlist"}
                  </button>

                  <p className="text-center text-xs leading-5 text-[#6B7280]">
                    We respect your privacy. We&apos;ll only use your email for
                    Root & Foil updates.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WaitlistField({
  id,
  label,
  value,
  placeholder,
  onChange,
  autoComplete,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  autoComplete: string;
  error?: string;
  type?: "text" | "email";
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1C1C1E]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-[8px] border border-[rgba(176,122,62,0.28)] bg-white px-4 text-sm text-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition placeholder:text-[#8A7E72] focus:border-[#B7793D] focus:ring-4 focus:ring-[#D6A85A]/20"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function WaitlistSuccessState() {
  return (
    <div className="relative grid min-h-[520px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(214,168,90,0.26),transparent_28%),linear-gradient(145deg,#FFFDF8_0%,#FAF7F2_100%)] px-7 py-14 text-center sm:px-10">
      <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#D6A85A]/12 blur-3xl" />
      <div className="relative mx-auto max-w-[430px]">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-[#B7793D] bg-white/60 text-4xl text-[#B7793D]">
          ✓
        </div>
        <h2
          id="waitlist-success-title"
          className="mt-8 font-display text-[44px] font-bold leading-none text-[#111111] sm:text-[54px]"
        >
          You&apos;re on the list!
        </h2>
        <p className="mx-auto mt-5 max-w-[320px] text-[15px] leading-7 text-[#4F4A45]">
          Thanks - we&apos;ll be in touch when early access to Root & Foil is ready.
        </p>
        <div
          aria-hidden="true"
          className="mx-auto mt-10 grid h-24 w-28 place-items-center rounded-[14px] border border-[#D6A85A] bg-white/45 text-5xl text-[#B7793D] shadow-[0_18px_45px_rgba(80,52,25,0.08)]"
        >
          ✉
        </div>
      </div>
    </div>
  );
}

function HomeFooter() {
  return (
    <footer className="border-t border-[rgba(200,164,107,0.30)] bg-[#FFFDF8]/55 px-5 py-10 text-[#111111] sm:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1.15fr_2fr_auto]">
        <div>
          <BrandLogo />
          <p className="mt-4 max-w-[280px] text-sm leading-6 text-[#4F4A45]">
            Built for independent beauty pros. Designed to help you grow.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#111111]">
                {group.title}
              </h3>
              <ul className="mt-3 grid gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-[#4F4A45] transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-sm font-semibold text-[#4F4A45] md:text-right">
          © 2026 Root & Foil
          <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);
  const closeWaitlist = () => setWaitlistOpen(false);

  return (
    <main className="min-h-screen bg-[#F6F1E8] text-[#111111]">
      <HomeHero onJoinWaitlist={openWaitlist} />
      <HomeProductPillars />
      <HomePricing onJoinWaitlist={openWaitlist} />
      <HomeFooter />
      <WaitlistModal open={waitlistOpen} onClose={closeWaitlist} />
    </main>
  );
}
