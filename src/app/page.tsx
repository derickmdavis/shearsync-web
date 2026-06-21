import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const loginHref = "/login";
const signUpHref = "/login?mode=sign-up";

const valueCards = [
  {
    icon: "/assets/icons/icon-calendar-bronze.svg",
    title: <>Stay booked.</>,
    body: "Simple, reliable booking that makes it easy for clients to schedule and return.",
  },
  {
    icon: "/assets/icons/icon-client-bronze.svg",
    title: <>Grow automatically.</>,
    body: "Automated reminders, rebooking prompts, and waitlist management help fill your calendar without manual follow-up.",
  },
  {
    icon: "/assets/icons/icon-analytics-bronze.svg",
    title: <>Know what&apos;s working.</>,
    body: "Clear insights into revenue, retention, client behavior, and booking trends so you can make smarter decisions.",
  },
];

const commandBullets = [
  "Stay organized and look more professional",
  "Save time by automating the busy work",
  "Manage clients and build loyalty",
  "Track your income and grow with confidence",
];

const phoneScreens = [
  {
    src: "/assets/home/dripdesk-phone-calendar.png",
    alt: "DripDesk mobile calendar screen showing appointments and open booking gaps",
    className: "lg:translate-y-8",
  },
  {
    src: "/assets/home/dripdesk-phone-insights.png",
    alt: "DripDesk mobile insights dashboard showing business snapshot metrics",
    className: "lg:z-10",
  },
  {
    src: "/assets/home/dripdesk-phone-clients.png",
    alt: "DripDesk mobile clients screen showing client history and upcoming visits",
    className: "lg:translate-y-8",
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
      "border border-brand bg-gradient-to-b from-[#C9823F] to-brand text-white shadow-[0_18px_38px_rgba(183,121,61,0.24)] hover:border-brand-dark hover:from-brand-dark hover:to-brand-dark",
    secondary:
      "border border-brand/80 bg-transparent text-brand hover:bg-brand hover:text-white",
    nav: "border border-brand bg-gradient-to-b from-[#C9823F] to-brand text-white hover:border-brand-dark hover:from-brand-dark hover:to-brand-dark",
  };

  return (
    <Link
      href={href}
      className={[
        "inline-flex h-11 items-center justify-center rounded-[8px] px-6 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-[#FAF7F2]",
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
          className="text-xs font-extrabold text-[#111111] transition-colors hover:text-brand sm:text-sm"
        >
          About
        </Link>
        <Link
          href="#pricing"
          className="text-xs font-extrabold text-[#111111] transition-colors hover:text-brand sm:text-sm"
        >
          Pricing
        </Link>
        <Link
          href={loginHref}
          className="text-xs font-extrabold text-[#111111] transition-colors hover:text-brand sm:text-sm"
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
      className="relative isolate overflow-hidden bg-[#FFFDF8] text-[#111111]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,168,90,0.13),transparent_30%),linear-gradient(100deg,#FFFDF8_0%,#FAF7F2_48%,#FFFDF8_100%)]" />
      <HomeNav />

      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-8 px-5 pb-12 pt-7 sm:px-8 lg:min-h-[610px] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:pb-0 lg:pt-0">
        <div className="max-w-[560px]">
          <p className="inline-flex items-center gap-2 rounded-[4px] border border-brand/60 bg-white/55 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.07em] text-brand sm:whitespace-nowrap">
            <span className="h-1.5 w-1.5 rotate-45 bg-brand" />
            Designed for stylists, barbers, and independent booth renters
          </p>

          <h1 className="mt-6 max-w-[530px] font-display text-[54px] font-bold leading-[0.9] tracking-normal text-[#111111] sm:text-[72px] lg:text-[78px]">
            The business
            <br />
            side of beauty.
          </h1>

          <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-[#1C1C1E]/78 sm:text-[17px]">
            Stop chasing appointments. Stop losing clients between visits.
            DripDesk helps you remember every client and keep them coming back.
          </p>

          <p className="mt-7 flex max-w-[560px] items-center gap-3 text-xs font-bold leading-5 text-[#1C1C1E]/78 sm:text-[13px]">
            <span className="relative h-5 w-5 shrink-0 rotate-45 border border-brand after:absolute after:left-1/2 after:top-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-brand" />
            <span className="sm:whitespace-nowrap">
              Seamless booking, automated growth, and smart business insights.
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
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#FFFDF8] via-[#FFFDF8]/72 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function HomeValueCards() {
  return (
    <section
      id="features"
      className="border-t border-[#E4D6C3]/55 bg-[#FFFDF8] px-5 py-14 text-[#111111] sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[840px] text-center">
          <h2 className="font-display text-[30px] font-bold leading-[1.08] tracking-normal sm:text-[40px]">
            Tools that solve real problems, so you can stay booked and stress
            less.
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-7 text-[#6B7280]">
            DripDesk helps you stay booked, remember every client detail, and
            understand what your chair is earning without juggling texts, notes,
            screenshots, or spreadsheets.
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-[900px] gap-5 lg:grid-cols-3">
          {valueCards.map((card) => (
            <article
              key={card.icon}
              className="rounded-[8px] border border-[#E4D6C3] bg-white p-6 shadow-[0_18px_42px_rgba(17,17,17,0.04)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full border border-brand/25 bg-brand/10">
                <Image
                  src={card.icon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 text-xl font-extrabold leading-7 text-[#111111]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                {card.body}
              </p>
              <Link
                href="#pricing"
                className="mt-6 inline-flex text-sm font-extrabold text-brand hover:text-brand-dark"
              >
                Learn more <span aria-hidden="true" className="ml-2">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCommandCenter() {
  return (
    <section className="overflow-hidden bg-[#FFFDF8] px-5 py-10 text-[#111111] sm:px-8 sm:py-14">
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
          <p className="mt-5 max-w-[400px] text-[15px] leading-7 text-[#1C1C1E]/74">
            Stop juggling apps, texts, and screenshots. DripDesk gives you
            everything you need to run your business &mdash; in one simple
            place.
          </p>

          <ul className="mt-7 grid gap-3">
            {commandBullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 text-[13px] font-bold text-[#1C1C1E]/84"
              >
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
          {phoneScreens.map((screen) => (
            <div
              key={screen.src}
              className={[
                "relative mx-auto w-full max-w-[250px] drop-shadow-[0_22px_34px_rgba(17,17,17,0.14)] sm:-ml-8 sm:max-w-[255px] first:sm:ml-0 lg:max-w-[275px]",
                screen.className,
              ].join(" ")}
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                width={1122}
                height={1402}
                sizes="(min-width: 1024px) 250px, (min-width: 640px) 30vw, 260px"
                className="h-auto w-full"
              />
            </div>
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
    return <span className="text-lg font-bold text-[#9CA3AF]">—</span>;
  }

  return <span className="text-xs font-bold text-[#1C1C1E]">{value}</span>;
}

function HomePricing() {
  return (
    <section
      id="pricing"
      className="bg-[#FFFDF8] px-5 py-10 text-[#111111] sm:px-8 sm:py-14"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8">
        <div className="mx-auto max-w-[920px] text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand">
            Compare plans
          </p>
          <h2 className="mt-4 whitespace-nowrap font-display text-[clamp(25px,5vw,46px)] font-bold leading-[1.02] tracking-normal">
            Find the plan that fits your business.
          </h2>
          <p className="mx-auto mt-5 max-w-[440px] text-sm leading-7 text-[#6B7280]">
            Simple pricing. Powerful features. Built for how you work.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[8px] border border-[#E4D6C3] bg-white shadow-[0_16px_38px_rgba(17,17,17,0.04)]">
          <table className="min-w-[760px] table-fixed border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[30%] border-b border-[#E4D6C3] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[#6B7280]">
                  Feature
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.name}
                    className={[
                      "relative border-b border-l border-[#E4D6C3] px-4 py-3 text-center",
                      plan.popular ? "bg-brand/10" : "bg-white",
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
                      <span className="ml-1 text-xs font-bold text-[#6B7280]">
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
                  <th className="border-t border-[#E4D6C3] px-4 py-2.5 text-xs font-bold text-[#1C1C1E]">
                    {row.feature}
                  </th>
                  <td className="border-l border-t border-[#E4D6C3] px-4 py-2.5 text-center">
                    <FeatureValue value={row.basic} />
                  </td>
                  <td className="border-l border-t border-[#E4D6C3] bg-brand/10 px-4 py-2.5 text-center">
                    <FeatureValue value={row.pro} />
                  </td>
                  <td className="border-l border-t border-[#E4D6C3] px-4 py-2.5 text-center">
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
    <section className="bg-[#FFFDF8] px-5 pb-14 pt-2 text-[#111111] sm:px-8 sm:pb-16">
      <div className="mx-auto flex max-w-[980px] flex-col gap-6 rounded-[8px] border border-brand/35 bg-[#111111] px-6 py-7 text-white shadow-[0_22px_52px_rgba(17,17,17,0.18)] sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <h2 className="font-display text-[28px] font-bold leading-tight tracking-normal text-[#FAF7F2] sm:text-[34px]">
            Ready to run your business like a pro?
          </h2>
          <p className="mt-2 text-sm leading-7 text-white/72">
            More bookings. Less stress. Real results.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <MarketingLink href={signUpHref} className="w-full sm:w-auto">
            Get Started
          </MarketingLink>
          <Link
            href="#pricing"
            className="inline-flex h-11 w-full items-center justify-center rounded-[8px] border border-brand/70 bg-transparent px-6 text-sm font-extrabold text-white transition-colors hover:border-brand-gold hover:bg-brand/20 focus:outline-none focus:ring-2 focus:ring-brand-gold/35 focus:ring-offset-2 focus:ring-offset-[#111111] sm:w-auto"
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
    <footer className="border-t border-[#E4D6C3] bg-[#FFFDF8] px-5 py-10 text-[#111111] sm:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1.15fr_2fr_auto]">
        <div>
          <BrandLogo />
          <p className="mt-4 max-w-[280px] text-sm leading-6 text-[#6B7280]">
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
                      className="text-sm font-semibold text-[#6B7280] transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-sm font-semibold text-[#6B7280] md:text-right">
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
    <main className="min-h-screen bg-[#FFFDF8] text-[#111111]">
      <HomeHero />
      <HomeValueCards />
      <HomeCommandCenter />
      <HomePricing />
      <HomeFinalCta />
      <HomeFooter />
    </main>
  );
}
