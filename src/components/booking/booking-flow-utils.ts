import { ApiError, type PublicService, type PublicStylist } from "@/src/lib/api";

export type ContactValues = {
  fullName: string;
  email: string;
  phone: string;
};

type ApiErrorDetails = {
  code?: string;
  message?: string;
  reason?: string;
};

export function sortServices(services: PublicService[]) {
  // Preserve backend order as a stable tiebreaker when services do not define
  // sortOrder, preventing cards from jumping between renders.
  return services
    .map((service, index) => ({ service, index }))
    .sort((left, right) => {
      const leftSortOrder = left.service.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightSortOrder = right.service.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftSortOrder !== rightSortOrder) {
        return leftSortOrder - rightSortOrder;
      }

      return left.index - right.index;
    })
    .map(({ service }) => service);
}

export function detailsAreValid(values: ContactValues) {
  // The intake endpoint needs enough identity information to decide whether
  // returning-client rules apply before exposing service options.
  const parsedName = splitFullName(values.fullName);

  return (
    Boolean(values.fullName.trim()) &&
    Boolean(parsedName.lastName) &&
    Boolean(values.phone.trim()) &&
    (!values.email.trim() || isValidEmail(values.email.trim()))
  );
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function splitFullName(value: string) {
  const parts = value.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export function isSlotConflictError(error: unknown, message: string) {
  if (!(error instanceof ApiError)) {
    return false;
  }

  const details = getApiErrorDetails(error);
  const normalizedMessage = message.trim().toLowerCase();
  const normalizedReason = details?.reason?.trim().toLowerCase();

  return (
    error.status === 409 ||
    normalizedMessage === "requested time is no longer available" ||
    normalizedMessage === "this time slot is already booked." ||
    normalizedReason === "requested time is no longer available" ||
    normalizedReason === "this time slot is already booked."
  );
}

export function isBookingSchemaMismatch(error: unknown) {
  // This handles a known backend migration mismatch so users see a graceful
  // fallback instead of a database-shaped error.
  if (!(error instanceof ApiError)) {
    return false;
  }

  const details = getApiErrorDetails(error);
  const normalizedMessage = error.message.trim().toLowerCase();
  const normalizedDetailsMessage = details?.message?.trim().toLowerCase();

  return (
    details?.code === "PGRST204" &&
    (normalizedMessage === "unable to create appointment" ||
      normalizedDetailsMessage?.includes("booking_source column"))
  );
}

export function isBookingDisabledError(error: unknown) {
  return (
    error instanceof ApiError &&
    error.status === 400 &&
    normalizeApiErrorMessage(error) ===
      "online booking is not enabled for this stylist"
  );
}

export function isBookingContextExpiredError(error: unknown) {
  return (
    error instanceof ApiError &&
    error.status === 400 &&
    normalizeApiErrorMessage(error) ===
      "booking context is invalid or expired"
  );
}

export function isSelectedServiceUnavailableError(error: unknown) {
  return (
    error instanceof ApiError &&
    error.status === 400 &&
    normalizeApiErrorMessage(error) === "selected service is not available"
  );
}

export function buildBookingServiceUnavailableMessage(stylist: PublicStylist) {
  if (stylist.phone_number?.trim()) {
    return `Online booking is temporarily unavailable. Please call ${stylist.phone_number} to finish your appointment.`;
  }

  return "Online booking is temporarily unavailable. Please contact the business to finish your appointment.";
}

export function getApiErrorReason(error: unknown) {
  const reason = getApiErrorDetails(error)?.reason?.trim();

  return reason || null;
}

function getApiErrorDetails(error: unknown) {
  if (
    !(error instanceof ApiError) ||
    !error.details ||
    typeof error.details !== "object"
  ) {
    return null;
  }

  return error.details as ApiErrorDetails;
}

function normalizeApiErrorMessage(error: ApiError) {
  return error.message.trim().toLowerCase();
}
