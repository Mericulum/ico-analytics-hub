
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Calendar, TrendingUp, TrendingDown, Eye } from "lucide-react";
import { useCryptoNews } from "@/services/newsService";
import { useBinanceICOProjects } from "@/services/binanceService";
import BlogSummary from "@/components/blog/BlogSummary";
import BlogList from "@/components/blog/BlogList";
import MediumPosts from "@/components/blog/MediumPosts";
import { formatDate } from "@/lib/utils";

// Sample Medium posts
const mediumPosts = [
  {
    id: "1",
    title: "Taming the Price Jumps: Slippage Control in Blockchain Trading",
    description: "Slippage in crypto trading occurs when the execution price of a trade differs from what was expected. This difference, or 'slip,' happens because of market volatility and low liquidity. Learn how to manage and control slippage effectively.",
    url: "https://medium.com/@mericulum/taming-the-price-jumps-slippage-control-in-blockchain-trading-2638f210a719",
    imageUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kXEDxQfEZgI4l3-MJOLe_A.jpeg",
    publishedAt: "May 15, 2023"
  },
  {
    id: "2",
    title: "The Future of DeFi: Trends and Predictions",
    description: "Decentralized Finance (DeFi) has emerged as one of the most significant applications of blockchain technology. This article explores upcoming trends and makes predictions about the future of this rapidly evolving sector.",
    url: "https://medium.com",
    imageUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3Qo-vsAhFcj0vs5SfgcuOw.jpeg",
    publishedAt: "June 20, 2023"
  },
  {
    id: "3",
    title: "NFTs Beyond Art: Practical Applications in Daily Life",
    description: "Non-fungible tokens (NFTs) have gained popularity primarily through digital art, but their potential extends far beyond. This article explores practical applications of NFTs in everyday scenarios and various industries.",
    url: "https://medium.com",
    imageUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Hx-5Lt4L-zMVVQpkj-ClLw.jpeg",
    publishedAt: "July 7, 2023"
  }
];

const Blog = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { data: newsData } = useCryptoNews();
  const { data: tokenData } = useBinanceICOProjects();
  const [selectedDate, setSelectedDate] = useState<Date>(date ? new Date(date) : new Date());
  const [activeTab, setActiveTab] = useState<string>("daily");
  
  // If date changes, update selectedDate
  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(date));
    }
  }, [date]);

  // Navigate to a specific date's blog
  const handleDateChange = (date: Date) => {
    navigate(`/blog/${date.toISOString().split('T')[0]}`);
  };

  // Navigate back to blog list
  const handleBackToList = () => {
    navigate('/blog');
  };

  // Format today's date for display
  const todayFormatted = formatDate(selectedDate, "MMMM d, yyyy");

  // If we're viewing a specific date's blog
  if (date) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handleBackToList}
              className="flex items-center gap-2 text-gray-400"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to all summaries
            </Button>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="h-4 w-4" />
              {todayFormatted}
            </div>
          </div>
          
          <BlogSummary 
            date={selectedDate} 
            newsData={newsData || []} 
            tokenData={tokenData || []} 
          />
        </div>
      </DashboardLayout>
    );
  }

  // If we're viewing the blog list
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Mericulum Blog</h1>
          <Button 
            onClick={() => handleDateChange(new Date())}
            className="bg-crypto-blue hover:bg-crypto-blue/80"
          >
            View Today's Summary
          </Button>
        </div>
        
        <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-crypto-dark border border-crypto-gray">
            <TabsTrigger 
              value="daily" 
              className="data-[state=active]:bg-crypto-blue data-[state=active]:text-white"
            >
              Daily Crypto Summaries
            </TabsTrigger>
            <TabsTrigger 
              value="medium" 
              className="data-[state=active]:bg-crypto-blue data-[state=active]:text-white"
            >
              Medium Articles
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-0">
            <BlogList onSelectDate={handleDateChange} />
          </TabsContent>
          
          <TabsContent value="medium" className="mt-0">
            <MediumPosts posts={mediumPosts} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
