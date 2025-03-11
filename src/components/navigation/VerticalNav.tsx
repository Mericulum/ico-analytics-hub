
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { traderMenuItems, investorMenuItems, learnerMenuItems, toolMenuItems, mainMenuItems } from "./MainMenu";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

interface VerticalNavProps {
  selectedIdentity: string;
}

const VerticalNav = ({ selectedIdentity }: VerticalNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setOpen } = useSidebar();
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    // Load sidebar state from localStorage on component mount
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setOpen(!JSON.parse(savedState));
    }
  }, [setOpen]);

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
        // If no identity is selected, show main menu
        return mainMenuItems;
    }
  };

  const menuItems = getMenuItems();

  // Handle collapse toggle
  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setOpen(isCollapsed);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newCollapsedState));
  };

  // Format identity name for display
  const formatIdentityName = () => {
    if (!selectedIdentity) return "";
    return selectedIdentity.charAt(0).toUpperCase() + selectedIdentity.slice(1);
  };

  return (
    <div className={`fixed left-0 top-20 h-[calc(100vh-8rem)] transition-all duration-300 z-10 ${
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
      <div className="pt-12 px-2 flex flex-col h-full">
        {/* Main Menu Section */}
        <div className="space-y-2 mb-6">
          {selectedIdentity ? (
            <>
              <div className={`mb-2 px-3 ${isCollapsed ? "text-center" : ""}`}>
                <p className={`text-xs uppercase text-crypto-blue font-semibold ${isCollapsed ? "hidden" : "block"}`}>
                  {formatIdentityName()} Menu
                </p>
              </div>
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
            </>
          ) : (
            <div className={`text-center text-sm text-gray-400 ${isCollapsed ? "hidden" : "block"} px-4 py-4`}>
              Select an identity from the top navigation to see relevant menu items
            </div>
          )}
        </div>

        {/* Tools Section */}
        <div className="mt-auto mb-8 space-y-2">
          <div className={`mb-2 px-3 ${isCollapsed ? "text-center" : ""}`}>
            <p className={`text-xs uppercase text-crypto-blue font-semibold ${isCollapsed ? "hidden" : "block"}`}>
              Tools
            </p>
          </div>
          {toolMenuItems.map((item) => (
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
      </div>
    </div>
  );
};

export default VerticalNav;
