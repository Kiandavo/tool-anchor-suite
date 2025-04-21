
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Rotate, Circle } from 'lucide-react';
import { toast } from 'sonner';

interface CoinSideProps {
  side: string;
}

const CoinSide: React.FC<CoinSideProps> = ({ side }) => (
  <div className={`absolute inset-0 w-full h-full rounded-full flex items-center justify-center backface-visibility-hidden ${side === 'تصویر' ? '' : 'rotate-y-180'}`}
    style={{ backfaceVisibility: side === 'تصویر' ? 'visible' : 'hidden' }}>
    <div className={`w-32 h-32 rounded-full flex items-center justify-center text-xl font-bold ${side === 'تصویر' ? 'bg-amber-500' : 'bg-amber-400'}`}>
      <div className={`flex flex-col items-center justify-center ${side === 'تصویر' ? 'text-amber-800' : 'text-amber-700'}`}>
        <Circle className="mb-1" size={28} />
        <span>{side}</span>
      </div>
    </div>
  </div>
);

const CoinFlip: React.FC = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [flipCount, setFlipCount] = useState(0);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);
    setFlipCount(prev => prev + 1);
    
    // Random duration between 1 and 2 seconds
    const duration = 1000 + Math.random() * 1000;
    
    setTimeout(() => {
      const newResult = Math.random() > 0.5 ? 'تصویر' : 'خط';
      setResult(newResult);
      setIsFlipping(false);
      toast.success(`نتیجه: ${newResult}`);
    }, duration);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("در حافظه کپی شد");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <div className="coin-container h-40 w-40 perspective-1000 relative">
        <div 
          onClick={result ? copyResult : undefined}
          className={`coin-inner relative w-full h-full transition-transform duration-1000 preserve-3d ${isFlipping ? 'animate-flip' : ''} ${result ? 'cursor-pointer' : ''}`}
          style={{ 
            transformStyle: 'preserve-3d',
            animation: isFlipping ? `flip-coin ${Math.random() * 0.5 + 0.75}s ease-out` : 'none',
            transform: !isFlipping && result === 'خط' ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          <CoinSide side="تصویر" />
          <CoinSide side="خط" />
        </div>
      </div>
      
      <Button 
        onClick={flipCoin} 
        disabled={isFlipping}
        className="flex items-center gap-2"
      >
        <Rotate size={18} className={isFlipping ? "animate-spin" : ""} />
        {isFlipping ? "در حال پرتاب..." : "پرتاب سکه"}
      </Button>
      
      {result && (
        <div 
          className="p-4 bg-muted rounded-lg text-center cursor-pointer"
          onClick={copyResult}
        >
          نتیجه: <span className="font-bold">{result}</span>
        </div>
      )}
    </div>
  );
};

export default CoinFlip;
