
import React from "react";
import CryptoComparisonTool from "@/components/compare/CryptoComparisonTool";
import { TooltipProvider } from "@/components/ui/tooltip";

const Compare = () => {
  return (
    <div className="min-h-screen bg-crypto-dark text-white">
      <TooltipProvider>
        <CryptoComparisonTool />
      </TooltipProvider>
    </div>
  );
};

export default Compare;
