
import { Card } from "@/components/ui/card";
import { Brain, Activity, BarChart3, Layout, Share2, Database, Gem, Shield, Coins, Wallet } from "lucide-react";

const features = [
  {
    title: "Smart Predictions with AI",
    description: "Our AI helps you make better decisions by analyzing market data. Users who follow our AI predictions see up to 28% higher returns on average.",
    icon: Brain,
    advantage: "Make smarter investment choices",
    animation: (
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-12">
          <div className="absolute left-0 w-4 h-4 bg-[#4AA8FF] rounded-full animate-[bounce_1.5s_infinite]"></div>
          <div className="absolute left-1/4 w-4 h-4 bg-[#4AA8FF] rounded-full animate-[bounce_1.7s_0.2s_infinite]"></div>
          <div className="absolute left-2/4 w-4 h-4 bg-[#4AA8FF] rounded-full animate-[bounce_1.6s_0.4s_infinite]"></div>
          <div className="absolute left-3/4 w-4 h-4 bg-[#4AA8FF] rounded-full animate-[bounce_1.8s_0.6s_infinite]"></div>
          <div className="absolute right-0 w-4 h-4 bg-[#4AA8FF] rounded-full animate-[bounce_1.5s_0.8s_infinite]"></div>
        </div>
      </div>
    )
  },
  {
    title: "Real-Time Market Updates",
    description: "See what's happening on the blockchain right now. Our users identify profitable trends 15 minutes faster than the average trader, giving you a crucial edge.",
    icon: Activity,
    advantage: "Act before the market moves",
    animation: (
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <div className="w-full h-12 relative">
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#33C3F0]"></div>
          <div className="absolute bottom-0 left-0 w-1 h-3 bg-[#33C3F0] animate-[height-change_3s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-[10%] w-1 h-4 bg-[#33C3F0] animate-[height-change_3s_0.2s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-[20%] w-1 h-2 bg-[#33C3F0] animate-[height-change_3s_0.4s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-[30%] w-1 h-5 bg-[#33C3F0] animate-[height-change_3s_0.6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-[40%] w-1 h-3 bg-[#33C3F0] animate-[height-change_3s_0.8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-[50%] w-1 h-6 bg-[#33C3F0] animate-[height-change_3s_1s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-[60%] w-1 h-4 bg-[#33C3F0] animate-[height-change_3s_1.2s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-[70%] w-1 h-7 bg-[#33C3F0] animate-[height-change_3s_1.4s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-[80%] w-1 h-5 bg-[#33C3F0] animate-[height-change_3s_1.6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-[90%] w-1 h-8 bg-[#33C3F0] animate-[height-change_3s_1.8s_ease-in-out_infinite]"></div>
        </div>
      </div>
    )
  },
  {
    title: "Expert Market Analysis",
    description: "Get professional-level insights without being an expert. Our members make 32% fewer costly mistakes compared to self-directed investors.",
    icon: BarChart3,
    advantage: "Avoid common investment errors",
    animation: (
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <div className="w-full h-12 flex items-end space-x-1">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="flex-1 bg-gradient-to-t from-[#4AA8FF] to-[#33C3F0] rounded-t"
              style={{ 
                height: `${Math.sin(i * 0.8) * 30 + 40}%`,
                animation: `pulse ${1 + (i * 0.1)}s ease-in-out infinite alternate ${i * 0.1}s` 
              }}
            ></div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Your Way, Your Dashboard",
    description: "Create alerts that matter to you. Members using our custom alerts earn up to 42% more on quick opportunities that most traders miss.",
    icon: Layout,
    advantage: "Never miss a profitable moment",
    animation: (
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <div className="grid grid-cols-2 gap-1 w-full">
          <div className="bg-[#4AA8FF]/20 h-5 rounded animate-pulse"></div>
          <div className="bg-[#33C3F0]/20 h-5 rounded animate-[pulse_2s_0.5s_infinite]"></div>
          <div className="bg-[#33C3F0]/20 h-5 rounded animate-[pulse_2s_1s_infinite]"></div>
          <div className="bg-[#4AA8FF]/20 h-5 rounded animate-[pulse_2s_1.5s_infinite]"></div>
        </div>
      </div>
    )
  },
  {
    title: "Social Trends Analysis",
    description: "Know what the market is feeling before prices move. Members using our sentiment analysis are 53% more likely to exit risky positions before major downturns.",
    icon: Share2,
    advantage: "Predict market movements early",
    animation: (
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-12">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#4AA8FF]/30 rounded-full"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#4AA8FF]/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          
          <div className="absolute left-[60%] top-[30%] w-2 h-2 bg-[#33C3F0] rounded-full"></div>
          <div className="absolute left-[40%] top-[40%] w-2 h-2 bg-[#33C3F0] rounded-full"></div>
          <div className="absolute left-[70%] top-[60%] w-2 h-2 bg-[#33C3F0] rounded-full"></div>
          <div className="absolute left-[30%] top-[70%] w-2 h-2 bg-[#33C3F0] rounded-full"></div>
          
          <div className="absolute left-[60%] top-[30%] w-10 h-0.5 bg-[#33C3F0]/50 origin-left animate-[pulse_2s_infinite]" style={{ transform: 'rotate(15deg)' }}></div>
          <div className="absolute left-[40%] top-[40%] w-8 h-0.5 bg-[#33C3F0]/50 origin-right animate-[pulse_2s_0.5s_infinite]" style={{ transform: 'rotate(-10deg)' }}></div>
          <div className="absolute left-[70%] top-[60%] w-12 h-0.5 bg-[#33C3F0]/50 origin-left animate-[pulse_2s_1s_infinite]" style={{ transform: 'rotate(30deg)' }}></div>
          <div className="absolute left-[30%] top-[70%] w-9 h-0.5 bg-[#33C3F0]/50 origin-right animate-[pulse_2s_1.5s_infinite]" style={{ transform: 'rotate(-25deg)' }}></div>
        </div>
      </div>
    )
  },
  {
    title: "Easy Wallet Integration",
    description: "Connect your crypto wallet with one click for real-time tracking. Members who actively track their portfolios with us increase returns by 37% annually.",
    icon: Database,
    advantage: "Track your crypto success easily",
    animation: (
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-12">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Wallet className="h-6 w-6 text-[#4AA8FF]" />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Database className="h-6 w-6 text-[#33C3F0]" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#4AA8FF] to-[#33C3F0] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
            <div className="absolute h-2 w-2 bg-[#4AA8FF] rounded-full animate-[move-right_3s_linear_infinite]"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Reduced Investment Risk",
    description: "Our risk assessment tools help you avoid common pitfalls. Users using our platform report 45% fewer damaging losses compared to their previous strategies.",
    icon: Shield,
    advantage: "Protect your investments",
    animation: (
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <div className="relative w-24 h-12">
          <Shield className="h-10 w-10 text-[#4AA8FF] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute inset-0 border-2 border-[#4AA8FF]/30 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <div className="absolute inset-2 border border-[#33C3F0]/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
        </div>
      </div>
    )
  },
  {
    title: "Built for Beginners & Experts",
    description: "No matter your experience level, our platform works for you. New investors using Mericulum see up to 62% faster learning curve and earlier profitability.",
    icon: Coins,
    advantage: "Start earning sooner",
    animation: (
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-12 flex justify-center">
          <div className="relative">
            <Coins className="h-8 w-8 text-[#33C3F0]" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#4AA8FF] rounded-full animate-ping"></div>
          </div>
          <div className="absolute bottom-0 w-full flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-1 bg-[#4AA8FF] rounded-t"
                style={{ 
                  height: `${5 + (i * 2)}px`,
                  animation: `height-change 2s ease-in-out infinite alternate ${i * 0.2}s` 
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
];

const FeaturesSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#0A1218] via-[#142F3B] to-[#0A1218] py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-[#4AA8FF] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-[#33C3F0] rounded-full blur-[120px] animate-pulse" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#4AA8FF] via-white to-[#33C3F0] bg-clip-text text-transparent">
            Why Choose Mericulum?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Crypto investing doesn't have to be complicated or risky. Our platform makes it simple to understand the blockchain 
            world and invest with confidence. With Mericulum, you're 3x more likely to make profitable trades 
            and 45% less likely to experience significant losses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative p-8 bg-[#0A1218]/50 backdrop-blur-sm border-[#4AA8FF] hover:border-[#33C3F0] transition-all duration-300 overflow-hidden"
            >
              {/* Card background decoration */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4AA8FF] to-[#33C3F0]" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-[#4AA8FF]/10 border border-[#4AA8FF]/20">
                    <feature.icon className="h-6 w-6 text-[#4AA8FF]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  {feature.description}
                </p>
                <div className="mb-4">
                  {feature.animation}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gem className="h-4 w-4 text-[#33C3F0]" />
                  <span className="text-[#33C3F0] font-medium">{feature.advantage}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-[#0A1218]/70 backdrop-blur-sm rounded-lg border border-[#4AA8FF]/20">
            <h3 className="text-2xl font-bold mb-4 text-white">The Mericulum Advantage</h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              Blockchain technology is changing how we think about money, but investing in crypto comes with risks. 
              Our platform helps you navigate these risks while maximizing your opportunities. 
              Subscribers report an average 41% improvement in their investment performance after just 3 months.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-[#4AA8FF]/10 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">41%</div>
                <div className="text-[#33C3F0] text-sm">Average Return Increase</div>
              </div>
              <div className="text-center p-4 bg-[#4AA8FF]/10 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">45%</div>
                <div className="text-[#33C3F0] text-sm">Reduced Risk Exposure</div>
              </div>
              <div className="text-center p-4 bg-[#4AA8FF]/10 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">62%</div>
                <div className="text-[#33C3F0] text-sm">Faster Learning Curve</div>
              </div>
              <div className="text-center p-4 bg-[#4AA8FF]/10 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">15min</div>
                <div className="text-[#33C3F0] text-sm">Early Market Insight</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
