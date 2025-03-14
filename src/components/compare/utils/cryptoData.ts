
import { Cryptocurrency, ComparisonMetric, UserGoal } from "@/types/compare";

// Sample cryptocurrency data
export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    category: "Store of Value",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    color: "#F7931A",
    marketData: {
      price: 62548.23,
      marketCap: 1224587000000,
      volume24h: 28457891240,
      circulatingSupply: 19578625,
      totalSupply: 21000000,
      allTimeHigh: 69044.77,
      allTimeHighDate: "2021-11-10",
      priceChange24h: 1.2,
      priceChange7d: 5.8,
      priceChange30d: -2.3
    },
    technicalData: {
      transactionSpeed: 7,
      blockTime: 600,
      energyConsumption: 1121.5,
      scalability: 4,
      lastUpdate: "2023-08-15",
      consensus: "Proof of Work",
      programmability: 3
    },
    adoptionData: {
      activeWallets: 108900000,
      developerActivity: 8,
      institutionalInterest: 9,
      partnerships: 450,
      integrations: 2800,
      socialMediaFollowers: 5700000
    },
    riskData: {
      volatility: 7,
      regulatoryCompliance: 6,
      securityAudits: 12,
      decentralizationLevel: 8,
      pastIncidents: 2,
      policyRisk: 6,
      legalChallenges: 4
    },
    sustainabilityData: {
      energyEfficiency: 3,
      carbonFootprint: 73000000,
      ecoFriendlyInitiatives: 5,
      renewableEnergyUse: 42
    },
    description: "Bitcoin is the first cryptocurrency created by Satoshi Nakamoto in 2009. It's often referred to as digital gold and is the most recognized cryptocurrency."
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    category: "Smart Contract",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    color: "#627EEA",
    marketData: {
      price: 3457.91,
      marketCap: 415690000000,
      volume24h: 14568972345,
      circulatingSupply: 120235841,
      totalSupply: 120235841,
      allTimeHigh: 4878.26,
      allTimeHighDate: "2021-11-10",
      priceChange24h: 2.5,
      priceChange7d: 7.2,
      priceChange30d: -1.8
    },
    technicalData: {
      transactionSpeed: 15,
      blockTime: 12,
      energyConsumption: 34.2,
      scalability: 7,
      lastUpdate: "2023-09-20",
      consensus: "Proof of Stake",
      programmability: 9
    },
    adoptionData: {
      activeWallets: 87500000,
      developerActivity: 10,
      institutionalInterest: 8,
      partnerships: 720,
      integrations: 4500,
      socialMediaFollowers: 4200000
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 7,
      securityAudits: 20,
      decentralizationLevel: 7,
      pastIncidents: 3,
      policyRisk: 5,
      legalChallenges: 3
    },
    sustainabilityData: {
      energyEfficiency: 8,
      carbonFootprint: 870000,
      ecoFriendlyInitiatives: 8,
      renewableEnergyUse: 65
    },
    description: "Ethereum is a decentralized platform that enables smart contracts and decentralized applications (dApps) to be built and run without downtime, fraud, control, or interference from a third party."
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    category: "Smart Contract",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    color: "#00FFA3",
    marketData: {
      price: 142.36,
      marketCap: 62487000000,
      volume24h: 2146987236,
      circulatingSupply: 438752089,
      totalSupply: 549846142,
      allTimeHigh: 260.06,
      allTimeHighDate: "2021-11-06",
      priceChange24h: 3.7,
      priceChange7d: 12.4,
      priceChange30d: 5.9
    },
    technicalData: {
      transactionSpeed: 65000,
      blockTime: 0.4,
      energyConsumption: 0.01,
      scalability: 9,
      lastUpdate: "2023-10-05",
      consensus: "Proof of History & Proof of Stake",
      programmability: 8
    },
    adoptionData: {
      activeWallets: 22400000,
      developerActivity: 9,
      institutionalInterest: 7,
      partnerships: 320,
      integrations: 1850,
      socialMediaFollowers: 2800000
    },
    riskData: {
      volatility: 8,
      regulatoryCompliance: 6,
      securityAudits: 15,
      decentralizationLevel: 6,
      pastIncidents: 5,
      policyRisk: 6,
      legalChallenges: 4
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 5400,
      ecoFriendlyInitiatives: 7,
      renewableEnergyUse: 80
    },
    description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. It's known for its high speed and low transaction costs."
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    category: "Smart Contract",
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    color: "#0033AD",
    marketData: {
      price: 0.49,
      marketCap: 17250000000,
      volume24h: 358742156,
      circulatingSupply: 35045020830,
      totalSupply: 45000000000,
      allTimeHigh: 3.10,
      allTimeHighDate: "2021-09-02",
      priceChange24h: 1.8,
      priceChange7d: 4.6,
      priceChange30d: -3.2
    },
    technicalData: {
      transactionSpeed: 250,
      blockTime: 20,
      energyConsumption: 0.02,
      scalability: 8,
      lastUpdate: "2023-11-15",
      consensus: "Proof of Stake",
      programmability: 7
    },
    adoptionData: {
      activeWallets: 3570000,
      developerActivity: 8,
      institutionalInterest: 6,
      partnerships: 170,
      integrations: 850,
      socialMediaFollowers: 1900000
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 8,
      securityAudits: 18,
      decentralizationLevel: 8,
      pastIncidents: 1,
      policyRisk: 4,
      legalChallenges: 2
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 4800,
      ecoFriendlyInitiatives: 9,
      renewableEnergyUse: 90
    },
    description: "Cardano is a proof-of-stake blockchain platform that aims to be a more secure and sustainable blockchain ecosystem for building decentralized applications."
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    category: "Memecoin",
    logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    color: "#C2A633",
    marketData: {
      price: 0.14,
      marketCap: 19750000000,
      volume24h: 875235412,
      circulatingSupply: 140965710056,
      totalSupply: 140965710056,
      allTimeHigh: 0.73,
      allTimeHighDate: "2021-05-08",
      priceChange24h: 4.3,
      priceChange7d: 15.8,
      priceChange30d: 10.4
    },
    technicalData: {
      transactionSpeed: 33,
      blockTime: 60,
      energyConsumption: 0.12,
      scalability: 5,
      lastUpdate: "2023-07-22",
      consensus: "Proof of Work",
      programmability: 2
    },
    adoptionData: {
      activeWallets: 4250000,
      developerActivity: 5,
      institutionalInterest: 4,
      partnerships: 80,
      integrations: 420,
      socialMediaFollowers: 3600000
    },
    riskData: {
      volatility: 9,
      regulatoryCompliance: 5,
      securityAudits: 8,
      decentralizationLevel: 6,
      pastIncidents: 2,
      policyRisk: 7,
      legalChallenges: 5
    },
    sustainabilityData: {
      energyEfficiency: 4,
      carbonFootprint: 150000,
      ecoFriendlyInitiatives: 3,
      renewableEnergyUse: 30
    },
    description: "Dogecoin is a cryptocurrency created as a joke, inspired by a popular internet meme featuring a Shiba Inu dog. Despite its humorous origins, it has gained significant value and a dedicated community."
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    category: "Payment",
    logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    color: "#23292F",
    marketData: {
      price: 0.51,
      marketCap: 27690000000,
      volume24h: 1245872365,
      circulatingSupply: 54298092296,
      totalSupply: 100000000000,
      allTimeHigh: 3.40,
      allTimeHighDate: "2018-01-07",
      priceChange24h: 1.4,
      priceChange7d: 3.2,
      priceChange30d: -2.8
    },
    technicalData: {
      transactionSpeed: 1500,
      blockTime: 3.5,
      energyConsumption: 0.0079,
      scalability: 8,
      lastUpdate: "2023-12-10",
      consensus: "XRP Ledger Consensus Protocol",
      programmability: 6
    },
    adoptionData: {
      activeWallets: 2980000,
      developerActivity: 7,
      institutionalInterest: 8,
      partnerships: 350,
      integrations: 1250,
      socialMediaFollowers: 2100000
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 5,
      securityAudits: 14,
      decentralizationLevel: 5,
      pastIncidents: 1,
      policyRisk: 8,
      legalChallenges: 7
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 3600,
      ecoFriendlyInitiatives: 7,
      renewableEnergyUse: 85
    },
    description: "XRP is the native cryptocurrency of the Ripple network, designed for fast, low-cost international money transfers and payments. It aims to replace traditional cross-border payment systems like SWIFT."
  },
  {
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI",
    category: "DeFi",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    color: "#FF007A",
    marketData: {
      price: 7.23,
      marketCap: 4245000000,
      volume24h: 187654289,
      circulatingSupply: 587528839,
      totalSupply: 1000000000,
      allTimeHigh: 44.97,
      allTimeHighDate: "2021-05-03",
      priceChange24h: 2.1,
      priceChange7d: 6.5,
      priceChange30d: -1.2
    },
    technicalData: {
      transactionSpeed: 15,
      blockTime: 13,
      energyConsumption: 0.02,
      scalability: 7,
      lastUpdate: "2023-11-28",
      consensus: "Ethereum (Proof of Stake)",
      programmability: 8
    },
    adoptionData: {
      activeWallets: 2150000,
      developerActivity: 9,
      institutionalInterest: 7,
      partnerships: 120,
      integrations: 650,
      socialMediaFollowers: 1500000
    },
    riskData: {
      volatility: 7,
      regulatoryCompliance: 6,
      securityAudits: 16,
      decentralizationLevel: 8,
      pastIncidents: 2,
      policyRisk: 7,
      legalChallenges: 5
    },
    sustainabilityData: {
      energyEfficiency: 8,
      carbonFootprint: 2600,
      ecoFriendlyInitiatives: 6,
      renewableEnergyUse: 65
    },
    description: "Uniswap is a decentralized cryptocurrency exchange protocol that operates on the Ethereum blockchain. It allows users to trade tokens without a central authority facilitating transactions."
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB",
    category: "Memecoin",
    logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    color: "#FFA409",
    marketData: {
      price: 0.000019,
      marketCap: 11240000000,
      volume24h: 345671823,
      circulatingSupply: 589382371896253,
      totalSupply: 999991486464645,
      allTimeHigh: 0.00008845,
      allTimeHighDate: "2021-10-28",
      priceChange24h: 5.7,
      priceChange7d: 18.3,
      priceChange30d: 12.6
    },
    technicalData: {
      transactionSpeed: 15,
      blockTime: 13,
      energyConsumption: 0.02,
      scalability: 7,
      lastUpdate: "2023-10-15",
      consensus: "Ethereum (Proof of Stake)",
      programmability: 4
    },
    adoptionData: {
      activeWallets: 3100000,
      developerActivity: 6,
      institutionalInterest: 3,
      partnerships: 65,
      integrations: 320,
      socialMediaFollowers: 3250000
    },
    riskData: {
      volatility: 10,
      regulatoryCompliance: 5,
      securityAudits: 10,
      decentralizationLevel: 7,
      pastIncidents: 1,
      policyRisk: 8,
      legalChallenges: 6
    },
    sustainabilityData: {
      energyEfficiency: 8,
      carbonFootprint: 2400,
      ecoFriendlyInitiatives: 5,
      renewableEnergyUse: 65
    },
    description: "Shiba Inu is a meme-inspired cryptocurrency created as an alternative to Dogecoin. It has evolved into an ecosystem with various tokens and a growing community."
  }
];

// Categories mapping
export const cryptoCategories: Record<string, { name: string, color: string }> = {
  "Layer 1": { name: "Layer 1 Blockchains", color: "#6FD5FF" },
  "Smart Contract": { name: "Smart Contract Platforms", color: "#627EEA" },
  "DeFi": { name: "Decentralized Finance", color: "#FF007A" },
  "Memecoin": { name: "Meme Coins", color: "#FFA409" },
  "NFT": { name: "NFT & Collectibles", color: "#FD3CD4" },
  "Exchange Token": { name: "Exchange Tokens", color: "#F0B90B" },
  "Store of Value": { name: "Store of Value", color: "#F7931A" },
  "Stablecoin": { name: "Stablecoins", color: "#2775CA" },
  "Privacy Coin": { name: "Privacy Coins", color: "#6DD6B8" },
  "Payment": { name: "Payment Networks", color: "#23292F" }
};

// Comparison metrics
export const metrics: ComparisonMetric[] = [
  // Market metrics
  {
    id: "price",
    name: "Price (USD)",
    category: "market",
    description: "Current market price in US dollars",
    formatter: (value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 8 })}`,
    colorScale: "neutral"
  },
  {
    id: "marketCap",
    name: "Market Cap",
    category: "market",
    description: "Total market value of circulating supply",
    formatter: (value: number) => {
      if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
      if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
      return `$${value.toLocaleString()}`;
    },
    colorScale: "higher-better"
  },
  {
    id: "volume24h",
    name: "24h Volume",
    category: "market",
    description: "Trading volume in the last 24 hours",
    formatter: (value: number) => {
      if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
      if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
      return `$${value.toLocaleString()}`;
    },
    colorScale: "higher-better"
  },
  {
    id: "circulatingSupply",
    name: "Circulating Supply",
    category: "market",
    description: "Number of coins currently in circulation",
    formatter: (value: number) => value.toLocaleString(),
    colorScale: "neutral"
  },
  {
    id: "priceChange7d",
    name: "7d Change",
    category: "market",
    description: "Price change over the last 7 days",
    formatter: (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`,
    colorScale: "higher-better"
  },

  // Technical metrics
  {
    id: "transactionSpeed",
    name: "TPS",
    category: "technical",
    description: "Transactions per second the network can process",
    formatter: (value: number) => value.toLocaleString(),
    colorScale: "higher-better"
  },
  {
    id: "blockTime",
    name: "Block Time",
    category: "technical",
    description: "Average time to add a new block to the blockchain",
    formatter: (value: number) => value < 1 ? `${(value * 1000).toFixed(0)}ms` : `${value.toFixed(1)}s`,
    colorScale: "lower-better"
  },
  {
    id: "energyConsumption",
    name: "Energy per Tx",
    category: "technical",
    description: "Energy consumption per transaction in kWh",
    formatter: (value: number) => value < 0.01 ? `${(value * 1000).toFixed(2)}Wh` : `${value.toFixed(2)}kWh`,
    colorScale: "lower-better"
  },
  {
    id: "scalability",
    name: "Scalability",
    category: "technical",
    description: "Rating of the network's ability to scale (1-10)",
    formatter: (value: number) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "consensus",
    name: "Consensus",
    category: "technical",
    description: "The consensus mechanism used by the blockchain",
    formatter: (value: string) => value,
    colorScale: "neutral"
  },

  // Adoption metrics
  {
    id: "activeWallets",
    name: "Active Wallets",
    category: "adoption",
    description: "Estimated number of active wallet addresses",
    formatter: (value: number) => {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toString();
    },
    colorScale: "higher-better"
  },
  {
    id: "developerActivity",
    name: "Developer Activity",
    category: "adoption",
    description: "Rating of developer activity on the blockchain (1-10)",
    formatter: (value: number) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "institutionalInterest",
    name: "Institutional Interest",
    category: "adoption",
    description: "Rating of interest from institutional investors (1-10)",
    formatter: (value: number) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "partnerships",
    name: "Partnerships",
    category: "adoption",
    description: "Number of official partnerships",
    formatter: (value: number) => value.toString(),
    colorScale: "higher-better"
  },

  // Risk metrics
  {
    id: "volatility",
    name: "Volatility",
    category: "risk",
    description: "Rating of price volatility (1-10)",
    formatter: (value: number) => `${value}/10`,
    colorScale: "lower-better"
  },
  {
    id: "regulatoryCompliance",
    name: "Regulatory Compliance",
    category: "risk",
    description: "Rating of compliance with regulations (1-10)",
    formatter: (value: number) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "securityAudits",
    name: "Security Audits",
    category: "risk",
    description: "Number of security audits completed",
    formatter: (value: number) => value.toString(),
    colorScale: "higher-better"
  },
  {
    id: "decentralizationLevel",
    name: "Decentralization",
    category: "risk",
    description: "Rating of network decentralization (1-10)",
    formatter: (value: number) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "policyRisk",
    name: "Policy Risk",
    category: "risk",
    description: "Rating of vulnerability to policy changes (1-10)",
    formatter: (value: number) => `${value}/10`,
    colorScale: "lower-better"
  },
  {
    id: "legalChallenges",
    name: "Legal Challenges",
    category: "risk",
    description: "Number of ongoing legal challenges",
    formatter: (value: number) => value.toString(),
    colorScale: "lower-better"
  },

  // Sustainability metrics
  {
    id: "energyEfficiency",
    name: "Energy Efficiency",
    category: "sustainability",
    description: "Rating of energy efficiency (1-10)",
    formatter: (value: number) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "carbonFootprint",
    name: "Carbon Footprint",
    category: "sustainability",
    description: "Estimated annual carbon emissions in tons of CO2",
    formatter: (value: number) => {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M tons`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K tons`;
      return `${value.toFixed(1)} tons`;
    },
    colorScale: "lower-better"
  },
  {
    id: "renewableEnergyUse",
    name: "Renewable Energy",
    category: "sustainability",
    description: "Percentage of network powered by renewable energy",
    formatter: (value: number) => `${value}%`,
    colorScale: "higher-better"
  }
];

// User goals with suggested metrics
export const userGoals: UserGoal[] = [
  {
    id: "long-term-investment",
    name: "Long-term Investment",
    description: "Compare cryptocurrencies for holding as a long-term investment",
    suggestedMetrics: ["marketCap", "institutionalInterest", "developerActivity", "decentralizationLevel", "policyRisk"]
  },
  {
    id: "daily-transactions",
    name: "Transactional Use",
    description: "Compare cryptocurrencies for everyday transactions and payments",
    suggestedMetrics: ["transactionSpeed", "blockTime", "price", "volume24h", "activeWallets"]
  },
  {
    id: "environmental-impact",
    name: "Environmental Impact",
    description: "Compare cryptocurrencies based on their environmental footprint",
    suggestedMetrics: ["energyEfficiency", "carbonFootprint", "renewableEnergyUse", "energyConsumption"]
  },
  {
    id: "defi-applications",
    name: "DeFi Applications",
    description: "Compare cryptocurrencies for use in decentralized finance applications",
    suggestedMetrics: ["programmability", "developerActivity", "securityAudits", "scalability"]
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment",
    description: "Compare cryptocurrencies based on their risk profiles",
    suggestedMetrics: ["volatility", "regulatoryCompliance", "policyRisk", "legalChallenges", "pastIncidents"]
  }
];

// Default comparison config
export const defaultComparisonConfig: ComparisonConfig = {
  cryptos: ["bitcoin", "ethereum", "solana"],
  metrics: ["price", "marketCap", "transactionSpeed", "energyEfficiency", "developerActivity"]
};

// Helper function to get a cryptocurrency by ID
export const getCryptoById = (id: string): Cryptocurrency | undefined => {
  return cryptocurrencies.find(crypto => crypto.id === id);
};

// Helper function to get a metric by ID
export const getMetricById = (id: string): ComparisonMetric | undefined => {
  return metrics.find(metric => metric.id === id);
};

// Helper function to get cryptocurrencies by category
export const getCryptosByCategory = (category: string): Cryptocurrency[] => {
  return cryptocurrencies.filter(crypto => crypto.category === category);
};

// Helper function to get all categories with their cryptocurrencies
export const getCategoriesWithCryptos = (): { category: string, name: string, color: string, cryptos: Cryptocurrency[] }[] => {
  const categories = Object.keys(cryptoCategories);
  return categories.map(category => ({
    category,
    name: cryptoCategories[category].name,
    color: cryptoCategories[category].color,
    cryptos: getCryptosByCategory(category)
  })).filter(cat => cat.cryptos.length > 0);
};

// Helper function to format metric values
export const formatMetricValue = (metricId: string, value: any): string => {
  const metric = getMetricById(metricId);
  if (!metric) return String(value);
  return metric.formatter(value);
};

// Get value for a specific metric from a cryptocurrency
export const getMetricValue = (crypto: Cryptocurrency, metricId: string): any => {
  const metric = getMetricById(metricId);
  if (!metric) return null;
  
  switch (metric.category) {
    case 'market':
      return crypto.marketData[metricId as keyof typeof crypto.marketData];
    case 'technical':
      return crypto.technicalData[metricId as keyof typeof crypto.technicalData];
    case 'adoption':
      return crypto.adoptionData[metricId as keyof typeof crypto.adoptionData];
    case 'risk':
      return crypto.riskData[metricId as keyof typeof crypto.riskData];
    case 'sustainability':
      return crypto.sustainabilityData[metricId as keyof typeof crypto.sustainabilityData];
    default:
      return null;
  }
};

// Helper function for AI suggestions based on user goal
export const getSuggestionsForUserGoal = (goalId: string): string => {
  const goal = userGoals.find(g => g.id === goalId);
  if (!goal) return "";
  
  const suggestedMetrics = goal.suggestedMetrics.map(id => {
    const metric = getMetricById(id);
    return metric ? metric.name : id;
  }).join(", ");
  
  return `For ${goal.name}, we recommend comparing: ${suggestedMetrics}`;
};
