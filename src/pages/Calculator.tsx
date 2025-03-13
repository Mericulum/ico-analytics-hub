
import React from "react";
import CryptoCalculator from "@/components/calculator/CryptoCalculator";
import DashboardLayout from "@/components/DashboardLayout";

const Calculator = () => {
  return (
    <DashboardLayout>
      <div className="pb-20">
        <h1 className="text-2xl font-bold mb-6 text-white">Crypto Investment Calculator</h1>
        <p className="text-gray-300 mb-8">Estimate potential returns on your crypto investments with our advanced calculator</p>
        <CryptoCalculator />
      </div>
    </DashboardLayout>
  );
};

export default Calculator;
