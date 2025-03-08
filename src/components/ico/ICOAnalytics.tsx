
import { useState, useEffect } from "react";
import { useICOProjects } from "@/services/icoService";
import { useBinanceICOProjects, createBinanceWebSocket } from "@/services/binanceService";
import { Loader2 } from "lucide-react";
import SearchAndFilter from "./components/SearchAndFilter";
import MarketStats from "./components/MarketStats";
import MarketCharts from "./components/MarketCharts";
import TokensTable from "./components/TokensTable";
import TokenDetailsModal from "./components/TokenDetailsModal";
import { ICOProject } from "@/types/ico";
import { toast } from "sonner";

const ICOAnalytics = () => {
  const { data: supabaseProjects, isLoading: isLoadingSupabase } = useICOProjects();
  const { data: binanceProjects, isLoading: isLoadingBinance } = useBinanceICOProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedProject, setSelectedProject] = useState<ICOProject | null>(null);
  const [projects, setProjects] = useState<ICOProject[]>([]);
  const [isRealtime, setIsRealtime] = useState(false);

  // Combine data sources
  useEffect(() => {
    const combinedProjects = [
      ...(binanceProjects || []),
      ...(supabaseProjects || []),
    ];

    // Mark binance projects as realtime
    if (binanceProjects?.length) {
      if (!isRealtime) {
        setIsRealtime(true);
        toast.success("Real-time Binance data connected", {
          description: "Live ICO/IPO data is now available",
        });
      }
    }

    setProjects(combinedProjects);
  }, [binanceProjects, supabaseProjects]);

  // Setup WebSocket for real-time updates if we have Binance projects
  useEffect(() => {
    if (!binanceProjects?.length) return;
    
    // Get symbols for the WebSocket
    const symbols = binanceProjects
      .map(p => p["Project Name"] + "USDT")
      .slice(0, 10); // Limit to 10 for performance
    
    // Create WebSocket
    const ws = createBinanceWebSocket(symbols, (data) => {
      // Handle real-time updates
      if (data.data) {
        const updatedSymbol = data.data.s;
        const updatedPrice = data.data.c;
        
        setProjects(prev => prev.map(project => {
          if (project["Project Name"] + "USDT" === updatedSymbol) {
            return {
              ...project,
              value: `$${parseFloat(updatedPrice).toFixed(2)}`,
              "Price": parseFloat(updatedPrice),
              token_price: updatedPrice
            };
          }
          return project;
        }));
      }
    });
    
    // Cleanup
    return () => {
      ws.close();
    };
  }, [binanceProjects]);

  const isLoading = isLoadingSupabase || isLoadingBinance;

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-crypto-blue" />
    </div>;
  }

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project["Project Name"]?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === "all" || project.Platform === selectedSector;
    return matchesSearch && matchesSector;
  }) || [];

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === "asc" ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
  });

  // Market statistics calculations
  const totalMarketCap = projects?.reduce((acc, curr) => acc + parseFloat(curr.value?.replace('$', '').replace(',', '') || '0'), 0) || 0;
  const totalVolume = projects?.reduce((acc, curr) => {
    const metrics = curr.token_metrics as { volume?: number } || {};
    return acc + (metrics.volume || 0);
  }, 0) || 0;
  const averagePrice = totalMarketCap / (projects?.length || 1);

  // Platform/Sector distribution data
  const platformData = projects?.reduce((acc: Record<string, number>, curr) => {
    if (curr.Platform) {
      acc[curr.Platform] = (acc[curr.Platform] || 0) + parseFloat(curr.value?.replace('$', '').replace(',', '') || '0');
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(platformData || {}).map(([name, value]) => ({
    name,
    value: value as number
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          ICO Dashboard
          {isRealtime && (
            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded inline-flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
              Live Data
            </span>
          )}
        </h2>
      </div>

      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        platforms={Object.keys(platformData || {})}
      />

      <MarketStats
        totalMarketCap={totalMarketCap}
        totalVolume={totalVolume}
        averagePrice={averagePrice}
      />

      <MarketCharts
        pieChartData={pieChartData}
        barChartData={sortedProjects}
      />

      <TokensTable
        projects={sortedProjects}
        onSelectProject={setSelectedProject}
      />

      <TokenDetailsModal
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default ICOAnalytics;
