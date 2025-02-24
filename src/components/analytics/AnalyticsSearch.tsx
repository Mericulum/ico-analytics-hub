
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AnalyticsSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterPlatform: string;
  setFilterPlatform: (platform: string) => void;
  filterPriceRange: string;
  setFilterPriceRange: (range: string) => void;
  filterROIRange: string;
  setFilterROIRange: (range: string) => void;
}

export const AnalyticsSearch = ({
  searchQuery,
  setSearchQuery,
  filterPlatform,
  setFilterPlatform,
  filterPriceRange,
  setFilterPriceRange,
  filterROIRange,
  setFilterROIRange,
}: AnalyticsSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
      <div className="relative flex-grow md:w-64">
        <Input
          type="text"
          placeholder="Search ICO projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-crypto-dark border-crypto-gray"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-crypto-dark border-crypto-gray hover:bg-crypto-gray">
            <Filter className="mr-2 h-4 w-4" /> Advanced Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-crypto-dark border-crypto-gray text-white">
          <DialogHeader>
            <DialogTitle>Advanced Filters</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Platforms</SelectItem>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Binance">Binance</SelectItem>
                  <SelectItem value="Solana">Solana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Select value={filterPriceRange} onValueChange={setFilterPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Prices</SelectItem>
                  <SelectItem value="0-100">$0 - $100</SelectItem>
                  <SelectItem value="100-1000">$100 - $1000</SelectItem>
                  <SelectItem value="1000+">$1000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">ROI Range</label>
              <Select value={filterROIRange} onValueChange={setFilterROIRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ROI Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All ROI</SelectItem>
                  <SelectItem value="negative">Negative ROI</SelectItem>
                  <SelectItem value="0-100">0% - 100%</SelectItem>
                  <SelectItem value="100+">100%+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

