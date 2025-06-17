
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hand, Sparkles, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";

interface PalmLine {
  name: string;
  meaning: string;
  interpretation: string;
}

const palmLines: PalmLine[] = [
  {
    name: "خط زندگی",
    meaning: "نشان‌دهنده سلامت و انرژی حیاتی",
    interpretation: "خط زندگی قوی و عمیق شما نشان‌دهنده سلامت عالی و انرژی بالا است. زندگی طولانی و پرباری در انتظار شماست."
  },
  {
    name: "خط قلب",
    meaning: "مربوط به عشق و احساسات",
    interpretation: "خط قلب شما نشان می‌دهد که فردی عاشق‌پیشه و احساساتی هستید. در روابط عاطفی صادق و وفادار خواهید بود."
  },
  {
    name: "خط عقل",
    meaning: "نشان‌دهنده هوش و تفکر",
    interpretation: "خط عقل بلند و مستقیم شما حاکی از ذهن تیز و قدرت تحلیل بالا است. در تصمیم‌گیری‌ها منطقی عمل می‌کنید."
  },
  {
    name: "خط سرنوشت",
    meaning: "مسیر زندگی و موفقیت",
    interpretation: "خط سرنوشت واضح شما نشان می‌دهد که مسیر زندگی‌تان مشخص است و با پشتکار به اهدافتان خواهید رسید."
  }
];

export default function PalmReading() {
  const [selectedHand, setSelectedHand] = useState<'right' | 'left' | null>(null);
  const [reading, setReading] = useState<string>('');
  const [isReading, setIsReading] = useState(false);

  const generateReading = (hand: 'right' | 'left') => {
    setSelectedHand(hand);
    setIsReading(true);

    setTimeout(() => {
      const handType = hand === 'right' ? 'راست' : 'چپ';
      const selectedLines = palmLines.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const interpretation = `🖐️ تحلیل کف دست ${handType} شما:\n\n${selectedLines.map(line => 
        `✋ ${line.name}: ${line.interpretation}`
      ).join('\n\n')}\n\n🔮 نتیجه کلی: دست شما نشان‌دهنده شخصیتی قوی و آینده‌ای روشن است. با اعتماد به نفس و پشتکار، به اهداف بزرگ خود خواهید رسید.`;

      setReading(interpretation);
      setIsReading(false);
      toast.success("خط‌شناسی دست شما انجام شد!");
    }, 2500);
  };

  const copyResult = () => {
    if (reading) {
      copyToClipboard(reading);
      toast.success("نتیجه خط‌شناسی کپی شد!");
    }
  };

  const resetReading = () => {
    setSelectedHand(null);
    setReading('');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-amber-800">
            <Hand className="text-amber-600" size={28} />
            فال دست (خط‌شناسی)
          </CardTitle>
          <p className="text-amber-600 mt-2">کف دست خود را انتخاب کنید تا آینده‌تان را بخوانیم</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!reading ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-amber-700 mb-4">کدام دست را می‌خواهید بخوانیم؟</p>
                <div className="flex gap-6 justify-center">
                  <Button
                    onClick={() => generateReading('right')}
                    disabled={isReading}
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-6 text-lg"
                  >
                    {isReading && selectedHand === 'right' ? (
                      <>
                        <RefreshCw className="animate-spin mr-2" size={20} />
                        در حال خواندن...
                      </>
                    ) : (
                      <>
                        <Hand className="mr-2" size={20} />
                        دست راست
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => generateReading('left')}
                    disabled={isReading}
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-6 text-lg"
                  >
                    {isReading && selectedHand === 'left' ? (
                      <>
                        <RefreshCw className="animate-spin mr-2" size={20} />
                        در حال خواندن...
                      </>
                    ) : (
                      <>
                        <Hand className="mr-2 scale-x-[-1]" size={20} />
                        دست چپ
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-white/60 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-amber-800 mb-2">راهنمای خط‌شناسی:</h3>
                <div className="space-y-2 text-sm text-amber-700">
                  {palmLines.map((line, index) => (
                    <div key={index}>
                      <strong>{line.name}:</strong> {line.meaning}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white/80 p-6 rounded-lg border border-amber-200">
                <pre className="whitespace-pre-wrap text-amber-800 leading-relaxed">{reading}</pre>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={copyResult}
                  className="border-amber-400 text-amber-700 hover:bg-amber-50"
                >
                  <Copy className="mr-2" size={16} />
                  کپی نتیجه
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetReading}
                  className="border-gray-400 text-gray-700 hover:bg-gray-50"
                >
                  خواندن دست دیگر
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
