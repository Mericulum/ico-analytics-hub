
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { traderMenuItems, investorMenuItems, learnerMenuItems } from "./MainMenu";
import { Button } from "../ui/button";

interface VerticalNavProps {
  selectedIdentity: string;
}

const VerticalNav = ({ selectedIdentity }: VerticalNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Choose menu items based on selected identity
  const getMenuItems = () => {
    switch (selectedIdentity) {
      case "trader":
        return traderMenuItems;
      case "investor":
        return investorMenuItems;
      case "learner":
        return learnerMenuItems;
      default:
        // If no identity is selected, show empty menu
        return [];
    }
  };

  const menuItems = getMenuItems();

  // Handle collapse toggle
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`fixed left-0 top-32 h-[calc(100vh-8rem)] transition-all duration-300 z-10 ${
      isCollapsed ? "w-16" : "w-60"
    } bg-crypto-dark border-r border-crypto-blue/20`}>
      {/* Toggle button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -right-3 top-4 rounded-full border border-crypto-blue/20 bg-crypto-dark shadow-md"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button>
      
      {/* Menu Items */}
      <div className="pt-12 px-2">
        {selectedIdentity ? (
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center w-full ${
                  isCollapsed ? "justify-center" : "justify-start"
                } p-3 rounded-lg transition-colors ${
                  location.pathname === item.path 
                    ? "bg-crypto-blue/20 text-white" 
                    : "text-gray-300 hover:bg-crypto-blue/10 hover:text-white"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon size={20} className={isCollapsed ? "mx-auto" : "mr-3"} />
                {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
              </button>
            ))}
          </div>
        ) : (
          <div className={`text-center text-sm text-gray-400 ${isCollapsed ? "hidden" : "block"} px-4 py-8`}>
            Select an identity from the top navigation to see relevant menu items
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalNav;
