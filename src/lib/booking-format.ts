import type {
  PublicAvailabilityResponse,
  PublicBookingConfirmation,
  PublicService,
  PublicSlot,
  RawAvailabilityRow,
  PublicStylist,
} from "@/src/lib/api";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (!hours) {
    return `${minutes}m`;
  }

  if (!minutes) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

export function sumServiceDurations(services: PublicService[]) {
  return services.reduce(
    (total, service) => total + service.duration_minutes,
    0,
  );
}

export function sumServicePrices(services: PublicService[]) {
  return services.reduce((total, service) => total + service.price, 0);
}

export function formatServiceNames(services: PublicService[]) {
  return services.map((service) => service.name).join(", ");
}

export function formatLongDate(dateTime: string, timeZone?: string | null) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: timeZone ?? undefined,
  }).format(new Date(dateTime));
}

export function formatTime(dateTime: string, timeZone?: string | null) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timeZone ?? undefined,
  }).format(new Date(dateTime));
}

export function formatTimezoneLabel(timezone?: string | null) {
  if (!timezone) {
    return "Local timezone";
  }

  return `Times shown in ${timezone}`;
}

export function extractAvailabilityDates(
  availability?: PublicAvailabilityResponse,
) {
  // The API may return either summarized dates or raw recurring rows; this
  // helper normalizes the summary shape while row handling stays separate.
  if (Array.isArray(availability)) {
    return [];
  }

  const dates =
    availability?.available_dates ??
    availability?.dates ??
    availability?.next_available_dates ??
    [];

  return dates.filter(Boolean);
}

export function extractAvailabilityRows(
  availability?: PublicAvailabilityResponse,
) {
  if (!Array.isArray(availability)) {
    return [] as RawAvailabilityRow[];
  }

  return availability.filter((row) => row.is_active);
}

export function buildAvailabilityDateOptions(
  rows: RawAvailabilityRow[],
  {
    startDate = getTodayDateValue(),
    count = 21,
    scanDays = 84,
  }: {
    startDate?: string;
    count?: number;
    scanDays?: number;
  } = {},
) {
  // When the backend only returns recurring weekly availability, scan forward
  // from today and produce concrete date strings for the booking UI.
  const activeDays = new Set(
    rows.filter((row) => row.is_active).map((row) => row.day_of_week),
  );

  if (!activeDays.size) {
    return [];
  }

  const dates: string[] = [];

  for (let offset = 0; offset < scanDays && dates.length < count; offset += 1) {
    const date = addDaysToDate(startDate, offset);

    if (activeDays.has(new Date(`${date}T12:00:00`).getDay())) {
      dates.push(date);
    }
  }

  return dates;
}

export function extractAvailabilityTimezone(
  availability?: PublicAvailabilityResponse,
) {
  if (!availability || Array.isArray(availability)) {
    return null;
  }

  return availability.timezone ?? null;
}

export function buildFallbackDateOptions(count = 7) {
  const options: string[] = [];
  const now = new Date();

  for (let index = 0; index < count; index += 1) {
    options.push(addDaysToDate(formatDateValue(now), index));
  }

  return options;
}

export function getTodayDateValue() {
  return formatDateValue(new Date());
}

export function addDaysToDate(date: string, days: number) {
  const targetDate = parseDateValue(date);
  targetDate.setDate(targetDate.getDate() + days);
  return formatDateValue(targetDate);
}

export function startOfWeek(date: string) {
  const targetDate = parseDateValue(date);
  const dayOffset = (targetDate.getDay() + 6) % 7;
  targetDate.setDate(targetDate.getDate() - dayOffset);
  return formatDateValue(targetDate);
}

export function buildWeekDateOptions(weekStart: string, count = 7) {
  return Array.from({ length: count }, (_, index) =>
    addDaysToDate(weekStart, index),
  );
}

export function formatShortWeekday(date: string, timeZone?: string | null) {
  const targetDate = new Date(`${date}T12:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: timeZone ?? undefined,
  }).format(targetDate);
}

export function formatMonthDay(date: string, timeZone?: string | null) {
  const targetDate = new Date(`${date}T12:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: timeZone ?? undefined,
  }).format(targetDate);
}

export function formatMonthLabel(date: string, timeZone?: string | null) {
  const targetDate = new Date(`${date}T12:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: timeZone ?? undefined,
  }).format(targetDate);
}

export function buildSummaryName(stylist: PublicStylist) {
  return stylist.business_name || stylist.display_name;
}

export function buildBookingIcs(
  confirmation: PublicBookingConfirmation,
  stylist: PublicStylist,
  services: PublicService[],
  slot: PublicSlot,
) {
  // Generate a small client-side .ics file from the confirmation payload so the
  // user can save the appointment without another backend round trip.
  const selectedServices = services.length
    ? services
    : [
        {
          id: confirmation.service_id,
          name: confirmation.service_name,
          duration_minutes: confirmation.service_duration_minutes,
          price: confirmation.service_price,
          is_active: true,
        },
      ];
  const serviceNames = formatServiceNames(selectedServices);
  const dtStart = toIcsDate(slot.start);
  const dtEnd = toIcsDate(confirmation.appointment_end || slot.end);
  const title = `${serviceNames} with ${stylist.display_name}`;
  const description = [
    `Business: ${buildSummaryName(stylist)}`,
    `Stylist: ${stylist.display_name}`,
    `Service: ${serviceNames}`,
  ].join("\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ChairDesk//Public Booking//EN",
    "BEGIN:VEVENT",
    `UID:${confirmation.appointment_id ?? `${stylist.slug}-${slot.start}`}`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(buildSummaryName(stylist))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function buildBookingNotes(
  services: PublicService[],
  notes: string,
) {
  // Multi-service bookings still send a primary service_id for compatibility,
  // so include the full service list in notes for backend/operator visibility.
  const trimmedNotes = notes.trim();

  if (services.length <= 1) {
    return trimmedNotes || undefined;
  }

  const serviceSummary = `Selected services: ${formatServiceNames(services)}`;

  return trimmedNotes
    ? `${serviceSummary}\n${trimmedNotes}`
    : serviceSummary;
}

function toIcsDate(value: string) {
  return value.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcsText(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;")
    .replaceAll("\n", "\\n");
}

function parseDateValue(value: string) {
  // Noon avoids accidental date rollover around daylight-saving boundaries when
  // converting date-only strings through the local Date constructor.
  return new Date(`${value}T12:00:00`);
}

function formatDateValue(value: Date) {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, "0");
  const day = `${value.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}
