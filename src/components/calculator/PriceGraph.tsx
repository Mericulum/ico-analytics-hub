
import React from "react";
import PriceGraphLegend from "./PriceGraphLegend";
import PriceGraphChart from "./PriceGraphChart";
import PriceGraphFooter from "./PriceGraphFooter";
import { generateHistoricalData, generateProjectionData } from "./utils/priceGraphUtils";

interface PriceGraphProps {
  cryptocurrency: string;
  duration: number;
  initialInvestment: number;
  futureValue: number;
  color: string;
}

const PriceGraph: React.FC<PriceGraphProps> = ({ 
  cryptocurrency, 
  duration, 
  initialInvestment, 
  futureValue,
  color
}) => {
  // Generate 12 months of historical data + projection data
  const historicalMonths = 12;
  const projectionMonths = duration * 12;
  
  // Generate data
  const historicalData = generateHistoricalData(
    cryptocurrency, 
    historicalMonths,
    initialInvestment * 0.7, // Start with a lower value for more interesting chart
    initialInvestment
  );
  
  const projectionData = generateProjectionData(
    historicalData,
    projectionMonths,
    futureValue
  );
  
  // Combine data sets
  const chartData = [...historicalData, ...projectionData];
  
  // Chart configuration
  const chartConfig = {
    historical: {
      label: "Historical",
      color,
    },
    projection: {
      label: "Projection",
      color: "#4BA3CC",
    }
  };

  return (
    <div>
      <PriceGraphLegend color={color} />
      <PriceGraphChart chartData={chartData} chartConfig={chartConfig} />
      <PriceGraphFooter 
        duration={duration} 
        initialInvestment={initialInvestment} 
        futureValue={futureValue} 
      />
    </div>
  );
};

export default PriceGraph;
