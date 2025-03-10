
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserSection } from "./MainMenu";

interface SectionSelectorProps {
  activeSection: UserSection;
  onChange: (section: UserSection) => void;
}

const SectionSelector = ({ activeSection, onChange }: SectionSelectorProps) => {
  return (
    <div className="flex space-x-2 p-4 bg-gradient-to-r from-[#143442] to-[#0A1A21] border-b border-white/10">
      <Button
        variant={activeSection === "trader" ? "default" : "outline"}
        onClick={() => onChange("trader")}
        className={`flex-1 ${
          activeSection === "trader" 
            ? "bg-crypto-blue hover:bg-crypto-blue/90" 
            : "border-crypto-blue/50 text-crypto-blue hover:bg-crypto-blue/10"
        }`}
      >
        Trader
      </Button>
      
      <Button
        variant={activeSection === "investor" ? "default" : "outline"}
        onClick={() => onChange("investor")}
        className={`flex-1 ${
          activeSection === "investor" 
            ? "bg-crypto-green hover:bg-crypto-green/90" 
            : "border-crypto-green/50 text-crypto-green hover:bg-crypto-green/10"
        }`}
      >
        Investor
      </Button>
      
      <Button
        variant={activeSection === "learner" ? "default" : "outline"}
        onClick={() => onChange("learner")}
        className={`flex-1 ${
          activeSection === "learner" 
            ? "bg-amber-500 hover:bg-amber-500/90" 
            : "border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
        }`}
      >
        Learner
      </Button>
    </div>
  );
};

export default SectionSelector;
