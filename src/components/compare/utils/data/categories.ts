
import { CryptoCategory, CryptoGroup, Cryptocurrency } from "@/types/compare";
import { cryptocurrencies } from "./cryptocurrencies";

// Extend basic cryptocurrency data with required properties
const extendCryptoData = (crypto: any): Cryptocurrency => {
  // Add default empty structures for the missing properties required by the Cryptocurrency type
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

// Group cryptocurrencies by category
export const getCategoriesWithCryptos = (): CryptoGroup[] => {
  const categories: { [key in CryptoCategory]?: Cryptocurrency[] } = {};

  // Process each cryptocurrency to ensure it has all required properties
  cryptocurrencies.forEach(crypto => {
    const extendedCrypto = extendCryptoData(crypto);
    
    if (!categories[crypto.category]) {
      categories[crypto.category] = [];
    }
    categories[crypto.category]?.push(extendedCrypto);
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
