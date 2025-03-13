
import { SidebarProvider, SidebarContent, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import AIChatBox from "./chat/AIChatBox";
import { supabase } from "@/integrations/supabase/client";
import TopNav from "./navigation/TopNav";
import VerticalNav from "./navigation/VerticalNav";

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <main 
      className={`flex-1 pt-24 p-8 transition-all duration-300 ${
        isCollapsed ? "pl-16" : "pl-[240px]"
      }`}
    >
      {children}
    </main>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => supabase.auth.getUser());
  const [selectedIdentity, setSelectedIdentity] = useState("");

  // Load the selected identity from localStorage on component mount
  useEffect(() => {
    const savedIdentity = localStorage.getItem("userIdentity");
    if (savedIdentity) {
      setSelectedIdentity(savedIdentity);
    }
  }, []);

  const handleIdentityChange = (identity: string) => {
    setSelectedIdentity(identity);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#143442] text-white">
        {/* Top Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A1A21] backdrop-blur-lg">
          <TopNav user={user} onIdentityChange={handleIdentityChange} />
        </div>

        {/* Vertical Navigation */}
        <VerticalNav selectedIdentity={selectedIdentity} />

        {/* Main Content */}
        <DashboardContent>{children}</DashboardContent>

        {/* Footer */}
        <Footer />

        {/* AI Chat Box */}
        <AIChatBox />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
