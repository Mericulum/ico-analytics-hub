
import React, { useState, useEffect } from 'react';
import { Search, Check, Plus } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { metrics, getMetricById, getSuggestionsForUserGoal, userGoals } from './utils/cryptoData';
import { ComparisonMetric } from '@/types/compare';

interface MetricSelectorProps {
  selectedMetrics: string[];
  onChange: (metrics: string[]) => void;
  userGoal?: string;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({ 
  selectedMetrics, 
  onChange,
  userGoal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [metricCategory, setMetricCategory] = useState('all');
  
  // Update selected metrics when user goal changes
  useEffect(() => {
    if (userGoal) {
      const goal = userGoals.find(g => g.id === userGoal);
      if (goal) {
        onChange(goal.suggestedMetrics);
      }
    }
  }, [userGoal, onChange]);
  
  // Group metrics by category
  const metricsByCategory: Record<string, ComparisonMetric[]> = {
    all: metrics,
    market: metrics.filter(m => m.category === 'market'),
    technical: metrics.filter(m => m.category === 'technical'),
    adoption: metrics.filter(m => m.category === 'adoption'),
    risk: metrics.filter(m => m.category === 'risk'),
    sustainability: metrics.filter(m => m.category === 'sustainability'),
  };
  
  // Filter metrics based on search query
  const filteredMetrics = searchQuery.trim() === '' 
    ? metricsByCategory[metricCategory]
    : metricsByCategory[metricCategory].filter(metric => 
        metric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        metric.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  // Handle metric selection
  const handleMetricToggle = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      onChange(selectedMetrics.filter(id => id !== metricId));
    } else {
      onChange([...selectedMetrics, metricId]);
    }
  };
  
  // Clear all selected metrics
  const clearSelections = () => {
    onChange([]);
  };
  
  // Get metric details for the selected chips
  const selectedMetricDetails = selectedMetrics
    .map(id => getMetricById(id))
    .filter(Boolean) as ComparisonMetric[];
  
  // User goal suggestion
  const goalSuggestion = userGoal ? getSuggestionsForUserGoal(userGoal) : "";

  return (
    <div className="space-y-4">
      {/* Goal suggestion */}
      {goalSuggestion && (
        <div className="text-xs text-muted-foreground italic">
          {goalSuggestion}
        </div>
      )}
      
      {/* Selected metrics chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedMetricDetails.map((metric) => (
          <Badge 
            key={metric.id} 
            variant="outline" 
            className="flex items-center gap-1 pl-2 pr-1 py-1 border-crypto-gray"
          >
            <span className="text-xs">{metric.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 hover:bg-crypto-dark rounded-full"
              onClick={() => handleMetricToggle(metric.id)}
            >
              <span className="sr-only">Remove</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </Badge>
        ))}
        {selectedMetrics.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSelections}
            className="text-xs h-7 px-2 hover:bg-red-950/40 hover:text-red-400"
          >
            Clear
          </Button>
        )}
      </div>
      
      {/* Metrics selection UI */}
      <div className="border border-crypto-gray rounded-md overflow-hidden">
        <div className="flex items-center p-2 bg-crypto-dark/50">
          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            placeholder="Search metrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="p-1 border-y border-crypto-gray">
          <Tabs defaultValue="all" value={metricCategory} onValueChange={setMetricCategory}>
            <TabsList className="bg-crypto-dark/30 grid grid-cols-6 h-8">
              <TabsTrigger value="all" className="text-xs h-6">All</TabsTrigger>
              <TabsTrigger value="market" className="text-xs h-6">Market</TabsTrigger>
              <TabsTrigger value="technical" className="text-xs h-6">Technical</TabsTrigger>
              <TabsTrigger value="adoption" className="text-xs h-6">Adoption</TabsTrigger>
              <TabsTrigger value="risk" className="text-xs h-6">Risk</TabsTrigger>
              <TabsTrigger value="sustainability" className="text-xs h-6">Eco</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <ScrollArea className="h-48">
          <div className="p-2 space-y-2">
            {filteredMetrics.map(metric => (
              <div key={metric.id} className="flex items-start space-x-2">
                <Checkbox
                  id={`metric-${metric.id}`}
                  checked={selectedMetrics.includes(metric.id)}
                  onCheckedChange={() => handleMetricToggle(metric.id)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <label
                    htmlFor={`metric-${metric.id}`}
                    className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {metric.name} 
                    {metric.colorScale && (
                      <Badge 
                        variant="outline" 
                        className={`ml-2 text-[10px] py-0 px-1.5 ${
                          metric.colorScale === 'higher-better' 
                            ? 'border-green-500/30 text-green-500' 
                            : metric.colorScale === 'lower-better'
                              ? 'border-blue-500/30 text-blue-400'
                              : 'border-gray-500/30 text-gray-400'
                        }`}
                      >
                        {metric.colorScale === 'higher-better' 
                          ? 'Higher is better' 
                          : metric.colorScale === 'lower-better'
                            ? 'Lower is better'
                            : 'Neutral'}
                      </Badge>
                    )}
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
            {filteredMetrics.length === 0 && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No metrics found for your search
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MetricSelector;
