
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface DashboardTabsProps {
  activeSection: string;
  isAuthenticated: boolean;
  onValueChange: (value: string) => void;
}

const DashboardTabs = ({ activeSection, isAuthenticated, onValueChange }: DashboardTabsProps) => {
  return (
    <div className="w-full bg-black/40 backdrop-blur-sm border-b border-crypto-blue/20 py-4 sticky top-16 z-10">
      <div className="container mx-auto px-4">
        <ToggleGroup
          type="single"
          value={activeSection}
          onValueChange={(value) => {
            if (value) onValueChange(value);
          }}
          className="justify-start gap-2"
        >
          {isAuthenticated && (
            <>
              <ToggleGroupItem 
                value="ACTIVE" 
                aria-label="Show active projects"
                className="px-6 py-2 rounded-full data-[state=on]:bg-crypto-blue data-[state=on]:text-white hover:bg-crypto-blue/20 transition-all duration-300 text-sm font-medium"
              >
                Active
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="UPCOMING" 
                aria-label="Show upcoming projects"
                className="px-6 py-2 rounded-full data-[state=on]:bg-crypto-green data-[state=on]:text-white hover:bg-crypto-green/20 transition-all duration-300 text-sm font-medium"
              >
                Upcoming
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="ENDED" 
                aria-label="Show ended projects"
                className="px-6 py-2 rounded-full data-[state=on]:bg-crypto-dark data-[state=on]:text-white hover:bg-crypto-dark/20 transition-all duration-300 text-sm font-medium"
              >
                Ended
              </ToggleGroupItem>
            </>
          )}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default DashboardTabs;
