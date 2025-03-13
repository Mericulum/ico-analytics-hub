
import React, { useState, useEffect } from "react";
import { ArrowRight, Download, Share2, Info, TrendingUp, Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CalculatorResults from "./CalculatorResults";
import PriceGraph from "./PriceGraph";
import RiskAssessment from "./RiskAssessment";
import { toast } from "sonner";

// Form validation schema
const formSchema = z.object({
  initialInvestment: z.coerce.number().min(1, "Investment must be at least 1"),
  cryptocurrency: z.string().min(1, "Please select a cryptocurrency"),
  duration: z.string().min(1, "Please select a duration"),
  recurringInvestment: z.coerce.number().min(0, "Must be a positive number"),
  growthRate: z.string().default("moderate"),
  inflationAdjusted: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const cryptocurrencies = [
  { name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
  { name: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { name: "Solana", symbol: "SOL", color: "#00FFA3" },
  { name: "Cardano", symbol: "ADA", color: "#0033AD" },
  { name: "Polkadot", symbol: "DOT", color: "#E6007A" },
  { name: "Binance Coin", symbol: "BNB", color: "#F3BA2F" },
  { name: "Avalanche", symbol: "AVAX", color: "#E84142" },
  { name: "Ripple", symbol: "XRP", color: "#23292F" },
];

// Growth rate assumptions
const growthRates = {
  conservative: {
    BTC: 15,
    ETH: 20,
    SOL: 25,
    ADA: 12,
    DOT: 18,
    BNB: 14,
    AVAX: 22,
    XRP: 10,
  },
  moderate: {
    BTC: 40,
    ETH: 50,
    SOL: 70,
    ADA: 35,
    DOT: 45,
    BNB: 38,
    AVAX: 55,
    XRP: 30,
  },
  aggressive: {
    BTC: 80,
    ETH: 100,
    SOL: 150,
    ADA: 70,
    DOT: 90,
    BNB: 75,
    AVAX: 110,
    XRP: 65,
  },
};

const CryptoCalculator = () => {
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptocurrencies[0]);

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 1000,
      cryptocurrency: "BTC",
      duration: "1",
      recurringInvestment: 0,
      growthRate: "moderate",
      inflationAdjusted: false,
    },
  });

  // Watch for cryptocurrency changes
  const cryptoValue = form.watch("cryptocurrency");
  
  useEffect(() => {
    const selected = cryptocurrencies.find(crypto => crypto.symbol === cryptoValue);
    if (selected) setSelectedCrypto(selected);
  }, [cryptoValue]);

  const calculateResults = (values: FormValues) => {
    setIsCalculating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const { initialInvestment, cryptocurrency, duration, recurringInvestment, growthRate, inflationAdjusted } = values;
        
        // Get annual growth rate based on selected cryptocurrency and growth assumption
        const annualGrowthRate = growthRates[growthRate as keyof typeof growthRates][cryptocurrency as keyof typeof growthRates.conservative] / 100;
        
        // Calculate total investment
        const years = parseInt(duration);
        const monthlyInvestment = recurringInvestment || 0;
        const totalMonths = years * 12;
        const totalRecurringInvestment = monthlyInvestment * totalMonths;
        const totalInvestment = initialInvestment + totalRecurringInvestment;
        
        // Calculate future value of initial investment
        const initialFutureValue = initialInvestment * Math.pow(1 + annualGrowthRate, years);
        
        // Calculate future value of recurring investments (simplified model)
        let recurringFutureValue = 0;
        if (monthlyInvestment > 0) {
          for (let i = 0; i < totalMonths; i++) {
            const monthsRemaining = totalMonths - i;
            const yearsRemaining = monthsRemaining / 12;
            recurringFutureValue += monthlyInvestment * Math.pow(1 + (annualGrowthRate / 12), monthsRemaining);
          }
        }
        
        // Calculate total future value
        const totalFutureValue = initialFutureValue + recurringFutureValue;
        
        // Calculate profit
        const profit = totalFutureValue - totalInvestment;
        const roi = (profit / totalInvestment) * 100;
        
        // Apply inflation adjustment if selected (assume 3% annual inflation)
        const inflationRate = 0.03;
        let adjustedFutureValue = totalFutureValue;
        let adjustedProfit = profit;
        let adjustedRoi = roi;
        
        if (inflationAdjusted) {
          const inflationFactor = Math.pow(1 + inflationRate, years);
          adjustedFutureValue = totalFutureValue / inflationFactor;
          adjustedProfit = adjustedFutureValue - totalInvestment;
          adjustedRoi = (adjustedProfit / totalInvestment) * 100;
        }
        
        // Determine risk level based on crypto and growth rate
        let riskLevel = "Medium";
        const volatility = {
          BTC: 0.7,
          ETH: 0.8,
          SOL: 0.9,
          ADA: 0.75,
          DOT: 0.85,
          BNB: 0.65,
          AVAX: 0.85,
          XRP: 0.6,
        };
        
        const volatilityScore = volatility[cryptocurrency as keyof typeof volatility];
        const growthRateMultiplier = growthRate === "conservative" ? 0.7 : growthRate === "moderate" ? 1 : 1.3;
        const riskScore = volatilityScore * growthRateMultiplier;
        
        if (riskScore < 0.6) riskLevel = "Low";
        else if (riskScore > 0.9) riskLevel = "High";
        
        // Generate risk factors
        const riskFactors = [
          `${selectedCrypto.name} has ${riskScore > 0.8 ? "high" : riskScore > 0.6 ? "medium" : "lower"} historical volatility.`,
          `${growthRate === "aggressive" ? "Aggressive" : growthRate === "moderate" ? "Moderate" : "Conservative"} growth assumptions increase uncertainty.`,
          years > 1 ? "Longer time horizons increase unpredictability." : "Short-term investments are subject to market fluctuations.",
        ];
        
        // Set results
        setResults({
          initialInvestment,
          cryptocurrency,
          duration: years,
          recurringInvestment: monthlyInvestment,
          totalInvestment,
          futureValue: inflationAdjusted ? adjustedFutureValue : totalFutureValue,
          profit: inflationAdjusted ? adjustedProfit : profit,
          roi: inflationAdjusted ? adjustedRoi : roi,
          inflationAdjusted,
          riskLevel,
          riskScore: riskScore * 100,
          riskFactors,
          color: selectedCrypto.color,
        });
        
        toast.success("Calculation complete!", { 
          description: `Estimated profit: $${(inflationAdjusted ? adjustedProfit : profit).toLocaleString(undefined, {maximumFractionDigits: 0})}` 
        });
      } catch (error) {
        console.error("Calculation error:", error);
        toast.error("Error calculating results", { 
          description: "Please check your inputs and try again."
        });
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-green mb-2">
          Crypto Profit Calculator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Estimate potential profits from your cryptocurrency investments over time with our advanced calculator and risk assessment tool.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 relative">
        {/* Glassmorphic background effects */}
        <div className="absolute -z-10 left-1/4 top-1/4 w-1/2 h-1/2 bg-crypto-blue rounded-full blur-[180px] opacity-20"></div>
        <div className="absolute -z-10 right-1/4 bottom-1/4 w-1/3 h-1/3 bg-crypto-green rounded-full blur-[150px] opacity-15"></div>
        
        {/* Calculator inputs */}
        <Card className="p-6 col-span-1 lg:col-span-2 border-crypto-gray bg-black/40 backdrop-blur-md">
          <div className="flex items-center mb-6">
            <Calculator className="w-5 h-5 mr-2 text-crypto-blue" />
            <h2 className="text-xl font-medium">Investment Details</h2>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(calculateResults)} className="space-y-6">
              <FormField
                control={form.control}
                name="initialInvestment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Investment (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1000"
                        icon={<span className="text-muted-foreground">$</span>}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cryptocurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cryptocurrency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cryptocurrency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cryptocurrencies.map(crypto => (
                          <SelectItem key={crypto.symbol} value={crypto.symbol}>
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: crypto.color }}
                              ></div>
                              {crypto.name} ({crypto.symbol})
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Duration</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Year</SelectItem>
                        <SelectItem value="2">2 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="recurringInvestment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Contribution (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        icon={<span className="text-muted-foreground">$</span>}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="growthRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Growth Assumption</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select growth assumption" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="inflationAdjusted"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Adjust for inflation
                    </FormLabel>
                  </FormItem>
                )}
              />
              
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-crypto-blue to-crypto-green rounded-md font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                    <span>Calculating...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    <span>Calculate Profit</span>
                  </>
                )}
              </button>
            </form>
          </Form>
        </Card>
        
        {/* Results section */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          {results ? (
            <>
              {/* Results summary */}
              <CalculatorResults results={results} />
              
              {/* Price graph */}
              <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md">
                <PriceGraph 
                  cryptocurrency={results.cryptocurrency}
                  duration={results.duration}
                  initialInvestment={results.initialInvestment}
                  futureValue={results.futureValue}
                  color={results.color}
                />
              </Card>
              
              {/* Risk assessment */}
              <Card className="p-6 border-crypto-gray bg-black/40 backdrop-blur-md">
                <RiskAssessment 
                  riskLevel={results.riskLevel}
                  riskScore={results.riskScore}
                  riskFactors={results.riskFactors}
                />
              </Card>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4 justify-end">
                <button 
                  className="py-2 px-4 bg-crypto-gray/50 rounded-md font-medium text-white flex items-center gap-2 hover:bg-crypto-gray transition-colors"
                  onClick={() => {
                    toast.info("Download feature", { 
                      description: "Download functionality would be implemented here" 
                    });
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>Export as PDF</span>
                </button>
                
                <button 
                  className="py-2 px-4 bg-crypto-gray/50 rounded-md font-medium text-white flex items-center gap-2 hover:bg-crypto-gray transition-colors"
                  onClick={() => {
                    toast.info("Share feature", { 
                      description: "Share functionality would be implemented here" 
                    });
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Results</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute w-full h-full bg-crypto-blue/20 rounded-full animate-ping"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Calculator className="w-12 h-12 text-crypto-blue" />
                </div>
              </div>
              <h3 className="text-2xl font-medium text-white mb-2">Enter Your Investment Details</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Fill in the investment parameters on the left to calculate potential returns and view a detailed analysis.
              </p>
              <div className="mt-6 flex">
                <ArrowRight className="text-crypto-green animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoCalculator;
