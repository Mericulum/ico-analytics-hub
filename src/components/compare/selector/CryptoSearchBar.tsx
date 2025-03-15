
import React from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

interface CryptoSearchBarProps {
  searchQuery: string;
  isOpen: boolean;
  onSearchChange: (query: string) => void;
}

const CryptoSearchBar: React.FC<CryptoSearchBarProps> = ({ 
  searchQuery, 
  isOpen, 
  onSearchChange 
}) => {
  return (
    <div className="flex items-center p-2 bg-crypto-dark/50">
      <Search className="h-4 w-4 mr-2 text-muted-foreground" />
      <Input
        placeholder="Search cryptocurrencies..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-8 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
      />
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
    </div>
  );
};

export default CryptoSearchBar;
