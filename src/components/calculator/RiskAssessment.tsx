import React from "react";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, ShieldAlert, ShieldX, Info } from "lucide-react";
interface RiskAssessmentProps {
  riskLevel: string;
  riskScore: number;
  riskFactors: string[];
}
const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  riskLevel,
  riskScore,
  riskFactors
}) => {
  // Determine the shield icon based on risk level
  const RiskIcon = riskLevel === "Low" ? ShieldCheck : riskLevel === "Medium" ? ShieldAlert : ShieldX;

  // Determine progress color based on risk level
  const progressColor = riskLevel === "Low" ? "bg-green-500" : riskLevel === "Medium" ? "bg-yellow-500" : "bg-red-500";

  // Risk meter markers
  const riskMarkers = [{
    label: "Low",
    value: 33
  }, {
    label: "Medium",
    value: 66
  }, {
    label: "High",
    value: 100
  }];
  return <div>
      <div className="flex items-center mb-4">
        <RiskIcon className={`w-5 h-5 mr-2 ${riskLevel === "Low" ? "text-green-500" : riskLevel === "Medium" ? "text-yellow-500" : "text-red-500"}`} />
        <h3 className="text-lg font-medium text-zinc-50">Risk Assessment</h3>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-zinc-50">Risk Level: {riskLevel}</span>
          <span className="text-sm text-muted-foreground">Score: {riskScore.toFixed(0)}%</span>
        </div>
        
        <div className="relative mt-6 mb-8">
          {/* Risk meter background */}
          <div className="h-2 w-full bg-crypto-dark rounded-full"></div>
          
          {/* Risk level indicator */}
          <div className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${progressColor}`} style={{
          width: `${riskScore}%`
        }}></div>
          
          {/* Risk markers */}
          <div className="relative w-full h-6 mt-1">
            {riskMarkers.map(marker => <div key={marker.label} className="absolute flex flex-col items-center" style={{
            left: `${marker.value}%`,
            transform: "translateX(-50%)"
          }}>
                <div className="w-px h-2 bg-crypto-gray mb-1"></div>
                <span className="text-xs text-muted-foreground">{marker.label}</span>
              </div>)}
            
            {/* Current position indicator */}
            <div className="absolute top-0 flex flex-col items-center" style={{
            left: `${riskScore}%`,
            transform: "translateX(-50%)"
          }}>
              <div className={`w-3 h-3 rounded-full ${riskLevel === "Low" ? "bg-green-500" : riskLevel === "Medium" ? "bg-yellow-500" : "bg-red-500"} shadow-glow-sm animate-pulse`}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium flex items-center mb-2 text-zinc-50">
            <Info className="w-4 h-4 mr-1" />
            Risk Factors
          </h4>
          <ul className="space-y-2">
            {riskFactors.map((factor, index) => <li key={index} className="text-sm text-muted-foreground flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-crypto-gray mt-1.5 mr-2"></span>
                {factor}
              </li>)}
          </ul>
        </div>
        
        <div className="mt-6 p-4 bg-crypto-dark/30 rounded-lg border border-crypto-gray/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-white">Disclaimer:</strong> This risk assessment is based on historical data and current market trends. Cryptocurrency investments are highly speculative and past performance is not indicative of future results. Always do your own research before investing.
          </p>
        </div>
      </div>
    </div>;
};
export default RiskAssessment;