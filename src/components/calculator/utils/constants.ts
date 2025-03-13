
export const cryptocurrencies = [
  { name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
  { name: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { name: "Solana", symbol: "SOL", color: "#00FFA3" },
  { name: "Cardano", symbol: "ADA", color: "#0033AD" },
  { name: "Polkadot", symbol: "DOT", color: "#E6007A" },
  { name: "Binance Coin", symbol: "BNB", color: "#F3BA2F" },
  { name: "Avalanche", symbol: "AVAX", color: "#E84142" },
  { name: "Ripple", symbol: "XRP", color: "#23292F" },
];

// Growth rate assumptions
export const growthRates = {
  conservative: {
    BTC: 15,
    ETH: 20,
    SOL: 25,
    ADA: 12,
    DOT: 18,
    BNB: 14,
    AVAX: 22,
    XRP: 10,
  },
  moderate: {
    BTC: 40,
    ETH: 50,
    SOL: 70,
    ADA: 35,
    DOT: 45,
    BNB: 38,
    AVAX: 55,
    XRP: 30,
  },
  aggressive: {
    BTC: 80,
    ETH: 100,
    SOL: 150,
    ADA: 70,
    DOT: 90,
    BNB: 75,
    AVAX: 110,
    XRP: 65,
  },
};

// Volatility factors for risk calculation
export const volatilityFactors = {
  BTC: 0.7,
  ETH: 0.8,
  SOL: 0.9,
  ADA: 0.75,
  DOT: 0.85,
  BNB: 0.65,
  AVAX: 0.85,
  XRP: 0.6,
};
