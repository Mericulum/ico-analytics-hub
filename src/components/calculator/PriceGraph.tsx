
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Calendar, TrendingUp } from "lucide-react";

interface PriceGraphProps {
  cryptocurrency: string;
  duration: number;
  initialInvestment: number;
  futureValue: number;
  color: string;
}

// Generate mock historical data for demo purposes
const generateHistoricalData = (crypto: string, months: number, initialValue: number, finalValue: number) => {
  const data = [];
  const now = new Date();
  
  // Volatility factor based on cryptocurrency
  let volatilityFactor = 0.1; // default
  switch (crypto) {
    case "BTC": volatilityFactor = 0.12; break;
    case "ETH": volatilityFactor = 0.15; break;
    case "SOL": volatilityFactor = 0.20; break;
    case "ADA": volatilityFactor = 0.18; break;
    case "DOT": volatilityFactor = 0.17; break;
    case "BNB": volatilityFactor = 0.11; break;
    case "AVAX": volatilityFactor = 0.19; break;
    case "XRP": volatilityFactor = 0.14; break;
    default: volatilityFactor = 0.15;
  }
  
  // Generate historical data with some volatility
  for (let i = 0; i <= months; i++) {
    const pastDate = new Date(now);
    pastDate.setMonth(now.getMonth() - months + i);
    
    // Progressive growth with random volatility
    const progressFactor = i / months;
    const expectedValue = initialValue + (finalValue - initialValue) * progressFactor;
    const randomFactor = 1 + (Math.random() - 0.5) * volatilityFactor;
    
    data.push({
      month: pastDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      value: i === 0 ? initialValue : i === months ? finalValue : expectedValue * randomFactor,
      isProjection: false
    });
  }
  
  return data;
};

// Generate future projection data
const generateProjectionData = (historicalData: any[], months: number, finalValue: number) => {
  const lastHistoricalDate = new Date(historicalData[historicalData.length - 1].month);
  const projectionData = [];
  
  for (let i = 1; i <= months; i++) {
    const futureDate = new Date(lastHistoricalDate);
    futureDate.setMonth(lastHistoricalDate.getMonth() + i);
    
    const progressFactor = i / months;
    const lastHistoricalValue = historicalData[historicalData.length - 1].value;
    const projectedValue = lastHistoricalValue + (finalValue - lastHistoricalValue) * progressFactor;
    
    projectionData.push({
      month: futureDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      value: i === months ? finalValue : projectedValue,
      isProjection: true
    });
  }
  
  return projectionData;
};

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

  // Create a tooltip formatter function
  const formatTooltip = (value: any, name: any, props: any) => {
    return [
      `$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      props.payload && props.payload.isProjection ? "Projected Value" : "Value"
    ];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium mb-1">Price Trend</h3>
          <p className="text-muted-foreground text-sm">Historical data and future projection</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-xs text-muted-foreground">Historical</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-crypto-green"></div>
            <span className="text-xs text-muted-foreground">Projection</span>
          </div>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ChartContainer 
          config={chartConfig}
          className="rounded-lg overflow-hidden border-none"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A4B57" />
              <XAxis 
                dataKey="month" 
                stroke="#4BA3CC" 
                tick={{ fill: "#6FD5FF", fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                stroke="#4BA3CC" 
                tick={{ fill: "#6FD5FF", fontSize: 12 }}
                tickMargin={10}
                width={60}
                tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}`}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (!active || !payload || !payload.length) return null;
                  
                  const data = payload[0].payload;
                  return (
                    <div className="bg-black/80 border border-crypto-gray/30 p-2 rounded">
                      <p className="text-xs text-white">{label}</p>
                      <p className="text-sm font-semibold text-white">
                        ${Number(data.value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-crypto-green">
                        {data.isProjection ? "Projected Value" : "Historical Value"}
                      </p>
                    </div>
                  );
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color}
                strokeWidth={2}
                dot={{ 
                  fill: color, 
                  strokeWidth: 1, 
                  r: 3, 
                  stroke: color 
                }}
                activeDot={{ 
                  fill: "#FFFFFF", 
                  stroke: color, 
                  strokeWidth: 2, 
                  r: 5 
                }}
                name="historical"
              />
              <Line 
                type="monotone" 
                dataKey={(data) => data.isProjection ? data.value : null}
                name="projection"
                stroke="#4BA3CC" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ 
                  fill: "#4BA3CC", 
                  strokeWidth: 1, 
                  r: 3, 
                  stroke: "#4BA3CC" 
                }}
                activeDot={{ 
                  fill: "#FFFFFF", 
                  stroke: "#4BA3CC", 
                  strokeWidth: 2, 
                  r: 5 
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
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
    </div>
  );
};

export default PriceGraph;
