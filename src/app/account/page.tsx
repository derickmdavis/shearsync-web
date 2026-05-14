"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  ApiError,
  getAuthenticatedUser,
  getAccountPlan,
  getAccountProfile,
  getClients,
  getStylistSettingsProfile,
  updateAccountProfile,
  updateStylistSettingsProfile,
  type AccountPlan,
  type AccountProfile,
  type AccountProfileUpdate,
  type Customer,
  type StylistSettingsProfile,
  type StylistSettingsUpdate,
} from "@/src/lib/api";
import {
  getSupabaseBrowserClient,
  hasSupabaseBrowserConfig,
} from "@/src/lib/supabase";

const accountNavItems = [
  { id: "profile", label: "Profile" },
  { id: "clients", label: "Clients" },
  { id: "appointments", label: "Appointments" },
] as const;

type AccountTab = (typeof accountNavItems)[number]["id"];

const planNotes = [
  {
    tier: "basic",
    name: "Basic",
    description: "Simple CRM, booking page access, and email reminders.",
  },
  {
    tier: "pro",
    name: "Pro",
    description: "Adds SMS reminders, custom links, and calendar sync.",
  },
  {
    tier: "premium",
    name: "Premium",
    description: "Advanced automation, exports, and weekly business recaps.",
  },
] as const;

const featureLabels: Record<keyof AccountPlan["features"], string> = {
  bookingPage: "Booking page",
  crm: "Client CRM",
  emailReminders: "Email reminders",
  smsReminders: "SMS reminders",
  customCoverPhoto: "Custom cover photo",
  customSlug: "Custom booking link",
  googleCalendarSync: "Google Calendar sync",
  weeklyBusinessRecap: "Weekly business recap",
  clientExport: "Client export",
};

type Toast = {
  id: number;
  message: string;
};

type LoadState =
  | { status: "config"; message: string }
  | { status: "auth" }
  | { status: "loading" }
  | { status: "ready" }
  | { status: "error"; message: string };

type ClientsLoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready" }
  | { status: "error"; message: string };

type AuthMode = "sign-in" | "sign-up" | "reset";

type ProfileForm = {
  full_name: string;
  phone_number: string;
  business_name: string;
  location_label: string;
  avatar_image_id: string;
  timezone: string;
};

type PublicProfileForm = {
  slug: string;
  display_name: string;
  bio: string;
  cover_photo_url: string;
  booking_enabled: boolean;
};

function showMessage(
  message: string,
  setToast: Dispatch<SetStateAction<Toast | null>>,
) {
  setToast({ id: Date.now(), message });
}

function toProfileForm(profile: AccountProfile): ProfileForm {
  return {
    full_name: profile.full_name ?? "",
    phone_number: profile.phone_number ?? "",
    business_name: profile.business_name ?? "",
    location_label: profile.location_label ?? "",
    avatar_image_id: profile.avatar_image_id ?? "",
    timezone: profile.timezone,
  };
}

function toPublicProfileForm(stylist: StylistSettingsProfile): PublicProfileForm {
  return {
    slug: stylist.slug,
    display_name: stylist.display_name,
    bio: stylist.bio ?? "",
    cover_photo_url: stylist.cover_photo_url ?? "",
    booking_enabled: stylist.booking_enabled,
  };
}

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

function getPublicBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_WEB_APP_URL;

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

async function loadAccountData(token: string) {
  await getAuthenticatedUser(token);

  const [profile, stylist, plan] = await Promise.all([
    getAccountProfile(token),
    getStylistSettingsProfile(token),
    getAccountPlan(token),
  ]);

  return { profile, stylist, plan };
}

export default function AccountPage() {
  const router = useRouter();
  const [toast, setToast] = useState<Toast | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [stylist, setStylist] = useState<StylistSettingsProfile | null>(null);
  const [plan, setPlan] = useState<AccountPlan | null>(null);
  const [clients, setClients] = useState<Customer[]>([]);
  const [clientsLoadState, setClientsLoadState] = useState<ClientsLoadState>({
    status: "idle",
  });
  const [profileForm, setProfileForm] = useState<ProfileForm | null>(null);
  const [publicForm, setPublicForm] = useState<PublicProfileForm | null>(null);
  const [loadState, setLoadState] = useState<LoadState>(() =>
    hasSupabaseBrowserConfig()
      ? { status: "loading" }
      : {
          status: "config",
          message:
            "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        },
  );
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPublic, setSavingPublic] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");

  const publicUrl = useMemo(() => {
    if (!stylist?.slug) {
      return "";
    }

    return `${getPublicBaseUrl()}/book/${stylist.slug}`;
  }, [stylist?.slug]);

  const loadAccount = useCallback(
    async (token: string) => {
      if (!token) {
        setLoadState({ status: "auth" });
        router.replace("/login?next=/account");
        return;
      }

      setLoadState({ status: "loading" });

      try {
        const {
          profile: nextProfile,
          stylist: nextStylist,
          plan: nextPlan,
        } = await loadAccountData(token);

        setProfile(nextProfile);
        setStylist(nextStylist);
        setPlan(nextPlan);
        setProfileForm(toProfileForm(nextProfile));
        setPublicForm(toPublicProfileForm(nextStylist));
        setLoadState({ status: "ready" });
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          const supabase = getSupabaseBrowserClient();
          const { data } = await supabase.auth.refreshSession();
          const refreshedToken = data.session?.access_token;

          if (refreshedToken) {
            try {
              const {
                profile: nextProfile,
                stylist: nextStylist,
                plan: nextPlan,
              } = await loadAccountData(refreshedToken);

              setAccessToken(refreshedToken);
              setProfile(nextProfile);
              setStylist(nextStylist);
              setPlan(nextPlan);
              setProfileForm(toProfileForm(nextProfile));
              setPublicForm(toPublicProfileForm(nextStylist));
              setLoadState({ status: "ready" });
              return;
            } catch {
              // Continue to sign out when the refreshed session is still unusable.
            }
          }

          await supabase.auth.signOut();
          setAccessToken("");
          setLoadState({ status: "auth" });
          return;
        }

        setLoadState({ status: "error", message: getErrorMessage(error) });
      }
    },
    [router],
  );

  const loadClients = useCallback(async (token: string) => {
    if (!token) {
      setClients([]);
      setClientsLoadState({ status: "idle" });
      return;
    }

    setClientsLoadState({ status: "loading" });

    try {
      const nextClients = await getClients(token);
      setClients(nextClients);
      setClientsLoadState({ status: "ready" });
    } catch (error) {
      setClientsLoadState({ status: "error", message: getErrorMessage(error) });
    }
  }, []);

  useEffect(() => {
    if (!hasSupabaseBrowserConfig()) {
      return;
    }

    let isActive = true;
    const supabase = getSupabaseBrowserClient();

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!isActive) {
        return;
      }

      if (error) {
        setLoadState({ status: "error", message: error.message });
        return;
      }

      const token = data.session?.access_token ?? "";
      setAccessToken(token);
      void loadAccount(token);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isActive) {
        return;
      }

      const token = session?.access_token ?? "";
      setAccessToken(token);

      if (!token) {
        setProfile(null);
        setStylist(null);
        setPlan(null);
        setClients([]);
        setClientsLoadState({ status: "idle" });
        setProfileForm(null);
        setPublicForm(null);
        setLoadState({ status: "auth" });
        return;
      }

      void loadAccount(token);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [loadAccount]);

  useEffect(() => {
    if (
      activeTab !== "clients" ||
      loadState.status !== "ready" ||
      clientsLoadState.status !== "idle"
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void loadClients(accessToken);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [
    accessToken,
    activeTab,
    clientsLoadState.status,
    loadClients,
    loadState.status,
  ]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2600);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    if (!isCancelOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsCancelOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCancelOpen]);

  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setAuthBusy(true);

    try {
      const supabase = getSupabaseBrowserClient();

      if (authMode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(authEmail, {
          redirectTo: `${window.location.origin}/account`,
        });

        if (error) {
          throw error;
        }

        showMessage("Password reset email sent.", setToast);
        return;
      }

      const credentials = {
        email: authEmail,
        password: authPassword,
      };
      const { error } =
        authMode === "sign-up"
          ? await supabase.auth.signUp(credentials)
          : await supabase.auth.signInWithPassword(credentials);

      if (error) {
        throw error;
      }

      showMessage(
        authMode === "sign-up"
          ? "Check your email to confirm your account."
          : "Signed in.",
        setToast,
      );
    } catch (error) {
      showMessage(getErrorMessage(error), setToast);
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newPassword.trim()) {
      showMessage("Enter a new password.", setToast);
      return;
    }

    setAuthBusy(true);

    try {
      const { error } = await getSupabaseBrowserClient().auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setNewPassword("");
      showMessage("Password updated.", setToast);
    } catch (error) {
      showMessage(getErrorMessage(error), setToast);
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleSignOut() {
    setAuthBusy(true);

    try {
      const { error } = await getSupabaseBrowserClient().auth.signOut();

      if (error) {
        throw error;
      }

      setAccessToken("");
      setLoadState({ status: "auth" });
    } catch (error) {
      showMessage(getErrorMessage(error), setToast);
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profileForm || !accessToken) {
      return;
    }

    const body: AccountProfileUpdate = {
      full_name: profileForm.full_name,
      phone_number: profileForm.phone_number,
      business_name: profileForm.business_name,
      location_label: profileForm.location_label,
      avatar_image_id: profileForm.avatar_image_id,
      timezone: profileForm.timezone,
    };

    setSavingProfile(true);

    try {
      const nextProfile = await updateAccountProfile(accessToken, body);
      setProfile(nextProfile);
      setProfileForm(toProfileForm(nextProfile));
      showMessage("Profile saved.", setToast);
    } catch (error) {
      showMessage(getErrorMessage(error), setToast);
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePublicSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!publicForm || !accessToken) {
      return;
    }

    const body: StylistSettingsUpdate = {
      display_name: publicForm.display_name,
      bio: publicForm.bio,
      booking_enabled: publicForm.booking_enabled,
    };

    if (plan?.features.customSlug) {
      body.slug = publicForm.slug;
    }

    if (plan?.features.customCoverPhoto) {
      body.cover_photo_url = publicForm.cover_photo_url;
    }

    setSavingPublic(true);

    try {
      const nextStylist = await updateStylistSettingsProfile(accessToken, body);
      setStylist(nextStylist);
      setPublicForm(toPublicProfileForm(nextStylist));
      showMessage("Public profile saved.", setToast);
    } catch (error) {
      showMessage(getErrorMessage(error), setToast);
    } finally {
      setSavingPublic(false);
    }
  }

  function updateProfileField(
    field: keyof ProfileForm,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setProfileForm((current) =>
      current ? { ...current, [field]: event.target.value } : current,
    );
  }

  function updatePublicField(
    field: keyof PublicProfileForm,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setPublicForm((current) =>
      current ? { ...current, [field]: event.target.value } : current,
    );
  }

  const canUpgrade = plan ? plan.tier !== "premium" : false;

  return (
    <main className="min-h-screen bg-[#F7F7F8] px-4 py-6 text-[#111827] sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-[28px] border border-white/80 bg-white px-5 py-6 shadow-[0_20px_60px_rgba(17,24,39,0.07)] sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-3xl font-semibold italic text-[#4F46E5]">
                ShearSync
              </p>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
                Account Management
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
                Manage your private account details, public booking identity,
                and plan access.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-xs font-semibold text-[#4B5563]">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              {plan ? plan.displayName : "Account portal"}
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:items-start">
          <AccountSideNav activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex min-w-0 flex-col gap-6">
            {loadState.status === "config" ? (
              <ErrorPanel message={loadState.message} />
            ) : null}

            {loadState.status === "auth" ? (
              <AuthPanel
                mode={authMode}
                email={authEmail}
                password={authPassword}
                isBusy={authBusy}
                onModeChange={setAuthMode}
                onEmailChange={setAuthEmail}
                onPasswordChange={setAuthPassword}
                onSubmit={handleAuthSubmit}
              />
            ) : null}

            {loadState.status === "loading" ? <LoadingPanel /> : null}

            {loadState.status === "error" ? (
              <ErrorPanel
                message={loadState.message}
                onRetry={() => void loadAccount(accessToken)}
              />
            ) : null}

            {loadState.status === "ready" &&
            profile &&
            stylist &&
            plan &&
            profileForm &&
            publicForm ? (
              activeTab === "profile" ? (
                <ProfileTabPanel
                  profile={profile}
                  plan={plan}
                  profileForm={profileForm}
                  publicForm={publicForm}
                  publicUrl={publicUrl}
                  authBusy={authBusy}
                  newPassword={newPassword}
                  savingProfile={savingProfile}
                  savingPublic={savingPublic}
                  canUpgrade={canUpgrade}
                  onNewPasswordChange={setNewPassword}
                  onPasswordSubmit={handleUpdatePassword}
                  onSignOut={handleSignOut}
                  onProfileFieldChange={updateProfileField}
                  onProfileSubmit={handleProfileSubmit}
                  onPublicFieldChange={updatePublicField}
                  onBookingEnabledChange={(booking_enabled) =>
                    setPublicForm((current) =>
                      current ? { ...current, booking_enabled } : current,
                    )
                  }
                  onPublicSubmit={handlePublicSubmit}
                  onCancel={() => setIsCancelOpen(true)}
                  onSoon={(message) => showMessage(message, setToast)}
                />
              ) : activeTab === "clients" ? (
                <ClientsTabPanel
                  clients={clients}
                  loadState={clientsLoadState}
                  onRetry={() => void loadClients(accessToken)}
                />
              ) : (
                <BlankTabPanel title="Appointments" />
              )
            ) : null}
          </div>
        </div>
      </div>

      {toast ? <ToastMessage message={toast.message} /> : null}

      {isCancelOpen ? (
        <CancelDialog
          onClose={() => setIsCancelOpen(false)}
          onSoon={(message) => showMessage(message, setToast)}
        />
      ) : null}
    </main>
  );
}

function AccountSideNav({
  activeTab,
  onTabChange,
}: {
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
}) {
  return (
    <nav
      aria-label="Account management"
      className="rounded-[24px] border border-[#E5E7EB] bg-white p-2 shadow-[0_16px_45px_rgba(17,24,39,0.06)] lg:sticky lg:top-6"
    >
      <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {accountNavItems.map((item) => (
          <li key={item.label} className="w-full">
            <button
              type="button"
              onClick={() => onTabChange(item.id)}
              aria-current={activeTab === item.id ? "page" : undefined}
              className={[
                "flex h-11 w-full min-w-max items-center rounded-[16px] px-4 text-left text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25",
                activeTab === item.id
                  ? "bg-[#EEF2FF] text-[#4F46E5]"
                  : "text-[#4B5563] hover:bg-[#F9FAFB]",
              ].join(" ")}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ProfileTabPanel({
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

function BlankTabPanel({ title }: { title: string }) {
  return (
    <section className="min-h-[22rem] rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-[0_16px_45px_rgba(17,24,39,0.06)] sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
        {title}
      </h2>
    </section>
  );
}

function ClientsTabPanel({
  clients,
  loadState,
  onRetry,
}: {
  clients: Customer[];
  loadState: ClientsLoadState;
  onRetry: () => void;
}) {
  return (
    <section className="min-h-[22rem] rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-[0_16px_45px_rgba(17,24,39,0.06)] sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
            Clients
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Read-only customer list from <code>/api/clients</code>.
          </p>
        </div>
        {loadState.status === "ready" ? (
          <p className="text-sm font-semibold text-[#4B5563]">
            {clients.length} {clients.length === 1 ? "client" : "clients"}
          </p>
        ) : null}
      </div>

      {loadState.status === "loading" || loadState.status === "idle" ? (
        <div className="mt-6 rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-5 text-sm font-semibold text-[#4B5563]">
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
            className="mt-4 inline-flex h-10 items-center justify-center rounded-2xl bg-[#4F46E5] px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
          >
            Retry
          </button>
        </div>
      ) : null}

      {loadState.status === "ready" && clients.length === 0 ? (
        <div className="mt-6 rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-5 text-sm leading-6 text-[#6B7280]">
          No clients found.
        </div>
      ) : null}

      {loadState.status === "ready" && clients.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-[18px] border border-[#E5E7EB]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E5E7EB] text-left text-sm">
              <thead className="bg-[#F9FAFB] text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF0F3] bg-white">
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td className="whitespace-nowrap px-4 py-4 font-semibold text-[#111827] sm:px-5">
                      {formatClientName(client)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[#4B5563] sm:px-5">
                      {client.email ?? "None"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[#4B5563] sm:px-5">
                      {client.phone ?? "None"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function formatClientName(client: Customer) {
  return `${client.first_name} ${client.last_name}`.trim() || "Unnamed client";
}

function AuthPanel({
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
    <section className="rounded-[24px] border border-[#E0E7FF] bg-white p-5 shadow-[0_16px_45px_rgba(17,24,39,0.06)] sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
        {mode === "sign-up"
          ? "Create your account"
          : mode === "reset"
            ? "Reset password"
            : "Sign in"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#6B7280]">
        Supabase handles authentication and this app sends the active access
        token to the ShearSync API as a bearer token.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {(["sign-in", "sign-up", "reset"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onModeChange(item)}
            className={[
              "h-10 rounded-2xl px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25",
              mode === item
                ? "bg-[#4F46E5] text-white"
                : "border border-[#E5E7EB] bg-[#F9FAFB] text-[#4B5563]",
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
          className="h-12 min-w-0 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          placeholder="Email"
          type="email"
          autoComplete="email"
          required
        />
        {mode !== "reset" ? (
          <input
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            className="h-12 min-w-0 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
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
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#4F46E5] px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(79,70,229,0.23)] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 disabled:cursor-not-allowed disabled:opacity-60"
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
    <section className="rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-[0_16px_45px_rgba(17,24,39,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
            Signed in
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">{email}</p>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          disabled={isBusy}
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-5 text-sm font-semibold text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25 disabled:cursor-not-allowed disabled:opacity-60"
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
          className="h-12 min-w-0 flex-1 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          placeholder="New password"
          type="password"
          autoComplete="new-password"
        />
        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#4F46E5] px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(79,70,229,0.23)] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Update password
        </button>
      </form>
    </section>
  );
}

function LoadingPanel() {
  return (
    <section className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 text-sm font-semibold text-[#4B5563] shadow-[0_16px_45px_rgba(17,24,39,0.06)]">
      Loading account profile...
    </section>
  );
}

function ErrorPanel({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <section className="rounded-[24px] border border-[#FECACA] bg-[#FFF7F7] p-5 shadow-[0_16px_45px_rgba(17,24,39,0.06)] sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-[#991B1B]">
        Account could not load
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#7F1D1D]">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-[#4F46E5] px-5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
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
      className="scroll-mt-6 rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-[0_16px_45px_rgba(17,24,39,0.06)] sm:p-6"
    >
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
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
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm font-semibold text-[#6B7280]"
          />
        </Field>
        <Field label="Full name">
          <input
            value={form.full_name}
            onChange={(event) => onFieldChange("full_name", event)}
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          />
        </Field>
        <Field label="Business name">
          <input
            value={form.business_name}
            onChange={(event) => onFieldChange("business_name", event)}
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          />
        </Field>
        <Field label="Phone number">
          <input
            value={form.phone_number}
            onChange={(event) => onFieldChange("phone_number", event)}
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          />
        </Field>
        <Field label="Location">
          <input
            value={form.location_label}
            onChange={(event) => onFieldChange("location_label", event)}
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          />
        </Field>
        <Field label="Timezone">
          <input
            value={form.timezone}
            onChange={(event) => onFieldChange("timezone", event)}
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
            placeholder="America/Denver"
          />
        </Field>
        <Field label="Avatar image ID">
          <input
            value={form.avatar_image_id}
            onChange={(event) => onFieldChange("avatar_image_id", event)}
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          />
        </Field>
        <button
          type="submit"
          disabled={isSaving}
          className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-[#4F46E5] px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(79,70,229,0.23)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 disabled:cursor-not-allowed disabled:opacity-60"
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
      className="scroll-mt-6 rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-[0_16px_45px_rgba(17,24,39,0.06)] sm:p-6"
    >
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
          Public Booking Page
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          Public stylist identity from <code>/api/settings/booking</code>.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <Field label="Booking link">
          <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm font-semibold text-[#111827]">
            {publicUrl}
          </div>
        </Field>
        <Field label="Slug">
          <input
            value={form.slug}
            onChange={(event) => onFieldChange("slug", event)}
            disabled={!plan.features.customSlug}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25 disabled:bg-[#F9FAFB] disabled:text-[#6B7280]"
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
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          />
        </Field>
        <Field label="Bio">
          <textarea
            value={form.bio}
            onChange={(event) => onFieldChange("bio", event)}
            maxLength={2000}
            className="min-h-28 w-full resize-y rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          />
        </Field>
        <Field label="Cover photo URL">
          <input
            value={form.cover_photo_url}
            onChange={(event) => onFieldChange("cover_photo_url", event)}
            disabled={!plan.features.customCoverPhoto}
            className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/25 disabled:bg-[#F9FAFB] disabled:text-[#6B7280]"
            placeholder="https://..."
          />
          {!plan.features.customCoverPhoto ? (
            <p className="mt-2 text-xs font-semibold text-[#92400E]">
              Custom cover photos are not included in this plan.
            </p>
          ) : null}
        </Field>
        <label className="flex items-center justify-between gap-4 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
          <span>
            <span className="block text-sm font-semibold text-[#111827]">
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
            className="h-5 w-5 accent-[#4F46E5]"
          />
        </label>
        <button
          type="submit"
          disabled={isSaving}
          className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-[#4F46E5] px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(79,70,229,0.23)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 disabled:cursor-not-allowed disabled:opacity-60"
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
      className="scroll-mt-6 rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-[0_16px_45px_rgba(17,24,39,0.06)] sm:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
            Account Plan
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Tier and entitlement data from <code>/api/account/plan</code>.
          </p>

          <div className="mt-6 rounded-[22px] border border-[#E5E7EB] bg-[#F9FAFB] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
              Current plan
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <p className="text-3xl font-semibold tracking-tight text-[#111827]">
                {plan.displayName}
              </p>
              <p className="pb-1 text-sm font-semibold capitalize text-[#4F46E5]">
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
                className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#4F46E5] px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(79,70,229,0.23)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              >
                Upgrade
              </button>
            ) : (
              <p className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#ECFDF5] px-5 text-sm font-semibold text-[#15803D]">
                You&apos;re on the highest plan.
              </p>
            )}
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl border border-[#FECACA] bg-[#FFF7F7] px-5 text-sm font-semibold text-[#B91C1C] transition-colors hover:bg-[#FEF2F2] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20"
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
                    ? "border-[#4F46E5] bg-[#EEF2FF]"
                    : "border-[#EEF0F3] bg-white",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-[#111827]">
                      {planNote.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                      {planNote.description}
                    </p>
                  </div>
                  {isCurrent ? (
                    <p className="shrink-0 text-xs font-semibold text-[#4F46E5]">
                      Current
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
          <div className="rounded-[18px] border border-[#EEF0F3] bg-[#F9FAFB] p-4">
            <h3 className="font-semibold text-[#111827]">Features</h3>
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

function CancelDialog({
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
        className="w-full max-w-lg rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_30px_90px_rgba(17,24,39,0.22)] sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2
          id="cancel-title"
          className="text-2xl font-semibold tracking-tight text-[#111827]"
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
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white px-5 text-sm font-semibold text-[#4B5563] transition-colors hover:bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
          >
            Keep My Plan
          </button>
          <button
            type="button"
            onClick={() => handleSoon("Cancellation flow coming soon.")}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#FECACA] bg-[#FFF7F7] px-5 text-sm font-semibold text-[#B91C1C] transition-colors hover:bg-[#FEF2F2] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20"
          >
            Continue to Cancel
          </button>
        </div>
      </section>
    </div>
  );
}

function ToastMessage({ message }: { message: string }) {
  return (
    <div
      className="fixed right-4 bottom-4 z-30 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#111827] shadow-[0_18px_45px_rgba(17,24,39,0.16)]"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
