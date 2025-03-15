
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentOverview } from "@/types/sentiment";
import { TrendingUp, TrendingDown, BarChart2, PieChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SentimentOverviewCardProps {
  data: SentimentOverview;
  isLoading: boolean;
}

export const SentimentOverviewCard = ({ data, isLoading }: SentimentOverviewCardProps) => {
  if (isLoading) {
    return (
      <Card className="bg-crypto-dark border-crypto-gray">
        <CardHeader>
          <CardTitle className="text-white">Overall Sentiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-crypto-gray/20 rounded"></div>
            <div className="h-10 bg-crypto-gray/20 rounded"></div>
            <div className="h-10 bg-crypto-gray/20 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Convert sentiment score (-1 to 1) to a percentage (0 to 100)
  const sentimentPercentage = ((data.averageSentiment + 1) / 2) * 100;
  
  // Determine sentiment category & color
  let sentimentLabel = "Neutral";
  let sentimentColor = "bg-yellow-500";
  let sentimentIcon = BarChart2;
  
  if (data.averageSentiment > 0.2) {
    sentimentLabel = "Positive";
    sentimentColor = "bg-green-500";
    sentimentIcon = TrendingUp;
  } else if (data.averageSentiment < -0.2) {
    sentimentLabel = "Negative";
    sentimentColor = "bg-red-500";
    sentimentIcon = TrendingDown;
  }
  
  const Icon = sentimentIcon;

  return (
    <Card className="bg-crypto-dark border-crypto-gray">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Icon className="h-5 w-5 mr-2 text-crypto-blue" />
          Overall Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg text-gray-400">Average Sentiment</div>
            <div className="text-3xl font-bold text-white flex items-center">
              {sentimentLabel}
              <span className={`ml-2 w-3 h-3 rounded-full ${sentimentColor}`}></span>
            </div>
            <div className="text-sm text-gray-400">
              Score: {data.averageSentiment.toFixed(2)} (-1 to 1 scale)
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg text-gray-400">Total Mentions</div>
            <div className="text-3xl font-bold text-white">
              {data.totalMentions.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">
              Across all platforms
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Negative</span>
            <span>Neutral</span>
            <span>Positive</span>
          </div>
          <div className="h-2 flex rounded-full overflow-hidden">
            <div 
              className="bg-red-500"
              style={{ width: `${data.sentimentDistribution.negative * 100}%` }}
            ></div>
            <div 
              className="bg-yellow-500"
              style={{ width: `${data.sentimentDistribution.neutral * 100}%` }}
            ></div>
            <div 
              className="bg-green-500"
              style={{ width: `${data.sentimentDistribution.positive * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{Math.round(data.sentimentDistribution.negative * 100)}%</span>
            <span>{Math.round(data.sentimentDistribution.neutral * 100)}%</span>
            <span>{Math.round(data.sentimentDistribution.positive * 100)}%</span>
          </div>
        </div>
        
        <div className="pt-2 space-y-2">
          <div className="text-sm font-medium text-white">Platform Distribution</div>
          <div className="space-y-2">
            {Object.entries(data.platformDistribution).map(([platform, value]) => (
              <div key={platform} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 capitalize">{platform}</span>
                  <span className="text-gray-400">{Math.round(value * 100)}%</span>
                </div>
                <Progress value={value * 100} className="h-1" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
