import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Ticket, Copy, Sparkles, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const lotteryPresets = [
  { name: 'لاتاری ایران', balls: 5, max: 47, bonus: true, bonusMax: 10 },
  { name: 'یورو میلیونز', balls: 5, max: 50, bonus: true, bonusMax: 12 },
  { name: 'پاورتبال', balls: 5, max: 69, bonus: true, bonusMax: 26 },
  { name: 'لوتو ۶ از ۴۹', balls: 6, max: 49, bonus: false },
  { name: 'سفارشی', balls: 6, max: 49, bonus: false },
];

interface LotteryHistory {
  numbers: number[];
  bonus?: number;
  timestamp: Date;
}

export function RandomLotteryNumbers() {
  const [selectedPreset, setSelectedPreset] = useState(lotteryPresets[0]);
  const [numberOfBalls, setNumberOfBalls] = useState(5);
  const [maxNumber, setMaxNumber] = useState(47);
  const [hasBonus, setHasBonus] = useState(true);
  const [bonusMax, setBonusMax] = useState(10);
  const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([]);
  const [bonusNumber, setBonusNumber] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<LotteryHistory[]>([]);

  const generateNumbers = () => {
    setIsGenerating(true);
    setLotteryNumbers([]);
    setBonusNumber(null);

    // Animate generation
    let currentIndex = 0;
    const numbers: number[] = [];
    const used = new Set<number>();

    const interval = setInterval(() => {
      if (currentIndex < numberOfBalls) {
        let num: number;
        do {
          num = Math.floor(Math.random() * maxNumber) + 1;
        } while (used.has(num));
        used.add(num);
        numbers.push(num);
        setLotteryNumbers([...numbers].sort((a, b) => a - b));
        currentIndex++;
      } else if (hasBonus && bonusNumber === null) {
        const bonus = Math.floor(Math.random() * bonusMax) + 1;
        setBonusNumber(bonus);
        clearInterval(interval);
        setIsGenerating(false);
        
        setHistory(prev => [
          { numbers: [...numbers].sort((a, b) => a - b), bonus, timestamp: new Date() },
          ...prev.slice(0, 4)
        ]);
        
        toast({ title: 'اعداد شانس شما آماده است!' });
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        
        setHistory(prev => [
          { numbers: [...numbers].sort((a, b) => a - b), timestamp: new Date() },
          ...prev.slice(0, 4)
        ]);
        
        toast({ title: 'اعداد شانس شما آماده است!' });
      }
    }, 200);
  };

  const copyNumbers = () => {
    const text = hasBonus && bonusNumber 
      ? `${lotteryNumbers.join(' - ')} | بونوس: ${bonusNumber}`
      : lotteryNumbers.join(' - ');
    navigator.clipboard.writeText(text);
    toast({ title: 'اعداد کپی شدند!' });
  };

  const applyPreset = (presetName: string) => {
    const preset = lotteryPresets.find(p => p.name === presetName);
    if (preset) {
      setSelectedPreset(preset);
      setNumberOfBalls(preset.balls);
      setMaxNumber(preset.max);
      setHasBonus(preset.bonus || false);
      if (preset.bonusMax) setBonusMax(preset.bonusMax);
    }
  };

  const reset = () => {
    setLotteryNumbers([]);
    setBonusNumber(null);
    setHistory([]);
  };

  const isCustom = selectedPreset.name === 'سفارشی';

  return (
    <div className="space-y-6">
      <CalculatorCard title="تولید اعداد لاتاری" icon={Ticket} onReset={reset}>
        {/* Preset Selection */}
        <div className="space-y-2">
          <Label>نوع لاتاری</Label>
          <Select value={selectedPreset.name} onValueChange={applyPreset}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {lotteryPresets.map((preset) => (
                <SelectItem key={preset.name} value={preset.name}>
                  {preset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Settings */}
        {isCustom && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-2">
              <Label>تعداد اعداد: {numberOfBalls}</Label>
              <Slider
                value={[numberOfBalls]}
                min={1}
                max={10}
                step={1}
                onValueChange={([v]) => setNumberOfBalls(v)}
              />
            </div>

            <div className="space-y-2">
              <Label>حداکثر عدد: {maxNumber}</Label>
              <Slider
                value={[maxNumber]}
                min={10}
                max={99}
                step={1}
                onValueChange={([v]) => setMaxNumber(v)}
              />
            </div>
          </div>
        )}

        {/* Info */}
        {!isCustom && (
          <div className="p-3 bg-primary/5 rounded-lg text-sm text-muted-foreground">
            {numberOfBalls} عدد از ۱ تا {maxNumber}
            {hasBonus && ` + ۱ بونوس از ۱ تا ${bonusMax}`}
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={generateNumbers}
          disabled={isGenerating}
          size="lg"
          className="w-full gap-2"
        >
          <Sparkles className={`h-5 w-5 ${isGenerating ? 'animate-pulse' : ''}`} />
          {isGenerating ? 'در حال تولید...' : 'تولید اعداد شانس'}
        </Button>
      </CalculatorCard>

      {/* Results */}
      {lotteryNumbers.length > 0 && (
        <VisualizationCard title="اعداد شانس شما">
          <div className="flex flex-wrap justify-center gap-3">
            <AnimatePresence mode="popLayout">
              {lotteryNumbers.map((number, index) => (
                <motion.div
                  key={`main-${index}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.1
                  }}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-xl shadow-lg"
                >
                  {number}
                </motion.div>
              ))}

              {hasBonus && bonusNumber && (
                <motion.div
                  key="bonus"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: numberOfBalls * 0.1
                  }}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-xl shadow-lg ring-2 ring-amber-300"
                >
                  {bonusNumber}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {hasBonus && bonusNumber && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              🌟 عدد بونوس: <span className="font-bold text-amber-600">{bonusNumber}</span>
            </p>
          )}

          <Button
            variant="outline"
            onClick={copyNumbers}
            className="w-full mt-4 gap-2"
          >
            <Copy className="h-4 w-4" />
            کپی اعداد
          </Button>
        </VisualizationCard>
      )}

      {/* History */}
      {history.length > 0 && (
        <VisualizationCard title="تاریخچه">
          <div className="space-y-3">
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-1">
                    {entry.numbers.map((n, i) => (
                      <span
                        key={i}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium"
                      >
                        {n}
                      </span>
                    ))}
                    {entry.bonus && (
                      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-600 text-xs font-medium">
                        {entry.bonus}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </VisualizationCard>
      )}
    </div>
  );
}

export default RandomLotteryNumbers;
