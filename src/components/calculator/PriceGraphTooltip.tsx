
import React from "react";

interface PriceGraphTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const PriceGraphTooltip: React.FC<PriceGraphTooltipProps> = ({ 
  active, 
  payload, 
  label 
}) => {
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0].payload;
  return (
    <div className="bg-black/80 border border-crypto-gray/30 p-2 rounded">
      <p className="text-xs text-white">{label}</p>
      <p className="text-sm font-semibold text-white">
        ${Number(data.value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </p>
      <p className="text-xs text-crypto-green">
        {data.isProjection ? "Projected Value" : "Historical Value"}
      </p>
    </div>
  );
};

export default PriceGraphTooltip;
