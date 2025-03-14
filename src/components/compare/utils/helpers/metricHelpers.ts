
import { Cryptocurrency, ComparisonMetric } from "@/types/compare";
import { comparisonMetrics } from "../data/metrics";
import { cryptocurrencies } from "../data/cryptocurrencies";

// Helper function to extend cryptocurrency data with required properties
const extendCryptoData = (crypto: any): Cryptocurrency => {
  return {
    ...crypto,
    color: crypto.color || '#000000',
    marketData: {
      price: 0,
      marketCap: 0,
      volume24h: 0,
      circulatingSupply: 0,
      totalSupply: 0,
      allTimeHigh: 0,
      allTimeHighDate: '',
      priceChange24h: 0,
      priceChange7d: 0,
      priceChange30d: 0
    },
    technicalData: {
      transactionSpeed: 0,
      blockTime: 0,
      energyConsumption: 0,
      scalability: 0,
      lastUpdate: '',
      consensus: '',
      programmability: 0
    },
    adoptionData: {
      activeWallets: 0,
      developerActivity: 0,
      institutionalInterest: 0,
      partnerships: 0,
      integrations: 0,
      socialMediaFollowers: 0
    },
    riskData: {
      volatility: 0,
      regulatoryCompliance: 0,
      securityAudits: 0,
      decentralizationLevel: 0,
      pastIncidents: 0,
      policyRisk: 0,
      legalChallenges: 0
    },
    sustainabilityData: {
      energyEfficiency: 0,
      carbonFootprint: 0,
      ecoFriendlyInitiatives: 0,
      renewableEnergyUse: 0
    }
  };
};

// Helper function to get cryptocurrency data by ID
export const getCryptoById = (id: string): Cryptocurrency | undefined => {
  const crypto = cryptocurrencies.find(crypto => crypto.id === id);
  return crypto ? extendCryptoData(crypto) : undefined;
};

// Helper function to get comparison metric data by ID
export const getMetricById = (id: string): ComparisonMetric | undefined => {
  return comparisonMetrics.find(metric => metric.id === id);
};

// Helper function to format metric values
export const formatMetricValue = (metricId: string, value: any): string => {
  const metric = getMetricById(metricId);
  if (metric && metric.formatter) {
    return metric.formatter(value);
  }
  return String(value);
};

// Helper function to get metric value for a cryptocurrency
export const getMetricValue = (crypto: Cryptocurrency, metricId: string): any => {
  switch (metricId) {
    case 'price':
      return crypto.marketData.price;
    case 'marketCap':
      return crypto.marketData.marketCap;
    case 'volume24h':
      return crypto.marketData.volume24h;
    case 'transactionSpeed':
      return crypto.technicalData.transactionSpeed;
    case 'energyConsumption':
      return crypto.technicalData.energyConsumption;
    case 'developerActivity':
      return crypto.adoptionData.developerActivity;
    case 'volatility':
      return crypto.riskData.volatility;
    case 'carbonFootprint':
      return crypto.sustainabilityData.carbonFootprint;
    case 'renewableEnergyUse':
      return crypto.sustainabilityData.renewableEnergyUse;
    case 'priceChange30d':
      return crypto.marketData.priceChange30d;
    default:
      return 'N/A';
  }
};
