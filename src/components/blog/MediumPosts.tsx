
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface MediumPost {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
}

interface MediumPostsProps {
  posts: MediumPost[];
}

const MediumPosts = ({ posts }: MediumPostsProps) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card 
          key={post.id} 
          className="overflow-hidden flex flex-col bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors"
        >
          <div className="aspect-video w-full">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">
              {post.title}
            </h3>
            <p className="text-gray-300 mb-4 flex-1 line-clamp-3">
              {post.description}
            </p>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10"
                onClick={() => window.open(post.url, "_blank")}
              >
                Read on Medium
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-400 mt-4">
              Published: {post.publishedAt}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MediumPosts;
