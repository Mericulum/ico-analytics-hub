
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Cryptocurrency } from "@/types/compare";

interface TopCryptosListProps {
  topCryptos: Cryptocurrency[];
  selectedCryptos: string[];
  onToggleCrypto: (cryptoId: string) => void;
}

const TopCryptosList: React.FC<TopCryptosListProps> = ({
  topCryptos,
  selectedCryptos,
  onToggleCrypto
}) => {
  return (
    <AccordionItem value="top-coins" className="border-crypto-gray">
      <AccordionTrigger className="py-2 hover:no-underline">
        <span className="text-sm font-medium">Top Cryptocurrencies</span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          {topCryptos.slice(0, 5).map(crypto => (
            <div key={`top-${crypto.id}`} className="flex items-center space-x-2">
              <Checkbox
                id={`top-${crypto.id}`}
                checked={selectedCryptos.includes(crypto.id)}
                onCheckedChange={() => onToggleCrypto(crypto.id)}
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
  );
};

export default TopCryptosList;
