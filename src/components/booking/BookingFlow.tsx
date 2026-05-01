"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ApiError,
  createPublicBookingIntake,
  createPublicBooking,
  getPublicAvailability,
  getPublicSlots,
  type PublicBookingConfirmation,
  type PublicBookingIntakeData,
  type PublicService,
  type PublicSlot,
  type PublicStylist,
} from "@/src/lib/api";
import {
  buildFallbackDateOptions,
  buildBookingNotes,
  buildSummaryName,
  extractAvailabilityDates,
  formatTimezoneLabel,
} from "@/src/lib/booking-format";
import { BookedStep } from "@/src/components/booking/BookedStep";
import { BookingStepper } from "@/src/components/booking/BookingStepper";
import { ConfirmStep } from "@/src/components/booking/ConfirmStep";
import { DetailsStep } from "@/src/components/booking/DetailsStep";
import { TimeStep } from "@/src/components/booking/TimeStep";

type BookingFlowProps = {
  slug: string;
  stylist: PublicStylist;
  services: PublicService[];
  servicesError?: string | null;
};

type DetailsErrors = Partial<{
  fullName: string;
  email: string;
  phone: string;
}>;

type BookingIntakeState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; data: PublicBookingIntakeData }
  | { status: "error"; message: string };

type ApiErrorDetails = {
  code?: string;
  message?: string;
};

function isSlotConflictError(error: unknown, message: string) {
  if (!(error instanceof ApiError)) {
    return false;
  }

  const normalizedMessage = message.trim().toLowerCase();

  return (
    normalizedMessage === "requested time is no longer available" ||
    normalizedMessage === "this time slot is already booked."
  );
}

function getApiErrorDetails(error: unknown) {
  if (!(error instanceof ApiError) || !error.details || typeof error.details !== "object") {
    return null;
  }

  return error.details as ApiErrorDetails;
}

function isBookingSchemaMismatch(error: unknown) {
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

function buildBookingServiceUnavailableMessage(stylist: PublicStylist) {
  if (stylist.phone_number?.trim()) {
    return `Online booking is temporarily unavailable. Please call ${stylist.phone_number} to finish your appointment.`;
  }

  return "Online booking is temporarily unavailable. Please contact the business to finish your appointment.";
}

export function BookingFlow({
  slug,
  stylist,
  services,
  servicesError,
}: BookingFlowProps) {
  const sortedServices = useMemo(
    () =>
      [...services].sort((left, right) =>
        left.name.localeCompare(right.name, undefined, { sensitivity: "base" }),
      ),
    [services],
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [detailsErrors, setDetailsErrors] = useState<DetailsErrors>({});
  const [intakeState, setIntakeState] = useState<BookingIntakeState>({
    status: "idle",
  });
  const [serviceError, setServiceError] = useState<string | null>(
    servicesError ?? null,
  );
  const [selectedServices, setSelectedServices] = useState<PublicService[]>([]);
  const [dateOptions, setDateOptions] = useState<string[]>([]);
  const [disabledDates, setDisabledDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slots, setSlots] = useState<PublicSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<PublicSlot | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [availabilityTimezone, setAvailabilityTimezone] = useState<
    string | null
  >(stylist.timezone ?? null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] =
    useState<PublicBookingConfirmation | null>(null);

  const parsedName = useMemo(() => splitFullName(fullName), [fullName]);
  const intakeData = intakeState.status === "ready" ? intakeState.data : null;
  const activeTimezone = availabilityTimezone || stylist.timezone || null;
  const pageName = buildSummaryName(stylist);
  const showServicePicker =
    Boolean(selectedServices.length) || Boolean(intakeData?.bookingEnabled);
  const canBeginServiceSelection =
    Boolean(fullName.trim()) && Boolean(phone.trim());
  const detailsAreComplete =
    Boolean(fullName.trim()) &&
    Boolean(parsedName.lastName) &&
    Boolean(phone.trim()) &&
    (!email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()));
  const servicesUnlocked = Boolean(intakeData?.bookingEnabled) && detailsAreComplete;
  const selectedServiceIds = useMemo(
    () => selectedServices.map((service) => service.id),
    [selectedServices],
  );
  const primarySelectedService = selectedServices[0] ?? null;
  const canShowTimeStep = Boolean(selectedServices.length && selectedDate);

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      if (!selectedServiceIds.length || !stylist.booking_enabled) {
        return;
      }

      setSlotsLoading(true);
      setSlotsError(null);

      try {
        const availability = await getPublicAvailability(slug);
        if (cancelled) {
          return;
        }

        const dates = extractAvailabilityDates(availability);
        const fallbackDates = buildFallbackDateOptions();
        const nextDates =
          availability.dates?.filter(Boolean).length
            ? availability.dates.filter(Boolean)
            : dates.length
              ? dates
              : fallbackDates;
        const availableDates = new Set(dates);
        const candidateDates =
          nextDates.filter((date) => availableDates.size === 0 || availableDates.has(date));
        let nextTimezone = availability.timezone ?? stylist.timezone ?? null;
        const baseDisabledDates = nextDates.filter(
          (date) => availableDates.size > 0 && !availableDates.has(date),
        );

        let nextSelectedDate = nextDates[0] ?? "";
        let nextSlots: PublicSlot[] = [];
        const probeDisabledDates = [...baseDisabledDates];

        for (const date of candidateDates.length ? candidateDates : nextDates) {
          const response = await getPublicSlots(slug, selectedServiceIds, date);
          if (cancelled) {
            return;
          }

          nextTimezone = response.timezone ?? nextTimezone;

          if ((response.slots ?? []).length > 0) {
            nextSelectedDate = date;
            nextSlots = response.slots ?? [];
            break;
          }

          probeDisabledDates.push(date);
        }

        setAvailabilityTimezone(nextTimezone);
        setDateOptions(nextDates);
        setDisabledDates(Array.from(new Set(probeDisabledDates)));
        setSelectedDate(nextSelectedDate);
        if (nextSlots.length > 0) {
          setSlots(nextSlots);
        } else {
          setSlots([]);
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        setDateOptions(buildFallbackDateOptions());
        setDisabledDates([]);
        setSelectedDate((currentDate) => currentDate || buildFallbackDateOptions()[0]);
        setSlotsError(
          error instanceof Error
            ? error.message
            : "Unable to load availability right now.",
        );
      } finally {
        if (!cancelled) {
          setSlotsLoading(false);
        }
      }
    }

    void loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [selectedServiceIds, slug, stylist.booking_enabled, stylist.timezone]);

  useEffect(() => {
    let cancelled = false;

    async function loadSlots() {
      if (!selectedServiceIds.length || !selectedDate || !stylist.booking_enabled) {
        return;
      }

      setSlotsLoading(true);
      setSlotsError(null);

      try {
        const response = await getPublicSlots(slug, selectedServiceIds, selectedDate);
        if (cancelled) {
          return;
        }

        setAvailabilityTimezone(response.timezone ?? activeTimezone);
        setSlots(response.slots ?? []);
        setDisabledDates((currentDates) => {
          const nextDates = new Set(currentDates);

          if ((response.slots ?? []).length) {
            nextDates.delete(selectedDate);
          } else {
            nextDates.add(selectedDate);
          }

          return Array.from(nextDates);
        });
        setSelectedSlot((currentSlot) =>
          response.slots.find((slot) => slot.start === currentSlot?.start) ?? null,
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        setSlots([]);
        setSelectedSlot(null);
        setSlotsError(
          error instanceof Error
            ? error.message
            : "Unable to load time slots for this date.",
        );
      } finally {
        if (!cancelled) {
          setSlotsLoading(false);
        }
      }
    }

    void loadSlots();

    return () => {
      cancelled = true;
    };
  }, [
    activeTimezone,
    selectedDate,
    selectedServiceIds,
    slug,
    stylist.booking_enabled,
  ]);

  function validateDetails() {
    const nextErrors: DetailsErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    } else if (!parsedName.lastName) {
      nextErrors.fullName = "Please include a last name.";
    }

    if (!phone.trim()) {
      nextErrors.phone = "Phone is required.";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    setDetailsErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleContinueFromDetails() {
    if (!validateDetails()) {
      return;
    }

    if (!servicesUnlocked) {
      setIntakeState({ status: "loading" });
      setServiceError(null);

      try {
        const intake = await createPublicBookingIntake({
          stylist_slug: slug,
          full_name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
        });

        setIntakeState({ status: "ready", data: intake });

        if (!intake.bookingEnabled) {
          setServiceError("Online booking is not currently available.");
          return;
        }

        if (intake.recommendedService) {
          const recommended =
            sortedServices.find(
              (service) => service.id === intake.recommendedService?.serviceId,
            ) ?? null;

          setSelectedServices((currentServices) =>
            currentServices.length || !recommended ? currentServices : [recommended],
          );
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "We couldn't check your booking details right now.";

        setIntakeState({ status: "error", message });
        setServiceError(message);
      }

      return;
    }

    if (!selectedServices.length) {
      setServiceError("Please select at least one service to continue.");
      return;
    }

    setServiceError(null);
    setCurrentStep(2);
  }

  function handleContinueFromTime() {
    if (!selectedSlot) {
      setSlotsError("Please select a time to continue.");
      return;
    }

    setSlotsError(null);
    setCurrentStep(3);
  }

  async function refreshSlotsForSelectedDate() {
    if (!selectedServiceIds.length || !selectedDate) {
      return;
    }

    try {
      const response = await getPublicSlots(slug, selectedServiceIds, selectedDate);
      setSlots(response.slots ?? []);
      setSelectedSlot(null);
      setAvailabilityTimezone(response.timezone ?? activeTimezone);
    } catch {
      setSlots([]);
      setSelectedSlot(null);
    }
  }

  async function handleSubmitBooking() {
    if (!primarySelectedService || !selectedSlot) {
      return;
    }

    setSubmitting(true);
    setConfirmError(null);

    try {
      const response = await createPublicBooking({
        stylist_slug: slug,
        service_id: primarySelectedService.id,
        service_ids: selectedServiceIds,
        requested_datetime: selectedSlot.start,
        guest_first_name: parsedName.firstName,
        guest_last_name: parsedName.lastName,
        guest_email: email.trim() || undefined,
        guest_phone: phone.trim(),
        notes: buildBookingNotes(selectedServices, notes),
      });

      setConfirmation(response);
      setCurrentStep(5);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to submit your booking right now.";

      const debugPayload = {
        status: error instanceof ApiError ? error.status : undefined,
        message,
        details: error instanceof ApiError ? error.details : undefined,
        requested_datetime: selectedSlot.start,
        service_id: primarySelectedService.id,
        service_ids: selectedServiceIds,
        stylist_slug: slug,
      };

      console.error(
        `Booking submit failed ${JSON.stringify(debugPayload)}`,
      );

      if (isSlotConflictError(error, message)) {
        await refreshSlotsForSelectedDate();
        setSlotsError(
          "That time just became unavailable. Please choose another time.",
        );
        setConfirmError(null);
        setCurrentStep(2);
      } else if (isBookingSchemaMismatch(error)) {
        setConfirmError(buildBookingServiceUnavailableMessage(stylist));
      } else if (
        error instanceof ApiError &&
        /booking is not currently available|booking disabled/i.test(message)
      ) {
        setConfirmError("Online booking is not currently available.");
      } else {
        setConfirmError(message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setCurrentStep(1);
    setSelectedSlot(null);
    setNotes("");
    setConfirmError(null);
    setConfirmation(null);
  }

  function handleToggleService(service: PublicService) {
    setSelectedServices((currentServices) => {
      const alreadySelected = currentServices.some(
        (currentService) => currentService.id === service.id,
      );

      if (alreadySelected) {
        return currentServices.filter(
          (currentService) => currentService.id !== service.id,
        );
      }

      return [...currentServices, service];
    });
    setSelectedDate("");
    setSlots([]);
    setSelectedSlot(null);
    setSlotsError(null);
    setConfirmError(null);
    setServiceError(null);
  }

  function handleDetailsChange(field: "fullName" | "email" | "phone", value: string) {
    setDetailsErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));

    if (field === "fullName") {
      setFullName(value);
    }
    if (field === "email") {
      setEmail(value);
    }
    if (field === "phone") {
      setPhone(value);
    }

    if (intakeState.status !== "idle") {
      setIntakeState({ status: "idle" });
    }

    setServiceError(servicesError ?? null);
  }

  if (confirmation && selectedServices.length && selectedSlot) {
    return (
      <div className="rounded-[30px] border border-white/80 bg-card p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] sm:p-8">
        <BookedStep
          confirmation={confirmation}
          stylist={stylist}
          services={selectedServices}
          slot={selectedSlot}
          onDone={handleReset}
        />
      </div>
    );
  }

  return (
    <div className="rounded-[30px] border border-white/80 bg-card p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] sm:p-8">
      {stylist.cover_photo_url ? (
        <div
          className="-mx-6 -mt-6 mb-5 h-28 rounded-t-[30px] bg-zinc-100 bg-cover bg-center sm:-mx-8 sm:-mt-8"
          style={{ backgroundImage: `url(${stylist.cover_photo_url})` }}
        />
      ) : null}

      <div>
        <div>
          <p className="font-display text-4xl font-semibold italic text-foreground">
            {stylist.display_name}
          </p>
          {stylist.business_name ? (
            <p className="mt-1 text-sm text-muted">{stylist.business_name}</p>
          ) : null}
        </div>
      </div>

      {stylist.bio ? (
        <p className="mt-5 rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-6 text-muted">
          {stylist.bio}
        </p>
      ) : null}

      {!stylist.booking_enabled ? (
        <div className="mt-8 rounded-3xl border border-border bg-zinc-50 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {pageName}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Online booking is not currently available.
          </p>
          {stylist.phone_number ? (
            <p className="mt-4 text-sm font-medium text-foreground">
              Contact: {stylist.phone_number}
            </p>
          ) : null}
        </div>
      ) : (
        <>
          <div className="mt-8">
            <BookingStepper currentStep={currentStep} />
          </div>

          {currentStep === 1 ? (
            <DetailsStep
              values={{ fullName, email, phone }}
              errors={detailsErrors}
              services={sortedServices}
              intake={intakeData}
              intakeLoading={intakeState.status === "loading"}
              selectedServices={selectedServices}
              serviceError={serviceError}
              canBeginServiceSelection={canBeginServiceSelection}
              showServicePicker={showServicePicker}
              onChange={handleDetailsChange}
              onToggleService={handleToggleService}
              onContinue={handleContinueFromDetails}
            />
          ) : null}

          {currentStep === 2 ? (
            <TimeStep
              dates={dateOptions}
              disabledDates={disabledDates}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              slots={slots}
              loading={slotsLoading}
              error={slotsError}
              timezone={activeTimezone}
              onDateSelect={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null);
                setSlotsError(null);
              }}
              onSlotSelect={(slot) => {
                setSelectedSlot(slot);
                setSlotsError(null);
                setConfirmError(null);
              }}
              onBack={() => setCurrentStep(1)}
              onContinue={handleContinueFromTime}
            />
          ) : null}

          {currentStep === 3 && selectedServices.length && selectedSlot ? (
            <ConfirmStep
              stylist={stylist}
              services={selectedServices}
              slot={selectedSlot}
              fullName={fullName.trim()}
              email={email.trim()}
              phone={phone.trim()}
              notes={notes}
              submitting={submitting}
              error={confirmError}
              timezone={activeTimezone}
              bookingBehavior={intakeData?.bookingBehavior ?? null}
              onNotesChange={setNotes}
              onEdit={(step) => setCurrentStep(step)}
              onSubmit={handleSubmitBooking}
            />
          ) : null}

          <div className="mt-6 text-xs font-medium text-muted">
            {canShowTimeStep ? formatTimezoneLabel(activeTimezone) : null}
          </div>
        </>
      )}
    </div>
  );
}

function splitFullName(value: string) {
  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean);

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
