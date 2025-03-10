
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useState } from "react";
import Footer from "./Footer";
import AIChatBox from "./chat/AIChatBox";
import { supabase } from "@/integrations/supabase/client";
import TopNav from "./navigation/TopNav";
import { mainMenuItems, traderMenuItems, investorMenuItems, learnerMenuItems, UserSection } from "./navigation/MainMenu";
import ToolsMenu from "./navigation/ToolsMenu";
import SectionSelector from "./navigation/SectionSelector";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => supabase.auth.getUser());
  const [activeSection, setActiveSection] = useState<UserSection>("trader");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-black text-white">
        {/* Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#143442] to-[#0A1A21] backdrop-blur-lg">
          <TopNav user={user} />
          <SectionSelector activeSection={activeSection} onChange={setActiveSection} />
          <ToolsMenu />
        </div>

        <div className="flex pt-40 flex-1">
          {/* Left Sidebar */}
          <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? '-ml-72' : 'ml-0'}`}>
            <Sidebar className="border-r border-white/10 bg-transparent">
              <SidebarContent>
                {/* Main Menu */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-white/70 text-xs uppercase tracking-wider">Main Menu</SidebarGroupLabel>
                  <SidebarMenu>
                    {mainMenuItems.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton asChild tooltip={item.label}>
                          <a
                            href={item.path}
                            className="flex items-center gap-3 text-gray-300 hover:text-crypto-blue transition-colors group"
                          >
                            <item.icon size={18} className="group-hover:text-crypto-blue transition-colors" />
                            <span className="uppercase tracking-wider text-sm">{item.label}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>

                {/* Section-specific menu */}
                {activeSection === "trader" && (
                  <SidebarGroup>
                    <SidebarGroupLabel className="text-white/70 text-xs uppercase tracking-wider">For Traders</SidebarGroupLabel>
                    <SidebarMenu>
                      {traderMenuItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton asChild tooltip={item.label}>
                            <a
                              href={item.path}
                              className="flex items-center gap-3 text-gray-300 hover:text-crypto-blue transition-colors group"
                            >
                              <item.icon size={18} className="group-hover:text-crypto-blue transition-colors" />
                              <span className="uppercase tracking-wider text-sm">{item.label}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroup>
                )}

                {activeSection === "investor" && (
                  <SidebarGroup>
                    <SidebarGroupLabel className="text-white/70 text-xs uppercase tracking-wider">For Investors</SidebarGroupLabel>
                    <SidebarMenu>
                      {investorMenuItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton asChild tooltip={item.label}>
                            <a
                              href={item.path}
                              className="flex items-center gap-3 text-gray-300 hover:text-crypto-blue transition-colors group"
                            >
                              <item.icon size={18} className="group-hover:text-crypto-blue transition-colors" />
                              <span className="uppercase tracking-wider text-sm">{item.label}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroup>
                )}

                {activeSection === "learner" && (
                  <SidebarGroup>
                    <SidebarGroupLabel className="text-white/70 text-xs uppercase tracking-wider">For Learners</SidebarGroupLabel>
                    <SidebarMenu>
                      {learnerMenuItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton asChild tooltip={item.label}>
                            <a
                              href={item.path}
                              className="flex items-center gap-3 text-gray-300 hover:text-crypto-blue transition-colors group"
                            >
                              <item.icon size={18} className="group-hover:text-crypto-blue transition-colors" />
                              <span className="uppercase tracking-wider text-sm">{item.label}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroup>
                )}
              </SidebarContent>
            </Sidebar>
          </div>

          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="h-8 w-8 rounded-full bg-crypto-blue/20 text-crypto-blue flex items-center justify-center fixed left-0 ml-4 mt-4 z-40 border border-crypto-blue/40 hover:bg-crypto-blue/30 transition-all"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* Main Content */}
          <main className={`flex-1 p-8 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-0' : 'ml-4'}`}>
            {children}
          </main>
        </div>

        {/* Footer */}
        <Footer />

        {/* AI Chat Box */}
        <AIChatBox />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
