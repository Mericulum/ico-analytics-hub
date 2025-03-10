
import { 
  Calculator, BarChart2, Newspaper, Crown, Gamepad2, BookOpen, 
  LineChart, BarChart, ShieldCheck, FileText, TrendingUp, DollarSign,
  GraduationCap, Book, Lightbulb
} from "lucide-react";

// Menu items for general navigation
export const mainMenuItems = [
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: FileText, label: "Blog", path: "/blog" },
  { icon: Crown, label: "Subscription", path: "/subscription" },
  { icon: Gamepad2, label: "Games", path: "/games" },
];

// Menu items specifically for traders
export const traderMenuItems = [
  { icon: LineChart, label: "Market Analysis", path: "/market-analysis" },
  { icon: TrendingUp, label: "Trading Signals", path: "/trading-signals" },
  { icon: BarChart2, label: "Compare", path: "/compare" },
  { icon: Calculator, label: "Calculator", path: "/calculator" },
];

// Menu items specifically for investors
export const investorMenuItems = [
  { icon: BarChart, label: "ICO Dashboard", path: "/ico-dashboard" },
  { icon: ShieldCheck, label: "Scanner", path: "/scanner" },
  { icon: DollarSign, label: "Portfolio", path: "/portfolio" },
];

// Menu items specifically for learners
export const learnerMenuItems = [
  { icon: GraduationCap, label: "Courses", path: "/courses" },
  { icon: Book, label: "Tutorials", path: "/tutorials" },
  { icon: Lightbulb, label: "Tips & Strategies", path: "/tips-strategies" },
];

// Combined tools menu items (for mobile/dropdown usage)
export const toolMenuItems = [
  ...traderMenuItems,
  ...investorMenuItems,
  ...learnerMenuItems
];

const MainMenu = () => null;

export default MainMenu;
