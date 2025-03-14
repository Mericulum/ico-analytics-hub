
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface DashboardTabsProps {
  activeSection: string;
  isAuthenticated: boolean;
  onValueChange: (value: string) => void;
}

const DashboardTabs = ({
  activeSection,
  isAuthenticated,
  onValueChange
}: DashboardTabsProps) => {
  return (
    <ToggleGroup
      type="single"
      value={activeSection}
      onValueChange={(value) => {
        if (value) onValueChange(value);
      }}
      className="flex flex-wrap justify-center gap-2 mb-8"
    >
      <ToggleGroupItem
        value="INTRODUCTION"
        className="px-4 py-2 data-[state=on]:bg-crypto-blue data-[state=on]:text-white"
      >
        Introduction
      </ToggleGroupItem>
      <ToggleGroupItem
        value="ACTIVE"
        className="px-4 py-2 data-[state=on]:bg-crypto-blue data-[state=on]:text-white"
      >
        Active ICOs
      </ToggleGroupItem>
      <ToggleGroupItem
        value="UPCOMING"
        className="px-4 py-2 data-[state=on]:bg-crypto-blue data-[state=on]:text-white"
      >
        Upcoming ICOs
      </ToggleGroupItem>
      <ToggleGroupItem
        value="ENDED"
        className="px-4 py-2 data-[state=on]:bg-crypto-blue data-[state=on]:text-white"
      >
        Ended ICOs
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default DashboardTabs;
