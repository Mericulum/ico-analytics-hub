
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, ChevronRight, Newspaper } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogListProps {
  onSelectDate: (date: Date) => void;
}

const BlogList = ({ onSelectDate }: BlogListProps) => {
  // Generate last 14 days for blog posts (for demonstration)
  const [blogDates, setBlogDates] = useState<Date[]>([]);
  
  useEffect(() => {
    const dates: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date);
    }
    
    setBlogDates(dates);
  }, []);
  
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogDates.map((date, index) => (
        <Card 
          key={index} 
          className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors cursor-pointer"
          onClick={() => onSelectDate(date)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-crypto-blue/20 flex items-center justify-center">
              <Newspaper className="h-6 w-6 text-crypto-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                {index === 0 ? "Today's Summary" : formatDate(date, "MMMM d")} 
              </h3>
              <div className="text-sm text-gray-400 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(date, "EEEE, MMMM d, yyyy")}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              {index === 0 
                ? 'Latest market insights and news' 
                : `Market summary for ${formatDate(date, "MMM d")}`
              }
            </div>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
