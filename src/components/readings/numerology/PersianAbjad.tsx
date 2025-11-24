import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ABJAD_VALUES } from '@/hooks/useAdvancedNumerology';
import { Hash, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

interface PersianAbjadProps {
  onCalculate?: (value: number, reduced: number) => void;
}

export const PersianAbjad: React.FC<PersianAbjadProps> = ({ onCalculate }) => {
  const [persianName, setPersianName] = useState('');
  const [result, setResult] = useState<{ value: number; reduced: number; breakdown: { char: string; value: number }[] } | null>(null);

  const calculateAbjad = () => {
    if (!persianName.trim()) return;

    const breakdown: { char: string; value: number }[] = [];
    let total = 0;

    Array.from(persianName).forEach(char => {
      const value = ABJAD_VALUES[char] || 0;
      if (value > 0) {
        breakdown.push({ char, value });
        total += value;
      }
    });

    const reduced = reduceToSingleDigit(total);
    setResult({ value: total, reduced, breakdown });
    onCalculate?.(total, reduced);
  };

  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const getNumberMeaning = (num: number): string => {
    const meanings: Record<number, string> = {
      1: "رهبری و استقلال",
      2: "همکاری و صلح",
      3: "خلاقیت و بیان",
      4: "نظم و پایداری",
      5: "آزادی و تغییر",
      6: "عشق و خدمت",
      7: "معنویت و حکمت",
      8: "قدرت و موفقیت",
      9: "انسان‌دوستی و فداکاری",
      11: "روشن‌بینی و الهام",
      22: "سازنده بزرگ",
      33: "معلم بزرگ"
    };
    return meanings[num] || "انرژی خاص";
  };

  return (
    <Card className="border-2">
      <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
        <CardTitle className="flex items-center gap-2">
          <Hash size={20} />
          حساب ابجد (نامه‌شناسی فارسی)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="persian-name">نام فارسی خود را وارد کنید</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="persian-name"
                value={persianName}
                onChange={(e) => setPersianName(e.target.value)}
                placeholder="مثال: محمد رضا"
                className="text-right"
                dir="rtl"
              />
              <Button onClick={calculateAbjad} className="bg-amber-600 hover:bg-amber-700">
                <Calculator size={16} className="ml-1" />
                محاسبه
              </Button>
            </div>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Total Value */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg border-2 border-amber-200">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">مجموع ارزش ابجد</div>
                  <div className="text-6xl font-bold text-amber-600 mb-2">{result.value}</div>
                  <div className="text-lg text-muted-foreground">
                    تقلیل یافته به: <span className="font-bold text-amber-700">{result.reduced}</span>
                  </div>
                  <div className="mt-3 text-sm text-amber-800 font-medium">
                    {getNumberMeaning(result.reduced)}
                  </div>
                </div>
              </div>

              {/* Letter Breakdown */}
              <div className="bg-white p-4 rounded-lg border-2">
                <h4 className="font-bold mb-3 text-center">تفکیک حروف</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {result.breakdown.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-center p-2 bg-amber-50 rounded border border-amber-200"
                    >
                      <div className="text-2xl font-bold text-amber-900">{item.char}</div>
                      <div className="text-xs text-amber-600">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Interpretation */}
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">تفسیر</h4>
                <p className="text-sm text-blue-800">
                  نام شما در سیستم حساب ابجد حاوی انرژی عدد {result.reduced} است. 
                  این عدد نشان‌دهنده {getNumberMeaning(result.reduced)} است و 
                  می‌تواند تأثیر مهمی بر شخصیت و سرنوشت شما داشته باشد.
                </p>
              </div>
            </motion.div>
          )}

          {/* Abjad Table Reference */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-bold text-sm mb-2 text-center">جدول ارزش حروف ابجد</h4>
            <div className="grid grid-cols-4 gap-1 text-xs text-center">
              {Object.entries(ABJAD_VALUES).slice(0, 20).map(([char, value]) => (
                <div key={char} className="p-1 bg-white rounded">
                  <span className="font-bold">{char}</span> = {value}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              ... و سایر حروف
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
