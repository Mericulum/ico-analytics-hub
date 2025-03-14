
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
import { Card } from "@/components/ui/card";
import { Info, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
  const [chartSize, setChartSize] = useState<number>(70);
  
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
  
  // Adjust zoom level for the radar chart
  const handleZoomIn = () => {
    setChartSize(prev => Math.min(prev + 10, 90)); // Limit max zoom
  };
  
  const handleZoomOut = () => {
    setChartSize(prev => Math.max(prev - 10, 40)); // Limit min zoom
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Radar Chart Comparison</h3>
          <p className="text-sm text-muted-foreground">
            Compare multiple metrics across cryptocurrencies in a radar chart visualization
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomOut}
            className="h-8 w-8 p-0 border-crypto-gray"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomIn}
            className="h-8 w-8 p-0 border-crypto-gray"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
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
      </div>
      
      <Card className="p-4 border-crypto-gray bg-black/20 backdrop-blur-md">
        <div className="h-[500px] w-full">
          {activeMetrics.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius={`${chartSize}%`} 
                data={radarData}
                margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
              >
                <PolarGrid stroke="#2A4B57" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fill: "#6FD5FF", fontSize: 12 }}
                  tickLine={{ stroke: "#2A4B57" }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: "#6FD5FF" }}
                  axisLine={{ stroke: "#2A4B57" }}
                  tickCount={5}
                />
                
                {cryptos.map(crypto => crypto && (
                  <Radar
                    key={crypto.id}
                    name={crypto.name}
                    dataKey={crypto.id}
                    stroke={crypto.color}
                    fill={crypto.color}
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                ))}
                
                <Legend 
                  formatter={(value, entry, index) => {
                    const crypto = cryptos.find(c => c?.name === value);
                    return (
                      <span style={{ color: crypto?.color || '#fff' }}>
                        {value}
                      </span>
                    );
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No metrics available for the selected category
            </div>
          )}
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        {activeMetrics.map(metric => metric && (
          <Card key={metric.id} className="p-3 border-crypto-gray bg-black/20 backdrop-blur-md">
            <div className="flex items-start justify-between">
              <h4 className="font-medium">{metric.name}</h4>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{metric.description}</p>
                  {metric.colorScale && (
                    <p className="text-xs mt-1">
                      {metric.colorScale === 'higher-better' 
                        ? 'Higher values are better' 
                        : metric.colorScale === 'lower-better'
                          ? 'Lower values are better'
                          : 'Values are neutral'}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {metric.colorScale === 'higher-better' 
                ? 'Higher is better' 
                : metric.colorScale === 'lower-better'
                  ? 'Lower is better'
                  : 'Neutral metric'}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComparisonRadarChart;
