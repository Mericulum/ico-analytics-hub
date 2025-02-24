
import { Crown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AnalyticsCallToAction = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-crypto-dark border-t border-crypto-gray p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <Button className="bg-crypto-blue hover:bg-crypto-blue/90 text-white">
          <Crown className="mr-2 h-4 w-4" /> Subscribe for Advanced Analytics
        </Button>
        <Button variant="outline" className="border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10">
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>
    </div>
  );
};

