
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RotateCcw } from 'lucide-react';

const CoinFlip: React.FC = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'شیر' | 'خط' | null>(null);
  const [flipCount, setFlipCount] = useState(0);

  const handleFlip = () => {
    setIsFlipping(true);
    setFlipCount(prev => prev + 1);
    
    // Determine the result after animation
    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? 'شیر' : 'خط';
      setResult(newResult);
      setIsFlipping(false);
      toast.success(`نتیجه: ${newResult}`);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("در حافظه کپی شد");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div 
        className={`coin-container ${isFlipping ? 'flipping' : ''}`}
        onClick={() => result && copyToClipboard(result)}
      >
        <div className="coin">
          <div className="side heads">
            <span className="text-2xl font-bold">شیر</span>
          </div>
          <div className="side tails">
            <span className="text-2xl font-bold">خط</span>
          </div>
        </div>
      </div>
      
      {result && !isFlipping && (
        <div 
          className="text-xl font-bold bg-muted p-4 rounded-lg cursor-pointer text-center w-32"
          onClick={() => copyToClipboard(result)}
        >
          {result}
        </div>
      )}
      
      <Button 
        onClick={handleFlip} 
        disabled={isFlipping}
        className="flex items-center gap-2"
      >
        <RotateCcw size={18} className={isFlipping ? 'animate-spin' : ''} />
        پرتاب سکه
      </Button>
      
      {flipCount > 0 && (
        <div className="text-sm text-muted-foreground">
          تعداد پرتاب: {flipCount}
        </div>
      )}
    </div>
  );
};

export default CoinFlip;
