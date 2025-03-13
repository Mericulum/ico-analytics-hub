
import { useState } from "react";
import ExplanationCard from "./explanation/ExplanationCard";
import { explanationSteps } from "./explanation/ExplanationStepsData";

const CryptoExplanationSection = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="py-20 relative">
      <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-crypto-green rounded-full blur-[120px] opacity-20 animate-[pulse_15s_ease-in-out_infinite]"></div>
      
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Understanding Cryptocurrency</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Learn the basics of cryptocurrencies and how to approach investing in this new asset class
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ExplanationCard 
            steps={explanationSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </div>
    </section>
  );
};

export default CryptoExplanationSection;
