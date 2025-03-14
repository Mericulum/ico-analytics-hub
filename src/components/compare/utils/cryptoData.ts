
// This file now re-exports all the functionality from the modular files
// to maintain backward compatibility with the existing codebase

// Import and re-export from data files
import { cryptocurrencies } from "./data/cryptocurrencies";
import { comparisonMetrics, metrics } from "./data/metrics";
import { userGoals, getSuggestionsForUserGoal } from "./data/userGoals";
import { defaultComparisonConfig } from "./data/defaultConfig";
import { getCategoriesWithCryptos } from "./data/categories";

// Import and re-export from helper files
import {
  getCryptoById,
  getMetricById,
  formatMetricValue,
  getMetricValue
} from "./helpers/metricHelpers";

// Re-export everything
export {
  // Data
  cryptocurrencies,
  comparisonMetrics,
  metrics,
  userGoals,
  defaultComparisonConfig,
  
  // Helper functions
  getCryptoById,
  getMetricById,
  formatMetricValue,
  getMetricValue,
  getCategoriesWithCryptos,
  getSuggestionsForUserGoal
};
