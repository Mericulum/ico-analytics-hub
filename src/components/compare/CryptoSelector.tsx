
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { getCategoriesWithCryptos, getCryptoById } from './utils/cryptoData';
import SelectedCryptoBadges from './selector/SelectedCryptoBadges';
import CryptoSearchBar from './selector/CryptoSearchBar';
import TopCryptosList from './selector/TopCryptosList';
import CryptoCategoryList from './selector/CryptoCategoryList';

interface CryptoSelectorProps {
  selectedCryptos: string[];
  onChange: (cryptos: string[]) => void;
}

const CryptoSelector: React.FC<CryptoSelectorProps> = ({ selectedCryptos, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isSelectionOpen, setIsSelectionOpen] = useState(true);
  
  const categoriesWithCryptos = getCategoriesWithCryptos();
  
  const filteredCategories = searchQuery.trim() === '' 
    ? categoriesWithCryptos 
    : categoriesWithCryptos.map(category => ({
        ...category,
        cryptos: category.cryptos.filter(crypto => 
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.cryptos.length > 0);
  
  const handleCryptoToggle = (cryptoId: string) => {
    if (selectedCryptos.includes(cryptoId)) {
      onChange(selectedCryptos.filter(id => id !== cryptoId));
    } else {
      onChange([...selectedCryptos, cryptoId]);
    }
  };
  
  const clearSelections = () => {
    onChange([]);
  };
  
  const selectedCryptoDetails = selectedCryptos.map(id => getCryptoById(id)).filter(Boolean);

  return (
    <div className="space-y-4">
      <SelectedCryptoBadges 
        selectedCryptos={selectedCryptoDetails} 
        onToggleCrypto={handleCryptoToggle}
        onClearAll={clearSelections}
      />
      
      <Collapsible
        open={isSelectionOpen}
        onOpenChange={setIsSelectionOpen}
        className="border border-crypto-gray rounded-md overflow-hidden"
      >
        <CryptoSearchBar 
          searchQuery={searchQuery}
          isOpen={isSelectionOpen}
          onSearchChange={setSearchQuery}
        />
        
        <CollapsibleContent>
          <ScrollArea className="h-60">
            <div className="p-2">
              <Accordion type="multiple" defaultValue={['top-coins']}>
                <TopCryptosList 
                  topCryptos={categoriesWithCryptos[0].cryptos}
                  selectedCryptos={selectedCryptos}
                  onToggleCrypto={handleCryptoToggle}
                />
                
                {filteredCategories.map(category => (
                  <CryptoCategoryList
                    key={category.category}
                    category={category}
                    selectedCryptos={selectedCryptos}
                    onToggleCrypto={handleCryptoToggle}
                  />
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
