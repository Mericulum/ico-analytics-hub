
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const industryData = [
  { name: 'DeFi', value: 400 },
  { name: 'Gaming', value: 300 },
  { name: 'AI', value: 300 },
  { name: 'Infrastructure', value: 200 },
];

const COLORS = ['#6FD5FF', '#4BA3CC', '#1A3B47', '#2A4B57'];

export const IndustryDistribution = () => {
  return (
    <Card className="p-6 bg-black border-crypto-gray text-white">
      <h3 className="text-lg font-semibold text-white mb-4">Industry Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={industryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {industryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A3B47',
                border: '1px solid #2A4B57',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

