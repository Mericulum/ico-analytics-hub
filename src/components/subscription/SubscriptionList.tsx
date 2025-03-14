
import React from "react";
import SubscriptionTier from "./SubscriptionTier";
import { subscriptionTiers } from "./SubscriptionTiers";

interface SubscriptionListProps {
  currentSubscription: string | null;
  selectedTier: string | null;
  onSubscribe: (priceId: string | null, tierName: string) => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({
  currentSubscription,
  selectedTier,
  onSubscribe
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {subscriptionTiers.map((tier) => (
        <SubscriptionTier
          key={tier.name}
          {...tier}
          isSelected={currentSubscription === tier.tierKey || selectedTier === tier.name}
          onSelect={() => onSubscribe(tier.priceId, tier.name)}
        />
      ))}
    </div>
  );
};

export default SubscriptionList;
