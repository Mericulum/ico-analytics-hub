
import React, { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getCategoriesWithCryptos, getCryptoById } from './utils/cryptoData';

interface CryptoSelectorProps {
  selectedCryptos: string[];
  onChange: (cryptos: string[]) => void;
}

const CryptoSelector: React.FC<CryptoSelectorProps> = ({ selectedCryptos, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isSelectionOpen, setIsSelectionOpen] = useState(true);
  
  // Get all categories with their cryptocurrencies
  const categoriesWithCryptos = getCategoriesWithCryptos();
  
  // Filter cryptos based on search query
  const filteredCategories = searchQuery.trim() === '' 
    ? categoriesWithCryptos 
    : categoriesWithCryptos.map(category => ({
        ...category,
        cryptos: category.cryptos.filter(crypto => 
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.cryptos.length > 0);
  
  // Handle crypto selection
  const handleCryptoToggle = (cryptoId: string) => {
    if (selectedCryptos.includes(cryptoId)) {
      onChange(selectedCryptos.filter(id => id !== cryptoId));
    } else {
      onChange([...selectedCryptos, cryptoId]);
    }
  };
  
  // Handle category expansion
  const toggleCategoryExpansion = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(cat => cat !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };
  
  // Clear all selections
  const clearSelections = () => {
    onChange([]);
  };
  
  // Get crypto details for the selected chips
  const selectedCryptoDetails = selectedCryptos.map(id => getCryptoById(id)).filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Selected cryptos chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedCryptoDetails.map((crypto) => crypto && (
          <Badge 
            key={crypto.id} 
            variant="outline" 
            className="flex items-center gap-1 pl-2 pr-1 py-1 border-crypto-gray"
            style={{ borderColor: `${crypto.color}40` }}
          >
            <img 
              src={crypto.logo} 
              alt={crypto.symbol} 
              className="w-4 h-4 mr-1" 
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span>{crypto.symbol}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 hover:bg-crypto-dark rounded-full"
              onClick={() => handleCryptoToggle(crypto.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        {selectedCryptos.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSelections}
            className="text-xs h-7 px-2 hover:bg-red-950/40 hover:text-red-400"
          >
            Clear All
          </Button>
        )}
      </div>
      
      <Collapsible
        open={isSelectionOpen}
        onOpenChange={setIsSelectionOpen}
        className="border border-crypto-gray rounded-md overflow-hidden"
      >
        <div className="flex items-center p-2 bg-crypto-dark/50">
          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
          />
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {isSelectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <ScrollArea className="h-60">
            <div className="p-2">
              <Accordion type="multiple" defaultValue={['top-coins']}>
                <AccordionItem value="top-coins" className="border-crypto-gray">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="text-sm font-medium">Top Cryptocurrencies</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categoriesWithCryptos[0].cryptos.slice(0, 5).map(crypto => (
                        <div key={`top-${crypto.id}`} className="flex items-center space-x-2">
                          <Checkbox
                            id={`top-${crypto.id}`}
                            checked={selectedCryptos.includes(crypto.id)}
                            onCheckedChange={() => handleCryptoToggle(crypto.id)}
                          />
                          <label
                            htmlFor={`top-${crypto.id}`}
                            className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            <img
                              src={crypto.logo}
                              alt={crypto.symbol}
                              className="w-5 h-5 mr-2"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            {crypto.name} 
                            <span className="ml-2 text-xs text-muted-foreground">
                              {crypto.symbol}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {filteredCategories.map(category => (
                  <AccordionItem key={category.category} value={category.category} className="border-crypto-gray">
                    <AccordionTrigger className="py-2 hover:no-underline">
                      <div className="flex items-center space-x-2">
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></span>
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-xs text-muted-foreground">({category.cryptos.length})</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {category.cryptos.map(crypto => (
                          <div key={crypto.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={crypto.id}
                              checked={selectedCryptos.includes(crypto.id)}
                              onCheckedChange={() => handleCryptoToggle(crypto.id)}
                            />
                            <label
                              htmlFor={crypto.id}
                              className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              <img
                                src={crypto.logo}
                                alt={crypto.symbol}
                                className="w-5 h-5 mr-2"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                              {crypto.name} 
                              <span className="ml-2 text-xs text-muted-foreground">
                                {crypto.symbol}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CryptoSelector;
