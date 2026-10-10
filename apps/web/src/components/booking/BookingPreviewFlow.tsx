"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getPublicServices,
  setActiveBookingPreviewToken,
  type BookingPreviewContext,
  type PublicService,
  type PublicSlot,
  type PublicStylist,
} from "@/src/lib/api";
import { addDaysToDate, getTodayDateValue } from "@/src/lib/booking-format";
import { BookingStepper } from "@/src/components/booking/BookingStepper";
import { ConfirmStep } from "@/src/components/booking/ConfirmStep";
import { DetailsStep } from "@/src/components/booking/DetailsStep";
import { PublicBookingProfile } from "@/src/components/booking/PublicBookingProfile";
import { TimeStep } from "@/src/components/booking/TimeStep";
import { BookingInquiryCard } from "@/src/components/booking/BookingInquiryCard";
import {
  isValidEmail,
  splitFullName,
} from "@/src/components/booking/booking-flow-utils";

type BookingPreviewFlowProps = {
  preview: BookingPreviewContext;
  stylist: PublicStylist;
  previewToken: string;
};

type ServiceState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; services: PublicService[] }
  | { status: "error" };

type PreviewDetails = {
  fullName: string;
  phone: string;
  email: string;
};

type PreviewDetailsErrors = Partial<Record<keyof PreviewDetails, string>>;

type PreviewAvailabilityDay = {
  date: string;
  slots: PublicSlot[];
};

const buildPreviewAvailability = (): PreviewAvailabilityDay[] => {
  const firstDate = addDaysToDate(getTodayDateValue(), 1);
  const secondDate = addDaysToDate(firstDate, 2);

  return [
    {
      date: firstDate,
      slots: [
        { start: `${firstDate}T10:00:00`, end: `${firstDate}T11:00:00` },
        { start: `${firstDate}T13:00:00`, end: `${firstDate}T14:00:00` },
        { start: `${firstDate}T16:00:00`, end: `${firstDate}T17:00:00` },
      ],
    },
    {
      date: secondDate,
      slots: [
        { start: `${secondDate}T09:30:00`, end: `${secondDate}T10:30:00` },
        { start: `${secondDate}T12:30:00`, end: `${secondDate}T13:30:00` },
      ],
    },
  ];
};

export function BookingPreviewFlow({
  preview,
  stylist,
  previewToken,
}: BookingPreviewFlowProps) {
  const [serviceState, setServiceState] = useState<ServiceState>({
    status: "loading",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [details, setDetails] = useState<PreviewDetails>({
    fullName: "",
    phone: "",
    email: "",
  });
  const [detailsErrors, setDetailsErrors] = useState<PreviewDetailsErrors>({});
  const [selectedServices, setSelectedServices] = useState<PublicService[]>([]);
  const previewAvailability = useMemo(() => buildPreviewAvailability(), []);
  const [selectedDate, setSelectedDate] = useState(previewAvailability[0]?.date);
  const [selectedSlot, setSelectedSlot] = useState<PublicSlot | null>(null);
  const [notes, setNotes] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const capabilities = preview.preview_capabilities;
  const canReadPublicData =
    preview.preview_mode === true && capabilities.allow_public_reads === true;
  const intro = preview.profile.intro ?? "Let's get to know you";
  const introDescription = preview.profile.intro_description
    ?? "Start with your contact details so we can check whether you're a returning client before you pick a service.";
  const services = useMemo(
    () =>
      serviceState.status === "ready"
        ? [...serviceState.services].sort(
            (left, right) => left.sortOrder - right.sortOrder,
          )
        : [],
    [serviceState],
  );
  const servicesLoading = canReadPublicData && serviceState.status === "loading";
  const servicesUnavailable = !canReadPublicData || serviceState.status === "error";

  useEffect(() => {
    setActiveBookingPreviewToken(previewToken);

    return () => {
      setActiveBookingPreviewToken(null);
    };
  }, [previewToken]);

  useEffect(() => {
    if (!canReadPublicData) {
      return;
    }

    let cancelled = false;

    void getPublicServices(preview.slug)
      .then((nextServices) => {
        if (!cancelled) {
          setServiceState({ status: "ready", services: nextServices });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setServiceState({ status: "error" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [canReadPublicData, preview.slug]);

  const updateDetails = (field: keyof PreviewDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
    setDetailsErrors((current) => ({ ...current, [field]: undefined }));
  };

  const toggleService = (service: PublicService) => {
    setSelectedServices((current) =>
      current.some((selected) => selected.id === service.id)
        ? current.filter((selected) => selected.id !== service.id)
        : [service],
    );
    setSelectedSlot(null);
  };

  const continueFromDetails = () => {
    const errors: PreviewDetailsErrors = {};
    if (!details.fullName.trim()) errors.fullName = "Enter a name to continue the preview.";
    if (!details.phone.trim()) errors.phone = "Enter a phone number to continue the preview.";
    if (!details.email.trim()) errors.email = "Enter an email to continue the preview.";
    else if (!isValidEmail(details.email.trim())) errors.email = "Enter a valid email address.";

    if (Object.keys(errors).length > 0) {
      setDetailsErrors(errors);
      return;
    }

    setCurrentStep(2);
  };

  const continueFromServices = () => {
    if (selectedServices.length > 0) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="space-y-3">
      <section
        aria-label="Preview status"
        className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-brand/20 bg-brand-soft/60 px-3 py-2 text-xs leading-5 text-muted"
      >
        <span className="font-bold uppercase tracking-[0.08em] text-brand">
          Preview
        </span>
        <h1 className="font-semibold text-foreground">
          Booking is disabled
        </h1>
        <span aria-hidden="true">·</span>
        <span>Booking cannot be submitted; preview changes stay in this browser.</span>
      </section>

      <div
        className={[
          "bg-transparent p-6 sm:rounded-[30px] sm:border sm:border-white/80 sm:bg-card sm:p-8 sm:shadow-[0_24px_80px_rgba(17,24,39,0.08)]",
          currentStep === 3 ? "mx-auto max-w-[430px]" : "lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8",
        ].join(" ")}
      >
        {currentStep !== 3 ? <PublicBookingProfile stylist={stylist} /> : null}

        <div className="mt-8 lg:mt-0 lg:min-w-0">
          {currentStep !== 3 ? <BookingStepper currentStep={currentStep} /> : null}

          {currentStep === 1 ? (
            <>
              <DetailsStep
                intro={intro}
                introDescription={introDescription}
                values={details}
                errors={detailsErrors}
                services={services}
                intake={null}
                intakeLoading={false}
                servicesLoading={servicesLoading}
                selectedServices={selectedServices}
                serviceError={
                  servicesUnavailable
                    ? "Services could not be loaded for this preview."
                    : null
                }
                canBeginServiceSelection={!servicesLoading && !servicesUnavailable}
                showServicePicker={false}
                onChange={updateDetails}
                onToggleService={toggleService}
                onContinue={continueFromDetails}
                inquiryCallout={<BookingInquiryCard
                  slug={preview.slug}
                  config={preview.profile.booking_request_form}
                  enabled={preview.profile.booking_request_form_enabled === true}
                  contact={{
                    ...splitFullName(details.fullName),
                    phone: details.phone,
                    email: details.email,
                  }}
                  previewMode
                  validateContact={() => {
                    const parsedName = splitFullName(details.fullName);
                    const valid = Boolean(
                      parsedName.firstName
                      && parsedName.lastName
                      && details.phone.trim()
                      && isValidEmail(details.email.trim()),
                    );
                    if (!valid) {
                      setDetailsErrors({
                        fullName: !parsedName.lastName ? "Enter a full name to preview." : undefined,
                        phone: !details.phone.trim() ? "Enter a phone number to preview." : undefined,
                        email: !isValidEmail(details.email.trim()) ? "Enter a valid email to preview." : undefined,
                      });
                    }
                    return valid;
                  }}
                />}
              />
            </>
          ) : null}

          {currentStep === 2 ? (
            <>
              <DetailsStep
                mode="services"
                values={details}
                errors={detailsErrors}
                services={services}
                intake={null}
                intakeLoading={false}
                servicesLoading={servicesLoading}
                selectedServices={selectedServices}
                serviceError={
                  servicesUnavailable
                    ? "Services could not be loaded for this preview."
                    : null
                }
                canBeginServiceSelection={!servicesLoading && !servicesUnavailable}
                showServicePicker
                onChange={updateDetails}
                onToggleService={toggleService}
                onBack={() => setCurrentStep(1)}
                onContinue={continueFromServices}
              />
              <p className="mt-4 text-xs text-muted">
                Services are live public data. Contact details stay only in this browser preview.
              </p>
            </>
          ) : null}

          {currentStep === 3 ? (
            <>
              <p className="mb-4 text-xs text-muted">
                Sample times illustrate the booking flow and are not live availability.
              </p>
              <TimeStep
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                upcomingDays={previewAvailability}
                loading={false}
                timezone={stylist.timezone}
                onDateSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
                onSlotSelect={setSelectedSlot}
                onBack={() => setCurrentStep(2)}
                onContinue={() => {
                  if (selectedSlot) setCurrentStep(4);
                }}
              />
            </>
          ) : null}

          {currentStep === 4 && selectedSlot ? (
            <ConfirmStep
              stylist={stylist}
              services={selectedServices}
              slot={selectedSlot}
              fullName={details.fullName.trim()}
              email={details.email.trim()}
              phone={details.phone.trim()}
              notes={notes}
              smsOptIn={smsOptIn}
              submitting={false}
              previewMode
              timezone={stylist.timezone}
              onNotesChange={setNotes}
              onSmsOptInChange={setSmsOptIn}
              onReferencePhotoSelect={() => undefined}
              onReferencePhotoRemove={() => undefined}
              onEdit={setCurrentStep}
              onSubmit={() => undefined}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
