
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card } from "@/components/ui/card";
import { ComparisonConfig } from "@/types/compare";
import { getCryptoById } from '../utils/cryptoData';

interface LineChartViewProps {
  config: ComparisonConfig;
}

const LineChartView: React.FC<LineChartViewProps> = ({ config }) => {
  const { cryptos: cryptoIds } = config;
  
  // Get full data objects
  const cryptos = cryptoIds.map(id => getCryptoById(id)).filter(Boolean);
  
  // Prepare price trend data (simulated for this example)
  const trendData = [];
  for (let i = 0; i < 30; i++) {
    const day: any = {
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
    
    cryptos.forEach(crypto => {
      if (!crypto) return;
      
      // Simulate price data with some randomness
      const baseValue = crypto.marketData.price;
      const volatility = crypto.riskData.volatility / 10; // Convert 1-10 scale to 0.1-1.0
      const trend = (i / 30) * 0.2; // Overall trend direction
      const random = (Math.random() - 0.5) * volatility;
      
      const value = baseValue * (1 + trend + random);
      day[crypto.id] = value;
    });
    
    trendData.push(day);
  }

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
          />
          <YAxis 
            tick={{ fill: "#6FD5FF" }}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip content={<LineTooltip />} />
          <Legend />
          {cryptos.map(crypto => crypto && (
            <Line
              key={crypto.id}
              type="monotone"
              dataKey={crypto.id}
              name={crypto.name}
              stroke={crypto.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartView;
