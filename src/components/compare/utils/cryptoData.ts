import { Cryptocurrency, CryptoCategory, ComparisonMetric, UserGoal, ComparisonConfig } from "@/types/compare";

// Mock data for cryptocurrencies
export const allCryptos: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    category: 'Store of Value',
    logo: '/logos/btc.svg',
    color: '#F7931A',
    marketData: {
      price: 62000,
      marketCap: 1200000000000,
      volume24h: 30000000000,
      circulatingSupply: 19000000,
      totalSupply: 21000000,
      allTimeHigh: 69000,
      allTimeHighDate: '2021-11-10',
      priceChange24h: 0.02,
      priceChange7d: 0.05,
      priceChange30d: 0.12,
    },
    technicalData: {
      transactionSpeed: 7,
      blockTime: 600,
      energyConsumption: 700,
      scalability: 3,
      lastUpdate: '2024-01-26',
      consensus: 'Proof of Work',
      programmability: 1,
    },
    adoptionData: {
      activeWallets: 100000000,
      developerActivity: 6,
      institutionalInterest: 8,
      partnerships: 500,
      integrations: 10000,
      socialMediaFollowers: 5000000,
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 7,
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
    description: 'The first decentralized cryptocurrency, designed to be a peer-to-peer electronic cash system.',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    category: 'Smart Contract',
    logo: '/logos/eth.svg',
    color: '#627EEA',
    marketData: {
      price: 3500,
      marketCap: 420000000000,
      volume24h: 20000000000,
      circulatingSupply: 120000000,
      totalSupply: 120000000,
      allTimeHigh: 4800,
      allTimeHighDate: '2021-11-10',
      priceChange24h: 0.03,
      priceChange7d: 0.08,
      priceChange30d: 0.15,
    },
    technicalData: {
      transactionSpeed: 15,
      blockTime: 13,
      energyConsumption: 50,
      scalability: 6,
      lastUpdate: '2024-01-26',
      consensus: 'Proof of Stake',
      programmability: 10,
    },
    adoptionData: {
      activeWallets: 50000000,
      developerActivity: 9,
      institutionalInterest: 9,
      partnerships: 1000,
      integrations: 20000,
      socialMediaFollowers: 8000000,
    },
    riskData: {
      volatility: 5,
      regulatoryCompliance: 6,
      securityAudits: 9,
      decentralizationLevel: 7,
      pastIncidents: 3,
      policyRisk: 4,
      legalChallenges: 2,
    },
    sustainabilityData: {
      energyEfficiency: 8,
      carbonFootprint: 100000,
      ecoFriendlyInitiatives: 7,
      renewableEnergyUse: 60,
    },
    description: 'A decentralized platform that enables the creation of smart contracts and decentralized applications (dApps).',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    category: 'Smart Contract',
    logo: '/logos/sol.svg',
    color: '#9945FF',
    marketData: {
      price: 100,
      marketCap: 45000000000,
      volume24h: 3000000000,
      circulatingSupply: 450000000,
      totalSupply: 560000000,
      allTimeHigh: 260,
      allTimeHighDate: '2021-11-06',
      priceChange24h: 0.04,
      priceChange7d: 0.10,
      priceChange30d: 0.20,
    },
    technicalData: {
      transactionSpeed: 50000,
      blockTime: 0.4,
      energyConsumption: 0.0001,
      scalability: 9,
      lastUpdate: '2024-01-26',
      consensus: 'Proof of Stake',
      programmability: 9,
    },
    adoptionData: {
      activeWallets: 5000000,
      developerActivity: 8,
      institutionalInterest: 7,
      partnerships: 300,
      integrations: 5000,
      socialMediaFollowers: 2000000,
    },
    riskData: {
      volatility: 7,
      regulatoryCompliance: 5,
      securityAudits: 7,
      decentralizationLevel: 6,
      pastIncidents: 4,
      policyRisk: 6,
      legalChallenges: 3,
    },
    sustainabilityData: {
      energyEfficiency: 10,
      carbonFootprint: 1000,
      ecoFriendlyInitiatives: 9,
      renewableEnergyUse: 90,
    },
    description: 'A high-performance blockchain known for its speed and scalability, supporting decentralized applications and marketplaces.',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    category: 'Smart Contract',
    logo: '/logos/ada.svg',
    color: '#3363FF',
    marketData: {
      price: 1.20,
      marketCap: 40000000000,
      volume24h: 1500000000,
      circulatingSupply: 33000000000,
      totalSupply: 45000000000,
      allTimeHigh: 3.10,
      allTimeHighDate: '2021-09-02',
      priceChange24h: -0.01,
      priceChange7d: 0.03,
      priceChange30d: 0.08,
    },
     technicalData: {
      transactionSpeed: 250,
      blockTime: 20,
      energyConsumption: 60,
      scalability: 7,
      lastUpdate: '2024-01-26',
      consensus: 'Proof of Stake',
      programmability: 8,
    },
    adoptionData: {
      activeWallets: 4000000,
      developerActivity: 7,
      institutionalInterest: 6,
      partnerships: 250,
      integrations: 4000,
      socialMediaFollowers: 1800000,
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 6,
      securityAudits: 8,
      decentralizationLevel: 8,
      pastIncidents: 3,
      policyRisk: 5,
      legalChallenges: 2,
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 500,
      ecoFriendlyInitiatives: 8,
      renewableEnergyUse: 85,
    },
    description: 'A proof-of-stake blockchain platform that aims to provide a more secure and sustainable ecosystem for decentralized applications.',
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    category: 'Payment Coin',
    logo: '/logos/xrp.svg',
    color: '#23292F',
    marketData: {
      price: 0.60,
      marketCap: 30000000000,
      volume24h: 2000000000,
      circulatingSupply: 50000000000,
      totalSupply: 100000000000,
      allTimeHigh: 3.40,
      allTimeHighDate: '2018-01-07',
      priceChange24h: 0.01,
      priceChange7d: 0.02,
      priceChange30d: 0.05,
    },
    technicalData: {
      transactionSpeed: 1500,
      blockTime: 4,
      energyConsumption: 0.0079,
      scalability: 8,
      lastUpdate: '2024-01-26',
      consensus: 'Federated Consensus',
      programmability: 3,
    },
    adoptionData: {
      activeWallets: 1500000,
      developerActivity: 4,
      institutionalInterest: 8,
      partnerships: 400,
      integrations: 6000,
      socialMediaFollowers: 1500000,
    },
    riskData: {
      volatility: 5,
      regulatoryCompliance: 3,
      securityAudits: 6,
      decentralizationLevel: 4,
      pastIncidents: 5,
      policyRisk: 7,
      legalChallenges: 4,
    },
    sustainabilityData: {
      energyEfficiency: 7,
      carbonFootprint: 2000,
      ecoFriendlyInitiatives: 5,
      renewableEnergyUse: 40,
    },
    description: 'A payment protocol designed to enable fast and low-cost international money transfers.',
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    category: 'Memecoin',
    logo: '/logos/doge.svg',
    color: '#C2A633',
    marketData: {
      price: 0.08,
      marketCap: 11000000000,
      volume24h: 800000000,
      circulatingSupply: 140000000000,
      totalSupply: null,
      allTimeHigh: 0.73,
      allTimeHighDate: '2021-05-08',
      priceChange24h: -0.02,
      priceChange7d: -0.05,
      priceChange30d: -0.10,
    },
    technicalData: {
      transactionSpeed: 30,
      blockTime: 60,
      energyConsumption: 0.2,
      scalability: 5,
      lastUpdate: '2024-01-26',
      consensus: 'Proof of Work',
      programmability: 1,
    },
    adoptionData: {
      activeWallets: 2000000,
      developerActivity: 2,
      institutionalInterest: 1,
      partnerships: 50,
      integrations: 1000,
      socialMediaFollowers: 4000000,
    },
    riskData: {
      volatility: 8,
      regulatoryCompliance: 2,
      securityAudits: 4,
      decentralizationLevel: 7,
      pastIncidents: 6,
      policyRisk: 8,
      legalChallenges: 5,
    },
    sustainabilityData: {
      energyEfficiency: 3,
      carbonFootprint: 50000,
      ecoFriendlyInitiatives: 2,
      renewableEnergyUse: 10,
    },
    description: 'A meme-inspired cryptocurrency that gained popularity as an internet phenomenon.',
  },
  {
    id: 'binance-coin',
    name: 'Binance Coin',
    symbol: 'BNB',
    category: 'Exchange Token',
    logo: '/logos/bnb.svg',
    color: '#F0B90B',
    marketData: {
      price: 400,
      marketCap: 60000000000,
      volume24h: 1500000000,
      circulatingSupply: 150000000,
      totalSupply: 200000000,
      allTimeHigh: 690,
      allTimeHighDate: '2021-05-10',
      priceChange24h: 0.02,
      priceChange7d: 0.06,
      priceChange30d: 0.14,
    },
    technicalData: {
      transactionSpeed: 1000,
      blockTime: 3,
      energyConsumption: 0.005,
      scalability: 7,
      lastUpdate: '2024-01-26',
      consensus: 'Proof of Staked Authority',
      programmability: 6,
    },
    adoptionData: {
      activeWallets: 3000000,
      developerActivity: 6,
      institutionalInterest: 5,
      partnerships: 300,
      integrations: 5000,
      socialMediaFollowers: 3000000,
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 4,
      securityAudits: 7,
      decentralizationLevel: 5,
      pastIncidents: 4,
      policyRisk: 6,
      legalChallenges: 3,
    },
    sustainabilityData: {
      energyEfficiency: 8,
      carbonFootprint: 15000,
      ecoFriendlyInitiatives: 6,
      renewableEnergyUse: 50,
    },
    description: 'The native cryptocurrency of the Binance exchange, used for trading, transaction fees, and participation in token sales.',
  },
  {
    id: 'privacycoinx',
    name: 'PrivacyCoinX',
    symbol: 'PCX',
    category: 'Privacy Coin',
    logo: '/logos/pcx.svg',
    color: '#4CAF50',
    marketData: {
      price: 50,
      marketCap: 500000000,
      volume24h: 5000000,
      circulatingSupply: 10000000,
      totalSupply: 12000000,
      allTimeHigh: 150,
      allTimeHighDate: '2022-01-15',
      priceChange24h: 0.01,
      priceChange7d: 0.03,
      priceChange30d: 0.07,
    },
    technicalData: {
      transactionSpeed: 60,
      blockTime: 120,
      energyConsumption: 0.1,
      scalability: 4,
      lastUpdate: '2024-01-26',
      consensus: 'Proof of Stake',
      programmability: 2,
    },
    adoptionData: {
      activeWallets: 500000,
      developerActivity: 5,
      institutionalInterest: 2,
      partnerships: 30,
      integrations: 500,
      socialMediaFollowers: 750000,
    },
    riskData: {
      volatility: 7,
      regulatoryCompliance: 2,
      securityAudits: 6,
      decentralizationLevel: 8,
      pastIncidents: 3,
      policyRisk: 9,
      legalChallenges: 7,
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 1000,
      ecoFriendlyInitiatives: 8,
      renewableEnergyUse: 70,
    },
    description: 'A cryptocurrency focused on providing enhanced privacy and anonymity for transactions.',
  },
  {
    id: 'stableusd',
    name: 'StableUSD',
    symbol: 'SUSD',
    category: 'Stablecoin',
    logo: '/logos/susd.svg',
    color: '#007BFF',
    marketData: {
      price: 1.00,
      marketCap: 5000000000,
      volume24h: 200000000,
      circulatingSupply: 5000000000,
      totalSupply: 5000000000,
      allTimeHigh: 1.05,
      allTimeHighDate: '2023-03-01',
      priceChange24h: 0.00,
      priceChange7d: 0.00,
      priceChange30d: 0.00,
    },
    technicalData: {
      transactionSpeed: 1000,
      blockTime: 5,
      energyConsumption: 0.001,
      scalability: 9,
      lastUpdate: '2024-01-26',
      consensus: 'Proof of Authority',
      programmability: 4,
    },
    adoptionData: {
      activeWallets: 1000000,
      developerActivity: 3,
      institutionalInterest: 7,
      partnerships: 100,
      integrations: 2000,
      socialMediaFollowers: 1000000,
    },
    riskData: {
      volatility: 1,
      regulatoryCompliance: 8,
      securityAudits: 9,
      decentralizationLevel: 2,
      pastIncidents: 1,
      policyRisk: 3,
      legalChallenges: 2,
    },
    sustainabilityData: {
      energyEfficiency: 10,
      carbonFootprint: 500,
      ecoFriendlyInitiatives: 9,
      renewableEnergyUse: 95,
    },
    description: 'A stablecoin pegged to the US dollar, designed to maintain a stable value for trading and transactions.',
  },
  {
    id: 'nfttokenart',
    name: 'NFTTokenArt',
    symbol: 'NFA',
    category: 'NFT',
    logo: '/logos/nfa.svg',
    color: '#E91E63',
    marketData: {
      price: 25,
      marketCap: 250000000,
      volume24h: 2000000,
      circulatingSupply: 10000000,
      totalSupply: 10000000,
      allTimeHigh: 80,
      allTimeHighDate: '2021-11-20',
      priceChange24h: -0.03,
      priceChange7d: -0.08,
      priceChange30d: -0.15,
    },
    technicalData: {
      transactionSpeed: 500,
      blockTime: 10,
      energyConsumption: 0.05,
      scalability: 6,
      lastUpdate: '2024-01-26',
      consensus: 'Proof of Stake',
      programmability: 7,
    },
    adoptionData: {
      activeWallets: 300000,
      developerActivity: 6,
      institutionalInterest: 3,
      partnerships: 40,
      integrations: 600,
      socialMediaFollowers: 600000,
    },
    riskData: {
      volatility: 9,
      regulatoryCompliance: 3,
      securityAudits: 5,
      decentralizationLevel: 6,
      pastIncidents: 4,
      policyRisk: 7,
      legalChallenges: 6,
    },
    sustainabilityData: {
      energyEfficiency: 7,
      carbonFootprint: 2000,
      ecoFriendlyInitiatives: 5,
      renewableEnergyUse: 40,
    },
    description: 'A token used to represent ownership of digital art and collectibles on the blockchain.',
  },
];

export const defaultComparisonConfig: ComparisonConfig = {
  cryptos: ['bitcoin', 'ethereum'],
  metrics: ['price', 'marketCap', 'transactionSpeed', 'energyEfficiency'],
};

export interface CryptoGroup {
  category: CryptoCategory;
  name: string;
  color: string;
  cryptos: Cryptocurrency[];
}

// Function to get all categories with their cryptos
export const getCategoriesWithCryptos = (): CryptoGroup[] => {
  const categoryColors: Record<string, string> = {
    'Layer 1': '#9945FF',
    'Smart Contract': '#627EEA',
    'DeFi': '#2775CA',
    'Memecoin': '#C2A633',
    'NFT': '#E91E63',
    'Exchange Token': '#F0B90B',
    'Store of Value': '#F7931A',
    'Stablecoin': '#007BFF',
    'Privacy Coin': '#4CAF50',
    'Payment Coin': '#23292F'
  };
  
  const categoryNames: Record<string, string> = {
    'Layer 1': 'Layer 1 Blockchains',
    'Smart Contract': 'Smart Contract Platforms',
    'DeFi': 'Decentralized Finance',
    'Memecoin': 'Memecoins',
    'NFT': 'NFT Tokens',
    'Exchange Token': 'Exchange Tokens',
    'Store of Value': 'Store of Value',
    'Stablecoin': 'Stablecoins',
    'Privacy Coin': 'Privacy Coins',
    'Payment Coin': 'Payment Networks'
  };
  
  const categories: { [key: string]: Cryptocurrency[] } = {};
  
  allCryptos.forEach(crypto => {
    if (!categories[crypto.category]) {
      categories[crypto.category] = [];
    }
    categories[crypto.category].push(crypto);
  });
  
  return Object.entries(categories).map(([category, cryptos]) => ({
    category: category as CryptoCategory,
    name: categoryNames[category] || category,
    color: categoryColors[category] || '#777777',
    cryptos
  }));
};

// Helper function for getting suggestions based on user goal
export const getSuggestionsForUserGoal = (goalId: string): string => {
  const goal = userGoals.find(g => g.id === goalId);
  if (!goal) return "";
  
  switch(goalId) {
    case 'long-term-investment':
      return "These metrics will help you evaluate cryptocurrencies for long-term investment potential.";
    case 'high-growth-potential':
      return "These metrics focus on identifying cryptocurrencies with strong growth potential.";
    case 'sustainable-crypto':
      return "These metrics prioritize environmentally sustainable cryptocurrencies.";
    case 'diversification':
      return "These metrics will help you balance your portfolio with diverse crypto assets.";
    case 'privacy-focused':
      return "These metrics focus on privacy features and security aspects.";
    default:
      return `Metrics selected for ${goal.name}`;
  }
};

// All available metrics
export const metrics: ComparisonMetric[] = [
  // Market Metrics
  {
    id: 'price',
    name: 'Price',
    category: 'market',
    description: 'Current trading price in USD',
    formatter: (value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 8 })}`,
    colorScale: 'neutral'
  },
  {
    id: 'marketCap',
    name: 'Market Cap',
    category: 'market',
    description: 'Total market value of the cryptocurrency',
    formatter: (value) => `$${(value / 1000000000).toLocaleString(undefined, { maximumFractionDigits: 2 })}B`,
    colorScale: 'higher-better'
  },
  {
    id: 'volume24h',
    name: '24h Volume',
    category: 'market',
    description: 'Amount of the cryptocurrency traded in the last 24 hours',
    formatter: (value) => `$${(value / 1000000000).toLocaleString(undefined, { maximumFractionDigits: 2 })}B`,
    colorScale: 'higher-better'
  },
  {
    id: 'circulatingSupply',
    name: 'Circulating Supply',
    category: 'market',
    description: 'Number of coins or tokens in public hands',
    formatter: (value) => `${(value / 1000000).toLocaleString(undefined, { maximumFractionDigits: 2 })}M`,
    colorScale: 'higher-better'
  },
  {
    id: 'totalSupply',
    name: 'Total Supply',
    category: 'market',
    description: 'Total number of coins or tokens that exist',
    formatter: (value) => value ? `${(value / 1000000).toLocaleString(undefined, { maximumFractionDigits: 2 })}M` : 'N/A',
    colorScale: 'neutral'
  },
  {
    id: 'allTimeHigh',
    name: 'All Time High',
    category: 'market',
    description: 'Highest price ever reached by the cryptocurrency',
    formatter: (value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    colorScale: 'higher-better'
  },
  {
    id: 'priceChange24h',
    name: '24h Price Change',
    category: 'market',
    description: 'Percentage change in price over the last 24 hours',
    formatter: (value) => `${(value * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`,
    colorScale: 'higher-better'
  },
  {
    id: 'priceChange7d',
    name: '7d Price Change',
    category: 'market',
    description: 'Percentage change in price over the last 7 days',
    formatter: (value) => `${(value * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`,
    colorScale: 'higher-better'
  },
  {
    id: 'priceChange30d',
    name: '30d Price Change',
    category: 'market',
    description: 'Percentage change in price over the last 30 days',
    formatter: (value) => `${(value * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`,
    colorScale: 'higher-better'
  },
  
  // Technical Metrics
  {
    id: 'transactionSpeed',
    name: 'Transaction Speed',
    category: 'technical',
    description: 'Number of transactions per second the network can handle',
    formatter: (value) => `${value} TPS`,
    colorScale: 'higher-better'
  },
  {
    id: 'blockTime',
    name: 'Block Time',
    category: 'technical',
    description: 'Average time to generate one block',
    formatter: (value) => `${value} seconds`,
    colorScale: 'lower-better'
  },
  {
    id: 'energyConsumption',
    name: 'Energy Consumption',
    category: 'technical',
    description: 'Energy consumed per transaction (kWh)',
    formatter: (value) => `${value} kWh`,
    colorScale: 'lower-better'
  },
  {
    id: 'scalability',
    name: 'Scalability',
    category: 'technical',
    description: 'Ability of the blockchain to handle increasing amounts of traffic and data',
    formatter: (value) => `${value}/10`,
    colorScale: 'higher-better'
  },
  {
    id: 'programmability',
    name: 'Programmability',
    category: 'technical',
    description: 'How easy it is to write smart contracts on the platform',
    formatter: (value) => `${value}/10`,
    colorScale: 'higher-better'
  },
  
  // Adoption Metrics
  {
    id: 'activeWallets',
    name: 'Active Wallets',
    category: 'adoption',
    description: 'Number of active wallets on the network',
    formatter: (value) => `${(value / 1000000).toLocaleString(undefined, { maximumFractionDigits: 2 })}M`,
    colorScale: 'higher-better'
  },
  {
    id: 'developerActivity',
    name: 'Developer Activity',
    category: 'adoption',
    description: 'Level of activity and engagement from developers',
    formatter: (value) => `${value}/10`,
    colorScale: 'higher-better'
  },
  {
    id: 'institutionalInterest',
    name: 'Institutional Interest',
    category: 'adoption',
    description: 'Level of interest and investment from institutions',
    formatter: (value) => `${value}/10`,
    colorScale: 'higher-better'
  },
  {
    id: 'partnerships',
    name: 'Partnerships',
    category: 'adoption',
    description: 'Number of partnerships the project has established',
    formatter: (value) => `${value}`,
    colorScale: 'higher-better'
  },
  {
    id: 'socialMediaFollowers',
    name: 'Social Media Followers',
    category: 'adoption',
    description: 'Number of followers on social media platforms',
    formatter: (value) => `${(value / 1000000).toLocaleString(undefined, { maximumFractionDigits: 2 })}M`,
    colorScale: 'higher-better'
  },
  
  // Risk Metrics
  {
    id: 'volatility',
    name: 'Volatility',
    category: 'risk',
    description: 'Degree of price fluctuation over time',
    formatter: (value) => `${value}/10`,
    colorScale: 'lower-better'
  },
  {
    id: 'regulatoryCompliance',
    name: 'Regulatory Compliance',
    category: 'risk',
    description: 'Level of compliance with regulations',
    formatter: (value) => `${value}/10`,
    colorScale: 'higher-better'
  },
  {
    id: 'securityAudits',
    name: 'Security Audits',
    category: 'risk',
    description: 'Number of security audits performed on the project',
    formatter: (value) => `${value}`,
    colorScale: 'higher-better'
  },
  {
    id: 'decentralizationLevel',
    name: 'Decentralization Level',
    category: 'risk',
    description: 'Degree to which control is distributed rather than centralized',
    formatter: (value) => `${value}/10`,
    colorScale: 'higher-better'
  },
  {
    id: 'pastIncidents',
    name: 'Past Incidents',
    category: 'risk',
    description: 'Number of security breaches or other incidents',
    formatter: (value) => `${value}`,
    colorScale: 'lower-better'
  },
  
  // Sustainability Metrics
  {
    id: 'energyEfficiency',
    name: 'Energy Efficiency',
    category: 'sustainability',
    description: 'Efficiency of energy use in the network',
    formatter: (value) => `${value}/10`,
    colorScale: 'higher-better'
  },
  {
    id: 'carbonFootprint',
    name: 'Carbon Footprint',
    category: 'sustainability',
    description: 'Amount of carbon emissions produced by the network',
    formatter: (value) => `${value} tons CO2/year`,
    colorScale: 'lower-better'
  },
  {
    id: 'ecoFriendlyInitiatives',
    name: 'Eco-Friendly Initiatives',
    category: 'sustainability',
    description: 'Level of commitment to eco-friendly practices',
    formatter: (value) => `${value}/10`,
    colorScale: 'higher-better'
  },
  {
    id: 'renewableEnergyUse',
    name: 'Renewable Energy Use',
    category: 'sustainability',
    description: 'Percentage of energy from renewable sources',
    formatter: (value) => `${value}%`,
    colorScale: 'higher-better'
  },
];

// Mock data for user goals
export const userGoals: UserGoal[] = [
  {
    id: 'long-term-investment',
    name: 'Long-Term Investment',
    description: 'Identify cryptocurrencies with strong fundamentals for long-term holding.',
    suggestedMetrics: ['marketCap', 'developerActivity', 'institutionalInterest', 'regulatoryCompliance', 'sustainabilityData']
  },
  {
    id: 'high-growth-potential',
    name: 'High-Growth Potential',
    description: 'Find cryptocurrencies with the potential for rapid growth and high returns.',
    suggestedMetrics: ['priceChange30d', 'developerActivity', 'scalability', 'volatility']
  },
  {
    id: 'sustainable-crypto',
    name: 'Sustainable Crypto',
    description: 'Invest in cryptocurrencies with a low environmental impact.',
    suggestedMetrics: ['energyEfficiency', 'carbonFootprint', 'renewableEnergyUse']
  },
  {
    id: 'diversification',
    name: 'Diversification',
    description: 'Diversify your portfolio across different types of cryptocurrencies.',
    suggestedMetrics: ['marketCap', 'volatility', 'category']
  },
  {
    id: 'privacy-focused',
    name: 'Privacy Focused',
    description: 'Invest in cryptocurrencies that prioritize user privacy and anonymity.',
    suggestedMetrics: ['decentralizationLevel']
  },
];

// Function to get a cryptocurrency by ID
export const getCryptoById = (id: string | undefined): Cryptocurrency | undefined => {
  if (!id) return undefined;
  return allCryptos.find(crypto => crypto.id === id);
};

// Function to get a metric by ID
export const getMetricById = (id: string | undefined): ComparisonMetric | undefined => {
  if (!id) return undefined;
  return metrics.find(metric => metric.id === id);
};

// Function to get a formatted metric value for a cryptocurrency
export const getMetricValue = (crypto: Cryptocurrency, metricId: string | undefined): any => {
  if (!metricId) return null;
  
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

// Function to format metric value according to its formatter
export const formatMetricValue = (metricId: string, value: any): string => {
  const metric = getMetricById(metricId);
  if (!metric || value === null || value === undefined) return 'N/A';
  
  return metric.formatter(value);
};
