import { Sparkles } from "lucide-react";

const steps = [
  "Analyzing your business profile...",
  "Identifying target audience segments...",
  "Evaluating platform opportunities...",
  "Crafting ad copy variations...",
  "Optimizing budget allocation...",
  "Building your action plan...",
];

interface LoadingAnimationProps {
  currentStep?: number;
}

export function LoadingAnimation({ currentStep = 0 }: LoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Animated orb */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/30 flex items-center justify-center pulse-ring">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </div>
        {/* Orbiting dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full"
            style={{
              background: "transparent",
              animation: "spin 1.5s linear infinite",
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-primary absolute -top-1 left-1/2 -translate-x-1/2" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <h3 className="text-lg font-semibold text-foreground mb-2">Generating Your Strategy</h3>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm">
        Our AI is analyzing your business to create personalized marketing recommendations
      </p>

      {/* Steps */}
      <div className="w-full max-w-xs space-y-2 text-left">
        {steps.map((step, i) => (
          <div
            key={step}
            data-testid={`loading-step-${i}`}
            className={`flex items-center gap-3 transition-all duration-500 ${
              i <= currentStep ? "opacity-100" : "opacity-25"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                i < currentStep
                  ? "bg-green-400"
                  : i === currentStep
                  ? "bg-primary animate-pulse"
                  : "bg-muted-foreground/30"
              }`}
            />
            <span
              className={`text-xs transition-colors duration-300 ${
                i < currentStep
                  ? "text-muted-foreground line-through"
                  : i === currentStep
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/50"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
