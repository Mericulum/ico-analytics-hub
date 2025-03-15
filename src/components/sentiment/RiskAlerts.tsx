
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentOverview } from "@/types/sentiment";
import { AlertTriangle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RiskAlertsProps {
  data: SentimentOverview;
  isLoading: boolean;
}

export const RiskAlerts = ({ data, isLoading }: RiskAlertsProps) => {
  if (isLoading) {
    return (
      <Card className="bg-crypto-dark border-crypto-gray">
        <CardHeader>
          <CardTitle className="text-white">Risk Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 bg-crypto-gray/20 rounded w-1/3"></div>
                <div className="h-12 bg-crypto-gray/20 rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!data.riskAlerts.length) {
    return (
      <Card className="bg-crypto-dark border-crypto-gray">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-crypto-blue" />
            Risk Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-gray-400">
            No risk alerts detected
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-crypto-dark border-crypto-gray">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-crypto-blue" />
          Risk Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.riskAlerts.map((alert) => {
          let severityColor = "text-yellow-500";
          let severityBg = "bg-yellow-500/10";
          
          if (alert.severity === "high") {
            severityColor = "text-red-500";
            severityBg = "bg-red-500/10";
          } else if (alert.severity === "low") {
            severityColor = "text-green-500";
            severityBg = "bg-green-500/10";
          }
          
          return (
            <div key={alert.id} className={`p-3 rounded-lg ${severityBg} border-l-4 border-${severityColor}`}>
              <div className="flex justify-between items-start">
                <div className={`font-medium ${severityColor}`}>
                  {alert.alertType}
                </div>
                <div className="text-xs text-gray-400 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </div>
              </div>
              <div className="text-white text-sm mt-1">
                <span className="font-medium">{alert.icoName}: </span>
                {alert.description}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Source: {alert.source}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
