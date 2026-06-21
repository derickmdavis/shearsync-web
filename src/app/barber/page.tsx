import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const loginHref = "/login";
const signUpHref = "/login?mode=sign-up";

const barberValueCards = [
  {
    icon: "/assets/icons/icon-calendar-bronze.svg",
    title: (
      <>
        Stay booked without
        <br />
        the back-and-forth
      </>
    ),
    body: "Give clients a polished booking page, manage appointment requests, and keep confirmations and reminders organized without another \"what time works?\" text.",
  },
  {
    icon: "/assets/icons/icon-client-bronze.svg",
    title: <>Remember every client</>,
    body: "Keep notes, formulas, preferences, photos, and appointment history in one clean profile so every appointment feels personal, consistent, and professional.",
  },
  {
    icon: "/assets/icons/icon-analytics-bronze.svg",
    title: (
      <>
        Know what your chair
        <br />
        is earning
      </>
    ),
    body: "See revenue, appointments, rebooking activity, and upcoming income in one simple view without building your own spreadsheet.",
  },
];

const commandBullets = [
  "Stay organized and look more professional",
  "Save time by automating the busy work",
  "Manage clients and build loyalty",
  "Track your income and grow with confidence",
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
      className="flex shrink-0 items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
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
      <span className="font-display text-[28px] font-semibold text-[#FAF7F2] sm:text-[31px]">
        DripDesk
      </span>
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
          href="#top"
          className="text-xs font-extrabold text-white/84 transition-colors hover:text-brand-gold sm:text-sm"
        >
          About
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
          Let&apos;s Start
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
            <span className="h-1.5 w-1.5 rotate-45 bg-brand-gold" />
            BUILT FOR BARBERS
          </p>

          <h1 className="mt-6 max-w-[640px] font-display text-[54px] font-bold leading-[0.9] tracking-normal text-[#FAF7F2] sm:text-[72px] lg:text-[74px]">
            The business
            <br />
            side of barbering.
          </h1>

          <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-white/76 sm:text-[17px]">
            Stop chasing appointments. Stop losing clients between visits.
            DripDesk helps you remember every client and keep them coming back.
          </p>

          <p className="mt-7 flex max-w-[560px] items-center gap-3 text-xs font-bold leading-5 text-white/78 sm:text-[13px]">
            <span className="relative h-5 w-5 shrink-0 rotate-45 border border-brand-gold after:absolute after:left-1/2 after:top-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-brand-gold" />
            <span>
              Seamless booking, automated growth, and smart business insights.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
      className="border-t border-brand/20 bg-[#111111] px-5 py-14 text-white sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[840px] text-center">
          <h2 className="font-display text-[30px] font-bold leading-[1.08] tracking-normal text-[#FAF7F2] sm:text-[40px]">
            Tools that solve real problems, so you can stay booked and stress
            less.
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-7 text-white/66">
            DripDesk helps you stay booked, remember every client detail, and
            understand what your chair is earning without juggling texts, notes,
            screenshots, or spreadsheets.
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-[960px] gap-5 lg:grid-cols-3">
          {barberValueCards.map((card) => (
            <article
              key={card.icon}
              className="rounded-[8px] border border-brand/35 bg-[#141414] p-6 shadow-[0_22px_44px_rgba(0,0,0,0.22)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full border border-brand/50 bg-brand/10">
                <Image
                  src={card.icon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 font-display text-[25px] font-bold leading-[1.08] text-[#FAF7F2]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/64">
                {card.body}
              </p>
              <Link
                href="#pricing"
                className="mt-6 inline-flex text-sm font-extrabold text-brand-gold hover:text-white"
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

function FeatureValue({ value }: { value: string }) {
  if (value === "yes") {
    return <span className="text-lg font-extrabold text-brand-gold">✓</span>;
  }

  if (value === "no") {
    return <span className="text-lg font-bold text-white/35">—</span>;
  }

  return <span className="text-xs font-bold text-white/82">{value}</span>;
}

function BarberPricing() {
  return (
    <section
      id="pricing"
      className="border-t border-brand/20 bg-[#111111] px-5 py-10 text-white sm:px-8 sm:py-14"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8">
        <div className="mx-auto max-w-[920px] text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand-gold">
            Compare plans
          </p>
          <h2 className="mt-4 whitespace-nowrap font-display text-[clamp(25px,5vw,46px)] font-bold leading-[1.02] tracking-normal text-[#FAF7F2]">
            Find the plan that fits your business.
          </h2>
          <p className="mx-auto mt-5 max-w-[440px] text-sm leading-7 text-white/62">
            Simple pricing. Powerful features. Built for how you work.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[8px] border border-brand/35 bg-[#111111] shadow-[0_20px_46px_rgba(0,0,0,0.24)]">
          <table className="min-w-[760px] table-fixed border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[30%] border-b border-brand/25 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-white/48">
                  Feature
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.name}
                    className={[
                      "relative border-b border-l border-brand/25 px-4 py-3 text-center",
                      plan.popular ? "bg-brand/12" : "bg-[#111111]",
                    ].join(" ")}
                  >
                    {plan.popular ? (
                      <div className="absolute inset-x-0 -top-px bg-gradient-to-b from-[#C9823F] to-brand py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
                        Most Popular
                      </div>
                    ) : null}
                    <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[#FAF7F2]">
                      {plan.name}
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-[#FAF7F2]">
                      {plan.price}
                      <span className="ml-1 text-xs font-bold text-white/54">
                        {plan.period}
                      </span>
                    </p>
                    {/* TODO: Route to plan-specific signup when plan selection exists. */}
                    <Link
                      href={signUpHref}
                      className={[
                        "mt-3 inline-flex h-8 items-center justify-center rounded-[8px] border px-3 text-[11px] font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/40",
                        plan.popular
                          ? "border-brand bg-brand text-white hover:bg-brand-gold"
                          : "border-brand/70 text-white hover:bg-brand/16",
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
                  <th className="border-t border-brand/25 px-4 py-2.5 text-xs font-bold text-white/76">
                    {row.feature}
                  </th>
                  <td className="border-l border-t border-brand/25 px-4 py-2.5 text-center">
                    <FeatureValue value={row.basic} />
                  </td>
                  <td className="border-l border-t border-brand/25 bg-brand/12 px-4 py-2.5 text-center">
                    <FeatureValue value={row.pro} />
                  </td>
                  <td className="border-l border-t border-brand/25 px-4 py-2.5 text-center">
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
            Built for independent barbers. Designed to help you grow.
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
          &copy; 2026 DripDesk
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
      <BarberCommandCenter />
      <BarberPricing />
      <BarberFinalCta />
      <BarberFooter />
    </main>
  );
}
