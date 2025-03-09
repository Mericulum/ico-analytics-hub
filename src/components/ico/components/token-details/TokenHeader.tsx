
import { ICOProject } from "@/types/ico";
import { TrendingDown, TrendingUp } from "lucide-react";

interface TokenHeaderProps {
  project: ICOProject;
}

const TokenHeader = ({ project }: TokenHeaderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-zinc-900/90 p-4 border-crypto-blue rounded-md">
        <h4 className="text-sm text-gray-300">Current Price</h4>
        <p className="text-xl font-bold text-white">{project.value}</p>
        <span className={`text-sm flex items-center gap-1 ${project.isHighlighted ? 'text-green-400' : 'text-red-400'}`}>
          {project.isHighlighted ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {project.ROI ? `${project.ROI}%` : 'N/A'}
        </span>
      </div>
      
      <div className="bg-zinc-900/90 p-4 border-crypto-blue rounded-md">
        <h4 className="text-sm text-gray-300">Market Cap</h4>
        <p className="text-xl font-bold text-white">
          ${parseFloat(project.value?.replace('$', '').replace(',', '') || '0').toLocaleString()}
        </p>
        <span className="text-sm text-gray-300">
          Rank #{project.id || 'N/A'}
        </span>
      </div>
      
      <div className="bg-zinc-900/90 p-4 border-crypto-blue rounded-md">
        <h4 className="text-sm text-gray-300">24h Volume</h4>
        <p className="text-xl font-bold text-white">
          ${((project.token_metrics as any)?.volume || 0).toLocaleString()}
        </p>
        <span className="text-sm text-gray-300">
          {project.Platform || 'Unknown'} Network
        </span>
      </div>
    </div>
  );
};

export default TokenHeader;
