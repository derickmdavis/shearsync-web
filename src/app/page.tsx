import Image from "next/image";
import Link from "next/link";

const loginHref = "/login";
const signUpHref = "/login?mode=sign-up";

const features = [
  {
    icon: "clients",
    title: "Remember every client",
    copy: "Track notes, formulas, preferences, photos, and appointment history in one clean client profile.",
  },
  {
    icon: "calendar",
    title: "Stay booked without the back-and-forth",
    copy: "Share a booking page, manage appointment requests, and send confirmations or reminders.",
  },
  {
    icon: "growth",
    title: "Know what your chair is earning",
    copy: "See revenue, appointments, rebooking, and upcoming income without building a spreadsheet.",
  },
];

const proofPoints = [
  {
    title: "Simple setup",
    copy: "Launch your booking page and client list without a complicated onboarding process.",
  },
  {
    title: "Client-first",
    copy: "Keep the notes, preferences, and history that bring clients back.",
  },
  {
    title: "Built to grow",
    copy: "Start solo, then add reminders, waitlist, calendar sync, and business insights as you need them.",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "$12",
    description: "For solo pros getting organized.",
    features: [
      "Booking page",
      "Client list",
      "Appointment tracking",
      "Email confirmations/reminders",
      "Basic business snapshot",
      "No SMS included",
    ],
  },
  {
    name: "Pro",
    price: "$25",
    description:
      "For pros who want reminders and a more polished booking experience.",
    features: [
      "Everything in Basic",
      "100 SMS/month",
      "Automated appointment reminders",
      "Custom booking slug",
      "Custom booking page cover photo",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$30",
    description:
      "For chair-based businesses that want more automation and insight.",
    features: [
      "Everything in Pro",
      "300 SMS/month",
      "Google Calendar sync (Coming soon)",
      "Weekly business recap email (Coming soon)",
      "Advanced business insights",
      "Waitlist tools (Coming soon)",
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
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) {
  const styles = {
    primary:
      "bg-brand text-white shadow-[0_14px_24px_rgba(183,121,61,0.22)] hover:bg-brand-dark",
    secondary:
      "border border-border bg-white text-foreground shadow-[0_8px_18px_rgba(17,17,17,0.04)] hover:border-brand/40 hover:text-brand",
    outline:
      "border border-brand/35 bg-white text-brand hover:border-brand hover:bg-brand-soft",
  };

  return (
    <Link
      href={href}
      className={[
        "inline-flex h-11 items-center justify-center rounded-[8px] px-7 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-foreground/[0.08] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[66px] max-w-[1120px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-foreground focus:outline-none focus:ring-2 focus:ring-brand/30"
          aria-label="ChairDesk home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] border-2 border-brand text-xl font-black italic leading-none text-brand">
            C
          </span>
          <span>ChairDesk</span>
        </Link>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <MarketingLink
            href={loginHref}
            variant="secondary"
            className="h-9 px-5 text-xs sm:h-10 sm:px-7 sm:text-sm"
          >
            Login
          </MarketingLink>
          <MarketingLink
            href={signUpHref}
            className="h-9 px-5 text-xs sm:h-10 sm:px-7 sm:text-sm"
          >
            Sign Up
          </MarketingLink>
        </div>
      </div>
    </header>
  );
}

function HeroVisual() {
  return (
    <div
      className="relative mx-auto h-[430px] w-full max-w-[610px] overflow-hidden lg:h-[455px]"
      role="img"
      aria-label="Independent professional using ChairDesk with a mobile dashboard preview"
    >
      <div className="absolute inset-y-0 left-0 w-[76%] overflow-hidden rounded-[34px] shadow-[0_22px_58px_rgba(17,24,39,0.16)] [clip-path:polygon(10%_0,100%_0,87%_100%,0_100%)]">
        <Image
          src="/marketing/stylist-hero.png"
          alt="Stylist reviewing bookings on a tablet in her salon"
          fill
          priority
          sizes="(min-width: 1024px) 520px, 82vw"
          className="object-cover object-[58%_center]"
        />
      </div>
      <div className="absolute bottom-[-34px] right-0 w-[42%] min-w-[190px] drop-shadow-[0_18px_34px_rgba(17,24,39,0.22)] sm:w-[39%] lg:w-[40%]">
        {/* TODO: Replace static purple-accented mockup with a ChairDesk charcoal/bronze version. */}
        <Image
          src="/marketing/app-dashboard-phone.png"
          alt="ChairDesk mobile dashboard showing revenue, appointments, and upcoming bookings"
          width={1024}
          height={1536}
          priority
          sizes="(min-width: 1024px) 245px, 42vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[linear-gradient(90deg,#FAF7F2_0%,#ffffff_46%,#FBFAF7_100%)] px-5 py-12 sm:px-8 sm:py-14 lg:py-0"
    >
      <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:min-h-[430px] lg:grid-cols-[0.83fr_1fr]">
        <div className="relative z-10 py-4 lg:py-14">
          <div className="inline-flex items-center rounded-full bg-brand-soft px-4 py-2 text-sm font-bold text-brand">
            <span className="mr-2 text-base" aria-hidden="true">
              +
            </span>
            Built for independent pros
          </div>

          <h1 className="mt-6 max-w-[520px] font-display text-[42px] font-bold leading-[1.08] tracking-normal text-foreground sm:text-[56px] lg:text-[48px] xl:text-[52px]">
            The front desk for your chair.
          </h1>
          <p className="mt-6 max-w-[470px] text-base leading-7 text-muted sm:text-lg">
            ChairDesk helps barbers, stylists, and independent pros manage
            online booking, client notes, reminders, and business insights from
            one simple workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MarketingLink href={signUpHref} className="w-full sm:w-[118px]">
              Sign Up
            </MarketingLink>
            <MarketingLink
              href={loginHref}
              variant="secondary"
              className="w-full sm:w-[118px]"
            >
              Login
            </MarketingLink>
          </div>
          <p className="mt-3 text-sm font-semibold text-muted">
            Simple setup. No bulky salon software.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#6B7280]">
            <div className="flex -space-x-2" aria-hidden="true">
              {["M", "J", "A"].map((initial) => (
                <span
                  key={initial}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[linear-gradient(135deg,#111111,#D6A85A)] text-xs font-bold text-white"
                >
                  {initial}
                </span>
              ))}
            </div>
            <span className="text-[#FFB703]" aria-hidden="true">
              ★★★★★
            </span>
            <span>Loved by pros like you</span>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function FeatureSection() {
  const iconStyles = "h-7 w-7 text-brand";

  return (
    <section id="features" className="bg-white px-5 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#080D22] sm:text-3xl">
            Built for the people behind the chair
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
            Keep your schedule full, remember every client detail, and
            understand how your business is performing without complicated salon
            software.
          </p>
          <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-brand" />
        </div>

        <div className="mt-9 grid gap-8 md:grid-cols-3 md:gap-0">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={[
                "px-0 text-center md:px-8",
                index > 0 ? "md:border-l md:border-border" : "",
              ].join(" ")}
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand shadow-[0_10px_22px_rgba(183,121,61,0.10)]">
                {feature.icon === "clients" ? (
                  <svg
                    className={iconStyles}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.5 19c.6-3.1 2.1-5 4.5-5s3.9 1.9 4.5 5M11.5 19c.6-3.1 2.1-5 4.5-5s3.9 1.9 4.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : feature.icon === "calendar" ? (
                  <svg
                    className={iconStyles}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 3v4M17 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Zm2 8h3m2 0h3M8 17h3m2 0h3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className={iconStyles}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 19V5M4 19h17M8 16v-4m5 4V9m5 7V6m-7 1 3-3 3 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <h3 className="mt-5 text-base font-extrabold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[270px] text-sm leading-6 text-muted">
                {feature.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChairDeskSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFAF7_100%)] px-5 py-9 sm:px-8 sm:py-11">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Simple software for independent pros
            </h2>
            <p className="mt-4 max-w-[560px] text-sm leading-6 text-muted sm:text-base">
              Most booking tools are built for salons, marketplaces, or full
              shops. ChairDesk is built for independent pros who need a simple
              way to manage their chair, clients, schedule, and follow-ups
              without extra complexity.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <article
                key={point.title}
                className="rounded-[8px] border border-border bg-white p-5 shadow-[0_8px_20px_rgba(17,17,17,0.04)]"
              >
                <h3 className="text-sm font-extrabold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {point.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
}: {
  plan: (typeof pricingPlans)[number];
}) {
  return (
    <article
      className={[
        "relative flex h-full flex-col overflow-hidden rounded-[8px] border bg-white p-6 shadow-[0_10px_28px_rgba(17,24,39,0.08)]",
        plan.highlighted
          ? "border-brand shadow-[0_18px_38px_rgba(183,121,61,0.16)]"
          : "border-border",
      ].join(" ")}
    >
      {plan.highlighted ? (
        <span className="absolute inset-x-0 top-0 bg-brand py-2 text-center text-xs font-extrabold text-white">
          Most Popular
        </span>
      ) : null}

      <h3
        className={[
          "text-xl font-extrabold text-foreground",
          plan.highlighted ? "mt-7" : "",
        ].join(" ")}
      >
        {plan.name}
      </h3>
      <div className="mt-2 flex items-end gap-1">
        <span className="text-4xl font-extrabold tracking-tight text-foreground">
          {plan.price}
        </span>
        <span className="pb-1 text-sm font-semibold text-muted">
          /month
        </span>
      </div>
      <p className="mt-4 min-h-[3rem] text-sm leading-6 text-muted">
        {plan.description}
      </p>

      <ul className="mt-5 grid gap-3 text-sm font-medium text-muted">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-xs font-extrabold text-brand"
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <MarketingLink
        href={signUpHref}
        variant={plan.highlighted ? "primary" : "outline"}
        className="mt-7 w-full"
      >
        Get Started
      </MarketingLink>
    </article>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="bg-white px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1120px] rounded-[8px] border border-border bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFAF7_100%)] px-5 py-6 shadow-[0_12px_28px_rgba(17,17,17,0.05)] sm:px-8 lg:px-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Plans that grow with your chair
          </h2>
          <p className="mt-3 text-sm font-semibold text-[#6B7280]">
            Start simple. Add automation when you need it. No contracts. Cancel
            anytime.
          </p>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-white px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-6 rounded-[12px] border border-border bg-white p-6 shadow-[0_12px_28px_rgba(17,17,17,0.06)] sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-brand-soft text-3xl font-light text-brand"
            aria-hidden="true"
          >
            +
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-foreground">
              Ready to run your chair like a business?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Start with ChairDesk today and keep your bookings, clients, and
              business insights in one simple workspace.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <MarketingLink href={signUpHref} className="w-full sm:w-auto">
            Sign Up
          </MarketingLink>
          <MarketingLink
            href={loginHref}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Login
          </MarketingLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white px-5 pb-8 pt-3 sm:px-8">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-4 text-xs text-[#6B7280] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 ChairDesk. All rights reserved.</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {/* TODO: Replace placeholder links when legal/contact routes exist. */}
          <a className="font-semibold hover:text-brand" href="#">
            Privacy Policy
          </a>
          <a className="font-semibold hover:text-brand" href="#">
            Terms of Service
          </a>
          <a className="font-semibold hover:text-brand" href="#">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <Header />
      <HeroSection />
      <FeatureSection />
      <WhyChairDeskSection />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
