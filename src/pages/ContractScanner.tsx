
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, ShieldAlert, Bug, Code, FileText, Database } from "lucide-react";

const ContractScanner = () => {
  const [contractAddress, setContractAddress] = useState("");

  const handleScan = () => {
    // TODO: Implement contract scanning logic
    console.log("Scanning contract:", contractAddress);
  };

  const securityMetrics = [
    {
      icon: Shield,
      title: "Security Score",
      value: "N/A",
      description: "Overall security rating",
    },
    {
      icon: ShieldAlert,
      title: "Critical Issues",
      value: "0",
      description: "High-severity vulnerabilities",
    },
    {
      icon: Bug,
      title: "Vulnerabilities",
      value: "0",
      description: "Known security issues",
    },
    {
      icon: Code,
      title: "Code Quality",
      value: "N/A",
      description: "Source code analysis",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Contract Scanner</h1>
          <p className="text-gray-400">
            Analyze and audit smart contracts for security vulnerabilities
          </p>
        </div>

        {/* Search Section */}
        <Card className="bg-crypto-dark border-crypto-gray">
          <CardHeader>
            <CardTitle className="text-white">Scan Contract</CardTitle>
            <CardDescription>
              Enter a contract address to begin the security analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter contract address (0x...)"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="flex-1 bg-crypto-gray border-crypto-gray text-white"
              />
              <Button
                onClick={handleScan}
                className="bg-crypto-blue hover:bg-crypto-blue/80"
              >
                Scan Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {securityMetrics.map((metric) => (
            <Card
              key={metric.title}
              className="bg-crypto-dark border-crypto-gray"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-crypto-gray rounded-lg">
                    <metric.icon className="h-6 w-6 text-crypto-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      {metric.title}
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      {metric.value}
                    </h3>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Section - Initially Empty */}
        <Card className="bg-crypto-dark border-crypto-gray">
          <CardHeader>
            <CardTitle className="text-white">Scan Results</CardTitle>
            <CardDescription>
              Security analysis results will appear here after scanning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Database className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-400">
                Enter a contract address above to begin scanning
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ContractScanner;
