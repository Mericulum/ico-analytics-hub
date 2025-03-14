
export const subscriptionTiers = [
  {
    name: "Basic",
    tierKey: "basic",
    description: "Perfect for getting started",
    price: "Free",
    priceId: null,
    buttonText: "Get Started",
    highlighted: false,
    features: [
      "Basic market analysis",
      "Community support",
      "Basic portfolio tracking",
      "Limited tools access"
    ]
  },
  {
    name: "Premium",
    tierKey: "premium",
    description: "For serious traders",
    price: "€19/month",
    priceId: "price_premium",
    buttonText: "Upgrade Now",
    highlighted: true,
    features: [
      "Advanced market analysis",
      "Priority support",
      "Advanced portfolio tracking",
      "Real-time alerts",
      "Full tools access"
    ]
  },
  {
    name: "Advanced",
    tierKey: "advanced",
    description: "For professional traders",
    price: "€49/month",
    priceId: "price_advanced",
    buttonText: "Go Pro",
    highlighted: false,
    features: [
      "Everything in Premium",
      "Dedicated support",
      "White-label options",
      "Custom integrations",
      "Strategy consulting"
    ]
  }
];
