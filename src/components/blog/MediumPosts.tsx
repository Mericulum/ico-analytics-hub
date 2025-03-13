
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, ArrowLeft } from "lucide-react";

interface MediumPost {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  fullContent?: string;
}

interface MediumPostsProps {
  posts: MediumPost[];
}

const MediumPosts = ({ posts }: MediumPostsProps) => {
  const [selectedPost, setSelectedPost] = useState<MediumPost | null>(null);

  if (selectedPost) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-gray-400 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Button>
        
        <div className="bg-crypto-dark border border-crypto-blue rounded-lg overflow-hidden">
          <div className="aspect-[21/9] overflow-hidden">
            <img 
              src={selectedPost.imageUrl} 
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="bg-crypto-blue/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm inline-flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                Medium Article
              </div>
              <span className="text-sm text-gray-400">Published: {selectedPost.publishedAt}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</h1>
            
            <div className="prose prose-invert max-w-none prose-headings:text-crypto-blue prose-a:text-crypto-blue">
              {selectedPost.fullContent ? (
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  {selectedPost.fullContent.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('#')) {
                      const level = paragraph.match(/^#+/)[0].length;
                      const content = paragraph.replace(/^#+\s/, '');
                      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
                      return <HeadingTag key={idx} className="text-white font-semibold mt-6 mb-3">{content}</HeadingTag>;
                    }
                    
                    if (paragraph.startsWith('•')) {
                      return (
                        <ul key={idx} className="list-disc pl-5 space-y-2">
                          {paragraph.split('•').filter(Boolean).map((item, i) => (
                            <li key={i}>{item.trim()}</li>
                          ))}
                        </ul>
                      );
                    }
                    
                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>
              ) : (
                <p className="text-gray-300">{selectedPost.description}</p>
              )}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="border-crypto-blue text-crypto-blue hover:bg-crypto-blue hover:text-white transition-all duration-300"
                  onClick={() => window.open(selectedPost.url, "_blank")}
                >
                  Read Original on Medium
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="text-crypto-blue bg-crypto-blue/10 px-3 py-1 rounded-full text-sm">
                Cryptocurrency
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 border-crypto-blue text-crypto-blue hover:bg-crypto-blue hover:text-white transition-all duration-300"
                onClick={() => window.open(post.url, "_blank")}
              >
                Medium
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button 
                className="flex items-center justify-center gap-2 bg-crypto-blue hover:bg-crypto-blue/80 text-white transition-all duration-300"
                onClick={() => setSelectedPost(post)}
              >
                Read Here
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
