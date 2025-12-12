import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Dices, Plus, Minus, RotateCcw, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const diceFaces: Record<number, string> = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅',
};

interface RollHistory {
  dice: number[];
  total: number;
  timestamp: Date;
}

export function RandomDice() {
  const [diceCount, setDiceCount] = useState(1);
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<RollHistory[]>([]);

  const rollDice = () => {
    setIsRolling(true);
    
    // Animate through random values
    let iterations = 0;
    const maxIterations = 10;
    const interval = setInterval(() => {
      const tempValues = Array.from({ length: diceCount }, () => 
        Math.floor(Math.random() * 6) + 1
      );
      setDiceValues(tempValues);
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        const finalValues = Array.from({ length: diceCount }, () => 
          Math.floor(Math.random() * 6) + 1
        );
        setDiceValues(finalValues);
        setIsRolling(false);
        
        const total = finalValues.reduce((a, b) => a + b, 0);
        setHistory(prev => [
          { dice: finalValues, total, timestamp: new Date() },
          ...prev.slice(0, 9)
        ]);
        
        toast({ title: `مجموع: ${total}` });
      }
    }, 80);
  };

  const total = diceValues.reduce((a, b) => a + b, 0);

  const reset = () => {
    setDiceValues([]);
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <CalculatorCard title="پرتاب تاس" icon={Dices} onReset={reset}>
        {/* Dice Count */}
        <div className="space-y-2">
          <Label>تعداد تاس</Label>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDiceCount(Math.max(1, diceCount - 1))}
              disabled={diceCount <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-3xl font-bold w-12 text-center">{diceCount}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDiceCount(Math.min(6, diceCount + 1))}
              disabled={diceCount >= 6}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Roll Button */}
        <Button
          onClick={rollDice}
          disabled={isRolling}
          size="lg"
          className="w-full gap-2"
        >
          <Dices className={`h-5 w-5 ${isRolling ? 'animate-spin' : ''}`} />
          {isRolling ? 'در حال پرتاب...' : 'پرتاب تاس'}
        </Button>
      </CalculatorCard>

      {/* Results */}
      {diceValues.length > 0 && (
        <VisualizationCard title="نتیجه">
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatePresence mode="popLayout">
              {diceValues.map((value, index) => (
                <motion.div
                  key={`${index}-${value}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 260, 
                    damping: 20,
                    delay: index * 0.1 
                  }}
                  className={`w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 ${isRolling ? 'animate-pulse' : ''}`}
                >
                  <span className="text-5xl">{diceFaces[value]}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {diceCount > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <span className="text-muted-foreground">مجموع:</span>
              <span className="text-4xl font-bold mr-2">{total}</span>
            </motion.div>
          )}
        </VisualizationCard>
      )}

      {/* History */}
      {history.length > 0 && (
        <VisualizationCard title="تاریخچه">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.map((roll, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 bg-muted/30 rounded-lg text-sm"
              >
                <div className="flex items-center gap-2">
                  <History className="h-3 w-3 text-muted-foreground" />
                  <span className="flex gap-1">
                    {roll.dice.map((d, i) => (
                      <span key={i} className="text-lg">{diceFaces[d]}</span>
                    ))}
                  </span>
                </div>
                <span className="font-medium">= {roll.total}</span>
              </motion.div>
            ))}
          </div>
        </VisualizationCard>
      )}
    </div>
  );
}

export default RandomDice;
