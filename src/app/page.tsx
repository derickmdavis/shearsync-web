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

const pricingPlans = [
  {
    name: "Basic",
    price: "$12/mo",
    description: "Great for solo stylists getting started.",
    cta: "Start Basic",
    features: [
      "Custom booking page",
      "Client notes",
      "Appointment reminders",
      "Basic client history & appointment tracking",
      "Revenue overview",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$25/mo",
    description: "Everything you need to run and grow your chair.",
    cta: "Start Pro",
    popular: true,
    features: [
      "Everything in Basic",
      "No-show protection",
      "Advanced client management & formulas",
      "Smart rebooking tools",
      "Detailed reporting & income insights",
      "Automations & SMS",
      "Priority support",
    ],
  },
  {
    name: "Premium",
    price: "$30/mo",
    description:
      "All features, priority support, and confidence to scale your business.",
    cta: "Start Premium",
    features: [
      "Everything in Pro",
      "Multi-chair support",
      "Advanced analytics",
      "Team & staff access",
      "Custom integrations coming soon",
      "Priority onboarding",
      "Premium support",
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
  variant?: "primary" | "secondary" | "dark";
  className?: string;
}) {
  const styles = {
    primary:
      "border border-brand bg-brand text-white shadow-[0_18px_38px_rgba(183,121,61,0.32)] hover:border-brand-gold hover:bg-brand-gold hover:text-[#111111]",
    secondary:
      "border border-brand/75 bg-transparent text-white hover:border-brand-gold hover:bg-brand/15",
    dark:
      "border border-[#D6A85A]/40 bg-[#111111] text-white hover:border-brand-gold hover:bg-[#1C1C1E]",
  };

  return (
    <Link
      href={href}
      className={[
        "inline-flex h-11 items-center justify-center rounded-[8px] px-6 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/45 focus:ring-offset-2 focus:ring-offset-[#111111]",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function HomeNav() {
  return (
    <nav
      className="relative z-20 mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-4 px-5 py-4 sm:h-[74px] sm:flex-row sm:items-center sm:px-8 sm:py-0"
      aria-label="Primary"
    >
      <Link
        href="#top"
        className="flex shrink-0 items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
        aria-label="DripDesk"
      >
        <Image
          src="/assets/brand/dripdesk-chair-mark.png"
          alt=""
          width={416}
          height={473}
          priority
          aria-hidden="true"
          className="h-9 w-auto object-contain sm:h-11"
        />
        <span className="font-display text-3xl font-semibold text-white sm:text-[34px]">
          DripDesk
        </span>
      </Link>

      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-4">
        <Link
          href="#top"
          className="text-xs font-semibold text-white/75 transition-colors hover:text-white sm:text-sm"
        >
          About
        </Link>
        <Link
          href="#pricing"
          className="text-xs font-semibold text-white/75 transition-colors hover:text-white sm:text-sm"
        >
          Pricing
        </Link>
        <Link
          href={loginHref}
          className="text-xs font-semibold text-white/75 transition-colors hover:text-white sm:text-sm"
        >
          Login
        </Link>
        <MarketingLink
          href={signUpHref}
          className="h-9 px-4 text-xs sm:h-10 sm:px-5 sm:text-sm"
        >
          Let&apos;s Start!
        </MarketingLink>
      </div>
    </nav>
  );
}

function HomeHero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#111111] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(214,168,90,0.18),transparent_32%),linear-gradient(120deg,#111111_0%,#111111_46%,#1C1C1E_100%)]" />
      <HomeNav />

      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-8 px-5 pb-14 pt-7 sm:px-8 sm:pb-18 lg:min-h-[690px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-16 lg:pt-2">
        <div className="max-w-[570px]">
          <h1 className="max-w-[540px] font-display text-[54px] font-bold leading-[0.92] tracking-normal text-[#FAF7F2] sm:text-[76px] lg:text-[84px]">
            Turn your chair into a thriving business
          </h1>

          <p className="mt-6 max-w-[540px] text-[17px] leading-8 text-white/78 sm:text-lg">
            Stop chasing appointments. Stop losing clients between visits. Keep
            your book full with automated booking, rebooking, and client
            management built for independent stylists.
          </p>

          <p className="mt-4 text-sm font-bold text-brand-gold">
            More rebooked clients. A fuller book. A stronger business.
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

          <p className="mt-7 max-w-[570px] border-l-2 border-brand pl-4 text-sm font-semibold leading-6 text-white/64 sm:whitespace-nowrap">
            Designed for stylists, barbers, booth renters, and independent
            beauty pros.
          </p>
        </div>

        <div className="relative min-h-[470px] sm:min-h-[560px] lg:min-h-[650px]">
          <div className="absolute inset-y-2 left-[13%] right-[8%] overflow-hidden rounded-[28px] border border-white/10 bg-[#1C1C1E] shadow-[0_30px_90px_rgba(0,0,0,0.48)] sm:left-[18%] sm:right-[7%] lg:left-[15%] lg:right-[8%]">
            <Image
              src="/assets/home/dripdesk-hero-image.png"
              alt="Stylist managing her chair business on a tablet inside a salon"
              fill
              priority
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 70vw, 88vw"
              className="object-cover object-[92%_center] sm:object-[90%_center] lg:object-[86%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.46),transparent_35%,rgba(17,17,17,0.08)),linear-gradient(180deg,transparent_58%,rgba(17,17,17,0.72))]" />
          </div>

          <div className="absolute bottom-[-10px] right-[2%] w-[42%] min-w-[178px] max-w-[248px] drop-shadow-[0_30px_42px_rgba(0,0,0,0.42)] sm:right-[6%] sm:w-[34%] sm:max-w-[275px] lg:bottom-[22px] lg:right-[1%] lg:w-[38%]">
            <Image
              src="/assets/home/hero-phone-dashboard.png"
              alt="DripDesk mobile app dashboard showing business snapshot metrics"
              width={820}
              height={1620}
              priority
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 230px, 42vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeValueCards() {
  return (
    <section className="bg-[#FAF7F2] px-5 py-16 text-[#111111] sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-display text-[38px] font-bold leading-[1.02] tracking-normal sm:text-[52px]">
            Tools that solve real problems, so you can stay booked and stress
            less.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#6B7280] sm:text-lg">
            DripDesk helps you stay booked, remember every client detail, and
            understand what your chair is earning without juggling texts, notes,
            screenshots, or spreadsheets.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {valueCards.map((card) => (
            <article
              key={card.icon}
              className="rounded-[8px] border border-[#E4D6C3] bg-white p-7 shadow-[0_18px_42px_rgba(17,17,17,0.05)]"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full border border-brand/25 bg-brand/10">
                <Image
                  src={card.icon}
                  alt=""
                  width={28}
                  height={28}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 text-xl font-extrabold leading-7 text-[#111111]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#6B7280]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCommandCenter() {
  return (
    <section className="overflow-hidden bg-[#111111] px-5 py-16 text-white sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
        <div>
          <h2 className="font-display text-[42px] font-bold leading-[1] tracking-normal text-[#FAF7F2] sm:text-[58px]">
            A cleaner command
            <br />
            center for your chair.
          </h2>
          <p className="mt-5 max-w-[500px] text-base leading-8 text-white/70">
            Stop juggling apps, texts, and screenshots. DripDesk gives you
            everything you need to run your business &mdash; in one simple
            place.
          </p>

          <ul className="mt-8 grid gap-4">
            {commandBullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm font-bold text-white/82">
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

        <div className="relative">
          <div className="absolute inset-4 rounded-[24px] bg-brand/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[#1C1C1E] shadow-[0_34px_80px_rgba(0,0,0,0.38)]">
            <Image
              src="/assets/home/dashboard-command-center-mockup.png"
              alt="DripDesk dashboard showing appointments, revenue, and business insights"
              width={1400}
              height={832}
              sizes="(min-width: 1024px) 680px, 92vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePricing() {
  return (
    <section
      id="pricing"
      className="bg-[#FAF7F2] px-5 py-14 text-[#111111] sm:px-8 sm:py-18"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[660px] text-center">
          <h2 className="font-display text-[34px] font-bold leading-[1.05] tracking-normal sm:text-[46px]">
            Plans that grow with you.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6B7280] sm:text-base">
            Upgrade when you need more tools and insights to scale, hire, and
            save more.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={[
                "relative flex min-h-full flex-col rounded-[8px] border bg-white p-6 shadow-[0_14px_34px_rgba(17,17,17,0.055)] sm:p-7",
                plan.popular
                  ? "border-brand shadow-[0_20px_46px_rgba(183,121,61,0.14)]"
                  : "border-[#E4D6C3]",
              ].join(" ")}
            >
              {plan.popular ? (
                <div className="absolute right-5 top-5 rounded-full bg-brand-gold px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#111111]">
                  Most Popular
                </div>
              ) : null}

              <h3 className="text-xl font-extrabold text-[#111111] sm:text-[22px]">
                {plan.name}
              </h3>
              <p className="mt-4 text-[34px] font-extrabold tracking-tight text-[#111111] sm:text-[38px]">
                {plan.price}
              </p>
              <p className="mt-3 min-h-[3rem] text-sm leading-6 text-[#6B7280]">
                {plan.description}
              </p>

              <ul className="mb-8 mt-6 grid gap-3 text-[13px] font-semibold leading-5 text-[#1C1C1E]/78 sm:text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Image
                      src="/assets/icons/icon-check-bronze.svg"
                      alt=""
                      width={18}
                      height={18}
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* TODO: Route to plan-specific signup when plan selection exists. */}
              <Link
                href={signUpHref}
                className={[
                  "relative z-10 mt-auto inline-flex h-12 w-full items-center justify-center rounded-[8px] border px-5 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2",
                  plan.popular
                    ? "border-brand bg-brand text-[#111111] hover:border-brand-dark hover:bg-brand-dark hover:text-white"
                    : "border-[#D6A85A]/70 bg-[#FAF7F2] text-[#111111] shadow-[inset_0_0_0_1px_rgba(17,17,17,0.04)] hover:border-brand hover:bg-white",
                ].join(" ")}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeFinalCta() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#111111] px-5 py-16 text-center text-white sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-[720px]">
        <h2 className="font-display text-[42px] font-bold leading-[1] tracking-normal text-[#FAF7F2] sm:text-[62px]">
          You deserve a
          <br />
          real business system.
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-white/76 sm:text-lg">
          Built for independent stylists and barbers who want more bookings,
          less stress, and a business that actually pays you.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111111]">
      <HomeHero />
      <HomeValueCards />
      <HomeCommandCenter />
      <HomePricing />
      <HomeFinalCta />
    </main>
  );
}
