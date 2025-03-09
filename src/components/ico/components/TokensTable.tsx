
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Star } from "lucide-react";
import { ICOProject } from "@/types/ico";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface TokensTableProps {
  projects: ICOProject[];
  onSelectProject: (project: ICOProject) => void;
}

// Sample data for the mini chart - in a real app, this would come from your API
const generateMockChartData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 100 + 50
  }));
};

// Helper function to check if a token was issued in 2024 or later
const isRecentToken = (date: string | undefined | null): boolean => {
  if (!date) return false;
  const tokenDate = new Date(date);
  const startOf2024 = new Date('2024-01-01');
  return tokenDate >= startOf2024;
};

const TokensTable = ({ projects, onSelectProject }: TokensTableProps) => {
  // Sort projects to show tokens from 2024 first
  const sortedProjects = [...projects].sort((a, b) => {
    // Check if token A is from 2024 or later
    const aIsRecent = isRecentToken(a["ICO date"]);
    // Check if token B is from 2024 or later
    const bIsRecent = isRecentToken(b["ICO date"]);
    
    // If only one is recent, prioritize it
    if (aIsRecent && !bIsRecent) return -1;
    if (!aIsRecent && bIsRecent) return 1;
    
    // If both are recent or both are not, sort by date (newest first)
    if (a["ICO date"] && b["ICO date"]) {
      return new Date(b["ICO date"]).getTime() - new Date(a["ICO date"]).getTime();
    }
    
    return 0;
  });

  return (
    <Card className="p-6 bg-zinc-900/90 border-crypto-blue">
      <h3 className="text-lg font-semibold text-white mb-4">Token Overview</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-zinc-800">
              <TableHead className="bg-zinc-900 text-gray-400 font-medium w-[50px]">#</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium">Name</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium text-right">Price</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium text-right">Issued Date</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium text-right">Status</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium w-[150px]">Price Graph</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project, index) => {
              const mockChartData = generateMockChartData();
              const isPositive = project.isHighlighted;
              const isNew2024 = isRecentToken(project["ICO date"]);
              
              return (
                <TableRow 
                  key={index} 
                  className={`cursor-pointer border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors ${isNew2024 ? 'bg-green-900/10' : ''}`}
                  onClick={() => onSelectProject(project)}
                >
                  <TableCell className="font-medium text-gray-300">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-gray-500 hover:text-yellow-500 transition-colors" />
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-crypto-blue to-crypto-green flex items-center justify-center text-xs">
                        {project["Project Name"]?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          {project["Project Name"]}
                          {isNew2024 && (
                            <span className="text-xs px-2 py-0.5 bg-green-500 text-black rounded-full font-semibold">
                              2024
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">{project.Platform}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-white">
                    {project.value}
                  </TableCell>
                  <TableCell className="text-right font-medium text-white">
                    {project["ICO date"] ? new Date(project["ICO date"]).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    {project.isHighlighted ? (
                      <span className="inline-flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500">
                        <TrendingDown className="h-4 w-4" /> Inactive
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="h-[40px] w-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData}>
                          <defs>
                            <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={isPositive ? "#34D399" : "#EF4444"} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={isPositive ? "#34D399" : "#EF4444"} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={isPositive ? "#34D399" : "#EF4444"} 
                            fillOpacity={1} 
                            fill={`url(#gradient-${index})`} 
                            strokeWidth={1.5}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TokensTable;
