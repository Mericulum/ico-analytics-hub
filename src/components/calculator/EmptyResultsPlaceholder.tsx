
import React from "react";
import { ArrowRight, Calculator } from "lucide-react";

const EmptyResultsPlaceholder: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute w-full h-full bg-crypto-blue/20 rounded-full animate-ping"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <Calculator className="w-12 h-12 text-crypto-blue" />
        </div>
      </div>
      <h3 className="text-2xl font-medium text-white mb-2">Enter Your Investment Details</h3>
      <p className="text-muted-foreground text-center max-w-md">
        Fill in the investment parameters on the left to calculate potential returns and view a detailed analysis.
      </p>
      <div className="mt-6 flex">
        <ArrowRight className="text-crypto-green animate-pulse" />
      </div>
    </div>
  );
};

export default EmptyResultsPlaceholder;
