
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, BarChart2, TrendingUp, Activity, Sparkles } from "lucide-react";
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
  
  // Add floating particles effect
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('crypto-particle');
      
      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      
      // Random opacity
      particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
      
      // Random color
      const colors = ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      
      // Add to document
      document.querySelector('.particles-container')?.appendChild(particle);
      
      // Animation duration between 15s and 45s
      const duration = Math.random() * 30 + 15;
      particle.style.animation = `float ${duration}s linear infinite`;
      
      // Remove after some time
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    };
    
    // Create initial particles
    for (let i = 0; i < 30; i++) {
      createParticle();
    }
    
    // Create new particles periodically
    const interval = setInterval(() => {
      createParticle();
    }, 2000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 relative min-h-screen">
      {/* Add keyframes for animations using standard style tag */}
      <style>
        {`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20vh) translateX(10vw) rotate(120deg);
          }
          66% {
            transform: translateY(-40vh) translateX(-10vw) rotate(240deg);
          }
          100% {
            transform: translateY(-100vh) translateX(0) rotate(360deg);
          }
        }
        
        .crypto-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: -5;
        }
      `}
      </style>
      
      {/* Particles container */}
      <div className="particles-container fixed inset-0 overflow-hidden pointer-events-none"></div>
      
      {/* Background effects */}
      <div className="absolute top-10 left-[10%] w-96 h-96 bg-crypto-blue/10 rounded-full blur-[150px] -z-10 parallax-element" data-speed-x="0.5" data-speed-y="0.8"></div>
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-crypto-green/10 rounded-full blur-[150px] -z-10 parallax-element" data-speed-x="-0.7" data-speed-y="-0.5"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[120px] -z-10 parallax-element" data-speed-x="-0.3" data-speed-y="0.6"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] -z-10 parallax-element" data-speed-x="0.4" data-speed-y="-0.2"></div>

      <div className="text-center mb-8 animate-fade-in">
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
          <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <ComparisonHeader
              onUserGoalChange={handleUserGoalChange}
              onSaveComparison={handleSaveComparison}
              selectedCryptoCount={comparisonConfig.cryptos.length}
            />
          </Card>

          <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-medium mb-4">Select Cryptocurrencies</h3>
            <CryptoSelector
              selectedCryptos={comparisonConfig.cryptos}
              onChange={(cryptos) => updateComparison({ cryptos })}
            />
          </Card>

          <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
          <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Tabs defaultValue="table" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6 bg-black/20">
                <TabsTrigger value="table" className="data-[state=active]:bg-crypto-blue/20 gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Table View</span>
                </TabsTrigger>
                <TabsTrigger value="charts" className="data-[state=active]:bg-crypto-blue/20 gap-2">
                  <BarChart2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Charts</span>
                </TabsTrigger>
                <TabsTrigger value="radar" className="data-[state=active]:bg-crypto-blue/20 gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">Radar</span>
                </TabsTrigger>
                <TabsTrigger value="insights" className="data-[state=active]:bg-crypto-blue/20 gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">AI Insights</span>
                </TabsTrigger>
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
