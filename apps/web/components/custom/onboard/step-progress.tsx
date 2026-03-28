interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="mb-12 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          return (
            <div key={step} className="flex items-center gap-6">
              {i > 0 && <div className="h-px w-12 bg-outline-variant/40" />}
              <span
                className={`font-heading text-xs tracking-widest ${
                  isActive
                    ? "font-extrabold text-primary"
                    : "font-bold text-muted-foreground/50"
                }`}
              >
                {String(step).padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>
      <span className="text-label-sm uppercase tracking-[0.2em] text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
}
