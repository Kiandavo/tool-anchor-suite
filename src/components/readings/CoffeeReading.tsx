
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Sparkles, Heart, Star, Eye, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoffeeSymbol {
  symbol: string;
  meaning: string;
  area: 'rim' | 'middle' | 'bottom';
  icon: React.ReactNode;
}

const coffeeSymbols: CoffeeSymbol[] = [
  { symbol: "پرنده", meaning: "خبرهای خوش و سفر", area: "rim", icon: <Sparkles className="w-4 h-4" /> },
  { symbol: "قلب", meaning: "عشق و روابط عاطفی", area: "middle", icon: <Heart className="w-4 h-4" /> },
  { symbol: "ستاره", meaning: "آرزوها و امیدها", area: "rim", icon: <Star className="w-4 h-4" /> },
  { symbol: "چشم", meaning: "بینایی روحانی و آگاهی", area: "middle", icon: <Eye className="w-4 h-4" /> },
  { symbol: "تاج", meaning: "موفقیت و قدرت", area: "rim", icon: <Crown className="w-4 h-4" /> },
  { symbol: "درخت", meaning: "رشد و تحول شخصی", area: "bottom", icon: <Sparkles className="w-4 h-4" /> },
  { symbol: "ماه", meaning: "تغییرات و چرخه‌های زندگی", area: "middle", icon: <Star className="w-4 h-4" /> },
  { symbol: "گل", meaning: "زیبایی و شادی", area: "rim", icon: <Heart className="w-4 h-4" /> }
];

const areaInterpretations = {
  rim: "آینده نزدیک و فرصت‌های پیش رو",
  middle: "وضعیت فعلی و چالش‌های حال",
  bottom: "گذشته و ریشه‌های مسائل"
};

export default function CoffeeReading() {
  const [isReading, setIsReading] = useState(false);
  const [selectedSymbols, setSelectedSymbols] = useState<CoffeeSymbol[]>([]);
  const [showResult, setShowResult] = useState(false);

  const performReading = () => {
    setIsReading(true);
    setShowResult(false);

    setTimeout(() => {
      const randomSymbols = coffeeSymbols
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setSelectedSymbols(randomSymbols);
      setIsReading(false);
      setShowResult(true);
    }, 2000);
  };

  const resetReading = () => {
    setSelectedSymbols([]);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      <Card className="neo-glass">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Coffee className="w-6 h-6 text-amber-600" />
            فال قهوه
          </CardTitle>
          <p className="text-muted-foreground">
            قهوه‌ای بنوشید و فنجان خود را برای خواندن آماده کنید
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResult && (
            <div className="text-center space-y-4">
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="font-medium mb-2">راهنمای فال قهوه</h3>
                <p className="text-sm text-gray-600 mb-4">
                  قهوه ترک یا اسپرسو بنوشید و کمی تَله آن در فنجان باقی بگذارید. 
                  سپس فنجان را آرام تکان دهید و روی نعلبکی بگذارید تا خشک شود.
                </p>
                <Button
                  onClick={performReading}
                  disabled={isReading}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  {isReading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      در حال خواندن فال...
                    </div>
                  ) : (
                    <>
                      شروع خواندن فال
                      <Coffee className="w-4 h-4 mr-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">نمادهای مشاهده شده در فنجان شما</h3>
                  <p className="text-gray-600">تفسیر علائم و نشانه‌های فال قهوه</p>
                </div>

                <div className="grid gap-4">
                  {selectedSymbols.map((symbol, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                      className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          {symbol.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-amber-800 mb-1">
                            نماد: {symbol.symbol}
                          </h4>
                          <p className="text-gray-700 mb-2">{symbol.meaning}</p>
                          <div className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded-md inline-block">
                            موقعیت: {areaInterpretations[symbol.area]}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border border-amber-300 mt-6">
                  <h4 className="font-medium text-amber-800 mb-2">تفسیر کلی</h4>
                  <p className="text-gray-700">
                    نمادهای مشاهده شده در فنجان شما نشان‌دهنده دوره‌ای از تغییرات مثبت و فرصت‌های جدید است. 
                    توجه به جزئیات و شهود درونی خود را فراموش نکنید.
                  </p>
                </div>

                <div className="flex justify-center mt-6">
                  <Button onClick={resetReading} variant="outline">
                    خواندن فال جدید
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
