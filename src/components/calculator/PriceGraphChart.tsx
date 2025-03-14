
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import PriceGraphTooltip from "./PriceGraphTooltip";
import { PriceDataPoint } from "./utils/priceDataUtils";

interface PriceGraphChartProps {
  chartData: PriceDataPoint[];
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
  // Format large numbers with k, M, B suffixes
  const formatYAxisTick = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    } else {
      return `$${value.toFixed(1)}`;
    }
  };

  // Determine if we need to show all ticks or only some
  const xAxisInterval = chartData.length > 20 ? Math.floor(chartData.length / 10) : 0;

  return (
    <div className="h-[300px] w-full mt-4">
      <ChartContainer 
        config={chartConfig}
        className="rounded-lg overflow-hidden border-none h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 5, right: 10, left: 10, bottom: 15 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2A4B57" />
            <XAxis 
              dataKey="month" 
              stroke="#4BA3CC" 
              tick={{ fill: "#6FD5FF", fontSize: 10 }}
              tickMargin={10}
              interval={xAxisInterval}
              angle={-30}
              textAnchor="end"
            />
            <YAxis 
              stroke="#4BA3CC" 
              tick={{ fill: "#6FD5FF", fontSize: 10 }}
              tickMargin={10}
              width={60}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip content={props => <PriceGraphTooltip {...props} />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={chartConfig.historical.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                fill: "#FFFFFF", 
                stroke: chartConfig.historical.color, 
                strokeWidth: 2, 
                r: 4 
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
              dot={false}
              activeDot={{ 
                fill: "#FFFFFF", 
                stroke: "#4BA3CC", 
                strokeWidth: 2, 
                r: 4 
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default PriceGraphChart;
