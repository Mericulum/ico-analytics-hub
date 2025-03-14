
import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComparisonConfig } from "@/types/compare";
import { 
  getCryptoById,
  getMetricById,
  getMetricValue
} from './utils/cryptoData';

interface ComparisonRadarChartProps {
  config: ComparisonConfig;
}

const ComparisonRadarChart: React.FC<ComparisonRadarChartProps> = ({ config }) => {
  const { cryptos: cryptoIds, metrics: metricIds } = config;
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Get full data objects
  const cryptos = cryptoIds.map(id => getCryptoById(id)).filter(Boolean);
  const metrics = metricIds.map(id => getMetricById(id)).filter(Boolean);
  
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
  
  // Group metrics by category
  const metricsByCategory: Record<string, typeof metrics> = {
    all: metrics,
  };
  
  metrics.forEach(metric => {
    if (!metric) return;
    
    const categoryName = metric.category;
    if (!metricsByCategory[categoryName]) {
      metricsByCategory[categoryName] = [];
    }
    metricsByCategory[categoryName].push(metric);
  });
  
  // Get active metrics based on selected category
  const activeMetrics = metricsByCategory[activeCategory] || [];
  
  // Prepare radar chart data for selected metrics
  const radarData = activeMetrics.map(metric => {
    if (!metric) return null;
    
    const dataPoint: any = {
      metric: metric.name,
      fullName: metric.name,
      description: metric.description,
    };
    
    cryptos.forEach(crypto => {
      if (!crypto) return;
      
      let value = getMetricValue(crypto, metric.id);
      
      // Normalize values to 0-100 scale for radar chart
      if (typeof value === 'number') {
        // For metrics where lower is better, inverse the value
        if (metric.colorScale === 'lower-better') {
          // Create an inverse scale that preserves the relative differences
          const max = Math.max(...cryptos.map(c => c ? getMetricValue(c, metric.id) as number : 0));
          value = max > 0 ? (max - value) / max * 100 : 0;
        } else {
          // For metrics where higher is better
          const max = Math.max(...cryptos.map(c => c ? getMetricValue(c, metric.id) as number : 0));
          value = max > 0 ? (value / max) * 100 : 0;
        }
      } else {
        value = 0;
      }
      
      dataPoint[crypto.id] = value;
    });
    
    return dataPoint;
  }).filter(Boolean);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Radar Chart Comparison</h3>
          <p className="text-sm text-muted-foreground">
            Compare multiple metrics across cryptocurrencies in a radar chart visualization
          </p>
        </div>
        
        <Select 
          value={activeCategory} 
          onValueChange={setActiveCategory}
        >
          <SelectTrigger className="w-[180px] bg-crypto-dark/80 border-crypto-gray">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Metrics</SelectItem>
            {Object.keys(metricsByCategory)
              .filter(key => key !== 'all')
              .map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)} Metrics
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[500px] w-full">
        {activeMetrics.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="70%" 
              data={radarData}
              margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
            >
              <PolarGrid stroke="#2A4B57" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: "#6FD5FF", fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: "#6FD5FF" }}
                axisLine={{ stroke: "#2A4B57" }}
              />
              
              {cryptos.map(crypto => crypto && (
                <Radar
                  key={crypto.id}
                  name={crypto.name}
                  dataKey={crypto.id}
                  stroke={crypto.color}
                  fill={crypto.color}
                  fillOpacity={0.1}
                />
              ))}
              
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No metrics available for the selected category
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonRadarChart;
