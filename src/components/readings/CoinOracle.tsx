
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Coins, RefreshCw, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { motion } from 'framer-motion';

const COIN_PATTERNS = {
  'HHH': { name: 'آسمان', meaning: 'قدرت خلاق، رهبری، موفقیت کامل' },
  'HHT': { name: 'دریاچه', meaning: 'شادی، لذت، ارتباط اجتماعی' },
  'HTH': { name: 'آتش', meaning: 'روشنایی، هوش، وضوح' },
  'HTT': { name: 'رعد', meaning: 'حرکت، پیشرفت، انرژی' },
  'THH': { name: 'باد', meaning: 'نفوذ ملایم، انطباق، سفر' },
  'THT': { name: 'آب', meaning: 'خطر، چالش، مراقبت' },
  'TTH': { name: 'کوه', meaning: 'توقف، تأمل، استقامت' },
  'TTT': { name: 'زمین', meaning: 'پذیرش، صبر، قبول' }
};

const READINGS = {
  'آسمان': [
    'زمان مناسبی برای رهبری و ابتکار عمل است. قدرت خلاق شما در اوج است.',
    'موفقیت بزرگی در راه است. با اعتماد به نفس پیش بروید.',
    'انرژی مردانه و قدرت تصمیم‌گیری شما برجسته است.'
  ],
  'دریاچه': [
    'زمان شادی و لذت بردن از زندگی است. روابط اجتماعی شما رونق می‌گیرد.',
    'خبرهای خوش و پیام‌های مثبت در راه است.',
    'انرژی زنانه و قدرت جذب شما فعال است.'
  ],
  'آتش': [
    'روشنایی و وضوح در مسائل پیچیده. حقیقت آشکار خواهد شد.',
    'زمان یادگیری و کسب دانش جدید است.',
    'هوش و تیزبینی شما راه را نشان می‌دهد.'
  ],
  'رعد': [
    'حرکت و تغییرات مثبت در راه است. آماده پیشرفت باشید.',
    'انرژی قوی برای شروع پروژه‌های جدید.',
    'زمان عمل و فعالیت است، نه تفکر.'
  ],
  'باد': [
    'نفوذ ملایم و تدریجی بهترین راه است. صبور باشید.',
    'زمان مناسب برای سفر یا تغییر محیط.',
    'انطباق‌پذیری کلید موفقیت شما است.'
  ],
  'آب': [
    'مراقب چالش‌ها و موانع باشید. آمادگی لازم است.',
    'عمق احساسات و شهود شما راهنمای خوبی است.',
    'صبر و استقامت نیاز دارید تا از این مرحله عبور کنید.'
  ],
  'کوه': [
    'زمان توقف و تأمل است. عجله نکنید.',
    'استقامت و پایداری شما آزمایش می‌شود.',
    'فرصت مناسبی برای مراجعه به درون و خودشناسی.'
  ],
  'زمین': [
    'پذیرش و تسلیم در برابر شرایط بهترین راه است.',
    'صبر و بردباری به زودی نتیجه خواهد داد.',
    'انرژی مادرانه و مراقبت‌کننده شما فعال است.'
  ]
};

export const CoinOracle: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinResults, setCoinResults] = useState<string[]>([]);
  const [pattern, setPattern] = useState('');
  const [question, setQuestion] = useState('');
  const [interpretation, setInterpretation] = useState('');

  const flipCoins = () => {
    if (!question.trim()) {
      toast.error("لطفاً ابتدا سوال خود را بنویسید");
      return;
    }

    setIsFlipping(true);
    setCoinResults([]);
    
    // Animate coin flips
    let flipCount = 0;
    const flipInterval = setInterval(() => {
      if (flipCount < 3) {
        const result = Math.random() > 0.5 ? 'H' : 'T';
        setCoinResults(prev => [...prev, result]);
        flipCount++;
      } else {
        clearInterval(flipInterval);
        
        // Generate final results
        setTimeout(() => {
          const results = Array(3).fill(0).map(() => Math.random() > 0.5 ? 'H' : 'T');
          const patternKey = results.join('') as keyof typeof COIN_PATTERNS;
          const patternInfo = COIN_PATTERNS[patternKey];
          const readings = READINGS[patternInfo.name as keyof typeof READINGS];
          const selectedReading = readings[Math.floor(Math.random() * readings.length)];
          
          setCoinResults(results);
          setPattern(patternInfo.name);
          setInterpretation(`${patternInfo.meaning}. ${selectedReading}`);
          setIsFlipping(false);
          setIsRevealed(true);
          toast.success("فال سکه مشخص شد!");
        }, 500);
      }
    }, 600);
  };

  const copyReading = () => {
    const patternSymbol = coinResults.map(r => r === 'H' ? '⚪' : '⚫').join(' ');
    const textToCopy = `فال سکه\n\nسوال: ${question}\nالگوی سکه‌ها: ${patternSymbol}\nنماد: ${pattern}\n\nتفسیر: ${interpretation}`;
    copyToClipboard(textToCopy);
    toast.success("فال سکه کپی شد!");
  };

  const resetReading = () => {
    setIsRevealed(false);
    setCoinResults([]);
    setPattern('');
    setInterpretation('');
  };

  const CoinDisplay: React.FC<{result?: string, isAnimating?: boolean}> = ({ result, isAnimating }) => {
    return (
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-yellow-700 flex items-center justify-center shadow-lg"
        animate={isAnimating ? { rotateY: [0, 180, 360] } : {}}
        transition={{ duration: 0.6, repeat: isAnimating ? Infinity : 0 }}
      >
        {result && (
          <span className="text-xl font-bold text-yellow-900">
            {result === 'H' ? '⚪' : '⚫'}
          </span>
        )}
        {!result && !isAnimating && (
          <Coins size={24} className="text-yellow-900" />
        )}
      </motion.div>
    );
  };

  return (
    <Card className="bg-gradient-to-b from-[#fffef7] to-[#fef3c7] border-[#fbbf24] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-center pb-2 py-2 relative border-b border-[#fbbf24]">
        <h2 className="text-sm font-bold text-[#451a03] flex items-center justify-center">
          <Coins className="mr-2" size={16} />
          فال سکه
        </h2>
      </CardHeader>

      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#fbbf24]/30 text-center">
                <p className="text-sm text-[#451a03]">
                  با پرتاب سه سکه مقدس و تفسیر الگوهای آنها، پاسخ‌های دقیق و راهنمایی‌های روشن برای سوالات مهم زندگی خود دریافت کنید.
                </p>
              </div>

              <div className="bg-white/50 p-3 rounded-lg border border-[#fbbf24]/20">
                <label className="block text-[#451a03] text-xs mb-1.5 font-medium">سوال شما:</label>
                <textarea 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full text-xs p-2 border border-[#fbbf24]/30 rounded-md focus:ring-1 focus:ring-[#f59e0b] focus:outline-none"
                  placeholder="سوال خود را اینجا بنویسید..."
                  rows={2}
                />
              </div>

              <div className="flex justify-center gap-4 py-6">
                {[0, 1, 2].map(i => (
                  <CoinDisplay 
                    key={i} 
                    result={coinResults[i]} 
                    isAnimating={isFlipping && coinResults.length === i}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-center gap-4 py-4">
                {coinResults.map((result, i) => (
                  <CoinDisplay key={i} result={result} />
                ))}
              </div>
              
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-[#fef3c7] rounded-full border border-[#fbbf24]/30 mb-3">
                  <h3 className="text-sm font-medium text-[#451a03]">نماد: {pattern}</h3>
                </div>
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg border border-[#fbbf24]/30 shadow-sm">
                <p className="text-sm text-[#451a03] leading-relaxed">{interpretation}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#fbbf24]/20">
        {!isRevealed ? (
          <Button
            onClick={flipCoins}
            disabled={isFlipping || !question.trim()}
            className="bg-[#f59e0b] hover:bg-[#d97706] text-white text-xs h-9 px-4"
          >
            {isFlipping ? (
              <>
                <RefreshCw className="animate-spin mr-1" size={14} />
                در حال پرتاب...
              </>
            ) : (
              <>
                <Sparkles className="mr-1" size={14} />
                پرتاب سکه‌ها
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#f59e0b] text-[#451a03] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              فال جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-[#f59e0b] text-[#451a03] text-xs h-9 px-3"
            >
              <Copy size={14} className="mr-1" />
              کپی فال
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CoinOracle;
