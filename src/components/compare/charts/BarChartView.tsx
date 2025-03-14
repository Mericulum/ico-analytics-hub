
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card } from "@/components/ui/card";
import { ComparisonConfig } from "@/types/compare";
import { 
  getCryptoById,
  getMetricById,
  getMetricValue,
  formatMetricValue 
} from '../utils/cryptoData';

interface BarChartViewProps {
  selectedMetric: string;
  config: ComparisonConfig;
}

const BarChartView: React.FC<BarChartViewProps> = ({ selectedMetric, config }) => {
  const { cryptos: cryptoIds } = config;
  
  // Get full data objects
  const cryptos = cryptoIds.map(id => getCryptoById(id)).filter(Boolean);
  const selectedMetricObj = getMetricById(selectedMetric);
  
  // Prepare chart data
  const chartData = cryptos.map(crypto => {
    if (!crypto) return null;
    
    const metricValue = getMetricValue(crypto, selectedMetric);
    
    return {
      name: crypto.symbol,
      fullName: crypto.name,
      color: crypto.color,
      value: typeof metricValue === 'number' ? metricValue : 0,
      displayValue: selectedMetricObj ? formatMetricValue(selectedMetric, metricValue) : String(metricValue)
    };
  }).filter(Boolean);

  // Custom tooltip for the bar chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <Card className="p-3 bg-crypto-dark/90 border-crypto-blue/30 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            ></div>
            <span className="font-medium">{data.fullName}</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {selectedMetricObj?.name}: {data.displayValue}
          </div>
        </Card>
      );
    }
    
    return null;
  };

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 40, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2A4B57" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: "#6FD5FF" }}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fill: "#6FD5FF" }}
            tickFormatter={(value) => {
              if (selectedMetricObj) {
                return formatMetricValue(selectedMetric, value);
              }
              return String(value);
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartView;
