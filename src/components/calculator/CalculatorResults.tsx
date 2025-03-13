
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";

interface CalculatorResultsProps {
  results: {
    initialInvestment: number;
    recurringInvestment: number;
    totalInvestment: number;
    futureValue: number;
    profit: number;
    roi: number;
    inflationAdjusted: boolean;
    duration: number;
    cryptocurrency: string;
  };
}

const CalculatorResults: React.FC<CalculatorResultsProps> = ({ results }) => {
  const {
    initialInvestment,
    recurringInvestment,
    totalInvestment,
    futureValue,
    profit,
    roi,
    inflationAdjusted,
    duration,
    cryptocurrency,
  } = results;

  const isProfit = profit > 0;

  return (
    <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium mb-1">Estimated Results</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {duration} year {duration > 1 ? "projection" : "projection"} for {cryptocurrency}
            {inflationAdjusted && " (Inflation Adjusted)"}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-xs">Total Investment</p>
              <p className="text-lg font-medium">${totalInvestment.toLocaleString()}</p>
            </div>
            
            <div>
              <p className="text-muted-foreground text-xs">Future Value</p>
              <p className="text-lg font-medium">${Math.round(futureValue).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-black/30 rounded-xl p-4 md:min-w-[240px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Profit/Loss</span>
            {inflationAdjusted && (
              <div className="relative group">
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
                <div className="absolute bottom-full mb-2 right-0 w-48 p-2 bg-black rounded text-xs hidden group-hover:block z-10">
                  Results are adjusted for inflation (3% per year)
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              ${Math.abs(Math.round(profit)).toLocaleString()}
            </span>
            <div className={`flex items-center ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
              {isProfit ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span className="text-sm font-medium">{Math.abs(roi).toFixed(2)}%</span>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground">
            {isProfit 
              ? `Your $${totalInvestment.toLocaleString()} could grow to $${Math.round(futureValue).toLocaleString()}`
              : `Your $${totalInvestment.toLocaleString()} could decrease to $${Math.round(futureValue).toLocaleString()}`
            }
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="relative w-full h-2 bg-crypto-dark rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-crypto-blue to-crypto-green"
            style={{ 
              width: `${Math.min(100, Math.max(0, isProfit ? roi / 2 : 0))}%`,
              transition: "width 1s ease-out"
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Initial: ${initialInvestment.toLocaleString()}</span>
          {recurringInvestment > 0 && (
            <span>Monthly: ${recurringInvestment.toLocaleString()}</span>
          )}
          <span>Final: ${Math.round(futureValue).toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default CalculatorResults;
