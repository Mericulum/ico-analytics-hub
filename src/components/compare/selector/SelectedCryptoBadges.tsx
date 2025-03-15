
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cryptocurrency } from "@/types/compare";

interface SelectedCryptoBadgesProps {
  selectedCryptos: Cryptocurrency[];
  onToggleCrypto: (cryptoId: string) => void;
  onClearAll: () => void;
}

const SelectedCryptoBadges: React.FC<SelectedCryptoBadgesProps> = ({
  selectedCryptos,
  onToggleCrypto,
  onClearAll
}) => {
  if (selectedCryptos.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {selectedCryptos.map((crypto) => (
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
            onClick={() => onToggleCrypto(crypto.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-xs h-7 px-2 hover:bg-red-950/40 hover:text-red-400"
      >
        Clear All
      </Button>
    </div>
  );
};

export default SelectedCryptoBadges;
