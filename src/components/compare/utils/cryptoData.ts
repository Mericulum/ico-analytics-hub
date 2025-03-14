
import { 
  Cryptocurrency, 
  ComparisonMetric, 
  UserGoal,
  CryptoCategory,
  ComparisonConfig
} from "@/types/compare";

// Mock data for cryptocurrencies
export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    category: "Store of Value",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    color: "#F7931A",
    marketData: {
      price: 62480.15,
      marketCap: 1224561238400,
      volume24h: 28753912000,
      circulatingSupply: 19.6,
      totalSupply: 21,
      allTimeHigh: 69044.77,
      allTimeHighDate: "2021-11-10",
      priceChange24h: 1.25,
      priceChange7d: -2.36,
      priceChange30d: 5.71
    },
    technicalData: {
      transactionSpeed: 7,
      blockTime: 600,
      energyConsumption: 707,
      scalability: 4,
      lastUpdate: "2023-10-15",
      consensus: "Proof of Work",
      programmability: 3
    },
    adoptionData: {
      activeWallets: 41000000,
      developerActivity: 8,
      institutionalInterest: 9,
      partnerships: 156,
      integrations: 892,
      socialMediaFollowers: 5700000
    },
    riskData: {
      volatility: 7,
      regulatoryCompliance: 6,
      securityAudits: 241,
      decentralizationLevel: 9,
      pastIncidents: 0,
      policyRisk: 4,
      legalChallenges: 2
    },
    sustainabilityData: {
      energyEfficiency: 3,
      carbonFootprint: 73000000,
      ecoFriendlyInitiatives: 5,
      renewableEnergyUse: 39
    },
    description: "Bitcoin is the first and most well-known cryptocurrency, created in 2009 by an unknown person using the pseudonym Satoshi Nakamoto. It operates on a decentralized network without a central authority, using proof-of-work consensus."
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    category: "Smart Contract",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    color: "#627EEA",
    marketData: {
      price: 3484.72,
      marketCap: 418166400000,
      volume24h: 14956300000,
      circulatingSupply: 120,
      totalSupply: 120,
      allTimeHigh: 4891.70,
      allTimeHighDate: "2021-11-16",
      priceChange24h: 0.75,
      priceChange7d: -1.23,
      priceChange30d: 8.91
    },
    technicalData: {
      transactionSpeed: 15,
      blockTime: 12,
      energyConsumption: 62,
      scalability: 7,
      lastUpdate: "2023-09-20",
      consensus: "Proof of Stake",
      programmability: 10
    },
    adoptionData: {
      activeWallets: 28000000,
      developerActivity: 10,
      institutionalInterest: 8,
      partnerships: 312,
      integrations: 1253,
      socialMediaFollowers: 4200000
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 7,
      securityAudits: 378,
      decentralizationLevel: 8,
      pastIncidents: 3,
      policyRisk: 5,
      legalChallenges: 3
    },
    sustainabilityData: {
      energyEfficiency: 7,
      carbonFootprint: 8600000,
      ecoFriendlyInitiatives: 8,
      renewableEnergyUse: 62
    },
    description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. It enables developers to build decentralized applications (dApps) and recently transitioned from proof-of-work to proof-of-stake consensus."
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    category: "Smart Contract",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    color: "#00FFBD",
    marketData: {
      price: 141.23,
      marketCap: 61730200000,
      volume24h: 2518470000,
      circulatingSupply: 437.1,
      totalSupply: 560.6,
      allTimeHigh: 259.96,
      allTimeHighDate: "2021-11-06",
      priceChange24h: 1.82,
      priceChange7d: -3.15,
      priceChange30d: 12.46
    },
    technicalData: {
      transactionSpeed: 65000,
      blockTime: 0.4,
      energyConsumption: 1.2,
      scalability: 9,
      lastUpdate: "2023-10-01",
      consensus: "Proof of History/Stake",
      programmability: 9
    },
    adoptionData: {
      activeWallets: 8700000,
      developerActivity: 9,
      institutionalInterest: 7,
      partnerships: 124,
      integrations: 346,
      socialMediaFollowers: 2800000
    },
    riskData: {
      volatility: 8,
      regulatoryCompliance: 6,
      securityAudits: 86,
      decentralizationLevel: 6,
      pastIncidents: 5,
      policyRisk: 4,
      legalChallenges: 1
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 986000,
      ecoFriendlyInitiatives: 7,
      renewableEnergyUse: 78
    },
    description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. It's known for its extremely fast transaction speeds and low fees, using a unique proof of history consensus mechanism."
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    category: "Smart Contract",
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    color: "#0033AD",
    marketData: {
      price: 0.45,
      marketCap: 15825000000,
      volume24h: 295840000,
      circulatingSupply: 35.18,
      totalSupply: 45,
      allTimeHigh: 3.10,
      allTimeHighDate: "2021-09-02",
      priceChange24h: 0.32,
      priceChange7d: -1.86,
      priceChange30d: 3.24
    },
    technicalData: {
      transactionSpeed: 250,
      blockTime: 20,
      energyConsumption: 6,
      scalability: 8,
      lastUpdate: "2023-08-15",
      consensus: "Proof of Stake (Ouroboros)",
      programmability: 8
    },
    adoptionData: {
      activeWallets: 3600000,
      developerActivity: 8,
      institutionalInterest: 6,
      partnerships: 67,
      integrations: 214,
      socialMediaFollowers: 2100000
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 8,
      securityAudits: 142,
      decentralizationLevel: 9,
      pastIncidents: 0,
      policyRisk: 3,
      legalChallenges: 1
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 286000,
      ecoFriendlyInitiatives: 9,
      renewableEnergyUse: 92
    },
    description: "Cardano is a proof-of-stake blockchain platform founded on peer-reviewed research and evidence-based development. It emphasizes sustainability, scalability, and transparency, with a strong focus on academic rigor and formal verification."
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    category: "Payment",
    logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    color: "#23292F",
    marketData: {
      price: 0.63,
      marketCap: 34747500000,
      volume24h: 1241780000,
      circulatingSupply: 55.1,
      totalSupply: 100,
      allTimeHigh: 3.40,
      allTimeHighDate: "2018-01-07",
      priceChange24h: 0.45,
      priceChange7d: -0.92,
      priceChange30d: 2.16
    },
    technicalData: {
      transactionSpeed: 1500,
      blockTime: 3,
      energyConsumption: 0.8,
      scalability: 8,
      lastUpdate: "2023-07-20",
      consensus: "XRP Ledger Consensus Protocol",
      programmability: 5
    },
    adoptionData: {
      activeWallets: 2100000,
      developerActivity: 7,
      institutionalInterest: 8,
      partnerships: 183,
      integrations: 257,
      socialMediaFollowers: 2600000
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 5,
      securityAudits: 93,
      decentralizationLevel: 4,
      pastIncidents: 1,
      policyRisk: 8,
      legalChallenges: 7
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 346000,
      ecoFriendlyInitiatives: 8,
      renewableEnergyUse: 85
    },
    description: "XRP is a digital asset designed for payments and used by Ripple to facilitate cross-border transactions. It's focused on providing fast, low-cost international money transfers for financial institutions and payment providers."
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    category: "Layer 1",
    logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    color: "#E6007A",
    marketData: {
      price: 6.72,
      marketCap: 8400000000,
      volume24h: 218760000,
      circulatingSupply: 1.25,
      totalSupply: 1.28,
      allTimeHigh: 54.98,
      allTimeHighDate: "2021-11-04",
      priceChange24h: 0.21,
      priceChange7d: -2.73,
      priceChange30d: 4.51
    },
    technicalData: {
      transactionSpeed: 1000,
      blockTime: 6,
      energyConsumption: 4.2,
      scalability: 9,
      lastUpdate: "2023-09-10",
      consensus: "Nominated Proof of Stake",
      programmability: 9
    },
    adoptionData: {
      activeWallets: 920000,
      developerActivity: 9,
      institutionalInterest: 7,
      partnerships: 86,
      integrations: 132,
      socialMediaFollowers: 1800000
    },
    riskData: {
      volatility: 7,
      regulatoryCompliance: 7,
      securityAudits: 76,
      decentralizationLevel: 8,
      pastIncidents: 1,
      policyRisk: 4,
      legalChallenges: 2
    },
    sustainabilityData: {
      energyEfficiency: 8,
      carbonFootprint: 528000,
      ecoFriendlyInitiatives: 7,
      renewableEnergyUse: 72
    },
    description: "Polkadot is a multi-chain network that enables different blockchains to transfer messages and value in a trust-free fashion. It aims to create an interconnected internet of blockchains for a decentralized web."
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    category: "Memecoin",
    logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    color: "#C3A634",
    marketData: {
      price: 0.16,
      marketCap: 22560000000,
      volume24h: 1238470000,
      circulatingSupply: 141,
      totalSupply: 141,
      allTimeHigh: 0.73,
      allTimeHighDate: "2021-05-08",
      priceChange24h: 2.14,
      priceChange7d: -5.62,
      priceChange30d: 8.37
    },
    technicalData: {
      transactionSpeed: 33,
      blockTime: 60,
      energyConsumption: 34,
      scalability: 5,
      lastUpdate: "2023-05-25",
      consensus: "Proof of Work (Auxiliary)",
      programmability: 3
    },
    adoptionData: {
      activeWallets: 4100000,
      developerActivity: 4,
      institutionalInterest: 4,
      partnerships: 28,
      integrations: 142,
      socialMediaFollowers: 3800000
    },
    riskData: {
      volatility: 9,
      regulatoryCompliance: 5,
      securityAudits: 32,
      decentralizationLevel: 6,
      pastIncidents: 2,
      policyRisk: 5,
      legalChallenges: 2
    },
    sustainabilityData: {
      energyEfficiency: 4,
      carbonFootprint: 3120000,
      ecoFriendlyInitiatives: 3,
      renewableEnergyUse: 28
    },
    description: "Dogecoin is a cryptocurrency created as a joke, based on the popular 'Doge' Internet meme. Despite its humorous origins, it has gained substantial popularity and market value, often associated with celebrity endorsements."
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB",
    category: "Memecoin",
    logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    color: "#F00500",
    marketData: {
      price: 0.000018,
      marketCap: 10368000000,
      volume24h: 872340000,
      circulatingSupply: 589940170000000,
      totalSupply: 1000000000000000,
      allTimeHigh: 0.000088,
      allTimeHighDate: "2021-10-28",
      priceChange24h: 1.98,
      priceChange7d: -6.34,
      priceChange30d: 9.62
    },
    technicalData: {
      transactionSpeed: 15,
      blockTime: 12,
      energyConsumption: 62,
      scalability: 7,
      lastUpdate: "2023-04-15",
      consensus: "Proof of Stake (Ethereum)",
      programmability: 7
    },
    adoptionData: {
      activeWallets: 2700000,
      developerActivity: 5,
      institutionalInterest: 3,
      partnerships: 14,
      integrations: 48,
      socialMediaFollowers: 3200000
    },
    riskData: {
      volatility: 10,
      regulatoryCompliance: 4,
      securityAudits: 21,
      decentralizationLevel: 5,
      pastIncidents: 4,
      policyRisk: 6,
      legalChallenges: 1
    },
    sustainabilityData: {
      energyEfficiency: 7,
      carbonFootprint: 8600000,
      ecoFriendlyInitiatives: 4,
      renewableEnergyUse: 62
    },
    description: "Shiba Inu is a decentralized meme token that evolved into a vibrant ecosystem. Created as a 'Dogecoin killer,' it has expanded to include DeFi applications and an NFT platform while maintaining its community-driven approach."
  },
  {
    id: "binance-coin",
    name: "BNB",
    symbol: "BNB",
    category: "Exchange Token",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    color: "#F3BA2F",
    marketData: {
      price: 582.14,
      marketCap: 85874880000,
      volume24h: 1427690000,
      circulatingSupply: 147.5,
      totalSupply: 147.5,
      allTimeHigh: 691.8,
      allTimeHighDate: "2021-05-10",
      priceChange24h: 0.87,
      priceChange7d: -1.42,
      priceChange30d: 5.93
    },
    technicalData: {
      transactionSpeed: 35,
      blockTime: 3,
      energyConsumption: 7.2,
      scalability: 8,
      lastUpdate: "2023-09-05",
      consensus: "Proof of Staked Authority",
      programmability: 9
    },
    adoptionData: {
      activeWallets: 7200000,
      developerActivity: 8,
      institutionalInterest: 8,
      partnerships: 204,
      integrations: 683,
      socialMediaFollowers: 7900000
    },
    riskData: {
      volatility: 6,
      regulatoryCompliance: 5,
      securityAudits: 127,
      decentralizationLevel: 5,
      pastIncidents: 3,
      policyRisk: 7,
      legalChallenges: 4
    },
    sustainabilityData: {
      energyEfficiency: 7,
      carbonFootprint: 912000,
      ecoFriendlyInitiatives: 6,
      renewableEnergyUse: 68
    },
    description: "BNB is the native cryptocurrency of Binance Chain and Binance Smart Chain, initially created as a utility token for the Binance exchange. It's used for trading fee discounts, payments, and as gas for BSC transactions."
  },
  {
    id: "cosmos",
    name: "Cosmos",
    symbol: "ATOM",
    category: "Layer 1",
    logo: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
    color: "#2E3148",
    marketData: {
      price: 8.54,
      marketCap: 3332200000,
      volume24h: 97620000,
      circulatingSupply: 390.2,
      totalSupply: 390.2,
      allTimeHigh: 44.45,
      allTimeHighDate: "2022-01-17",
      priceChange24h: 0.23,
      priceChange7d: -3.74,
      priceChange30d: 6.12
    },
    technicalData: {
      transactionSpeed: 10000,
      blockTime: 6.85,
      energyConsumption: 0.3,
      scalability: 9,
      lastUpdate: "2023-08-30",
      consensus: "Tendermint BFT",
      programmability: 8
    },
    adoptionData: {
      activeWallets: 842000,
      developerActivity: 9,
      institutionalInterest: 6,
      partnerships: 63,
      integrations: 97,
      socialMediaFollowers: 1300000
    },
    riskData: {
      volatility: 7,
      regulatoryCompliance: 7,
      securityAudits: 68,
      decentralizationLevel: 8,
      pastIncidents: 1,
      policyRisk: 3,
      legalChallenges: 1
    },
    sustainabilityData: {
      energyEfficiency: 9,
      carbonFootprint: 286000,
      ecoFriendlyInitiatives: 8,
      renewableEnergyUse: 88
    },
    description: "Cosmos is an ecosystem of interoperable blockchains that can scale and communicate with each other. It aims to create an 'Internet of Blockchains' through its Inter-Blockchain Communication protocol."
  }
];

// Comparison metrics with detailed information
export const comparisonMetrics: ComparisonMetric[] = [
  // Market Metrics
  {
    id: "price",
    name: "Current Price",
    category: "market",
    description: "The current market price in USD",
    formatter: (value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`,
    colorScale: "neutral"
  },
  {
    id: "marketCap",
    name: "Market Cap",
    category: "market",
    description: "Total market value of circulating supply",
    formatter: (value) => `$${(value / 1000000000).toFixed(2)}B`,
    colorScale: "higher-better"
  },
  {
    id: "volume24h",
    name: "24h Volume",
    category: "market",
    description: "Trading volume in the last 24 hours",
    formatter: (value) => `$${(value / 1000000).toFixed(2)}M`,
    colorScale: "higher-better"
  },
  {
    id: "priceChange24h",
    name: "24h Change",
    category: "market",
    description: "Price change percentage in the last 24 hours",
    formatter: (value) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`,
    colorScale: "higher-better"
  },
  {
    id: "priceChange7d",
    name: "7d Change",
    category: "market",
    description: "Price change percentage in the last 7 days",
    formatter: (value) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`,
    colorScale: "higher-better"
  },
  {
    id: "circulatingSupply",
    name: "Circulating Supply",
    category: "market",
    description: "Number of coins currently in circulation",
    formatter: (value) => value < 1000 ? value.toFixed(2) : `${(value / 1000000).toFixed(2)}M`,
    colorScale: "neutral"
  },
  {
    id: "ATH",
    name: "All-Time High",
    category: "market",
    description: "Highest price ever reached",
    formatter: (value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    colorScale: "neutral"
  },
  
  // Technical Metrics
  {
    id: "transactionSpeed",
    name: "Transaction Speed",
    category: "technical",
    description: "Transactions per second the network can process",
    formatter: (value) => `${value.toLocaleString()} TPS`,
    colorScale: "higher-better"
  },
  {
    id: "blockTime",
    name: "Block Time",
    category: "technical",
    description: "Average time between blocks",
    formatter: (value) => `${value} sec`,
    colorScale: "lower-better"
  },
  {
    id: "energyConsumption",
    name: "Energy Consumption",
    category: "technical",
    description: "Energy used per transaction in kWh",
    formatter: (value) => `${value.toLocaleString()} kWh`,
    colorScale: "lower-better"
  },
  {
    id: "scalability",
    name: "Scalability Rating",
    category: "technical",
    description: "Rating of how well the network can scale (1-10)",
    formatter: (value) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "consensus",
    name: "Consensus Mechanism",
    category: "technical",
    description: "Method used to validate transactions",
    formatter: (value) => value.toString(),
    colorScale: "neutral"
  },
  {
    id: "programmability",
    name: "Programmability",
    category: "technical",
    description: "Rating of how programmable the blockchain is (1-10)",
    formatter: (value) => `${value}/10`,
    colorScale: "higher-better"
  },
  
  // Adoption Metrics
  {
    id: "activeWallets",
    name: "Active Wallets",
    category: "adoption",
    description: "Estimated number of active wallet addresses",
    formatter: (value) => `${(value / 1000000).toFixed(2)}M`,
    colorScale: "higher-better"
  },
  {
    id: "developerActivity",
    name: "Developer Activity",
    category: "adoption",
    description: "Rating of development activity (1-10)",
    formatter: (value) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "institutionalInterest",
    name: "Institutional Interest",
    category: "adoption",
    description: "Rating of interest from institutional investors (1-10)",
    formatter: (value) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "partnerships",
    name: "Partnerships",
    category: "adoption",
    description: "Number of official partnerships",
    formatter: (value) => value.toString(),
    colorScale: "higher-better"
  },
  {
    id: "integrations",
    name: "Integrations",
    category: "adoption",
    description: "Number of services and platforms integrated with",
    formatter: (value) => value.toString(),
    colorScale: "higher-better"
  },
  
  // Risk Metrics
  {
    id: "volatility",
    name: "Volatility",
    category: "risk",
    description: "Rating of price volatility (1-10, higher means more volatile)",
    formatter: (value) => `${value}/10`,
    colorScale: "lower-better"
  },
  {
    id: "regulatoryCompliance",
    name: "Regulatory Compliance",
    category: "risk",
    description: "Rating of compliance with regulations (1-10)",
    formatter: (value) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "securityAudits",
    name: "Security Audits",
    category: "risk",
    description: "Number of security audits completed",
    formatter: (value) => value.toString(),
    colorScale: "higher-better"
  },
  {
    id: "decentralizationLevel",
    name: "Decentralization Level",
    category: "risk",
    description: "Rating of how decentralized the network is (1-10)",
    formatter: (value) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "pastIncidents",
    name: "Past Security Incidents",
    category: "risk",
    description: "Number of significant security incidents",
    formatter: (value) => value.toString(),
    colorScale: "lower-better"
  },
  {
    id: "policyRisk",
    name: "Policy Risk",
    category: "risk",
    description: "Rating of risk from policy changes (1-10)",
    formatter: (value) => `${value}/10`,
    colorScale: "lower-better"
  },
  {
    id: "legalChallenges",
    name: "Legal Challenges",
    category: "risk",
    description: "Number of ongoing legal challenges",
    formatter: (value) => value.toString(),
    colorScale: "lower-better"
  },
  
  // Sustainability Metrics
  {
    id: "energyEfficiency",
    name: "Energy Efficiency",
    category: "sustainability",
    description: "Rating of overall energy efficiency (1-10)",
    formatter: (value) => `${value}/10`,
    colorScale: "higher-better"
  },
  {
    id: "carbonFootprint",
    name: "Carbon Footprint",
    category: "sustainability",
    description: "Estimated annual CO2 emissions in tons",
    formatter: (value) => `${(value / 1000000).toFixed(2)}M tons`,
    colorScale: "lower-better"
  },
  {
    id: "renewableEnergyUse",
    name: "Renewable Energy Use",
    category: "sustainability",
    description: "Percentage of network powered by renewable energy",
    formatter: (value) => `${value}%`,
    colorScale: "higher-better"
  }
];

// User Investment Goals
export const userGoals: UserGoal[] = [
  {
    id: "long_term_investment",
    name: "Long-Term Investment",
    description: "Looking for cryptocurrencies to hold for years as part of an investment portfolio",
    suggestedMetrics: ["marketCap", "institutionalInterest", "decentralizationLevel", "developerActivity", "regulatoryCompliance"]
  },
  {
    id: "trading",
    name: "Active Trading",
    description: "Looking for cryptocurrencies with good trading opportunities",
    suggestedMetrics: ["priceChange24h", "priceChange7d", "volume24h", "volatility", "ATH"]
  },
  {
    id: "eco_friendly",
    name: "Eco-Friendly Investment",
    description: "Prioritizing environmentally sustainable cryptocurrencies",
    suggestedMetrics: ["energyEfficiency", "energyConsumption", "carbonFootprint", "renewableEnergyUse", "consensus"]
  },
  {
    id: "defi_participation",
    name: "DeFi Participation",
    description: "Looking for cryptocurrencies for active use in DeFi applications",
    suggestedMetrics: ["programmability", "integrations", "scalability", "transactionSpeed", "developerActivity"]
  },
  {
    id: "risk_averse",
    name: "Lower Risk Approach",
    description: "Seeking more established cryptocurrencies with lower risk profiles",
    suggestedMetrics: ["marketCap", "regulatoryCompliance", "pastIncidents", "decentralizationLevel", "securityAudits"]
  }
];

// Default comparison configuration
export const defaultComparisonConfig: ComparisonConfig = {
  cryptos: ["bitcoin", "ethereum", "solana"],
  metrics: ["price", "marketCap", "transactionSpeed", "energyConsumption", "developerActivity", "regulatoryCompliance"]
};

// Helper functions to get crypto and metric data
export const getCryptoById = (id: string): Cryptocurrency | undefined => {
  return cryptocurrencies.find(crypto => crypto.id === id);
};

export const getMetricById = (id: string): ComparisonMetric | undefined => {
  return comparisonMetrics.find(metric => metric.id === id);
};

// Helper function to get metric value from crypto
export const getMetricValue = (crypto: Cryptocurrency, metricId: string): any => {
  const metric = getMetricById(metricId);
  if (!metric) return null;

  switch (metric.category) {
    case "market":
      if (metricId === "ATH") return crypto.marketData.allTimeHigh;
      return (crypto.marketData as any)[metricId];
    
    case "technical":
      return (crypto.technicalData as any)[metricId];
    
    case "adoption":
      return (crypto.adoptionData as any)[metricId];
    
    case "risk":
      return (crypto.riskData as any)[metricId];
    
    case "sustainability":
      return (crypto.sustainabilityData as any)[metricId];
    
    default:
      return null;
  }
};

// Helper function to format metric values
export const formatMetricValue = (metricId: string, value: any): string => {
  const metric = getMetricById(metricId);
  if (!metric || value === undefined || value === null) return "N/A";
  
  return metric.formatter(value);
};
