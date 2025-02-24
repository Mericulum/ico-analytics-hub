
import { Card } from "@/components/ui/card";
import { ChartBar, DollarSign, Calendar, Users, Globe, TrendingUp, Info, Gem } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { memo } from 'react';

const mockChartData = [{
  date: '2024-01',
  value: 2400
}, {
  date: '2024-02',
  value: 1398
}, {
  date: '2024-03',
  value: 9800
}, {
  date: '2024-04',
  value: 3908
}, {
  date: '2024-05',
  value: 4800
}, {
  date: '2024-06',
  value: 3800
}];

const COLORS = ['#6FD5FF', '#4BA3CC', '#33C3F0', '#1F6F8B', '#153E4D'];

// Memoized stat card component
const StatCard = memo(({ stat, index }: { stat: any; index: number; }) => (
  <Card className="p-6 bg-black/40 backdrop-blur-xl border border-crypto-blue/20 hover:border-crypto-green/30 transition-all duration-300 rounded-xl shadow-[0_8px_16px_-6px_rgba(111,213,255,0.2)]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-400">{stat.title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
      </div>
      <div className="p-2.5 rounded-xl bg-crypto-blue/10 backdrop-blur-sm border border-crypto-blue/20">
        <stat.icon className="w-6 h-6 text-crypto-blue" />
      </div>
    </div>
    <div className="mt-4">
      <span className={`text-sm ${stat.change.startsWith('+') ? 'text-crypto-green' : 'text-red-500'}`}>
        {stat.change}
      </span>
      <span className="text-sm text-gray-400 ml-2">vs last month</span>
    </div>
    <div className="h-24 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={stat.chartData}>
          <defs>
            <linearGradient id={`colorValue${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6FD5FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6FD5FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#6FD5FF" 
            fillOpacity={1} 
            fill={`url(#colorValue${index})`} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <p className="text-sm text-gray-400 mt-2">{stat.description}</p>
  </Card>
));
StatCard.displayName = 'StatCard';

// Memoized activity card component
const ActivityCard = memo(() => (
  <Card className="w-full lg:w-1/2 p-6 bg-black/40 backdrop-blur-xl border border-crypto-blue/20 hover:border-crypto-green/30 transition-all duration-300 rounded-xl">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">On-Chain Activity</h3>
      <Calendar className="w-5 h-5 text-crypto-blue" />
    </div>
    <div className="space-y-4">
      {[
        { title: "Large Whale Transfer", project: "ETH Network", amount: "$25.4M", time: "2h ago" },
        { title: "Smart Contract Deploy", project: "BSC Network", protocol: "DeFi", time: "4h ago" },
        { title: "NFT Collection Launch", project: "Blur Market", volume: "2.5K ETH", time: "6h ago" }
      ].map((activity, index) => (
        <div key={index} className="flex items-center justify-between py-3 border-b border-crypto-blue/10 hover:border-crypto-green/20 transition-colors group">
          <div>
            <p className="text-sm font-medium text-white group-hover:text-crypto-blue transition-colors">{activity.title}</p>
            <p className="text-xs text-gray-400">{activity.project}</p>
          </div>
          <span className="text-xs text-crypto-green">{activity.time}</span>
        </div>
      ))}
    </div>
  </Card>
));
ActivityCard.displayName = 'ActivityCard';

// Memoized market stats card component
const MarketStatsCard = memo(() => (
  <Card className="w-full lg:w-1/2 p-6 bg-black/40 backdrop-blur-xl border border-crypto-blue/20 hover:border-crypto-green/30 transition-all duration-300 rounded-xl">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">Market Statistics</h3>
      <Globe className="w-5 h-5 text-crypto-blue" />
    </div>
    <div className="grid grid-cols-1 gap-4">
      {[
        { label: "Total Market Cap", value: "$1.82T", change: "+2.5%" },
        { label: "24h Trading Volume", value: "$48.5B", change: "+1.8%" },
        { label: "Total Value Locked", value: "$89.4B", change: "+3.2%" }
      ].map((stat, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b border-crypto-blue/10 hover:border-crypto-green/20 transition-colors group">
          <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</span>
          <div className="text-right">
            <span className="text-sm font-medium text-white group-hover:text-crypto-blue transition-colors">{stat.value}</span>
            <span className="text-xs text-crypto-green ml-2">{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  </Card>
));
MarketStatsCard.displayName = 'MarketStatsCard';

const OverviewStats = () => {
  const stats = [
    {
      title: "Active ICOs",
      value: "156",
      change: "+12%",
      icon: Gem,
      description: "Currently active ICO projects",
      chartData: mockChartData,
    },
    {
      title: "Total Value Raised",
      value: "$2.4M",
      change: "+8.2%",
      icon: DollarSign,
      description: "Accumulated across all projects",
      chartData: mockChartData.map(d => ({ ...d, value: d.value * 1.2 })),
    },
    {
      title: "Average ROI",
      value: "124%",
      change: "+5.4%",
      icon: TrendingUp,
      description: "Return on investment metric",
      chartData: mockChartData.map(d => ({ ...d, value: d.value * 0.8 })),
    },
    {
      title: "Platform Users",
      value: "2,845",
      change: "+2.3%",
      icon: Users,
      description: "Active platform participants",
      chartData: mockChartData.map(d => ({ ...d, value: d.value * 0.5 })),
    }
  ];

  return (
    <div className="relative space-y-6 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-crypto-blue rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-crypto-green rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-crypto-blue via-white to-crypto-green bg-clip-text text-transparent">
            Analytics Overview
          </h2>
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <span className="text-sm text-gray-400">Last updated: Just now</span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <ActivityCard />
          <MarketStatsCard />
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;
