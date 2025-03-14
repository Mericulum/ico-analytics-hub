
import React, { useState } from 'react';
import { ComparisonConfig } from "@/types/compare";
import { 
  getMetricById
} from './utils/cryptoData';
import ChartControls from './charts/ChartControls';
import BarChartView from './charts/BarChartView';
import LineChartView from './charts/LineChartView';

interface ComparisonChartsProps {
  config: ComparisonConfig;
}

const ComparisonCharts: React.FC<ComparisonChartsProps> = ({ config }) => {
  const { cryptos: cryptoIds, metrics: metricIds } = config;
  const [selectedMetric, setSelectedMetric] = useState(metricIds[0] || '');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  
  // Get all available metrics
  const metrics = metricIds.map(id => getMetricById(id)).filter(Boolean);
  
  // No cryptos or metrics selected
  if (cryptoIds.length === 0 || metrics.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {cryptoIds.length === 0 
          ? "Please select at least one cryptocurrency to compare"
          : "Please select at least one metric to compare"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ChartControls 
        selectedMetric={selectedMetric}
        metrics={metrics}
        chartType={chartType}
        onMetricChange={setSelectedMetric}
        onChartTypeChange={setChartType}
      />
      
      {chartType === 'bar' ? (
        <BarChartView 
          selectedMetric={selectedMetric}
          config={config}
        />
      ) : (
        <LineChartView 
          config={config}
        />
      )}
    </div>
  );
};

export default ComparisonCharts;
