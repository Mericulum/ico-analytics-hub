
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICOSentiment } from "@/types/sentiment";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface TopICOsListProps {
  icos: ICOSentiment[];
  isLoading: boolean;
  onViewDetails: (icoId: string) => void;
}

export const TopICOsList = ({ icos, isLoading, onViewDetails }: TopICOsListProps) => {
  if (isLoading) {
    return (
      <Card className="bg-crypto-dark border-crypto-gray">
        <CardHeader>
          <CardTitle className="text-white">Top ICO Mentions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 bg-crypto-gray/20 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-crypto-gray/20 rounded w-1/4"></div>
                  <div className="h-3 bg-crypto-gray/20 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-crypto-dark border-crypto-gray">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Top ICO Mentions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {icos.map((ico) => {
          // Determine sentiment icon
          let SentimentIcon = Minus;
          let iconColor = "text-yellow-500";
          
          if (ico.overallSentiment > 0.2) {
            SentimentIcon = TrendingUp;
            iconColor = "text-green-500";
          } else if (ico.overallSentiment < -0.2) {
            SentimentIcon = TrendingDown;
            iconColor = "text-red-500";
          }
          
          // Determine risk badge
          let riskBadgeColor = "bg-green-500/20 text-green-500";
          if (ico.riskLevel === "moderate") {
            riskBadgeColor = "bg-yellow-500/20 text-yellow-500";
          } else if (ico.riskLevel === "high") {
            riskBadgeColor = "bg-red-500/20 text-red-500";
          }
          
          // Determine hype badge
          let hypeBadgeColor = "bg-blue-500/20 text-blue-500";
          if (ico.hypeLevel === "moderate") {
            hypeBadgeColor = "bg-purple-500/20 text-purple-500";
          } else if (ico.hypeLevel === "high") {
            hypeBadgeColor = "bg-pink-500/20 text-pink-500";
          }
          
          return (
            <div key={ico.id} className="space-y-3 pb-3 border-b border-crypto-gray last:border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={ico.logoUrl || "https://via.placeholder.com/32"}
                    alt={ico.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-white">{ico.name}</div>
                    <div className="text-xs text-gray-400">{ico.symbol} • {ico.mentionsCount.toLocaleString()} mentions</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className={`${iconColor}`}>
                    <SentimentIcon className="h-4 w-4" />
                  </span>
                  <span className="text-white">{ico.overallSentiment.toFixed(2)}</span>
                  <span className="text-gray-400 text-xs">
                    {ico.trendChange24h >= 0 ? "+" : ""}{ico.trendChange24h.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="h-2 flex rounded-full overflow-hidden">
                <div 
                  className="bg-red-500"
                  style={{ width: `${ico.negativePercentage}%` }}
                ></div>
                <div 
                  className="bg-yellow-500"
                  style={{ width: `${ico.neutralPercentage}%` }}
                ></div>
                <div 
                  className="bg-green-500"
                  style={{ width: `${ico.positivePercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${riskBadgeColor}`}>
                    {ico.riskLevel === "high" && <AlertTriangle className="inline h-3 w-3 mr-1" />}
                    Risk: {ico.riskLevel}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${hypeBadgeColor}`}>
                    Hype: {ico.hypeLevel}
                  </span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs h-7 bg-crypto-gray/30 hover:bg-crypto-blue/20 text-crypto-blue border-crypto-blue/30"
                  onClick={() => onViewDetails(ico.id)}
                >
                  Details
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
