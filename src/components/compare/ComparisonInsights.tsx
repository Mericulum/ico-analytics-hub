
import React, { useState, useEffect } from 'react';
import { ComparisonConfig } from "@/types/compare";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Shield, Zap, Activity, Code, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  getCryptoById,
  getMetricById,
  getMetricValue,
  formatMetricValue
} from './utils/cryptoData';

interface ComparisonInsightsProps {
  config: ComparisonConfig;
}

interface Insight {
  type: 'strength' | 'weakness' | 'warning' | 'opportunity';
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ComparisonResult {
  cryptoId: string;
  name: string;
  symbol: string;
  color: string;
  logo: string;
  insights: Insight[];
  score: {
    market: number;
    technical: number;
    adoption: number;
    risk: number;
    sustainability: number;
    overall: number;
  };
}

const ComparisonInsights: React.FC<ComparisonInsightsProps> = ({ config }) => {
  const { cryptos: cryptoIds, metrics: metricIds } = config;
  const [insightType, setInsightType] = useState<'all' | 'strengths' | 'weaknesses'>('all');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<ComparisonResult[]>([]);
  
  // Get full data objects
  const cryptos = cryptoIds.map(id => getCryptoById(id)).filter(Boolean);
  const metrics = metricIds.map(id => getMetricById(id)).filter(Boolean);
  
  // No cryptos or metrics selected
  if (cryptos.length === 0 || metrics.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {cryptos.length === 0 
          ? "Please select at least one cryptocurrency to compare"
          : "Please select at least one metric to compare"}
      </div>
    );
  }

  // Generate AI-like insights based on the crypto data
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    const timer = setTimeout(() => {
      const analysisResults = cryptos.map(crypto => {
        if (!crypto) return null;
        
        const insights: Insight[] = [];
        
        // Market insights
        if (crypto.marketData.price > 1000) {
          insights.push({
            type: 'strength',
            title: 'High Token Value',
            description: `${crypto.name}'s high token price indicates strong market confidence and stability.`,
            icon: <TrendingUp className="h-4 w-4 text-green-400" />
          });
        }
        
        if (crypto.marketData.marketCap > 100000000000) {
          insights.push({
            type: 'strength',
            title: 'Large Market Cap',
            description: `With a market cap of ${formatMetricValue('marketCap', crypto.marketData.marketCap)}, ${crypto.name} is among the largest cryptocurrencies.`,
            icon: <TrendingUp className="h-4 w-4 text-green-400" />
          });
        } else if (crypto.marketData.marketCap < 10000000000) {
          insights.push({
            type: 'opportunity',
            title: 'Growth Potential',
            description: `${crypto.name}'s relatively smaller market cap suggests potential for significant growth.`,
            icon: <TrendingUp className="h-4 w-4 text-blue-400" />
          });
        }
        
        // Technical insights
        if (crypto.technicalData.transactionSpeed > 1000) {
          insights.push({
            type: 'strength',
            title: 'High Transaction Speed',
            description: `${crypto.name}'s high TPS (${crypto.technicalData.transactionSpeed}) makes it ideal for applications requiring fast transactions.`,
            icon: <Zap className="h-4 w-4 text-green-400" />
          });
        } else if (crypto.technicalData.transactionSpeed < 30) {
          insights.push({
            type: 'weakness',
            title: 'Scalability Concerns',
            description: `${crypto.name}'s low transaction speed may limit its scalability for high-volume applications.`,
            icon: <AlertTriangle className="h-4 w-4 text-amber-400" />
          });
        }
        
        if (crypto.technicalData.energyConsumption > 500) {
          insights.push({
            type: 'weakness',
            title: 'High Energy Consumption',
            description: `${crypto.name}'s energy requirements may face regulatory and environmental challenges in the future.`,
            icon: <AlertTriangle className="h-4 w-4 text-amber-400" />
          });
        } else if (crypto.technicalData.energyConsumption < 50) {
          insights.push({
            type: 'strength',
            title: 'Energy Efficient',
            description: `${crypto.name} is among the most energy-efficient blockchains, positioning it well for future sustainability requirements.`,
            icon: <Zap className="h-4 w-4 text-green-400" />
          });
        }
        
        // Adoption insights
        if (crypto.adoptionData.developerActivity > 7) {
          insights.push({
            type: 'strength',
            title: 'Strong Developer Community',
            description: `${crypto.name}'s high developer activity suggests ongoing innovation and maintenance.`,
            icon: <Code className="h-4 w-4 text-green-400" />
          });
        } else if (crypto.adoptionData.developerActivity < 4) {
          insights.push({
            type: 'warning',
            title: 'Limited Development',
            description: `${crypto.name} shows signs of limited developer activity, which may impact future growth.`,
            icon: <AlertTriangle className="h-4 w-4 text-amber-400" />
          });
        }
        
        if (crypto.adoptionData.activeWallets > 1000000) {
          insights.push({
            type: 'strength',
            title: 'Wide User Adoption',
            description: `${crypto.name} has a large user base with over ${(crypto.adoptionData.activeWallets/1000000).toFixed(1)}M active wallets.`,
            icon: <Users className="h-4 w-4 text-green-400" />
          });
        }
        
        // Risk insights
        if (crypto.riskData.volatility > 7) {
          insights.push({
            type: 'warning',
            title: 'High Volatility',
            description: `${crypto.name} shows high price volatility, which may present both opportunities and risks.`,
            icon: <Activity className="h-4 w-4 text-amber-400" />
          });
        } else if (crypto.riskData.volatility < 4) {
          insights.push({
            type: 'strength',
            title: 'Price Stability',
            description: `${crypto.name} demonstrates relatively low volatility, making it potentially more suitable for everyday transactions.`,
            icon: <Shield className="h-4 w-4 text-green-400" />
          });
        }
        
        if (crypto.riskData.regulatoryCompliance < 5) {
          insights.push({
            type: 'warning',
            title: 'Regulatory Concerns',
            description: `${crypto.name} may face regulatory challenges in certain jurisdictions due to compliance issues.`,
            icon: <AlertTriangle className="h-4 w-4 text-amber-400" />
          });
        }
        
        // Sustainability insights
        if (crypto.sustainabilityData.carbonFootprint > 5000000) {
          insights.push({
            type: 'weakness',
            title: 'High Carbon Footprint',
            description: `${crypto.name}'s significant carbon footprint may become a limiting factor as sustainability concerns grow.`,
            icon: <AlertTriangle className="h-4 w-4 text-amber-400" />
          });
        } else if (crypto.sustainabilityData.renewableEnergyUse > 50) {
          insights.push({
            type: 'strength',
            title: 'Renewable Energy Focus',
            description: `${crypto.name} uses ${crypto.sustainabilityData.renewableEnergyUse}% renewable energy, positioning it well for an eco-conscious future.`,
            icon: <Zap className="h-4 w-4 text-green-400" />
          });
        }
        
        // Calculate scores for each category (0-100)
        const marketScore = Math.min(100, 
          (crypto.marketData.marketCap / 1000000000000) * 40 + 
          (crypto.marketData.volume24h / 10000000000) * 30 + 
          (crypto.marketData.priceChange30d > 0 ? 30 : 0)
        );
        
        const technicalScore = 
          (Math.min(10000, crypto.technicalData.transactionSpeed) / 100) * 30 + 
          (10 - Math.min(10, crypto.technicalData.energyConsumption / 100)) * 3 + 
          crypto.technicalData.scalability * 10 + 
          crypto.technicalData.programmability * 7;
        
        const adoptionScore = 
          Math.min(10, crypto.adoptionData.developerActivity) * 10 + 
          Math.min(10, (crypto.adoptionData.activeWallets / 1000000)) * 6 + 
          crypto.adoptionData.institutionalInterest * 8 + 
          Math.min(10, (crypto.adoptionData.partnerships / 10)) * 5;
        
        const riskScore = 
          (10 - Math.min(10, crypto.riskData.volatility)) * 8 + 
          crypto.riskData.regulatoryCompliance * 10 + 
          crypto.riskData.securityAudits * 5 + 
          crypto.riskData.decentralizationLevel * 7;
        
        const sustainabilityScore = 
          crypto.sustainabilityData.energyEfficiency * 10 + 
          (10 - Math.min(10, crypto.sustainabilityData.carbonFootprint / 1000000)) * 6 + 
          crypto.sustainabilityData.ecoFriendlyInitiatives * 8 + 
          crypto.sustainabilityData.renewableEnergyUse * 0.7;
        
        const overallScore = (
          marketScore * 0.25 + 
          technicalScore * 0.25 + 
          adoptionScore * 0.2 + 
          riskScore * 0.15 + 
          sustainabilityScore * 0.15
        );
        
        return {
          cryptoId: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          color: crypto.color,
          logo: crypto.logo,
          insights,
          score: {
            market: Math.round(marketScore),
            technical: Math.round(technicalScore),
            adoption: Math.round(adoptionScore),
            risk: Math.round(riskScore),
            sustainability: Math.round(sustainabilityScore),
            overall: Math.round(overallScore)
          }
        };
      }).filter(Boolean) as ComparisonResult[];
      
      setResults(analysisResults);
      setLoading(false);
    }, 1200); // Simulate AI processing time
    
    return () => clearTimeout(timer);
  }, [cryptoIds.join(',')]);
  
  // Filter insights based on selected type
  const getFilteredInsights = (insights: Insight[]) => {
    if (insightType === 'all') return insights;
    if (insightType === 'strengths') return insights.filter(i => i.type === 'strength' || i.type === 'opportunity');
    return insights.filter(i => i.type === 'weakness' || i.type === 'warning');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full border-t-2 border-b-2 border-crypto-blue animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-crypto-blue w-6 h-6" />
        </div>
        <p className="text-crypto-blue animate-pulse">Analyzing cryptocurrencies...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-crypto-blue" />
            <span>AI-Powered Insights</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            In-depth analysis of strengths, weaknesses, and opportunities for selected cryptocurrencies
          </p>
        </div>
        
        <Tabs defaultValue="all" value={insightType} onValueChange={setInsightType as any}>
          <TabsList className="bg-crypto-dark/30">
            <TabsTrigger value="all">All Insights</TabsTrigger>
            <TabsTrigger value="strengths">Strengths</TabsTrigger>
            <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map(result => (
          <Card key={result.cryptoId} className="border-crypto-gray overflow-hidden">
            <div className="p-4 border-b border-crypto-gray bg-black/30 flex items-center gap-3">
              <img 
                src={result.logo} 
                alt={result.name} 
                className="w-8 h-8" 
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div>
                <h4 className="font-medium" style={{ color: result.color }}>{result.name}</h4>
                <p className="text-xs text-muted-foreground">{result.symbol}</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-sm">Overall Score</div>
                <div 
                  className="text-lg font-bold" 
                  style={{ color: result.color }}
                >
                  {result.score.overall}/100
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-b from-black/20 to-black/5">
              <div className="flex justify-between mb-4">
                <Badge variant="outline" className="bg-black/20">
                  Market: {result.score.market}
                </Badge>
                <Badge variant="outline" className="bg-black/20">
                  Tech: {result.score.technical}
                </Badge>
                <Badge variant="outline" className="bg-black/20">
                  Adoption: {result.score.adoption}
                </Badge>
              </div>
              
              <ScrollArea className="h-48 pr-4">
                <div className="space-y-3">
                  {getFilteredInsights(result.insights).length > 0 ? (
                    getFilteredInsights(result.insights).map((insight, i) => (
                      <Alert key={i} variant="outline" className="py-3 border-crypto-gray bg-black/20">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5">{insight.icon}</div>
                          <div>
                            <AlertTitle className="text-sm font-medium mb-1">
                              {insight.title}
                            </AlertTitle>
                            <AlertDescription className="text-xs">
                              {insight.description}
                            </AlertDescription>
                          </div>
                        </div>
                      </Alert>
                    ))
                  ) : (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                      No {insightType !== 'all' ? insightType : 'insights'} found for this cryptocurrency
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComparisonInsights;
