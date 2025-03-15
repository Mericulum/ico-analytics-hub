
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentOverview } from "@/types/sentiment";
import { Search } from "lucide-react";

interface KeywordCloudProps {
  data: SentimentOverview;
  isLoading: boolean;
  onKeywordClick: (keyword: string) => void;
}

export const KeywordCloud = ({ data, isLoading, onKeywordClick }: KeywordCloudProps) => {
  if (isLoading) {
    return (
      <Card className="bg-crypto-dark border-crypto-gray">
        <CardHeader>
          <CardTitle className="text-white">Trending Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse flex flex-wrap gap-2">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="h-8 bg-crypto-gray/20 rounded w-20"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-crypto-dark border-crypto-gray">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Search className="h-5 w-5 mr-2 text-crypto-blue" />
          Trending Keywords
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {data.trendingKeywords.map((item) => {
            // Calculate size based on count (largest 10 keywords)
            const maxCount = Math.max(...data.trendingKeywords.map(k => k.count));
            const minSize = 0.8;
            const maxSize = 1.4;
            const size = minSize + ((item.count / maxCount) * (maxSize - minSize));
            
            // Determine color based on sentiment
            let color = "bg-yellow-500/20 text-yellow-500";
            if (item.sentiment > 0.2) {
              color = "bg-green-500/20 text-green-500";
            } else if (item.sentiment < -0.2) {
              color = "bg-red-500/20 text-red-500";
            }
            
            return (
              <button
                key={item.keyword}
                className={`px-3 py-1 rounded-full ${color} transition-all hover:scale-105`}
                style={{
                  fontSize: `${size}rem`,
                }}
                onClick={() => onKeywordClick(item.keyword)}
              >
                {item.keyword}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
