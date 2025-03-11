
import { Calculator, BarChart2, Newspaper, Crown, Gamepad2, BookOpen, LineChart, BarChart, ShieldCheck, FileText } from "lucide-react";

export const mainMenuItems = [
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: BarChart, label: "ICO Dashboard", path: "/ico-dashboard" },
  { icon: ShieldCheck, label: "Scanner", path: "/scanner" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: FileText, label: "Blog", path: "/blog" },
  { icon: Crown, label: "Subscription", path: "/subscription" },
  { icon: Gamepad2, label: "Games", path: "/games" },
];

export const toolMenuItems = [
  { icon: Calculator, label: "Calculator", path: "/calculator" },
  { icon: BarChart2, label: "Compare", path: "/compare" },
];

// Menu items grouped by user identity
export const traderMenuItems = [
  { icon: BarChart, label: "ICO Dashboard", path: "/ico-dashboard" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: Calculator, label: "Calculator", path: "/calculator" },
];

export const investorMenuItems = [
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: BarChart, label: "ICO Dashboard", path: "/ico-dashboard" },
  { icon: ShieldCheck, label: "Scanner", path: "/scanner" },
  { icon: FileText, label: "Blog", path: "/blog" },
];

export const learnerMenuItems = [
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: FileText, label: "Blog", path: "/blog" },
  { icon: Gamepad2, label: "Games", path: "/games" },
];

const MainMenu = () => null;

export default MainMenu;
