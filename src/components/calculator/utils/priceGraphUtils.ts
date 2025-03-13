
// Generate mock historical data for demo purposes
export const generateHistoricalData = (crypto: string, months: number, initialValue: number, finalValue: number) => {
  const data = [];
  const now = new Date();
  
  // Volatility factor based on cryptocurrency
  let volatilityFactor = 0.1; // default
  switch (crypto) {
    case "BTC": volatilityFactor = 0.12; break;
    case "ETH": volatilityFactor = 0.15; break;
    case "SOL": volatilityFactor = 0.20; break;
    case "ADA": volatilityFactor = 0.18; break;
    case "DOT": volatilityFactor = 0.17; break;
    case "BNB": volatilityFactor = 0.11; break;
    case "AVAX": volatilityFactor = 0.19; break;
    case "XRP": volatilityFactor = 0.14; break;
    default: volatilityFactor = 0.15;
  }
  
  // Generate historical data with some volatility
  for (let i = 0; i <= months; i++) {
    const pastDate = new Date(now);
    pastDate.setMonth(now.getMonth() - months + i);
    
    // Progressive growth with random volatility
    const progressFactor = i / months;
    const expectedValue = initialValue + (finalValue - initialValue) * progressFactor;
    const randomFactor = 1 + (Math.random() - 0.5) * volatilityFactor;
    
    data.push({
      month: pastDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      value: i === 0 ? initialValue : i === months ? finalValue : expectedValue * randomFactor,
      isProjection: false
    });
  }
  
  return data;
};

// Generate future projection data
export const generateProjectionData = (historicalData: any[], months: number, finalValue: number) => {
  const lastHistoricalDate = new Date(historicalData[historicalData.length - 1].month);
  const projectionData = [];
  
  for (let i = 1; i <= months; i++) {
    const futureDate = new Date(lastHistoricalDate);
    futureDate.setMonth(lastHistoricalDate.getMonth() + i);
    
    const progressFactor = i / months;
    const lastHistoricalValue = historicalData[historicalData.length - 1].value;
    const projectedValue = lastHistoricalValue + (finalValue - lastHistoricalValue) * progressFactor;
    
    projectionData.push({
      month: futureDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      value: i === months ? finalValue : projectedValue,
      isProjection: true
    });
  }
  
  return projectionData;
};
