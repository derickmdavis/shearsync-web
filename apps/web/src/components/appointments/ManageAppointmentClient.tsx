"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ApiError,
  cancelManagedAppointment,
  getManagedAppointment,
  getPublicAvailability,
  getPublicServices,
  getPublicSlots,
  rescheduleManagedAppointment,
  type AppointmentManageLinkSource,
  type PublicManagedAppointment,
  type PublicService,
  type PublicSlot,
  type PublicSlotsResponse,
} from "@/src/lib/api";
import {
  buildAvailabilityDateOptions,
  buildFallbackDateOptions,
  extractAvailabilityDates,
  extractAvailabilityRows,
  extractAvailabilityTimezone,
  formatCurrency,
  formatDuration,
  formatLongDate,
  formatTime,
  formatTimezoneLabel,
  getTodayDateValue,
} from "@/src/lib/booking-format";
import { TimeStep } from "@/src/components/booking/TimeStep";
import { isSlotConflictError } from "@/src/components/booking/booking-flow-utils";

type ManageAppointmentClientProps = {
  token: string;
  source?: AppointmentManageLinkSource;
};

type ManageMode = "details" | "cancel" | "reschedule" | "success";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; appointment: PublicManagedAppointment }
  | { status: "error"; title: string; message: string };

type AvailabilityDayPreview = {
  date: string;
  slots: PublicSlot[];
};

function getBookableSlots(response: PublicSlotsResponse) {
  const slotMap = new Map<string, PublicSlot>();

  [...(response.slots ?? []), ...(response.moreSlots ?? [])].forEach((slot) => {
    slotMap.set(slot.start, slot);
  });

  return Array.from(slotMap.values());
}

export function ManageAppointmentClient({
  token,
  source = "legacy-token",
}: ManageAppointmentClientProps) {
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [mode, setMode] = useState<ManageMode>("details");
  const [servicesLoading, setServicesLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<PublicService | null>(
    null,
  );
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [dateOptions, setDateOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<PublicSlot[]>([]);
  const [loadedSlotsDate, setLoadedSlotsDate] = useState("");
  const [slotPreviews, setSlotPreviews] = useState<Record<string, PublicSlot[]>>(
    {},
  );
  const [selectedSlot, setSelectedSlot] = useState<PublicSlot | null>(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const selectedServiceRef = useRef<PublicService | null>(null);

  const appointment =
    loadState.status === "ready" ? loadState.appointment : null;
  const activeTimezone = timezone ?? appointment?.business_timezone ?? null;
  const pageName =
    appointment?.business_name ||
    appointment?.stylist_display_name ||
    "DripDesk";
  const canManage =
    Boolean(appointment?.can_cancel || appointment?.can_reschedule) &&
    appointment?.status !== "cancelled";
  const selectedServiceId = selectedService?.id ?? "";
  const upcomingDays = useMemo<AvailabilityDayPreview[]>(() => {
    const today = getTodayDateValue();
    const orderedDates = Array.from(
      new Set([selectedDate, ...dateOptions].filter(Boolean)),
    ).filter((date) => date >= today);

    return orderedDates
      .map((date) => ({
        date,
        slots:
          slotPreviews[date] ??
          (date === selectedDate && loadedSlotsDate === selectedDate
            ? slots
            : []),
      }))
      .filter((day) => day.slots.length > 0);
  }, [dateOptions, loadedSlotsDate, selectedDate, slotPreviews, slots]);

  useEffect(() => {
    selectedServiceRef.current = selectedService;
  }, [selectedService]);

  useEffect(() => {
    let cancelled = false;

    async function loadAppointment() {
      setLoadState({ status: "loading" });

      try {
        const nextAppointment = await getManagedAppointment(token, source);

        if (cancelled) {
          return;
        }

        setTimezone(nextAppointment.business_timezone ?? null);
        setSelectedDate(
          getDateValueInTimezone(
            nextAppointment.appointment_date,
            nextAppointment.business_timezone,
          ),
        );
        setLoadState({ status: "ready", appointment: nextAppointment });
      } catch (error) {
        if (cancelled) {
          return;
        }

        setLoadState(getFriendlyLoadError(error));
      }
    }

    void loadAppointment();

    return () => {
      cancelled = true;
    };
  }, [source, token]);

  useEffect(() => {
    let cancelled = false;

    async function loadServices() {
      if (!appointment?.stylist_slug || !appointment.can_reschedule) {
        return;
      }

      setServicesLoading(true);
      setServiceError(null);

      try {
        const nextServices = await getPublicServices(appointment.stylist_slug);

        if (cancelled) {
          return;
        }

        setSelectedService((currentService) => {
          if (
            currentService &&
            nextServices.some((service) => service.id === currentService.id)
          ) {
            return currentService;
          }

          return findCurrentService(nextServices, appointment);
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        setServiceError(
          error instanceof Error
            ? error.message
            : "Unable to load services right now.",
        );
      } finally {
        if (!cancelled) {
          setServicesLoading(false);
        }
      }
    }

    void loadServices();

    return () => {
      cancelled = true;
    };
  }, [appointment]);

  const getSlotsForDate = useCallback(
    async (date: string) => {
      const activeAppointment =
        loadState.status === "ready" ? loadState.appointment : null;
      const activeService = selectedServiceRef.current;

      if (!activeAppointment || !activeService) {
        return null;
      }

      return getPublicSlots(
        activeAppointment.stylist_slug,
        activeService.id,
        date,
      );
    },
    [loadState],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      if (!appointment?.stylist_slug || !selectedServiceId || mode !== "reschedule") {
        return;
      }

      setAvailabilityLoading(true);
      setAvailabilityError(null);

      try {
        const availability = await getPublicAvailability(appointment.stylist_slug);

        if (cancelled) {
          return;
        }

        const dates = extractAvailabilityDates(availability);
        const recurringDates = buildAvailabilityDateOptions(
          extractAvailabilityRows(availability),
        );
        const fallbackDates = buildFallbackDateOptions();
        const nextDates = Array.from(
          new Set(
            dates.length
              ? dates
              : recurringDates.length
                ? recurringDates
                : fallbackDates,
          ),
        );
        let nextTimezone =
          extractAvailabilityTimezone(availability) ??
          appointment.business_timezone ??
          null;
        let nextSelectedDate = getDateValueInTimezone(
          appointment.appointment_date,
          nextTimezone,
        );
        let nextSlots: PublicSlot[] = [];

        for (const date of Array.from(new Set([nextSelectedDate, ...nextDates]))) {
          const response = await getSlotsForDate(date);

          if (cancelled) {
            return;
          }

          if (!response) {
            return;
          }

          nextTimezone = response.timezone ?? nextTimezone;
          const responseSlots = getBookableSlots(response);

          if (responseSlots.length > 0) {
            nextSelectedDate = date;
            nextSlots = responseSlots;
            break;
          }
        }

        setTimezone(nextTimezone);
        setDateOptions(nextDates);
        setSelectedDate(nextSelectedDate);
        setSlots(nextSlots);
        setLoadedSlotsDate(nextSelectedDate);
        setSlotPreviews(nextSlots.length ? { [nextSelectedDate]: nextSlots } : {});
      } catch (error) {
        if (cancelled) {
          return;
        }

        setDateOptions(buildFallbackDateOptions());
        setSlots([]);
        setLoadedSlotsDate("");
        setSelectedSlot(null);
        setAvailabilityError(
          error instanceof Error
            ? error.message
            : "Unable to load availability right now.",
        );
      } finally {
        if (!cancelled) {
          setAvailabilityLoading(false);
        }
      }
    }

    void loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [
    appointment,
    getSlotsForDate,
    mode,
    selectedServiceId,
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadSlots() {
      if (!selectedDate || !selectedServiceId || mode !== "reschedule") {
        return;
      }

      setAvailabilityError(null);

      try {
        const response = await getSlotsForDate(selectedDate);

        if (cancelled || !response) {
          return;
        }

        const nextSlots = getBookableSlots(response);
        setTimezone(response.timezone ?? activeTimezone);
        setSlots(nextSlots);
        setLoadedSlotsDate(selectedDate);
        setSlotPreviews((currentPreviews) => ({
          ...currentPreviews,
          [selectedDate]: nextSlots,
        }));
        setSelectedSlot((currentSlot) =>
          nextSlots.find((slot) => slot.start === currentSlot?.start) ?? null,
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        setSlots([]);
        setLoadedSlotsDate("");
        setSelectedSlot(null);
        setAvailabilityError(
          error instanceof Error
            ? error.message
            : "Unable to load time slots for this date.",
        );
      }
    }

    void loadSlots();

    return () => {
      cancelled = true;
    };
  }, [
    activeTimezone,
    getSlotsForDate,
    mode,
    selectedDate,
    selectedServiceId,
  ]);

  async function handleCancelAppointment() {
    if (!appointment?.can_cancel) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const nextAppointment = await cancelManagedAppointment(token, source);
      setLoadState({ status: "ready", appointment: nextAppointment });
      setMode("success");
      setSuccessMessage("Your appointment has been cancelled.");
    } catch (error) {
      setSubmitError(getFriendlyActionMessage(error, "cancel"));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmitReschedule() {
    if (!appointment?.can_reschedule || !selectedService || !selectedSlot) {
      setSubmitError("Please choose a new date and time.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const nextAppointment = await rescheduleManagedAppointment(
        token,
        source,
        {
          newAppointmentDate: selectedSlot.start,
          service_id: selectedService.id,
        },
      );

      setLoadState({ status: "ready", appointment: nextAppointment });
      setMode("success");
      setSuccessMessage(
        nextAppointment.status === "pending"
          ? "Your new time has been requested and is awaiting approval."
          : "Your appointment has been rescheduled.",
      );
      setSelectedSlot(null);
    } catch (error) {
      if (isSlotConflictError(error, error instanceof Error ? error.message : "")) {
        setSelectedSlot(null);
        setAvailabilityError(
          "That time is no longer available. Please choose another time.",
        );
        setMode("reschedule");
      } else {
        setSubmitError(getFriendlyActionMessage(error, "reschedule"));
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loadState.status === "loading") {
    return (
      <Shell>
        <div className="space-y-4">
          <div className="h-8 w-32 animate-pulse rounded-full bg-zinc-100" />
          <div className="h-40 animate-pulse rounded-[24px] bg-zinc-50" />
          <div className="h-14 animate-pulse rounded-2xl bg-zinc-100" />
        </div>
      </Shell>
    );
  }

  if (loadState.status === "error") {
    return (
      <Shell>
        <p className="font-display text-4xl font-semibold italic text-foreground">
          DripDesk
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
          {loadState.title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">{loadState.message}</p>
      </Shell>
    );
  }

  const readyAppointment = loadState.appointment;

  return (
    <Shell>
      <div>
        <p className="font-display text-4xl font-semibold italic text-foreground">
          {pageName}
        </p>
        <p className="mt-1 text-sm text-muted">
          Appointment with {appointment?.stylist_display_name}
        </p>
      </div>

      {mode === "details" ? (
        <div className="mt-7">
          <AppointmentSummary
            appointment={readyAppointment}
            timezone={activeTimezone}
          />

          {!canManage ? (
            <NoticeCard>
              {getManageDisabledMessage(readyAppointment)}
            </NoticeCard>
          ) : null}

          <PolicyText appointment={readyAppointment} />

          <div className="mt-5 grid gap-3">
            {readyAppointment.can_reschedule ? (
              <button
                type="button"
                onClick={() => {
                  setMode("reschedule");
                  setSubmitError(null);
                }}
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Reschedule appointment
              </button>
            ) : null}

            {readyAppointment.can_cancel ? (
              <button
                type="button"
                onClick={() => {
                  setMode("cancel");
                  setSubmitError(null);
                }}
                className="flex h-14 w-full items-center justify-center rounded-2xl border border-border bg-white px-5 text-base font-semibold text-foreground transition-colors hover:bg-surface-warm"
              >
                Cancel appointment
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {mode === "cancel" ? (
        <div className="mt-7">
          <AppointmentSummary
            appointment={readyAppointment}
            timezone={activeTimezone}
          />
          <div className="mt-5 rounded-2xl border border-border bg-surface-warm p-4">
            <h1 className="text-[26px] font-semibold tracking-tight text-foreground">
              Cancel this appointment?
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              This will release the time on your stylist&apos;s calendar. You can
              book a new appointment later from their booking page.
            </p>
          </div>

          {submitError ? (
            <p className="mt-4 text-sm leading-6 text-red-500">{submitError}</p>
          ) : null}

          <button
            type="button"
            onClick={handleCancelAppointment}
            disabled={submitting}
            className="mt-5 flex h-14 w-full items-center justify-center rounded-2xl bg-danger px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(239,68,68,0.18)] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? "Cancelling..." : "Yes, cancel appointment"}
          </button>
          <BackButton onClick={() => setMode("details")} />
        </div>
      ) : null}

      {mode === "reschedule" ? (
        <div className="mt-7">
          <div>
            <h1 className="text-[30px] font-semibold tracking-tight text-foreground">
              Choose a new time
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              Your service and contact details stay the same. Pick a new date
              and time for this appointment.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {servicesLoading ? (
              <NoticeCard>Loading appointment availability...</NoticeCard>
            ) : null}

            {serviceError ? (
              <p className="text-sm leading-6 text-red-500">{serviceError}</p>
            ) : null}

            {!servicesLoading && !selectedService && !serviceError ? (
              <NoticeCard>
                Online rescheduling is unavailable right now.
              </NoticeCard>
            ) : null}
          </div>

          {selectedService ? (
            <div className="mt-8">
              <TimeStep
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                upcomingDays={upcomingDays}
                loading={availabilityLoading}
                error={availabilityError}
                timezone={activeTimezone}
                onDateSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                  setAvailabilityError(null);
                }}
                onSlotSelect={(slot) => {
                  setSelectedSlot(slot);
                  setAvailabilityError(null);
                  setSubmitError(null);
                }}
                onBack={() => setMode("details")}
                onContinue={handleSubmitReschedule}
              />
            </div>
          ) : null}

          {submitError ? (
            <p className="mt-4 text-sm leading-6 text-red-500">{submitError}</p>
          ) : null}

          <div className="mt-6 text-xs font-medium text-muted">
            {selectedService ? formatTimezoneLabel(activeTimezone) : null}
          </div>
        </div>
      ) : null}

      {mode === "success" ? (
        <div className="mt-7">
          <div className="rounded-2xl border border-border bg-brand-soft p-5">
            <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand">
              Done
            </p>
            <h1 className="mt-2 text-[30px] font-semibold tracking-tight text-foreground">
              {successMessage}
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              A confirmation email will follow if your stylist has notifications
              enabled.
            </p>
          </div>

          <div className="mt-5">
            <AppointmentSummary
              appointment={readyAppointment}
              timezone={activeTimezone}
            />
          </div>

          <button
            type="button"
            onClick={() => setMode("details")}
            className="mt-5 flex h-14 w-full items-center justify-center rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            View appointment
          </button>
        </div>
      ) : null}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[30px] border border-white/80 bg-card p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] sm:p-8">
      {children}
    </div>
  );
}

function AppointmentSummary({
  appointment,
  timezone,
}: {
  appointment: PublicManagedAppointment;
  timezone?: string | null;
}) {
  return (
    <div className="rounded-[22px] border border-border bg-white p-5 shadow-[0_2px_10px_rgba(17,17,17,0.035)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">For</p>
          <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-foreground">
            {appointment.client_name}
          </h1>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="mt-5 space-y-4">
        <SummaryRow label="Service">
          <div className="text-right">
            <p className="font-semibold text-foreground">
              {appointment.service_name}
            </p>
            <p className="mt-1 text-sm text-muted">
              {formatDuration(appointment.service_duration_minutes)} ·{" "}
              {formatCurrency(appointment.service_price)}
            </p>
          </div>
        </SummaryRow>
        <SummaryRow label="Date">
          <div className="text-right">
            <p className="font-semibold text-foreground">
              {formatLongDate(appointment.appointment_date, timezone)}
            </p>
            <p className="mt-1 text-sm text-muted">
              {formatTime(appointment.appointment_date, timezone)}
            </p>
          </div>
        </SummaryRow>
        <SummaryRow label="Stylist">
          <p className="text-right font-semibold text-foreground">
            {appointment.stylist_display_name}
          </p>
        </SummaryRow>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-border pt-4">
      <p className="text-sm font-semibold text-muted">{label}</p>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.toLowerCase();
  const tone =
    normalizedStatus === "cancelled"
      ? "bg-red-50 text-red-600"
      : normalizedStatus === "pending"
        ? "bg-amber-50 text-amber-700"
        : "bg-brand-soft text-brand";

  return (
    <span
      className={[
        "inline-flex h-8 shrink-0 items-center rounded-full px-3 text-xs font-bold capitalize",
        tone,
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function NoticeCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-warm p-4 text-sm leading-6 text-muted">
      {children}
    </div>
  );
}

function PolicyText({
  appointment,
}: {
  appointment: PublicManagedAppointment;
}) {
  const policyMessages = [
    appointment.reschedule_policy_text,
    appointment.cancellation_policy_text,
  ].filter(Boolean);

  if (!policyMessages.length) {
    return null;
  }

  return (
    <div className="mt-5 space-y-2 text-sm leading-6 text-muted">
      {policyMessages.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
    >
      Back
    </button>
  );
}

function findCurrentService(
  services: PublicService[],
  appointment: PublicManagedAppointment,
) {
  return (
    services.find(
      (service) =>
        service.name.trim().toLowerCase() ===
        appointment.service_name.trim().toLowerCase(),
    ) ??
    services.find(
      (service) =>
        service.durationMinutes === appointment.service_duration_minutes &&
        service.price === appointment.service_price,
    ) ??
    null
  );
}

function getFriendlyLoadError(error: unknown): LoadState {
  const message =
    error instanceof Error ? error.message.trim().toLowerCase() : "";

  if (
    message.includes("invalid or expired") ||
    (error instanceof ApiError &&
      [401, 404, 410].includes(error.status))
  ) {
    return {
      status: "error",
      title: "This link has expired",
      message: error instanceof ApiError && error.message
        ? error.message
        : "This appointment link is no longer available. Please contact your stylist.",
    };
  }

  if (message.includes("can no longer be managed")) {
    return {
      status: "error",
      title: "Appointment unavailable",
      message:
        "This appointment can no longer be changed from this link. Please contact your stylist directly.",
    };
  }

  return {
    status: "error",
    title: "We couldn't load this appointment",
    message:
      error instanceof Error
        ? error.message
        : "Please check the link or try again in a moment.",
  };
}

function getFriendlyActionMessage(error: unknown, action: "cancel" | "reschedule") {
  const rawMessage = error instanceof Error ? error.message : "";
  const message = rawMessage.trim().toLowerCase();

  if (message.includes("invalid or expired")) {
    return "This appointment link has expired. Please contact your stylist for help.";
  }

  if (message.includes("can no longer be managed")) {
    return "This appointment can no longer be changed from this link.";
  }

  if (message.includes("requested time is no longer available")) {
    return "That time is no longer available. Please choose another time.";
  }

  return rawMessage || `Unable to ${action} this appointment right now.`;
}

function getManageDisabledMessage(appointment: PublicManagedAppointment) {
  return (
    appointment.reschedule_disabled_reason ||
    appointment.cancel_disabled_reason ||
    "This appointment can no longer be managed from this link."
  );
}

function getDateValueInTimezone(dateTime: string, timezone?: string | null) {
  const parts = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timezone ?? undefined,
  }).formatToParts(new Date(dateTime));
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    return dateTime.slice(0, 10);
  }

  return `${year}-${month}-${day}`;
}
