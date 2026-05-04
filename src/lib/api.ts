export const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:3000";

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
  booking_enabled: boolean;
  business_name?: string | null;
  phone_number?: string | null;
  timezone?: string | null;
};

export type PublicStylist = PublicStylistProfile;

export type PublicService = {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  is_default?: boolean | null;
  sort_order?: number | null;
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

export type AvailabilityWindow = {
  startTime: string;
  endTime: string;
  clientAudience: ClientAudience;
};

export type AvailabilityDay = {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isOpen: boolean;
  windows: AvailabilityWindow[];
};

export type AvailabilitySettingsResponse = {
  timezone: string;
  days: AvailabilityDay[];
};

export type PublicAvailabilityResponse =
  | AvailabilitySummary
  | RawAvailabilityRow[];

export type PublicSlot = {
  start: string;
  end: string;
};

export type PublicSlotsResponse = {
  date: string;
  timezone?: string | null;
  service?: {
    id: string;
    name: string;
    duration_minutes: number;
    price: number;
  };
  slots: PublicSlot[];
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
  service_ids?: string[];
  requested_datetime: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email?: string;
  guest_phone: string;
  notes?: string;
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

function isBrowser() {
  return typeof window !== "undefined";
}

function getRequestBaseUrl(preferProxy: boolean) {
  if (preferProxy && isBrowser()) {
    return "";
  }

  return API_BASE_URL;
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

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
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return ((payload as ApiEnvelope<T>).data ?? payload) as T;
  }

  return payload as T;
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

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    throw new ApiError(
      error instanceof Error
        ? error.message
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

  return requestPublicApi<PublicService[]>(
    `/api/public/services/${slug}${search ? `?${search}` : ""}`,
  );
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

  normalizedServiceIds.forEach((serviceId) => {
    params.append("service_ids", serviceId);
  });

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
