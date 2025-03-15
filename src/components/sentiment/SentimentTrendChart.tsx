
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentOverview } from "@/types/sentiment";
import { Activity } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from "recharts";
import { useState } from "react";

interface SentimentTrendChartProps {
  data: SentimentOverview;
  isLoading: boolean;
}

export const SentimentTrendChart = ({ data, isLoading }: SentimentTrendChartProps) => {
  const [showMentions, setShowMentions] = useState(true);
  
  if (isLoading) {
    return (
      <Card className="bg-crypto-dark border-crypto-gray">
        <CardHeader>
          <CardTitle className="text-white">Sentiment Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse h-[300px] bg-crypto-gray/20 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  // Format data for the chart
  const chartData = data.recentTrends.map(point => {
    // Convert timestamp to a date object
    const date = new Date(point.timestamp);
    
    // Format date as MM/DD
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    
    // Convert sentiment from -1 to 1 scale to percentage 0 to 100
    const sentimentPercentage = ((point.averageSentiment + 1) / 2) * 100;
    
    return {
      date: formattedDate,
      sentiment: point.averageSentiment,
      sentimentPercentage,
      mentions: point.mentionsCount
    };
  });

  return (
    <Card className="bg-crypto-dark border-crypto-gray">
      <CardHeader className="pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center">
          <Activity className="h-5 w-5 mr-2 text-crypto-blue" />
          Sentiment Trends
        </CardTitle>
        <div className="flex items-center gap-2">
          <button
            className={`text-xs px-2 py-1 rounded ${showMentions ? 'bg-crypto-blue text-white' : 'bg-crypto-gray/40 text-gray-400'}`}
            onClick={() => setShowMentions(true)}
          >
            Mentions
          </button>
          <button
            className={`text-xs px-2 py-1 rounded ${!showMentions ? 'bg-crypto-blue text-white' : 'bg-crypto-gray/40 text-gray-400'}`}
            onClick={() => setShowMentions(false)}
          >
            Sentiment Only
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            {showMentions ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A4B57" />
                <XAxis 
                  dataKey="date" 
                  stroke="#4BA3CC" 
                  tick={{ fill: '#4BA3CC' }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#4BA3CC" 
                  tick={{ fill: '#4BA3CC' }}
                  domain={[-1, 1]}
                  tickFormatter={(value) => value.toFixed(1)}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#6FD5FF" 
                  tick={{ fill: '#6FD5FF' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A3B47',
                    border: '1px solid #2A4B57',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="sentiment" 
                  name="Sentiment"
                  stroke="#6FD5FF"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="mentions" 
                  name="Mentions"
                  stroke="#4BA3CC"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6FD5FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6FD5FF" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
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
                <Area 
                  type="monotone" 
                  dataKey="sentiment" 
                  name="Sentiment"
                  stroke="#6FD5FF" 
                  fill="url(#colorSentiment)"
                  strokeWidth={2}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
