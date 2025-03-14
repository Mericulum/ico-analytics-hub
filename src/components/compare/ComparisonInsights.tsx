
import React from "react";
import { Card } from "@/components/ui/card";
import { ComparisonConfig } from "@/types/compare";
import { getCryptoById } from './utils/cryptoData';

interface ComparisonInsightsProps {
  config: ComparisonConfig;
}

const ComparisonInsights: React.FC<ComparisonInsightsProps> = ({ config }) => {
  const { cryptos: cryptoIds } = config;
  const cryptos = cryptoIds.map(id => getCryptoById(id)).filter(Boolean);
  
  if (cryptos.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Please select at least one cryptocurrency to generate insights
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 border-crypto-gray bg-black/20">
        <h3 className="text-lg font-medium mb-4">AI-Generated Insights</h3>
        <p className="text-muted-foreground mb-4">
          Here are some AI-generated insights based on your selected cryptocurrencies:
        </p>
        
        <div className="space-y-4">
          {cryptos.map(crypto => crypto && (
            <div key={crypto.id} className="space-y-2">
              <h4 className="font-medium" style={{ color: crypto.color }}>
                {crypto.name} ({crypto.symbol})
              </h4>
              <p className="text-sm">{crypto.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <h5 className="text-xs text-muted-foreground mb-1">Strengths</h5>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    {crypto.category === 'Layer 1' && (
                      <>
                        <li>Strong foundation for dApps development</li>
                        <li>High scalability potential</li>
                      </>
                    )}
                    {crypto.category === 'DeFi' && (
                      <>
                        <li>Innovative financial applications</li>
                        <li>Growing ecosystem of services</li>
                      </>
                    )}
                    {crypto.category === 'Store of Value' && (
                      <>
                        <li>Proven track record of stability</li>
                        <li>Strong network effects</li>
                      </>
                    )}
                    {crypto.category === 'Memecoin' && (
                      <>
                        <li>Strong community engagement</li>
                        <li>Viral marketing potential</li>
                      </>
                    )}
                    {crypto.technicalData.scalability > 7 && (
                      <li>Excellent scalability metrics</li>
                    )}
                    {crypto.riskData.decentralizationLevel > 7 && (
                      <li>Highly decentralized network</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-xs text-muted-foreground mb-1">Challenges</h5>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    {crypto.technicalData.energyConsumption > 50 && (
                      <li>High energy consumption</li>
                    )}
                    {crypto.riskData.volatility > 7 && (
                      <li>High price volatility</li>
                    )}
                    {crypto.riskData.regulatoryCompliance < 5 && (
                      <li>Potential regulatory challenges</li>
                    )}
                    {crypto.technicalData.scalability < 5 && (
                      <li>Scalability limitations</li>
                    )}
                    {crypto.category === 'Memecoin' && (
                      <li>Limited technical utility</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="p-6 border-crypto-gray bg-black/20">
        <h3 className="text-lg font-medium mb-4">Market Trend Analysis</h3>
        <p className="text-sm">
          Based on the selected cryptocurrencies, here are some market trends to consider:
        </p>
        
        <ul className="list-disc pl-4 mt-4 space-y-2 text-sm">
          <li>
            <span className="font-medium">Adoption Trajectory:</span> {' '}
            {cryptos.some(c => c?.adoptionData.developerActivity > 7) 
              ? 'Strong developer activity suggests growing ecosystem adoption.' 
              : 'Developer activity appears moderate, which may impact future growth.'}
          </li>
          <li>
            <span className="font-medium">Institutional Interest:</span> {' '}
            {cryptos.some(c => c?.adoptionData.institutionalInterest > 7) 
              ? 'High institutional interest indicates mainstream financial adoption.' 
              : 'Limited institutional backing may result in higher volatility.'}
          </li>
          <li>
            <span className="font-medium">Regulatory Landscape:</span> {' '}
            {cryptos.some(c => c?.riskData.regulatoryCompliance < 5) 
              ? 'Potential regulatory challenges could impact short-term performance.' 
              : 'Strong regulatory compliance positioning for stability.'}
          </li>
          <li>
            <span className="font-medium">Sustainability Outlook:</span> {' '}
            {cryptos.some(c => c?.sustainabilityData.energyEfficiency > 7) 
              ? 'Energy-efficient protocols align with growing ESG concerns.' 
              : 'Energy consumption profiles may face increased scrutiny.'}
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ComparisonInsights;
