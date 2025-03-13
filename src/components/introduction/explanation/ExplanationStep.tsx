
import { LucideIcon } from "lucide-react";
import React from "react";

interface ExplanationStepProps {
  title: string;
  icon: LucideIcon;
  content: string;
  animation: React.ReactNode;
  stepNumber: number;
  totalSteps: number;
}

const ExplanationStep: React.FC<ExplanationStepProps> = ({
  title,
  icon: Icon,
  content,
  animation,
  stepNumber,
  totalSteps,
}) => {
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-crypto-blue/20 flex items-center justify-center flex-shrink-0">
          <Icon className="h-6 w-6 text-crypto-blue" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <div className="text-sm text-gray-400">
            Step {stepNumber} of {totalSteps}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-300 leading-relaxed">{content}</p>
      </div>
      
      <div className="mb-8 transition-all duration-500 ease-in-out">
        {animation}
      </div>
    </>
  );
};

export default ExplanationStep;
