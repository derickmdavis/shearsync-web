import type {
  PublicBookingIntakeData,
  PublicService,
} from "@/src/lib/api";
import {
  formatCurrency,
  formatDuration,
  sumServiceDurations,
  sumServicePrices,
} from "@/src/lib/booking-format";
import { ServiceCard } from "@/src/components/booking/ServiceCard";

type DetailsState = {
  fullName: string;
  email: string;
  phone: string;
};

type DetailsErrors = Partial<Record<keyof DetailsState, string>>;

type DetailsStepProps = {
  values: DetailsState;
  errors: DetailsErrors;
  services: PublicService[];
  intake?: PublicBookingIntakeData | null;
  intakeLoading: boolean;
  servicesLoading: boolean;
  selectedServices: PublicService[];
  serviceError?: string | null;
  canBeginServiceSelection: boolean;
  showServicePicker: boolean;
  recommendedServiceId?: string | null;
  onChange: (field: keyof DetailsState, value: string) => void;
  onToggleService: (service: PublicService) => void;
  onContinue: () => void;
};

export function DetailsStep({
  values,
  errors,
  services,
  intake,
  intakeLoading,
  servicesLoading,
  selectedServices,
  serviceError,
  canBeginServiceSelection,
  showServicePicker,
  recommendedServiceId,
  onChange,
  onToggleService,
  onContinue,
}: DetailsStepProps) {
  const disableSubmit =
    intakeLoading ||
    servicesLoading ||
    (!showServicePicker && !canBeginServiceSelection);
  const totalDuration = sumServiceDurations(selectedServices);
  const totalPrice = sumServicePrices(selectedServices);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onContinue();
      }}
    >
      <div>
        <h2 className="text-[30px] font-semibold tracking-tight text-foreground">
          Let&apos;s get to know you
        </h2>
        <p className="mt-2 text-sm text-muted">
          Start with your contact details so we can check whether you&apos;re a
          returning client before you pick a service.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Field
          id="fullName"
          name="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={values.fullName}
          error={errors.fullName}
          onChange={(value) => onChange("fullName", value)}
          autoComplete="name"
          autoCapitalize="words"
          required
        />
        <Field
          id="phone"
          name="phone"
          label="Phone"
          type="tel"
          placeholder="(555) 123-4567"
          value={values.phone}
          error={errors.phone}
          onChange={(value) => onChange("phone", value)}
          autoComplete="tel"
          inputMode="tel"
          required
        />
        <Field
          id="email"
          name="email"
          label="Email (Optional)"
          type="email"
          placeholder="you@email.com"
          value={values.email}
          error={errors.email}
          onChange={(value) => onChange("email", value)}
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
        />
      </div>

      {intake ? (
        <IntakeMessage
          intake={intake}
          selectedServiceIds={selectedServices.map((service) => service.id)}
        />
      ) : null}

      {showServicePicker ? (
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-zinc-50">
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Select your services
              </h3>
              <p className="mt-1 text-sm text-muted">
                Choose one or more services for this appointment.
              </p>
            </div>
            <div className="flex items-center">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-muted"
                aria-hidden="true"
              >
                <ChevronIcon />
              </div>
            </div>
          </div>

          <div className="border-t border-border px-5 py-5">
            {servicesLoading ? (
              <EmptyState message="Refreshing the services you can book right now..." />
            ) : services.length ? (
              <>
                <div className="space-y-3">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      highlighted={service.id === recommendedServiceId}
                      selected={selectedServices.some(
                        (selectedService) => selectedService.id === service.id,
                      )}
                      onSelect={onToggleService}
                    />
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4">
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>Total Duration</span>
                    <span className="font-semibold text-foreground">
                      {selectedServices.length ? formatDuration(totalDuration) : "--"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted">
                    <span>Total Price</span>
                    <span className="font-semibold text-foreground">
                      {selectedServices.length ? formatCurrency(totalPrice) : "--"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState message="No services are currently available for online booking." />
            )}
          </div>
        </div>
      ) : null}

      {serviceError ? <p className="mt-4 text-sm text-red-500">{serviceError}</p> : null}

      <button
        type="submit"
        disabled={disableSubmit}
        className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(109,79,242,0.26)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55"
      >
        {intakeLoading
          ? "Checking..."
          : servicesLoading
            ? "Loading services..."
            : showServicePicker
              ? "Continue"
              : "Select Services"}
        <ArrowIcon />
      </button>
    </form>
  );
}

function IntakeMessage({
  intake,
  selectedServiceIds,
}: {
  intake: PublicBookingIntakeData;
  selectedServiceIds: string[];
}) {
  const title =
    intake.matchStatus === "matched"
      ? `Welcome back, ${intake.client?.firstName || "there"}`
      : intake.matchStatus === "ambiguous"
        ? "We need one more check"
        : "New client booking";
  const toneClass =
    intake.matchStatus === "matched"
      ? "border-emerald-200 bg-emerald-50 text-emerald-950"
      : intake.matchStatus === "ambiguous"
        ? "border-amber-200 bg-amber-50 text-amber-950"
        : "border-sky-200 bg-sky-50 text-sky-950";

  return (
    <div className={["mt-6 rounded-2xl border px-4 py-4", toneClass].join(" ")}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6">{intake.bookingBehavior.message}</p>
      {intake.recommendedService ? (
        <p className="mt-2 text-sm leading-6">
          Same as last time?{" "}
          <span className="font-semibold">
            {selectedServiceIds.includes(intake.recommendedService.serviceId)
              ? `${intake.recommendedService.serviceName} selected`
              : intake.recommendedService.serviceName}
          </span>
        </p>
      ) : null}
      {intake.matchStatus === "ambiguous" && intake.candidateCount ? (
        <p className="mt-2 text-sm leading-6">
          We found more than one possible match, so we&apos;ll use safe new-client
          rules unless you confirm more information later.
        </p>
      ) : null}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-white px-5 py-10 text-center">
      <p className="text-lg font-semibold text-foreground">Nothing to book yet</p>
      <p className="mt-2 text-sm leading-6 text-muted">{message}</p>
    </div>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  value: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: "on" | "off";
  inputMode?:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "search"
    | "none"
    | "numeric"
    | "decimal";
  onChange: (value: string) => void;
};

function Field({
  id,
  name,
  label,
  type,
  placeholder,
  value,
  error,
  required,
  autoComplete,
  autoCapitalize,
  autoCorrect,
  inputMode,
  onChange,
}: FieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-semibold text-foreground">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        className={[
          "h-14 w-full rounded-2xl border bg-white px-4 text-sm text-foreground outline-none transition-colors placeholder:text-zinc-400",
          error ? "border-red-400" : "border-border focus:border-brand",
        ].join(" ")}
      />
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </label>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="M4 10h12m-4-4 4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="m5 7.5 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
