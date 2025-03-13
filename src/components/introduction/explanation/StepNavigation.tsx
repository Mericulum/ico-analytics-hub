
import React from "react";
import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onStepClick: (step: number) => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onStepClick,
}) => {
  return (
    <div className="flex justify-between">
      <Button
        onClick={onPrevious}
        variant="outline"
        className="border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10"
      >
        Previous
      </Button>
      
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentStep ? "bg-crypto-blue w-4" : "bg-gray-600"
            }`}
            onClick={() => onStepClick(i)}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
      
      <Button
        onClick={onNext}
        className="bg-crypto-blue hover:bg-crypto-blue/90 text-white"
      >
        Next
      </Button>
    </div>
  );
};

export default StepNavigation;
