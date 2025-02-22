
import { Card } from "@/components/ui/card";
import { ProjectCard } from "./ProjectCard";

interface ProjectSectionProps {
  title: string;
  count: number;
  projects: any[];
}

export const ProjectSection = ({ title, count, projects }: ProjectSectionProps) => {
  return (
    <Card className="p-6 bg-crypto-gray/95 border-crypto-blue">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <span className="px-2 py-1 bg-crypto-dark rounded-full text-sm font-medium text-crypto-blue">
            {count}
          </span>
        </div>
      </div>
      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No projects available in this category
        </div>
      )}
    </Card>
  );
};
