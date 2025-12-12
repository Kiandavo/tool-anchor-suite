import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Coins, History, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipHistory {
  result: 'heads' | 'tails';
  timestamp: Date;
}

export function CoinFlip() {
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState<FlipHistory[]>([]);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    // Simulate flip animation
    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(newResult);
      setIsFlipping(false);
      
      setHistory(prev => [
        { result: newResult, timestamp: new Date() },
        ...prev.slice(0, 19)
      ]);
      
      toast({ 
        title: newResult === 'heads' ? '🪙 شیر!' : '🪙 خط!' 
      });
    }, 1000);
  };

  const headsCount = history.filter(h => h.result === 'heads').length;
  const tailsCount = history.filter(h => h.result === 'tails').length;
  const totalFlips = history.length;

  const reset = () => {
    setResult(null);
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <CalculatorCard title="شیر یا خط" icon={Coins} onReset={reset}>
        <Button
          onClick={flipCoin}
          disabled={isFlipping}
          size="lg"
          className="w-full gap-2"
        >
          <Coins className={`h-5 w-5 ${isFlipping ? 'animate-spin' : ''}`} />
          {isFlipping ? 'در حال پرتاب...' : 'پرتاب سکه'}
        </Button>
      </CalculatorCard>

      {/* Result */}
      <VisualizationCard>
        <div className="flex flex-col items-center justify-center py-8">
          <AnimatePresence mode="wait">
            {isFlipping ? (
              <motion.div
                key="flipping"
                animate={{ rotateY: [0, 180, 360, 540, 720] }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl"
              >
                <span className="text-6xl">🪙</span>
              </motion.div>
            ) : result ? (
              <motion.div
                key={result}
                initial={{ rotateY: 90, scale: 0.8 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className={`w-32 h-32 rounded-full flex items-center justify-center shadow-xl ${
                  result === 'heads' 
                    ? 'bg-gradient-to-br from-amber-400 to-amber-600' 
                    : 'bg-gradient-to-br from-slate-400 to-slate-600'
                }`}
              >
                <span className="text-4xl font-bold text-white">
                  {result === 'heads' ? 'شیر' : 'خط'}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-32 h-32 rounded-full bg-muted/50 flex items-center justify-center border-2 border-dashed border-muted-foreground/30"
              >
                <span className="text-muted-foreground">؟</span>
              </motion.div>
            )}
          </AnimatePresence>

          {result && !isFlipping && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-2xl font-bold"
            >
              {result === 'heads' ? '🦁 شیر!' : '✖️ خط!'}
            </motion.p>
          )}
        </div>
      </VisualizationCard>

      {/* Statistics */}
      {totalFlips > 0 && (
        <VisualizationCard title="آمار">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-amber-500/10 rounded-xl">
              <div className="text-2xl font-bold text-amber-600">{headsCount}</div>
              <div className="text-sm text-muted-foreground">شیر</div>
              <div className="text-xs text-muted-foreground">
                {totalFlips > 0 ? ((headsCount / totalFlips) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div className="p-4 bg-slate-500/10 rounded-xl">
              <div className="text-2xl font-bold text-slate-600">{tailsCount}</div>
              <div className="text-sm text-muted-foreground">خط</div>
              <div className="text-xs text-muted-foreground">
                {totalFlips > 0 ? ((tailsCount / totalFlips) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <div className="text-2xl font-bold">{totalFlips}</div>
              <div className="text-sm text-muted-foreground">مجموع</div>
            </div>
          </div>

          {/* Visual bar */}
          <div className="mt-4 h-4 rounded-full bg-muted overflow-hidden flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(headsCount / totalFlips) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-amber-500 h-full"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(tailsCount / totalFlips) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-slate-500 h-full"
            />
          </div>
        </VisualizationCard>
      )}

      {/* History */}
      {history.length > 0 && (
        <VisualizationCard title="تاریخچه">
          <div className="flex flex-wrap gap-2">
            {history.map((flip, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  flip.result === 'heads'
                    ? 'bg-amber-500/20 text-amber-600'
                    : 'bg-slate-500/20 text-slate-600'
                }`}
              >
                {flip.result === 'heads' ? 'ش' : 'خ'}
              </motion.div>
            ))}
          </div>
        </VisualizationCard>
      )}
    </div>
  );
}

export default CoinFlip;
