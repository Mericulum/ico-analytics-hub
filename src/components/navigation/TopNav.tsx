
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSubscriptionTier } from "@/hooks/useSubscriptionTier";
import { useAuthState } from "@/hooks/useAuthState";
import ProfileMenu from "./ProfileMenu";
import UpgradeButton from "./UpgradeButton";
import { HelpCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";

interface TopNavProps {
  user: any;
  onIdentityChange: (identity: string) => void;
}

const TopNav = ({ user: initialUser, onIdentityChange }: TopNavProps) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthState(initialUser);
  const { subscriptionTier, setSubscriptionTier, checkSubscriptionTier, isLoading } = useSubscriptionTier(user);
  const [selectedIdentity, setSelectedIdentity] = useState<string>("");

  // Load identity from localStorage on component mount
  useEffect(() => {
    const savedIdentity = localStorage.getItem("userIdentity");
    if (savedIdentity) {
      setSelectedIdentity(savedIdentity);
      onIdentityChange(savedIdentity);
    }
  }, [onIdentityChange]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSubscriptionTier(null);
      localStorage.removeItem("userIdentity");
      toast.success("Signed out successfully");
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  const showUpgradeButton = user && subscriptionTier && subscriptionTier !== 'advanced' && !isLoading;

  const handleIdentitySelect = (value: string) => {
    setSelectedIdentity(value);
    onIdentityChange(value);
    
    // Save to localStorage
    localStorage.setItem("userIdentity", value);
    
    toast.success(`You selected: ${value}`);
  };

  return (
    <header className="w-full bg-black border-b border-crypto-gray">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/fc6224c9-4be9-4d1a-b5ad-3da64a81c6e0.png" 
              alt="Mericulum Logo" 
              className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
            />
          </div>

          {/* Flexible spacer */}
          <div className="flex-1"></div>

          {/* Who are you dropdown */}
          <div className="mr-4">
            <Select onValueChange={handleIdentitySelect} value={selectedIdentity}>
              <SelectTrigger className="w-[180px] bg-crypto-dark border-crypto-blue/30 text-white hover:bg-crypto-gray transition-colors">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-crypto-blue" />
                  <SelectValue placeholder="Who are you?" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-crypto-dark border-crypto-blue/20 text-white z-50">
                <SelectItem value="trader" className="hover:text-crypto-blue focus:text-crypto-blue cursor-pointer">
                  Trader
                </SelectItem>
                <SelectItem value="investor" className="hover:text-crypto-blue focus:text-crypto-blue cursor-pointer">
                  Investor
                </SelectItem>
                <SelectItem value="learner" className="hover:text-crypto-blue focus:text-crypto-blue cursor-pointer">
                  Learning Bird
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <UpgradeButton show={showUpgradeButton} />
            <ProfileMenu 
              user={user} 
              subscriptionTier={subscriptionTier}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
