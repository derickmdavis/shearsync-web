export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  "http://localhost:3000";
export const DEFAULT_FETCH_TIMEOUT_MS = 15000;

// The frontend API accepts both wrapped { data, error } responses and bare
// payloads so it can tolerate older backend shapes during rollout.
export type ApiEnvelope<T> = {
  data?: T;
  error?: {
    message?: string;
    details?: unknown;
  };
};

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export type ClientAudience = "all" | "new" | "returning";

export type PublicStylistProfile = {
  id: string;
  slug: string;
  display_name: string;
  bio?: string | null;
  cover_photo_url?: string | null;
  instagram?: string | null;
  booking_enabled: boolean;
  business_name?: string | null;
  phone_number?: string | null;
  timezone?: string | null;
  features?: {
    waitlistEnabled?: boolean;
  } | null;
};

export type PublicStylist = PublicStylistProfile;

export type AccountProfile = {
  id: string;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  business_name: string | null;
  timezone: string;
  location_label?: string | null;
  avatar_image_id?: string | null;
  created_at: string;
  updated_at: string;
};

export type AccountProfileUpdate = {
  full_name?: string;
  phone_number?: string;
  business_name?: string;
  location_label?: string;
  avatar_image_id?: string;
  timezone?: string;
};

export type AuthBootstrapResponse = {
  auth: {
    userId: string;
    email?: string;
    source: "jwt" | string;
  };
  auth_user: {
    id: string;
    email?: string;
  };
  profile: Record<string, unknown> | null;
};

export type StylistSettingsProfile = {
  id: string;
  user_id: string;
  slug: string;
  display_name: string;
  bio: string | null;
  cover_photo_url: string | null;
  booking_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type StylistSettingsUpdate = {
  slug?: string;
  display_name?: string;
  bio?: string;
  cover_photo_url?: string;
  booking_enabled?: boolean;
};

export type Customer = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  preferred_name: string | null;
  phone: string | null;
  phone_normalized: string | null;
  email: string | null;
  instagram: string | null;
  birthday: string | null;
  notes: string | null;
  preferred_contact_method: "text" | "call" | "email" | "instagram" | null;
  tags: string[] | null;
  source:
    | "referral"
    | "instagram"
    | "walk-in"
    | "existing-client"
    | "other"
    | null;
  reminder_consent: boolean | null;
  total_spend: number | null;
  last_visit_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AccountTier = "basic" | "pro" | "premium";

export type AccountPlanStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "cancelled";

export type AccountPlanFeatures = {
  bookingPage: boolean;
  crm: boolean;
  emailReminders: boolean;
  smsReminders: boolean;
  customCoverPhoto: boolean;
  customSlug: boolean;
  googleCalendarSync: boolean;
  weeklyBusinessRecap: boolean;
  clientExport: boolean;
};

export type AccountPlan = {
  tier: AccountTier;
  status: AccountPlanStatus;
  displayName: string;
  smsMonthlyLimit: number;
  smsUsedThisMonth: number;
  smsRemainingThisMonth: number;
  features: AccountPlanFeatures;
};

export type PublicService = {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  durationMinutes: number;
  price: number;
  isActive: boolean;
  isDefault: boolean;
  sortOrder: number;
};

export type AvailabilitySummary = {
  timezone?: string | null;
  dates?: string[];
  available_dates?: string[];
  next_available_dates?: string[];
};

export type RawAvailabilityRow = {
  id: string;
  user_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  client_audience: ClientAudience;
};

export type PublicAvailabilityResponse =
  | AvailabilitySummary
  | RawAvailabilityRow[];

export type PublicSlot = {
  start: string;
  end: string;
  label?: string;
};

export type PublicSlotsResponse = {
  date: string;
  timezone?: string | null;
  service?: {
    id: string;
    name: string;
    durationMinutes: number;
    price: number;
  };
  slots: PublicSlot[];
  moreSlots?: PublicSlot[];
  hasMore?: boolean;
  intelligentSchedulingEnabled?: boolean;
};

export type PublicBookingIntakeMatchStatus =
  | "matched"
  | "not_found"
  | "ambiguous";

export type PublicBookingBehavior = {
  requiresApproval: boolean;
  restrictedToNewClientRules: boolean;
  canUseReturningClientRules: boolean;
  message: string;
};

export type PublicBookingIntakeClient = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneMasked: string;
};

export type PublicBookingIntakeRecommendationReason =
  | "last_completed_service"
  | "last_booked_service"
  | "default_service";

export type PublicBookingIntakeData = {
  matchStatus: PublicBookingIntakeMatchStatus;
  clientFound: boolean;
  isExistingClient: boolean;
  bookingContextToken: string;
  bookingEnabled: boolean;
  candidateCount?: number;
  client?: PublicBookingIntakeClient | null;
  submittedContact: {
    fullName: string;
    phoneNormalized: string;
    email: string | null;
  };
  recommendedService: {
    serviceId: string;
    serviceName: string;
    reason: PublicBookingIntakeRecommendationReason;
  } | null;
  bookingBehavior: PublicBookingBehavior;
  nextStep?: "collect_email_or_name";
};

export type CreatePublicBookingIntakeBody = {
  stylist_slug: string;
  full_name: string;
  phone: string;
  email?: string;
};

export type CreatePublicBookingBody = {
  stylist_slug: string;
  service_id: string;
  requested_datetime: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email?: string;
  guest_phone: string;
  booking_context_token?: string;
  notes?: string;
};

export type CreateWaitlistInput = {
  requestedDate: string;
  serviceId?: string | null;
  requestedTimePreference?: string | null;
  clientName: string;
  clientEmail?: string | null;
  clientPhone?: string | null;
  note?: string | null;
};

export type PublicWaitlistEntry = {
  id: string;
  requestedDate: string;
  serviceId?: string | null;
  serviceName?: string | null;
  requestedTimePreference?: string | null;
  clientName: string;
  clientEmail?: string | null;
  clientPhone?: string | null;
  note?: string | null;
  status: string;
  source: string;
  createdAt: string;
};

export type PublicBookingConfirmation = {
  appointment_id?: string;
  client_id?: string;
  stylist_slug: string;
  stylist_display_name?: string;
  business_name?: string;
  service_id: string;
  service_name: string;
  service_duration_minutes: number;
  service_price: number;
  appointment_date: string;
  appointment_end?: string;
  business_timezone?: string;
  status: "scheduled" | "pending" | string;
};

type RequestOptions = {
  init?: RequestInit;
  preferProxy?: boolean;
};

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = DEFAULT_FETCH_TIMEOUT_MS,
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const upstreamSignal = init.signal;

  function handleUpstreamAbort() {
    controller.abort();
  }

  if (upstreamSignal?.aborted) {
    controller.abort();
  } else {
    upstreamSignal?.addEventListener("abort", handleUpstreamAbort, {
      once: true,
    });
  }

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
    upstreamSignal?.removeEventListener("abort", handleUpstreamAbort);
  }
}

function isAbortError(error: unknown) {
  return (
    error instanceof DOMException && error.name === "AbortError"
  );
}

function isBrowser() {
  return typeof window !== "undefined";
}

function getRequestBaseUrl(preferProxy: boolean) {
  // Browser public calls prefer same-origin Next route handlers so RLS-sensitive
  // public mutations, like waitlist joins, go through the backend API instead
  // of directly touching Supabase from an anonymous client.
  if (preferProxy && isBrowser()) {
    return "";
  }

  return API_BASE_URL;
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  // Some backend/proxy errors return text, so parse defensively rather than
  // assuming every response is JSON.
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function unwrapPayload<T>(payload: ApiEnvelope<T> | T): T {
  // Prefer the backend's data field when present, but keep bare-object support
  // for endpoints that have not adopted the envelope yet.
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return ((payload as ApiEnvelope<T>).data ?? payload) as T;
  }

  return payload as T;
}

type LegacyPublicService = Omit<
  PublicService,
  "durationMinutes" | "isActive" | "isDefault" | "sortOrder"
> & {
  durationMinutes?: number;
  duration_minutes?: number;
  isActive?: boolean;
  is_active?: boolean;
  isDefault?: boolean;
  is_default?: boolean | null;
  sortOrder?: number;
  sort_order?: number | null;
};

function normalizePublicService(service: LegacyPublicService): PublicService {
  return {
    ...service,
    durationMinutes: service.durationMinutes ?? service.duration_minutes ?? 0,
    isActive: service.isActive ?? service.is_active ?? true,
    isDefault: service.isDefault ?? service.is_default ?? false,
    sortOrder:
      service.sortOrder ??
      service.sort_order ??
      Number.MAX_SAFE_INTEGER,
  };
}

function extractApiErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const error = (payload as ApiEnvelope<unknown>).error;
    if (error?.message) {
      return error.message;
    }
  }

  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  return fallback;
}

async function requestPublicApi<T>(
  path: string,
  { init, preferProxy = true }: RequestOptions = {},
) {
  const baseUrl = getRequestBaseUrl(preferProxy);
  const headers = new Headers(init?.headers);

  // Any request with a body is JSON by convention unless the caller explicitly
  // supplies a different Content-Type.
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetchWithTimeout(`${baseUrl}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    throw new ApiError(
      error instanceof Error
        ? isAbortError(error)
          ? "The booking service timed out. Please try again."
          : error.message
        : "A network error occurred while contacting the booking service.",
      0,
    );
  }

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      extractApiErrorMessage(payload, "Request failed."),
      response.status,
      payload && typeof payload === "object"
        ? (payload as ApiEnvelope<unknown>).error?.details
        : undefined,
    );
  }

  return unwrapPayload<T>(payload as ApiEnvelope<T> | T);
}

async function requestAuthenticatedApi<T>(
  path: string,
  accessToken: string,
  { init }: Pick<RequestOptions, "init"> = {},
) {
  const headers = new Headers(init?.headers);

  // Authenticated account/settings calls use the Supabase access token as a
  // bearer token; the backend still owns authorization decisions.
  headers.set("Authorization", `Bearer ${accessToken}`);

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    throw new ApiError(
      error instanceof Error
        ? isAbortError(error)
          ? "The account service timed out. Please try again."
          : error.message
        : "A network error occurred while contacting the account service.",
      0,
    );
  }

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      extractApiErrorMessage(payload, "Request failed."),
      response.status,
      payload && typeof payload === "object"
        ? (payload as ApiEnvelope<unknown>).error?.details
        : undefined,
    );
  }

  return unwrapPayload<T>(payload as ApiEnvelope<T> | T);
}

export async function getAuthenticatedUser(accessToken: string) {
  return requestAuthenticatedApi<AuthBootstrapResponse>("/me", accessToken);
}

export async function getPublicStylist(slug: string) {
  return requestPublicApi<PublicStylist>(`/api/public/stylists/${slug}`, {
    preferProxy: false,
  });
}

export async function getPublicServices(
  slug: string,
  bookingContextToken?: string | null,
) {
  const params = new URLSearchParams();

  if (bookingContextToken?.trim()) {
    params.set("booking_context_token", bookingContextToken);
  }

  const search = params.toString();

  const services = await requestPublicApi<LegacyPublicService[]>(
    `/api/public/services/${slug}${search ? `?${search}` : ""}`,
  );

  return services.map(normalizePublicService);
}

export async function getPublicAvailability(
  slug: string,
  bookingContextToken?: string | null,
) {
  const params = new URLSearchParams();

  if (bookingContextToken?.trim()) {
    params.set("booking_context_token", bookingContextToken);
  }

  const search = params.toString();

  return requestPublicApi<PublicAvailabilityResponse>(
    `/api/public/availability/${slug}${search ? `?${search}` : ""}`,
  );
}

export async function getPublicSlots(
  slug: string,
  serviceIds: string | string[],
  date: string,
  bookingContextToken?: string | null,
) {
  const normalizedServiceIds = Array.isArray(serviceIds)
    ? serviceIds.filter(Boolean)
    : [serviceIds];
  const params = new URLSearchParams({ date });

  if (normalizedServiceIds[0]) {
    params.set("service_id", normalizedServiceIds[0]);
  }

  if (bookingContextToken?.trim()) {
    params.set("booking_context_token", bookingContextToken);
  }

  return requestPublicApi<PublicSlotsResponse>(
    `/api/public/availability/${slug}/slots?${params.toString()}`,
  );
}

export async function createPublicBookingIntake(
  body: CreatePublicBookingIntakeBody,
) {
  return requestPublicApi<PublicBookingIntakeData>("/api/public/booking-intake", {
    init: {
      method: "POST",
      body: JSON.stringify(body),
    },
  });
}

export async function createPublicBooking(body: CreatePublicBookingBody) {
  return requestPublicApi<PublicBookingConfirmation>("/api/public/bookings", {
    init: {
      method: "POST",
      body: JSON.stringify(body),
    },
  });
}

export async function joinWaitlist(slug: string, input: CreateWaitlistInput) {
  // Public waitlist creation must go through the backend endpoint so anonymous
  // visitors never need direct table insert permissions.
  return requestPublicApi<PublicWaitlistEntry>(
    `/api/public/stylists/${slug}/waitlist`,
    {
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      },
    },
  );
}

export async function getAccountProfile(accessToken: string) {
  return requestAuthenticatedApi<AccountProfile>(
    "/api/settings/profile",
    accessToken,
  );
}

export async function updateAccountProfile(
  accessToken: string,
  body: AccountProfileUpdate,
) {
  return requestAuthenticatedApi<AccountProfile>(
    "/api/settings/profile",
    accessToken,
    {
      init: {
        method: "PATCH",
        body: JSON.stringify(body),
      },
    },
  );
}

export async function getStylistSettingsProfile(accessToken: string) {
  return requestAuthenticatedApi<StylistSettingsProfile>(
    "/api/settings/booking",
    accessToken,
  );
}

export async function updateStylistSettingsProfile(
  accessToken: string,
  body: StylistSettingsUpdate,
) {
  return requestAuthenticatedApi<StylistSettingsProfile>(
    "/api/settings/booking",
    accessToken,
    {
      init: {
        method: "PATCH",
        body: JSON.stringify(body),
      },
    },
  );
}

export async function getAccountPlan(accessToken: string) {
  return requestAuthenticatedApi<AccountPlan>("/api/account/plan", accessToken);
}

export async function getClients(accessToken: string) {
  const clients = await requestAuthenticatedApi<Customer[]>(
    "/api/clients",
    accessToken,
  );

  return [...clients].sort((clientA, clientB) => {
    const nameA = `${clientA.first_name} ${clientA.last_name}`.trim();
    const nameB = `${clientB.first_name} ${clientB.last_name}`.trim();

    return nameA.localeCompare(nameB, undefined, {
      sensitivity: "base",
      numeric: true,
    });
  });
}
