import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BasicSignupDialog from "@/components/subscription/BasicSignupDialog";
import PremiumSignupDialog from "@/components/subscription/PremiumSignupDialog";
import AdvancedSignupDialog from "@/components/subscription/AdvancedSignupDialog";
import SubscriptionHeader from "@/components/subscription/SubscriptionHeader";
import SubscriptionList from "@/components/subscription/SubscriptionList";
import { useSubscriptionPage } from "@/hooks/useSubscriptionPage";

const SubscriptionPage = () => {
  const {
    selectedTier,
    showBasicSignupDialog,
    setShowBasicSignupDialog,
    showPremiumSignupDialog,
    setShowPremiumSignupDialog,
    showAdvancedSignupDialog,
    setShowAdvancedSignupDialog,
    currentSubscription,
    handleSubscribe,
    handleStripeCheckout
  } = useSubscriptionPage();

  return (
    <DashboardLayout>
      <div className="py-8 min-h-screen bg-gradient-dark from-crypto-gradient-from to-crypto-gradient-to">
        <SubscriptionHeader />
        
        <SubscriptionList 
          currentSubscription={currentSubscription}
          selectedTier={selectedTier}
          onSubscribe={handleSubscribe}
        />
        
        <BasicSignupDialog
          open={showBasicSignupDialog}
          onOpenChange={(open) => {
            setShowBasicSignupDialog(open);
            if (!open) setSelectedTier(null);
          }}
        />

        <PremiumSignupDialog
          open={showPremiumSignupDialog}
          onOpenChange={(open) => {
            setShowPremiumSignupDialog(open);
            if (!open) setSelectedTier(null);
          }}
          onSuccess={handleStripeCheckout}
        />

        <AdvancedSignupDialog
          open={showAdvancedSignupDialog}
          onOpenChange={(open) => {
            setShowAdvancedSignupDialog(open);
            if (!open) setSelectedTier(null);
          }}
          onSuccess={handleStripeCheckout}
        />
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
