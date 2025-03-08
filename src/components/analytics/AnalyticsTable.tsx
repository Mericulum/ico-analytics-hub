
import { ICOProject } from "@/types/ico";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface AnalyticsTableProps {
  projects: ICOProject[];
  sortField: keyof ICOProject | "";
  sortDirection: "asc" | "desc";
  onSort: (field: keyof ICOProject) => void;
}

export const AnalyticsTable = ({ 
  projects, 
  sortField, 
  sortDirection,
  onSort
}: AnalyticsTableProps) => {
  const handleSort = (field: keyof ICOProject) => {
    onSort(field);
  };

  return (
    <Card className="p-6 bg-black border-crypto-gray text-white">
      <h3 className="text-lg font-semibold text-white mb-4">ICO Projects Overview</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("Project Name" as keyof ICOProject)}
              >
                Project Name
                {sortField === "Project Name" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("Platform" as keyof ICOProject)}
              >
                Platform
                {sortField === "Platform" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("Price" as keyof ICOProject)}
              >
                Price
                {sortField === "Price" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("ROI" as keyof ICOProject)}
              >
                ROI
                {sortField === "ROI" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("ICO date" as keyof ICOProject)}
              >
                ICO Date
                {sortField === "ICO date" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project: ICOProject, index: number) => (
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
  );
};
