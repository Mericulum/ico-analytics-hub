
import React from "react";
import { TimeframeOption } from "./utils/priceDataUtils";

interface TimeframeSelectorProps {
  selectedTimeframe: TimeframeOption;
  onTimeframeChange: (timeframe: TimeframeOption) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  selectedTimeframe,
  onTimeframeChange
}) => {
  const timeframes: TimeframeOption[] = ["1M", "3M", "6M", "1Y", "All"];

  return (
    <div className="flex items-center space-x-2">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          className={`px-2 py-1 text-xs rounded-md transition-colors ${
            selectedTimeframe === timeframe
              ? "bg-crypto-blue text-white"
              : "bg-crypto-dark/50 text-muted-foreground hover:bg-crypto-dark/80"
          }`}
          onClick={() => onTimeframeChange(timeframe)}
        >
          {timeframe}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
