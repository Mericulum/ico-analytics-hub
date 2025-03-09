
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ICOProject } from "@/types/ico";
import { TokenHeader, TokenCharts, TokenDetails, TokenLinks } from "./token-details";

interface TokenDetailsModalProps {
  selectedProject: ICOProject | null;
  onClose: () => void;
}

const TokenDetailsModal = ({ selectedProject, onClose }: TokenDetailsModalProps) => {
  if (!selectedProject) return null;
  
  return (
    <Dialog open={!!selectedProject} onOpenChange={onClose}>
      <DialogContent className="bg-crypto-dark border-crypto-blue text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            {selectedProject["Project Name"]}
            {selectedProject.isHighlighted && (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <TokenHeader project={selectedProject} />
          <TokenCharts />
          <TokenDetails project={selectedProject} />
          <TokenLinks project={selectedProject} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailsModal;
