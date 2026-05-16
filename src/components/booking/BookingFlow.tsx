"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ApiError,
  createPublicBooking,
  createPublicBookingIntake,
  getPublicAvailability,
  getPublicServices,
  getPublicSlots,
  type PublicBookingConfirmation,
  type PublicBookingIntakeData,
  type PublicService,
  type PublicSlot,
  type PublicStylist,
} from "@/src/lib/api";
import {
  buildAvailabilityDateOptions,
  buildBookingNotes,
  buildFallbackDateOptions,
  buildSummaryName,
  extractAvailabilityDates,
  extractAvailabilityRows,
  extractAvailabilityTimezone,
  formatTimezoneLabel,
  getTodayDateValue,
} from "@/src/lib/booking-format";
import { BookedStep } from "@/src/components/booking/BookedStep";
import { BookingStepper } from "@/src/components/booking/BookingStepper";
import {
  buildBookingServiceUnavailableMessage,
  detailsAreValid,
  isBookingContextExpiredError,
  isBookingDisabledError,
  isBookingSchemaMismatch,
  isSelectedServiceUnavailableError,
  isSlotConflictError,
  sortServices,
} from "@/src/components/booking/booking-flow-utils";
import { ConfirmStep } from "@/src/components/booking/ConfirmStep";
import { DetailsStep } from "@/src/components/booking/DetailsStep";
import { TimeStep } from "@/src/components/booking/TimeStep";
import { useBookingDetails } from "@/src/components/booking/useBookingDetails";
import { WaitlistCallout } from "@/src/components/booking/WaitlistCallout";

type BookingFlowProps = {
  slug: string;
  stylist: PublicStylist;
};

type BookingIntakeState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; data: PublicBookingIntakeData }
  | { status: "error"; message: string };

type AvailabilityDayPreview = {
  date: string;
  slots: PublicSlot[];
};

export function BookingFlow({ slug, stylist }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [notes, setNotes] = useState("");
  const [intakeState, setIntakeState] = useState<BookingIntakeState>({
    status: "idle",
  });
  const [bookingDisabledByFlow, setBookingDisabledByFlow] = useState(false);
  const [intakeRefreshing, setIntakeRefreshing] = useState(false);
  const [services, setServices] = useState<PublicService[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesLoadedToken, setServicesLoadedToken] = useState<string | null>(
    null,
  );
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<PublicService[]>([]);
  const [dateOptions, setDateOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slots, setSlots] = useState<PublicSlot[]>([]);
  const [loadedSlotsDate, setLoadedSlotsDate] = useState<string>("");
  const [slotPreviews, setSlotPreviews] = useState<
    Record<string, PublicSlot[]>
  >({});
  const [selectedSlot, setSelectedSlot] = useState<PublicSlot | null>(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [availabilityTimezone, setAvailabilityTimezone] = useState<
    string | null
  >(stylist.timezone ?? null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] =
    useState<PublicBookingConfirmation | null>(null);

  // Intake is the gatekeeper for booking rules: it tells the UI whether booking
  // is allowed and provides a short-lived context token for services/slots.
  const intakeData = intakeState.status === "ready" ? intakeState.data : null;
  const bookingContextToken = intakeData?.bookingContextToken ?? null;
  const bookingDisabled =
    !stylist.booking_enabled ||
    bookingDisabledByFlow ||
    intakeData?.bookingEnabled === false;
  const canShowWaitlist =
    stylist.booking_enabled === true &&
    stylist.features?.waitlistEnabled === true;
  const servicesAreSynced =
    Boolean(bookingContextToken) && servicesLoadedToken === bookingContextToken;
  const sortedServices = useMemo(() => sortServices(services), [services]);
  const activeTimezone = availabilityTimezone || stylist.timezone || null;
  const pageName = buildSummaryName(stylist);
  const showServicePicker =
    !bookingDisabled &&
    intakeState.status === "ready" &&
    Boolean(intakeData?.bookingEnabled);
  const selectedServiceIds = useMemo(
    () => selectedServices.map((service) => service.id),
    [selectedServices],
  );
  const primarySelectedService = selectedServices[0] ?? null;
  const canShowTimeStep = Boolean(selectedServices.length && selectedDate);
  const availabilityLoaded =
    Boolean(selectedDate) && loadedSlotsDate === selectedDate;
  const shouldShowWaitlistCta =
    // Waitlist is intentionally feature-gated by public stylist metadata and
    // only appears after an actual empty-slot result for the selected date.
    canShowWaitlist &&
    selectedServiceIds.length > 0 &&
    Boolean(selectedDate) &&
    availabilityLoaded &&
    !availabilityLoading &&
    !slotsError &&
    slots.length === 0;
  const upcomingAvailabilityDays = useMemo<AvailabilityDayPreview[]>(() => {
    const today = getTodayDateValue();
    const orderedDates = Array.from(
      new Set([selectedDate, ...dateOptions].filter(Boolean)),
    ).filter((date) => date >= today);

    return orderedDates
      .map((date) => ({
        date,
        slots:
          slotPreviews[date] ??
          (date === selectedDate &&
          loadedSlotsDate === selectedDate &&
          slots.length
            ? slots
            : []),
      }))
      .filter((day) => day.slots.length > 0);
  }, [dateOptions, loadedSlotsDate, selectedDate, slotPreviews, slots]);

  const selectedServicesRef = useRef(selectedServices);
  // Token refreshes can be triggered by several concurrent availability calls;
  // share one in-flight refresh to avoid duplicate intake requests.
  const tokenRefreshPromiseRef = useRef<Promise<PublicBookingIntakeData | null> | null>(
    null,
  );

  useEffect(() => {
    selectedServicesRef.current = selectedServices;
  }, [selectedServices]);

  const clearAvailabilityState = useCallback(() => {
    // Service/contact changes invalidate every date and slot derived from the
    // previous booking context token.
    setDateOptions([]);
    setSelectedDate("");
    setSlots([]);
    setLoadedSlotsDate("");
    setSlotPreviews({});
    setSelectedSlot(null);
    setSlotsError(null);
    setAvailabilityTimezone(stylist.timezone ?? null);
  }, [stylist.timezone]);

  const disableBookingFlow = useCallback(() => {
    setBookingDisabledByFlow(true);
    setServices([]);
    setServicesLoadedToken(null);
    setSelectedServices([]);
    clearAvailabilityState();
    setCurrentStep(1);
    setServiceError(null);
    setConfirmError(null);
  }, [clearAvailabilityState]);

  const invalidateBookingContext = useCallback(() => {
    setIntakeState({ status: "idle" });
    setServices([]);
    setServicesLoadedToken(null);
    setSelectedServices([]);
    clearAvailabilityState();
    setCurrentStep(1);
    setServiceError(null);
    setConfirmError(null);
  }, [clearAvailabilityState]);

  const {
    contactValues,
    contactValuesRef,
    detailsErrors,
    email,
    fullName,
    handleDetailsChange,
    parsedName,
    phone,
    validateDetails,
  } = useBookingDetails({
    onDetailsChanged: () => {
      if (intakeState.status !== "idle" || services.length || servicesLoadedToken) {
        invalidateBookingContext();
      }
    },
  });

  const canBeginServiceSelection =
    Boolean(contactValues.fullName.trim()) && Boolean(contactValues.phone.trim());

  const handleBookingContextRecoveryFailure = useCallback(
    (message: string) => {
      clearAvailabilityState();
      setCurrentStep(1);
      setServiceError(message);
      setConfirmError(null);
    },
    [clearAvailabilityState],
  );

  const runIntake = useCallback(
    async ({ background = false }: { background?: boolean } = {}) => {
      const currentValues = contactValuesRef.current;

      // Avoid calling intake until client-side validation says the backend has
      // enough data to match returning-client booking rules.
      if (!detailsAreValid(currentValues)) {
        return null;
      }

      if (background) {
        setIntakeRefreshing(true);
      } else {
        setIntakeState({ status: "loading" });
        setServiceError(null);
      }

      try {
        const intake = await createPublicBookingIntake({
          stylist_slug: slug,
          full_name: currentValues.fullName.trim(),
          phone: currentValues.phone.trim(),
          email: currentValues.email.trim() || undefined,
        });

        setIntakeState({ status: "ready", data: intake });

        if (!intake.bookingEnabled) {
          disableBookingFlow();
        }

        return intake;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "We couldn't check your booking details right now.";

        setIntakeState({ status: "error", message });
        return null;
      } finally {
        if (background) {
          setIntakeRefreshing(false);
        }
      }
    },
    [contactValuesRef, disableBookingFlow, slug],
  );

  const refreshBookingContext = useCallback(async () => {
    if (tokenRefreshPromiseRef.current) {
      return tokenRefreshPromiseRef.current;
    }

    const refreshPromise = (async () => {
      const refreshedIntake = await runIntake({ background: true });

      if (!refreshedIntake) {
        return null;
      }

      return refreshedIntake;
    })();

    tokenRefreshPromiseRef.current = refreshPromise.finally(() => {
      tokenRefreshPromiseRef.current = null;
    });

    return tokenRefreshPromiseRef.current;
  }, [runIntake]);

  const loadServicesForIntake = useCallback(
    async (
      intake: PublicBookingIntakeData,
      { allowTokenRefresh = true }: { allowTokenRefresh?: boolean } = {},
    ) => {
      setServicesLoading(true);
      setServiceError(null);

      const applyServices = (
        nextServices: PublicService[],
        nextIntake: PublicBookingIntakeData,
      ) => {
        // Keep any still-valid user selections after a context refresh, and
        // auto-select the backend recommendation only when nothing is selected.
        setServices(nextServices);
        setServicesLoadedToken(nextIntake.bookingContextToken);

        const currentSelectedServices = selectedServicesRef.current;
        const nextSelectedServices = currentSelectedServices.filter((service) =>
          nextServices.some(
            (availableService) => availableService.id === service.id,
          ),
        );
        const recommendedService =
          nextSelectedServices.length === 0 &&
          nextIntake.recommendedService?.serviceId
            ? nextServices.find(
                (service) =>
                  service.id === nextIntake.recommendedService?.serviceId,
              ) ?? null
            : null;
        const resolvedSelectedServices = recommendedService
          ? [recommendedService]
          : nextSelectedServices;
        const selectionChanged =
          currentSelectedServices.length !== resolvedSelectedServices.length ||
          currentSelectedServices.some(
            (service, index) => resolvedSelectedServices[index]?.id !== service.id,
          );

        setSelectedServices(resolvedSelectedServices);

        if (selectionChanged) {
          clearAvailabilityState();

          if (currentSelectedServices.length > 0) {
            setCurrentStep(1);
            setServiceError("Your available services changed. Please choose again.");
          }
        }
      };

      try {
        const nextServices = await getPublicServices(
          slug,
          intake.bookingContextToken,
        );
        applyServices(nextServices, intake);
        return nextServices;
      } catch (error) {
        if (isBookingDisabledError(error)) {
          setServices([]);
          setServicesLoadedToken(null);
          disableBookingFlow();
          return null;
        }

        if (allowTokenRefresh && isBookingContextExpiredError(error)) {
          const refreshedIntake = await refreshBookingContext();

          if (!refreshedIntake) {
            setServices([]);
            setServicesLoadedToken(null);
            handleBookingContextRecoveryFailure(
              "Please confirm your contact details to refresh your booking options.",
            );
            return null;
          }

          if (!refreshedIntake.bookingEnabled) {
            setServices([]);
            setServicesLoadedToken(null);
            disableBookingFlow();
            return null;
          }

          try {
            const refreshedServices = await getPublicServices(
              slug,
              refreshedIntake.bookingContextToken,
            );
            applyServices(refreshedServices, refreshedIntake);
            return refreshedServices;
          } catch (retryError) {
            if (isBookingDisabledError(retryError)) {
              setServices([]);
              setServicesLoadedToken(null);
              disableBookingFlow();
              return null;
            }

            const retryMessage =
              retryError instanceof Error
                ? retryError.message
                : "Unable to load services for online booking.";

            setServices([]);
            setServicesLoadedToken(null);
            setServiceError(retryMessage);
            return null;
          }
        }

        const message =
          error instanceof Error
            ? error.message
            : "Unable to load services for online booking.";

        setServices([]);
        setServicesLoadedToken(null);
        setServiceError(message);
        return null;
      } finally {
        setServicesLoading(false);
      }
    },
    [
      clearAvailabilityState,
      disableBookingFlow,
      handleBookingContextRecoveryFailure,
      refreshBookingContext,
      slug,
    ],
  );

  const handleSelectedServiceUnavailable = useCallback(
    async (intakeOverride?: PublicBookingIntakeData | null) => {
      const activeIntake =
        intakeOverride ??
        (intakeState.status === "ready" ? intakeState.data : null);

      setSelectedServices([]);
      clearAvailabilityState();
      setCurrentStep(1);
      setConfirmError(null);

      if (activeIntake?.bookingContextToken) {
        await loadServicesForIntake(activeIntake);
      } else {
        setServices([]);
        setServicesLoadedToken(null);
      }

      setServiceError(
        "Selected service is not available. Please choose another service.",
      );
    },
    [clearAvailabilityState, intakeState, loadServicesForIntake],
  );

  const getAvailabilityForCurrentContext = useCallback(
    async ({ allowTokenRefresh = true }: { allowTokenRefresh?: boolean } = {}) => {
      const activeIntake = intakeState.status === "ready" ? intakeState.data : null;

      if (!activeIntake?.bookingContextToken) {
        return null;
      }

      try {
        return await getPublicAvailability(slug, activeIntake.bookingContextToken);
      } catch (error) {
        if (isBookingDisabledError(error)) {
          disableBookingFlow();
          return null;
        }

        if (allowTokenRefresh && isBookingContextExpiredError(error)) {
          const refreshedIntake = await refreshBookingContext();

          if (!refreshedIntake) {
            handleBookingContextRecoveryFailure(
              "Please confirm your contact details to refresh availability.",
            );
            return null;
          }

          if (!refreshedIntake.bookingEnabled) {
            disableBookingFlow();
            return null;
          }

          const refreshedServices = await loadServicesForIntake(refreshedIntake, {
            allowTokenRefresh: false,
          });

          if (!refreshedServices || !selectedServicesRef.current.length) {
            handleBookingContextRecoveryFailure(
              "Your available services changed. Please select a service again.",
            );
            return null;
          }

          return getPublicAvailability(slug, refreshedIntake.bookingContextToken);
        }

        throw error;
      }
    },
    [
      disableBookingFlow,
      handleBookingContextRecoveryFailure,
      intakeState,
      loadServicesForIntake,
      refreshBookingContext,
      slug,
    ],
  );

  const getSlotsForDate = useCallback(
    async (
      date: string,
      { allowTokenRefresh = true }: { allowTokenRefresh?: boolean } = {},
    ) => {
      const activeIntake = intakeState.status === "ready" ? intakeState.data : null;
      const activeSelectedServiceIds = selectedServicesRef.current.map(
        (service) => service.id,
      );

      if (!activeIntake?.bookingContextToken || !activeSelectedServiceIds.length) {
        return null;
      }

      try {
        // Slots are always requested with every selected service id so the
        // backend can calculate the combined appointment duration.
        return await getPublicSlots(
          slug,
          activeSelectedServiceIds,
          date,
          activeIntake.bookingContextToken,
        );
      } catch (error) {
        if (isBookingDisabledError(error)) {
          disableBookingFlow();
          return null;
        }

        if (isSelectedServiceUnavailableError(error)) {
          await handleSelectedServiceUnavailable(activeIntake);
          return null;
        }

        if (allowTokenRefresh && isBookingContextExpiredError(error)) {
          const refreshedIntake = await refreshBookingContext();

          if (!refreshedIntake) {
            handleBookingContextRecoveryFailure(
              "Please confirm your contact details to refresh availability.",
            );
            return null;
          }

          if (!refreshedIntake.bookingEnabled) {
            disableBookingFlow();
            return null;
          }

          const refreshedServices = await loadServicesForIntake(refreshedIntake, {
            allowTokenRefresh: false,
          });

          if (!refreshedServices || !selectedServicesRef.current.length) {
            handleBookingContextRecoveryFailure(
              "Your available services changed. Please select a service again.",
            );
            return null;
          }

          try {
            return await getPublicSlots(
              slug,
              selectedServicesRef.current.map((service) => service.id),
              date,
              refreshedIntake.bookingContextToken,
            );
          } catch (retryError) {
            if (isBookingDisabledError(retryError)) {
              disableBookingFlow();
              return null;
            }

            if (isSelectedServiceUnavailableError(retryError)) {
              await handleSelectedServiceUnavailable(refreshedIntake);
              return null;
            }

            throw retryError;
          }
        }

        throw error;
      }
    },
    [
      disableBookingFlow,
      handleBookingContextRecoveryFailure,
      handleSelectedServiceUnavailable,
      intakeState,
      loadServicesForIntake,
      refreshBookingContext,
      slug,
    ],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      // Initial availability load picks the first future date with actual slots,
      // falling back to generated date options so users can still inspect dates.
      if (
        !selectedServiceIds.length ||
        bookingDisabled ||
        !bookingContextToken ||
        !servicesAreSynced
      ) {
        setSlotPreviews({});
        return;
      }

      setAvailabilityLoading(true);
      setSlotsError(null);

      try {
        const availability = await getAvailabilityForCurrentContext();
        if (cancelled) {
          return;
        }

        if (!availability) {
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
          extractAvailabilityTimezone(availability) ?? stylist.timezone ?? null;
        let nextSelectedDate = nextDates[0] ?? "";
        let nextSlots: PublicSlot[] = [];

        for (const date of nextDates) {
          const response = await getSlotsForDate(date);
          if (cancelled) {
            return;
          }

          if (!response) {
            return;
          }

          nextTimezone = response.timezone ?? nextTimezone;

          if ((response.slots ?? []).length > 0) {
            nextSelectedDate = date;
            nextSlots = response.slots ?? [];
            break;
          }
        }

        setAvailabilityTimezone(nextTimezone);
        setDateOptions(nextDates);
        setSelectedDate(nextSelectedDate);
        setSlotPreviews(nextSlots.length ? { [nextSelectedDate]: nextSlots } : {});
        setSlots(nextSlots);
        setLoadedSlotsDate(nextSelectedDate);
      } catch (error) {
        if (cancelled) {
          return;
        }

        const fallbackDates = buildFallbackDateOptions();
        setDateOptions(fallbackDates);
        setSelectedDate((currentDate) => currentDate || fallbackDates[0] || "");
        setSlotPreviews({});
        setSlots([]);
        setLoadedSlotsDate("");
        setSelectedSlot(null);
        setSlotsError(
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
    bookingContextToken,
    bookingDisabled,
    getAvailabilityForCurrentContext,
    getSlotsForDate,
    selectedServiceIds,
    servicesAreSynced,
    stylist.timezone,
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadSlots() {
      if (
        !selectedServiceIds.length ||
        !selectedDate ||
        bookingDisabled ||
        !bookingContextToken ||
        !servicesAreSynced
      ) {
        return;
      }

      setSlotsError(null);

      try {
        const response = await getSlotsForDate(selectedDate);
        if (cancelled) {
          return;
        }

        if (!response) {
          return;
        }

        const nextSlots = response.slots ?? [];

        setAvailabilityTimezone(response.timezone ?? activeTimezone);
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
        setSlotsError(
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
    bookingContextToken,
    bookingDisabled,
    getSlotsForDate,
    selectedDate,
    selectedServiceIds,
    servicesAreSynced,
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadSlotPreviews() {
      // Previewing multiple days is intentionally capped to keep the number of
      // parallel slot requests bounded.
      if (
        !selectedServiceIds.length ||
        !dateOptions.length ||
        bookingDisabled ||
        !bookingContextToken ||
        !servicesAreSynced
      ) {
        setSlotPreviews({});
        return;
      }

      const today = getTodayDateValue();
      const previewDates = Array.from(
        new Set(dateOptions.filter((date) => date >= today)),
      ).slice(0, 21);

      if (!previewDates.length) {
        setSlotPreviews({});
        return;
      }

      const previewEntries = await Promise.all(
        previewDates.map(async (date) => {
          try {
            const response = await getSlotsForDate(date, {
              allowTokenRefresh: false,
            });

            return [date, response?.slots ?? []] as const;
          } catch {
            return [date, [] as PublicSlot[]] as const;
          }
        }),
      );

      if (cancelled) {
        return;
      }

      setSlotPreviews((currentPreviews) => ({
        ...currentPreviews,
        ...Object.fromEntries(previewEntries),
      }));
    }

    void loadSlotPreviews();

    return () => {
      cancelled = true;
    };
  }, [
    bookingContextToken,
    bookingDisabled,
    dateOptions,
    getSlotsForDate,
    selectedServiceIds,
    servicesAreSynced,
  ]);

  async function handleContinueFromDetails() {
    if (!validateDetails()) {
      return;
    }

    if (servicesLoading) {
      return;
    }

    let nextIntake = intakeState.status === "ready" ? intakeState.data : null;

    if (!nextIntake) {
      nextIntake = await runIntake();

      if (!nextIntake) {
        setServiceError("We couldn't check your booking details right now.");
        return;
      }
    }

    if (!nextIntake.bookingEnabled) {
      disableBookingFlow();
      return;
    }

    if (!servicesAreSynced || servicesLoadedToken !== nextIntake.bookingContextToken) {
      const loadedServices = await loadServicesForIntake(nextIntake);

      if (!loadedServices) {
        return;
      }

      return;
    }

    if (!sortedServices.length) {
      setServiceError("No services are currently available for online booking.");
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
      const response = await getSlotsForDate(selectedDate);

      if (!response) {
        return;
      }

      const nextSlots = response.slots ?? [];

      setSlots(nextSlots);
      setLoadedSlotsDate(selectedDate);
      setSlotPreviews((currentPreviews) => ({
        ...currentPreviews,
        [selectedDate]: nextSlots,
      }));
      setSelectedSlot(null);
      setAvailabilityTimezone(response.timezone ?? activeTimezone);
    } catch {
      setSlots([]);
      setLoadedSlotsDate("");
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
        // Keep failure diagnostics scoped to booking identifiers and API error
        // metadata; do not log guest contact details or notes here.
        status: error instanceof ApiError ? error.status : undefined,
        message,
        details: error instanceof ApiError ? error.details : undefined,
        requested_datetime: selectedSlot.start,
        service_id: primarySelectedService.id,
        service_ids: selectedServiceIds,
        stylist_slug: slug,
      };

      console.error(`Booking submit failed ${JSON.stringify(debugPayload)}`);

      if (isSlotConflictError(error, message)) {
        await refreshSlotsForSelectedDate();
        setSlotsError("That time just became unavailable. Please choose another time.");
        setConfirmError(null);
        setCurrentStep(2);
      } else if (isBookingSchemaMismatch(error)) {
        setConfirmError(buildBookingServiceUnavailableMessage(stylist));
      } else if (isBookingDisabledError(error)) {
        disableBookingFlow();
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
    clearAvailabilityState();
    setConfirmError(null);
    setServiceError(null);
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

      {bookingDisabled ? (
        <div className="mt-8 rounded-3xl border border-border bg-zinc-50 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {pageName}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Online booking is currently unavailable.
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
              servicesLoading={servicesLoading || intakeRefreshing}
              selectedServices={selectedServices}
              serviceError={serviceError}
              canBeginServiceSelection={canBeginServiceSelection}
              showServicePicker={showServicePicker}
              recommendedServiceId={intakeData?.recommendedService?.serviceId ?? null}
              onChange={handleDetailsChange}
              onToggleService={handleToggleService}
              onContinue={handleContinueFromDetails}
            />
          ) : null}

          {currentStep === 2 ? (
            <TimeStep
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              upcomingDays={upcomingAvailabilityDays}
              loading={availabilityLoading}
              error={slotsError}
              timezone={activeTimezone}
              waitlistCta={
                shouldShowWaitlistCta ? (
                  <WaitlistCallout
                    slug={slug}
                    selectedDate={selectedDate}
                    selectedServiceId={primarySelectedService?.id ?? null}
                    defaultClientName={fullName}
                    defaultClientEmail={email}
                    defaultClientPhone={phone}
                  />
                ) : null
              }
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
