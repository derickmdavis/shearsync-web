import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const loginHref = "/login";
const signUpHref = "/login?mode=sign-up";

const productPillars = [
  {
    icon: "/assets/icons/icon-calendar-bronze.svg",
    title: "Stay booked.",
    body: "Simple, reliable booking tools that make it easy for clients to schedule, reschedule, and return.",
    bullets: [
      "Online booking that’s always open",
      "Automated reminders that reduce no-shows",
      "Waitlist support to fill last-minute openings",
    ],
    screenshot: "/assets/home/dripdesk-phone-calendar.png",
    alt: "DripDesk calendar screen showing appointments, open time, and booking controls",
  },
  {
    icon: "/assets/icons/icon-client-bronze.svg",
    title: "Remember every client.",
    body: "Keep every detail that matters so you can personalize every visit and build lasting relationships.",
    bullets: [
      "Notes, preferences, and service history",
      "Before & after photos in one place",
      "Quick access to past appointments and spend",
    ],
    screenshot: "/assets/home/dripdesk-phone-clients.png",
    alt: "DripDesk clients screen showing client list, notes, and client history",
  },
  {
    icon: "/assets/icons/icon-analytics-bronze.svg",
    title: "Know what’s working.",
    body: "Understand your numbers, client behavior, and trends so you can make smarter decisions and grow with confidence.",
    bullets: [
      "Revenue, rebooking rate, and client retention",
      "Average ticket, top services, and add-ons",
      "Trends and insights to guide your next move",
    ],
    screenshot: "/assets/home/dripdesk-phone-insights.png",
    alt: "DripDesk dashboard screen showing business snapshot and revenue insights",
  },
];

const pricingPlans = [
  { name: "Basic", price: "$12", period: "/ month" },
  { name: "Pro", price: "$25", period: "/ month", popular: true },
  { name: "Premium", price: "$35", period: "/ month" },
];

const comparisonRows = [
  {
    feature: "Online booking",
    basic: "yes",
    pro: "yes",
    premium: "yes",
  },
  {
    feature: "Client notes & history",
    basic: "Unlimited clients",
    pro: "Unlimited clients",
    premium: "Unlimited clients",
  },
  {
    feature: "Appointment reminders",
    basic: "yes",
    pro: "yes",
    premium: "yes",
  },
  {
    feature: "Import from GlossGenius / Booksy / Fresha / Vagaro / StyleSeat / Square",
    basic: "yes",
    pro: "yes",
    premium: "yes",
  },
  {
    feature: "Full client history",
    basic: "yes",
    pro: "yes",
    premium: "yes",
  },
  {
    feature: "Service limit",
    basic: "7 services",
    pro: "Unlimited services",
    premium: "Unlimited services",
  },
  {
    feature: "Waitlist",
    basic: "no",
    pro: "yes",
    premium: "yes",
  },
  {
    feature: "QR booking code",
    basic: "no",
    pro: "yes",
    premium: "yes",
  },
  {
    feature: "Advanced metrics",
    basic: "no",
    pro: "yes",
    premium: "yes",
  },
  {
    feature: "Weekly business recap email",
    basic: "no",
    pro: "no",
    premium: "yes",
  },
  {
    feature: "Apple / Google Calendar integration",
    basic: "no",
    pro: "no",
    premium: "yes",
  },
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
        "inline-flex h-11 items-center justify-center rounded-[8px] px-6 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-[#F6F1E8]",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="#top"
      className="flex shrink-0 items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-brand/35"
      aria-label="DripDesk"
    >
      <Image
        src="/assets/brand/dripdesk-chair-mark.png"
        alt=""
        width={416}
        height={473}
        priority
        aria-hidden="true"
        className="h-8 w-auto object-contain"
      />
      <span
        className={[
          "font-display text-[28px] font-semibold sm:text-[31px]",
          light ? "text-white" : "text-[#111111]",
        ].join(" ")}
      >
        DripDesk
      </span>
    </Link>
  );
}

function HomeNav() {
  return (
    <nav
      className="relative z-20 mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-4 px-5 py-5 sm:h-[76px] sm:flex-row sm:items-center sm:px-8 sm:py-0"
      aria-label="Primary"
    >
      <BrandLogo />

      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-6">
        <Link
          href="#top"
          className="text-xs font-extrabold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm"
        >
          About
        </Link>
        <Link
          href="#pricing"
          className="text-xs font-extrabold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm"
        >
          Pricing
        </Link>
        <Link
          href={loginHref}
          className="text-xs font-extrabold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm"
        >
          Login
        </Link>
        <MarketingLink
          href={signUpHref}
          variant="nav"
          className="h-9 px-4 text-xs sm:h-10 sm:px-5 sm:text-sm"
        >
          Let&apos;s Start
        </MarketingLink>
      </div>
    </nav>
  );
}

function HomeHero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#F6F1E8] text-[#111111]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(232,211,163,0.42)_0%,rgba(232,211,163,0.12)_28%,transparent_54%),radial-gradient(circle_at_92%_18%,rgba(214,187,133,0.35)_0%,rgba(214,187,133,0.10)_34%,transparent_62%),linear-gradient(135deg,#F6F1E8_0%,#FFF8E8_48%,#F6F1E8_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.32)_44%,transparent_56%),linear-gradient(300deg,transparent_0%,rgba(200,164,107,0.12)_42%,transparent_65%)] opacity-60" />
      <HomeNav />

      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-8 px-5 pb-12 pt-7 sm:px-8 lg:min-h-[610px] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:pb-0 lg:pt-0">
        <div className="max-w-[560px]">
          <p className="inline-flex items-center gap-2 rounded-[4px] border border-[#C8A46B] bg-[#FFFDF8]/35 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.07em] text-brand sm:whitespace-nowrap">
            Designed for independent stylists and barbers
          </p>

          <h1 className="mt-6 max-w-[530px] font-display text-[54px] font-bold leading-[0.9] tracking-normal text-[#111111] sm:text-[72px] lg:text-[78px]">
            The business
            <br />
            side of beauty.
          </h1>

          <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-[#4F4A45] sm:text-[17px]">
            Stop chasing appointments. Stop losing clients between visits.
            DripDesk helps you remember every client and keep them coming back.
          </p>

          <p className="mt-7 flex max-w-[560px] items-center gap-3 text-xs font-bold leading-5 text-[#4F4A45] sm:text-[13px]">
            <span className="sm:whitespace-nowrap">
              Seamless booking. Automated growth. Smart business insights.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MarketingLink href={signUpHref} className="w-full sm:w-auto">
              Get Started
            </MarketingLink>
            <MarketingLink
              href="#pricing"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              View Plans
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
      id="features"
      className="border-t border-[rgba(200,164,107,0.30)] bg-transparent px-5 py-20 text-[#111111] sm:px-8 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="font-display text-[38px] font-bold leading-[1.02] tracking-normal sm:text-[48px] lg:text-[56px]">
            Everything behind your chair,
            <br />
            finally in one place.
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-[#4F4A45] sm:text-base">
            DripDesk helps you stay booked, remember every client detail, and understand what your chair is earning without juggling texts, notes, screenshots, or spreadsheets.
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

function FeatureValue({ value }: { value: string }) {
  if (value === "yes") {
    return <span className="text-lg font-extrabold text-brand">✓</span>;
  }

  if (value === "no") {
    return <span className="text-lg font-bold text-[#8A7E72]">—</span>;
  }

  return <span className="text-xs font-bold text-[#1F1A17]">{value}</span>;
}

function HomePricing() {
  return (
    <section
      id="pricing"
      className="bg-transparent px-5 py-10 text-[#111111] sm:px-8 sm:py-14"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8">
        <div className="mx-auto max-w-[920px] text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand">
            Compare plans
          </p>
          <h2 className="mt-4 whitespace-nowrap font-display text-[clamp(25px,5vw,46px)] font-bold leading-[1.02] tracking-normal">
            Find the plan that fits your business.
          </h2>
          <p className="mx-auto mt-5 max-w-[440px] text-sm leading-7 text-[#6B625A]">
            Simple pricing. Powerful features. Built for how you work.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[8px] border border-[rgba(200,164,107,0.42)] bg-[#FFFDF8]/80 shadow-[0_18px_45px_rgba(80,52,25,0.08)]">
          <table className="min-w-[760px] table-fixed border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[30%] border-b border-[rgba(200,164,107,0.42)] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[#6B625A]">
                  Feature
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.name}
                    className={[
                      "relative border-b border-l border-[rgba(200,164,107,0.42)] px-4 py-3 text-center",
                      plan.popular ? "bg-brand/10" : "bg-[#FFFDF8]/70",
                    ].join(" ")}
                  >
                    {plan.popular ? (
                      <div className="absolute inset-x-0 -top-px bg-brand py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
                        Most Popular
                      </div>
                    ) : null}
                    <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[#111111]">
                      {plan.name}
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-[#111111]">
                      {plan.price}
                      <span className="ml-1 text-xs font-bold text-[#6B625A]">
                        {plan.period}
                      </span>
                    </p>
                    {/* TODO: Route to plan-specific signup when plan selection exists. */}
                    <Link
                      href={signUpHref}
                      className={[
                        "mt-3 inline-flex h-8 items-center justify-center rounded-[8px] border px-3 text-[11px] font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35",
                        plan.popular
                          ? "border-brand bg-brand text-white hover:bg-brand-dark"
                          : "border-brand/70 text-brand hover:bg-brand hover:text-white",
                      ].join(" ")}
                    >
                      Get Started
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th className="border-t border-[rgba(200,164,107,0.42)] px-4 py-2.5 text-xs font-bold text-[#1F1A17]">
                    {row.feature}
                  </th>
                  <td className="border-l border-t border-[rgba(200,164,107,0.42)] px-4 py-2.5 text-center">
                    <FeatureValue value={row.basic} />
                  </td>
                  <td className="border-l border-t border-[rgba(200,164,107,0.42)] bg-brand/10 px-4 py-2.5 text-center">
                    <FeatureValue value={row.pro} />
                  </td>
                  <td className="border-l border-t border-[rgba(200,164,107,0.42)] px-4 py-2.5 text-center">
                    <FeatureValue value={row.premium} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function HomeFinalCta() {
  return (
    <section className="bg-transparent px-5 pb-14 pt-2 text-[#111111] sm:px-8 sm:pb-16">
      <div className="mx-auto flex max-w-[980px] flex-col gap-6 rounded-[8px] border border-[rgba(200,164,107,0.45)] bg-[#FFFDF8]/75 px-6 py-7 text-[#111111] shadow-[0_18px_45px_rgba(80,52,25,0.08)] sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <h2 className="font-display text-[28px] font-bold leading-tight tracking-normal text-[#111111] sm:text-[34px]">
            Ready to run your business like a pro?
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#4F4A45]">
            The business side of beauty.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <MarketingLink href={signUpHref} className="w-full sm:w-auto">
            Get Started
          </MarketingLink>
          <Link
            href="#pricing"
            className="inline-flex h-11 w-full items-center justify-center rounded-[8px] border border-[#B07A3E] bg-transparent px-6 text-sm font-extrabold text-[#4A3728] transition-colors hover:bg-[rgba(200,164,107,0.10)] focus:outline-none focus:ring-2 focus:ring-brand-gold/35 focus:ring-offset-2 focus:ring-offset-[#FFFDF8] sm:w-auto"
          >
            View Plans
          </Link>
        </div>
      </div>
    </section>
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
          © 2026 DripDesk
          <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F6F1E8] text-[#111111]">
      <HomeHero />
      <HomeProductPillars />
      <HomePricing />
      <HomeFinalCta />
      <HomeFooter />
    </main>
  );
}
