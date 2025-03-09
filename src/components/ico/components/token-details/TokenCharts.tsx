
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

// Market data
const marketTrendData = [
  { date: 'Jan', value: 1000 },
  { date: 'Feb', value: 1200 },
  { date: 'Mar', value: 900 },
  { date: 'Apr', value: 1500 },
  { date: 'May', value: 2000 }
];

const whaleActivityData = [
  { date: 'Jan', transactions: 5 },
  { date: 'Feb', transactions: 8 },
  { date: 'Mar', transactions: 12 },
  { date: 'Apr', transactions: 7 },
  { date: 'May', transactions: 15 }
];

const sectorAllocationData = [
  { name: 'DeFi', value: 35 },
  { name: 'Gaming', value: 25 },
  { name: 'Infrastructure', value: 20 },
  { name: 'NFT', value: 15 },
  { name: 'Other', value: 5 }
];

const sentimentData = [
  { date: 'Jan', positive: 65, negative: 35 },
  { date: 'Feb', positive: 70, negative: 30 },
  { date: 'Mar', positive: 55, negative: 45 },
  { date: 'Apr', positive: 80, negative: 20 },
  { date: 'May', positive: 75, negative: 25 }
];

const COLORS = ['#4BA3CC', '#34D399', '#8B5CF6', '#F59E0B', '#EC4899'];

const TokenCharts = () => {
  const commonTooltipStyle = {
    backgroundColor: '#1a1a1a',
    border: '1px solid #4BA3CC'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-zinc-900/90 p-4 border-crypto-blue rounded-md">
        <h4 className="text-sm text-gray-300 mb-2">Market Trend</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketTrendData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4BA3CC" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4BA3CC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#6FD5FF" />
              <YAxis stroke="#6FD5FF" />
              <Tooltip contentStyle={commonTooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="#4BA3CC" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-zinc-900/90 p-4 border-crypto-blue rounded-md px-px">
        <h4 className="text-sm text-gray-300 mb-2">Sector Allocation</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={sectorAllocationData} 
                cx="50%" 
                cy="50%" 
                innerRadius={50} 
                outerRadius={80} 
                fill="#8884d8" 
                paddingAngle={5} 
                dataKey="value" 
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {sectorAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={commonTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-zinc-900/90 p-4 border-crypto-blue rounded-md">
        <h4 className="text-sm text-gray-300 mb-2">Whale Activity</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={whaleActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#6FD5FF" />
              <YAxis stroke="#6FD5FF" />
              <Tooltip contentStyle={commonTooltipStyle} />
              <Bar dataKey="transactions" fill="#4BA3CC" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-zinc-900/90 p-4 border-crypto-blue rounded-md">
        <h4 className="text-sm text-gray-300 mb-2">Social Sentiment</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sentimentData}>
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34D399" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#6FD5FF" />
              <YAxis stroke="#6FD5FF" />
              <Tooltip contentStyle={commonTooltipStyle} />
              <Area type="monotone" dataKey="positive" stroke="#34D399" fillOpacity={1} fill="url(#colorPositive)" stackId="1" />
              <Area type="monotone" dataKey="negative" stroke="#EF4444" fillOpacity={1} fill="url(#colorNegative)" stackId="1" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TokenCharts;
