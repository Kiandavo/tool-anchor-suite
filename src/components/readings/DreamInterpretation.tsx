
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Moon, RefreshCw, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";

const DREAM_SYMBOLS = {
  'آب': 'احساسات، پاکسازی، تغییر',
  'آتش': 'انرژی، تحول، نابودی و تولد دوباره',
  'پرواز': 'آزادی، رها شدن از محدودیت‌ها',
  'سقوط': 'ترس از شکست، از دست دادن کنترل',
  'حیوانات': 'غرایز طبیعی، نیروهای درونی',
  'مرگ': 'پایان یک مرحله، شروع جدید',
  'ازدواج': 'اتحاد، تعهد، شراکت',
  'سفر': 'تغییر مسیر، کشف خود',
  'خانه': 'امنیت، خانواده، ناخودآگاه',
  'پل': 'عبور از مرحله‌ای به مرحله دیگر',
  'کلید': 'راه حل، دسترسی به رمز',
  'آینه': 'خودشناسی، نگاه به درون',
  'نردبان': 'ترقی، رشد معنوی',
  'باران': 'بارداری فکری، شادی',
  'برف': 'پاکی، سردی احساسات'
};

const INTERPRETATIONS = {
  'مثبت': [
    'این خواب نشان‌دهنده دوره‌ای مثبت و پر انرژی در زندگی شماست.',
    'خواب شما بیانگر رشد شخصی و موفقیت‌های آینده است.',
    'این رؤیا پیام‌دهنده تحقق آرزوها و اهداف شماست.'
  ],
  'هشدار': [
    'این خواب هشدار ملایمی است که باید بیشتر مراقب باشید.',
    'رؤیای شما نشان می‌دهد که نیاز به تأمل بیشتر دارید.',
    'این خواب توصیه می‌کند که در تصمیمات مهم احتیاط کنید.'
  ],
  'تحول': [
    'خواب شما نشان‌دهنده تغییرات مهم در زندگی است.',
    'این رؤیا بیانگر دوره‌ای از تحول و رشد معنوی است.',
    'خواب شما پیام می‌دهد که آماده تغییرات مثبت باشید.'
  ]
};

export const DreamInterpretation: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [dreamDescription, setDreamDescription] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [symbols, setSymbols] = useState<string[]>([]);

  const interpretDream = () => {
    if (!dreamDescription.trim()) {
      toast.error("لطفاً ابتدا خواب خود را شرح دهید");
      return;
    }

    setIsInterpreting(true);
    
    setTimeout(() => {
      // Find symbols in dream description
      const foundSymbols = Object.keys(DREAM_SYMBOLS).filter(symbol => 
        dreamDescription.toLowerCase().includes(symbol)
      );
      
      // If no specific symbols found, use general interpretation
      if (foundSymbols.length === 0) {
        foundSymbols.push('عمومی');
      }
      
      setSymbols(foundSymbols);
      
      // Generate interpretation based on symbols
      let interpretation = '';
      
      if (foundSymbols.includes('آب') || foundSymbols.includes('باران')) {
        const messages = INTERPRETATIONS.مثبت;
        interpretation = messages[Math.floor(Math.random() * messages.length)];
        interpretation += '\n\nحضور آب در خواب شما نشان‌دهنده جریان احساسات و پاکسازی روحی است.';
      } else if (foundSymbols.includes('آتش') || foundSymbols.includes('سقوط')) {
        const messages = INTERPRETATIONS.تحول;
        interpretation = messages[Math.floor(Math.random() * messages.length)];
        interpretation += '\n\nنمادهای قدرتمند در خواب شما نشان‌دهنده تحولات عمیق هستند.';
      } else if (foundSymbols.includes('مرگ') || foundSymbols.includes('سفر')) {
        const messages = INTERPRETATIONS.تحول;
        interpretation = messages[Math.floor(Math.random() * messages.length)];
        interpretation += '\n\nخواب شما بیانگر پایان مرحله‌ای و شروع فصل جدیدی در زندگی است.';
      } else {
        const categoryKeys = Object.keys(INTERPRETATIONS) as Array<keyof typeof INTERPRETATIONS>;
        const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
        const messages = INTERPRETATIONS[randomCategory];
        interpretation = messages[Math.floor(Math.random() * messages.length)];
      }
      
      // Add symbol meanings
      if (foundSymbols.length > 0 && foundSymbols[0] !== 'عمومی') {
        interpretation += '\n\nنمادهای شناسایی شده در خواب شما:\n';
        foundSymbols.forEach(symbol => {
          interpretation += `• ${symbol}: ${DREAM_SYMBOLS[symbol as keyof typeof DREAM_SYMBOLS]}\n`;
        });
      }
      
      setInterpretation(interpretation);
      setIsInterpreting(false);
      setIsRevealed(true);
      toast.success("تعبیر خواب آماده شد!");
    }, 2500);
  };

  const copyReading = () => {
    const textToCopy = `تعبیر خواب\n\nشرح خواب:\n${dreamDescription}\n\nتعبیر:\n${interpretation}`;
    copyToClipboard(textToCopy);
    toast.success("تعبیر خواب کپی شد!");
  };

  const resetReading = () => {
    setIsRevealed(false);
    setInterpretation('');
    setSymbols([]);
  };

  return (
    <Card className="bg-gradient-to-b from-[#1a1b3a] to-[#2d2f4f] border-[#4a5568] shadow-md overflow-hidden relative text-white">
      <CardHeader className="bg-gradient-to-r from-[#4a5568] to-[#2d3748] text-center pb-2 py-2 relative border-b border-[#4a5568]">
        <h2 className="text-sm font-bold text-white flex items-center justify-center">
          <Moon className="mr-2" size={16} />
          تعبیر خواب
        </h2>
      </CardHeader>

      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/10 p-4 rounded-lg shadow-sm border border-white/20 text-center">
                <p className="text-sm text-white/90">
                  خواب‌های خود را تعریف کنید و با استفاده از دانش باستانی تعبیر خواب، معنای عمیق و پیام‌های پنهان رؤیاهایتان را کشف نمایید.
                </p>
              </div>

              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <label className="block text-white text-xs mb-1.5 font-medium">شرح کامل خواب خود:</label>
                <textarea 
                  value={dreamDescription}
                  onChange={(e) => setDreamDescription(e.target.value)}
                  className="w-full text-xs p-3 border border-white/20 rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none bg-white/10 text-white placeholder-white/60"
                  placeholder="خواب خود را با جزئیات کامل اینجا بنویسید... مثلاً: در خواب دیدم که در کنار رودخانه‌ای قدم می‌زدم و..."
                  rows={5}
                />
              </div>

              {isInterpreting ? (
                <div className="flex justify-center py-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 flex items-center justify-center animate-pulse">
                      <Moon size={32} className="text-blue-300" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-spin" style={{ animationDuration: '3s' }}></div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center py-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
                    <Moon size={24} className="text-blue-300 opacity-60" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white/10 p-4 rounded-lg border border-white/20 shadow-sm">
                <h3 className="text-sm font-medium text-white mb-2">تعبیر خواب شما:</h3>
                <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">{interpretation}</p>
              </div>
              
              {symbols.length > 0 && symbols[0] !== 'عمومی' && (
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-400/30">
                  <h4 className="text-xs font-medium text-blue-300 mb-2">نمادهای شناسایی شده:</h4>
                  <div className="flex flex-wrap gap-2">
                    {symbols.map((symbol, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded-full border border-blue-400/30">
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/5 border-t border-white/10">
        {!isRevealed ? (
          <Button
            onClick={interpretDream}
            disabled={isInterpreting || !dreamDescription.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-9 px-4"
          >
            {isInterpreting ? (
              <>
                <RefreshCw className="animate-spin mr-1" size={14} />
                در حال تعبیر...
              </>
            ) : (
              <>
                <Sparkles className="mr-1" size={14} />
                تعبیر خواب
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-blue-400 text-white hover:bg-blue-500/20 text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              تعبیر جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-blue-400 text-white hover:bg-blue-500/20 text-xs h-9 px-3"
            >
              <Copy size={14} className="mr-1" />
              کپی تعبیر
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default DreamInterpretation;
