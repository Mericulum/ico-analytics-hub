import { Cryptocurrency, CryptoCategory, ComparisonMetric, UserGoal, CryptoGroup } from "@/types/compare";

// Mock data for cryptocurrencies
const cryptocurrencies: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    category: 'Store of Value',
    logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png',
    color: '#F7931A',
    marketData: {
      price: 62000,
      marketCap: 1200000000000,
      volume24h: 30000000000,
      circulatingSupply: 19000000,
      totalSupply: 21000000,
      allTimeHigh: 69000,
      allTimeHighDate: '2021-11-10',
      priceChange24h: 1000,
      priceChange7d: 3000,
      priceChange30d: 8000,
    },
    technicalData: {
      transactionSpeed: 7,
      blockTime: 600,
      energyConsumption: 700,
      scalability: 3,
      lastUpdate: '2024-01-25',
      consensus: 'Proof of Work',
      programmability: 1,
    },
    adoptionData: {
      activeWallets: 100000000,
      developerActivity: 6,
      institutionalInterest: 9,
      partnerships: 500,
      integrations: 10000,
      socialMediaFollowers: 5000000,
    },
    riskData: {
      volatility: 7,
      regulatoryCompliance: 6,
      securityAudits: 10,
      decentralizationLevel: 9,
      pastIncidents: 2,
      policyRisk: 5,
      legalChallenges: 1,
    },
    sustainabilityData: {
      energyEfficiency: 2,
      carbonFootprint: 8000000,
      ecoFriendlyInitiatives: 3,
      renewableEnergyUse: 15,
    },
    description: 'Bitcoin is the first decentralized cryptocurrency...',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    category: 'Smart Contract',
    logo: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
    color: '#627EEA',
    marketData: {
      price: 3500,
      marketCap: 420000000000,
      volume24h: 15000000000,
      circulatingSupply: 120000000,
      totalSupply: 120000000,
      allTimeHigh: 4800,
      allTimeHighDate: '2021-11-10',
      priceChange24h: 50,
      priceChange7d: 150,
      priceChange30d: 400,
    },
    technicalData: {
      transactionSpeed: 15,
      blockTime: 13,
      energyConsumption: 50,
      scalability: 6,
      lastUpdate: '2024-01-25',
      consensus: 'Proof of Stake',
      programmability: 9,
    },
    adoptionData: {
      activeWallets: 60000000,
      developerActivity: 9,
      institutionalInterest: 8,
      partnerships: 1000,
      integrations: 20000,
      socialMediaFollowers: 4000000,
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 5,
      securityAudits: 9,
      decentralizationLevel: 7,
      pastIncidents: 3,
      policyRisk: 6,
      legalChallenges: 2,
    },
    sustainabilityData: {
      energyEfficiency: 7,
      carbonFootprint: 100000,
      ecoFriendlyInitiatives: 7,
      renewableEnergyUse: 60,
    },
    description: 'Ethereum is a decentralized platform that enables smart contracts...',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    category: 'Layer 1',
    logo: 'https://assets.coingecko.com/coins/images/4915/thumb/cardano.png',
    color: '#3366CC',
    marketData: {
      price: 1.20,
      marketCap: 40000000000,
      volume24h: 1000000000,
      circulatingSupply: 33000000000,
      totalSupply: 45000000000,
      allTimeHigh: 3.10,
      allTimeHighDate: '2021-09-02',
      priceChange24h: 0.05,
      priceChange7d: 0.15,
      priceChange30d: 0.30,
    },
    technicalData: {
      transactionSpeed: 250,
      blockTime: 20,
      energyConsumption: 10,
      scalability: 7,
      lastUpdate: '2024-01-25',
      consensus: 'Proof of Stake',
      programmability: 7,
    },
    adoptionData: {
      activeWallets: 3000000,
      developerActivity: 7,
      institutionalInterest: 6,
      partnerships: 300,
      integrations: 5000,
      socialMediaFollowers: 1500000,
    },
    riskData: {
      volatility: 5,
      regulatoryCompliance: 7,
      securityAudits: 8,
      decentralizationLevel: 8,
      pastIncidents: 1,
      policyRisk: 4,
      legalChallenges: 0,
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 5000,
      ecoFriendlyInitiatives: 8,
      renewableEnergyUse: 90,
    },
    description: 'Cardano is a blockchain platform for changemakers, innovators, and visionaries...',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    category: 'Layer 1',
    logo: 'https://assets.coingecko.com/coins/images/4128/thumb/solana.png',
    color: '#9945FF',
    marketData: {
      price: 100,
      marketCap: 45000000000,
      volume24h: 2000000000,
      circulatingSupply: 400000000,
      totalSupply: 550000000,
      allTimeHigh: 260,
      allTimeHighDate: '2021-11-07',
      priceChange24h: 4,
      priceChange7d: 12,
      priceChange30d: 25,
    },
    technicalData: {
      transactionSpeed: 50000,
      blockTime: 0.4,
      energyConsumption: 1,
      scalability: 9,
      lastUpdate: '2024-01-25',
      consensus: 'Proof of Stake',
      programmability: 8,
    },
    adoptionData: {
      activeWallets: 5000000,
      developerActivity: 8,
      institutionalInterest: 7,
      partnerships: 400,
      integrations: 6000,
      socialMediaFollowers: 2000000,
    },
    riskData: {
      volatility: 8,
      regulatoryCompliance: 4,
      securityAudits: 7,
      decentralizationLevel: 6,
      pastIncidents: 4,
      policyRisk: 7,
      legalChallenges: 3,
    },
    sustainabilityData: {
      energyEfficiency: 10,
      carbonFootprint: 1000,
      ecoFriendlyInitiatives: 9,
      renewableEnergyUse: 95,
    },
    description: 'Solana is a high-performance blockchain supporting scalable decentralized applications...',
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    category: 'Memecoin',
    logo: 'https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png',
    color: '#C2A633',
    marketData: {
      price: 0.15,
      marketCap: 20000000000,
      volume24h: 1000000000,
      circulatingSupply: 130000000000,
      totalSupply: 130000000000,
      allTimeHigh: 0.73,
      allTimeHighDate: '2021-05-08',
      priceChange24h: 0.01,
      priceChange7d: 0.03,
      priceChange30d: 0.05,
    },
    technicalData: {
      transactionSpeed: 30,
      blockTime: 60,
      energyConsumption: 300,
      scalability: 4,
      lastUpdate: '2024-01-25',
      consensus: 'Proof of Work',
      programmability: 1,
    },
    adoptionData: {
      activeWallets: 2000000,
      developerActivity: 3,
      institutionalInterest: 2,
      partnerships: 100,
      integrations: 2000,
      socialMediaFollowers: 6000000,
    },
    riskData: {
      volatility: 9,
      regulatoryCompliance: 3,
      securityAudits: 5,
      decentralizationLevel: 7,
      pastIncidents: 5,
      policyRisk: 8,
      legalChallenges: 4,
    },
    sustainabilityData: {
      energyEfficiency: 3,
      carbonFootprint: 5000000,
      ecoFriendlyInitiatives: 2,
      renewableEnergyUse: 10,
    },
    description: 'Dogecoin is a cryptocurrency featuring a Shiba Inu dog from the "Doge" Internet meme...',
  },
];

// Mock data for comparison metrics
const comparisonMetrics: ComparisonMetric[] = [
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

// Group cryptocurrencies by category
export const getCategoriesWithCryptos = (): CryptoGroup[] => {
  const categories: { [key in CryptoCategory]?: Cryptocurrency[] } = {};

  cryptocurrencies.forEach(crypto => {
    if (!categories[crypto.category]) {
      categories[crypto.category] = [];
    }
    categories[crypto.category]?.push(crypto);
  });

  const categoryColors: { [key in CryptoCategory]: string } = {
    'Layer 1': '#007BFF',
    'Smart Contract': '#28A745',
    'DeFi': '#DC3545',
    'Memecoin': '#FFC107',
    'NFT': '#17A2B8',
    'Exchange Token': '#6C757D',
    'Store of Value': '#F7931A',
    'Stablecoin': '#20C997',
    'Privacy Coin': '#6610F2',
    'Payment Coin': '#E83E8C',
  };

  return Object.entries(categories).map(([category, cryptos]) => ({
    category,
    name: category,
    color: categoryColors[category as CryptoCategory] || '#000000',
    cryptos: cryptos || [],
  }));
};

// Add the defaultComparisonConfig export
export const defaultComparisonConfig = {
  cryptos: ['bitcoin', 'ethereum'],
  metrics: ['price', 'marketCap', 'volume24h']
};

// Add the getSuggestionsForUserGoal function
export const getSuggestionsForUserGoal = (goalId: string | undefined): string[] => {
  if (!goalId) return [];
  
  const goal = userGoals.find(g => g.id === goalId);
  return goal ? goal.suggestedMetrics : [];
};
