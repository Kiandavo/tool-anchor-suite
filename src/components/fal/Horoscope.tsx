
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Star, RefreshCw, Copy, Sparkles } from "lucide-react";
import { copyToClipboard } from "@/utils/randomUtils";

// Zodiac signs with Persian names and symbols
const zodiacSigns = [
  { value: "aries", label: "فروردین (حمل)", symbol: "♈" },
  { value: "taurus", label: "اردیبهشت (ثور)", symbol: "♉" },
  { value: "gemini", label: "خرداد (جوزا)", symbol: "♊" },
  { value: "cancer", label: "تیر (سرطان)", symbol: "♋" },
  { value: "leo", label: "مرداد (اسد)", symbol: "♌" },
  { value: "virgo", label: "شهریور (سنبله)", symbol: "♍" },
  { value: "libra", label: "مهر (میزان)", symbol: "♎" },
  { value: "scorpio", label: "آبان (عقرب)", symbol: "♏" },
  { value: "sagittarius", label: "آذر (قوس)", symbol: "♐" },
  { value: "capricorn", label: "دی (جدی)", symbol: "♑" },
  { value: "aquarius", label: "بهمن (دلو)", symbol: "♒" },
  { value: "pisces", label: "اسفند (حوت)", symbol: "♓" }
];

// Horoscope predictions for each sign
const horoscopePredictions: Record<string, string[]> = {
  aries: [
    "امروز برای شما روز پرانرژی و پر از فرصت‌های جدید خواهد بود. با اعتماد به نفس به سمت اهدافتان حرکت کنید.",
    "زمان مناسبی برای شروع پروژه‌های جدید است. انرژی مریخ به شما جسارت و شجاعت می‌دهد.",
    "امروز ممکن است با چالش‌هایی مواجه شوید، اما با پشتکار خود بر آن‌ها غلبه خواهید کرد.",
  ],
  taurus: [
    "ثبات و استقامت شما امروز به کمکتان می‌آید. در تصمیم‌گیری‌های مالی محتاط باشید.",
    "زمان خوبی برای لذت بردن از زیبایی‌های زندگی است. کمی به خودتان استراحت دهید.",
    "امروز ممکن است فرصتی برای افزایش درآمد پیدا کنید. به حس درونی‌تان اعتماد کنید.",
  ],
  gemini: [
    "ذهن فعال شما امروز پر از ایده‌های خلاقانه است. این ایده‌ها را با دیگران به اشتراک بگذارید.",
    "ارتباطات امروز برای شما بسیار مهم خواهد بود. گفتگوهای مهمی در پیش دارید.",
    "امروز ممکن است بین چند انتخاب سردرگم شوید. قبل از تصمیم‌گیری، همه جوانب را بسنجید.",
  ],
  cancer: [
    "احساسات عمیق شما امروز راهنمای خوبی خواهد بود. به ندای قلبتان گوش دهید.",
    "زمان مناسبی برای تقویت روابط خانوادگی است. وقت بیشتری را با عزیزانتان بگذرانید.",
    "امروز ممکن است خاطرات گذشته به سراغتان بیاید. از آنها برای ساختن آینده‌ای بهتر الهام بگیرید.",
  ],
  leo: [
    "درخشش و کاریزمای شما امروز دیگران را تحت تأثیر قرار می‌دهد. از این انرژی برای پیشرفت استفاده کنید.",
    "زمان خوبی برای نشان دادن استعدادهای خود است. از فرصت‌ها غافل نشوید.",
    "امروز ممکن است توجه زیادی به خود جلب کنید. از این فرصت برای پیشبرد اهدافتان استفاده کنید.",
  ],
  virgo: [
    "دقت و نظم شما امروز به کمکتان می‌آید. مشکلاتی که دیگران نمی‌بینند را حل خواهید کرد.",
    "زمان مناسبی برای برنامه‌ریزی و سازماندهی است. به جزئیات توجه کنید.",
    "امروز ممکن است فرصتی برای بهبود سلامتی و عادات روزانه‌تان پیدا کنید. از آن استفاده کنید.",
  ],
  libra: [
    "تعادل و هماهنگی امروز برای شما بسیار مهم است. در روابط خود به دنبال توازن باشید.",
    "زمان مناسبی برای تصمیمات مشارکتی است. نظرات دیگران را نیز در نظر بگیرید.",
    "امروز ممکن است فرصتی برای حل اختلافات قدیمی پیدا کنید. از آن برای ایجاد صلح استفاده کنید.",
  ],
  scorpio: [
    "عمق و بصیرت شما امروز راهگشا خواهد بود. به حس ششم خود اعتماد کنید.",
    "زمان مناسبی برای کشف حقایق پنهان است. در جستجوی پاسخ‌های عمیق‌تر باشید.",
    "امروز ممکن است با تغییرات عمیقی مواجه شوید. این تغییرات را به فرصت تبدیل کنید.",
  ],
  sagittarius: [
    "روحیه ماجراجویانه شما امروز شکوفا می‌شود. به دنبال تجربیات جدید باشید.",
    "زمان مناسبی برای گسترش افق‌های فکری است. به دنبال یادگیری چیزهای جدید باشید.",
    "امروز ممکن است فرصتی برای سفر یا تجربه فرهنگ‌های جدید پیدا کنید. از آن استفاده کنید.",
  ],
  capricorn: [
    "انضباط و پشتکار شما امروز نتیجه می‌دهد. به مسیر خود ادامه دهید.",
    "زمان مناسبی برای برنامه‌ریزی بلندمدت است. اهداف بزرگی را برای خود تعیین کنید.",
    "امروز ممکن است پاداش تلاش‌های گذشته خود را دریافت کنید. قدردان دستاوردهایتان باشید.",
  ],
  aquarius: [
    "خلاقیت و نوآوری شما امروز به اوج می‌رسد. ایده‌های جدیدی به ذهنتان خطور می‌کند.",
    "زمان مناسبی برای همکاری‌های گروهی است. در جمع دوستان و همکاران درخشش خواهید داشت.",
    "امروز ممکن است راه‌حل‌های غیرمتعارفی برای مشکلات پیدا کنید. از تفکر خارج از چارچوب نترسید.",
  ],
  pisces: [
    "شهود و حساسیت شما امروز بسیار قوی است. به رویاها و الهامات خود توجه کنید.",
    "زمان مناسبی برای فعالیت‌های هنری و خلاقانه است. احساسات خود را ابراز کنید.",
    "امروز ممکن است به بینش‌های عمیقی دست یابید. این بینش‌ها می‌توانند زندگی شما را تغییر دهند.",
  ],
};

// Types for weekly and monthly predictions
type PredictionType = "today" | "week" | "month";

export const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState<string>("");
  const [predictionType, setPredictionType] = useState<PredictionType>("today");
  const [prediction, setPrediction] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);

  const getHoroscope = () => {
    if (!selectedSign) {
      toast.error("لطفاً نشان ماه تولد خود را انتخاب کنید");
      return;
    }

    setIsAnimating(true);
    
    // Simulate horoscope generation with a delay
    setTimeout(() => {
      const predictions = horoscopePredictions[selectedSign] || [];
      const randomIndex = Math.floor(Math.random() * predictions.length);
      
      let predictionPrefix = "";
      switch(predictionType) {
        case "week":
          predictionPrefix = "در این هفته: ";
          break;
        case "month":
          predictionPrefix = "در این ماه: ";
          break;
        default:
          predictionPrefix = "امروز: ";
      }
      
      setPrediction(predictionPrefix + predictions[randomIndex]);
      setIsAnimating(false);
      toast.success("طالع بینی انجام شد!");
    }, 1000);
  };

  const copyHoroscope = () => {
    if (prediction) {
      const signInfo = selectedSign ? zodiacSigns.find(sign => sign.value === selectedSign) : null;
      copyToClipboard(`${signInfo ? `${signInfo.label} ${signInfo.symbol}` : ''}\n\n${prediction}`);
      toast.success("طالع بینی کپی شد!");
    }
  };
  
  // Get the symbol for the selected sign
  const selectedZodiacSymbol = selectedSign ? 
    zodiacSigns.find(sign => sign.value === selectedSign)?.symbol || "" : 
    "";

  return (
    <Card className="bg-[#fdf0e9] border-[#e6c8b0] shadow-md overflow-hidden relative">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235c3f14' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <CardHeader className="bg-gradient-to-r from-[#e6c8b0] to-[#d2b095] text-center pb-2 py-2 relative border-b border-[#e6c8b0]">
        <div className="flex items-center justify-center">
          <Star className="text-[#5c3f14] mr-2" size={16} />
          <h2 className="text-sm font-bold text-[#5c3f14] flex items-center">
            طالع بینی
            <span className="mr-1.5 inline-block"><Sparkles size={12} className="text-[#5c3f14] opacity-70" /></span>
          </h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 px-3">
        <div className="space-y-3">
          <div>
            <label className="block text-[#5c3f14] text-xs mb-1 font-medium">ماه تولد خود را انتخاب کنید:</label>
            <Select value={selectedSign} onValueChange={setSelectedSign}>
              <SelectTrigger className="text-xs bg-white/50 border-[#e6c8b0]/50 shadow-sm">
                <SelectValue placeholder="انتخاب ماه تولد" />
                {selectedSign && (
                  <span className="mr-1 text-[#5c3f14] text-sm">
                    {zodiacSigns.find(sign => sign.value === selectedSign)?.symbol}
                  </span>
                )}
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign.value} value={sign.value} className="text-xs flex items-center">
                    <span className="ml-1.5">{sign.symbol}</span>
                    {sign.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-[#5c3f14] text-xs mb-1 font-medium">نوع پیش‌بینی:</label>
            <div className="flex space-x-2 rtl-space-x">
              <Button 
                size="sm"
                variant={predictionType === "today" ? "default" : "outline"}
                className={`text-[10px] h-7 px-3 ${predictionType === "today" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14]"}`}
                onClick={() => setPredictionType("today")}
              >
                امروز
              </Button>
              <Button 
                size="sm"
                variant={predictionType === "week" ? "default" : "outline"}
                className={`text-[10px] h-7 px-3 ${predictionType === "week" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14]"}`}
                onClick={() => setPredictionType("week")}
              >
                هفته
              </Button>
              <Button 
                size="sm"
                variant={predictionType === "month" ? "default" : "outline"}
                className={`text-[10px] h-7 px-3 ${predictionType === "month" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14]"}`}
                onClick={() => setPredictionType("month")}
              >
                ماه
              </Button>
            </div>
          </div>
          
          {/* Display the zodiac wheel for the selected sign */}
          {selectedSign && !prediction && (
            <div className="flex justify-center my-2">
              <div className="w-16 h-16 rounded-full bg-white/40 border border-[#e6c8b0] flex items-center justify-center shadow-inner">
                <span className="text-4xl text-[#5c3f14] animate-pulse-slow">
                  {selectedZodiacSymbol}
                </span>
              </div>
            </div>
          )}
          
          {prediction && (
            <div className={`mt-3 space-y-2 ${isAnimating ? 'opacity-50' : 'reveal'}`} 
                 style={{ transformOrigin: 'top center' }}>
              <div className="flex justify-center">
                <div className="w-16 h-0.5 bg-[#e6c8b0]/50"></div>
              </div>
              
              {/* Sign symbol at top */}
              {selectedSign && (
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/40 border border-[#e6c8b0] flex items-center justify-center">
                    <span className="text-xl text-[#5c3f14]">
                      {selectedZodiacSymbol}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="bg-white/30 p-4 rounded-lg border border-[#e6c8b0]/30 shadow-inner relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%235c3f14' fill-opacity='0.4' d='M8 0a8 8 0 100 16A8 8 0 008 0zm0 2a6 6 0 110 12A6 6 0 018 2z'/%3E%3C/svg%3E")`,
                  }} />
                </div>
                <p className="text-[#5c3f14] text-xs font-medium leading-6 relative z-10">{prediction}</p>
              </div>
            </div>
          )}
          
          {/* Empty state guidance */}
          {!selectedSign && !prediction && (
            <div className="text-center text-[#5c3f14] text-xs p-4 bg-white/30 rounded-md border border-[#e6c8b0]/20 shadow-inner my-3">
              <p className="mb-3">برای مشاهده طالع خود، ابتدا ماه تولد را انتخاب کنید.</p>
              <div className="flex justify-center mt-2">
                <div className="animate-float">
                  <Star size={18} className="text-[#e6c8b0] opacity-70" />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-3 bg-white/20 border-t border-[#e6c8b0]/20">
        <Button 
          onClick={getHoroscope} 
          disabled={isAnimating || !selectedSign}
          size="sm" 
          className="bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14] text-[10px] h-7 px-3 relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          {isAnimating ? 
            <RefreshCw className="animate-spin mr-1" size={12} /> : 
            <Sparkles size={12} className="mr-1" />
          }
          دریافت طالع
        </Button>
        
        {prediction && (
          <Button 
            variant="outline"
            size="sm"
            onClick={copyHoroscope} 
            className="border-[#e6c8b0] text-[#5c3f14] text-[10px] h-7 px-3"
          >
            <Copy size={12} className="mr-1" />
            کپی طالع
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
