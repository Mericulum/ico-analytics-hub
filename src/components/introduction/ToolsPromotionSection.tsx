
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, BarChart2, LineChart, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ToolsPromotionSection = () => {
  const navigate = useNavigate();

  const tools = [
    {
      name: "Crypto Calculator",
      description: "Predict potential returns on your investments with our advanced calculator. Input your investment amount, timeframe, and risk tolerance to get personalized projections.",
      icon: Calculator,
      color: "from-crypto-blue to-purple-500",
      path: "/calculator"
    },
    {
      name: "Crypto Comparison",
      description: "Compare cryptocurrencies side by side with our powerful comparison tool. Analyze metrics, trends, and key performance indicators to make informed decisions.",
      icon: BarChart2,
      color: "from-crypto-green to-teal-500",
      path: "/compare"
    }
  ];

  const userTypes = [
    {
      type: "Trader",
      icon: LineChart,
      description: "Get real-time data and technical indicators to maximize your short-term trading strategies.",
      benefits: [
        "Real-time price alerts",
        "Technical analysis indicators",
        "Volatility tracking",
        "Profit/loss scenario modeling"
      ],
      color: "bg-pink-500/10 border-pink-500/20 text-pink-400"
    },
    {
      type: "Investor",
      icon: Briefcase,
      description: "Track long-term performance metrics and fundamental analysis for strategic investments.",
      benefits: [
        "Long-term growth projections",
        "Risk assessment tools",
        "Diversification analysis",
        "Market cycle indicators"
      ],
      color: "bg-amber-500/10 border-amber-500/20 text-amber-400"
    },
    {
      type: "Learner",
      icon: GraduationCap,
      description: "Explore educational resources and practice with simulated portfolios to build your crypto knowledge.",
      benefits: [
        "Simplified explanations",
        "Risk-free practice scenarios",
        "Guided comparison tutorials",
        "Educational insights"
      ],
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    }
  ];

  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-0 w-1/2 h-1/2 bg-crypto-blue rounded-full blur-[150px] animate-pulse" style={{animationDelay: "0.5s"}} />
        <div className="absolute right-1/4 bottom-0 w-1/2 h-1/2 bg-crypto-green rounded-full blur-[150px] animate-pulse" style={{animationDelay: "0s"}} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">
            Powerful Tools for Smart Decisions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our specialized tools are designed to empower you with data-driven insights and actionable intelligence
          </p>
        </div>

        {/* Tools section */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {tools.map((tool, index) => (
            <Card 
              key={index}
              className="group p-6 bg-crypto-dark/50 backdrop-blur-sm border border-crypto-blue/20 hover:border-crypto-blue/40 transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} shadow-lg`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{tool.name}</h3>
                </div>
                
                <p className="text-gray-300 mb-6 flex-grow">
                  {tool.description}
                </p>
                
                <Button 
                  onClick={() => navigate(tool.path)}
                  className="w-full bg-crypto-blue/20 hover:bg-crypto-blue/30 border border-crypto-blue/40 text-white"
                >
                  Try {tool.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* User types section */}
        <h3 className="text-3xl font-bold text-center mb-10 text-white">
          Tools Tailored for Every Crypto Enthusiast
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {userTypes.map((userType, index) => (
            <div key={index} className={`p-6 rounded-lg ${userType.color} border`}>
              <div className="flex items-center gap-3 mb-4">
                <userType.icon className="h-6 w-6" />
                <h4 className="text-xl font-semibold">{userType.type}</h4>
              </div>
              
              <p className="text-sm text-gray-200 mb-4">
                {userType.description}
              </p>
              
              <ul className="space-y-2">
                {userType.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-crypto-blue">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsPromotionSection;
