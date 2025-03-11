
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Newspaper, FileText } from "lucide-react";
import { useCryptoNews } from "@/services/newsService";
import { useBinanceICOProjects } from "@/services/binanceService";
import BlogSummary from "@/components/blog/BlogSummary";
import BlogList from "@/components/blog/BlogList";
import MediumPosts from "@/components/blog/MediumPosts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";

const Blog = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { data: newsData } = useCryptoNews();
  const { data: tokenData } = useBinanceICOProjects();
  const [selectedDate, setSelectedDate] = useState<Date>(date ? new Date(date) : new Date());
  const [activeTab, setActiveTab] = useState<string>("summaries");
  
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
        <Tabs 
          defaultValue="summaries" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Blog</h1>
            {activeTab === "summaries" && (
              <Button 
                onClick={() => handleDateChange(new Date())}
                className="bg-crypto-blue hover:bg-crypto-blue/80"
              >
                View Today's Summary
              </Button>
            )}
          </div>
          
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-crypto-dark">
            <TabsTrigger 
              value="summaries"
              className="data-[state=active]:bg-crypto-blue/20 data-[state=active]:text-crypto-blue text-gray-300 flex items-center gap-2"
            >
              <Newspaper className="h-4 w-4" />
              Daily Crypto Summaries
            </TabsTrigger>
            <TabsTrigger 
              value="medium"
              className="data-[state=active]:bg-crypto-blue/20 data-[state=active]:text-crypto-blue text-gray-300 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Medium Posts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summaries" className="mt-0">
            <BlogList onSelectDate={handleDateChange} />
          </TabsContent>
          
          <TabsContent value="medium" className="mt-0">
            <MediumPosts />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
