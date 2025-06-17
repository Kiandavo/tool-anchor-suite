
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";

interface ColorData {
  name: string;
  persian: string;
  personality: string;
  strengths: string[];
  challenges: string[];
  advice: string;
  color: string;
}

const colors: ColorData[] = [
  {
    name: 'red',
    persian: 'قرمز',
    personality: 'شما فردی پرانرژی، پرشور و رهبر طبیعی هستید. عشق به ماجراجویی و چالش‌های جدید دارید.',
    strengths: ['اراده قوی', 'شجاعت', 'اعتماد به نفس', 'انگیزه بالا'],
    challenges: ['عجله در تصمیم‌گیری', 'بی‌صبری', 'گاهی خشمگین'],
    advice: 'صبر و تأمل بیشتری داشته باشید. انرژی‌تان را به سمت اهداف سازنده هدایت کنید.',
    color: 'bg-red-500'
  },
  {
    name: 'blue',
    persian: 'آبی',
    personality: 'شما فردی آرام، قابل اعتماد و عمیق هستید. به دنبال آرامش و ثبات در زندگی می‌گردید.',
    strengths: ['وفاداری', 'صداقت', 'آرامش', 'تفکر عمیق'],
    challenges: ['گاهی افسرده', 'تردید زیاد', 'خودانتقادی'],
    advice: 'به خودتان اعتماد کنید و از قدرت درونی‌تان استفاده کنید. با دیگران ارتباط بیشتری برقرار کنید.',
    color: 'bg-blue-500'
  },
  {
    name: 'green',
    persian: 'سبز',
    personality: 'شما فردی متعادل، مهربان و طبیعت‌دوست هستید. عدالت و هارمونی برایتان مهم است.',
    strengths: ['تعادل', 'مهربانی', 'عدالت‌طلبی', 'آرامش بخشی'],
    challenges: ['گاهی تردید', 'حساسیت زیاد', 'خودگذشتگی بیش از حد'],
    advice: 'به خودتان نیز اهمیت دهید. قدرت تأثیرگذاری مثبت‌تان را بشناسید.',
    color: 'bg-green-500'
  },
  {
    name: 'yellow',
    persian: 'زرد',
    personality: 'شما فردی شاد، خلاق و اجتماعی هستید. انرژی مثبت و نور داخلی‌تان همه را جذب می‌کند.',
    strengths: ['خلاقیت', 'شادی', 'هوش', 'انرژی مثبت'],
    challenges: ['پراکندگی', 'بی‌قراری', 'گاهی سطحی نگری'],
    advice: 'روی تمرکز کار کنید. استعدادهای خود را به صورت هدفمند به کار ببرید.',
    color: 'bg-yellow-500'
  },
  {
    name: 'purple',
    persian: 'بنفش',
    personality: 'شما فردی معنوی، خلاق و اسرارآمیز هستید. به دنبال معنای عمیق‌تر زندگی می‌گردید.',
    strengths: ['معنویت', 'خلاقیت', 'شهود قوی', 'تخیل بالا'],
    challenges: ['انزوا', 'غرق در رؤیا', 'عدم ارتباط با واقعیت'],
    advice: 'تعادل بین دنیای درونی و بیرونی‌تان برقرار کنید. استعدادهایتان را با دنیا به اشتراک بگذارید.',
    color: 'bg-purple-500'
  },
  {
    name: 'orange',
    persian: 'نارنجی',
    personality: 'شما فردی گرم، دوستانه و مشتاق هستید. عشق به زندگی و تجربه‌های جدید دارید.',
    strengths: ['گرمی', 'اجتماعی بودن', 'اشتیاق', 'انعطاف‌پذیری'],
    challenges: ['بی‌ثباتی', 'تغییرات مکرر عقیده', 'گاهی سطحی'],
    advice: 'روی پایداری کار کنید. عمق بیشتری در روابط و تصمیمات داشته باشید.',
    color: 'bg-orange-500'
  }
];

export default function ColorReading() {
  const [selectedColor, setSelectedColor] = useState<ColorData | null>(null);
  const [result, setResult] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeColor = (color: ColorData) => {
    setSelectedColor(color);
    setIsAnalyzing(true);

    setTimeout(() => {
      const analysis = `🎨 تحلیل روان‌شناسی رنگ ${color.persian}\n\n👤 شخصیت شما:\n${color.personality}\n\n💪 نقاط قوت:\n${color.strengths.map(s => `• ${s}`).join('\n')}\n\n🔍 چالش‌ها:\n${color.challenges.map(c => `• ${c}`).join('\n')}\n\n💡 توصیه:\n${color.advice}\n\n✨ رنگ ${color.persian} نشان‌دهنده انرژی منحصر به فرد شماست. این رنگ را در زندگی‌تان بیشتر به کار ببرید.`;
      
      setResult(analysis);
      setIsAnalyzing(false);
      toast.success(`تحلیل رنگ ${color.persian} انجام شد!`);
    }, 2000);
  };

  const copyResult = () => {
    if (result) {
      copyToClipboard(result);
      toast.success("تحلیل رنگ کپی شد!");
    }
  };

  const resetReading = () => {
    setSelectedColor(null);
    setResult('');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-pink-800">
            <Palette className="text-pink-600" size={28} />
            روان‌شناسی رنگ
          </CardTitle>
          <p className="text-pink-600 mt-2">رنگ مورد علاقه‌تان را انتخاب کنید</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!result ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-pink-700 mb-4">کدام رنگ بیشتر جذب‌تان می‌کند؟</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {colors.map((color) => (
                    <Button
                      key={color.name}
                      onClick={() => analyzeColor(color)}
                      disabled={isAnalyzing}
                      size="lg"
                      className={`${color.color} hover:opacity-90 text-white font-semibold py-8 px-6 text-lg shadow-lg`}
                      style={{ minHeight: '80px' }}
                    >
                      {isAnalyzing && selectedColor?.name === color.name ? (
                        <>
                          <RefreshCw className="animate-spin mr-2" size={20} />
                          تحلیل...
                        </>
                      ) : (
                        color.persian
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-white/60 p-4 rounded-lg border border-pink-200">
                <h3 className="font-semibold text-pink-800 mb-2">درباره روان‌شناسی رنگ:</h3>
                <p className="text-sm text-pink-700">
                  رنگ‌هایی که به آن‌ها جذب می‌شوید، بازتابی از شخصیت، احساسات و نیازهای درونی شما هستند. 
                  هر رنگ پیام‌ها و انرژی‌های خاصی دارد که می‌تواند راهنمای شما در زندگی باشد.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className={`w-16 h-16 rounded-full mx-auto mb-2 ${selectedColor?.color}`}></div>
                <h3 className="text-xl font-bold text-pink-800">
                  رنگ {selectedColor?.persian}
                </h3>
              </div>

              <div className="bg-white/80 p-6 rounded-lg border border-pink-200">
                <pre className="whitespace-pre-wrap text-pink-800 leading-relaxed">{result}</pre>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={copyResult}
                  className="border-pink-400 text-pink-700 hover:bg-pink-50"
                >
                  <Copy className="mr-2" size={16} />
                  کپی نتیجه
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetReading}
                  className="border-gray-400 text-gray-700 hover:bg-gray-50"
                >
                  رنگ جدید
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
