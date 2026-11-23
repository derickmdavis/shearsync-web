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

type ProductPillar = {
  icon: string;
  title: string;
  body: string;
  bullets?: string[];
  screenshot: string;
  screenshotWidth?: number;
  screenshotHeight?: number;
  alt: string;
};

const productPillars: ProductPillar[] = [
  {
    icon: "/assets/icons/icon-calendar-bronze.svg",
    title: "Stay booked",
    body: "Professional booking page, automated waitlists and unlimited campaigns.",
    screenshot: "/assets/home/stay-booked-calendar.png",
    screenshotWidth: 941,
    screenshotHeight: 1672,
    alt: "Root & Foil calendar screen showing appointments, open time, and booking controls",
  },
  {
    icon: "/assets/icons/icon-client-bronze.svg",
    title: "Keep clients coming back",
    body: "Client notes, formulas, and rebooking reminders",
    screenshot: "/assets/home/client-details.png",
    screenshotWidth: 1086,
    screenshotHeight: 1448,
    alt: "Root & Foil clients screen showing client list, notes, and client history",
  },
  {
    icon: "/assets/icons/icon-analytics-bronze.svg",
    title: "Know what’s working",
    body: "Revenue, capacity and at-risk clients at a glance",
    screenshot: "/assets/home/root-foil-insights.png",
    screenshotWidth: 887,
    screenshotHeight: 1774,
    alt: "Root & Foil dashboard screen showing business snapshot and revenue insights",
  },
];

const philosophyItems = [
  { label: "Premium", body: "A polished experience for you and your clients.", icon: "sparkle" },
  { label: "Focused", body: "The tools you’ll use, without the clutter.", icon: "target" },
  { label: "All-Access", body: "Every feature for $25/month.", icon: "heart" },
] as const;

const pricingFeatureGroups = [
  {
    title: "Booking & calendar",
    icon: "calendar",
    features: [
      "Custom booking page, link & settings",
      "Your calendar and capacity, beautifully organized",
      "Guide new clients to the right service with a booking inquiry form",
      "Automated waitlist handling",
    ],
  },
  {
    title: "Client care",
    icon: "clients",
    features: [
      "Client profiles & visit history",
      "Notes, photos & formulas",
      "Client spending trends & lifetime value",
    ],
  },
  {
    title: "Messages & marketing",
    icon: "message",
    features: [
      "Ready-to-send messages from day one",
      "Texts for the timely essentials: confirmations & reminders",
      "Email for the thoughtful extras: follow-ups & rebooking nudges",
      "Custom email campaigns for whatever’s next",
    ],
  },
  {
    title: "Insights",
    icon: "insights",
    features: [
      "Business, schedule & client health at a glance",
      "Understand what’s driving the trends in detailed cards",
      "No fluff—just actionable insights to address at-risk clients and drive growth",
    ],
  },
] as const;

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "What do you get?", href: "#product" },
      { label: "Why Root & Foil", href: "#pricing" },
      { label: "One price", href: "#one-price" },
      { label: "Login", href: loginHref },
    ],
  },
  {
    title: "Company",
    links: [{ label: "About", href: "/about" }],
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

function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="#top"
      className={`shrink-0 focus:outline-none focus:ring-2 focus:ring-brand/35 ${className}`}
      aria-label="Root & Foil"
    >
      <Image
        src="/assets/brand/root-foil-roots-mark.svg"
        alt="Root & Foil"
        width={147}
        height={147}
        priority
        className="h-11 w-11 object-contain lg:h-12 lg:w-12"
      />
    </Link>
  );
}

const heroSlides = [
  {
    src: "/assets/hero/hero-stay-booked.png",
    alt: "Root & Foil booking experience shown across two phone screens",
  },
  {
    src: "/assets/hero/hero-keep-clients.png",
    alt: "Root & Foil client management screens",
  },
  {
    src: "/assets/hero/hero-grow-confidence.png",
    alt: "Root & Foil insights and calendar screens",
  },
];

function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (paused || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [paused]);

  const selectSlide = (index: number) => {
    setActiveIndex(index);
    setPaused(true);
  };

  const moveSlide = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);
    setPaused(true);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[600px] select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Root & Foil product previews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
        setPaused(true);
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start === null || end === undefined || Math.abs(start - end) < 42) return;
        moveSlide(start > end ? 1 : -1);
      }}
    >
      <div className="group relative aspect-[450/460] overflow-hidden" aria-live="polite">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div key={slide.src} className="h-full w-full shrink-0">
              <Image
                src={slide.src}
                alt={index === activeIndex ? slide.alt : ""}
                width={450}
                height={460}
                priority={index === 2}
                sizes="(min-width: 1024px) 52vw, (min-width: 640px) 620px, 100vw"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#080807_0%,transparent_11%,transparent_89%,#080807_100%),linear-gradient(to_bottom,#080807_0%,transparent_9%,transparent_88%,#080807_100%)]"
        />
        <button
          type="button"
          onClick={() => moveSlide(-1)}
          aria-label="Show previous product preview"
          className="absolute left-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[#D6A85A]/60 bg-[#080807]/70 text-xl text-[#FAF7F2] opacity-0 backdrop-blur-sm transition hover:bg-[#D6A85A] hover:text-[#17120C] focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#F0CD8A] group-hover:opacity-100 sm:left-3 sm:h-10 sm:w-10"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          onClick={() => moveSlide(1)}
          aria-label="Show next product preview"
          className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[#D6A85A]/60 bg-[#080807]/70 text-xl text-[#FAF7F2] opacity-0 backdrop-blur-sm transition hover:bg-[#D6A85A] hover:text-[#17120C] focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#F0CD8A] group-hover:opacity-100 sm:right-3 sm:h-10 sm:w-10"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <div className="mt-2 flex justify-center gap-3" role="tablist" aria-label="Product preview slides">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Show product preview ${index + 1}`}
            onClick={() => selectSlide(index)}
            className={`h-3 w-3 rounded-full border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#F0CD8A] focus:ring-offset-2 focus:ring-offset-[#080807] ${index === activeIndex ? "bg-[#D6A85A]" : "bg-[#69635B] hover:bg-[#A39A8C]"}`}
          />
        ))}
      </div>
    </div>
  );
}

function HomeHero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#080807] text-[#FAF7F2]"
    >
      <div className="relative z-10 mx-auto grid max-w-[1280px] gap-8 px-5 pb-10 pt-2 sm:px-8 sm:pb-14 lg:min-h-[620px] lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-3 lg:px-12 lg:pb-10 lg:pt-0">
        <div className="mx-auto max-w-[560px] text-center lg:mx-0 lg:text-left">
          <Image
            src="/assets/brand/root-foil-full-logo-transparent.png"
            alt="Root & Foil"
            width={1169}
            height={1157}
            priority
            className="mx-auto mb-4 w-[151px] object-contain sm:w-[172px] lg:mx-0 lg:mb-5 lg:w-[205px]"
          />
          <h1 className="mt-5 text-balance font-display text-[clamp(23px,7.4vw,38px)] font-semibold leading-[0.91] tracking-[-0.05em] text-[#FAF7F2] sm:text-[52px] lg:mt-6 lg:text-[68px] lg:tracking-[-0.025em] xl:text-[76px]">
            For independent hair pros
          </h1>

          <p className="mx-auto mt-4 max-w-[500px] text-[15px] leading-6 text-[#E5DED4] sm:text-[16px] sm:leading-7 lg:mx-0 lg:mt-6">
            Root &amp; Foil helps you stay booked, remember every client, and
            understand your business. You get the tools you need without the
            complexity you don&apos;t.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:mt-7 lg:justify-start">
            <MarketingLink
              href="/waitlist"
              className="h-11 w-full border-[#E3B166] !bg-[#D6A85A] px-3 !font-sans !text-[13px] !font-semibold !text-[#17120C] !shadow-[0_10px_24px_rgba(214,168,90,0.18)] hover:!bg-[#E3B166] sm:w-auto sm:px-6"
            >
              Join Waitlist
            </MarketingLink>
          </div>

        </div>

        <div className="relative -mx-5 mt-1 sm:-mx-8 sm:mt-3 lg:mx-0 lg:mt-0">
          <HeroCarousel />
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
          <h2 className="whitespace-nowrap font-display text-[38px] font-bold leading-[1.02] tracking-[-0.01em] sm:text-[48px] lg:text-[56px]">
            What do you <span className="text-brand">get?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-[#4F4A45] sm:text-base">
            Everything you need to grow.
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
                {card.bullets?.length ? <>
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
                </> : null}
                <div className="mt-auto flex justify-center pt-8">
                  <Image
                    src={card.screenshot}
                    alt={card.alt}
                    width={card.screenshotWidth ?? 1122}
                    height={card.screenshotHeight ?? 1402}
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
  const className = "h-8 w-8";

  if (type === "target") {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" className={className} aria-hidden="true">
        <path d="M15 7h-4a4 4 0 0 0-4 4v5M33 7h4a4 4 0 0 1 4 4v5M15 41h-4a4 4 0 0 1-4-4v-5M33 41h4a4 4 0 0 0 4-4v-5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "sparkle") {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true">
        <path d="m24 4 3.6 13.1L41 21l-13.4 3.9L24 38l-3.6-13.1L7 21l13.4-3.9L24 4Z" strokeLinejoin="round" />
        <path d="m39 5 1.3 4.7L45 11l-4.7 1.3L39 17l-1.3-4.7L33 11l4.7-1.3L39 5Z" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path d="M20.8 4.9a5.2 5.2 0 0 0-7.4 0L12 6.3l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8.7a5.2 5.2 0 0 0 0-7.4Z" />
    </svg>
  );
}

function PricingFeatureIcon({ type }: { type: (typeof pricingFeatureGroups)[number]["icon"] }) {
  const className = "h-12 w-12 shrink-0";

  if (type === "calendar") return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" className={className} aria-hidden="true"><rect x="8" y="10" width="32" height="31" rx="4" /><path d="M8 20h32M16 5v10M32 5v10M16 28h.01M24 28h.01M32 28h.01M16 35h.01M24 35h.01M32 35h.01" strokeLinecap="round" /></svg>;
  if (type === "clients") return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" className={className} aria-hidden="true"><circle cx="19" cy="16" r="7" /><path d="M6 39v-2a13 13 0 0 1 26 0v2M31 10a7 7 0 0 1 0 13M36 39v-2a11 11 0 0 0-5.5-9.5" strokeLinecap="round" /></svg>;
  if (type === "message") return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" className={className} aria-hidden="true"><rect x="6" y="11" width="36" height="27" rx="3" /><path d="m7 14 17 13 17-13" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" className={className} aria-hidden="true"><rect x="7" y="28" width="8" height="13" rx="1" /><rect x="20" y="20" width="8" height="21" rx="1" /><rect x="33" y="9" width="8" height="32" rx="1" /></svg>;
}

function PricingCheckIcon() {
  return <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#D9892B] text-[11px] font-semibold leading-none text-[#D9892B]" aria-hidden="true">✓</span>;
}

function HomePricing() {
  return (
    <section id="pricing" className="border-t border-[rgba(200,164,107,0.30)] bg-transparent px-5 py-20 text-[#111111] sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[980px]">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-display text-[38px] font-bold leading-[1.02] tracking-[-0.01em] sm:text-[48px] lg:text-[56px]">
            Why Root &amp; <span className="text-brand">Foil</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-[#4F4A45] sm:text-base">
            Premium tools. A focused experience.<br />
            One straightforward price.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {philosophyItems.map((item) => (
            <article key={item.label} className="flex min-h-[144px] items-center rounded-[28px] border border-[rgba(190,137,70,0.48)] bg-[#FFFDF8]/40 px-6 py-6 sm:min-h-[164px] sm:px-9 lg:block lg:min-h-[300px] lg:px-8 lg:py-10">
              <div className="shrink-0 text-brand lg:mx-auto lg:grid lg:h-20 lg:w-20 lg:place-items-center lg:rounded-full lg:bg-[rgba(214,168,90,0.1)]">
                <PhilosophyIcon type={item.icon} />
              </div>
              <div className="ml-6 lg:ml-0 lg:mt-7 lg:text-center">
                <h3 className="font-display text-[25px] font-bold leading-[1.02] tracking-normal text-[#111111]">{item.label}</h3>
                <p className="mt-4 max-w-[510px] text-sm leading-7 text-[#4F4A45] lg:mx-auto">{item.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div id="one-price" className="mt-20 scroll-mt-6 sm:mt-24">
          <header className="max-w-[760px]">
            <h2 className="font-display text-[38px] font-bold leading-[1.02] tracking-[-0.01em] sm:text-[48px] lg:text-[56px]">One price. The tools you&apos;ll actually use.</h2>
            <p className="mt-5 text-[15px] leading-7 text-[#70819F] sm:text-base">Everything below is included for {MONTHLY_PRICE}/month.</p>
          </header>

          <div className="mt-9 grid gap-5 sm:mt-12 sm:gap-6">
            {pricingFeatureGroups.map((group) => (
              <article key={group.title} className="rounded-[26px] border border-[#E7A165] bg-[#FFFDF8]/45 px-6 py-6 sm:px-9 sm:py-8">
                <header className="flex items-center gap-5 text-[#D9892B]">
                  <PricingFeatureIcon type={group.icon} />
                  <h3 className="font-display text-[30px] font-bold leading-[1.02] tracking-normal text-[#111111]">{group.title}</h3>
                </header>
                <ul className="mt-6 grid gap-3.5 sm:mt-7 sm:gap-4">
                  {group.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-sm leading-6 text-[#17120C] sm:text-base sm:leading-7">
                      <PricingCheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-5 px-1 text-center sm:mt-7">
            <MarketingLink href="/waitlist" className="h-16 w-full rounded-[14px] !border-[#17120C] !bg-[#C98239] !px-8 !font-sans !text-[22px] !font-semibold !text-white !shadow-none hover:!bg-[#B9722D] sm:mx-auto sm:w-[352px]">
              Join the waitlist
            </MarketingLink>
            <p className="mt-4 text-[18px] text-[#6D7481]">One plan · Cancel anytime</p>
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

async function waitlistResponseMessage(response: Response) {
  try {
    const body = await response.json() as { message?: unknown; error?: { message?: unknown } };
    if (typeof body.message === "string") return body.message;
    if (typeof body.error?.message === "string") return body.error.message;
  } catch {
    // Use the standard retry message when the response is not JSON.
  }

  return "We couldn't join the waitlist right now. Please try again.";
}

export function WaitlistModal({
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
        setErrors({ form: await waitlistResponseMessage(response) });
        return;
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
                src="/assets/brand/root-foil-waitlist-logo.png"
                alt=""
                width={1536}
                height={1024}
                aria-hidden="true"
                className="h-[6.75rem] w-auto object-contain sm:h-36"
              />
              <h2
                id="waitlist-title"
                className="mt-5 max-w-[360px] font-display text-[38px] font-bold leading-[0.95] tracking-normal text-[#111111] sm:mt-7 sm:text-[58px]"
              >
                Get <span className="text-[#B7793D]">early access</span>
              </h2>
              <p className="mt-4 max-w-[420px] text-sm leading-6 text-[#4F4A45] sm:mt-6 sm:text-[15px] sm:leading-7">
                Root & Foil is opening first to a small group of independent
                stylists and barbers.
              </p>
              <p className="mt-3 max-w-[420px] text-sm leading-6 text-[#4F4A45] sm:mt-4 sm:text-[15px] sm:leading-7">
                Be among the first to experience a simpler way to book, manage,
                and grow your business.
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
                    {submitting ? "Joining..." : "GET EARLY ACCESS"}
                  </button>

                  <p className="text-center text-xs leading-5 text-[#6B7280]">
                    We&apos;ll be in touch when early access opens.
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
  return (
    <main className="min-h-screen bg-[#F6F1E8] text-[#111111]">
      <HomeHero />
      <HomeProductPillars />
      <HomePricing />
      <HomeFooter />
    </main>
  );
}
