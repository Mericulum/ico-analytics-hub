
import { Route, BookOpen, GraduationCap, Compass, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const RoadmapSection = () => {
  const roadmapSteps = [
    {
      icon: BookOpen,
      title: "Fundamentals",
      description: "Learn the basic concepts and terminology of blockchain and cryptocurrency",
      details: [
        "Understanding blockchain technology and distributed ledgers",
        "Exploring Bitcoin and its foundational principles",
        "Learning about wallets, keys, and basic security",
        "Grasping the concept of decentralization and consensus mechanisms"
      ]
    },
    {
      icon: Compass,
      title: "Exploration",
      description: "Discover different cryptocurrencies, tokens, and their use cases",
      details: [
        "Exploring Ethereum and smart contracts",
        "Understanding different types of tokens (ERC-20, ERC-721, etc.)",
        "Learning about DeFi (Decentralized Finance) applications",
        "Investigating NFTs and their marketplace"
      ]
    },
    {
      icon: Route,
      title: "Advanced Concepts",
      description: "Dive deeper into technical aspects and investment strategies",
      details: [
        "Exploring Layer 2 solutions and scaling technologies",
        "Understanding tokenomics and cryptocurrency valuation",
        "Learning about crypto trading strategies and risk management",
        "Investigating staking, yield farming, and liquidity provision"
      ]
    },
    {
      icon: GraduationCap,
      title: "Mastery",
      description: "Become proficient in blockchain development or sophisticated trading",
      details: [
        "Learning to develop smart contracts and dApps",
        "Understanding blockchain governance and economics",
        "Exploring advanced trading techniques and portfolio management",
        "Keeping up with emerging trends and technological advancements"
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-20 relative">
      <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-crypto-blue rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-crypto-green rounded-full blur-[100px] opacity-20"></div>
      
      <style jsx>{`
        @keyframes height-change {
          0% { height: var(--height); }
          50% { height: calc(var(--height) * 1.3); }
          100% { height: var(--height); }
        }
      `}</style>
      
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Crypto Learning Roadmap</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Follow this structured path to build your knowledge from blockchain basics to crypto mastery
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roadmapSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="bg-crypto-dark border-crypto-blue p-0 overflow-hidden">
                <div className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-crypto-blue/5 rounded-full -mr-16 -mt-16"></div>
                  
                  <div className="flex items-start gap-4 mb-4 relative">
                    <div className="w-12 h-12 rounded-full bg-crypto-blue/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-crypto-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        Step {index + 1}: {step.title}
                      </h3>
                      <p className="text-gray-400 mt-1">{step.description}</p>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="border-t border-crypto-blue/30 mt-4 pt-2">
                    <AccordionItem value="details" className="border-b-0">
                      <AccordionTrigger className="text-crypto-blue hover:text-crypto-blue/80 py-2">
                        Learning Objectives
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-gray-300">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-crypto-blue mt-1 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                <div className="bg-crypto-dark border-t border-crypto-blue/30 px-6 py-3 flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {index === 0 ? 'Beginner' : index === 1 ? 'Intermediate' : index === 2 ? 'Advanced' : 'Expert'}
                  </span>
                  <div className="text-crypto-blue text-sm">
                    {index + 1}/4
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            Ready to start your crypto learning journey? Our structured resources will guide you every step of the way.
          </p>
          <div className="inline-flex gap-4">
            <a 
              href="/research" 
              className="bg-crypto-blue hover:bg-crypto-blue/80 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
            >
              Start Learning
            </a>
            <a 
              href="/blog" 
              className="border border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10 px-6 py-3 rounded-md font-medium transition-colors duration-300"
            >
              Browse Articles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
