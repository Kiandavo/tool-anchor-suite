
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Moon, Sparkles, Copy, RefreshCw, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";

interface DreamSymbol {
  symbol: string;
  meaning: string;
  category: string;
}

const dreamSymbols: DreamSymbol[] = [
  { symbol: "آب", meaning: "احساسات، طهارت، یا تغییرات زندگی", category: "طبیعت" },
  { symbol: "پرواز", meaning: "آزادی، رهایی از محدودیت‌ها", category: "حرکت" },
  { symbol: "مار", meaning: "تغییر، تجدید، یا ترس پنهان", category: "حیوانات" },
  { symbol: "خانه", meaning: "امنیت، خانواده، یا وضعیت روحی", category: "مکان" },
  { symbol: "مرگ", meaning: "پایان یک دوره، تولدی دوباره", category: "زندگی" },
  { symbol: "ازدواج", meaning: "اتحاد، تعهد، یا تغییر در روابط", category: "روابط" },
  { symbol: "پول", meaning: "قدرت، ارزش شخصی، یا نگرانی مالی", category: "اجتماعی" },
  { symbol: "بچه", meaning: "بی‌گناهی، شروع تازه، یا مسئولیت", category: "انسان" },
  { symbol: "گل", meaning: "زیبایی، رشد، یا عشق", category: "طبیعت" },
  { symbol: "آتش", meaning: "اشتیاق، خشم، یا تطهیر", category: "عناصر" }
];

const interpretationTemplates = [
  "این خواب نشان‌دهنده تمایل درونی شما برای {theme} است.",
  "خواب شما احتمالاً بازتابی از {emotion} فعلی شماست.",
  "این رویا ممکن است پیامی باشد که {advice}.",
  "خواب شما نشان می‌دهد که {insight}.",
  "این خواب می‌تواند راهنمایی برای {guidance} باشد."
];

export default function EnhancedDreamInterpretation() {
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState<{
    summary: string;
    symbols: DreamSymbol[];
    advice: string;
    spiritual: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDream = () => {
    if (!dreamText.trim()) {
      toast.error("لطفاً خواب خود را وارد کنید");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      // Find relevant symbols
      const foundSymbols = dreamSymbols.filter(symbol => 
        dreamText.includes(symbol.symbol)
      );

      // Add some random symbols if none found
      if (foundSymbols.length === 0) {
        foundSymbols.push(
          dreamSymbols[Math.floor(Math.random() * dreamSymbols.length)],
          dreamSymbols[Math.floor(Math.random() * dreamSymbols.length)]
        );
      }

      // Generate interpretation
      const themes = ["رشد شخصی", "حل مسائل", "یافتن هدف", "بهبود روابط", "موفقیت"];
      const emotions = ["امید", "نگرانی", "انتظار", "تغییر", "آرامش"];
      const adviceList = ["به درون خود نگاه کنید", "صبور باشید", "تصمیم مهمی بگیرید", "به احساساتتان اعتماد کنید"];
      
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];

      const template = interpretationTemplates[Math.floor(Math.random() * interpretationTemplates.length)];
      
      const summary = template
        .replace('{theme}', randomTheme)
        .replace('{emotion}', randomEmotion)
        .replace('{advice}', randomAdvice)
        .replace('{insight}', `در حال عبور از دوره‌ای از ${randomEmotion} هستید`)
        .replace('{guidance}', `${randomTheme} در زندگی`);

      setInterpretation({
        summary,
        symbols: foundSymbols.slice(0, 3),
        advice: `توصیه می‌شود که ${randomAdvice} و بر روی ${randomTheme} تمرکز کنید.`,
        spiritual: `از نظر معنوی، این خواب نشان‌دهنده ارتباط عمیق‌تر شما با ${randomEmotion} درونی است.`
      });

      setIsAnalyzing(false);
      toast.success("تعبیر خواب شما آماده شد!");
    }, 2000);
  };

  const copyResult = () => {
    if (interpretation) {
      const text = `🌙 تعبیر خواب\n\n📝 خواب: ${dreamText}\n\n🔮 تفسیر: ${interpretation.summary}\n\n🗝️ نمادها:\n${interpretation.symbols.map(s => `• ${s.symbol}: ${s.meaning}`).join('\n')}\n\n💡 توصیه: ${interpretation.advice}\n\n✨ معنای معنوی: ${interpretation.spiritual}`;
      
      copyToClipboard(text);
      toast.success("تعبیر خواب کپی شد!");
    }
  };

  const resetForm = () => {
    setDreamText('');
    setInterpretation(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-indigo-800">
            <Moon className="text-indigo-600" size={28} />
            تعبیر خواب هوشمند
          </CardTitle>
          <p className="text-indigo-600 mt-2">خواب خود را تعریف کنید تا معنای آن را بدانید</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Dream input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-indigo-800">خواب خود را به تفصیل بنویسید:</label>
            <Textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder="مثال: من در خوابم دیدم که در خانه قدیمی‌مان بودم و یک پرنده سفید وارد اتاق شد..."
              rows={4}
              className="border-indigo-200 focus:border-indigo-400"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={analyzeDream}
              disabled={isAnalyzing || !dreamText.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="animate-spin mr-2" size={16} />
                  در حال تجزیه و تحلیل...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2" size={16} />
                  تعبیر خواب
                </>
              )}
            </Button>

            {interpretation && (
              <>
                <Button
                  variant="outline"
                  onClick={copyResult}
                  className="border-indigo-400 text-indigo-700 hover:bg-indigo-50"
                >
                  <Copy className="mr-2" size={16} />
                  کپی نتیجه
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="border-gray-400 text-gray-700 hover:bg-gray-50"
                >
                  خواب جدید
                </Button>
              </>
            )}
          </div>

          {/* Results */}
          {interpretation && (
            <div className="space-y-4 mt-6 p-4 bg-white/60 rounded-lg border border-indigo-200">
              <h3 className="text-lg font-bold text-indigo-800 flex items-center gap-2">
                <BookOpen size={20} />
                تعبیر خواب شما
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-indigo-800 mb-2">📋 تفسیر کلی:</h4>
                  <p className="text-indigo-700">{interpretation.summary}</p>
                </div>

                {interpretation.symbols.length > 0 && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">🗝️ نمادهای مهم:</h4>
                    <div className="space-y-2">
                      {interpretation.symbols.map((symbol, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            {symbol.symbol}
                          </Badge>
                          <span className="text-sm text-purple-700">{symbol.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">💡 راهنمایی:</h4>
                  <p className="text-blue-700">{interpretation.advice}</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">✨ معنای معنوی:</h4>
                  <p className="text-green-700">{interpretation.spiritual}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
