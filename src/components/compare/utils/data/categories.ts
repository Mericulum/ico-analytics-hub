
import { CryptoCategory, CryptoGroup } from "@/types/compare";
import { cryptocurrencies } from "./cryptocurrencies";

// Group cryptocurrencies by category
export const getCategoriesWithCryptos = (): CryptoGroup[] => {
  const categories: { [key in CryptoCategory]?: typeof cryptocurrencies } = {};

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
