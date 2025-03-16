
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useWallet } from '@/lib/walletUtils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const BetPanel = () => {
  const [betAmount, setBetAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { walletInfo } = useWallet();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input with decimal point
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBetAmount(value);
    }
  };
  
  const handleSubmit = () => {
    if (!walletInfo.isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!betAmount || parseFloat(betAmount) <= 0) {
      toast.error('Please enter a valid bet amount');
      return;
    }
    
    if (parseFloat(betAmount) > walletInfo.balance) {
      toast.error('Insufficient balance');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Bet placed successfully!', {
        description: `You've placed a bet of ${betAmount} TCORE`
      });
      setBetAmount('');
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Calculate potential return (for demo purposes: 2x multiplier)
  const potentialReturn = betAmount ? parseFloat(betAmount) * 2 : 0;

  return (
    <div className="glass-card rounded-xl p-6 md:p-8 max-w-md w-full mx-auto animate-slide-up">
      <h2 className="text-2xl font-bold mb-6 font-montserrat tracking-tight text-center">
        Place Your Bet
      </h2>
      
      <div className="space-y-6">
        <div>
          <label 
            htmlFor="betAmount" 
            className="block text-sm font-medium mb-2 text-gray-300"
          >
            Bet Amount (TCORE)
          </label>
          <div className="relative">
            <input
              id="betAmount"
              type="text"
              value={betAmount}
              onChange={handleInputChange}
              placeholder="0.00"
              className="input-primary w-full"
              disabled={!walletInfo.isConnected || isSubmitting}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <span className="text-tcore-blue font-medium">TCORE</span>
            </div>
          </div>
        </div>
        
        {betAmount && parseFloat(betAmount) > 0 && (
          <div className="flex justify-between items-center px-4 py-3 bg-tcore-blue/5 rounded-lg border border-tcore-blue/20">
            <span className="text-sm text-gray-300">Potential Return:</span>
            <span className="font-medium text-tcore-blue">
              {potentialReturn.toFixed(4)} TCORE
            </span>
          </div>
        )}
        
        <Button
          onClick={handleSubmit}
          disabled={!walletInfo.isConnected || isSubmitting || !betAmount || parseFloat(betAmount) <= 0}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-tcore-dark-text"></div>
          ) : (
            <>
              Place Bet
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
        
        {!walletInfo.isConnected && (
          <p className="text-center text-xs text-gray-400 mt-2">
            Please connect your wallet to place a bet
          </p>
        )}
      </div>
    </div>
  );
};

export default BetPanel;
