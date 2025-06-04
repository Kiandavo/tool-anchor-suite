
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Search, Star, Copy } from "lucide-react";
import { motion } from 'framer-motion';

interface DreamSymbol {
  symbol: string;
  meaning: string;
  category: string;
  details: string;
}

const dreamSymbols: DreamSymbol[] = [
  {
    symbol: "آب",
    meaning: "نماد زندگی، طهارت و تجدید",
    category: "طبیعت",
    details: "آب صاف نشانه سلامتی و برکت، آب کدر نشانه مشکلات و ابتلا است."
  },
  {
    symbol: "آتش",
    meaning: "نماد قدرت، تغییر و تحول",
    category: "عناصر",
    details: "آتش کنترل شده نشانه توفیق، آتش سوزان نشانه خطر و مشکلات است."
  },
  {
    symbol: "پرنده",
    meaning: "نماد آزادی، روح و پیام‌های آسمانی",
    category: "حیوانات",
    details: "پرنده‌های سفید نشانه خبر خوش، پرنده‌های سیاه نشانه غم و اندوه است."
  },
  {
    symbol: "ماه",
    meaning: "نماد زیبایی، عشق و روحانیت",
    category: "آسمان",
    details: "ماه کامل نشانه کمال و موفقیت، ماه گرفته نشانه مشکلات موقت است."
  },
  {
    symbol: "خانه",
    meaning: "نماد امنیت، خانواده و درون",
    category: "مکان",
    details: "خانه بزرگ نشانه توسعه زندگی، خانه خراب نشانه نگرانی‌های خانوادگی است."
  },
  {
    symbol: "گل",
    meaning: "نماد زیبایی، عشق و شادی",
    category: "گیاهان",
    details: "گل‌های تازه نشانه خوشحالی، گل‌های پژمرده نشانه پایان دوره‌ای است."
  },
  {
    symbol: "مار",
    meaning: "نماد دشمن پنهان یا حکمت",
    category: "حیوانات",
    details: "مار کشته شده نشانه پیروزی بر دشمنان، مار زنده نشانه خطر پنهان است."
  },
  {
    symbol: "طلا",
    meaning: "نماد ثروت، ارزش و موفقیت",
    category: "فلزات",
    details: "یافتن طلا نشانه کسب مقام، از دست دادن طلا نشانه ضرر مالی است."
  },
  {
    symbol: "کتاب",
    meaning: "نماد دانش، حکمت و راهنمایی",
    category: "اشیاء",
    details: "کتاب باز نشانه یادگیری جدید، کتاب بسته نشانه اسرار پنهان است."
  },
  {
    symbol: "مردگان",
    meaning: "نماد تغییر، پایان و شروع جدید",
    category: "افراد",
    details: "صحبت با مردگان نشانه دریافت پیام مهم، ترس از مردگان نشانه نگرانی است."
  }
];

const DreamInterpretation = () => {
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState<string>('');
  const [foundSymbols, setFoundSymbols] = useState<DreamSymbol[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDream = () => {
    if (!dreamText.trim()) return;

    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Find symbols mentioned in the dream
      const found = dreamSymbols.filter(symbol => 
        dreamText.includes(symbol.symbol)
      );
      
      setFoundSymbols(found);
      
      // Generate interpretation
      if (found.length > 0) {
        const interpretationText = generateInterpretation(found);
        setInterpretation(interpretationText);
      } else {
        setInterpretation('در متن خواب شما نمادهای مشخصی یافت نشد. لطفاً خواب خود را با جزئیات بیشتری شرح دهید.');
      }
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateInterpretation = (symbols: DreamSymbol[]): string => {
    const intro = 'بر اساس نمادهای موجود در خواب شما:\n\n';
    const symbolInterpretations = symbols.map(symbol => 
      `🔮 ${symbol.symbol}: ${symbol.meaning}\n${symbol.details}`
    ).join('\n\n');
    
    const conclusion = '\n\nنتیجه کلی: خواب شما حاوی پیام‌های مثبت است و نشان‌دهنده تغییرات مثبت در زندگی شما می‌باشد. به نمادهای خواب خود توجه کنید.';
    
    return intro + symbolInterpretations + conclusion;
  };

  const copyInterpretation = () => {
    const text = `تعبیر خواب:\n\n${interpretation}`;
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setDreamText('');
    setInterpretation('');
    setFoundSymbols([]);
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-300 to-purple-300 text-center py-3">
        <div className="flex items-center justify-center">
          <Moon className="text-indigo-800 ml-2" size={18} />
          <h2 className="text-lg font-bold text-indigo-800">تعبیر خواب</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-4">
        <div className="space-y-4">
          {!interpretation ? (
            <div className="space-y-3">
              <div className="bg-white/60 p-3 rounded-lg border border-indigo-200">
                <p className="text-indigo-800 text-sm font-medium mb-2">
                  خواب خود را با جزئیات شرح دهید:
                </p>
                <Textarea
                  placeholder="مثال: دیشب خواب دیدم که در باغی پر از گل‌های سرخ قدم می‌زدم و ناگهان پرنده‌ای سفید آمد و روی دستم نشست..."
                  value={dreamText}
                  onChange={(e) => setDreamText(e.target.value)}
                  className="border-indigo-200 focus:border-indigo-400 min-h-[120px]"
                />
              </div>

              <Button
                onClick={analyzeDream}
                disabled={isAnalyzing || !dreamText.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Search className="animate-pulse ml-2" size={16} />
                    در حال تحلیل خواب...
                  </>
                ) : (
                  <>
                    <Star className="ml-2" size={16} />
                    تعبیر خواب
                  </>
                )}
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Interpretation Result */}
              <div className="bg-white/80 p-4 rounded-lg border border-indigo-200">
                <h3 className="font-bold text-indigo-800 mb-3 flex items-center">
                  <Moon className="ml-2" size={16} />
                  تعبیر خواب شما
                </h3>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {interpretation}
                </div>
              </div>

              {/* Found Symbols */}
              {foundSymbols.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-3 rounded-lg border border-indigo-300">
                  <h4 className="font-semibold text-indigo-800 mb-2">
                    نمادهای یافت شده در خواب:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {foundSymbols.map((symbol, index) => (
                      <div key={index} className="bg-white/70 p-2 rounded text-center">
                        <span className="text-sm font-medium text-indigo-700">
                          {symbol.symbol}
                        </span>
                        <div className="text-xs text-gray-600 mt-1">
                          {symbol.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Common Dream Symbols Reference */}
          <div className="bg-white/40 p-3 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-800 mb-2 text-sm">
              نمادهای رایج در خواب:
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {dreamSymbols.slice(0, 6).map((symbol, index) => (
                <div key={index} className="text-gray-600">
                  {symbol.symbol} - {symbol.meaning.split('،')[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center gap-2 pt-3 pb-4 bg-indigo-50/50">
        {interpretation && (
          <>
            <Button
              onClick={copyInterpretation}
              variant="outline"
              size="sm"
              className="border-indigo-300 text-indigo-800 hover:bg-indigo-100"
            >
              <Copy size={14} className="ml-1" />
              کپی تعبیر
            </Button>
            <Button
              onClick={clearAll}
              variant="outline"
              size="sm"
              className="border-indigo-300 text-indigo-800 hover:bg-indigo-100"
            >
              <Moon size={14} className="ml-1" />
              خواب جدید
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default DreamInterpretation;
