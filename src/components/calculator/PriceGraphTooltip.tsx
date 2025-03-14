
import React from 'react';

const PriceGraphTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const value = dataPoint.value;
    const isProjection = dataPoint.isProjection;
    
    // Format currency based on value size
    const formatCurrency = (value: number) => {
      if (value >= 1000000000) {
        return `$${(value / 1000000000).toFixed(2)}B`;
      } else if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}k`;
      } else {
        return `$${value.toFixed(2)}`;
      }
    };

    return (
      <div className="bg-crypto-dark/90 border border-crypto-blue/30 rounded-md shadow-lg p-3 text-sm">
        <p className="text-xs mb-1 text-muted-foreground">{label}</p>
        <p className="flex items-center gap-2 text-white font-medium">
          <span className={`w-2 h-2 rounded-full ${isProjection ? 'bg-crypto-blue' : 'bg-green-500'}`}></span>
          {isProjection ? 'Projection' : 'Historical'}: {formatCurrency(value)}
        </p>
      </div>
    );
  }

  return null;
};

export default PriceGraphTooltip;
