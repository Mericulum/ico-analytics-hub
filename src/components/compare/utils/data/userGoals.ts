
import { UserGoal } from "@/types/compare";

// Mock data for user goals
export const userGoals: UserGoal[] = [
  {
    id: 'sustainable-investing',
    name: 'Sustainable Investing',
    description: 'I want to invest in cryptocurrencies with a low environmental impact.',
    suggestedMetrics: ['carbonFootprint', 'renewableEnergyUse', 'energyConsumption'],
  },
  {
    id: 'high-growth',
    name: 'High Growth Potential',
    description: 'I am looking for cryptocurrencies with high growth potential and market dominance.',
    suggestedMetrics: ['priceChange30d', 'marketCap', 'volume24h'],
  },
  {
    id: 'technological-innovation',
    name: 'Technological Innovation',
    description: 'I am interested in cryptocurrencies with innovative technology and high scalability.',
    suggestedMetrics: ['transactionSpeed', 'scalability', 'developerActivity'],
  },
  {
    id: 'risk-management',
    name: 'Risk Management',
    description: 'I want to minimize risk and invest in cryptocurrencies with low volatility.',
    suggestedMetrics: ['volatility', 'regulatoryCompliance', 'securityAudits'],
  },
];

// Helper function to get suggested metrics for a user goal
export const getSuggestionsForUserGoal = (goalId: string | undefined): string[] => {
  if (!goalId) return [];
  
  const goal = userGoals.find(g => g.id === goalId);
  return goal ? goal.suggestedMetrics : [];
};
