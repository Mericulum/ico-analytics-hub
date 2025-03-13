
import React from "react";
import { Calendar, TrendingUp } from "lucide-react";

interface PriceGraphFooterProps {
  duration: number;
  initialInvestment: number;
  futureValue: number;
}

const PriceGraphFooter: React.FC<PriceGraphFooterProps> = ({
  duration,
  initialInvestment,
  futureValue
}) => {
  return (
    <div className="mt-4 pt-4 border-t border-crypto-gray/20 flex justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>Timeframe: {duration} year{duration > 1 ? "s" : ""}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <TrendingUp className="w-4 h-4" />
        <span>Growth: ${initialInvestment.toLocaleString()} → ${Math.round(futureValue).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceGraphFooter;
