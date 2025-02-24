
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useICOProjects } from "@/services/icoService";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { APIStatus } from "@/components/analytics/APIStatus";
import { AnalyticsTrends } from "@/components/analytics/AnalyticsTrends";
import { IndustryDistribution } from "@/components/analytics/IndustryDistribution";
import { AnalyticsSearch } from "@/components/analytics/AnalyticsSearch";
import { AnalyticsCallToAction } from "@/components/analytics/AnalyticsCallToAction";
import { ICOProject } from "@/types/ico";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Analytics = () => {
  const { data: projects, isLoading } = useICOProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");
  const [filterPriceRange, setFilterPriceRange] = useState("");
  const [filterROIRange, setFilterROIRange] = useState("");
  const [sortField, setSortField] = useState<keyof ICOProject | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project["Project Name"]?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = !filterPlatform || project.Platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  }) || [];

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === "asc" ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-crypto-blue" />
    </div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">ICO Analytics & Data Integration</h1>
              <p className="text-gray-400 mt-1">Uncover trends and insights powered by AI</p>
            </div>
            <AnalyticsSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterPlatform={filterPlatform}
              setFilterPlatform={setFilterPlatform}
              filterPriceRange={filterPriceRange}
              setFilterPriceRange={setFilterPriceRange}
              filterROIRange={filterROIRange}
              setFilterROIRange={setFilterROIRange}
            />
          </div>
        </div>

        <APIStatus />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsTrends />
          <IndustryDistribution />
        </div>

        <Card className="p-6 bg-black border-crypto-gray text-white">
          <h3 className="text-lg font-semibold text-white mb-4">ICO Projects Overview</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>ICO Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProjects.map((project: ICOProject, index: number) => (
                  <TableRow key={project.id || index}>
                    <TableCell className="font-medium">{project["Project Name"] || "Unknown"}</TableCell>
                    <TableCell>{project["Platform"] || "N/A"}</TableCell>
                    <TableCell>${project["Price"]?.toLocaleString() || "N/A"}</TableCell>
                    <TableCell>
                      {project["ROI"] ? (
                        <span className={project["ROI"] > 0 ? "text-green-500" : "text-red-500"}>
                          {project["ROI"]}%
                        </span>
                      ) : "N/A"}
                    </TableCell>
                    <TableCell>{project["ICO date"] || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <AnalyticsCallToAction />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;

