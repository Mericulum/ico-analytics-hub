
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AlertsSignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (data: AlertSubscription) => void;
}

export interface AlertSubscription {
  method: "email" | "telegram";
  contact: string;
  alertTypes: {
    sentimentShifts: boolean;
    riskAlerts: boolean;
    newICOs: boolean;
  };
}

export const AlertsSignupDialog = ({ isOpen, onClose, onSubscribe }: AlertsSignupDialogProps) => {
  const [step, setStep] = useState(1);
  const [subscription, setSubscription] = useState<AlertSubscription>({
    method: "email",
    contact: "",
    alertTypes: {
      sentimentShifts: true,
      riskAlerts: true,
      newICOs: false,
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubscribe(subscription);
      setIsSubmitting(false);
      onClose();
      
      // Reset for next time
      setStep(1);
    }, 1000);
  };
  
  const handleMethodChange = (value: "email" | "telegram") => {
    setSubscription(prev => ({ ...prev, method: value }));
  };
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubscription(prev => ({ ...prev, contact: e.target.value }));
  };
  
  const toggleAlertType = (type: keyof AlertSubscription["alertTypes"]) => {
    setSubscription(prev => ({
      ...prev,
      alertTypes: {
        ...prev.alertTypes,
        [type]: !prev.alertTypes[type]
      }
    }));
  };
  
  const isStepOneValid = subscription.method && subscription.contact;
  const isStepTwoValid = subscription.alertTypes.sentimentShifts || 
                         subscription.alertTypes.riskAlerts || 
                         subscription.alertTypes.newICOs;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-crypto-dark border-crypto-gray text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-crypto-blue" />
            Subscribe to Real-Time Alerts
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Get notified about significant sentiment changes, risk alerts, or new ICOs.
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium">How would you like to receive alerts?</div>
              <RadioGroup 
                value={subscription.method} 
                onValueChange={(value) => handleMethodChange(value as "email" | "telegram")}
                className="grid grid-cols-2 gap-4"
              >
                <div className={`p-4 rounded-lg border cursor-pointer ${
                  subscription.method === "email" 
                    ? "bg-crypto-blue/20 border-crypto-blue" 
                    : "bg-crypto-gray/10 border-crypto-gray/30"
                }`}>
                  <RadioGroupItem 
                    value="email" 
                    id="email" 
                    className="sr-only" 
                  />
                  <Label 
                    htmlFor="email" 
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className="text-lg mb-2">📧</div>
                    <div className="font-medium">Email</div>
                    <div className="text-xs text-gray-400">Alerts delivered to your inbox</div>
                  </Label>
                </div>
                
                <div className={`p-4 rounded-lg border cursor-pointer ${
                  subscription.method === "telegram" 
                    ? "bg-crypto-blue/20 border-crypto-blue" 
                    : "bg-crypto-gray/10 border-crypto-gray/30"
                }`}>
                  <RadioGroupItem 
                    value="telegram" 
                    id="telegram" 
                    className="sr-only" 
                  />
                  <Label 
                    htmlFor="telegram" 
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className="text-lg mb-2">📱</div>
                    <div className="font-medium">Telegram</div>
                    <div className="text-xs text-gray-400">Instant notifications on Telegram</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">
                {subscription.method === "email" ? "Email Address" : "Telegram Username"}
              </Label>
              <Input
                id="contact"
                placeholder={subscription.method === "email" ? "you@example.com" : "@username"}
                className="bg-crypto-gray/20 border-crypto-gray/50 text-white"
                value={subscription.contact}
                onChange={handleContactChange}
              />
            </div>
            
            <Button 
              className="w-full bg-crypto-blue text-white"
              disabled={!isStepOneValid}
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm font-medium">Select alert types:</div>
              
              <div className={`p-3 rounded-lg border cursor-pointer ${
                subscription.alertTypes.sentimentShifts
                  ? "bg-crypto-blue/20 border-crypto-blue" 
                  : "bg-crypto-gray/10 border-crypto-gray/30"
              }`} onClick={() => toggleAlertType("sentimentShifts")}>
                <div className="flex justify-between items-center">
                  <div className="font-medium">Significant Sentiment Shifts</div>
                  {subscription.alertTypes.sentimentShifts && (
                    <CheckCircle className="h-4 w-4 text-crypto-blue" />
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Get notified when an ICO experiences a rapid sentiment change
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border cursor-pointer ${
                subscription.alertTypes.riskAlerts
                  ? "bg-crypto-blue/20 border-crypto-blue" 
                  : "bg-crypto-gray/10 border-crypto-gray/30"
              }`} onClick={() => toggleAlertType("riskAlerts")}>
                <div className="flex justify-between items-center">
                  <div className="font-medium">High Risk Alerts</div>
                  {subscription.alertTypes.riskAlerts && (
                    <CheckCircle className="h-4 w-4 text-crypto-blue" />
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Receive warnings about potential scams or high-risk ICOs
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border cursor-pointer ${
                subscription.alertTypes.newICOs
                  ? "bg-crypto-blue/20 border-crypto-blue" 
                  : "bg-crypto-gray/10 border-crypto-gray/30"
              }`} onClick={() => toggleAlertType("newICOs")}>
                <div className="flex justify-between items-center">
                  <div className="font-medium">New ICO Alerts</div>
                  {subscription.alertTypes.newICOs && (
                    <CheckCircle className="h-4 w-4 text-crypto-blue" />
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Stay informed about newly launched ICOs
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full bg-crypto-blue text-white"
              disabled={!isStepTwoValid || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Processing..." : "Subscribe"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
