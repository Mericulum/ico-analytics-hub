
export type SentimentScore = 'positive' | 'neutral' | 'negative';
export type RiskLevel = 'low' | 'moderate' | 'high';
export type HypeLevel = 'low' | 'moderate' | 'high';
export type Platform = 'twitter' | 'reddit' | 'telegram' | 'news';

export interface SentimentData {
  id: string;
  timestamp: string;
  text: string;
  source: Platform;
  sentimentScore: number; // -1 to 1 range
  sentimentLabel: SentimentScore;
  icoId?: string;
  icoName?: string;
  keywords?: string[];
  url?: string;
  author?: string;
}

export interface ICOSentiment {
  id: string;
  name: string;
  symbol: string;
  logoUrl?: string;
  overallSentiment: number; // -1 to 1 range
  sentimentLabel: SentimentScore;
  riskLevel: RiskLevel;
  hypeLevel: HypeLevel;
  mentionsCount: number;
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
  sentimentHistory: {
    timestamp: string;
    score: number;
  }[];
  trendChange24h: number; // percentage change
  relatedKeywords: Array<{keyword: string, count: number}>;
}

export interface SentimentOverview {
  totalMentions: number;
  averageSentiment: number;
  topICOs: ICOSentiment[];
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  platformDistribution: Record<Platform, number>;
  recentTrends: Array<{
    timestamp: string;
    averageSentiment: number;
    mentionsCount: number;
  }>;
  trendingKeywords: Array<{keyword: string, count: number, sentiment: number}>;
  riskAlerts: Array<{
    id: string;
    timestamp: string;
    icoName: string;
    alertType: string;
    description: string;
    severity: RiskLevel;
    source: string;
  }>;
}

export interface SentimentFilters {
  timeRange: '24h' | '7d' | '30d' | 'all';
  platforms: Platform[];
  riskLevel?: RiskLevel;
  hypeLevel?: HypeLevel;
  searchTerm?: string;
}
