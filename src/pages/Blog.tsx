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

const mediumPosts = [
  {
    id: "1",
    title: "Taming the Price Jumps: Slippage Control in Blockchain Trading",
    description: "Slippage in cryptocurrency trading occurs when the execution price differs from the expected price due to market volatility and liquidity issues. This comprehensive guide explains the mechanics behind slippage, its impact on trading profitability, and advanced strategies for minimizing its effects. Learn how major DEXs like Uniswap and PancakeSwap implement slippage tolerance mechanisms and discover expert techniques for optimizing your trades during high-volatility periods. Essential reading for both novice and experienced crypto traders looking to maximize returns while navigating the complexities of decentralized exchanges.",
    url: "https://medium.com/@mericulum/taming-the-price-jumps-slippage-control-in-blockchain-trading-2638f210a719",
    imageUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kXEDxQfEZgI4l3-MJOLe_A.jpeg",
    publishedAt: "May 15, 2023"
  },
  {
    id: "2",
    title: "The Future of DeFi: Trends and Predictions",
    description: "Decentralized Finance (DeFi) represents a paradigm shift in how financial services operate, eliminating intermediaries through blockchain technology. This in-depth analysis explores emerging DeFi trends including cross-chain interoperability solutions, institutional adoption patterns, regulatory developments, and innovative yield optimization strategies. The article examines how DeFi 2.0 protocols are addressing fundamental challenges like capital efficiency, risk management, and scalability while providing insights into potential investment opportunities. With expert opinions from leading developers and economists, this comprehensive overview helps readers navigate the rapidly evolving DeFi landscape and position themselves strategically for future developments.",
    url: "https://medium.com",
    imageUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3Qo-vsAhFcj0vs5SfgcuOw.jpeg",
    publishedAt: "June 20, 2023"
  },
  {
    id: "3",
    title: "NFTs Beyond Art: Practical Applications in Daily Life",
    description: "Non-fungible tokens (NFTs) have revolutionized far more than just digital art marketplaces. This comprehensive exploration reveals how NFTs are transforming industries through verifiable digital ownership and authenticity. From real estate tokenization that enables fractional property ownership to supply chain management systems that track product provenance, NFTs are creating unprecedented business models. The article examines successful implementations in identity verification, loyalty programs, event ticketing, intellectual property protection, and gaming ecosystems. With case studies from major brands and technical insights into smart contract integration, readers will gain a thorough understanding of how NFT technology is shaping the future of digital interactions and commerce.",
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
  
  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(date));
    }
  }, [date]);

  const handleDateChange = (date: Date) => {
    navigate(`/blog/${date.toISOString().split('T')[0]}`);
  };

  const handleBackToList = () => {
    navigate('/blog');
  };

  const todayFormatted = formatDate(selectedDate, "MMMM d, yyyy");

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
