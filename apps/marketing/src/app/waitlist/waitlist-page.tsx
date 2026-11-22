"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useState } from "react";

type FormErrors = {
  fullName?: string;
  email?: string;
  form?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const valueProps = [
  { label: "Simpler Booking", icon: CalendarIcon },
  { label: "Client Management", icon: ClientsIcon },
  { label: "Easy Rebooking", icon: RebookIcon },
];

export function WaitlistPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) nextErrors.fullName = "Please enter your full name.";
    if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: trimmedName,
          email: trimmedEmail,
          source: "homepage_waitlist",
        }),
      });
      if (!response.ok) throw new Error("Unable to submit waitlist request.");
      setSubmitted(true);
    } catch {
      setErrors({ form: "We couldn't join the waitlist right now. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-[#050505] px-5 py-8 text-[#FAF8F4] sm:px-8 sm:py-10">
      <HairSweepDecoration />
      <div aria-hidden="true" className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full border border-[#D6A85A]/45 shadow-[0_0_80px_20px_rgba(214,168,90,0.22)]" />
      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[740px] flex-col items-center justify-center">
        <Link href="/" aria-label="Root & Foil home" className="focus:outline-none focus:ring-2 focus:ring-[#E8C477] focus:ring-offset-4 focus:ring-offset-black">
          <Image src="/assets/brand/root-foil-full-logo-transparent.png" alt="Root & Foil" width={1169} height={1157} priority className="h-auto w-[132px] object-contain sm:w-[152px]" />
        </Link>

        {submitted ? (
          <section className="mt-4 w-full max-w-[540px] rounded-[24px] border border-[#D6A85A]/45 bg-[#11100F]/90 px-6 py-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:px-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#E8C477] text-3xl text-[#E8C477]">✓</div>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-[#FAF8F4] sm:text-6xl">You&apos;re on the waitlist.</h1>
            <p className="mx-auto mt-5 max-w-sm text-base leading-7 text-[#DDD8D0]">We&apos;ll be in touch when early access opens.</p>
          </section>
        ) : (
          <>
            <header className="mt-2 text-center sm:mt-0">
              <h1 className="font-display text-[clamp(3rem,10vw,5.5rem)] font-semibold leading-[0.86] tracking-[-0.035em] text-[#FAF8F4]">Join the <span className="text-[#E1B45E]">waitlist</span></h1>
              <p className="mt-5 text-xl font-medium text-[#F2EEE8] sm:text-2xl">Get early access to Root &amp; Foil</p>
              <div aria-hidden="true" className="mx-auto mt-5 flex items-center justify-center gap-3 text-[#D6A85A]"><span className="h-px w-20 bg-current/70" />✦<span className="h-px w-20 bg-current/70" /></div>
              <p className="mx-auto mt-5 max-w-[630px] text-[15px] leading-6 text-[#D9D3CC] sm:text-base sm:leading-7">Root &amp; Foil is opening first to a small group of independent stylists and barbers. Be among the first to experience a simpler way to book, manage, and grow your business.</p>
            </header>

            <section aria-label="Root & Foil benefits" className="mt-8 grid w-full grid-cols-3 divide-x divide-[#D6A85A]/55 sm:mt-10">
              {valueProps.map(({ label, icon: Icon }) => <div key={label} className="flex flex-col items-center px-2 text-center"><Icon /><p className="mt-3 max-w-28 text-sm font-bold leading-4 text-[#FAF8F4] sm:text-base sm:leading-5">{label}</p></div>)}
            </section>

            <form className="mt-9 w-full max-w-[590px] space-y-5 sm:mt-10" onSubmit={handleSubmit} noValidate>
              <Field id="waitlist-full-name" label="Full Name" value={fullName} placeholder="Your full name" autoComplete="name" error={errors.fullName} onChange={(value) => { setFullName(value); if (errors.fullName) setErrors((current) => ({ ...current, fullName: undefined })); }} />
              <Field id="waitlist-email" label="Email Address" type="email" value={email} placeholder="you@example.com" autoComplete="email" error={errors.email} onChange={(value) => { setEmail(value); if (errors.email) setErrors((current) => ({ ...current, email: undefined })); }} />
              {errors.form ? <p role="alert" className="rounded-lg border border-red-300/60 bg-red-950/50 px-4 py-3 text-sm font-medium text-red-100">{errors.form}</p> : null}
              <button type="submit" disabled={submitting} className="h-14 w-full rounded-xl border border-[#F2C665] bg-gradient-to-b from-[#F4C868] via-[#C68A27] to-[#9D6318] px-6 text-lg font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_15px_35px_rgba(198,138,39,0.24)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#F2C665] focus:ring-offset-4 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70">{submitting ? "Joining..." : "Join the waitlist"}</button>
              <p className="text-center text-sm text-[#D9D3CC]">We&apos;ll email you when early access opens</p>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

function Field({ id, label, value, placeholder, onChange, autoComplete, error, type = "text" }: { id: string; label: string; value: string; placeholder: string; onChange: (value: string) => void; autoComplete: string; error?: string; type?: "text" | "email" }) {
  return <div><label htmlFor={id} className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#FAF8F4]">{label}</label><input id={id} type={type} value={value} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.value)} className="mt-2 h-14 w-full rounded-xl border border-[#E1B45E]/80 bg-[#FCFAF7] px-5 text-lg text-[#201B16] outline-none placeholder:text-[#77736D] focus:border-[#F2C665] focus:ring-4 focus:ring-[#D6A85A]/25" />{error ? <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-medium text-red-200">{error}</p> : null}</div>;
}

function CalendarIcon() { return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-12 w-12 text-[#E1B45E]" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="7" y="10" width="34" height="31" rx="5" /><path d="M7 20h34M16 5v10M32 5v10M15 28h.01M24 28h.01M33 28h.01M15 35h.01M24 35h.01M33 35h.01" strokeLinecap="round" /></svg>; }
function ClientsIcon() { return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-12 w-12 text-[#E1B45E]" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="24" cy="16" r="7" /><path d="M11 40v-3a13 13 0 0 1 26 0v3M7 30v-2a9 9 0 0 1 7-8.8M41 30v-2a9 9 0 0 0-7-8.8" strokeLinecap="round" /></svg>; }
function RebookIcon() { return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-12 w-12 text-[#E1B45E]" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M39 20a16 16 0 0 0-28-5M9 11v7h7M9 28a16 16 0 0 0 28 5M39 37v-7h-7" strokeLinecap="round" strokeLinejoin="round" /><rect x="16" y="17" width="16" height="15" rx="2" /><path d="m20 25 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

function HairSweepDecoration() {
  return <svg aria-hidden="true" viewBox="0 0 560 340" className="pointer-events-none absolute -left-10 -top-6 h-auto w-[min(72vw,560px)] opacity-95" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hair-gold" x1="15" y1="250" x2="420" y2="5" gradientUnits="userSpaceOnUse"><stop stopColor="#9C621D" stopOpacity="0" /><stop offset=".26" stopColor="#D89B32" /><stop offset=".52" stopColor="#FFF1B8" /><stop offset=".67" stopColor="#E8AD46" /><stop offset="1" stopColor="#8A5318" stopOpacity="0" /></linearGradient>
      <linearGradient id="hair-warm" x1="0" y1="310" x2="350" y2="10" gradientUnits="userSpaceOnUse"><stop stopColor="#AE7225" stopOpacity="0" /><stop offset=".42" stopColor="#F3BD58" /><stop offset=".74" stopColor="#FFF4C9" /><stop offset="1" stopColor="#C17C20" stopOpacity="0" /></linearGradient>
      <filter id="hair-glow" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="5" /></filter>
    </defs>
    <path d="M-18 274C72 106 158 36 311-3" stroke="#D79A31" strokeOpacity=".38" strokeWidth="18" filter="url(#hair-glow)" />
    <path d="M-20 280C74 110 166 39 330-5" stroke="url(#hair-gold)" strokeWidth="5" />
    <path d="M-12 220C101 102 190 59 411-2" stroke="url(#hair-warm)" strokeWidth="3" />
    <path d="M-4 181C119 88 246 62 483-20" stroke="url(#hair-gold)" strokeWidth="1.4" strokeOpacity=".9" />
    <path d="M16 78C96 16 173 1 267-14" stroke="url(#hair-warm)" strokeWidth="1.2" strokeOpacity=".65" />
  </svg>;
}
