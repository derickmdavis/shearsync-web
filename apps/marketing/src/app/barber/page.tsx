"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { getWebAppUrl } from "@/src/lib/urls";

const loginHref = getWebAppUrl("/login");
const signUpHref = getWebAppUrl("/login?mode=sign-up");

const MONTHLY_PRICE = "$25";

const barberValueCards = [
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
  { label: "Tailored", icon: "sparkle" },
  { label: "Included", icon: "heart" },
] as const;

const corePricingItems = ["Every feature included", "No tiers, no add-ons", "Cancel anytime"];

const includedFeatureColumns = [
  ["Online booking & custom rules", "Waitlist", "Client profiles & history", "Formula notes & photos", "Automated follow-ups", "SMS Appt. reminders"],
  ["Business insights & reporting", "Rebooking nudges", "Referral tracking", "Calendar sync", "Custom email campaigns", "And more"],
];

const commandBullets = [
  "Stay organized and look more professional",
  "Save time by automating the busy work",
  "Manage clients and build loyalty",
  "Track your income and grow with confidence",
];

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#top" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

function BarberButton({
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
      "border border-brand bg-gradient-to-b from-[#C9823F] to-brand text-white shadow-[0_18px_42px_rgba(183,121,61,0.22)] hover:border-brand-gold hover:from-brand-gold hover:to-brand",
    secondary:
      "border border-brand/80 bg-transparent text-white hover:border-brand-gold hover:bg-brand/12",
    nav: "border border-brand bg-gradient-to-b from-[#C9823F] to-brand text-white hover:border-brand-gold hover:from-brand-gold hover:to-brand",
  };

  return (
    <Link
      href={href}
      className={[
        "inline-flex h-11 items-center justify-center rounded-[8px] px-6 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/45 focus:ring-offset-2 focus:ring-offset-[#111111]",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function BarberLogo() {
  return (
    <Link
      href="#top"
      className="shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
      aria-label="Root & Foil"
    >
      <Image
        src="/assets/brand/root-and-foil-dark-logo.png"
        alt="Root & Foil"
        width={1137}
        height={1132}
        priority
        className="h-11 w-auto object-contain mix-blend-screen sm:h-12"
      />
    </Link>
  );
}

function BarberNav() {
  return (
    <nav
      className="relative z-20 mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-4 px-5 py-5 sm:h-[76px] sm:flex-row sm:items-center sm:px-8 sm:py-0"
      aria-label="Primary"
    >
      <BarberLogo />

      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-6">
        <Link
          href="#features"
          className="text-xs font-extrabold text-white/84 transition-colors hover:text-brand-gold sm:text-sm"
        >
          Product
        </Link>
        <Link
          href="#pricing"
          className="text-xs font-extrabold text-white/84 transition-colors hover:text-brand-gold sm:text-sm"
        >
          Pricing
        </Link>
        <Link
          href={loginHref}
          className="text-xs font-extrabold text-white/84 transition-colors hover:text-brand-gold sm:text-sm"
        >
          Login
        </Link>
        <BarberButton
          href={signUpHref}
          variant="nav"
          className="h-9 px-4 text-xs sm:h-10 sm:px-5 sm:text-sm"
        >
          Join Waitlist
        </BarberButton>
      </div>
    </nav>
  );
}

function PhoneScreenshot({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative mx-auto aspect-[1122/1402] w-full max-w-[245px] drop-shadow-[0_24px_42px_rgba(17,17,17,0.16)]",
        className,
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="245px"
        className="object-contain"
      />
    </div>
  );
}

function BarberHero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#111111] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(214,168,90,0.2),transparent_28%),linear-gradient(110deg,#050505_0%,#111111_44%,#1C1C1E_100%)]" />
      <BarberNav />

      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-8 px-5 pb-12 pt-7 sm:px-8 lg:min-h-[610px] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:pb-0 lg:pt-0">
        <div className="max-w-[640px]">
          <p className="inline-flex items-center gap-2 rounded-[4px] border border-brand/80 bg-black/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#FAF7F2]">
            DESIGNED FOR INDEPENDENT STYLISTS AND BARBERS
          </p>

          <h1 className="mt-6 max-w-[530px] font-display text-[54px] font-bold leading-[0.9] tracking-normal text-[#FAF7F2] sm:text-[72px] lg:text-[78px]">
            Growth starts at the roots.
          </h1>

          <h2 className="mt-5 max-w-[520px] whitespace-nowrap font-display text-[clamp(16px,4.8vw,28px)] font-bold leading-tight tracking-[-0.01em] text-brand-gold sm:text-[32px]">
            The business side of barbering
          </h2>

          <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-white/76 sm:text-[17px]">
            Root &amp; Foil helps you stay booked, remember every client detail, and
            understand your business. Built only for independent hair
            professionals, Root &amp; Foil gives you the tools you need without the
            complexity you don&apos;t, at a price that makes sense.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BarberButton href={signUpHref} className="w-full sm:w-auto">
              Join Waitlist
            </BarberButton>
            <BarberButton
              href="#features"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              See What&apos;s Included
            </BarberButton>
          </div>

        </div>

        <div className="relative -mr-5 min-h-[390px] sm:-mr-8 sm:min-h-[500px] lg:-mr-[calc((100vw-1180px)/2)] lg:h-[610px] lg:min-h-0 lg:self-end">
          {/* TODO: Replace with final barber hero image asset. */}
          <Image
            src="/assets/home/hero-barber-standing.webp"
            alt="Barber in a dark barbershop using a tablet"
            fill
            priority
            sizes="(min-width: 1180px) 660px, (min-width: 1024px) 56vw, 100vw"
            className="object-cover object-[72%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#111111_0%,rgba(17,17,17,0.82)_18%,rgba(17,17,17,0.16)_58%,rgba(17,17,17,0.5)_100%),linear-gradient(180deg,rgba(17,17,17,0.1)_0%,#111111_100%)]" />
        </div>
      </div>
    </section>
  );
}

function BarberValueCards() {
  return (
    <section
      id="features"
      className="border-t border-brand/20 bg-[#111111] px-5 py-20 text-white sm:px-8 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="whitespace-nowrap font-display text-[clamp(19px,6vw,38px)] font-bold leading-[1.02] tracking-[-0.01em] text-[#FAF7F2] sm:text-[48px] lg:text-[56px]">
            Everything you need to grow.
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-white/66 sm:text-base">
            Root &amp; Foil brings your clients, booking, formulas, follow-ups, and
            business insights together in one focused system designed to help
            independent hair professionals grow.
          </p>
        </div>

        <div className="mt-11 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {barberValueCards.map((card) => (
            <article
              key={card.icon}
              className="flex overflow-hidden rounded-[14px] border border-brand/35 bg-[#141414] shadow-[0_22px_44px_rgba(0,0,0,0.22)]"
            >
              <div className="flex min-h-full w-full flex-col px-6 pb-0 pt-6 sm:px-7 sm:pt-7 lg:px-8 lg:pt-8">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-brand/50 bg-brand/10">
                  <Image src={card.icon} alt="" width={24} height={24} aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-[30px] font-bold leading-[1.02] tracking-normal text-[#FAF7F2]">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/64">{card.body}</p>
                <div className="mt-6 h-px w-12 bg-brand-gold" />
                <ul className="mt-6 grid gap-3">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[13px] font-bold leading-5 text-white/72">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-extrabold leading-none text-white" aria-hidden="true">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex justify-center pt-8">
                  <Image src={card.screenshot} alt={card.alt} width={1122} height={1402} sizes="(min-width: 1024px) 300px, (min-width: 768px) 34vw, 78vw" className="h-auto max-h-[360px] w-auto object-contain sm:max-h-[380px] lg:max-h-[410px]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BarberCommandCenter() {
  return (
    <section className="overflow-hidden border-t border-[#E4D6C3]/55 bg-[#FFFDF8] px-5 py-10 text-[#111111] sm:px-8 sm:py-14">
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.66fr_1.34fr] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand">
            All-in-one business hub
          </p>
          <h2 className="mt-4 font-display text-[38px] font-bold leading-[1] tracking-normal text-[#111111] sm:text-[48px]">
            A cleaner command
            <br />
            center for your chair.
          </h2>
          <p className="mt-5 max-w-[400px] text-[15px] leading-7 text-[#6B7280]">
            Stop juggling apps, texts, and screenshots. DripDesk gives you
            everything you need to run your business &mdash; in one simple
            place.
          </p>

          <ul className="mt-7 grid gap-3">
            {commandBullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[13px] font-bold text-[#1C1C1E]">
                <Image
                  src="/assets/icons/icon-check-bronze.svg"
                  alt=""
                  width={22}
                  height={22}
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-end sm:gap-0">
          <PhoneScreenshot
            src="/assets/home/barber-activity-iphone.png"
            alt="DripDesk activity screen shown on an iPhone"
            className="sm:-ml-0 lg:translate-y-8"
          />

          <PhoneScreenshot
            src="/assets/home/barber-insights-iphone.png"
            alt="DripDesk insights screen shown on an iPhone"
            className="sm:-ml-8 lg:z-10"
          />

          <PhoneScreenshot
            src="/assets/home/barber-clients-iphone.png"
            alt="DripDesk clients screen shown on an iPhone"
            className="sm:-ml-8 lg:translate-y-8"
          />
        </div>
      </div>
    </section>
  );
}

function BarberPricing() {
  const [active, setActive] = useState(0);
  const messages = [
    <><h3>We chose to focus.</h3><p>Root &amp; Foil is built specifically for independent hair professionals. Not nail techs. Not med spas. Not gyms. <strong>Just yours.</strong></p></>,
    <><h3>Every decision starts with you.</h3><p>We build with one question in mind: <strong>Will this make it easier to run and grow</strong> an independent hair business?</p></>,
    <><h3>Our best ideas aren&apos;t upgrades.</h3><p>When Root &amp; Foil gets better, every member gets the <strong>better</strong> product.</p></>,
  ];
  return (
    <section id="pricing" className="border-t border-brand/20 bg-[#111111] px-5 py-20 text-white sm:px-8 sm:py-24 lg:py-28"><div className="mx-auto max-w-[1180px]">
      <div className="mx-auto max-w-[860px] text-center"><h2 className="font-display text-[38px] font-bold leading-[1.02] text-[#FAF7F2] sm:text-[48px] lg:text-[56px]">Why Root &amp; Foil feels <span className="text-brand-gold">different.</span></h2><p className="mx-auto mt-5 max-w-[780px] text-[15px] leading-7 text-white/66 sm:text-base">We chose to focus so we can build what independent hair professionals actually need and leave out the rest.</p></div>
      <div className="mt-12 hidden lg:grid lg:grid-cols-3 lg:divide-x lg:divide-brand/35">{messages.map((message,index)=><article key={index} className="px-10 text-center first:pl-0 last:pr-0"><div className="mx-auto grid h-[82px] w-[82px] place-items-center rounded-full border border-brand/25 bg-brand/10 text-3xl text-brand-gold">{["♙","✦","♡"][index]}</div><div className="mx-auto mt-6 max-w-[270px] [&_h3]:font-display [&_h3]:text-[27px] [&_h3]:font-bold [&_h3]:text-[#FAF7F2] [&_p]:mt-4 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-white/66 [&_strong]:text-brand-gold">{message}</div></article>)}</div>
      <div className="mt-9 lg:hidden"><div className="grid grid-cols-3 rounded-full border border-brand/45 p-1" role="tablist">{philosophyItems.map((item,index)=><button key={item.label} type="button" role="tab" aria-selected={active===index} onClick={()=>setActive(index)} className={`min-h-12 rounded-full px-1 text-[10px] font-semibold whitespace-nowrap ${active===index?"border border-brand/45 bg-[#1C1C1E] text-brand-gold":"text-white/72"}`}>{item.label}</button>)}</div><article className="mt-5 rounded-[20px] border border-brand/30 bg-[#141414] px-6 py-8 text-center [&_h3]:font-display [&_h3]:text-[27px] [&_h3]:font-bold [&_h3]:text-[#FAF7F2] [&_p]:mt-4 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-white/66 [&_strong]:text-brand-gold">{messages[active]}<div className="mt-6 flex justify-center gap-3">{philosophyItems.map((item,index)=><span key={item.label} className={`h-2 w-2 rounded-full ${index===active?"bg-brand-gold":"bg-white/20"}`}/>)}</div></article></div>
      <div className="mt-12 overflow-hidden rounded-[18px] border border-brand/45 bg-[#141414] sm:mt-16"><div className="grid lg:grid-cols-[0.86fr_1.14fr]"><div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12"><h2 className="whitespace-nowrap font-display text-[clamp(26px,7.5vw,34px)] font-bold text-[#FAF7F2] sm:text-[42px]">One straightforward price.</h2><div className="mt-6 flex items-end gap-2"><span className="font-display text-[68px] font-bold leading-none text-brand-gold sm:text-[82px]">{MONTHLY_PRICE}</span><span className="pb-2 font-bold">/month</span></div><div className="mt-6 h-px w-36 bg-brand/70"/><ul className="mt-7 grid gap-4">{corePricingItems.map(item=><li key={item} className="flex gap-3 text-sm text-white/74"><span className="text-brand-gold">✓</span>{item}</li>)}</ul></div><div className="border-t border-brand/30 px-6 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-12"><h3 className="font-display text-[28px] font-bold text-[#FAF7F2] sm:text-[34px]">The tools that help your business grow.</h3><div className="mt-7 grid grid-cols-2 gap-x-4 sm:gap-x-8">{includedFeatureColumns.map((column,i)=><ul key={i} className="grid content-start gap-4">{column.map(feature=><li key={feature} className="flex gap-2 text-[11px] leading-5 text-white/72 sm:text-sm"><span className="text-brand-gold">✓</span>{feature}</li>)}</ul>)}</div></div></div><div className="px-6 pb-8 sm:px-10 sm:pb-10 lg:pb-12"><BarberButton href={signUpHref} className="h-14 w-full !border-black !bg-black !text-base !text-white hover:!bg-[#2A2522] sm:mx-auto sm:w-[352px]">Join the waitlist</BarberButton></div></div>
    </div></section>
  );
}

function BarberFinalCta() {
  return (
    <section className="bg-[#111111] px-5 pb-14 pt-2 text-white sm:px-8 sm:pb-16">
      <div className="mx-auto flex max-w-[1060px] flex-col gap-6 rounded-[8px] border border-brand/45 bg-[#141414] px-6 py-7 shadow-[0_20px_46px_rgba(0,0,0,0.24)] sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-center gap-5">
          <span className="hidden h-16 w-9 rounded-full border border-brand/70 sm:block" />
          <div>
            <h2 className="font-display text-[28px] font-bold leading-tight tracking-normal text-[#FAF7F2] sm:text-[34px]">
              Ready to run your business like a pro?
            </h2>
            <p className="mt-2 text-sm leading-7 text-white/64">
              More bookings. Less stress. Real results.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <BarberButton href={signUpHref} className="w-full sm:w-auto">
            Get Started
          </BarberButton>
          <BarberButton
            href="#pricing"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            View Plans
          </BarberButton>
        </div>
      </div>
    </section>
  );
}

function BarberFooter() {
  return (
    <footer className="border-t border-brand/20 bg-[#050505] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1.15fr_2fr_auto]">
        <div>
          <BarberLogo />
          <p className="mt-4 max-w-[280px] text-sm leading-6 text-white/58">
            Built for independent beauty pros. Designed to help you grow.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#FAF7F2]">
                {group.title}
              </h3>
              <ul className="mt-3 grid gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-white/56 transition-colors hover:text-brand-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-sm font-semibold text-white/54 md:text-right">
          &copy; 2026 Root &amp; Foil
          <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function BarberLandingPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <BarberHero />
      <BarberValueCards />
      <BarberPricing />
      <BarberFooter />
    </main>
  );
}
