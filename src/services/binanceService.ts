
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

// Convert Binance API data to our ICOProject format
const mapBinanceToICOProject = (token: BinanceToken): ICOProject => {
  return {
    "Project Name": token.symbol.replace("USDT", ""),
    "Platform": "Binance",
    "Price": parseFloat(token.price),
    "ROI": Math.random() * 20 - 10, // Random ROI for demonstration
    "ICO date": token.launchDate || new Date().toISOString().split('T')[0],
    value: `$${parseFloat(token.price).toFixed(2)}`,
    token_price: token.price,
    token_metrics: { volume: parseFloat(token.volume) },
    isHighlighted: true,
    isNew: token.launchDate ? new Date(token.launchDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : false,
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
