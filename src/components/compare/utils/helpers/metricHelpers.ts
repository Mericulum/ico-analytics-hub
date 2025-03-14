
import { Cryptocurrency, ComparisonMetric } from "@/types/compare";
import { comparisonMetrics } from "../data/metrics";
import { cryptocurrencies } from "../data/cryptocurrencies";

// Helper function to get cryptocurrency data by ID
export const getCryptoById = (id: string): Cryptocurrency | undefined => {
  return cryptocurrencies.find(crypto => crypto.id === id);
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
