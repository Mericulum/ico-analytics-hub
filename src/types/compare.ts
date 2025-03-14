
export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  category: CryptoCategory;
  logo: string;
  color: string;
  marketData: MarketData;
  technicalData: TechnicalData;
  adoptionData: AdoptionData;
  riskData: RiskData;
  sustainabilityData: SustainabilityData;
  description: string;
}

export type CryptoCategory = 
  | 'Layer 1' 
  | 'Smart Contract' 
  | 'DeFi' 
  | 'Memecoin' 
  | 'NFT' 
  | 'Exchange Token' 
  | 'Store of Value' 
  | 'Stablecoin'
  | 'Privacy Coin';

export interface MarketData {
  price: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  allTimeHigh: number;
  allTimeHighDate: string;
  priceChange24h: number;
  priceChange7d: number;
  priceChange30d: number;
}

export interface TechnicalData {
  transactionSpeed: number; // Transactions per second
  blockTime: number; // Seconds
  energyConsumption: number; // kWh per transaction
  scalability: number; // 1-10 rating
  lastUpdate: string;
  consensus: string;
  programmability: number; // 1-10 rating
}

export interface AdoptionData {
  activeWallets: number;
  developerActivity: number; // 1-10 rating
  institutionalInterest: number; // 1-10 rating
  partnerships: number;
  integrations: number;
  socialMediaFollowers: number;
}

export interface RiskData {
  volatility: number; // 1-10 rating
  regulatoryCompliance: number; // 1-10 rating
  securityAudits: number;
  decentralizationLevel: number; // 1-10 rating
  pastIncidents: number;
  policyRisk: number; // 1-10 rating
  legalChallenges: number;
}

export interface SustainabilityData {
  energyEfficiency: number; // 1-10 rating
  carbonFootprint: number; // CO2 emissions in tons per year
  ecoFriendlyInitiatives: number; // 1-10 rating
  renewableEnergyUse: number; // Percentage
}

export interface ComparisonMetric {
  id: string;
  name: string;
  category: 'market' | 'technical' | 'adoption' | 'risk' | 'sustainability';
  description: string;
  formatter: (value: any) => string;
  colorScale?: 'higher-better' | 'lower-better' | 'neutral';
}

export interface UserGoal {
  id: string;
  name: string;
  description: string;
  suggestedMetrics: string[];
}

export interface ComparisonConfig {
  cryptos: string[];
  metrics: string[];
  userGoal?: string;
  name?: string;
}
