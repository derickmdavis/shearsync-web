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
import type { ReactNode } from "react";

type DetailsState = {
  fullName: string;
  email: string;
  phone: string;
};

type DetailsErrors = Partial<Record<keyof DetailsState, string>>;

type ServiceGroup = {
  name: string;
  services: PublicService[];
};

type DetailsStepProps = {
  mode?: "details" | "services";
  intro?: string | null;
  introDescription?: string | null;
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
  inquiryCallout?: ReactNode;
  onChange: (field: keyof DetailsState, value: string) => void;
  onToggleService: (service: PublicService) => void;
  onBack?: () => void;
  onContinue: () => void;
};

export function DetailsStep({
  mode = "details",
  intro,
  introDescription,
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
  inquiryCallout,
  onChange,
  onToggleService,
  onBack,
  onContinue,
}: DetailsStepProps) {
  const isServiceStep = mode === "services";

  const heading = isServiceStep
    ? "Select service"
    : intro?.trim() || "Your details";
  const description = isServiceStep
    ? "Choose a service for this appointment."
    : introDescription?.trim() || "Share your contact information to get started.";
  const disableSubmit =
    intakeLoading ||
    servicesLoading ||
    (!showServicePicker && !canBeginServiceSelection);
  const totalDuration = sumServiceDurations(selectedServices);
  const totalPrice = sumServicePrices(selectedServices);
  const serviceGroups = groupServicesByCategory(services);
  const showCategoryHeadings = services.some((service) => service.category?.trim());

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onContinue();
      }}
    >
      <div>
        <h2 className="font-display text-[40px] leading-[0.92] font-medium tracking-[-0.045em] text-foreground sm:text-[47px]">
          {heading}
        </h2>
        <p className="mt-3 font-display text-[20px] leading-6 text-muted">
          {description}
        </p>
      </div>

      {!isServiceStep ? (
        <div className="mt-9 space-y-5">
          <Field
            id="fullName"
            name="fullName"
            label="Full name"
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
            label="Email"
            type="email"
            placeholder="you@email.com"
            value={values.email}
            error={errors.email}
            onChange={(value) => onChange("email", value)}
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            required
          />
        </div>
      ) : null}

      {intake ? (
        <IntakeMessage
          intake={intake}
          selectedServiceIds={selectedServices.map((service) => service.id)}
        />
      ) : null}

      {showServicePicker && inquiryCallout ? <div className="mt-7">{inquiryCallout}</div> : null}

      {showServicePicker ? (
        <div className="mt-8">
          <div>
            {servicesLoading ? (
              <EmptyState message="Refreshing the services you can book right now..." />
            ) : services.length ? (
              <>
                <div className="space-y-6">
                  {serviceGroups.map((group) => (
                    <section key={group.name} aria-label={group.name}>
                      {showCategoryHeadings ? (
                        <h4 className="mb-4 border-y border-border/60 py-3 text-sm font-semibold tracking-[0.22em] text-[#705640] uppercase">
                          {group.name}
                        </h4>
                      ) : null}
                      <div className="divide-y divide-border/55">
                        {group.services.map((service) => (
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
                    </section>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-border/60 bg-surface-warm p-4">
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
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 font-display text-[23px] font-medium text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-55"
      >
        {intakeLoading
          ? "Checking..."
          : servicesLoading
            ? "Loading services..."
            : showServicePicker
              ? "Continue"
              : "Select a service"}
        <ArrowIcon />
      </button>

      {isServiceStep && onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mt-3 w-full rounded-2xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
        >
          Back
        </button>
      ) : null}
    </form>
  );
}

function groupServicesByCategory(services: PublicService[]): ServiceGroup[] {
  const hasCategories = services.some((service) => service.category?.trim());

  if (!hasCategories) {
    return [{ name: "Services", services }];
  }

  const groups = new Map<string, PublicService[]>();

  for (const service of services) {
    const category = service.category?.trim() || "Other services";
    const groupedServices = groups.get(category);

    if (groupedServices) {
      groupedServices.push(service);
    } else {
      groups.set(category, [service]);
    }
  }

  return Array.from(groups, ([name, groupedServices]) => ({
    name,
    services: groupedServices,
  }));
}

function IntakeMessage({
  intake,
  selectedServiceIds,
}: {
  intake: PublicBookingIntakeData;
  selectedServiceIds: string[];
}) {
  if (intake.matchStatus === "not_found") {
    return null;
  }

  const title =
    intake.matchStatus === "matched"
      ? `Welcome back, ${intake.client?.firstName || "there"}`
      : "We need one more check";
  const toneClass =
    intake.matchStatus === "matched"
      ? "border-[#b7bba9] bg-[#eef0e6] text-[#465144]"
      : "border-amber-200 bg-amber-50 text-amber-950";

  return (
    <div className={["mt-6 rounded-2xl border px-4 py-4", toneClass].join(" ")}>
      <p className="text-sm font-semibold">{title}</p>
      {intake.matchStatus !== "matched" ? (
        <p className="mt-1 text-sm leading-6">{intake.bookingBehavior.message}</p>
      ) : null}
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
      <span className="mb-2 block text-base font-medium text-foreground">
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
          "h-14 w-full rounded-xl border bg-white px-4 text-base text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 focus:ring-brand/20",
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
