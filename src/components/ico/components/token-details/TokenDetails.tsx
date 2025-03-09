
import { ICOProject } from "@/types/ico";

interface TokenDetailsProps {
  project: ICOProject;
}

const TokenDetails = ({ project }: TokenDetailsProps) => {
  return (
    <div className="bg-zinc-900/90 p-4 border-crypto-blue rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm text-gray-300">Token Type</h4>
            <p className="text-lg text-white">{project.token_type || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-300">Hard Cap</h4>
            <p className="text-lg text-white">{project.hard_cap || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-300">Token Supply</h4>
            <p className="text-lg text-white">{project.token_supply?.toLocaleString() || 'N/A'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm text-gray-300">Platform</h4>
            <p className="text-lg text-white">{project.Platform || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-300">ICO Date</h4>
            <p className="text-lg text-white">{project["ICO date"] || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-300">KYC Required</h4>
            <p className="text-lg text-white">{project.kyc_required ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
