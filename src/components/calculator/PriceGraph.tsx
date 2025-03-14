
import React, { useState, useEffect } from "react";
import PriceGraphLegend from "./PriceGraphLegend";
import PriceGraphChart from "./PriceGraphChart";
import PriceGraphFooter from "./PriceGraphFooter";
import TimeframeSelector from "./TimeframeSelector";
import { fetchHistoricalPriceData, generateProjectionData, TimeframeOption, PriceDataPoint } from "./utils/priceDataUtils";

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
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeOption>("6M");
  const [chartData, setChartData] = useState<PriceDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch historical data and generate projection on component mount or when dependencies change
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch historical price data
        const historicalData = await fetchHistoricalPriceData(cryptocurrency, selectedTimeframe);
        
        // Generate projection data
        const projectionMonths = duration * 12;
        const projectionData = generateProjectionData(
          historicalData,
          projectionMonths,
          futureValue
        );
        
        // Combine data sets
        setChartData([...historicalData, ...projectionData]);
      } catch (error) {
        console.error("Error loading price data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [cryptocurrency, duration, futureValue, selectedTimeframe]);
  
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
      <div className="flex justify-between items-center mb-4">
        <PriceGraphLegend color={color} />
        <TimeframeSelector 
          selectedTimeframe={selectedTimeframe}
          onTimeframeChange={setSelectedTimeframe}
        />
      </div>
      
      {isLoading ? (
        <div className="h-[300px] w-full flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-crypto-blue border-opacity-20 border-t-crypto-blue rounded-full"></div>
        </div>
      ) : (
        <PriceGraphChart chartData={chartData} chartConfig={chartConfig} />
      )}
      
      <PriceGraphFooter 
        duration={duration} 
        initialInvestment={initialInvestment} 
        futureValue={futureValue} 
      />
    </div>
  );
};

export default PriceGraph;
