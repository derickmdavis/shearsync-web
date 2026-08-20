import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms of Service | Root & Foil",
  description: "Read the terms that govern use of Root & Foil services.",
  robots: {
    index: true,
    follow: true,
  },
};

const sectionTitleClassName =
  "mt-12 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#111111] sm:text-4xl";
const subsectionTitleClassName =
  "mt-8 text-lg font-extrabold tracking-[-0.01em] text-[#111111] sm:text-xl";
const paragraphClassName = "mt-4 text-base leading-7 text-[#4F4A45] sm:text-[17px]";
const listClassName =
  "mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-[#4F4A45] sm:text-[17px]";

function TermsParagraph({ children }: { children: ReactNode }) {
  return <p className={paragraphClassName}>{children}</p>;
}

function TermsList({ items }: { items: string[] }) {
  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ContactEmail() {
  return (
    <a
      href="mailto:hello@rootfoil.com"
      className="font-semibold text-[#4A3728] underline decoration-[#B07A3E]/60 underline-offset-4 transition-colors hover:text-[#B07A3E]"
    >
      hello@rootfoil.com
    </a>
  );
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#F6F1E8] px-5 py-16 text-[#111111] sm:px-8 sm:py-20">
      <article className="mx-auto max-w-[860px] pb-12">
        <header className="border-b border-[rgba(200,164,107,0.45)] pb-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8A5528]">
            Root &amp; Foil LLC
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[0.94] tracking-[-0.035em] sm:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-5 text-sm font-semibold text-[#6B625A]">
            Effective Date: August 18, 2026
          </p>
        </header>

        <div className="mt-9">
          <TermsParagraph>
            These Terms of Service (“Terms”) govern access to and use of the
            websites, mobile applications, booking pages, software, and related
            services provided by Root &amp; Foil LLC (“Root &amp; Foil,” “we,” “us,” or
            “our”), collectively referred to as the “Services.”
          </TermsParagraph>
          <TermsParagraph>
            By creating an account, accessing the Services, or otherwise using
            Root &amp; Foil, you agree to these Terms.
          </TermsParagraph>
          <TermsParagraph>
            If you do not agree to these Terms, do not use the Services.
          </TermsParagraph>

          <section aria-labelledby="about-root-and-foil">
            <h2 id="about-root-and-foil" className={sectionTitleClassName}>
              1. About Root &amp; Foil
            </h2>
            <TermsParagraph>
              Root &amp; Foil provides software tools designed to help independent
              hair professionals manage aspects of their businesses.
            </TermsParagraph>
            <TermsParagraph>Features may include:</TermsParagraph>
            <TermsList
              items={[
                "Client management",
                "Appointment scheduling and booking",
                "Client notes",
                "Hair formulas",
                "Client photos",
                "Appointment history",
                "Reminders and notifications",
                "Referral tools",
                "Business insights",
                "Communications tools",
                "Other business-management features",
              ]}
            />
            <TermsParagraph>
              Features may change over time as the Services evolve.
            </TermsParagraph>
          </section>

          <section aria-labelledby="eligibility-and-accounts">
            <h2 id="eligibility-and-accounts" className={sectionTitleClassName}>
              2. Eligibility and Accounts
            </h2>
            <TermsParagraph>
              You must be legally capable of entering into a binding agreement
              to create a Root &amp; Foil account.
            </TermsParagraph>
            <TermsParagraph>
              You agree to provide accurate information and keep your account
              information reasonably current.
            </TermsParagraph>
            <TermsParagraph>You are responsible for:</TermsParagraph>
            <TermsList
              items={[
                "Maintaining the confidentiality of your login credentials",
                "Activity occurring through your account",
                "Limiting access to authorized users",
                "Promptly notifying us of suspected unauthorized access",
              ]}
            />
            <TermsParagraph>
              You may not share an account in a manner that circumvents account
              or subscription limits.
            </TermsParagraph>
          </section>

          <section aria-labelledby="business-and-client-relationships">
            <h2
              id="business-and-client-relationships"
              className={sectionTitleClassName}
            >
              3. Your Business and Client Relationships
            </h2>
            <TermsParagraph>
              Root &amp; Foil provides software tools. We do not operate your hair
              business and are not a party to the relationship between a hair
              professional and their clients.
            </TermsParagraph>
            <TermsParagraph>Hair professionals are responsible for:</TermsParagraph>
            <TermsList
              items={[
                "Services they provide to clients",
                "Prices and fees they charge",
                "Appointment policies",
                "Cancellation policies",
                "Refund policies",
                "Client communications",
                "Obtaining legally required consents",
                "Maintaining appropriate licenses or professional qualifications",
                "Compliance with laws applicable to their business",
              ]}
            />
            <TermsParagraph>
              Root &amp; Foil does not guarantee appointments, revenue, client
              retention, business growth, or any particular business outcome.
            </TermsParagraph>
          </section>

          <section aria-labelledby="client-information-and-user-content">
            <h2
              id="client-information-and-user-content"
              className={sectionTitleClassName}
            >
              4. Client Information and User Content
            </h2>
            <TermsParagraph>
              Users may enter, upload, store, or otherwise provide information
              through the Services, including client records, notes, formulas,
              photos, appointment information, and other content (“User
              Content”).
            </TermsParagraph>
            <TermsParagraph>You retain ownership of your User Content.</TermsParagraph>
            <TermsParagraph>
              You grant Root &amp; Foil a limited license to host, store, process,
              reproduce, transmit, and otherwise use User Content as reasonably
              necessary to provide, secure, maintain, and improve the Services.
            </TermsParagraph>
            <TermsParagraph>
              You represent that you have the rights and permissions necessary
              to provide User Content to Root &amp; Foil and to instruct us to
              process it.
            </TermsParagraph>
            <TermsParagraph>
              You are responsible for ensuring that your collection and use of
              client information complies with applicable law.
            </TermsParagraph>
          </section>

          <section aria-labelledby="appointment-booking">
            <h2 id="appointment-booking" className={sectionTitleClassName}>
              5. Appointment Booking
            </h2>
            <TermsParagraph>
              Root &amp; Foil may provide booking tools that allow clients to
              request or schedule appointments with hair professionals.
            </TermsParagraph>
            <TermsParagraph>Root &amp; Foil does not guarantee:</TermsParagraph>
            <TermsList
              items={[
                "Appointment availability",
                "Acceptance of appointment requests",
                "Completion of services",
                "The quality of services provided",
                "A client's attendance at an appointment",
                "Payment by a client",
              ]}
            />
            <TermsParagraph>
              The hair professional remains responsible for appointment policies
              and fulfillment.
            </TermsParagraph>
          </section>

          <section aria-labelledby="sms-messaging-terms">
            <h2 id="sms-messaging-terms" className={sectionTitleClassName}>
              6. SMS Messaging Terms
            </h2>
            <TermsParagraph>
              Root &amp; Foil may facilitate transactional SMS communications
              between hair professionals and clients who have opted in to
              receive text messages.
            </TermsParagraph>
            <TermsParagraph>Messages may include:</TermsParagraph>
            <TermsList
              items={[
                "Booking confirmations",
                "Appointment reminders",
                "Appointment changes",
                "Cancellation or rescheduling information",
                "Customer-service or other appointment-related communications",
              ]}
            />
            <TermsParagraph>
              <strong className="text-[#111111]">
                Message frequency varies depending on appointment activity.
                Message and data rates may apply.
              </strong>
            </TermsParagraph>
            <TermsParagraph>
              Consent to receive SMS messages is not a condition of purchasing
              goods or services.
            </TermsParagraph>

            <h3 className={subsectionTitleClassName}>Opting Out</h3>
            <TermsParagraph>
              Recipients may opt out of SMS messages at any time by replying:
            </TermsParagraph>
            <TermsParagraph>
              <strong className="text-[#111111]">STOP</strong>
            </TermsParagraph>
            <TermsParagraph>
              After an opt-out request, a recipient may receive one final
              message confirming that the opt-out was processed.
            </TermsParagraph>
            <TermsParagraph>
              The recipient will not receive additional SMS messages unless they
              subsequently provide consent again where permitted.
            </TermsParagraph>

            <h3 className={subsectionTitleClassName}>Getting Help</h3>
            <TermsParagraph>Recipients may reply:</TermsParagraph>
            <TermsParagraph>
              <strong className="text-[#111111]">HELP</strong>
            </TermsParagraph>
            <TermsParagraph>
              for assistance or contact <ContactEmail />.
            </TermsParagraph>

            <h3 className={subsectionTitleClassName}>Carrier Responsibility</h3>
            <TermsParagraph>
              Wireless carriers are not liable for delayed or undelivered
              messages.
            </TermsParagraph>
            <TermsParagraph>
              Delivery of SMS messages is subject to wireless carrier networks,
              availability, filtering, and other factors outside Root &amp; Foil&apos;s
              control.
            </TermsParagraph>

            <h3 className={subsectionTitleClassName}>Mobile Information</h3>
            <TermsParagraph>
              Mobile phone numbers, SMS consent records, and SMS opt-in
              information will not be sold, rented, or shared with third parties
              or affiliates for their own marketing or promotional purposes.
            </TermsParagraph>
            <TermsParagraph>
              Information may be provided to communications providers and other
              service providers solely as necessary to operate and deliver the
              messaging service.
            </TermsParagraph>
            <TermsParagraph>
              Additional information about our handling of personal information
              is available in our Privacy Policy.
            </TermsParagraph>
          </section>

          <section aria-labelledby="email-and-other-communications">
            <h2
              id="email-and-other-communications"
              className={sectionTitleClassName}
            >
              7. Email and Other Communications
            </h2>
            <TermsParagraph>
              By providing contact information, you authorize Root &amp; Foil to
              send communications necessary to operate the Services, including:
            </TermsParagraph>
            <TermsList
              items={[
                "Account notices",
                "Security notices",
                "Appointment-related messages",
                "Service updates",
                "Billing or subscription notices",
                "Support communications",
              ]}
            />
            <TermsParagraph>
              Where required by law, marketing communications will include an
              appropriate method of opting out.
            </TermsParagraph>
          </section>

          <section aria-labelledby="subscriptions-and-fees">
            <h2 id="subscriptions-and-fees" className={sectionTitleClassName}>
              8. Subscriptions and Fees
            </h2>
            <TermsParagraph>
              Certain Root &amp; Foil features may require a paid subscription.
            </TermsParagraph>
            <TermsParagraph>
              Current pricing and subscription terms will be presented before
              purchase.
            </TermsParagraph>
            <TermsParagraph>
              By purchasing a recurring subscription, you authorize the
              applicable payment provider to charge the selected payment method
              according to the billing frequency shown at checkout until the
              subscription is canceled.
            </TermsParagraph>
            <TermsParagraph>
              You are responsible for applicable taxes unless otherwise stated.
            </TermsParagraph>
            <TermsParagraph>
              We may change pricing for future billing periods. Where required,
              we will provide advance notice before a pricing change applies to
              an existing subscription.
            </TermsParagraph>
          </section>

          <section aria-labelledby="cancellation">
            <h2 id="cancellation" className={sectionTitleClassName}>
              9. Cancellation
            </h2>
            <TermsParagraph>
              You may cancel a Root &amp; Foil subscription through the methods
              made available within the Services or by contacting us.
            </TermsParagraph>
            <TermsParagraph>
              Unless otherwise stated at the time of purchase or required by
              applicable law:
            </TermsParagraph>
            <TermsList
              items={[
                "Cancellation stops future renewal charges.",
                "Access to paid features may continue through the end of the current paid billing period.",
                "Previously paid fees are not automatically prorated or refunded solely because of cancellation.",
              ]}
            />
            <TermsParagraph>
              Deleting an application from a device does not necessarily cancel
              a subscription.
            </TermsParagraph>
          </section>

          <section aria-labelledby="trials-and-promotional-offers">
            <h2
              id="trials-and-promotional-offers"
              className={sectionTitleClassName}
            >
              10. Trials and Promotional Offers
            </h2>
            <TermsParagraph>
              We may offer trials, discounts, credits, or promotional access.
            </TermsParagraph>
            <TermsParagraph>
              Eligibility, duration, and conditions may vary and will be
              disclosed when the offer is presented.
            </TermsParagraph>
            <TermsParagraph>
              We may modify or discontinue promotional offers at any time,
              subject to applicable law.
            </TermsParagraph>
          </section>

          <section aria-labelledby="third-party-payment-services">
            <h2
              id="third-party-payment-services"
              className={sectionTitleClassName}
            >
              11. Third-Party Payment Services
            </h2>
            <TermsParagraph>
              Root &amp; Foil may allow hair professionals to display or use links,
              QR codes, or integrations associated with third-party payment
              services.
            </TermsParagraph>
            <TermsParagraph>
              Unless expressly stated otherwise, Root &amp; Foil does not process
              or hold funds exchanged between hair professionals and their
              clients.
            </TermsParagraph>
            <TermsParagraph>
              Transactions conducted through third-party payment services are
              governed by the terms of those providers.
            </TermsParagraph>
            <TermsParagraph>Root &amp; Foil is not responsible for:</TermsParagraph>
            <TermsList
              items={[
                "Payment disputes between professionals and clients",
                "Third-party transaction fees",
                "Payment provider outages",
                "Chargebacks",
                "Payment-provider account restrictions",
                "Errors or actions of a third-party payment provider",
              ]}
            />
          </section>

          <section aria-labelledby="third-party-services">
            <h2 id="third-party-services" className={sectionTitleClassName}>
              12. Third-Party Services
            </h2>
            <TermsParagraph>
              Root &amp; Foil may integrate with or depend on third-party services,
              infrastructure, software, or platforms.
            </TermsParagraph>
            <TermsParagraph>
              Your use of certain third-party services may be subject to
              separate terms and privacy policies.
            </TermsParagraph>
            <TermsParagraph>
              We are not responsible for third-party services that we do not
              control.
            </TermsParagraph>
          </section>

          <section aria-labelledby="acceptable-use">
            <h2 id="acceptable-use" className={sectionTitleClassName}>
              13. Acceptable Use
            </h2>
            <TermsParagraph>You may not use the Services to:</TermsParagraph>
            <TermsList
              items={[
                "Violate applicable law",
                "Infringe intellectual property or privacy rights",
                "Send spam or unlawful communications",
                "Send SMS messages without appropriate consent",
                "Harass, threaten, or abuse another person",
                "Upload malicious code",
                "Attempt unauthorized access to accounts, systems, or data",
                "Interfere with the operation or security of the Services",
                "Scrape or extract data in an unauthorized manner",
                "Reverse engineer the Services except where applicable law expressly permits it",
                "Use the Services for fraudulent or deceptive activity",
              ]}
            />
            <TermsParagraph>
              We may restrict or suspend access when we reasonably believe use
              of the Services violates these Terms or poses a security, legal,
              or operational risk.
            </TermsParagraph>
          </section>

          <section aria-labelledby="intellectual-property">
            <h2 id="intellectual-property" className={sectionTitleClassName}>
              14. Intellectual Property
            </h2>
            <TermsParagraph>
              Root &amp; Foil and its licensors own the Services, including
              software, designs, branding, graphics, interfaces, documentation,
              and other materials provided by Root &amp; Foil, excluding User
              Content.
            </TermsParagraph>
            <TermsParagraph>
              These Terms do not transfer ownership of Root &amp; Foil intellectual
              property to you.
            </TermsParagraph>
            <TermsParagraph>
              Subject to these Terms, we grant you a limited, non-exclusive,
              non-transferable, revocable right to use the Services for their
              intended purpose.
            </TermsParagraph>
          </section>

          <section aria-labelledby="feedback">
            <h2 id="feedback" className={sectionTitleClassName}>
              15. Feedback
            </h2>
            <TermsParagraph>
              If you provide ideas, suggestions, feedback, or recommendations
              regarding Root &amp; Foil, you permit us to use that feedback without
              restriction or compensation to you.
            </TermsParagraph>
          </section>

          <section aria-labelledby="availability-and-changes">
            <h2
              id="availability-and-changes"
              className={sectionTitleClassName}
            >
              16. Availability and Changes to the Services
            </h2>
            <TermsParagraph>
              We work to provide reliable Services, but we do not guarantee
              uninterrupted or error-free operation.
            </TermsParagraph>
            <TermsParagraph>We may:</TermsParagraph>
            <TermsList
              items={[
                "Add or remove features",
                "Change functionality",
                "Perform maintenance",
                "Modify integrations",
                "Discontinue portions of the Services",
              ]}
            />
            <TermsParagraph>
              Where reasonably practicable, we will attempt to provide notice of
              significant changes that materially affect paid users.
            </TermsParagraph>
          </section>

          <section aria-labelledby="suspension-and-termination">
            <h2
              id="suspension-and-termination"
              className={sectionTitleClassName}
            >
              17. Suspension and Termination
            </h2>
            <TermsParagraph>
              You may stop using Root &amp; Foil at any time.
            </TermsParagraph>
            <TermsParagraph>We may suspend or terminate access if:</TermsParagraph>
            <TermsList
              items={[
                "You materially violate these Terms",
                "Payment remains overdue",
                "Your activity creates security or legal risk",
                "Your use could harm Root & Foil, other users, clients, or third parties",
                "We are required to do so by law",
              ]}
            />
            <TermsParagraph>
              Upon termination, rights granted under these Terms end.
            </TermsParagraph>
            <TermsParagraph>
              Certain provisions that by their nature should survive termination
              will continue to apply, including provisions relating to
              intellectual property, disclaimers, liability, and disputes.
            </TermsParagraph>
          </section>

          <section aria-labelledby="disclaimer-of-warranties">
            <h2
              id="disclaimer-of-warranties"
              className={sectionTitleClassName}
            >
              18. Disclaimer of Warranties
            </h2>
            <TermsParagraph>
              To the maximum extent permitted by law, the Services are provided{" "}
              <strong className="text-[#111111]">“as is” and “as available.”</strong>
            </TermsParagraph>
            <TermsParagraph>
              Root &amp; Foil disclaims warranties of merchantability, fitness for
              a particular purpose, non-infringement, and any warranties arising
              from course of dealing or usage of trade to the extent permitted by
              applicable law.
            </TermsParagraph>
            <TermsParagraph>We do not warrant that:</TermsParagraph>
            <TermsList
              items={[
                "The Services will always be available",
                "The Services will be error-free",
                "All messages or notifications will be delivered",
                "Data will never be lost",
                "Use of Root & Foil will produce any particular business result",
              ]}
            />
            <TermsParagraph>
              Nothing in these Terms limits warranties or rights that cannot
              legally be excluded.
            </TermsParagraph>
          </section>

          <section aria-labelledby="limitation-of-liability">
            <h2
              id="limitation-of-liability"
              className={sectionTitleClassName}
            >
              19. Limitation of Liability
            </h2>
            <TermsParagraph>
              To the maximum extent permitted by applicable law, Root &amp; Foil
              and its owners, employees, contractors, and affiliates will not be
              liable for indirect, incidental, special, consequential, exemplary,
              or punitive damages arising from or related to the Services.
            </TermsParagraph>
            <TermsParagraph>
              This includes, without limitation, loss of revenue, profits,
              business opportunities, goodwill, or data.
            </TermsParagraph>
            <TermsParagraph>
              To the maximum extent permitted by law, Root &amp; Foil&apos;s aggregate
              liability arising from or relating to the Services will not exceed
              the amount you paid to Root &amp; Foil during the twelve months
              immediately preceding the event giving rise to the claim.
            </TermsParagraph>
            <TermsParagraph>
              Some jurisdictions do not allow certain limitations of liability,
              so portions of this section may not apply to you.
            </TermsParagraph>
          </section>

          <section aria-labelledby="indemnification">
            <h2 id="indemnification" className={sectionTitleClassName}>
              20. Indemnification
            </h2>
            <TermsParagraph>
              To the extent permitted by law, you agree to indemnify and hold
              harmless Root &amp; Foil and its owners, employees, contractors, and
              affiliates from third-party claims, damages, losses, liabilities,
              and reasonable expenses arising from:
            </TermsParagraph>
            <TermsList
              items={[
                "Your misuse of the Services",
                "Your violation of these Terms",
                "Your violation of applicable law",
                "Your User Content",
                "Your relationship or dispute with a client",
                "Communications you initiate without legally required consent",
              ]}
            />
          </section>

          <section aria-labelledby="governing-law">
            <h2 id="governing-law" className={sectionTitleClassName}>
              21. Governing Law
            </h2>
            <TermsParagraph>
              These Terms are governed by the laws of the State of Colorado,
              without regard to conflict-of-law principles, except where
              applicable law requires otherwise.
            </TermsParagraph>
          </section>

          <section aria-labelledby="changes-to-terms">
            <h2 id="changes-to-terms" className={sectionTitleClassName}>
              22. Changes to These Terms
            </h2>
            <TermsParagraph>
              We may update these Terms periodically.
            </TermsParagraph>
            <TermsParagraph>
              When we make changes, we will update the Effective Date above.
            </TermsParagraph>
            <TermsParagraph>
              If a change materially affects users, we may provide additional
              notice through the Services, by email, or through another
              appropriate method.
            </TermsParagraph>
            <TermsParagraph>
              Continued use of the Services after revised Terms become effective
              constitutes acceptance of the revised Terms to the extent permitted
              by law.
            </TermsParagraph>
          </section>

          <section aria-labelledby="entire-agreement">
            <h2 id="entire-agreement" className={sectionTitleClassName}>
              23. Entire Agreement
            </h2>
            <TermsParagraph>
              These Terms, together with the Privacy Policy and any additional
              terms presented for specific features or purchases, constitute the
              agreement between you and Root &amp; Foil relating to the Services.
            </TermsParagraph>
            <TermsParagraph>
              If any provision is found unenforceable, the remaining provisions
              will remain in effect.
            </TermsParagraph>
            <TermsParagraph>
              Our failure to enforce a provision does not waive our right to
              enforce it later.
            </TermsParagraph>
          </section>

          <section aria-labelledby="contact-us">
            <h2 id="contact-us" className={sectionTitleClassName}>
              24. Contact Us
            </h2>
            <TermsParagraph>
              Questions regarding these Terms may be sent to:
            </TermsParagraph>
            <address className={`${paragraphClassName} not-italic`}>
              <strong className="text-[#111111]">Root &amp; Foil LLC</strong>
              <br />
              Email: <ContactEmail />
              <br />
              Website: <strong className="text-[#111111]">rootfoil.com</strong>
            </address>
          </section>
        </div>
      </article>
    </main>
  );
}
