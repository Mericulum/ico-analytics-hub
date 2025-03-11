
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, TrendingUp, TrendingDown, Eye } from "lucide-react";
import { useCryptoNews } from "@/services/newsService";
import { useBinanceICOProjects } from "@/services/binanceService";
import BlogSummary from "@/components/blog/BlogSummary";
import BlogList from "@/components/blog/BlogList";
import { formatDate } from "@/lib/utils";

const Blog = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { data: newsData } = useCryptoNews();
  const { data: tokenData } = useBinanceICOProjects();
  const [selectedDate, setSelectedDate] = useState<Date>(date ? new Date(date) : new Date());
  
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Daily Crypto Summaries</h1>
          <Button 
            onClick={() => handleDateChange(new Date())}
            className="bg-crypto-blue hover:bg-crypto-blue/80"
          >
            View Today's Summary
          </Button>
        </div>
        
        <BlogList onSelectDate={handleDateChange} />
      </div>
    </DashboardLayout>
  );
};

export default Blog;
