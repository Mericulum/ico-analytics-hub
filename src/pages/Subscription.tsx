import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import SubscriptionTier from "@/components/subscription/SubscriptionTier";
import BasicSignupDialog from "@/components/subscription/BasicSignupDialog";
import PremiumSignupDialog from "@/components/subscription/PremiumSignupDialog";
import AdvancedSignupDialog from "@/components/subscription/AdvancedSignupDialog";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params: {
        event_category: string;
        event_label: string;
        value?: number;
      }
    ) => void;
  }
}

const SubscriptionPage = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showBasicSignupDialog, setShowBasicSignupDialog] = useState(false);
  const [showPremiumSignupDialog, setShowPremiumSignupDialog] = useState(false);
  const [showAdvancedSignupDialog, setShowAdvancedSignupDialog] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);

  const tiers = [
    {
      name: "Basic",
      price: "Free",
      priceId: null,
      features: [
        "Access to basic ICO listings",
        "Limited portfolio tracking",
        "Basic calculator tools",
        "Public news feed"
      ],
      buttonText: "Get Started",
      highlighted: false
    },
    {
      name: "Premium",
      price: "$19/month",
      priceId: "price_1QbOJzQjoDZWLsXdFOX1Ubk1",
      features: [
        "All Basic features",
        "Advanced portfolio analytics",
        "Priority ICO alerts",
        "Detailed project comparisons",
        "Premium news access"
      ],
      buttonText: "Subscribe Now",
      highlighted: true
    },
    {
      name: "Advanced",
      price: "$49/month",
      priceId: "price_1QbOKNQjoDZWLsXdnELR9mD5",
      features: [
        "All Premium features",
        "API access",
        "Custom alerts",
        "Priority support",
        "Early access to new features",
        "Advanced market analytics"
      ],
      buttonText: "Subscribe Now",
      highlighted: false
    }
  ];

  const handleSubscribe = async (priceId: string | null, tierName: string) => {
    // Track tier selection event
    if (window.gtag) {
      window.gtag('event', 'select_tier', {
        event_category: 'subscription',
        event_label: tierName,
        value: tierName === 'Basic' ? 0 : tierName === 'Premium' ? 19 : 49
      });
    }

    setSelectedTier(tierName);
    setSelectedPriceId(priceId);
    
    switch(tierName) {
      case "Basic":
        setShowBasicSignupDialog(true);
        break;
      case "Premium":
        setShowPremiumSignupDialog(true);
        break;
      case "Advanced":
        setShowAdvancedSignupDialog(true);
        break;
    }
  };

  const handleStripeCheckout = async (userId: string) => {
    if (!selectedPriceId) {
      toast.error('No subscription plan selected');
      return;
    }

    if (!userId) {
      toast.error('User not authenticated');
      return;
    }

    try {
      console.log('Creating checkout session for user:', userId);
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId: selectedPriceId,
          userId 
        }
      });
      
      if (error) {
        console.error('Checkout error:', error);
        toast.error('Error creating checkout session');
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error('Invalid checkout response:', data);
        toast.error('Invalid checkout response');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Error processing subscription');
    }
  };

  return (
    <DashboardLayout>
      <div className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-crypto-blue mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {tiers.map((tier) => (
            <SubscriptionTier
              key={tier.name}
              {...tier}
              isSelected={selectedTier === tier.name}
              onSelect={() => handleSubscribe(tier.priceId, tier.name)}
            />
          ))}
        </div>
        
        <BasicSignupDialog
          open={showBasicSignupDialog}
          onOpenChange={setShowBasicSignupDialog}
        />
        
        <PremiumSignupDialog
          open={showPremiumSignupDialog}
          onOpenChange={setShowPremiumSignupDialog}
          onSuccess={handleStripeCheckout}
        />
        
        <AdvancedSignupDialog
          open={showAdvancedSignupDialog}
          onOpenChange={setShowAdvancedSignupDialog}
          onSuccess={handleStripeCheckout}
        />
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;