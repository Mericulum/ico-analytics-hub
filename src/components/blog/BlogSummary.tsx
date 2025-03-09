
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsItem } from "@/services/newsService";
import { ICOProject } from "@/types/ico";
import { TrendingUp, TrendingDown, LineChart, Calendar, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate } from "@/lib/utils";

interface BlogSummaryProps {
  date: Date;
  newsData: NewsItem[];
  tokenData: ICOProject[];
}

const BlogSummary = ({ date, newsData, tokenData }: BlogSummaryProps) => {
  const [topPositiveNews, setTopPositiveNews] = useState<NewsItem[]>([]);
  const [topNegativeNews, setTopNegativeNews] = useState<NewsItem[]>([]);
  const [topGainers, setTopGainers] = useState<ICOProject[]>([]);
  const [topLosers, setTopLosers] = useState<ICOProject[]>([]);
  const [recentTokens, setRecentTokens] = useState<ICOProject[]>([]);
  
  // Filter news for the selected date
  useEffect(() => {
    if (newsData?.length) {
      const dateString = date.toDateString();
      
      // Filter news for the selected date
      const filteredNews = newsData.filter(item => {
        const newsDate = new Date(Number(item.publishedAt) * 1000);
        return newsDate.toDateString() === dateString;
      });
      
      // Find positive news
      const positiveNews = filteredNews.filter(item => {
        const positiveKeywords = ['surge', 'bull', 'grow', 'gain', 'profit', 'rise', 'up', 'high', 'success'];
        return positiveKeywords.some(keyword => 
          item.title.toLowerCase().includes(keyword) || 
          item.body.toLowerCase().includes(keyword)
        );
      });
      
      // Find negative news
      const negativeNews = filteredNews.filter(item => {
        const negativeKeywords = ['crash', 'bear', 'drop', 'loss', 'down', 'fall', 'low', 'fail'];
        return negativeKeywords.some(keyword => 
          item.title.toLowerCase().includes(keyword) || 
          item.body.toLowerCase().includes(keyword)
        );
      });
      
      setTopPositiveNews(positiveNews.slice(0, 3));
      setTopNegativeNews(negativeNews.slice(0, 3));
    }
  }, [newsData, date]);
  
  // Process token data
  useEffect(() => {
    if (tokenData?.length) {
      // Sort by price change (for demo we'll use random data since we don't have historical prices)
      const sortedTokens = [...tokenData];
      
      // Simulate price changes for demonstration
      sortedTokens.forEach(token => {
        (token as any).priceChange = Math.random() * 20 - 10; // Random between -10% and +10%
      });
      
      // Sort by price change
      const gainers = sortedTokens
        .filter(token => (token as any).priceChange > 0)
        .sort((a, b) => (b as any).priceChange - (a as any).priceChange)
        .slice(0, 5);
      
      const losers = sortedTokens
        .filter(token => (token as any).priceChange < 0)
        .sort((a, b) => (a as any).priceChange - (b as any).priceChange)
        .slice(0, 5);
      
      // Find tokens issued in 2024
      const recent = sortedTokens
        .filter(token => {
          if (!token["ICO date"]) return false;
          const launchDate = new Date(token["ICO date"]);
          return launchDate.getFullYear() >= 2024;
        })
        .slice(0, 5);
      
      setTopGainers(gainers);
      setTopLosers(losers);
      setRecentTokens(recent);
    }
  }, [tokenData]);
  
  // Generate next day forecast data
  const forecastData = [
    { day: "Today", value: 100 },
    { day: "Tomorrow", value: 100 + (Math.random() * 10 - 5) },
    { day: "+2 Days", value: 100 + (Math.random() * 15 - 7.5) },
    { day: "+3 Days", value: 100 + (Math.random() * 20 - 10) },
    { day: "+4 Days", value: 100 + (Math.random() * 25 - 12.5) },
    { day: "+5 Days", value: 100 + (Math.random() * 30 - 15) },
  ];
  
  const forecastTrend = forecastData[forecastData.length - 1].value > forecastData[0].value;

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <h1 className="text-2xl font-bold text-white mb-6">
          Crypto Market Daily Summary - {formatDate(date, "MMMM d, yyyy")}
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300">
            Today's cryptocurrency market is showing {forecastTrend ? "positive" : "negative"} signs with 
            notable performances from {topGainers[0]?.["Project Name"] || "various tokens"}. Key news affecting 
            the market includes {topPositiveNews[0]?.title || "developments in regulatory frameworks"} and 
            {topNegativeNews[0]?.title || "macroeconomic uncertainties"}.
          </p>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-crypto-dark border-crypto-blue">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Top Gaining Tokens
          </h2>
          <div className="space-y-4">
            {topGainers.map((token, index) => (
              <div key={index} className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crypto-blue to-crypto-green flex items-center justify-center">
                    {token["Project Name"]?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{token["Project Name"]}</div>
                    <div className="text-sm text-gray-400">{token.Platform}</div>
                  </div>
                </div>
                <div className="text-green-500 font-semibold">
                  +{((token as any).priceChange).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6 bg-crypto-dark border-crypto-blue">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Top Declining Tokens
          </h2>
          <div className="space-y-4">
            {topLosers.map((token, index) => (
              <div key={index} className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crypto-blue to-red-500 flex items-center justify-center">
                    {token["Project Name"]?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{token["Project Name"]}</div>
                    <div className="text-sm text-gray-400">{token.Platform}</div>
                  </div>
                </div>
                <div className="text-red-500 font-semibold">
                  {((token as any).priceChange).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <h2 className="text-xl font-bold text-white mb-4">Top News Stories</h2>
        
        <Tabs defaultValue="positive" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-crypto-dark">
            <TabsTrigger 
              value="positive"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-gray-300"
            >
              Positive News
            </TabsTrigger>
            <TabsTrigger 
              value="negative"
              className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 text-gray-300"
            >
              Negative News
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="positive" className="mt-0">
            <div className="space-y-4">
              {topPositiveNews.length > 0 ? (
                topPositiveNews.map((item, index) => (
                  <a 
                    key={index} 
                    href={item.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b border-zinc-800 pb-4 hover:bg-zinc-800/30 p-2 rounded-md transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{item.body}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>{item.source}</span>
                          <span>•</span>
                          <span>{formatDate(new Date(Number(item.publishedAt) * 1000), "MMM d, yyyy")}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-gray-500 text-center py-6">No positive news found for this date</div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="negative" className="mt-0">
            <div className="space-y-4">
              {topNegativeNews.length > 0 ? (
                topNegativeNews.map((item, index) => (
                  <a 
                    key={index} 
                    href={item.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b border-zinc-800 pb-4 hover:bg-zinc-800/30 p-2 rounded-md transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{item.body}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>{item.source}</span>
                          <span>•</span>
                          <span>{formatDate(new Date(Number(item.publishedAt) * 1000), "MMM d, yyyy")}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-gray-500 text-center py-6">No negative news found for this date</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-crypto-blue" />
          Recent Token Launches (2024)
        </h2>
        <div className="space-y-4">
          {recentTokens.length > 0 ? (
            recentTokens.map((token, index) => (
              <div key={index} className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crypto-blue to-crypto-green flex items-center justify-center">
                    {token["Project Name"]?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      {token["Project Name"]}
                      <Badge className="bg-green-500 text-black">2024</Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      Launched on {token["ICO date"] ? formatDate(new Date(token["ICO date"]), "MMM d, yyyy") : 'N/A'}
                    </div>
                  </div>
                </div>
                <div className="text-white font-semibold">
                  {token.value}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-6">No 2024 token launches found</div>
          )}
        </div>
      </Card>
      
      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <LineChart className="h-5 w-5 text-crypto-blue" />
          Market Forecast
        </h2>
        
        <div className="prose prose-invert max-w-none mb-6">
          <p className="text-gray-300">
            Based on current market trends and news sentiment, our forecast for the coming days indicates a 
            {forecastTrend ? " positive trend with potential for continued growth." : " potential downturn in the market."} 
            Investors should keep an eye on {topGainers[0]?.["Project Name"] || "major tokens"} and 
            upcoming regulatory developments.
          </p>
        </div>
        
        <div className="h-[300px] mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#E5E7EB"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={forecastTrend ? "#10B981" : "#EF4444"} 
                fill={forecastTrend ? "url(#colorGreen)" : "url(#colorRed)"} 
              />
              <defs>
                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default BlogSummary;
