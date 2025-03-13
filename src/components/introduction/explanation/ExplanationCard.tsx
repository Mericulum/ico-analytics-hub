
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ExplanationStep from "./ExplanationStep";
import StepNavigation from "./StepNavigation";
import { ExplanationStepType } from "./ExplanationStepsData";

interface ExplanationCardProps {
  steps: ExplanationStepType[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({
  steps,
  currentStep,
  setCurrentStep,
}) => {
  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const currentStepData = steps[currentStep];

  return (
    <Card className="bg-crypto-dark border-crypto-blue overflow-hidden">
      <CardContent className="p-6">
        <ExplanationStep
          title={currentStepData.title}
          icon={currentStepData.icon}
          content={currentStepData.content}
          animation={currentStepData.animation}
          stepNumber={currentStep + 1}
          totalSteps={steps.length}
        />
        
        <StepNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={prevStep}
          onNext={nextStep}
          onStepClick={setCurrentStep}
        />
      </CardContent>
    </Card>
  );
};

export default ExplanationCard;
