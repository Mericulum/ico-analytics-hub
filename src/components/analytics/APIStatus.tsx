
import { Database, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";

interface APIStatusCardProps {
  name: string;
  remainingCalls: number;
  totalCalls: number;
}

const APIStatusCard = ({ name, remainingCalls, totalCalls }: APIStatusCardProps) => {
  return (
    <Card className="p-6 bg-black border-crypto-gray text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-crypto-blue" />
          <h3 className="text-lg font-semibold">{name} API Status</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">Connected</span>
          <RefreshCw className="h-4 w-4 text-crypto-blue cursor-pointer" />
        </div>
      </div>
      <p className="text-gray-400">Rate Limit: {remainingCalls}/{totalCalls} calls remaining</p>
    </Card>
  );
};

export const APIStatus = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <APIStatusCard name="CoinGecko" remainingCalls={75} totalCalls={100} />
      <APIStatusCard name="CryptoRank" remainingCalls={88} totalCalls={100} />
    </div>
  );
};

