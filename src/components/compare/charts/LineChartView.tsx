
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { Card } from "@/components/ui/card";
import { ComparisonConfig } from "@/types/compare";
import { getCryptoById } from '../utils/cryptoData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LineChartViewProps {
  config: ComparisonConfig;
}

const LineChartView: React.FC<LineChartViewProps> = ({ config }) => {
  const { cryptos: cryptoIds } = config;
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y'>('1m');
  
  // Get full data objects
  const cryptos = cryptoIds.map(id => getCryptoById(id)).filter(Boolean);
  
  // Determine number of days based on selected time range
  const getDaysForRange = (range: string): number => {
    switch(range) {
      case '1m': return 30;
      case '3m': return 90;
      case '6m': return 180;
      case '1y': return 365;
      default: return 30;
    }
  };
  
  const days = getDaysForRange(timeRange);
  
  // Prepare price trend data (simulated for this example)
  const trendData = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000);
    const day: any = {
      date: date.toLocaleDateString(),
      fullDate: date,
      timestamp: date.getTime()
    };
    
    cryptos.forEach(crypto => {
      if (!crypto) return;
      
      // Simulate price data with some randomness
      const baseValue = crypto.marketData.price;
      const volatility = crypto.riskData.volatility / 10; // Convert 1-10 scale to 0.1-1.0
      
      // Make trend more interesting with some randomness but also a pattern
      let trend;
      if (i < days * 0.3) {
        trend = (i / days) * 0.3; // Initial growth
      } else if (i < days * 0.5) {
        trend = 0.3 - ((i - days * 0.3) / days) * 0.2; // Slight correction
      } else if (i < days * 0.8) {
        trend = 0.1 + ((i - days * 0.5) / days) * 0.4; // Recovery and growth
      } else {
        trend = 0.5 - ((i - days * 0.8) / days) * 0.1; // Small dip at end
      }
      
      // Add some random noise
      const random = (Math.random() - 0.5) * volatility;
      
      const value = baseValue * (1 + trend + random);
      day[crypto.id] = parseFloat(value.toFixed(2));
    });
    
    trendData.push(day);
  }

  // Find min and max values for the chart (for reference lines)
  const allValues = trendData.flatMap(day => 
    cryptos.map(crypto => crypto ? day[crypto.id] : null).filter(Boolean)
  );
  
  const minValue = Math.min(...allValues) * 0.95;
  const maxValue = Math.max(...allValues) * 1.05;

  // Line chart tooltip
  const LineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-3 bg-crypto-dark/90 border-crypto-blue/30 backdrop-blur-sm">
          <div className="font-medium">{label}</div>
          <div className="mt-1 space-y-1">
            {payload.map((entry: any, index: number) => {
              const crypto = getCryptoById(entry.dataKey);
              if (!crypto) return null;
              
              return (
                <div 
                  key={`tooltip-${index}`} 
                  className="flex items-center gap-2 text-sm"
                >
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: crypto.color }}
                  ></div>
                  <span>{crypto.name}:</span>
                  <span className="font-medium">${entry.value.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </Card>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select 
          value={timeRange} 
          onValueChange={(value: any) => setTimeRange(value)}
        >
          <SelectTrigger className="w-[100px] bg-crypto-dark/80 border-crypto-gray">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="6m">6 Months</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2A4B57" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: "#6FD5FF" }}
              tickMargin={10}
              axisLine={{ stroke: '#2A4B57' }}
              tickFormatter={(value, index) => {
                // Show fewer ticks for readability
                if (days > 90) {
                  const date = new Date(trendData[index].timestamp);
                  const isFirstOfMonth = date.getDate() === 1;
                  return isFirstOfMonth ? new Intl.DateTimeFormat('en', { month: 'short' }).format(date) : '';
                }
                return value;
              }}
            />
            <YAxis 
              tick={{ fill: "#6FD5FF" }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              domain={[minValue, maxValue]}
              axisLine={{ stroke: '#2A4B57' }}
            />
            <Tooltip content={<LineTooltip />} />
            <Legend />
            
            {/* Add reference lines for min and max */}
            <ReferenceLine y={minValue} stroke="rgba(255,0,0,0.3)" strokeDasharray="3 3" />
            <ReferenceLine y={maxValue} stroke="rgba(0,255,0,0.3)" strokeDasharray="3 3" />
            
            {cryptos.map(crypto => crypto && (
              <Line
                key={crypto.id}
                type="monotone"
                dataKey={crypto.id}
                name={crypto.name}
                stroke={crypto.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: crypto.color, stroke: "#fff" }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartView;
