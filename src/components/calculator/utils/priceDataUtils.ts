export type TimeframeOption = "1M" | "3M" | "6M" | "1Y" | "All";

export interface PriceDataPoint {
  date: string;
  month: string;
  value: number;
  isProjection: boolean;
}

export const fetchHistoricalPriceData = async (
  cryptocurrency: string,
  timeframe: TimeframeOption
): Promise<PriceDataPoint[]> => {
  // Number of data points to return based on timeframe
  const timeframeMap: Record<TimeframeOption, number> = {
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
    "All": 730, // Roughly 2 years
  };
  
  const dataPoints = timeframeMap[timeframe];
  
  // Simulate API data - in a real app, this would call an actual API
  // with crypto price data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock historical data
      const data: PriceDataPoint[] = [];
      const today = new Date();
      
      for (let i = dataPoints; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Generate some realistic looking price data with volatility
        const baseValue = 1000 + Math.random() * 9000;
        const volatilityFactor = 0.1; // 10% volatility
        const randomFactor = 1 + (Math.random() * 2 - 1) * volatilityFactor;
        
        const value = i === 0 
          ? baseValue 
          : data[data.length - 1].value * randomFactor;
        
        data.push({
          date: date.toISOString(),
          month: date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
          value: value,
          isProjection: false
        });
      }
      
      resolve(data);
    }, 500);
  });
};

export const generateProjectionData = (
  historicalData: PriceDataPoint[],
  projectionMonths: number,
  futureValue: number
): PriceDataPoint[] => {
  const lastPrice = historicalData.length > 0 ? historicalData[historicalData.length - 1].value : 1000;
  const monthlyGrowthRate = (Math.pow(futureValue / lastPrice, 1 / projectionMonths) - 1);
  const projectionData: PriceDataPoint[] = [];
  let projectedValue = lastPrice;
  let lastDate = new Date(historicalData[historicalData.length - 1].date);

  for (let i = 1; i <= projectionMonths; i++) {
    const nextDate = new Date(lastDate.getFullYear(), lastDate.getMonth() + i, lastDate.getDate());
    projectedValue *= (1 + monthlyGrowthRate);

    projectionData.push({
      date: nextDate.toISOString(),
      month: nextDate.toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
      value: projectedValue,
      isProjection: true,
    });
    lastDate = nextDate;
  }

  return projectionData;
};
