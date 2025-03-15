
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Clock, Filter, Bell } from "lucide-react";
import { SentimentFilters, Platform } from "@/types/sentiment";

interface SentimentHeaderProps {
  filters: SentimentFilters;
  setFilters: (filters: SentimentFilters) => void;
  isSubscribed: boolean;
  onSubscribeAlerts: () => void;
}

export const SentimentHeader = ({
  filters,
  setFilters,
  isSubscribed,
  onSubscribeAlerts,
}: SentimentHeaderProps) => {
  const handleTimeRangeChange = (value: string) => {
    setFilters({
      ...filters,
      timeRange: value as '24h' | '7d' | '30d' | 'all',
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      searchTerm: event.target.value,
    });
  };

  const togglePlatform = (platform: Platform) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform];
    
    setFilters({
      ...filters,
      platforms: newPlatforms.length ? newPlatforms : ['twitter', 'reddit', 'telegram', 'news'],
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Sentiment Analysis</h1>
          <p className="text-gray-400">Real-time social media and news sentiment for ICOs</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className={`bg-crypto-dark text-white border border-crypto-gray hover:bg-crypto-gray ${isSubscribed ? 'bg-crypto-blue/20' : ''}`}
            onClick={onSubscribeAlerts}
          >
            <Bell className="h-4 w-4 mr-2" />
            {isSubscribed ? 'Alerts Active' : 'Subscribe to Alerts'}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3 bg-crypto-dark p-3 rounded-lg border border-crypto-gray">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search ICOs, keywords, or hashtags..."
            className="pl-9 bg-crypto-gray border-crypto-blue/20 text-white"
            value={filters.searchTerm || ''}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <Select 
            value={filters.timeRange} 
            onValueChange={handleTimeRangeChange}
          >
            <SelectTrigger className="w-[130px] bg-crypto-gray border-crypto-blue/20 text-white">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-crypto-dark border-crypto-blue/20 text-white">
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <div className="flex gap-1">
            {['twitter', 'reddit', 'telegram', 'news'].map((platform) => (
              <Button
                key={platform}
                variant="outline"
                size="sm"
                className={`px-2 py-1 capitalize ${
                  filters.platforms.includes(platform as Platform)
                    ? 'bg-crypto-blue/30 text-white border-crypto-blue'
                    : 'bg-crypto-gray/30 text-gray-400 border-crypto-gray/50'
                }`}
                onClick={() => togglePlatform(platform as Platform)}
              >
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
