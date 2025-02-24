
import { Card } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockTrendData = [
  { month: 'Jan', value: 2400 },
  { month: 'Feb', value: 1398 },
  { month: 'Mar', value: 9800 },
  { month: 'Apr', value: 3908 },
  { month: 'May', value: 4800 },
  { month: 'Jun', value: 3800 },
];

export const AnalyticsTrends = () => {
  return (
    <Card className="p-6 bg-black border-crypto-gray text-white">
      <h3 className="text-lg font-semibold text-white mb-4">ICO Funding Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A4B57" />
            <XAxis dataKey="month" stroke="#4BA3CC" />
            <YAxis stroke="#4BA3CC" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A3B47',
                border: '1px solid #2A4B57',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#6FD5FF"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

