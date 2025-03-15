
import { useQuery } from "@tanstack/react-query";
import { ICOSentiment, SentimentData, SentimentFilters, SentimentOverview } from "@/types/sentiment";

// Mock data for demonstration
const generateMockSentimentData = (): SentimentOverview => {
  const platforms = ['twitter', 'reddit', 'telegram', 'news'];
  const keywords = [
    '#ICO', '#airdrop', '#presale', 'token', 'launch', 'scam', 'moon', 
    'pump', 'dump', 'rug pull', 'legit', 'gem', 'opportunity', 'risk'
  ];

  // Generate trend data for the last 7 days
  const recentTrends = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (30 - i));
    return {
      timestamp: date.toISOString(),
      averageSentiment: (Math.random() * 2 - 1) * 0.5, // Between -0.5 and 0.5
      mentionsCount: Math.floor(Math.random() * 500) + 100,
    };
  });

  // Generate top ICOs with sentiment
  const topICOs = [
    {
      id: "1",
      name: "Ethereum",
      symbol: "ETH",
      logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      overallSentiment: 0.68,
      sentimentLabel: "positive",
      riskLevel: "low",
      hypeLevel: "moderate",
      mentionsCount: 12580,
      positivePercentage: 72,
      neutralPercentage: 24,
      negativePercentage: 4,
      trendChange24h: 5.2,
      sentimentHistory: generateSentimentHistory(),
      relatedKeywords: [
        { keyword: "#ethereum", count: 542 },
        { keyword: "ETH", count: 423 },
        { keyword: "gas fees", count: 321 }
      ]
    },
    {
      id: "2",
      name: "Bitcoin",
      symbol: "BTC",
      logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      overallSentiment: 0.75,
      sentimentLabel: "positive",
      riskLevel: "low",
      hypeLevel: "high",
      mentionsCount: 15423,
      positivePercentage: 78,
      neutralPercentage: 19,
      negativePercentage: 3,
      trendChange24h: 8.4,
      sentimentHistory: generateSentimentHistory(),
      relatedKeywords: [
        { keyword: "#bitcoin", count: 842 },
        { keyword: "BTC", count: 623 },
        { keyword: "halving", count: 421 }
      ]
    },
    {
      id: "3",
      name: "Solana",
      symbol: "SOL",
      logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
      overallSentiment: 0.45,
      sentimentLabel: "positive",
      riskLevel: "moderate",
      hypeLevel: "high",
      mentionsCount: 7651,
      positivePercentage: 62,
      neutralPercentage: 28,
      negativePercentage: 10,
      trendChange24h: 12.7,
      sentimentHistory: generateSentimentHistory(),
      relatedKeywords: [
        { keyword: "#solana", count: 342 },
        { keyword: "SOL", count: 289 },
        { keyword: "speed", count: 187 }
      ]
    },
    {
      id: "4",
      name: "Cardano",
      symbol: "ADA",
      logoUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      overallSentiment: 0.35,
      sentimentLabel: "positive",
      riskLevel: "low",
      hypeLevel: "moderate",
      mentionsCount: 5432,
      positivePercentage: 58,
      neutralPercentage: 30,
      negativePercentage: 12,
      trendChange24h: -2.1,
      sentimentHistory: generateSentimentHistory(),
      relatedKeywords: [
        { keyword: "#cardano", count: 242 },
        { keyword: "ADA", count: 189 },
        { keyword: "staking", count: 127 }
      ]
    },
    {
      id: "5",
      name: "Luna Classic",
      symbol: "LUNC",
      logoUrl: "https://cryptologos.cc/logos/terra-luna-luna-logo.png",
      overallSentiment: -0.65,
      sentimentLabel: "negative",
      riskLevel: "high",
      hypeLevel: "high",
      mentionsCount: 8932,
      positivePercentage: 25,
      neutralPercentage: 15,
      negativePercentage: 60,
      trendChange24h: -18.5,
      sentimentHistory: generateSentimentHistory(true),
      relatedKeywords: [
        { keyword: "#LUNC", count: 442 },
        { keyword: "collapse", count: 389 },
        { keyword: "revival", count: 227 }
      ]
    },
    {
      id: "6",
      name: "RiskyCoin",
      symbol: "RISKY",
      logoUrl: "https://via.placeholder.com/32",
      overallSentiment: -0.72,
      sentimentLabel: "negative",
      riskLevel: "high",
      hypeLevel: "high",
      mentionsCount: 4521,
      positivePercentage: 18,
      neutralPercentage: 22,
      negativePercentage: 60,
      trendChange24h: -25.4,
      sentimentHistory: generateSentimentHistory(true),
      relatedKeywords: [
        { keyword: "#scam", count: 342 },
        { keyword: "rugpull", count: 289 },
        { keyword: "warning", count: 127 }
      ]
    }
  ] as ICOSentiment[];

  // Generate trending keywords
  const trendingKeywords = keywords.map(keyword => ({
    keyword,
    count: Math.floor(Math.random() * 1000) + 100,
    sentiment: (Math.random() * 2 - 1) // Between -1 and 1
  })).sort((a, b) => b.count - a.count).slice(0, 10);

  // Generate risk alerts
  const riskAlerts = [
    {
      id: "1",
      timestamp: new Date().toISOString(),
      icoName: "RiskyCoin",
      alertType: "Potential Scam",
      description: "Multiple red flags detected in social media discussions about RiskyCoin, including promises of unrealistic returns and anonymous team.",
      severity: "high",
      source: "twitter"
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      icoName: "Luna Classic",
      alertType: "Market Manipulation",
      description: "Unusual activity detected with coordinated posts promoting buying across multiple platforms.",
      severity: "moderate",
      source: "reddit"
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      icoName: "DeFiProtocol",
      alertType: "Regulatory Concern",
      description: "News reports indicate potential regulatory scrutiny for this token type in major markets.",
      severity: "moderate",
      source: "news"
    }
  ];

  return {
    totalMentions: 45763,
    averageSentiment: 0.28,
    topICOs,
    sentimentDistribution: {
      positive: 0.52,
      neutral: 0.28,
      negative: 0.20
    },
    platformDistribution: {
      twitter: 0.45,
      reddit: 0.25,
      telegram: 0.15,
      news: 0.15
    },
    recentTrends,
    trendingKeywords,
    riskAlerts
  };
};

// Helper function to generate sentiment history
function generateSentimentHistory(negative = false): { timestamp: string; score: number }[] {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (30 - i));
    
    let baseValue = negative ? -0.5 : 0.5;
    let fluctuation = (Math.random() * 0.4) - 0.2; // Fluctuation between -0.2 and 0.2
    
    return {
      timestamp: date.toISOString(),
      score: Math.max(-1, Math.min(1, baseValue + fluctuation)) // Ensure it stays between -1 and 1
    };
  });
}

export const fetchSentimentOverview = async (filters: SentimentFilters): Promise<SentimentOverview> => {
  // In a real app, we would use the filters to fetch data from the backend
  console.log('Fetching sentiment with filters:', filters);
  
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data
  return generateMockSentimentData();
};

export const fetchICOSentiment = async (icoId: string): Promise<ICOSentiment | null> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const mockData = generateMockSentimentData();
  return mockData.topICOs.find(ico => ico.id === icoId) || null;
};

export const useSentimentOverview = (filters: SentimentFilters) => {
  return useQuery({
    queryKey: ['sentiment-overview', filters],
    queryFn: () => fetchSentimentOverview(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useICOSentiment = (icoId: string) => {
  return useQuery({
    queryKey: ['ico-sentiment', icoId],
    queryFn: () => fetchICOSentiment(icoId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!icoId,
  });
};
