type BookingStepperProps = {
  currentStep: number;
};

const steps = [
  { label: "Details" },
  { label: "Service" },
  { label: "Time" },
  { label: "Confirm" },
];

export function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="mb-11 px-1">
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
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    isComplete || isActive
                      ? "bg-black text-white shadow-[0_8px_18px_rgba(17,17,17,0.16)]"
                      : "border border-border/70 bg-white text-muted",
                  ].join(" ")}
                >
                  {isComplete ? <CheckIcon /> : stepNumber}
                </div>
                <span
                  className={[
                    "text-[10px] font-semibold tracking-wide",
                    isActive || isComplete ? "text-foreground" : "text-muted",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 ? (
                <div className="mx-3 mb-7 h-px flex-1 bg-black/75" />
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
