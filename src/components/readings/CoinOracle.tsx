import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Coins, RefreshCw, Copy, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface CoinResult {
  result: 'heads' | 'tails';
  interpretation: string;
  advice: string;
  confidence: number;
}

const interpretations = {
  heads: [
    {
      interpretation: "پاسخ مثبت - راه درست را انتخاب کرده‌اید",
      advice: "با اعتماد به نفس ادامه دهید و از فرصت‌های پیش رو استفاده کنید.",
      confidence: 85
    },
    {
      interpretation: "شرایط به نفع شما است - اقدام کنید",
      advice: "زمان مناسبی برای اقدام است. تردید نکنید و قدم بردارید.",
      confidence: 90
    },
    {
      interpretation: "انرژی مثبت در راه است",
      advice: "تغییرات خوبی در راه است. صبور باشید و مثبت فکر کنید.",
      confidence: 80
    }
  ],
  tails: [
    {
      interpretation: "زمان انتظار و تأمل فرا رسیده",
      advice: "عجله نکنید. فرصت بهتری در راه است. صبر کنید.",
      confidence: 75
    },
    {
      interpretation: "نگاه دوباره به موضوع ضروری است",
      advice: "شاید بهتر باشد موضوع را از زاویه دیگری بررسی کنید.",
      confidence: 80
    },
    {
      interpretation: "درون خود را بیشتر بشناسید",
      advice: "پاسخ در درون شماست. به شهود خود اعتماد کنید.",
      confidence: 70
    }
  ]
};

const CoinOracle = () => {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<CoinResult | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const flipCoin = () => {
    if (!question.trim()) return;
    
    setIsFlipping(true);
    
    setTimeout(() => {
      const coinResult = Math.random() < 0.5 ? 'heads' : 'tails';
      const options = interpretations[coinResult];
      const selectedInterpretation = options[Math.floor(Math.random() * options.length)];
      
      setResult({
        result: coinResult,
        ...selectedInterpretation
      });
      setIsFlipping(false);
    }, 2000);
  };

  const copyResult = () => {
    if (!result) return;
    
    const text = `پیشگویی با سکه

سؤال: ${question}
نتیجه: ${result.result === 'heads' ? 'شیر' : 'خط'}
تفسیر: ${result.interpretation}
توصیه: ${result.advice}
اطمینان: ${result.confidence}%`;
    
    navigator.clipboard.writeText(text);
  };

  const resetOracle = () => {
    setResult(null);
    setQuestion('');
  };

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-400 text-center py-3 relative">
        <div className="flex items-center justify-center">
          <Coins className="text-yellow-800 ml-2" size={18} />
          <h2 className="text-lg font-bold text-yellow-800">پیشگویی با سکه</h2>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowGuide(!showGuide)}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-yellow-800 hover:bg-yellow-300/20"
        >
          <HelpCircle size={16} />
        </Button>
      </CardHeader>
      
      <CardContent className="pt-4 px-4">
        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 bg-white p-3 rounded-lg border border-yellow-200"
            >
              <h4 className="font-bold text-yellow-800 mb-2">راهنمای استفاده:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• سؤال خود را با وضوح بنویسید</li>
                <li>• سؤالات بله/خیر بهترین نتیجه را می‌دهند</li>
                <li>• پیش از پرتاب سکه، تمرکز کنید</li>
                <li>• به نتیجه اول اعتماد کنید</li>
                <li>• شیر = مثبت، خط = نیاز به تأمل</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {!result ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-yellow-800 mb-2">
                سؤال خود را بپرسید:
              </label>
              <Textarea
                placeholder="مثال: آیا باید این شغل را قبول کنم؟"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-20 border-yellow-300 focus:border-yellow-500 resize-none"
              />
            </div>

            {isFlipping && (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ rotateY: 1800 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="inline-block"
                >
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <Coins size={40} className="text-yellow-800" />
                  </div>
                </motion.div>
                <p className="text-yellow-700 mt-4">سکه در حال چرخش...</p>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-lg mb-4 ${
                result.result === 'heads' 
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500' 
                  : 'bg-gradient-to-br from-gray-400 to-gray-600'
              }`}>
                <div className="text-white text-3xl font-bold">
                  {result.result === 'heads' ? 'شیر' : 'خط'}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2">تفسیر:</h4>
              <p className="text-gray-700 mb-3">{result.interpretation}</p>
              
              <h4 className="font-bold text-yellow-800 mb-2">توصیه:</h4>
              <p className="text-gray-700 mb-3">{result.advice}</p>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-yellow-700">
                  میزان اطمینان: <strong>{result.confidence}%</strong>
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  result.result === 'heads' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {result.result === 'heads' ? 'مثبت' : 'نیاز به تأمل'}
                </span>
              </div>
            </div>

            <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-800">
                <strong>سؤال شما:</strong> {question}
              </p>
            </div>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center gap-2 pt-3 pb-4 bg-yellow-50">
        {!result ? (
          <Button
            onClick={flipCoin}
            disabled={!question.trim() || isFlipping}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            {isFlipping ? (
              <>
                <RefreshCw className="animate-spin ml-2" size={16} />
                در حال پرتاب...
              </>
            ) : (
              <>
                <Coins className="ml-2" size={16} />
                پرتاب سکه
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={copyResult}
              variant="outline"
              size="sm"
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
            >
              <Copy size={14} className="ml-1" />
              کپی نتیجه
            </Button>
            <Button
              onClick={resetOracle}
              variant="outline"
              size="sm"
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
            >
              <RefreshCw size={14} className="ml-1" />
              سؤال جدید
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CoinOracle;