
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CryptoGroup } from "@/types/compare";

interface CryptoCategoryListProps {
  category: CryptoGroup;
  selectedCryptos: string[];
  onToggleCrypto: (cryptoId: string) => void;
}

const CryptoCategoryList: React.FC<CryptoCategoryListProps> = ({
  category,
  selectedCryptos,
  onToggleCrypto
}) => {
  return (
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
                onCheckedChange={() => onToggleCrypto(crypto.id)}
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
  );
};

export default CryptoCategoryList;
