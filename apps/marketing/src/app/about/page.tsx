import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getWebAppUrl } from "@/src/lib/urls";

export const metadata: Metadata = {
  title: "About Root & Foil | Software for Independent Hair Professionals",
  description:
    "Learn about Root & Foil, a Colorado-based software company for independent hair professionals, founded by Derick Davis.",
};

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Product", href: "/#product" },
      { label: "What’s Included", href: "/#product" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Login", href: getWebAppUrl("/login") },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
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

function FooterBrandLogo() {
  return (
    <Link
      href="/"
      className="shrink-0 focus:outline-none focus:ring-2 focus:ring-brand/35"
      aria-label="Root & Foil"
    >
      <Image
        src="/assets/brand/root-foil-roots-mark.svg"
        alt="Root & Foil"
        width={147}
        height={147}
        className="h-11 w-11 object-contain lg:h-12 lg:w-12"
      />
    </Link>
  );
}

function AboutFooter() {
  return (
    <footer className="border-t border-[rgba(200,164,107,0.30)] bg-[#FFFDF8]/55 px-5 py-10 text-[#111111] sm:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1.15fr_2fr_auto]">
        <div>
          <FooterBrandLogo />
          <p className="mt-4 max-w-[280px] text-sm leading-6 text-[#4F4A45]">
            Built for independent beauty pros. Designed to help you grow.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#111111]">
                {group.title}
              </h2>
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F6F1E8] text-[#111111]">
      <section className="mx-auto flex min-h-[calc(100vh-245px)] max-w-[1180px] items-center px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="max-w-[730px]">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8A5528]">
            About Root &amp; Foil
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[0.94] tracking-[-0.035em] text-[#111111] sm:text-6xl lg:text-7xl">
            Built for independent hair professionals.
          </h1>
          <p className="mt-7 max-w-[670px] text-base leading-7 text-[#4F4A45] sm:text-[17px] sm:leading-8">
            Root &amp; Foil is a Colorado-based software company built for
            independent hair professionals. We create a focused, easy-to-use
            system that brings booking, client details, formulas, follow-ups,
            and business insights together—without the complexity of software
            built for everyone.
          </p>

          <div className="mt-10 grid gap-8 border-t border-[rgba(200,164,107,0.45)] pt-8 sm:grid-cols-[1fr_1.2fr] sm:gap-12">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8A5528]">
                Founder
              </p>
              <p className="mt-3 text-base leading-7 text-[#4F4A45]">
                Derick &amp; Katie Davis are the founders and operators of Root
                &amp; Foil LLC. Root &amp; Foil was created to give independent hair
                professionals a simpler, more thoughtful way to run and grow
                their businesses.
              </p>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8A5528]">
                Contact
              </p>
              <p className="mt-3 text-base leading-7 text-[#4F4A45]">
                For business inquiries, contact:
                <br />
                <a
                  href="mailto:hello@rootfoil.com"
                  className="font-semibold text-[#4A3728] underline decoration-[#B07A3E]/60 underline-offset-4 transition-colors hover:text-[#B07A3E]"
                >
                  hello@rootfoil.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <AboutFooter />
    </main>
  );
}
