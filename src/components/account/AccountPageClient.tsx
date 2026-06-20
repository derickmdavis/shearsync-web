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
  type SetStateAction,
} from "react";
import {
  ApiError,
  createClientReferralLink,
  getAuthenticatedUser,
  getAccountPlan,
  getAccountProfile,
  getClientReferralLink,
  getClientReferralStats,
  getClients,
  getStylistSettingsProfile,
  updateAccountProfile,
  updateStylistSettingsProfile,
  type AccountPlan,
  type AccountProfile,
  type AccountProfileUpdate,
  type Customer,
  type ReferralStats,
  type StylistSettingsProfile,
  type StylistSettingsUpdate,
} from "@/src/lib/api";
import {
  getSupabaseBrowserClient,
  hasSupabaseBrowserConfig,
} from "@/src/lib/supabase";
import {
  AccountSideNav,
  AuthPanel,
  BlankTabPanel,
  CancelDialog,
  ClientsTabPanel,
  DashboardTabPanel,
  ErrorPanel,
  LoadingPanel,
  ProfileTabPanel,
  ToastMessage,
} from "@/src/components/account/AccountPanels";
import type {
  AccountTab,
  AuthMode,
  ClientReferralLoadState,
  ClientsLoadState,
  LoadState,
  ProfileForm,
  PublicProfileForm,
  Toast,
} from "@/src/components/account/account-types";

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
  // Prefer configured public origin for generated booking links, then fall back
  // to the current browser origin during local development.
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
  // Fetch account bootstrap data in parallel after proving the token is accepted
  // by the API. The backend remains the source of entitlement truth.
  await getAuthenticatedUser(token);

  const [profile, stylist, plan] = await Promise.all([
    getAccountProfile(token),
    getStylistSettingsProfile(token),
    getAccountPlan(token),
  ]);

  return { profile, stylist, plan };
}

export function AccountPageClient() {
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
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [clientReferralStates, setClientReferralStates] = useState<
    Record<string, ClientReferralLoadState>
  >({});
  const [creatingReferralClientId, setCreatingReferralClientId] = useState<
    string | null
  >(null);
  const [canNativeShare, setCanNativeShare] = useState(false);
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
  const [activeTab, setActiveTab] = useState<AccountTab>("dashboard");

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
          // A stale Supabase access token can often be recovered without forcing
          // the user back through the login form.
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
      setSelectedClientId(null);
      setClientReferralStates({});
      setCreatingReferralClientId(null);
      return;
    }

    setClientsLoadState({ status: "loading" });

    try {
      const nextClients = await getClients(token);
      setClients(nextClients);
      setClientsLoadState({ status: "ready" });
      setSelectedClientId((currentClientId) =>
        currentClientId &&
        nextClients.some((client) => client.id === currentClientId)
          ? currentClientId
          : null,
      );
    } catch (error) {
      setClientsLoadState({ status: "error", message: getErrorMessage(error) });
    }
  }, []);

  const loadClientReferral = useCallback(
    async (clientId: string, token: string) => {
      if (!token) {
        return;
      }

      setClientReferralStates((currentStates) => ({
        ...currentStates,
        [clientId]: { status: "loading" },
      }));

      try {
        const [link, statsResult] = await Promise.all([
          getClientReferralLink(clientId, token),
          getClientReferralStats(clientId, token)
            .then((stats): { stats: ReferralStats | null; error?: string } => ({
              stats,
            }))
            .catch((error): { stats: ReferralStats | null; error?: string } => ({
              stats: null,
              error: getErrorMessage(error),
            })),
        ]);

        setClientReferralStates((currentStates) => ({
          ...currentStates,
          [clientId]: {
            status: "ready",
            link,
            stats: statsResult.stats,
            statsError: statsResult.error,
          },
        }));
      } catch (error) {
        setClientReferralStates((currentStates) => ({
          ...currentStates,
          [clientId]: { status: "error", message: getErrorMessage(error) },
        }));
      }
    },
    [],
  );

  const handleClientToggle = useCallback(
    (clientId: string) => {
      const isClosing = selectedClientId === clientId;
      const nextClientId = isClosing ? null : clientId;

      setSelectedClientId(nextClientId);

      if (!isClosing && accessToken && !clientReferralStates[clientId]) {
        void loadClientReferral(clientId, accessToken);
      }
    },
    [
      accessToken,
      clientReferralStates,
      loadClientReferral,
      selectedClientId,
    ],
  );

  const handleCreateClientReferralLink = useCallback(
    async (clientId: string) => {
      if (!accessToken) {
        return;
      }

      const currentState = clientReferralStates[clientId];
      const currentStats =
        currentState?.status === "ready" ? currentState.stats : null;

      setCreatingReferralClientId(clientId);

      try {
        const link = await createClientReferralLink(clientId, accessToken);
        const stats = await getClientReferralStats(clientId, accessToken).catch(
          () => currentStats,
        );

        setClientReferralStates((currentStates) => ({
          ...currentStates,
          [clientId]: {
            status: "ready",
            link,
            stats,
          },
        }));
        showMessage("Referral link created.", setToast);
      } catch (error) {
        showMessage(getErrorMessage(error), setToast);
      } finally {
        setCreatingReferralClientId((currentClientId) =>
          currentClientId === clientId ? null : currentClientId,
        );
      }
    },
    [accessToken, clientReferralStates],
  );

  useEffect(() => {
    if (!hasSupabaseBrowserConfig()) {
      return;
    }

    // Guard async session callbacks so unmounted account screens do not update
    // state after navigation.
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
        setSelectedClientId(null);
        setClientReferralStates({});
        setCreatingReferralClientId(null);
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
    setCanNativeShare(
      typeof navigator !== "undefined" &&
        typeof navigator.share === "function",
    );
  }, []);

  useEffect(() => {
    if (
      activeTab !== "clients" ||
      loadState.status !== "ready" ||
      clientsLoadState.status !== "idle"
    ) {
      return;
    }

    // Defer the client list fetch until the tab is visible; the profile screen
    // remains lighter on first load and avoids exposing client data unnecessarily.
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

    // Only submit gated fields when the plan includes them; the backend should
    // still enforce entitlements, but this avoids confusing user-side changes.
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
    <main className="min-h-screen bg-[#FAF7F2] text-foreground">
      <div className="grid min-h-screen w-full bg-[#FAF7F2] lg:grid-cols-[17rem_1fr]">
        <AccountSideNav activeTab={activeTab} onTabChange={setActiveTab} />

        <section className="min-w-0 bg-[#FAF7F2] px-4 py-5 sm:px-7 sm:py-8 lg:px-10">
          <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#111111] sm:text-3xl">
                {activeTab === "dashboard"
                  ? `Good morning${profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}`
                  : "Account Management"}
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                {activeTab === "dashboard"
                  ? "Here's what's happening with your chair."
                  : "Manage your private account details, public booking identity, and plan access."}
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-[8px] border border-[#E4D6C3] bg-white px-3 py-2 text-xs font-bold text-[#1C1C1E] shadow-[0_8px_22px_rgba(17,17,17,0.04)]">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              {plan ? plan.displayName : "Account portal"}
            </div>
          </header>

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
              activeTab === "dashboard" ? (
                <DashboardTabPanel profile={profile} plan={plan} />
              ) : activeTab === "profile" ? (
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
                  selectedClientId={selectedClientId}
                  referralStates={clientReferralStates}
                  creatingReferralClientId={creatingReferralClientId}
                  canNativeShare={canNativeShare}
                  onClientToggle={handleClientToggle}
                  onCreateReferralLink={handleCreateClientReferralLink}
                  onReferralRetry={(clientId) =>
                    void loadClientReferral(clientId, accessToken)
                  }
                  onMessage={(message) => showMessage(message, setToast)}
                  onRetry={() => void loadClients(accessToken)}
                />
              ) : (
                <BlankTabPanel title="Appointments" />
              )
            ) : null}
          </div>
        </section>
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
