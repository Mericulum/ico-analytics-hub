
import React from 'react';
import { Card } from "@/components/ui/card";
import { ComparisonConfig } from "@/types/compare";
import { 
  getCryptoById,
  getMetricById,
  getMetricValue,
  formatMetricValue 
} from './utils/cryptoData';

interface ComparisonInsightsProps {
  config: ComparisonConfig;
}

const ComparisonInsights: React.FC<ComparisonInsightsProps> = ({ config }) => {
  const { cryptos: cryptoIds, metrics: metricIds } = config;
  
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
  
  // Generate simple insights
  const insights = [];
  
  // Best performer per metric
  metrics.forEach(metric => {
    if (!metric) return;
    
    let bestCrypto = null;
    let bestValue = null;
    
    cryptos.forEach(crypto => {
      if (!crypto) return;
      
      const value = getMetricValue(crypto, metric.id);
      
      if (bestValue === null) {
        bestCrypto = crypto;
        bestValue = value;
      } else {
        // For metrics where lower is better, we need to invert the comparison
        const isBetter = metric.colorScale === 'lower-better'
          ? value < bestValue
          : value > bestValue;
          
        if (isBetter) {
          bestCrypto = crypto;
          bestValue = value;
        }
      }
    });
    
    if (bestCrypto && bestValue !== null) {
      insights.push({
        type: 'best-performer',
        metric,
        crypto: bestCrypto,
        value: bestValue,
        formattedValue: formatMetricValue(metric.id, bestValue)
      });
    }
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">AI-Generated Insights</h3>
        <p className="text-sm text-muted-foreground">
          Automatically generated insights based on your selected cryptocurrencies and metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="p-4 border-crypto-gray bg-crypto-dark/60">
            <h4 className="font-medium flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: insight.crypto.color }}
              ></span>
              <span>{insight.crypto.name}</span>
              <span className="text-muted-foreground">|</span>
              <span>{insight.metric.name}</span>
            </h4>
            <p className="mt-2 text-sm">
              {insight.crypto.name} has the 
              {insight.metric.colorScale === 'lower-better' ? ' lowest ' : ' highest '}
              {insight.metric.name.toLowerCase()} at {insight.formattedValue}
              {insight.metric.colorScale !== 'neutral' ? 
                `, which is generally considered ${insight.metric.colorScale === 'higher-better' ? 'better' : 'more efficient'}` : 
                ''}
              .
            </p>
          </Card>
        ))}
        
        {insights.length === 0 && (
          <div className="col-span-full text-center py-4 text-muted-foreground">
            Not enough data to generate meaningful insights. Try selecting more metrics.
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonInsights;
