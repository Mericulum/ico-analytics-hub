
import React from "react";
import CryptoComparisonTool from "@/components/compare/CryptoComparisonTool";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

const Compare = () => {
  return (
    <DashboardLayout>
      <div className="crypto-comparison-container">
        <TooltipProvider>
          <CryptoComparisonTool />
        </TooltipProvider>
        <Toaster />
      </div>
    </DashboardLayout>
  );
};

export default Compare;
