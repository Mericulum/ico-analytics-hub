
import React from "react";
import CryptoComparisonTool from "@/components/compare/CryptoComparisonTool";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const Compare = () => {
  return (
    <div className="min-h-screen bg-crypto-dark text-white crypto-comparison-container">
      <TooltipProvider>
        <CryptoComparisonTool />
      </TooltipProvider>
      <Toaster />
    </div>
  );
};

export default Compare;
