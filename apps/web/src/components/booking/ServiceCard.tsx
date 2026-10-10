import type { PublicService } from "@/src/lib/api";
import { formatCurrency, formatDuration } from "@/src/lib/booking-format";

type ServiceCardProps = {
  service: PublicService;
  highlighted?: boolean;
  selected: boolean;
  onSelect: (service: PublicService) => void;
};

export function ServiceCard({
  service,
  highlighted = false,
  selected,
  onSelect,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      aria-pressed={selected}
      className={[
        "flex w-full items-start gap-4 py-5 text-left transition-all",
        selected
          ? "bg-brand-soft/45"
          : "hover:bg-surface-warm/65",
      ].join(" ")}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-display text-[29px] leading-7 font-medium tracking-tight text-foreground">{service.name}</p>
              {highlighted ? (
                <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
                  Recommended
                </span>
              ) : null}
            </div>
            {service.description ? (
              <p className="mt-2 text-[15px] leading-6 text-muted">
                {service.description}
              </p>
            ) : null}
          </div>
          <div
            className={[
              "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
              selected
                ? "border-brand bg-brand text-white"
                : "border-border bg-white text-transparent",
            ].join(" ")}
          >
            <CheckIcon />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
          <span>{formatDuration(service.durationMinutes)}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="font-medium text-foreground">
            {formatCurrency(service.price)}
          </span>
        </div>
      </div>
    </button>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        d="M5 10.5 8.2 13.7 15 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
