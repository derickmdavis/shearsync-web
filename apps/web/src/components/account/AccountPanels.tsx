import { Fragment, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import type {
  AccountPlan,
  AccountProfile,
  Customer,
  ReferralLink,
  ReferralStats,
} from "@/src/lib/api";
import {
  accountNavItems,
  featureLabels,
  planNotes,
  type AccountTab,
  type AuthMode,
  type ClientReferralLoadState,
  type ClientsLoadState,
  type ProfileForm,
  type PublicProfileForm,
} from "@/src/components/account/account-types";

export function AccountSideNav({
  activeTab,
  onTabChange,
}: {
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
}) {
  return (
    <nav
      aria-label="Account management"
      className="bg-[#111111] p-4 text-white lg:flex lg:min-h-full lg:flex-col lg:p-6"
    >
      <div className="mb-5 flex items-center gap-3 lg:mb-8">
        <Image
          src="/assets/brand/dripdesk-chair-mark.png"
          alt=""
          width={416}
          height={473}
          aria-hidden="true"
          className="h-8 w-auto object-contain"
        />
        <span className="font-display text-2xl font-semibold text-white">
          DripDesk
        </span>
      </div>

      <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {accountNavItems.map((item) => (
          <li key={item.label} className="w-full">
            <button
              type="button"
              onClick={() => onTabChange(item.id)}
              aria-current={activeTab === item.id ? "page" : undefined}
              className={[
                "flex h-11 w-full min-w-max items-center gap-3 rounded-[8px] px-4 text-left text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/35",
                activeTab === item.id
                  ? "bg-white/10 text-white"
                  : "text-white/68 hover:bg-white/[0.06] hover:text-white",
              ].join(" ")}
            >
              <AccountNavIcon id={item.id} />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function AccountNavIcon({ id }: { id: AccountTab }) {
  const commonProps = {
    className: "h-5 w-5 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (id === "dashboard") {
    return (
      <svg {...commonProps}>
        <path d="M4 13h7V4H4v9Zm9 7h7V4h-7v16ZM4 20h7v-5H4v5Z" />
      </svg>
    );
  }

  if (id === "clients") {
    return (
      <svg {...commonProps}>
        <path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.5 19c.6-3.1 2.1-5 4.5-5s3.9 1.9 4.5 5M11.5 19c.6-3.1 2.1-5 4.5-5s3.9 1.9 4.5 5" />
      </svg>
    );
  }

  if (id === "appointments") {
    return (
      <svg {...commonProps}>
        <path d="M7 3v4M17 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Zm4 8h4m-4 4h7" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c.9-4.1 3.4-6 7.5-6s6.6 1.9 7.5 6" />
    </svg>
  );
}

export function DashboardTabPanel({
  profile,
  plan,
}: {
  profile: AccountProfile;
  plan: AccountPlan;
}) {
  const displayName = profile.full_name || profile.business_name || "Your chair";
  const metrics = [
    {
      label: "Revenue",
      value: "$1,165",
      detail: "+10% from last week",
    },
    {
      label: "Appointments",
      value: "24",
      detail: "+9% from last week",
    },
    {
      label: "Rebooking Rate",
      value: "81%",
      detail: "+12% from last week",
    },
    {
      label: "Upcoming Income",
      value: "$415.50",
      detail: "In next 7 days",
    },
  ];
  const appointments = [
    ["9:00 AM", "Jalen R."],
    ["10:30 AM", "Marcus T."],
    ["12:00 PM", "Derrick S."],
    ["1:30 PM", "Chris B."],
    ["3:00 PM", "DeAndre J."],
  ];
  const bars = [32, 50, 66, 48, 60, 88, 56];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]"
          >
            <p className="text-sm font-extrabold text-[#1C1C1E]">
              {metric.label}
            </p>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-[#111111]">
              {metric.value}
            </p>
            <p className="mt-2 text-xs font-bold text-[#15803D]">
              {metric.detail}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-base font-extrabold text-[#111111]">
              Upcoming Appointments
            </h2>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand">
              Preview
            </span>
          </div>

          <div className="mt-5 grid gap-3">
            {appointments.map(([time, client], index) => (
              <div
                key={`${time}-${client}`}
                className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#1C1C1E] text-xs font-extrabold text-brand-gold">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-[#1C1C1E]">
                    {time}
                  </p>
                  <p className="text-xs font-semibold text-[#6B7280]">
                    {client}
                  </p>
                </div>
                <span className="rounded-[8px] bg-[#ECFDF5] px-3 py-1 text-xs font-extrabold text-[#15803D]">
                  Confirmed
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(183,121,61,0.18)]"
          >
            View Full Calendar
          </button>
        </section>

        <section className="rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-base font-extrabold text-[#111111]">
              Revenue Overview
            </h2>
            <span className="rounded-[8px] border border-[#E4D6C3] bg-[#FAF7F2] px-3 py-2 text-xs font-extrabold text-[#1C1C1E]">
              This week
            </span>
          </div>

          <div className="mt-8 flex h-56 items-end gap-3 border-b border-l border-[#E4D6C3] px-4 pb-4">
            {bars.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-[6px] bg-[linear-gradient(180deg,#D6A85A_0%,#B7793D_100%)]"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] font-bold text-[#6B7280]">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]">
          <p className="text-sm font-extrabold text-[#111111]">New Clients</p>
          <p className="mt-4 text-3xl font-extrabold text-[#111111]">5</p>
          <p className="mt-2 text-xs font-bold text-[#15803D]">
            +25% from last week
          </p>
        </article>
        <article className="rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]">
          <p className="text-sm font-extrabold text-[#111111]">
            Returning Clients
          </p>
          <p className="mt-4 text-3xl font-extrabold text-[#111111]">17</p>
          <p className="mt-2 text-xs font-bold text-[#15803D]">
            +45% from last week
          </p>
        </article>
        <article className="rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]">
          <p className="text-sm font-extrabold text-[#111111]">Workspace</p>
          <p className="mt-4 text-lg font-extrabold text-[#111111]">
            {displayName}
          </p>
          <p className="mt-2 text-xs font-bold capitalize text-brand">
            {plan.tier} plan
          </p>
        </article>
      </div>
    </div>
  );
}

export function ProfileTabPanel({
  profile,
  plan,
  profileForm,
  publicForm,
  publicUrl,
  authBusy,
  newPassword,
  savingProfile,
  savingPublic,
  canUpgrade,
  onNewPasswordChange,
  onPasswordSubmit,
  onSignOut,
  onProfileFieldChange,
  onProfileSubmit,
  onPublicFieldChange,
  onBookingEnabledChange,
  onPublicSubmit,
  onCancel,
  onSoon,
}: {
  profile: AccountProfile;
  plan: AccountPlan;
  profileForm: ProfileForm;
  publicForm: PublicProfileForm;
  publicUrl: string;
  authBusy: boolean;
  newPassword: string;
  savingProfile: boolean;
  savingPublic: boolean;
  canUpgrade: boolean;
  onNewPasswordChange: (value: string) => void;
  onPasswordSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSignOut: () => void;
  onProfileFieldChange: (
    field: keyof ProfileForm,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onProfileSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onPublicFieldChange: (
    field: keyof PublicProfileForm,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBookingEnabledChange: (bookingEnabled: boolean) => void;
  onPublicSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onSoon: (message: string) => void;
}) {
  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <ProfileSection
          email={profile.email}
          form={profileForm}
          isSaving={savingProfile}
          onFieldChange={onProfileFieldChange}
          onSubmit={onProfileSubmit}
        />
        <PublicProfileSection
          form={publicForm}
          plan={plan}
          publicUrl={publicUrl}
          isSaving={savingPublic}
          onFieldChange={onPublicFieldChange}
          onBookingEnabledChange={onBookingEnabledChange}
          onSubmit={onPublicSubmit}
        />
      </div>

      <AccountSection
        plan={plan}
        canUpgrade={canUpgrade}
        onCancel={onCancel}
        onSoon={onSoon}
      />
      <SessionPanel
        email={profile.email}
        isBusy={authBusy}
        newPassword={newPassword}
        onNewPasswordChange={onNewPasswordChange}
        onPasswordSubmit={onPasswordSubmit}
        onSignOut={onSignOut}
      />
    </>
  );
}

export function BlankTabPanel({ title }: { title: string }) {
  return (
    <section className="min-h-[22rem] rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
        {title}
      </h2>
    </section>
  );
}

export function ClientsTabPanel({
  clients,
  loadState,
  selectedClientId,
  referralStates,
  creatingReferralClientId,
  canNativeShare,
  onClientToggle,
  onCreateReferralLink,
  onReferralRetry,
  onMessage,
  onRetry,
}: {
  clients: Customer[];
  loadState: ClientsLoadState;
  selectedClientId: string | null;
  referralStates: Record<string, ClientReferralLoadState>;
  creatingReferralClientId: string | null;
  canNativeShare: boolean;
  onClientToggle: (clientId: string) => void;
  onCreateReferralLink: (clientId: string) => void;
  onReferralRetry: (clientId: string) => void;
  onMessage: (message: string) => void;
  onRetry: () => void;
}) {
  return (
    <section className="min-h-[22rem] rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
            Clients
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Customer list from <code>/api/clients</code>.
          </p>
        </div>
        {loadState.status === "ready" ? (
          <p className="text-sm font-semibold text-[#4B5563]">
            {clients.length} {clients.length === 1 ? "client" : "clients"}
          </p>
        ) : null}
      </div>

      {loadState.status === "loading" || loadState.status === "idle" ? (
        <div className="mt-6 rounded-[18px] border border-[#E5E7EB] bg-[#FAF7F2] p-5 text-sm font-semibold text-[#4B5563]">
          Loading clients...
        </div>
      ) : null}

      {loadState.status === "error" ? (
        <div className="mt-6 rounded-[18px] border border-[#FECACA] bg-[#FFF7F7] p-5">
          <p className="text-sm font-semibold text-[#991B1B]">
            Clients could not load.
          </p>
          <p className="mt-2 text-sm leading-6 text-[#7F1D1D]">
            {loadState.message}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-[8px] bg-brand px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            Retry
          </button>
        </div>
      ) : null}

      {loadState.status === "ready" && clients.length === 0 ? (
        <div className="mt-6 rounded-[18px] border border-[#E5E7EB] bg-[#FAF7F2] p-5 text-sm leading-6 text-[#6B7280]">
          No clients found.
        </div>
      ) : null}

      {loadState.status === "ready" && clients.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-[18px] border border-[#E5E7EB]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E5E7EB] text-left text-sm">
              <thead className="bg-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                <tr>
                  <th scope="col" className="px-4 py-3 sm:px-5">
                    Client name
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-5">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-5">
                    Phone number
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-5">
                    Referral
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF0F3] bg-white">
                {clients.map((client) => {
                  const isSelected = selectedClientId === client.id;

                  return (
                    <Fragment key={client.id}>
                      <tr className={isSelected ? "bg-[#FFFBF5]" : undefined}>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-[#111111] sm:px-5">
                          {formatClientName(client)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-[#4B5563] sm:px-5">
                          {client.email ?? "None"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-[#4B5563] sm:px-5">
                          {client.phone ?? "None"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                          <button
                            type="button"
                            onClick={() => onClientToggle(client.id)}
                            aria-expanded={isSelected}
                            className="inline-flex h-9 items-center justify-center rounded-[8px] border border-[#E4D6C3] bg-white px-3 text-xs font-bold text-[#1C1C1E] hover:bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-brand/25"
                          >
                            {isSelected ? "Hide referral" : "View referral"}
                          </button>
                        </td>
                      </tr>
                      {isSelected ? (
                        <tr>
                          <td colSpan={4} className="bg-[#FFFBF5] px-4 py-4 sm:px-5">
                            <ClientReferralPanel
                              client={client}
                              state={
                                referralStates[client.id] ?? { status: "idle" }
                              }
                              isCreating={
                                creatingReferralClientId === client.id
                              }
                              canNativeShare={canNativeShare}
                              onCreate={() => onCreateReferralLink(client.id)}
                              onRetry={() => onReferralRetry(client.id)}
                              onMessage={onMessage}
                            />
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ClientReferralPanel({
  client,
  state,
  isCreating,
  canNativeShare,
  onCreate,
  onRetry,
  onMessage,
}: {
  client: Customer;
  state: ClientReferralLoadState;
  isCreating: boolean;
  canNativeShare: boolean;
  onCreate: () => void;
  onRetry: () => void;
  onMessage: (message: string) => void;
}) {
  if (state.status === "idle" || state.status === "loading") {
    return (
      <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-4 text-sm font-semibold text-[#4B5563]">
        Loading referral link...
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-[12px] border border-[#FECACA] bg-[#FFF7F7] p-4">
        <p className="text-sm font-semibold text-[#991B1B]">
          Referral link could not load.
        </p>
        <p className="mt-2 text-sm leading-6 text-[#7F1D1D]">
          {state.message}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-[8px] bg-brand px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[12px] border border-[#E4D6C3] bg-white p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-extrabold text-[#111111]">
            Referral link
          </p>
          <p className="mt-1 text-xs font-semibold text-[#6B7280]">
            Share this link when {formatClientName(client)} sends someone your
            way.
          </p>
        </div>
        <ReferralStatsSummary stats={state.stats} statsError={state.statsError} />
      </div>

      {state.link ? (
        <ReferralLinkActions
          link={state.link}
          canNativeShare={canNativeShare}
          onMessage={onMessage}
        />
      ) : (
        <div className="mt-4 flex flex-col gap-3 rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[#4B5563]">
            Create a referral link for this client.
          </p>
          <button
            type="button"
            onClick={onCreate}
            disabled={isCreating}
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-[8px] bg-brand px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Creating..." : "Create referral link"}
          </button>
        </div>
      )}
    </div>
  );
}

function ReferralLinkActions({
  link,
  canNativeShare,
  onMessage,
}: {
  link: ReferralLink;
  canNativeShare: boolean;
  onMessage: (message: string) => void;
}) {
  async function handleCopy() {
    if (!navigator.clipboard) {
      onMessage("Copy is not available in this browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(link.referral_url);
      onMessage("Referral link copied.");
    } catch {
      onMessage("Referral link could not be copied.");
    }
  }

  async function handleShare() {
    if (!navigator.share) {
      onMessage("Sharing is not available in this browser.");
      return;
    }

    try {
      await navigator.share({
        title: "Referral link",
        url: link.referral_url,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      onMessage("Referral link could not be shared.");
    }
  }

  return (
    <div className="mt-4 rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]">
        Referral link
      </p>
      <p className="mt-2 break-all text-sm font-semibold text-[#111111]">
        {link.referral_url}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-10 items-center justify-center rounded-[8px] bg-brand px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          Copy
        </button>
        {canNativeShare ? (
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-10 items-center justify-center rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm font-semibold text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-brand/25"
          >
            Share
          </button>
        ) : null}
      </div>
    </div>
  );
}

function ReferralStatsSummary({
  stats,
  statsError,
}: {
  stats: ReferralStats | null;
  statsError?: string;
}) {
  if (!stats) {
    return statsError ? (
      <p className="text-xs font-semibold text-[#92400E]">
        Referral stats unavailable.
      </p>
    ) : null;
  }

  return (
    <dl className="grid grid-cols-2 gap-2 sm:min-w-64">
      <ReferralStat label="Opens" value={stats.opened_count} />
      <ReferralStat
        label="Attributed bookings"
        value={stats.booking_attributed_count}
      />
    </dl>
  );
}

function ReferralStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] px-3 py-2">
      <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-extrabold text-[#111111]">{value}</dd>
    </div>
  );
}

function formatClientName(client: Customer) {
  return `${client.first_name} ${client.last_name}`.trim() || "Unnamed client";
}

export function AuthPanel({
  mode,
  email,
  password,
  isBusy,
  onModeChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: {
  mode: AuthMode;
  email: string;
  password: string;
  isBusy: boolean;
  onModeChange: (mode: AuthMode) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const submitLabel =
    mode === "sign-in"
      ? "Sign in"
      : mode === "sign-up"
        ? "Create account"
        : "Send reset email";

  return (
    <section className="rounded-[12px] border border-border bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
        {mode === "sign-up"
          ? "Create your account"
          : mode === "reset"
            ? "Reset password"
            : "Sign in"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#6B7280]">
        Supabase handles authentication and this app sends the active access
        token to the DripDesk API as a bearer token.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {(["sign-in", "sign-up", "reset"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onModeChange(item)}
            className={[
              "h-10 rounded-[8px] px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/25",
              mode === item
                ? "bg-brand text-white"
                : "border border-[#E4D6C3] bg-[#FAF7F2] text-[#4B5563]",
            ].join(" ")}
          >
            {item === "sign-in"
              ? "Sign in"
              : item === "sign-up"
                ? "Sign up"
                : "Reset"}
          </button>
        ))}
      </div>
      <form onSubmit={onSubmit} className="mt-5 grid gap-3">
        <input
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          className="h-12 min-w-0 rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
          placeholder="Email"
          type="email"
          autoComplete="email"
          required
        />
        {mode !== "reset" ? (
          <input
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            className="h-12 min-w-0 rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
            placeholder="Password"
            type="password"
            autoComplete={
              mode === "sign-up" ? "new-password" : "current-password"
            }
            required
          />
        ) : null}
        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex h-12 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy ? "Working..." : submitLabel}
        </button>
      </form>
    </section>
  );
}

function SessionPanel({
  email,
  isBusy,
  newPassword,
  onNewPasswordChange,
  onPasswordSubmit,
  onSignOut,
}: {
  email: string;
  isBusy: boolean;
  newPassword: string;
  onNewPasswordChange: (value: string) => void;
  onPasswordSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSignOut: () => void;
}) {
  return (
    <section className="rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
            Signed in
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">{email}</p>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          disabled={isBusy}
          className="inline-flex h-11 items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] px-5 text-sm font-semibold text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sign out
        </button>
      </div>
      <form
        onSubmit={onPasswordSubmit}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={newPassword}
          onChange={(event) => onNewPasswordChange(event.target.value)}
          className="h-12 min-w-0 flex-1 rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
          placeholder="New password"
          type="password"
          autoComplete="new-password"
        />
        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex h-12 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Update password
        </button>
      </form>
    </section>
  );
}

export function LoadingPanel() {
  return (
    <section className="rounded-[12px] border border-[#E4D6C3] bg-white p-6 text-sm font-semibold text-[#4B5563] shadow-[0_12px_28px_rgba(17,17,17,0.045)]">
      Loading account profile...
    </section>
  );
}

export function ErrorPanel({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <section className="rounded-[12px] border border-[#FECACA] bg-[#FFF7F7] p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-[#991B1B]">
        Account could not load
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#7F1D1D]">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex h-11 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          Retry
        </button>
      ) : null}
    </section>
  );
}

function ProfileSection({
  email,
  form,
  isSaving,
  onFieldChange,
  onSubmit,
}: {
  email: string;
  form: ProfileForm;
  isSaving: boolean;
  onFieldChange: (
    field: keyof ProfileForm,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section
      id="profile"
      className="scroll-mt-6 rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6"
    >
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
          Private Profile
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          Account identity from <code>/api/settings/profile</code>.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <Field label="Email">
          <input
            value={email}
            readOnly
            className="h-12 w-full rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] px-4 text-sm font-semibold text-[#6B7280]"
          />
        </Field>
        <Field label="Full name">
          <input
            value={form.full_name}
            onChange={(event) => onFieldChange("full_name", event)}
            className="h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
          />
        </Field>
        <Field label="Business name">
          <input
            value={form.business_name}
            onChange={(event) => onFieldChange("business_name", event)}
            className="h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
          />
        </Field>
        <Field label="Phone number">
          <input
            value={form.phone_number}
            onChange={(event) => onFieldChange("phone_number", event)}
            className="h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
          />
        </Field>
        <Field label="Location">
          <input
            value={form.location_label}
            onChange={(event) => onFieldChange("location_label", event)}
            className="h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
          />
        </Field>
        <Field label="Timezone">
          <input
            value={form.timezone}
            onChange={(event) => onFieldChange("timezone", event)}
            className="h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
            placeholder="America/Denver"
          />
        </Field>
        <Field label="Avatar image ID">
          <input
            value={form.avatar_image_id}
            onChange={(event) => onFieldChange("avatar_image_id", event)}
            className="h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
          />
        </Field>
        <button
          type="submit"
          disabled={isSaving}
          className="mt-2 inline-flex h-12 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save private profile"}
        </button>
      </form>
    </section>
  );
}

function PublicProfileSection({
  form,
  plan,
  publicUrl,
  isSaving,
  onFieldChange,
  onBookingEnabledChange,
  onSubmit,
}: {
  form: PublicProfileForm;
  plan: AccountPlan;
  publicUrl: string;
  isSaving: boolean;
  onFieldChange: (
    field: keyof PublicProfileForm,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBookingEnabledChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section
      id="public-page"
      className="scroll-mt-6 rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6"
    >
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
          Public Booking Page
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          Public stylist identity from <code>/api/settings/booking</code>.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <Field label="Booking link">
          <div className="rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] px-4 py-3 text-sm font-semibold text-[#111111]">
            {publicUrl}
          </div>
        </Field>
        <Field label="Slug">
          <input
            value={form.slug}
            onChange={(event) => onFieldChange("slug", event)}
            disabled={!plan.features.customSlug}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            className="h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25 disabled:bg-[#FAF7F2] disabled:text-[#6B7280]"
          />
          {!plan.features.customSlug ? (
            <p className="mt-2 text-xs font-semibold text-[#92400E]">
              Custom booking links are not included in this plan.
            </p>
          ) : null}
        </Field>
        <Field label="Display name">
          <input
            value={form.display_name}
            onChange={(event) => onFieldChange("display_name", event)}
            className="h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
          />
        </Field>
        <Field label="Bio">
          <textarea
            value={form.bio}
            onChange={(event) => onFieldChange("bio", event)}
            maxLength={2000}
            className="min-h-28 w-full resize-y rounded-[8px] border border-[#E4D6C3] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/25"
          />
        </Field>
        <Field label="Cover photo URL">
          <input
            value={form.cover_photo_url}
            onChange={(event) => onFieldChange("cover_photo_url", event)}
            disabled={!plan.features.customCoverPhoto}
            className="h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25 disabled:bg-[#FAF7F2] disabled:text-[#6B7280]"
            placeholder="https://..."
          />
          {!plan.features.customCoverPhoto ? (
            <p className="mt-2 text-xs font-semibold text-[#92400E]">
              Custom cover photos are not included in this plan.
            </p>
          ) : null}
        </Field>
        <label className="flex items-center justify-between gap-4 rounded-[8px] border border-[#E4D6C3] bg-[#FAF7F2] px-4 py-3">
          <span>
            <span className="block text-sm font-semibold text-[#111111]">
              Booking enabled
            </span>
            <span className="mt-1 block text-xs font-semibold text-[#6B7280]">
              Customers can still preview an unavailable page when off.
            </span>
          </span>
          <input
            checked={form.booking_enabled}
            onChange={(event) => onBookingEnabledChange(event.target.checked)}
            type="checkbox"
            className="h-5 w-5 accent-brand"
          />
        </label>
        <button
          type="submit"
          disabled={isSaving}
          className="mt-2 inline-flex h-12 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save public profile"}
        </button>
      </form>
    </section>
  );
}

function AccountSection({
  plan,
  canUpgrade,
  onCancel,
  onSoon,
}: {
  plan: AccountPlan;
  canUpgrade: boolean;
  onCancel: () => void;
  onSoon: (message: string) => void;
}) {
  return (
    <section
      id="plan"
      className="scroll-mt-6 rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
            Account Plan
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Tier and entitlement data from <code>/api/account/plan</code>.
          </p>

          <div className="mt-6 rounded-[22px] border border-[#E5E7EB] bg-[#FAF7F2] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
              Current plan
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <p className="text-3xl font-semibold tracking-tight text-[#111111]">
                {plan.displayName}
              </p>
              <p className="pb-1 text-sm font-semibold capitalize text-brand">
                {plan.status.replace("_", " ")}
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#6B7280]">
              SMS usage: {plan.smsUsedThisMonth} used,{" "}
              {plan.smsRemainingThisMonth} remaining of {plan.smsMonthlyLimit}.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {canUpgrade ? (
              <button
                type="button"
                onClick={() => onSoon("Upgrade checkout coming soon.")}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                Upgrade
              </button>
            ) : (
              <p className="inline-flex h-12 flex-1 items-center justify-center rounded-[8px] bg-[#ECFDF5] px-5 text-sm font-semibold text-[#15803D]">
                You&apos;re on the highest plan.
              </p>
            )}
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-[8px] border border-[#FECACA] bg-[#FFF7F7] px-5 text-sm font-semibold text-[#B91C1C] transition-colors hover:bg-[#FEF2F2] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="grid gap-3">
          {planNotes.map((planNote) => {
            const isCurrent = planNote.tier === plan.tier;

            return (
              <article
                key={planNote.tier}
                className={[
                  "rounded-[18px] border p-4",
                  isCurrent
                    ? "border-brand bg-brand-soft"
                    : "border-[#EEF0F3] bg-white",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-[#111111]">
                      {planNote.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                      {planNote.description}
                    </p>
                  </div>
                  {isCurrent ? (
                    <p className="shrink-0 text-xs font-semibold text-brand">
                      Current
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
          <div className="rounded-[18px] border border-[#EEF0F3] bg-[#FAF7F2] p-4">
            <h3 className="font-semibold text-[#111111]">Features</h3>
            <dl className="mt-3 grid gap-2 sm:grid-cols-2">
              {Object.entries(plan.features).map(([key, enabled]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <dt className="text-[#4B5563]">
                    {featureLabels[key as keyof AccountPlan["features"]]}
                  </dt>
                  <dd
                    className={[
                      "text-xs font-semibold",
                      enabled ? "text-[#15803D]" : "text-[#9CA3AF]",
                    ].join(" ")}
                  >
                    {enabled ? "Included" : "Locked"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
        {label}
      </span>
      {children}
    </label>
  );
}

export function CancelDialog({
  onClose,
  onSoon,
}: {
  onClose: () => void;
  onSoon: (message: string) => void;
}) {
  function handleSoon(message: string) {
    onClose();
    onSoon(message);
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-[#111827]/45 px-4 py-6"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-title"
        aria-describedby="cancel-description"
        className="w-full max-w-lg rounded-[16px] border border-white/80 bg-white p-5 shadow-[0_30px_90px_rgba(17,24,39,0.22)] sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2
          id="cancel-title"
          className="text-2xl font-semibold tracking-tight text-[#111111]"
        >
          Before you cancel
        </h2>
        <p
          id="cancel-description"
          className="mt-3 text-sm leading-6 text-[#6B7280]"
        >
          Billing changes should use the hosted billing flow. Direct plan
          mutation is intentionally not exposed from this screen.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-[8px] border border-[#E4D6C3] bg-white px-5 text-sm font-semibold text-[#4B5563] transition-colors hover:bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-brand/25"
          >
            Keep My Plan
          </button>
          <button
            type="button"
            onClick={() => handleSoon("Cancellation flow coming soon.")}
            className="inline-flex h-12 items-center justify-center rounded-[8px] border border-[#FECACA] bg-[#FFF7F7] px-5 text-sm font-semibold text-[#B91C1C] transition-colors hover:bg-[#FEF2F2] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20"
          >
            Continue to Cancel
          </button>
        </div>
      </section>
    </div>
  );
}

export function ToastMessage({ message }: { message: string }) {
  return (
    <div
      className="fixed right-4 bottom-4 z-30 max-w-[calc(100vw-2rem)] rounded-[8px] border border-[#E4D6C3] bg-white px-4 py-3 text-sm font-semibold text-[#111111] shadow-[0_18px_45px_rgba(17,24,39,0.16)]"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
