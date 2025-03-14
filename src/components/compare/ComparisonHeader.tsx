
import React, { useState } from 'react';
import { HelpCircle, Save, AlertTriangle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userGoals } from './utils/cryptoData';

interface ComparisonHeaderProps {
  onUserGoalChange: (goalId: string | undefined) => void;
  onSaveComparison: (name: string) => void;
  selectedCryptoCount: number;
}

const ComparisonHeader: React.FC<ComparisonHeaderProps> = ({
  onUserGoalChange,
  onSaveComparison,
  selectedCryptoCount
}) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [comparisonName, setComparisonName] = useState('');

  const handleSave = () => {
    if (comparisonName.trim()) {
      onSaveComparison(comparisonName);
      setSaveDialogOpen(false);
      setComparisonName('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Comparison Setup</h3>
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Save Comparison</DialogTitle>
              <DialogDescription>
                Give your comparison a name to save it for future reference.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="My Crypto Comparison"
                value={comparisonName}
                onChange={(e) => setComparisonName(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Comparison</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <label className="block text-sm text-muted-foreground mb-2">
          What is your goal? 
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="w-5 h-5 ml-1 -mt-1">
                <HelpCircle className="w-3.5 h-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Setting Your Investment Goal</DialogTitle>
                <DialogDescription>
                  Selecting a goal helps us recommend the most relevant metrics for your comparison. This tailors the analysis to your specific needs.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <ul className="space-y-2">
                  {userGoals.map(goal => (
                    <li key={goal.id} className="text-sm">
                      <span className="font-medium">{goal.name}:</span> {goal.description}
                    </li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </label>
        
        <Select onValueChange={(value) => onUserGoalChange(value || undefined)}>
          <SelectTrigger className="bg-crypto-dark/80 border-crypto-gray">
            <SelectValue placeholder="Select your investment goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No specific goal</SelectItem>
            {userGoals.map((goal) => (
              <SelectItem key={goal.id} value={goal.id}>
                {goal.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCryptoCount > 5 && (
        <div className="flex items-start gap-2 bg-amber-950/30 border border-amber-700/30 rounded-md p-3 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>Comparing many cryptocurrencies at once may make visualization less effective. Consider focusing on 2-5 cryptocurrencies for best results.</p>
        </div>
      )}
    </div>
  );
};

export default ComparisonHeader;
