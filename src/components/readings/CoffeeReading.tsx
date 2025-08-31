import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Coffee, Sparkles, Heart, Star, Eye, Crown, Upload, Camera, Copy, RefreshCw, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from "@/hooks/use-toast";
import { saveReading } from '@/utils/reading-storage';
import { ReadingResult } from '@/types/reading-types';

interface CoffeeSymbol {
  symbol: string;
  meaning: string;
  area: 'rim' | 'middle' | 'bottom';
  icon: React.ReactNode;
  details: string;
}

const coffeeSymbols: CoffeeSymbol[] = [
  { symbol: "پرنده", meaning: "خبرهای خوش و سفر", area: "rim", icon: <Sparkles className="w-4 h-4" />, details: "پرنده در لبه فنجان نشانه خبرهای خوب از راه دور و سفرهای مفید است." },
  { symbol: "قلب", meaning: "عشق و روابط عاطفی", area: "middle", icon: <Heart className="w-4 h-4" />, details: "قلب در وسط فنجان نشانه عشق قوی و روابط پایدار است." },
  { symbol: "ستاره", meaning: "آرزوها و امیدها", area: "rim", icon: <Star className="w-4 h-4" />, details: "ستاره در بالا نشانه تحقق آرزوها و رسیدن به اهداف است." },
  { symbol: "چشم", meaning: "بینایی روحانی و آگاهی", area: "middle", icon: <Eye className="w-4 h-4" />, details: "چشم نشانه بینش عمیق و کشف حقایق پنهان است." },
  { symbol: "تاج", meaning: "موفقیت و قدرت", area: "rim", icon: <Crown className="w-4 h-4" />, details: "تاج در بالای فنجان نشانه دستیابی به مقام و موفقیت است." },
  { symbol: "درخت", meaning: "رشد و تحول شخصی", area: "bottom", icon: <Sparkles className="w-4 h-4" />, details: "درخت در پایین نشانه رشد آرام اما پایدار است." },
  { symbol: "ماه", meaning: "تغییرات و چرخه‌های زندگی", area: "middle", icon: <Star className="w-4 h-4" />, details: "ماه نشانه تغییرات طبیعی و چرخه‌های جدید زندگی است." },
  { symbol: "گل", meaning: "زیبایی و شادی", area: "rim", icon: <Heart className="w-4 h-4" />, details: "گل در لبه فنجان نشانه دوره‌ای از شادی و زیبایی است." },
  { symbol: "پل", meaning: "ارتباط و گذار", area: "middle", icon: <Sparkles className="w-4 h-4" />, details: "پل نشانه برقراری ارتباط و گذر از مشکلات است." },
  { symbol: "کشتی", meaning: "سفر و ماجراجویی", area: "bottom", icon: <Star className="w-4 h-4" />, details: "کشتی نشانه سفرهای دریایی یا تغییرات بزرگ است." },
  { symbol: "کتاب", meaning: "دانش و یادگیری", area: "middle", icon: <Eye className="w-4 h-4" />, details: "کتاب نشانه فرصت‌های یادگیری و کسب دانش جدید است." },
  { symbol: "کلید", meaning: "راه‌حل و فرصت", area: "rim", icon: <Crown className="w-4 h-4" />, details: "کلید نشانه یافتن راه‌حل و باز شدن درهای جدید است." },
  { symbol: "انگشتر", meaning: "تعهد و پیوند", area: "middle", icon: <Heart className="w-4 h-4" />, details: "انگشتر نشانه تعهدات عاطفی و روابط جدی است." },
  { symbol: "نام", meaning: "هویت و شخصیت", area: "bottom", icon: <Sparkles className="w-4 h-4" />, details: "حروف یا نام نشانه تأکید بر هویت و شخصیت فردی است." },
  { symbol: "صلیب", meaning: "ایمان و معنویت", area: "middle", icon: <Star className="w-4 h-4" />, details: "نمادهای مذهبی نشانه رشد معنوی و تقویت ایمان است." },
  { symbol: "دایره", meaning: "کمال و تمامیت", area: "rim", icon: <Eye className="w-4 h-4" />, details: "دایره کامل نشانه تکمیل پروژه یا رسیدن به هدف است." },
  { symbol: "مثلث", meaning: "خلاقیت و انرژی", area: "middle", icon: <Crown className="w-4 h-4" />, details: "مثلث نشانه خلاقیت، انرژی مثبت و پیشرفت است." },
  { symbol: "خط مستقیم", meaning: "مسیر صاف و روشن", area: "bottom", icon: <Sparkles className="w-4 h-4" />, details: "خطوط مستقیم نشانه مسیر واضح و بدون مانع است." },
  { symbol: "نقطه‌ها", meaning: "جزئیات و دقت", area: "rim", icon: <Heart className="w-4 h-4" />, details: "نقطه‌های پراکنده نشانه توجه به جزئیات است." },
  { symbol: "اعداد", meaning: "پیام‌های عددی", area: "middle", icon: <Star className="w-4 h-4" />, details: "اعداد در فنجان پیام‌های خاص عددی دارند." }
];

const areaInterpretations = {
  rim: "آینده نزدیک و فرصت‌های پیش رو (1-3 ماه)",
  middle: "وضعیت فعلی و چالش‌های حال (الان)",
  bottom: "گذشته و تأثیرات آن بر زندگی (ریشه‌ها)"
};

// Interactive Cup Visualization Component
const Coffeecup = ({ selectedSymbols, onAreaClick }: { 
  selectedSymbols: CoffeeSymbol[], 
  onAreaClick: (area: 'rim' | 'middle' | 'bottom') => void 
}) => (
  <div className="relative w-48 h-48 mx-auto mb-6">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Cup outline */}
      <circle 
        cx="100" 
        cy="100" 
        r="80" 
        fill="rgba(139, 69, 19, 0.1)" 
        stroke="rgba(139, 69, 19, 0.3)" 
        strokeWidth="2"
      />
      
      {/* Clickable areas */}
      <circle 
        cx="100" 
        cy="100" 
        r="75" 
        fill="transparent" 
        stroke="rgba(139, 69, 19, 0.2)" 
        strokeWidth="1"
        className="cursor-pointer hover:fill-amber-100/20"
        onClick={() => onAreaClick('rim')}
      />
      <circle 
        cx="100" 
        cy="100" 
        r="50" 
        fill="transparent" 
        stroke="rgba(139, 69, 19, 0.2)" 
        strokeWidth="1"
        className="cursor-pointer hover:fill-amber-100/20"
        onClick={() => onAreaClick('middle')}
      />
      <circle 
        cx="100" 
        cy="100" 
        r="25" 
        fill="transparent" 
        stroke="rgba(139, 69, 19, 0.2)" 
        strokeWidth="1"
        className="cursor-pointer hover:fill-amber-100/20"
        onClick={() => onAreaClick('bottom')}
      />
      
      {/* Symbol representations */}
      {selectedSymbols.map((symbol, index) => {
        const angle = (index * 2 * Math.PI) / selectedSymbols.length;
        const radius = symbol.area === 'rim' ? 65 : symbol.area === 'middle' ? 40 : 20;
        const x = 100 + radius * Math.cos(angle);
        const y = 100 + radius * Math.sin(angle);
        
        return (
          <g key={index}>
            <circle cx={x} cy={y} r="4" fill="rgba(139, 69, 19, 0.6)" />
            <text x={x} y={y+1} textAnchor="middle" className="text-xs fill-amber-800">
              {symbol.symbol.charAt(0)}
            </text>
          </g>
        );
      })}
    </svg>
    
    {/* Area labels */}
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-amber-700">
      آینده
    </div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-amber-700">
      حال
    </div>
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-amber-700">
      گذشته
    </div>
  </div>
);

export default function CoffeeReading() {
  const [isReading, setIsReading] = useState(false);
  const [selectedSymbols, setSelectedSymbols] = useState<CoffeeSymbol[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [cupPhoto, setCupPhoto] = useState<string | null>(null);
  const [readingMethod, setReadingMethod] = useState<'automatic' | 'interactive'>('automatic');
  const { toast } = useToast();

  const performReading = () => {
    setIsReading(true);
    setShowResult(false);

    setTimeout(() => {
      const randomSymbols = coffeeSymbols
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 3); // 3-5 symbols
      setSelectedSymbols(randomSymbols);
      setIsReading(false);
      setShowResult(true);
      
      // Save reading to history
      const reading: ReadingResult = {
        id: Date.now().toString(),
        type: 'coffee',
        timestamp: new Date(),
        result: {
          symbols: randomSymbols,
          method: readingMethod,
          photoUploaded: !!cupPhoto
        }
      };
      saveReading(reading);
      
      toast({
        title: "فال قهوه آماده است! ☕",
        description: "نمادهای فنجان شما تفسیر شدند",
      });
    }, 2500);
  };

  const resetReading = () => {
    setSelectedSymbols([]);
    setShowResult(false);
    setCupPhoto(null);
  };

  const validateCoffeeImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Simple validation - check if it's an image and reasonable dimensions
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(false);
          return;
        }
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Get image data to analyze colors (coffee cups typically have brown/dark colors)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        let brownPixels = 0;
        let darkPixels = 0;
        let totalPixels = data.length / 4;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Check for brown/coffee colors
          if (r > g && r > b && r > 80 && r < 200) {
            brownPixels++;
          }
          
          // Check for dark colors (coffee residue)
          if (r < 100 && g < 100 && b < 100) {
            darkPixels++;
          }
        }
        
        const brownPercentage = (brownPixels / totalPixels) * 100;
        const darkPercentage = (darkPixels / totalPixels) * 100;
        
        // Accept if image has reasonable amount of brown/dark colors typical of coffee cups
        resolve(brownPercentage > 5 || darkPercentage > 10);
      };
      
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate if it's a coffee-related image
      const isValidCoffeeImage = await validateCoffeeImage(file);
      
      if (!isValidCoffeeImage) {
        toast({
          title: "تصویر نامناسب ❌",
          description: "لطفاً عکس فنجان قهوه آماده شده ارسال کنید. تصاویر غیرمرتبط پذیرفته نمی‌شود.",
          variant: "destructive"
        });
        event.target.value = ''; // Reset input
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setCupPhoto(e.target?.result as string);
        toast({
          title: "عکس آپلود شد! 📸",
          description: "حالا می‌توانید فال قهوه را شروع کنید",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const copyReading = async () => {
    if (!selectedSymbols.length) return;
    
    const text = `فال قهوه ☕

نمادهای مشاهده شده:
${selectedSymbols.map((symbol, index) => 
  `${index + 1}. ${symbol.symbol} - ${symbol.meaning}
   موقعیت: ${areaInterpretations[symbol.area]}
   تفسیر: ${symbol.details}`
).join('\n\n')}

تفسیر کلی:
نمادهای مشاهده شده در فنجان شما نشان‌دهنده دوره‌ای از تغییرات مثبت و فرصت‌های جدید است. توجه به شهود درونی و جزئیات زندگی توصیه می‌شود.`;

    const success = await copyToClipboard(text);
    if (success) {
      toast({
        title: "کپی شد! ☕",
        description: "فال قهوه در کلیپ‌بورد شma ذخیره شد",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-yellow-50/90 border-amber-200 shadow-2xl backdrop-blur-sm">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.g
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
              >
                <Coffee 
                  x={Math.random() * 380} 
                  y={Math.random() * 380} 
                  className="w-4 h-4 fill-current" 
                />
              </motion.g>
            ))}
          </svg>
        </div>
        
        <CardHeader className="relative z-10 bg-gradient-to-r from-amber-400/95 via-orange-400/95 to-yellow-400/95 text-center py-4 backdrop-blur-sm">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white">
            <Coffee className="w-6 h-6" />
            فال قهوه ترکی
            <Sparkles className="w-5 h-5" />
          </CardTitle>
          <p className="text-white/90 mt-2 text-sm">
            هنر باستانی خواندن نمادهای ته فنجان قهوه
          </p>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-6 pt-6">
          {!showResult ? (
            <div className="text-center space-y-6">
              {/* Method Selection */}
              <div className="flex gap-2 justify-center">
                <Button
                  variant={readingMethod === 'automatic' ? 'default' : 'outline'}
                  onClick={() => setReadingMethod('automatic')}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  فال خودکار
                </Button>
                <Button
                  variant={readingMethod === 'interactive' ? 'default' : 'outline'}
                  onClick={() => setReadingMethod('interactive')}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  آپلود عکس
                </Button>
              </div>

              {/* Photo Upload Section */}
              {readingMethod === 'interactive' && (
                <div className="bg-white/80 p-6 rounded-xl border border-amber-200 backdrop-blur-sm">
                  <h3 className="font-medium mb-4 text-amber-800">آپلود عکس فنجان قهوه</h3>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="cup-photo"
                    />
                    <label
                      htmlFor="cup-photo"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer hover:bg-amber-50"
                    >
                      <Upload className="w-8 h-8 text-amber-600 mb-2" />
                      <span className="text-amber-700">عکس فنجان قهوه را انتخاب کنید</span>
                    </label>
                    
                    {cupPhoto && (
                      <div className="mt-4">
                        <img src={cupPhoto} alt="Cup" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-amber-100/80 p-6 rounded-xl border border-amber-300 backdrop-blur-sm">
                <h3 className="font-medium mb-3 text-amber-800">راهنمای فال قهوه</h3>
                <div className="text-sm text-amber-700 space-y-2 text-right">
                  <p>🫖 قهوه ترک غلیظ بنوشید و کمی تَله در فنجان باقی بگذارید</p>
                  <p>🔄 فنجان را آرام سه بار در جهت ساعت بچرخانید</p>
                  <p>⏱️ فنجان را روی نعلبکی واژگون کنید و 5 دقیقه صبر کنید</p>
                  <p>👁️ نمادها و اشکال تشکیل شده را مشاهده کنید</p>
                  <p>📍 موقعیت نمادها در فنجان مهم است: بالا=آینده، وسط=حال، پایین=گذشته</p>
                </div>
              </div>

              <Button
                onClick={performReading}
                disabled={isReading || (readingMethod === 'interactive' && !cupPhoto)}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg px-8 py-3"
              >
                {isReading ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Coffee className="w-5 h-5" />
                    </motion.div>
                    در حال خواندن فال...
                  </div>
                ) : (
                  <>
                    شروع خواندن فال
                    <Sparkles className="w-4 h-4 mr-2" />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Cup Visualization */}
                <div className="bg-white/90 p-6 rounded-xl border border-amber-200 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4 text-center text-amber-800">
                    فنجان قهوه شما
                  </h3>
                  <Coffeecup selectedSymbols={selectedSymbols} onAreaClick={() => {}} />
                </div>

                {/* Symbols Interpretation */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-amber-800">
                    نمادهای مشاهده شده در فنجان شما
                  </h3>
                  <p className="text-amber-600">تفسیر علائم و نشانه‌های فال قهوه</p>
                </div>

                <div className="grid gap-4">
                  {selectedSymbols.map((symbol, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-gradient-to-r from-amber-50/90 to-orange-50/90 p-5 rounded-xl border border-amber-200 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-amber-200/80 rounded-full flex items-center justify-center">
                          {symbol.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-amber-800 mb-1 text-lg">
                            نماد: {symbol.symbol}
                          </h4>
                          <p className="text-gray-700 mb-2 font-medium">{symbol.meaning}</p>
                          <p className="text-gray-600 mb-3 text-sm leading-relaxed">{symbol.details}</p>
                          <div className="text-sm text-amber-700 bg-amber-100/80 px-3 py-2 rounded-lg inline-block">
                            📍 {areaInterpretations[symbol.area]}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Overall Interpretation */}
                <div className="bg-gradient-to-r from-amber-100/90 to-orange-100/90 p-6 rounded-xl border border-amber-300 backdrop-blur-sm">
                  <h4 className="font-bold text-amber-800 mb-3 text-lg flex items-center">
                    <Sparkles className="ml-2" size={20} />
                    تفسیر کلی فال
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    نمادهای مشاهده شده در فنجان شما نشان‌دهنده دوره‌ای از تغییرات مثبت و فرصت‌های جدید است. 
                    توجه به جزئیات و شهود درونی خود را فراموش نکنید. هر نماد در موقعیت خاص خود پیامی دارد که با 
                    وضعیت فعلی زندگی شما در ارتباط است.
                  </p>
                </div>

                {/* Historical Info */}
                <div className="bg-orange-50/80 p-4 rounded-lg border border-orange-200">
                  <p className="text-xs text-orange-700 text-center">
                    ☕ فال قهوه هنری است با قدمت بیش از 500 سال که از ترکیه آغاز شده و در سراسر خاورمیانه رواج یافته است
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </CardContent>
        
        <CardFooter className="relative z-10 flex justify-center gap-3 pt-4 pb-6 bg-gradient-to-r from-amber-50/90 to-orange-50/90 backdrop-blur-sm">
          {showResult ? (
            <>
              <Button
                onClick={copyReading}
                variant="outline"
                className="border-amber-300 text-amber-800 hover:bg-amber-100"
              >
                <Copy size={16} className="ml-1" />
                کپی فال
              </Button>
              <Button
                onClick={resetReading}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
              >
                <RefreshCw size={16} className="ml-1" />
                فال جدید
              </Button>
            </>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
}