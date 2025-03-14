
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComparisonHeader from "./ComparisonHeader";
import CryptoSelector from "./CryptoSelector";
import MetricSelector from "./MetricSelector";
import ComparisonTable from "./ComparisonTable";
import ComparisonCharts from "./ComparisonCharts";
import ComparisonInsights from "./ComparisonInsights";
import ComparisonRadarChart from "./ComparisonRadarChart";
import { defaultComparisonConfig } from "./utils/cryptoData";
import { ComparisonConfig } from "@/types/compare";
import { toast } from "sonner";

const CryptoComparisonTool: React.FC = () => {
  const [comparisonConfig, setComparisonConfig] = useState<ComparisonConfig>(defaultComparisonConfig);
  const [activeTab, setActiveTab] = useState<string>("table");
  const [userGoal, setUserGoal] = useState<string | undefined>(undefined);

  // Update comparison when cryptos or metrics change
  const updateComparison = (config: Partial<ComparisonConfig>) => {
    setComparisonConfig(prevConfig => ({
      ...prevConfig,
      ...config
    }));
  };

  // Handle saving the comparison
  const handleSaveComparison = (name: string) => {
    const savedConfig = {
      ...comparisonConfig,
      name,
    };
    
    // In a real app, this would save to a backend or localStorage
    console.log("Saving comparison:", savedConfig);
    
    toast.success("Comparison saved", {
      description: `Your "${name}" comparison has been saved.`
    });
  };

  // Set the user goal and update metrics based on it
  const handleUserGoalChange = (goalId: string | undefined) => {
    setUserGoal(goalId);
  };

  // Parallax effect for the 3D background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxElements = document.querySelectorAll('.parallax-element');
      const x = (window.innerWidth - e.clientX) / 100;
      const y = (window.innerHeight - e.clientY) / 100;
      
      parallaxElements.forEach(el => {
        const element = el as HTMLElement;
        const speedX = parseFloat(element.dataset.speedX || "1");
        const speedY = parseFloat(element.dataset.speedY || "1");
        
        element.style.transform = `translate(${x * speedX}px, ${y * speedY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 relative min-h-screen">
      {/* Background effects */}
      <div className="absolute top-10 left-[10%] w-96 h-96 bg-crypto-blue/10 rounded-full blur-[150px] -z-10 parallax-element" data-speed-x="0.5" data-speed-y="0.8"></div>
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-crypto-green/10 rounded-full blur-[150px] -z-10 parallax-element" data-speed-x="-0.7" data-speed-y="-0.5"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[120px] -z-10 parallax-element" data-speed-x="-0.3" data-speed-y="0.6"></div>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-green mb-2">
          Cryptocurrency Comparison Tool
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare multiple cryptocurrencies across various metrics to make informed decisions for your crypto strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with selection options */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md">
            <ComparisonHeader
              onUserGoalChange={handleUserGoalChange}
              onSaveComparison={handleSaveComparison}
              selectedCryptoCount={comparisonConfig.cryptos.length}
            />
          </Card>

          <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md">
            <h3 className="text-lg font-medium mb-4">Select Cryptocurrencies</h3>
            <CryptoSelector
              selectedCryptos={comparisonConfig.cryptos}
              onChange={(cryptos) => updateComparison({ cryptos })}
            />
          </Card>

          <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md">
            <h3 className="text-lg font-medium mb-4">Choose Metrics</h3>
            <MetricSelector
              selectedMetrics={comparisonConfig.metrics}
              onChange={(metrics) => updateComparison({ metrics })}
              userGoal={userGoal}
            />
          </Card>
        </div>

        {/* Main comparison area */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md">
            <Tabs defaultValue="table" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="radar">Radar Chart</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="table" className="mt-0">
                <ComparisonTable config={comparisonConfig} />
              </TabsContent>
              
              <TabsContent value="charts" className="mt-0">
                <ComparisonCharts config={comparisonConfig} />
              </TabsContent>
              
              <TabsContent value="radar" className="mt-0">
                <ComparisonRadarChart config={comparisonConfig} />
              </TabsContent>
              
              <TabsContent value="insights" className="mt-0">
                <ComparisonInsights config={comparisonConfig} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CryptoComparisonTool;
