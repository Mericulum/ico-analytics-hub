
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FileText, Calendar, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

// Medium post structure
interface MediumPost {
  id: number;
  title: string;
  description: string;
  date: Date;
  url: string;
  imageUrl: string;
  readTime: string;
}

const MediumPosts = () => {
  // Sample Medium posts
  const mediumPosts: MediumPost[] = [
    {
      id: 1,
      title: "The Future of Decentralized Finance: Beyond the Hype",
      description: "An in-depth analysis of DeFi's potential impact on traditional financial systems and what the future holds for decentralized applications.",
      date: new Date(2024, 5, 15),
      url: "https://medium.com/@cryptoanalyst/the-future-of-defi",
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "NFTs: More Than Just Digital Art",
      description: "Exploring the practical applications of NFTs beyond the art world, including real estate, identity verification, and supply chain management.",
      date: new Date(2024, 5, 10),
      url: "https://medium.com/@cryptoanalyst/nfts-practical-applications",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Navigating Crypto Volatility: Strategies for Long-term Investors",
      description: "Key strategies to manage risk and capitalize on opportunities in the volatile cryptocurrency market for those with a long-term investment horizon.",
      date: new Date(2024, 5, 5),
      url: "https://medium.com/@cryptoanalyst/crypto-volatility-strategies",
      imageUrl: "https://images.unsplash.com/photo-1641580516455-6c2ab0db1579?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      readTime: "10 min read"
    }
  ];

  return (
    <div className="space-y-6">
      {mediumPosts.map((post) => (
        <Card 
          key={post.id}
          className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors overflow-hidden"
        >
          <div className="md:flex gap-6">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <div className="h-48 md:h-full w-full rounded-lg overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-2/3 flex flex-col">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.date, "MMM d, yyyy")}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
              
              <p className="text-gray-400 mb-6">{post.description}</p>
              
              <div className="mt-auto">
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="text-crypto-blue border-crypto-blue hover:bg-crypto-blue/10 flex gap-2 items-center">
                    Read on Medium
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MediumPosts;
