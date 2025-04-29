
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Star, RefreshCw, Copy } from "lucide-react";
import { copyToClipboard } from "@/utils/randomUtils";

// Zodiac signs with Persian names
const zodiacSigns = [
  { value: "aries", label: "فروردین (حمل)" },
  { value: "taurus", label: "اردیبهشت (ثور)" },
  { value: "gemini", label: "خرداد (جوزا)" },
  { value: "cancer", label: "تیر (سرطان)" },
  { value: "leo", label: "مرداد (اسد)" },
  { value: "virgo", label: "شهریور (سنبله)" },
  { value: "libra", label: "مهر (میزان)" },
  { value: "scorpio", label: "آبان (عقرب)" },
  { value: "sagittarius", label: "آذر (قوس)" },
  { value: "capricorn", label: "دی (جدی)" },
  { value: "aquarius", label: "بهمن (دلو)" },
  { value: "pisces", label: "اسفند (حوت)" }
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
      copyToClipboard(`${selectedSign ? zodiacSigns.find(sign => sign.value === selectedSign)?.label : ''}\n\n${prediction}`);
    }
  };

  return (
    <Card className="bg-[#fdf0e9] border-[#e6c8b0] shadow-sm overflow-hidden">
      <CardHeader className="bg-[#e6c8b0] text-center pb-2 py-2">
        <div className="flex items-center justify-center">
          <Star className="text-[#5c3f14] mr-2" size={16} />
          <h2 className="text-sm font-bold text-[#5c3f14]">طالع بینی</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 px-3">
        <div className="space-y-3">
          <div>
            <label className="block text-[#5c3f14] text-xs mb-1">ماه تولد خود را انتخاب کنید:</label>
            <Select value={selectedSign} onValueChange={setSelectedSign}>
              <SelectTrigger className="glass-effect text-xs">
                <SelectValue placeholder="انتخاب ماه تولد" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign.value} value={sign.value} className="text-xs">
                    {sign.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-[#5c3f14] text-xs mb-1">نوع پیش‌بینی:</label>
            <div className="flex space-x-2 rtl-space-x">
              <Button 
                size="sm"
                variant={predictionType === "today" ? "default" : "outline"}
                className={`text-[10px] h-7 px-2 ${predictionType === "today" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14]"}`}
                onClick={() => setPredictionType("today")}
              >
                امروز
              </Button>
              <Button 
                size="sm"
                variant={predictionType === "week" ? "default" : "outline"}
                className={`text-[10px] h-7 px-2 ${predictionType === "week" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14]"}`}
                onClick={() => setPredictionType("week")}
              >
                هفته
              </Button>
              <Button 
                size="sm"
                variant={predictionType === "month" ? "default" : "outline"}
                className={`text-[10px] h-7 px-2 ${predictionType === "month" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14]"}`}
                onClick={() => setPredictionType("month")}
              >
                ماه
              </Button>
            </div>
          </div>
          
          {prediction && (
            <div className={`mt-3 text-center space-y-2 ${isAnimating ? 'opacity-50' : ''}`}>
              <div className="h-px bg-[#e6c8b0] my-1 mx-auto w-2/3"></div>
              <p className="text-[#5c3f14] text-xs font-medium leading-5">{prediction}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-1 pb-2">
        <Button 
          onClick={getHoroscope} 
          disabled={isAnimating}
          size="sm" 
          className="bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14] text-[10px] h-7 px-2"
        >
          {isAnimating ? <RefreshCw className="animate-spin mr-1" size={12} /> : null}
          دریافت طالع
        </Button>
        
        {prediction && (
          <Button 
            variant="outline"
            size="sm"
            onClick={copyHoroscope} 
            className="border-[#e6c8b0] text-[#5c3f14] text-[10px] h-7 px-2"
          >
            <Copy size={12} className="mr-1" />
            کپی طالع
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
