
import { ComparisonMetric } from "@/types/compare";

// Mock data for comparison metrics
export const comparisonMetrics: ComparisonMetric[] = [
  {
    id: 'price',
    name: 'Price',
    category: 'market',
    description: 'The current price of the cryptocurrency',
    formatter: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    id: 'marketCap',
    name: 'Market Cap',
    category: 'market',
    description: 'The total market capitalization of the cryptocurrency',
    formatter: (value: number) => `$${(value / 1000000000).toFixed(2)}B`,
  },
  {
    id: 'volume24h',
    name: '24h Volume',
    category: 'market',
    description: 'The total trading volume in the last 24 hours',
    formatter: (value: number) => `$${(value / 1000000).toFixed(2)}M`,
  },
  {
    id: 'transactionSpeed',
    name: 'Transaction Speed',
    category: 'technical',
    description: 'The speed at which transactions are processed (TPS)',
    formatter: (value: number) => `${value} TPS`,
    colorScale: 'higher-better',
  },
  {
    id: 'energyConsumption',
    name: 'Energy Consumption',
    category: 'technical',
    description: 'The energy consumed per transaction (kWh)',
    formatter: (value: number) => `${value} kWh`,
    colorScale: 'lower-better',
  },
  {
    id: 'developerActivity',
    name: 'Developer Activity',
    category: 'adoption',
    description: 'Level of activity and contributions from developers (1-10)',
    formatter: (value: number) => `${value}/10`,
    colorScale: 'higher-better',
  },
  {
    id: 'volatility',
    name: 'Volatility',
    category: 'risk',
    description: 'The degree of price fluctuation over a period of time (1-10)',
    formatter: (value: number) => `${value}/10`,
    colorScale: 'lower-better',
  },
  {
    id: 'carbonFootprint',
    name: 'Carbon Footprint',
    category: 'sustainability',
    description: 'The amount of carbon emissions produced by the cryptocurrency network (tons CO2/year)',
    formatter: (value: number) => `${(value / 1000).toFixed(2)}K tons CO2/year`,
    colorScale: 'lower-better',
  },
  {
    id: 'renewableEnergyUse',
    name: 'Renewable Energy Use',
    category: 'sustainability',
    description: 'The percentage of renewable energy used by the cryptocurrency network',
    formatter: (value: number) => `${value}%`,
    colorScale: 'higher-better',
  },
];

// Export for MetricSelector.tsx
export const metrics = comparisonMetrics;
