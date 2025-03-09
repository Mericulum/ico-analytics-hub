
import { Button } from "@/components/ui/button";
import { FileText, Globe, MessageCircle, Twitter } from "lucide-react";
import { ICOProject } from "@/types/ico";

interface TokenLinksProps {
  project: ICOProject;
}

const TokenLinks = ({ project }: TokenLinksProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {project.website_url && (
        <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
          <a href={project.website_url} target="_blank" rel="noopener noreferrer">
            <Globe className="h-4 w-4 mr-2" /> Website
          </a>
        </Button>
      )}
      
      {project.whitepaper_url && (
        <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
          <a href={project.whitepaper_url} target="_blank" rel="noopener noreferrer">
            <FileText className="h-4 w-4 mr-2" /> Whitepaper
          </a>
        </Button>
      )}
      
      {(project.social_links as any)?.twitter && (
        <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
          <a href={(project.social_links as any).twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="h-4 w-4 mr-2" /> Twitter
          </a>
        </Button>
      )}
      
      {(project.social_links as any)?.telegram && (
        <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
          <a href={(project.social_links as any).telegram} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4 mr-2" /> Telegram
          </a>
        </Button>
      )}
    </div>
  );
};

export default TokenLinks;
