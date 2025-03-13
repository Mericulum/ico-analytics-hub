
import React from "react";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

const ResultActions: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-end">
      <button 
        className="py-2 px-4 bg-crypto-gray/50 rounded-md font-medium text-white flex items-center gap-2 hover:bg-crypto-gray transition-colors"
        onClick={() => {
          toast.info("Download feature", { 
            description: "Download functionality would be implemented here" 
          });
        }}
      >
        <Download className="w-4 h-4" />
        <span>Export as PDF</span>
      </button>
      
      <button 
        className="py-2 px-4 bg-crypto-gray/50 rounded-md font-medium text-white flex items-center gap-2 hover:bg-crypto-gray transition-colors"
        onClick={() => {
          toast.info("Share feature", { 
            description: "Share functionality would be implemented here" 
          });
        }}
      >
        <Share2 className="w-4 h-4" />
        <span>Share Results</span>
      </button>
    </div>
  );
};

export default ResultActions;
