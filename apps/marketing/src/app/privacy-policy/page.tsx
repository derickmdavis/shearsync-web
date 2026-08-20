import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | Root & Foil",
  description:
    "Read the Root & Foil Privacy Policy, including how we collect, use, protect, and handle personal information and SMS messaging consent.",
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

function PolicyParagraph({ children }: { children: ReactNode }) {
  return <p className={paragraphClassName}>{children}</p>;
}

function PolicyList({ items }: { items: string[] }) {
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

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F6F1E8] px-5 py-16 text-[#111111] sm:px-8 sm:py-20">
      <article className="mx-auto max-w-[860px] pb-12">
        <header className="border-b border-[rgba(200,164,107,0.45)] pb-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8A5528]">
            Root &amp; Foil LLC
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[0.94] tracking-[-0.035em] sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-sm font-semibold text-[#6B625A]">
            Effective Date: August 18, 2026
          </p>
        </header>

        <div className="mt-9">
          <PolicyParagraph>
            Root &amp; Foil LLC (“Root &amp; Foil,” “we,” “us,” or “our”) provides
            software and related services designed to help independent hair
            professionals manage their businesses, including client information,
            appointments, booking, notes, formulas, photos, reminders,
            communications, and business insights.
          </PolicyParagraph>
          <PolicyParagraph>
            This Privacy Policy explains how we collect, use, disclose, and
            protect information when you use Root &amp; Foil websites, mobile
            applications, booking pages, and related services (collectively, the
            “Services”).
          </PolicyParagraph>
          <PolicyParagraph>
            By using the Services, you acknowledge the practices described in
            this Privacy Policy.
          </PolicyParagraph>

          <section aria-labelledby="information-we-collect">
            <h2 id="information-we-collect" className={sectionTitleClassName}>
              1. Information We Collect
            </h2>
            <PolicyParagraph>
              We may collect the following categories of information.
            </PolicyParagraph>

            <h3 className={subsectionTitleClassName}>
              Account and Business Information
            </h3>
            <PolicyParagraph>
              When a hair professional creates or manages a Root &amp; Foil
              account, we may collect information such as:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Name",
                "Email address",
                "Phone number",
                "Business or professional name",
                "Business settings and preferences",
                "Account credentials and authentication information",
                "Subscription and billing-related information",
                "Booking preferences and availability",
              ]}
            />
            <PolicyParagraph>
              Payment card information used to purchase a Root &amp; Foil
              subscription may be processed directly by a third-party payment
              processor. Root &amp; Foil may receive limited billing information,
              such as payment status, transaction identifiers, or the last four
              digits of a payment method, rather than complete payment card
              details.
            </PolicyParagraph>

            <h3 className={subsectionTitleClassName}>Client Information</h3>
            <PolicyParagraph>
              Hair professionals may enter or collect information about their
              clients through the Services, including:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Name",
                "Phone number",
                "Email address",
                "Appointment history",
                "Booking information",
                "Client notes",
                "Hair formulas and service information",
                "Preferences",
                "Photos",
                "Rebooking information",
                "Communications preferences",
                "Referral information",
              ]}
            />
            <PolicyParagraph>
              Hair professionals are responsible for ensuring that they have an
              appropriate basis to collect and use information about their
              clients.
            </PolicyParagraph>

            <h3 className={subsectionTitleClassName}>Booking Information</h3>
            <PolicyParagraph>
              When a client interacts with a Root &amp; Foil booking page, we may
              collect information including:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Name",
                "Phone number",
                "Email address",
                "Requested or scheduled appointment information",
                "Service selections",
                "Booking preferences",
                "SMS and email communication preferences",
                "Information voluntarily submitted during the booking process",
              ]}
            />

            <h3 className={subsectionTitleClassName}>
              Photos and Other Content
            </h3>
            <PolicyParagraph>
              Users may upload photos, notes, formulas, and other information
              to the Services. We process this information to provide the
              features requested by the user.
            </PolicyParagraph>

            <h3 className={subsectionTitleClassName}>
              Usage and Device Information
            </h3>
            <PolicyParagraph>
              We may automatically collect certain technical information when
              the Services are used, including:
            </PolicyParagraph>
            <PolicyList
              items={[
                "IP address",
                "Browser type",
                "Device type",
                "Operating system",
                "App or website activity",
                "Pages or features accessed",
                "Approximate timestamps",
                "Error and diagnostic information",
                "Cookies or similar technologies",
              ]}
            />
            <PolicyParagraph>
              We use this information to operate, secure, maintain, and improve
              the Services.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="how-we-use-information">
            <h2 id="how-we-use-information" className={sectionTitleClassName}>
              2. How We Use Information
            </h2>
            <PolicyParagraph>We may use information to:</PolicyParagraph>
            <PolicyList
              items={[
                "Provide and operate Root & Foil",
                "Create and manage user accounts",
                "Facilitate appointments and booking",
                "Maintain client records and appointment history",
                "Store notes, formulas, photos, and preferences",
                "Send appointment confirmations and reminders",
                "Send service-related account communications",
                "Process subscription payments",
                "Provide customer support",
                "Personalize and improve the Services",
                "Analyze product performance and usage",
                "Protect against fraud, misuse, and security threats",
                "Troubleshoot errors and maintain reliability",
                "Comply with applicable laws and legal obligations",
              ]}
            />
            <PolicyParagraph>
              We may also use aggregated or de-identified information that does
              not reasonably identify an individual to understand product usage,
              improve Root &amp; Foil, and develop new features.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="sms-messaging">
            <h2 id="sms-messaging" className={sectionTitleClassName}>
              3. SMS Messaging and Mobile Information
            </h2>
            <PolicyParagraph>
              Root &amp; Foil may facilitate transactional text messages between
              hair professionals and clients who have consented to receive SMS
              communications.
            </PolicyParagraph>
            <PolicyParagraph>These messages may include:</PolicyParagraph>
            <PolicyList
              items={[
                "Appointment confirmations",
                "Appointment reminders",
                "Appointment changes",
                "Cancellation or rescheduling information",
                "Other appointment-related or customer-service communications",
              ]}
            />
            <PolicyParagraph>
              <strong className="text-[#111111]">
                Message frequency varies based on appointment activity. Message
                and data rates may apply.
              </strong>
            </PolicyParagraph>
            <PolicyParagraph>
              Recipients may reply <strong>STOP</strong> to opt out of SMS
              messages and <strong>HELP</strong> for assistance.
            </PolicyParagraph>
            <PolicyParagraph>
              Consent to receive SMS messages is not a condition of purchasing
              goods or services.
            </PolicyParagraph>

            <h3 className={subsectionTitleClassName}>
              Mobile Information Sharing
            </h3>
            <PolicyParagraph>
              <strong className="text-[#111111]">
                We do not share, sell, rent, transfer, or provide mobile phone
                numbers, SMS opt-in data, or messaging consent information to
                third parties or affiliates for marketing or promotional
                purposes.
              </strong>
            </PolicyParagraph>
            <PolicyParagraph>
              We may disclose mobile information to service providers solely as
              necessary to provide messaging services, such as SMS delivery
              infrastructure. These providers may use the information only to
              perform services for Root &amp; Foil and may not use or disclose it
              for their own marketing or promotional purposes.
            </PolicyParagraph>
            <PolicyParagraph>
              SMS opt-in consent and related records are not transferred to
              third parties for marketing or promotional purposes.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="email-communications">
            <h2 id="email-communications" className={sectionTitleClassName}>
              4. Email Communications
            </h2>
            <PolicyParagraph>
              We may send transactional or service-related emails, including
              appointment confirmations, reminders, account notices, security
              notices, and administrative communications.
            </PolicyParagraph>
            <PolicyParagraph>
              Where required, users may unsubscribe from non-essential or
              promotional email communications using the unsubscribe method
              provided in the message.
            </PolicyParagraph>
            <PolicyParagraph>
              Certain administrative or service-related communications may be
              necessary to operate an account and cannot be opted out of while
              the account remains active.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="how-we-share-information">
            <h2 id="how-we-share-information" className={sectionTitleClassName}>
              5. How We Share Information
            </h2>
            <h3 className={subsectionTitleClassName}>SMS DATA EXCLUSION</h3>
            <PolicyParagraph>
              Notwithstanding anything else in this Privacy Policy, mobile
              phone numbers, text messaging originator opt-in data, SMS consent
              records, and messaging consent information will not be shared,
              sold, rented, transferred, or provided to third parties or
              affiliates for marketing or promotional purposes.
            </PolicyParagraph>
            <PolicyParagraph>
              The sharing categories described below expressly exclude SMS
              opt-in and messaging consent data for marketing or promotional
              use.
            </PolicyParagraph>
            <PolicyParagraph>We do not sell personal information.</PolicyParagraph>
            <PolicyParagraph>
              We may share information in the following limited circumstances.
            </PolicyParagraph>

            <h3 className={subsectionTitleClassName}>Service Providers</h3>
            <PolicyParagraph>
              We may use third-party companies to help operate Root &amp; Foil,
              including providers of:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Cloud hosting",
                "Database and file storage",
                "Authentication",
                "Communications and SMS delivery",
                "Email delivery",
                "Payment processing",
                "Analytics",
                "Error monitoring",
                "Customer support",
                "Infrastructure and security",
              ]}
            />
            <PolicyParagraph>
              These providers receive information only as reasonably necessary
              to perform services for us and are subject to appropriate
              contractual or legal obligations.
            </PolicyParagraph>

            <h3 className={subsectionTitleClassName}>
              At the Direction of Users
            </h3>
            <PolicyParagraph>
              A hair professional may direct Root &amp; Foil to use or disclose
              information through features of the Services, such as appointment
              communications, booking pages, or integrations.
            </PolicyParagraph>

            <h3 className={subsectionTitleClassName}>
              Legal and Safety Requirements
            </h3>
            <PolicyParagraph>
              We may disclose information if reasonably necessary to:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Comply with applicable law, regulation, legal process, or governmental request",
                "Protect the rights, property, or safety of Root & Foil, our users, clients, or others",
                "Detect or prevent fraud, abuse, security incidents, or illegal activity",
                "Enforce our Terms of Service",
              ]}
            />

            <h3 className={subsectionTitleClassName}>Business Transfers</h3>
            <PolicyParagraph>
              If Root &amp; Foil is involved in a merger, financing, acquisition,
              restructuring, sale of assets, or similar business transaction,
              information may be transferred as part of that transaction,
              subject to applicable law.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="hair-professionals-and-clients">
            <h2
              id="hair-professionals-and-clients"
              className={sectionTitleClassName}
            >
              6. Hair Professionals and Their Clients
            </h2>
            <PolicyParagraph>
              Root &amp; Foil provides tools used by independent hair
              professionals to manage their own client relationships.
            </PolicyParagraph>
            <PolicyParagraph>
              For certain client information stored within a professional&apos;s
              account, the hair professional determines what information is
              collected and how it is used. Root &amp; Foil processes that
              information to provide the Services.
            </PolicyParagraph>
            <PolicyParagraph>
              Clients with questions about information maintained by a
              particular hair professional should generally contact that
              professional directly. We may assist with privacy requests when
              appropriate.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="data-retention">
            <h2 id="data-retention" className={sectionTitleClassName}>
              7. Data Retention
            </h2>
            <PolicyParagraph>
              We retain information for as long as reasonably necessary to:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Provide the Services",
                "Maintain an active account",
                "Fulfill the purposes described in this Privacy Policy",
                "Resolve disputes",
                "Maintain security and fraud-prevention records",
                "Comply with legal, tax, accounting, or regulatory requirements",
              ]}
            />
            <PolicyParagraph>
              Information may remain in backups for a limited period after
              deletion as part of normal backup and disaster-recovery processes.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="data-security">
            <h2 id="data-security" className={sectionTitleClassName}>
              8. Data Security
            </h2>
            <PolicyParagraph>
              We use reasonable administrative, technical, and organizational
              measures designed to protect information against unauthorized
              access, alteration, disclosure, or destruction.
            </PolicyParagraph>
            <PolicyParagraph>
              However, no internet-based service or method of electronic storage
              can guarantee absolute security.
            </PolicyParagraph>
            <PolicyParagraph>
              Users are responsible for protecting their account credentials and
              notifying us if they believe their account has been compromised.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="choices-and-rights">
            <h2 id="choices-and-rights" className={sectionTitleClassName}>
              9. Your Choices and Rights
            </h2>
            <PolicyParagraph>
              Depending on your location, you may have rights relating to your
              personal information, including the right to request:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Access to personal information",
                "Correction of inaccurate information",
                "Deletion of certain information",
                "A copy of certain information",
                "Information about how personal information is used or disclosed",
              ]}
            />
            <PolicyParagraph>
              To submit a privacy request, contact us at <ContactEmail />.
            </PolicyParagraph>
            <PolicyParagraph>
              We may need to verify your identity before fulfilling certain
              requests.
            </PolicyParagraph>
            <PolicyParagraph>
              If your information is maintained by a hair professional using
              Root &amp; Foil, we may direct you to that professional or coordinate
              with them to address your request.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="sms-opt-out">
            <h2 id="sms-opt-out" className={sectionTitleClassName}>
              10. SMS Opt-Out
            </h2>
            <PolicyParagraph>
              You may opt out of Root &amp; Foil-facilitated SMS messages at any
              time by replying <strong>STOP</strong> to a message.
            </PolicyParagraph>
            <PolicyParagraph>
              After opting out, you may receive a confirmation of the opt-out.
              You will not receive additional SMS messages unless you
              subsequently provide consent again where permitted.
            </PolicyParagraph>
            <PolicyParagraph>
              For assistance, reply <strong>HELP</strong> or contact{" "}
              <ContactEmail />.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className={sectionTitleClassName}>
              11. Cookies and Similar Technologies
            </h2>
            <PolicyParagraph>
              Our websites may use cookies and similar technologies to:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Maintain sessions",
                "Remember preferences",
                "Improve security",
                "Understand how the Services are used",
                "Diagnose technical problems",
              ]}
            />
            <PolicyParagraph>
              Browser settings may allow you to block or delete cookies. Certain
              portions of the Services may not function properly if required
              cookies are disabled.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="childrens-privacy">
            <h2 id="childrens-privacy" className={sectionTitleClassName}>
              12. Children&apos;s Privacy
            </h2>
            <PolicyParagraph>
              Root &amp; Foil is designed for business users and their clients and
              is not intended for children under 13.
            </PolicyParagraph>
            <PolicyParagraph>
              We do not knowingly collect personal information directly from
              children under 13 through account registration. If we become aware
              that such information has been collected in violation of
              applicable law, we will take appropriate steps to delete it.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="third-party-services">
            <h2 id="third-party-services" className={sectionTitleClassName}>
              13. Third-Party Services and Links
            </h2>
            <PolicyParagraph>
              The Services may contain links to or integrate with third-party
              services.
            </PolicyParagraph>
            <PolicyParagraph>
              Third-party websites and services operate under their own privacy
              practices, and Root &amp; Foil is not responsible for those practices.
              We encourage users to review the privacy policies of third-party
              services they use.
            </PolicyParagraph>
          </section>

          <section aria-labelledby="changes-to-policy">
            <h2 id="changes-to-policy" className={sectionTitleClassName}>
              14. Changes to This Privacy Policy
            </h2>
            <PolicyParagraph>
              We may update this Privacy Policy periodically.
            </PolicyParagraph>
            <PolicyParagraph>
              When we make changes, we will update the Effective Date at the
              top of this page. If changes are material, we may provide
              additional notice through the Services or by other appropriate
              means.
            </PolicyParagraph>
            <PolicyParagraph>
              Continued use of the Services after an updated Privacy Policy
              becomes effective constitutes acknowledgment of the updated policy
              to the extent permitted by law.
            </PolicyParagraph>
          </section>
        </div>
      </article>
    </main>
  );
}
