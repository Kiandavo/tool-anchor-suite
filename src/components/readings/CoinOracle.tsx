
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coins, Sparkles, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";

interface CoinResult {
  result: 'شیر' | 'خط';
  answer: string;
  guidance: string;
}

const coinAnswers = {
  'شیر': [
    "پاسخ مثبت است. زمان مناسبی برای اقدام است.",
    "بله، اما با احتیاط پیش بروید.",
    "نشانه‌ها مثبت هستند. با اعتماد به نفس ادامه دهید.",
    "فرصت طلایی در انتظار شماست.",
    "انرژی‌های مثبت با شما همراه است."
  ],
  'خط': [
    "هنوز زمان مناسب نیست. صبر کنید.",
    "بهتر است کمی بیشتر فکر کنید.",
    "شاید راه دیگری وجود داشته باشد.",
    "زمان برای تأمل و بازنگری است.",
    "احتیاط و دقت بیشتری لازم است."
  ]
};

const guidanceMessages = [
  "به قلب خود گوش دهید و از درون پاسخ بگیرید.",
  "گاهی بهترین تصمیمات از شهود و احساس می‌آیند.",
  "زمان همه چیز را آشکار خواهد کرد.",
  "اعتماد به خود کلید موفقیت است.",
  "هر انتخابی درس‌هایی برای شما دارد."
];

export default function CoinOracle() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<CoinResult | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinAnimation, setCoinAnimation] = useState(false);

  const flipCoin = () => {
    if (!question.trim()) {
      toast.error("لطفاً سؤال خود را وارد کنید");
      return;
    }

    setIsFlipping(true);
    setCoinAnimation(true);

    setTimeout(() => {
      const coinResult = Math.random() < 0.5 ? 'شیر' : 'خط';
      const answers = coinAnswers[coinResult];
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      const randomGuidance = guidanceMessages[Math.floor(Math.random() * guidanceMessages.length)];

      setResult({
        result: coinResult,
        answer: randomAnswer,
        guidance: randomGuidance
      });

      setIsFlipping(false);
      setCoinAnimation(false);
      toast.success(`سکه ${coinResult} آمد!`);
    }, 3000);
  };

  const copyResult = () => {
    if (result) {
      const text = `🪙 پیشگویی با سکه\n\n❓ سؤال: ${question}\n\n🎯 نتیجه: ${result.result}\n\n💬 پاسخ: ${result.answer}\n\n🧭 راهنمایی: ${result.guidance}`;
      copyToClipboard(text);
      toast.success("نتیجه پیشگویی کپی شد!");
    }
  };

  const resetReading = () => {
    setQuestion('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-yellow-800">
            <Coins className="text-yellow-600" size={28} />
            پیشگویی با سکه
          </CardTitle>
          <p className="text-yellow-600 mt-2">سؤال خود را بپرسید و سکه را بیندازید</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!result ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-yellow-800">سؤال خود را بپرسید:</label>
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="مثال: آیا باید این کار را انجام دهم؟"
                  className="border-yellow-200 focus:border-yellow-400"
                />
              </div>

              <div className="text-center">
                <div className={`mb-6 text-6xl transition-transform duration-300 ${coinAnimation ? 'animate-spin' : ''}`}>
                  🪙
                </div>
                
                <Button
                  onClick={flipCoin}
                  disabled={isFlipping || !question.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-8 py-4 text-lg"
                >
                  {isFlipping ? (
                    <>
                      <RefreshCw className="animate-spin mr-2" size={20} />
                      سکه در حال چرخش...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={20} />
                      انداختن سکه
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-white/60 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">راهنمای پیشگویی:</h3>
                <div className="space-y-1 text-sm text-yellow-700">
                  <p><strong>شیر:</strong> پاسخ مثبت، پیش بروید</p>
                  <p><strong>خط:</strong> احتیاط، صبر یا تغییر مسیر</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">
                  {result.result === 'شیر' ? '🦁' : '➖'}
                </div>
                <h3 className="text-2xl font-bold text-yellow-800">
                  {result.result}
                </h3>
              </div>

              <div className="bg-white/80 p-6 rounded-lg border border-yellow-200 space-y-4">
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">سؤال شما:</h4>
                  <p className="text-yellow-700 italic">"{question}"</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">پاسخ سکه:</h4>
                  <p className="text-yellow-700">{result.answer}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">راهنمایی:</h4>
                  <p className="text-yellow-700">{result.guidance}</p>
                </div>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={copyResult}
                  className="border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                >
                  <Copy className="mr-2" size={16} />
                  کپی نتیجه
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetReading}
                  className="border-gray-400 text-gray-700 hover:bg-gray-50"
                >
                  سؤال جدید
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
