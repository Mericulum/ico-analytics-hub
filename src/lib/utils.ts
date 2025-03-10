import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format as dateFnsFormat } from "date-fns"
import { NewsItem } from "@/services/newsService"
import { ICOProject } from "@/types/ico"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, formatString: string = "PP"): string {
  return dateFnsFormat(date, formatString);
}

// Key topics for crypto market analysis
const cryptoKeywords = [
  'DeFi', 'NFT', 'Web3', 'Metaverse', 'DEX', 'CEX', 'Staking', 'Yield Farming',
  'Governance', 'DAOs', 'Smart Contracts', 'Layer 2', 'ZK-rollups', 'Tokenomics',
  'Airdrops', 'ICO', 'IDO', 'Mining', 'Proof of Stake', 'Proof of Work',
  'Liquidity Pool', 'Flash Loans', 'HODL', 'Whales', 'Altcoins',
  'Cold Storage', 'Hot Wallet', 'Custodial', 'Non-custodial'
];

// Political and regulatory topics
const politicalTopics = [
  'SEC', 'CFTC', 'Regulatory Clarity', 'Biden Administration', 'Trump Administration',
  'Executive Order', 'Crypto Legislation', 'Banking Committee', 'Treasury Department',
  'Federal Reserve', 'Central Bank Digital Currency', 'CBDC', 'Digital Dollar',
  'Privacy Concerns', 'KYC', 'AML', 'Tax Reporting', 'Infrastructure Bill',
  'Crypto Lobbying', 'Digital Asset Policy', 'Crypto Campaign Donations'
];

// Global economic factors
const economicFactors = [
  'Inflation', 'Interest Rates', 'Monetary Policy', 'Fiscal Policy', 'Quantitative Easing',
  'Quantitative Tightening', 'Stock Market Correlation', 'Gold Comparison',
  'Dollar Strength', 'Institutional Adoption', 'Corporate Treasury', 'ETFs',
  'Global Remittances', 'Cross-border Payments', 'Banking Crisis', 'Financial Inclusion'
];

/**
 * Determines if a path belongs to trader or investor sections
 * @param path Current URL path
 * @returns Object with isTrader and isInvestor flags
 */
export function getUserType(path: string) {
  const traderPaths = ['/market-analysis', '/trading-signals', '/compare', '/calculator'];
  const investorPaths = ['/ico-dashboard', '/scanner', '/portfolio'];
  
  return {
    isTrader: traderPaths.some(p => path.startsWith(p)),
    isInvestor: investorPaths.some(p => path.startsWith(p))
  };
}

/**
 * Generates a comprehensive 1000-word market summary including political and legal topics
 */
export function generateMarketSummary(
  date: Date,
  positiveNews: NewsItem[],
  negativeNews: NewsItem[],
  gainers: ICOProject[],
  losers: ICOProject[]
): string {
  // Random selection of topics to focus on
  const selectedKeywords = getRandomElements(cryptoKeywords, 8);
  const selectedPoliticalTopics = getRandomElements(politicalTopics, 5);
  const selectedEconomicFactors = getRandomElements(economicFactors, 4);
  
  // Market direction
  const overallTrend = Math.random() > 0.5 ? 'bullish' : 'bearish';
  const trumpSentiment = Math.random() > 0.5 ? 'positive' : 'mixed';
  const marketVolatility = Math.random() > 0.7 ? 'high' : 'moderate';
  
  // Random Bitcoin price between $40,000 and $100,000
  const btcPrice = Math.floor(40000 + Math.random() * 60000);
  
  // Random Ethereum price between $2,000 and $8,000
  const ethPrice = Math.floor(2000 + Math.random() * 6000);
  
  // Random market cap in trillions (1.5 to 4)
  const marketCap = (1.5 + Math.random() * 2.5).toFixed(2);
  
  // Random 24h volume in billions (50 to 250)
  const volume24h = Math.floor(50 + Math.random() * 200);
  
  // Introduction section
  const introduction = `
    <h2 class="text-xl font-bold text-white mt-6 mb-4">Market Overview</h2>
    <p>The cryptocurrency market is showing ${overallTrend} sentiment today, with Bitcoin trading at $${btcPrice.toLocaleString()} and Ethereum at $${ethPrice.toLocaleString()}. The total market capitalization stands at $${marketCap} trillion with $${volume24h} billion in 24-hour trading volume. ${marketVolatility === 'high' ? 'Volatility remains high as traders respond to recent developments across both crypto-specific and macroeconomic fronts.' : 'Market volatility has been relatively contained, suggesting a period of consolidation as investors digest recent developments.'}</p>
    
    <p class="mt-3">Key performance indicators show that ${gainers[0]?.["Project Name"] || "leading tokens"} led the gains with ${Math.floor(Math.random() * 15 + 10)}% increase, while ${losers[0]?.["Project Name"] || "some assets"} declined by ${Math.floor(Math.random() * 15 + 5)}%. Trading patterns indicate ${Math.random() > 0.5 ? 'strong accumulation by institutional players' : 'retail-driven momentum in altcoin markets'}, particularly in the ${selectedKeywords[0]} and ${selectedKeywords[1]} sectors.</p>
  `;
  
  // Industry trends section
  const industryTrends = `
    <h2 class="text-xl font-bold text-white mt-6 mb-4">Industry Trends & Key Focus Areas</h2>
    <p>Today's market activity highlights several dominant trends that crypto investors should monitor closely. ${selectedKeywords.slice(0, 3).join(', ')} projects are seeing renewed interest, with combined sector growth of ${Math.floor(Math.random() * 20 + 5)}% this week. ${selectedKeywords[3]} protocols have attracted $${Math.floor(Math.random() * 500 + 100)} million in fresh capital, signaling strong fundamentals despite broader market uncertainties.</p>
    
    <p class="mt-3">The ${selectedKeywords[4]} ecosystem continues its technological advancement with several major protocol upgrades announced this week. Projects focusing on ${selectedKeywords[5]} and ${selectedKeywords[6]} interoperability are particularly noteworthy, as cross-chain functionality remains a crucial development vector for the industry's maturation. ${selectedKeywords[7]} solutions have seen ${Math.floor(Math.random() * 30 + 70)}% year-to-date growth, outperforming many traditional financial metrics.</p>
    
    <p class="mt-3">Analysis of on-chain metrics reveals ${Math.random() > 0.5 ? 'increasing whale accumulation' : 'healthy distribution to smaller wallets'}, suggesting ${Math.random() > 0.5 ? 'confidence among large holders' : 'broader retail adoption'} despite recent price fluctuations. Network activity across major blockchains has ${Math.random() > 0.5 ? 'increased' : 'stabilized'} by ${Math.floor(Math.random() * 15 + 5)}%, with daily active addresses reaching ${Math.floor(Math.random() * 500 + 500)}K.</p>
  `;
  
  // Political and legal section
  const politicalSection = `
    <h2 class="text-xl font-bold text-white mt-6 mb-4">Political & Regulatory Landscape</h2>
    <p>The regulatory environment continues to evolve with significant implications for crypto markets. Recent developments from the ${selectedPoliticalTopics[0]} and ${selectedPoliticalTopics[1]} suggest a ${Math.random() > 0.6 ? 'more accommodative' : 'cautiously progressive'} approach to digital asset oversight. Industry insiders note that ${selectedPoliticalTopics[2]} remains a priority for legitimate market participants, with ongoing dialogue between regulators and crypto advocates showing promising signs of constructive engagement.</p>
    
    <p class="mt-3">Former President Trump's recent statements on cryptocurrency have generated substantial market reaction. His ${trumpSentiment} stance on digital assets, particularly his comments regarding ${Math.random() > 0.5 ? 'Bitcoin as a strategic reserve asset' : 'the need for American leadership in blockchain technology'}, has influenced market sentiment. Political analysts suggest that Trump's evolving position on crypto could signal a potential shift in Republican policy platforms, with implications for regulatory frameworks should political leadership change in upcoming elections.</p>
    
    <p class="mt-3">Legislative developments related to ${selectedPoliticalTopics[3]} and ${selectedPoliticalTopics[4]} are progressing through congressional committees, with bipartisan support emerging for balanced regulatory approaches that foster innovation while protecting consumers. The global regulatory landscape remains fragmented, with jurisdictional arbitrage continuing to influence corporate strategies and market structures.</p>
  `;
  
  // Economic analysis section
  const economicAnalysis = `
    <h2 class="text-xl font-bold text-white mt-6 mb-4">Macroeconomic Analysis</h2>
    <p>Cryptocurrency markets continue to respond to broader economic conditions, with ${selectedEconomicFactors[0]} and ${selectedEconomicFactors[1]} serving as critical factors in current price action. The Federal Reserve's stance on ${Math.random() > 0.5 ? 'interest rates' : 'monetary policy'} has created ${Math.random() > 0.5 ? 'tailwinds' : 'a complex environment'} for digital assets, as investors seek inflation hedges and alternative stores of value.</p>
    
    <p class="mt-3">The correlation between crypto and traditional markets has ${Math.random() > 0.5 ? 'weakened' : 'strengthened'} in recent weeks, with Bitcoin's ${Math.random() > 0.5 ? 'decoupling from' : 'growing correlation with'} equity indices offering insights into evolving market dynamics. ${selectedEconomicFactors[2]} trends suggest that institutional capital allocations to digital assets may ${Math.random() > 0.6 ? 'accelerate' : 'continue at a measured pace'} through year-end, particularly as ${selectedEconomicFactors[3]} concerns influence portfolio diversification strategies.</p>
    
    <p class="mt-3">Global economic indicators point to ${Math.random() > 0.5 ? 'persistent inflationary pressures' : 'stabilizing economic conditions'} across major economies, creating a complex backdrop for crypto valuations. Analysts highlight that Bitcoin's narrative as ${Math.random() > 0.5 ? 'digital gold' : 'an inflation hedge'} is being tested in current market conditions, with performance metrics showing ${Math.random() > 0.6 ? 'promising resilience' : 'mixed results'} compared to traditional safe-haven assets.</p>
  `;
  
  // Strategic outlook section
  const strategicOutlook = `
    <h2 class="text-xl font-bold text-white mt-6 mb-4">Strategic Outlook & Investment Considerations</h2>
    <p>For investors navigating current market conditions, several strategic considerations emerge from our analysis. First, sector rotation within the crypto ecosystem suggests opportunities in ${selectedKeywords[0]} and ${selectedKeywords[2]} projects that demonstrate strong fundamentals and adoption metrics. Second, regulatory developments should be closely monitored, particularly those related to ${selectedPoliticalTopics[0]} and ${selectedPoliticalTopics[4]} which could significantly impact market structure and participant behavior.</p>
    
    <p class="mt-3">Risk management remains paramount in the current ${marketVolatility} volatility environment. Diversification across asset classes, market capitalizations, and use cases offers protective benefits while maintaining exposure to potential upside. Technical analysis indicates key support levels for Bitcoin at $${Math.floor(btcPrice * 0.9 / 1000) * 1000} and resistance at $${Math.floor(btcPrice * 1.1 / 1000) * 1000}, with similar percentage-based levels relevant for major altcoins.</p>
    
    <p class="mt-3">Looking ahead, market participants should remain attuned to several key catalysts that could drive price action in coming weeks. These include: potential ETF developments, major protocol upgrades scheduled for Q2, the evolving narrative around ${selectedKeywords[4]} and ${selectedKeywords[5]} integration, and the impact of upcoming macroeconomic data releases on risk asset sentiment broadly. Political developments, particularly those related to the upcoming election cycle and Trump's crypto policy proposals, may introduce additional volatility and directional bias to markets.</p>
    
    <p class="mt-3">In conclusion, while short-term price action may remain choppy, the fundamental value proposition of blockchain technology and decentralized finance continues to strengthen through technological advancement, institutional adoption, and gradual regulatory clarity. Strategic investors would be well-served to focus on these long-term value drivers while managing exposure to short-term volatility.</p>
  `;
  
  // Combine all sections
  return `${introduction}${industryTrends}${politicalSection}${economicAnalysis}${strategicOutlook}`;
}

/**
 * Helper function to get random elements from an array
 */
function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
