
import { useState } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";

// Zodiac signs with Persian names and symbols
export const zodiacSigns = [
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
export const horoscopePredictions: Record<string, string[]> = {
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
export type PredictionType = "today" | "week" | "month";

export const useHoroscope = () => {
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
    console.log("Getting horoscope for sign:", selectedSign, "with prediction type:", predictionType);
    
    // Simulate horoscope generation with a delay
    setTimeout(() => {
      const predictions = horoscopePredictions[selectedSign] || [];
      // Ensure we get a truly random index each time
      const randomIndex = Math.floor(Math.random() * predictions.length);
      const selectedPrediction = predictions[randomIndex];
      console.log("Selected prediction index:", randomIndex, "Prediction:", selectedPrediction);
      
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
      
      const finalPrediction = predictionPrefix + selectedPrediction;
      console.log("Final prediction:", finalPrediction);
      setPrediction(finalPrediction);
      setIsAnimating(false);
      toast.success("طالع بینی انجام شد!");
    }, 1000);
  };

  const copyHoroscope = () => {
    if (prediction) {
      const signInfo = selectedSign ? zodiacSigns.find(sign => sign.value === selectedSign) : null;
      const textToCopy = `${signInfo ? `${signInfo.label} ${signInfo.symbol}` : ''}\n\n${prediction}`;
      console.log("Copying horoscope:", textToCopy);
      copyToClipboard(textToCopy);
      toast.success("طالع بینی کپی شد!");
    }
  };
  
  // Get the symbol for the selected sign
  const selectedZodiacSymbol = selectedSign ? 
    zodiacSigns.find(sign => sign.value === selectedSign)?.symbol || "" : 
    "";

  return {
    selectedSign,
    setSelectedSign,
    predictionType,
    setPredictionType,
    prediction,
    isAnimating,
    selectedZodiacSymbol,
    getHoroscope,
    copyHoroscope
  };
};
