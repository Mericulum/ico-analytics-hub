
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, LineChart as LineChartIcon } from 'lucide-react';
import { ComparisonConfig } from "@/types/compare";
import { 
  getCryptoById,
  getMetricById,
  getMetricValue,
  formatMetricValue 
} from './utils/cryptoData';

interface ComparisonChartsProps {
  config: ComparisonConfig;
}

const ComparisonCharts: React.FC<ComparisonChartsProps> = ({ config }) => {
  const { cryptos: cryptoIds, metrics: metricIds } = config;
  const [selectedMetric, setSelectedMetric] = useState(metricIds[0] || '');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  
  // Get full data objects
  const cryptos = cryptoIds.map(id => getCryptoById(id)).filter(Boolean);
  const metrics = metricIds.map(id => getMetricById(id)).filter(Boolean);
  const selectedMetricObj = getMetricById(selectedMetric);
  
  // No cryptos or metrics selected
  if (cryptos.length === 0 || metrics.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {cryptos.length === 0 
          ? "Please select at least one cryptocurrency to compare"
          : "Please select at least one metric to compare"}
      </div>
    );
  }
  
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

  // Custom tooltip for the charts
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-64">
          <Select 
            value={selectedMetric} 
            onValueChange={setSelectedMetric}
          >
            <SelectTrigger className="bg-crypto-dark/80 border-crypto-gray">
              <SelectValue placeholder="Select a metric" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map(metric => (
                <SelectItem key={metric.id} value={metric.id}>
                  {metric.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
            className="gap-1"
          >
            <BarChart2 className="h-4 w-4" />
            <span>Bar</span>
          </Button>
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('line')}
            className="gap-1"
          >
            <LineChartIcon className="h-4 w-4" />
            <span>Trend</span>
          </Button>
        </div>
      </div>
      
      <div className="h-[400px] w-full">
        {chartType === 'bar' ? (
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
              >
                {/* Bar components inside a Bar container must NOT specify their own dataKey */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ComparisonCharts;
