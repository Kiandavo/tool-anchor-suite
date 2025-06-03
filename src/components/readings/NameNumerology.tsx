
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { User, RefreshCw, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";

const LETTER_VALUES = {
  'ا': 1, 'ب': 2, 'پ': 3, 'ت': 4, 'ث': 5, 'ج': 6, 'چ': 7, 'ح': 8, 'خ': 9,
  'د': 4, 'ذ': 5, 'ر': 2, 'ز': 7, 'ژ': 8, 'س': 3, 'ش': 6, 'ص': 9, 'ض': 8,
  'ط': 9, 'ظ': 8, 'ع': 7, 'غ': 8, 'ف': 8, 'ق': 1, 'ک': 2, 'گ': 3, 'ل': 3,
  'م': 4, 'ن': 5, 'و': 6, 'ه': 5, 'ی': 1, 'آ': 1, 'ئ': 1, 'ة': 5, 'ء': 1
};

const NUMBER_MEANINGS = {
  1: {
    title: 'رهبر',
    traits: ['رهبری', 'ابتکار', 'استقلال', 'اعتماد به نفس'],
    description: 'شما متولد رهبری هستید. استقلال و ابتکار عمل از ویژگی‌های بارز شماست.'
  },
  2: {
    title: 'همکار',
    traits: ['همکاری', 'دیپلماسی', 'صبر', 'حساسیت'],
    description: 'شما به همکاری و کار تیمی علاقه دارید. دیپلماسی و صبر نقاط قوت شماست.'
  },
  3: {
    title: 'هنرمند',
    traits: ['خلاقیت', 'ارتباط', 'شادی', 'هنر'],
    description: 'خلاقیت و توانایی بیان از ویژگی‌های برجسته شماست. هنر و زیبایی را دوست دارید.'
  },
  4: {
    title: 'سازنده',
    traits: ['نظم', 'کار سخت', 'پایداری', 'عملی'],
    description: 'شما فردی منطقی و عملی هستید. نظم و کار سخت اساس موفقیت شماست.'
  },
  5: {
    title: 'آزاد',
    traits: ['آزادی', 'ماجراجویی', 'تغییر', 'انعطاف'],
    description: 'آزادی و تنوع برای شما مهم است. تغییر و ماجراجویی را دوست دارید.'
  },
  6: {
    title: 'مراقب',
    traits: ['مسئولیت', 'خانواده', 'مراقبت', 'عشق'],
    description: 'مسئولیت‌پذیری و عشق به خانواده از ویژگی‌های بارز شماست.'
  },
  7: {
    title: 'متفکر',
    traits: ['تفکر', 'معنویت', 'تحلیل', 'حکمت'],
    description: 'تفکر عمیق و جستجوی حقیقت اساس شخصیت شماست.'
  },
  8: {
    title: 'قدرتمند',
    traits: ['قدرت', 'مادی', 'مدیریت', 'موفقیت'],
    description: 'توانایی مدیریت و دستیابی به موفقیت مادی از نقاط قوت شماست.'
  },
  9: {
    title: 'معلم',
    traits: ['حکمت', 'کمک', 'انسان‌دوستی', 'فداکاری'],
    description: 'شما معلم و راهنمای دیگران هستید. انسان‌دوستی ویژگی بارز شماست.'
  }
};

export const NameNumerology: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const calculateNumerology = () => {
    if (!name.trim()) {
      toast.error("لطفاً نام خود را وارد کنید");
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const fullName = `${name.trim()} ${lastName.trim()}`.trim();
      
      // Calculate name number
      let nameSum = 0;
      for (let char of fullName.replace(/\s/g, '')) {
        if (LETTER_VALUES[char as keyof typeof LETTER_VALUES]) {
          nameSum += LETTER_VALUES[char as keyof typeof LETTER_VALUES];
        }
      }
      
      // Reduce to single digit
      let nameNumber = nameSum;
      while (nameNumber > 9) {
        nameNumber = Math.floor(nameNumber / 10) + (nameNumber % 10);
      }
      
      // Calculate expression number (first name only)
      let expressionSum = 0;
      for (let char of name.replace(/\s/g, '')) {
        if (LETTER_VALUES[char as keyof typeof LETTER_VALUES]) {
          expressionSum += LETTER_VALUES[char as keyof typeof LETTER_VALUES];
        }
      }
      
      let expressionNumber = expressionSum;
      while (expressionNumber > 9) {
        expressionNumber = Math.floor(expressionNumber / 10) + (expressionNumber % 10);
      }

      const nameInfo = NUMBER_MEANINGS[nameNumber as keyof typeof NUMBER_MEANINGS];
      const expressionInfo = NUMBER_MEANINGS[expressionNumber as keyof typeof NUMBER_MEANINGS];

      setAnalysis({
        fullName,
        nameNumber,
        expressionNumber,
        nameInfo,
        expressionInfo,
        nameSum,
        expressionSum
      });

      setIsCalculating(false);
      setIsRevealed(true);
      toast.success("تحلیل اعداد نام شما آماده شد!");
    }, 1500);
  };

  const copyReading = () => {
    if (!analysis) return;
    
    const textToCopy = `تحلیل اعداد نام\n\nنام: ${analysis.fullName}\n\nعدد نام کامل: ${analysis.nameNumber} - ${analysis.nameInfo.title}\nویژگی‌ها: ${analysis.nameInfo.traits.join('، ')}\nتوضیح: ${analysis.nameInfo.description}\n\nعدد نام: ${analysis.expressionNumber} - ${analysis.expressionInfo.title}\nویژگی‌ها: ${analysis.expressionInfo.traits.join('، ')}\nتوضیح: ${analysis.expressionInfo.description}`;
    
    copyToClipboard(textToCopy);
    toast.success("تحلیل اعداد نام کپی شد!");
  };

  const resetReading = () => {
    setIsRevealed(false);
    setAnalysis(null);
  };

  return (
    <Card className="bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] border-[#adb5bd] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#adb5bd] to-[#6c757d] text-center pb-2 py-2 relative border-b border-[#adb5bd]">
        <h2 className="text-sm font-bold text-white flex items-center justify-center">
          <User className="mr-2" size={16} />
          اعداد شناسی نام
        </h2>
      </CardHeader>

      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#adb5bd]/30 text-center">
                <p className="text-sm text-[#343a40]">
                  با تحلیل حروف و اعداد نام خود، شخصیت، استعدادها و سرنوشت خود را بشناسید و از قدرت پنهان نام خود آگاه شوید.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-[#adb5bd]/20">
                  <label className="block text-[#343a40] text-xs mb-1.5 font-medium">نام:</label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2 border border-[#adb5bd]/30 rounded-md focus:ring-1 focus:ring-[#6c757d] focus:outline-none"
                    placeholder="نام خود را اینجا وارد کنید"
                  />
                </div>

                <div className="bg-white/50 p-3 rounded-lg border border-[#adb5bd]/20">
                  <label className="block text-[#343a40] text-xs mb-1.5 font-medium">نام خانوادگی (اختیاری):</label>
                  <input 
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full text-xs p-2 border border-[#adb5bd]/30 rounded-md focus:ring-1 focus:ring-[#6c757d] focus:outline-none"
                    placeholder="نام خانوادگی خود را اینجا وارد کنید"
                  />
                </div>
              </div>

              {isCalculating ? (
                <div className="flex justify-center py-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#adb5bd]/30 to-[#6c757d]/30 border border-[#6c757d]/50 flex items-center justify-center animate-pulse">
                      <User size={32} className="text-[#6c757d]" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-[#6c757d]/30 animate-spin" style={{ animationDuration: '2s' }}></div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center py-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#e9ecef] to-[#f8f9fa] border-2 border-[#adb5bd] flex items-center justify-center">
                    <User size={24} className="text-[#6c757d] opacity-60" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center">
                <h3 className="text-lg font-bold text-[#343a40] mb-1">{analysis.fullName}</h3>
                <p className="text-xs text-[#6c757d]">تحلیل اعداد شناسی نام</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/70 p-4 rounded-lg border border-[#adb5bd]/30 shadow-sm">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#6c757d] text-white flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                      {analysis.nameNumber}
                    </div>
                    <h4 className="text-sm font-bold text-[#343a40]">عدد نام کامل</h4>
                    <p className="text-xs text-[#6c757d]">{analysis.nameInfo.title}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {analysis.nameInfo.traits.map((trait: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-[#e9ecef] text-[#343a40] text-[10px] rounded-full">
                          {trait}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#343a40] text-center">{analysis.nameInfo.description}</p>
                  </div>
                </div>

                <div className="bg-white/70 p-4 rounded-lg border border-[#adb5bd]/30 shadow-sm">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#495057] text-white flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                      {analysis.expressionNumber}
                    </div>
                    <h4 className="text-sm font-bold text-[#343a40]">عدد نام</h4>
                    <p className="text-xs text-[#6c757d]">{analysis.expressionInfo.title}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {analysis.expressionInfo.traits.map((trait: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-[#e9ecef] text-[#343a40] text-[10px] rounded-full">
                          {trait}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#343a40] text-center">{analysis.expressionInfo.description}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f9fa] p-3 rounded-lg border border-[#adb5bd]/30">
                <h4 className="text-xs font-medium text-[#343a40] mb-2">جزئیات محاسبه:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#6c757d]">
                  <div>مجموع نام کامل: {analysis.nameSum}</div>
                  <div>مجموع نام: {analysis.expressionSum}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#adb5bd]/20">
        {!isRevealed ? (
          <Button
            onClick={calculateNumerology}
            disabled={isCalculating || !name.trim()}
            className="bg-[#6c757d] hover:bg-[#495057] text-white text-xs h-9 px-4"
          >
            {isCalculating ? (
              <>
                <RefreshCw className="animate-spin mr-1" size={14} />
                در حال محاسبه...
              </>
            ) : (
              <>
                <Sparkles className="mr-1" size={14} />
                تحلیل نام
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#6c757d] text-[#343a40] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              تحلیل جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-[#6c757d] text-[#343a40] text-xs h-9 px-3"
            >
              <Copy size={14} className="mr-1" />
              کپی تحلیل
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default NameNumerology;
