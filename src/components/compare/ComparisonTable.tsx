
import React, { useMemo } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Info, ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ComparisonConfig } from "@/types/compare";
import { 
  getCryptoById,
  getMetricById,
  getMetricValue,
  formatMetricValue
} from './utils/cryptoData';

interface ComparisonTableProps {
  config: ComparisonConfig;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ config }) => {
  const { cryptos: cryptoIds, metrics: metricIds } = config;
  
  // Get full crypto data
  const cryptos = cryptoIds.map(id => getCryptoById(id)).filter(Boolean);
  
  // Group metrics by category
  const metricCategories = useMemo(() => {
    const categories: Record<string, typeof metrics> = {};
    const metrics = metricIds.map(id => getMetricById(id)).filter(Boolean);
    
    metrics.forEach(metric => {
      if (!metric) return;
      
      const categoryName = metric.category.charAt(0).toUpperCase() + metric.category.slice(1);
      if (!categories[categoryName]) {
        categories[categoryName] = [];
      }
      categories[categoryName].push(metric);
    });
    
    return Object.entries(categories);
  }, [metricIds]);
  
  // No cryptos or metrics selected
  if (cryptos.length === 0 || metricIds.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {cryptos.length === 0 
          ? "Please select at least one cryptocurrency to compare"
          : "Please select at least one metric to compare"}
      </div>
    );
  }
  
  // Helper to render cell value with color coding
  const renderCellValue = (cryptoId: string, metricId: string) => {
    const crypto = getCryptoById(cryptoId);
    const metric = getMetricById(metricId);
    
    if (!crypto || !metric) return null;
    
    const value = getMetricValue(crypto, metricId);
    const formattedValue = formatMetricValue(metricId, value);
    
    // Get min/max values across all cryptos for this metric
    const allValues = cryptos
      .map(c => c ? getMetricValue(c, metricId) : null)
      .filter(v => v !== null && v !== undefined);
    
    const maxValue = Math.max(...allValues as number[]);
    const minValue = Math.min(...allValues as number[]);
    
    // Determine if this value is the best
    let isBest = false;
    let isWorst = false;
    
    if (metric.colorScale && typeof value === 'number') {
      if (metric.colorScale === 'higher-better') {
        isBest = value === maxValue && cryptos.length > 1;
        isWorst = value === minValue && cryptos.length > 1;
      } else if (metric.colorScale === 'lower-better') {
        isBest = value === minValue && cryptos.length > 1;
        isWorst = value === maxValue && cryptos.length > 1;
      }
    }
    
    // Calculate percent of max for bar background
    let percentOfMax = 0;
    if (typeof value === 'number' && maxValue !== minValue) {
      percentOfMax = ((value - minValue) / (maxValue - minValue)) * 100;
    }
    
    return (
      <div className="relative">
        {metric.colorScale && typeof value === 'number' && (
          <div 
            className={`absolute inset-0 opacity-15 ${
              metric.colorScale === 'higher-better' 
                ? 'bg-green-500' 
                : metric.colorScale === 'lower-better' 
                  ? 'bg-blue-500' 
                  : 'bg-gray-500'
            }`}
            style={{ width: `${percentOfMax}%` }}
          />
        )}
        
        <div className="relative flex items-center z-10">
          <span>{formattedValue}</span>
          
          {isBest && (
            <Badge 
              className="ml-2 bg-green-950/50 text-green-400 border-green-500/30 text-[10px]"
              variant="outline"
            >
              <ChevronUp className="w-3 h-3 mr-0.5" />
              Best
            </Badge>
          )}
          
          {isWorst && cryptos.length > 2 && (
            <Badge 
              className="ml-2 bg-red-950/50 text-red-400 border-red-500/30 text-[10px]"
              variant="outline"
            >
              <ChevronDown className="w-3 h-3 mr-0.5" />
              Lowest
            </Badge>
          )}
        </div>
      </div>
    );
  };

  return (
    <ScrollArea className="h-[500px]">
      <div className="min-w-[600px]">
        <Table>
          <TableHeader className="sticky top-0 bg-crypto-dark/90 backdrop-blur-sm z-10">
            <TableRow>
              <TableHead className="w-[200px]">Metric</TableHead>
              {cryptos.map(crypto => crypto && (
                <TableHead 
                  key={crypto.id}
                  className="text-center"
                  style={{ color: crypto.color }}
                >
                  <div className="flex flex-col items-center">
                    <img 
                      src={crypto.logo} 
                      alt={crypto.name} 
                      className="w-6 h-6 mb-1" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span>{crypto.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {crypto.symbol}
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {metricCategories.map(([category, categoryMetrics]) => (
              <React.Fragment key={category}>
                <TableRow>
                  <TableCell 
                    colSpan={cryptos.length + 1}
                    className="bg-crypto-gray/20 font-medium"
                  >
                    {category} Metrics
                  </TableCell>
                </TableRow>
                
                {categoryMetrics.map(metric => (
                  <TableRow key={metric.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-1">
                        <span>{metric.name}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5">
                              <Info className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{metric.description}</p>
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
                    </TableCell>
                    
                    {cryptos.map(crypto => crypto && (
                      <TableCell key={`${crypto.id}-${metric.id}`} className="text-center">
                        {renderCellValue(crypto.id, metric.id)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default ComparisonTable;
