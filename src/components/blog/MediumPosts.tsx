
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";

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
          className="overflow-hidden flex flex-col bg-crypto-dark border-crypto-blue hover:border-opacity-80 hover:shadow-lg hover:shadow-crypto-blue/20 transition-all duration-300"
        >
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-0 left-0 w-full p-2">
              <div className="bg-crypto-blue/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm inline-flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                Medium Article
              </div>
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 hover:text-crypto-blue transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-300 mb-4 flex-1 line-clamp-4 text-sm leading-relaxed">
              {post.description}
            </p>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-crypto-blue text-crypto-blue hover:bg-crypto-blue hover:text-white transition-all duration-300"
                onClick={() => window.open(post.url, "_blank")}
              >
                Read on Medium
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-400 mt-4 flex justify-between items-center">
              <span>Published: {post.publishedAt}</span>
              <span className="text-crypto-blue">Cryptocurrency</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MediumPosts;
