
import { Calculator, BarChart2, Newspaper, Crown, Gamepad2, BookOpen, LineChart, BarChart, ShieldCheck } from "lucide-react";

export const mainMenuItems = [
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: BarChart, label: "ICO Dashboard", path: "/ico-dashboard" },
  { icon: ShieldCheck, label: "Scanner", path: "/scanner" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: Crown, label: "Subscription", path: "/subscription" },
  { icon: Gamepad2, label: "Games", path: "/games" },
];

export const toolMenuItems = [
  { icon: Calculator, label: "Calculator", path: "/calculator" },
  { icon: BarChart2, label: "Compare", path: "/compare" },
];

const MainMenu = () => null;

export default MainMenu;
