
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import PriceGraphTooltip from "./PriceGraphTooltip";

interface PriceGraphChartProps {
  chartData: any[];
  chartConfig: {
    historical: {
      label: string;
      color: string;
    };
    projection: {
      label: string;
      color: string;
    };
  };
}

const PriceGraphChart: React.FC<PriceGraphChartProps> = ({
  chartData,
  chartConfig
}) => {
  return (
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
            <Tooltip content={props => <PriceGraphTooltip {...props} />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={chartConfig.historical.color}
              strokeWidth={2}
              dot={{ 
                fill: chartConfig.historical.color, 
                strokeWidth: 1, 
                r: 3, 
                stroke: chartConfig.historical.color 
              }}
              activeDot={{ 
                fill: "#FFFFFF", 
                stroke: chartConfig.historical.color, 
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
  );
};

export default PriceGraphChart;
