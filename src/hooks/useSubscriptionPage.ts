
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useSubscriptionPage = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showBasicSignupDialog, setShowBasicSignupDialog] = useState(false);
  const [showPremiumSignupDialog, setShowPremiumSignupDialog] = useState(false);
  const [showAdvancedSignupDialog, setShowAdvancedSignupDialog] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string | null, tierName: string) => {
    setSelectedTier(tierName);
    setSelectedPriceId(priceId);

    if (tierName.toLowerCase() === 'basic') {
      setShowBasicSignupDialog(true);
    } else if (tierName.toLowerCase() === 'premium') {
      setShowPremiumSignupDialog(true);
    } else if (tierName.toLowerCase() === 'advanced') {
      setShowAdvancedSignupDialog(true);
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
      const response = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId: selectedPriceId,
          userId 
        }
      });
      
      if (response.error) {
        console.error('Checkout error:', response.error);
        toast.error('Error creating checkout session');
        return;
      }

      if (response.data?.url) {
        const successUrl = new URL(response.data.url);
        successUrl.searchParams.set('success', 'true');
        window.location.href = successUrl.toString();
      } else {
        console.error('Invalid checkout response:', response.data);
        toast.error('Invalid checkout response');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Error processing subscription');
    }
  };

  useEffect(() => {
    const fetchCurrentSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('tier')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching subscription:', error);
        return;
      }

      if (data) setCurrentSubscription(data.tier);
    };

    fetchCurrentSubscription();

    const query = new URLSearchParams(window.location.search);
    if (query.get('success') === 'true') {
      fetchCurrentSubscription();
      toast.success('Subscription updated successfully!');
    }
  }, []);

  return {
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
  };
};
