
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import CalculatorResults from "./CalculatorResults";
import PriceGraph from "./PriceGraph";
import RiskAssessment from "./RiskAssessment";
import CalculatorForm from "./CalculatorForm";
import EmptyResultsPlaceholder from "./EmptyResultsPlaceholder";
import ResultActions from "./ResultActions";
import { FormValues } from "./utils/calculationUtils";
import { calculateInvestmentResults } from "./utils/calculationUtils";
import { cryptocurrencies } from "./utils/constants";

const CryptoCalculator = () => {
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptocurrencies[0]);

  // Watch for cryptocurrency changes in form submissions
  useEffect(() => {
    if (results) {
      const selected = cryptocurrencies.find(crypto => crypto.symbol === results.cryptocurrency);
      if (selected) setSelectedCrypto(selected);
    }
  }, [results]);

  const calculateResults = (values: FormValues) => {
    setIsCalculating(true);
    
    // Find the selected cryptocurrency object
    const cryptoObj = cryptocurrencies.find(crypto => crypto.symbol === values.cryptocurrency) || selectedCrypto;
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Calculate investment results
        const calculatedResults = calculateInvestmentResults(values, cryptoObj);
        
        // Set results
        setResults(calculatedResults);
        
        toast.success("Calculation complete!", { 
          description: `Estimated profit: $${calculatedResults.profit.toLocaleString(undefined, {maximumFractionDigits: 0})}` 
        });
      } catch (error) {
        console.error("Calculation error:", error);
        toast.error("Error calculating results", { 
          description: "Please check your inputs and try again."
        });
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-green mb-2">
          Crypto Profit Calculator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Estimate potential profits from your cryptocurrency investments over time with our advanced calculator and risk assessment tool.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 relative">
        {/* Glassmorphic background effects */}
        <div className="absolute -z-10 left-1/4 top-1/4 w-1/2 h-1/2 bg-crypto-blue rounded-full blur-[180px] opacity-20"></div>
        <div className="absolute -z-10 right-1/4 bottom-1/4 w-1/3 h-1/3 bg-crypto-green rounded-full blur-[150px] opacity-15"></div>
        
        {/* Calculator inputs */}
        <Card className="p-6 col-span-1 lg:col-span-2 border-crypto-gray bg-black/40 backdrop-blur-md">
          <CalculatorForm 
            onSubmit={calculateResults}
            isCalculating={isCalculating}
          />
        </Card>
        
        {/* Results section */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          {results ? (
            <>
              {/* Results summary */}
              <CalculatorResults results={results} />
              
              {/* Price graph */}
              <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md">
                <PriceGraph 
                  cryptocurrency={results.cryptocurrency}
                  duration={results.duration}
                  initialInvestment={results.initialInvestment}
                  futureValue={results.futureValue}
                  color={results.color}
                />
              </Card>
              
              {/* Risk assessment */}
              <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md">
                <RiskAssessment 
                  riskLevel={results.riskLevel}
                  riskScore={results.riskScore}
                  riskFactors={results.riskFactors}
                />
              </Card>
              
              {/* Actions */}
              <ResultActions />
            </>
          ) : (
            <EmptyResultsPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoCalculator;
