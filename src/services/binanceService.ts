
import { ICOProject } from "@/types/ico";
import { useQuery } from "@tanstack/react-query";

const BINANCE_API_BASE_URL = "https://api.binance.com/api/v3";

interface BinanceToken {
  symbol: string;
  price: string;
  volume: string;
  marketCap?: string;
  launchDate?: string;
  isIEO?: boolean;
}

// Generate a realistic ICO date for demo purposes
// Gives higher probability to more recent dates
const generateRealisticLaunchDate = (): string => {
  const now = new Date();
  const yearsBack = Math.random() < 0.4 ? 0 : Math.random() < 0.6 ? 1 : 2; // 40% chance for 2024, 20% for 2023, 20% for 2022
  
  const year = now.getFullYear() - yearsBack;
  const month = yearsBack === 0 
    ? Math.floor(Math.random() * (now.getMonth() + 1)) // Current year: only months up to current month
    : Math.floor(Math.random() * 12); // Previous years: any month
  
  const day = Math.floor(Math.random() * 28) + 1; // Avoid invalid dates
  
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Convert Binance API data to our ICOProject format
const mapBinanceToICOProject = (token: BinanceToken): ICOProject => {
  // Generate a realistic ICO date
  const launchDate = token.launchDate || generateRealisticLaunchDate();
  
  return {
    "Project Name": token.symbol.replace("USDT", ""),
    "Platform": "Binance",
    "Price": parseFloat(token.price),
    "ROI": Math.random() * 20 - 10, // Random ROI for demonstration
    "ICO date": launchDate,
    value: `$${parseFloat(token.price).toFixed(2)}`,
    token_price: token.price,
    token_metrics: { volume: parseFloat(token.volume) },
    isHighlighted: true,
    isNew: new Date(launchDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  };
};

// Fetch all trading pairs from Binance and filter for new tokens (likely ICOs/IEOs)
export const fetchBinanceICOProjects = async (): Promise<ICOProject[]> => {
  try {
    // Get ticker price data
    const priceResponse = await fetch(`${BINANCE_API_BASE_URL}/ticker/price`);
    if (!priceResponse.ok) throw new Error('Failed to fetch Binance prices');
    const priceData = await priceResponse.json();
    
    // Get 24hr ticker data for volume
    const tickerResponse = await fetch(`${BINANCE_API_BASE_URL}/ticker/24hr`);
    if (!tickerResponse.ok) throw new Error('Failed to fetch Binance 24hr data');
    const tickerData = await tickerResponse.json();

    // Create a map of volume data
    const volumeMap = new Map();
    tickerData.forEach((ticker: any) => {
      volumeMap.set(ticker.symbol, ticker.volume);
    });

    // Filter for USDT pairs and convert to our format
    const tokens = priceData
      .filter((token: any) => token.symbol.endsWith('USDT'))
      .map((token: any) => ({
        symbol: token.symbol,
        price: token.price,
        volume: volumeMap.get(token.symbol) || '0',
      }))
      // Take up to 100 tokens instead of just 20
      .slice(0, 100);

    return tokens.map(mapBinanceToICOProject);
  } catch (error) {
    console.error("Error fetching from Binance API:", error);
    return [];
  }
};

// React Query hook for Binance ICO data
export const useBinanceICOProjects = () => {
  return useQuery({
    queryKey: ['binanceICOProjects'],
    queryFn: fetchBinanceICOProjects,
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // Refresh every minute
  });
};

// Set up a WebSocket connection for real-time price updates
export const createBinanceWebSocket = (symbols: string[], onUpdate: (data: any) => void) => {
  const streams = symbols.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
  const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onUpdate(data);
  };
  
  return ws;
};
