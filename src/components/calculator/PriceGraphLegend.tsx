
import React from "react";

interface PriceGraphLegendProps {
  color: string;
}

const PriceGraphLegend: React.FC<PriceGraphLegendProps> = ({ color }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-medium mb-1">Price Trend</h3>
        <p className="text-muted-foreground text-sm">Historical data and future projection</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
          <span className="text-xs text-muted-foreground">Historical</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-crypto-green"></div>
          <span className="text-xs text-muted-foreground">Projection</span>
        </div>
      </div>
    </div>
  );
};

export default PriceGraphLegend;
