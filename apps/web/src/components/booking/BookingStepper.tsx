type BookingStepperProps = {
  currentStep: number;
};

const steps = [
  { label: "Details" },
  { label: "Time" },
  { label: "Confirm" },
];

export function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    isComplete
                      ? "bg-[#111111] text-white"
                      : isActive
                        ? "bg-brand text-white"
                        : "bg-zinc-100 text-zinc-500",
                  ].join(" ")}
                >
                  {isComplete ? <CheckIcon /> : stepNumber}
                </div>
                <span
                  className={[
                    "text-[11px] font-semibold",
                    isActive ? "text-foreground" : "text-muted",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 ? (
                <div className="mx-2 mb-6 h-px flex-1 bg-border" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
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
