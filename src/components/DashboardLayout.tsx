
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useState } from "react";
import Footer from "./Footer";
import AIChatBox from "./chat/AIChatBox";
import { supabase } from "@/integrations/supabase/client";
import TopNav from "./navigation/TopNav";
import { mainMenuItems, traderMenuItems, investorMenuItems, learnerMenuItems } from "./navigation/MainMenu";
import ToolsMenu from "./navigation/ToolsMenu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => supabase.auth.getUser());

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-black text-white">
        {/* Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#143442] to-[#0A1A21] backdrop-blur-lg">
          <TopNav user={user} />
          <ToolsMenu />
        </div>

        <div className="flex pt-32 flex-1">
          {/* Left Sidebar */}
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

              {/* Trader Menu */}
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

              {/* Investor Menu */}
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

              {/* Learner Menu */}
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
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 p-8">
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
