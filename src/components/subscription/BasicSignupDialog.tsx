import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSignup } from "@/hooks/useSignup";
import { SignupFormFields } from "./SignupFormFields";

interface BasicSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BasicSignupDialog = ({ open, onOpenChange }: BasicSignupDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleSignup } = useSignup({ 
    onOpenChange,
    tier: 'basic'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignup(email, password);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-crypto-dark border-crypto-blue">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4 text-crypto-blue">
            Create Basic Account
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <SignupFormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BasicSignupDialog;