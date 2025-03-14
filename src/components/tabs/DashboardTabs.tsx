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
  return;
};
export default DashboardTabs;