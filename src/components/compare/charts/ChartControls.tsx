
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart2, LineChart as LineChartIcon } from 'lucide-react';
import { ComparisonMetric } from "@/types/compare";

interface ChartControlsProps {
  selectedMetric: string;
  metrics: ComparisonMetric[];
  chartType: 'bar' | 'line';
  onMetricChange: (metric: string) => void;
  onChartTypeChange: (type: 'bar' | 'line') => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  selectedMetric,
  metrics,
  chartType,
  onMetricChange,
  onChartTypeChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="w-full sm:w-64">
        <Select 
          value={selectedMetric} 
          onValueChange={onMetricChange}
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
          onClick={() => onChartTypeChange('bar')}
          className="gap-1"
        >
          <BarChart2 className="h-4 w-4" />
          <span>Bar</span>
        </Button>
        <Button
          variant={chartType === 'line' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChartTypeChange('line')}
          className="gap-1"
        >
          <LineChartIcon className="h-4 w-4" />
          <span>Trend</span>
        </Button>
      </div>
    </div>
  );
};

export default ChartControls;
