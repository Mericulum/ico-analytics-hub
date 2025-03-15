
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ICOSentiment } from "@/types/sentiment";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Hash } from "lucide-react";

interface ICODetailsDialogProps {
  ico: ICOSentiment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ICODetailsDialog = ({ ico, isOpen, onClose }: ICODetailsDialogProps) => {
  if (!ico) return null;

  // Format data for the sentiment chart
  const chartData = ico.sentimentHistory.map(point => {
    const date = new Date(point.timestamp);
    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      sentiment: point.score
    };
  });

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-crypto-dark border-crypto-gray text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img
              src={ico.logoUrl || "https://via.placeholder.com/32"}
              alt={ico.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              {ico.name} <span className="text-gray-400">({ico.symbol})</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`${iconColor}`}>
                <SentimentIcon className="h-5 w-5" />
              </div>
              <div className="text-xl font-medium">
                {ico.overallSentiment.toFixed(2)}
              </div>
              <div className={`text-sm ${ico.trendChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {ico.trendChange24h >= 0 ? "+" : ""}{ico.trendChange24h.toFixed(1)}%
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400">Mentions</div>
              <div className="text-xl font-medium">{ico.mentionsCount.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-gray-400">Sentiment Distribution</div>
            <div className="h-3 flex rounded-full overflow-hidden">
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
            <div className="flex justify-between text-xs text-gray-400">
              <span>Negative: {ico.negativePercentage}%</span>
              <span>Neutral: {ico.neutralPercentage}%</span>
              <span>Positive: {ico.positivePercentage}%</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className={`text-sm px-2 py-1 rounded-full ${riskBadgeColor}`}>
              {ico.riskLevel === "high" && <AlertTriangle className="inline h-3 w-3 mr-1" />}
              Risk Level: {ico.riskLevel}
            </div>
            <div className={`text-sm px-2 py-1 rounded-full bg-purple-500/20 text-purple-500`}>
              Hype Level: {ico.hypeLevel}
            </div>
          </div>
          
          <div className="h-64">
            <div className="text-sm font-medium mb-2">Sentiment Trend (30 Days)</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A4B57" />
                <XAxis 
                  dataKey="date" 
                  stroke="#4BA3CC" 
                  tick={{ fill: '#4BA3CC' }}
                />
                <YAxis 
                  domain={[-1, 1]}
                  tickFormatter={(value) => value.toFixed(1)}
                  stroke="#4BA3CC" 
                  tick={{ fill: '#4BA3CC' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A3B47',
                    border: '1px solid #2A4B57',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sentiment" 
                  name="Sentiment"
                  stroke="#6FD5FF"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2 flex items-center">
              <Hash className="h-4 w-4 mr-1 text-crypto-blue" />
              Related Keywords
            </div>
            <div className="flex flex-wrap gap-2">
              {ico.relatedKeywords.map((keyword) => (
                <span 
                  key={keyword.keyword}
                  className="text-xs px-2 py-1 rounded-full bg-crypto-blue/20 text-crypto-blue"
                >
                  {keyword.keyword} ({keyword.count})
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
