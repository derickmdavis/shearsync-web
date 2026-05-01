import type { PublicService } from "@/src/lib/api";
import { formatCurrency, formatDuration } from "@/src/lib/booking-format";
import { ServiceCard } from "@/src/components/booking/ServiceCard";

type ServicesStepProps = {
  services: PublicService[];
  selectedService?: PublicService | null;
  error?: string | null;
  onSelect: (service: PublicService) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function ServicesStep({
  services,
  selectedService,
  error,
  onSelect,
  onBack,
  onContinue,
}: ServicesStepProps) {
  if (!services.length) {
    return (
      <EmptyState message="No services are currently available for online booking." />
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-[30px] font-semibold tracking-tight text-foreground">
          Select your service
        </h2>
        <p className="mt-2 text-sm text-muted">
          Choose what you&apos;d like to book.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={selectedService?.id === service.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-zinc-50 p-4">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>Total Duration</span>
          <span className="font-semibold text-foreground">
            {selectedService
              ? formatDuration(selectedService.duration_minutes)
              : "--"}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-muted">
          <span>Total Price</span>
          <span className="font-semibold text-foreground">
            {selectedService ? formatCurrency(selectedService.price) : "--"}
          </span>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(109,79,242,0.26)] transition-transform hover:-translate-y-0.5"
      >
        Continue
        <ArrowIcon />
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
      >
        Back
      </button>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-zinc-50 px-5 py-10 text-center">
      <p className="text-lg font-semibold text-foreground">Nothing to book yet</p>
      <p className="mt-2 text-sm leading-6 text-muted">{message}</p>
    </div>
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
