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
        "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all",
        selected
          ? "border-brand bg-brand-soft shadow-[0_12px_24px_rgba(109,79,242,0.14)]"
          : "border-border bg-white hover:border-brand/35",
      ].join(" ")}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
        <ScissorsIcon />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-foreground">{service.name}</p>
              {highlighted ? (
                <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
                  Recommended
                </span>
              ) : null}
            </div>
            {service.description ? (
              <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted">
                {service.description}
              </p>
            ) : null}
          </div>
          <div
            className={[
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
              selected
                ? "border-brand bg-brand text-white"
                : "border-border bg-white text-transparent",
            ].join(" ")}
          >
            <CheckIcon />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted">
          <span>{formatDuration(service.duration_minutes)}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="font-medium text-foreground">
            {formatCurrency(service.price)}
          </span>
        </div>
      </div>
    </button>
  );
}

function ScissorsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6 6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm0 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM20 5l-8.4 6L20 19M20 5l-4.5 3.2M20 19l-4.5-3.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
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
