
import { growthRates, volatilityFactors } from "./constants";
import { z } from "zod";

// Form validation schema
export const formSchema = z.object({
  initialInvestment: z.coerce.number().min(1, "Investment must be at least 1"),
  cryptocurrency: z.string().min(1, "Please select a cryptocurrency"),
  duration: z.string().min(1, "Please select a duration"),
  recurringInvestment: z.coerce.number().min(0, "Must be a positive number"),
  growthRate: z.string().default("moderate"),
  inflationAdjusted: z.boolean().default(false),
});

export type FormValues = z.infer<typeof formSchema>;

export const calculateInvestmentResults = (values: FormValues, selectedCrypto: any) => {
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
  const volatilityScore = volatilityFactors[cryptocurrency as keyof typeof volatilityFactors];
  const growthRateMultiplier = growthRate === "conservative" ? 0.7 : growthRate === "moderate" ? 1 : 1.3;
  const riskScore = volatilityScore * growthRateMultiplier;
  
  let riskLevel = "Medium";
  if (riskScore < 0.6) riskLevel = "Low";
  else if (riskScore > 0.9) riskLevel = "High";
  
  // Generate risk factors
  const riskFactors = [
    `${selectedCrypto.name} has ${riskScore > 0.8 ? "high" : riskScore > 0.6 ? "medium" : "lower"} historical volatility.`,
    `${growthRate === "aggressive" ? "Aggressive" : growthRate === "moderate" ? "Moderate" : "Conservative"} growth assumptions increase uncertainty.`,
    years > 1 ? "Longer time horizons increase unpredictability." : "Short-term investments are subject to market fluctuations.",
  ];
  
  return {
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
  };
};
