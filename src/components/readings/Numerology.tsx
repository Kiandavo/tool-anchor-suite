
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Hash, RefreshCw, Copy, Sparkles, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";

// Numerology meanings for life path numbers
const LIFE_PATH_MEANINGS = {
  1: "شما مستقل، رهبر و خلاق هستید. مسیر زندگی شما بر نوآوری و پیشگامی تمرکز دارد. به دنبال راه خود رفتن و الهام بخشیدن به دیگران، ویژگی‌های شما هستند.",
  2: "شما همکار، صلح‌جو و دیپلمات هستید. مسیر شما شامل ایجاد هماهنگی و تعادل است. توانایی شما در ایجاد روابط و درک احساسات دیگران برجسته است.",
  3: "شما خلاق، بیانگر و خوش‌مشرب هستید. مسیر شما بر ارتباط و ابراز خویشتن متمرکز است. توانایی الهام بخشیدن به دیگران از طریق هنر و ارتباط، نقطه قوت شماست.",
  4: "شما منظم، قابل اعتماد و سخت‌کوش هستید. مسیر شما با ثبات و امنیت مشخص می‌شود. توانایی ساختن پایه‌های محکم و قابل اتکا را دارید.",
  5: "شما ماجراجو، انعطاف‌پذیر و آزادی‌طلب هستید. مسیر شما شامل تغییر، تجربه و کشف است. توانایی سازگاری با شرایط مختلف از ویژگی‌های بارز شماست.",
  6: "شما مراقبت‌کننده، مسئول و هماهنگ‌کننده هستید. مسیر شما با عشق به خانواده و جامعه مشخص می‌شود. ایجاد محیطی هماهنگ و حمایت‌کننده از استعدادهای شماست.",
  7: "شما متفکر، تحلیلگر و معنوی هستید. مسیر شما بر جستجوی حقیقت و خرد متمرکز است. توانایی شما در کشف معنا و درک عمیق از دنیا برجسته است.",
  8: "شما قدرتمند، جاه‌طلب و سازمان‌یافته هستید. مسیر شما با موفقیت و دستاورد مشخص می‌شود. توانایی رهبری و مدیریت منابع از نقاط قوت شماست.",
  9: "شما انسان‌دوست، از خودگذشته و الهام‌بخش هستید. مسیر شما با خدمت به بشریت و عشق جهانی مشخص می‌شود. توانایی درک عمیق و بخشیدن به دیگران برجسته است.",
  11: "شما بسیار شهودی، الهام‌بخش و روشن‌بین هستید. به عنوان یک عدد استاد، مسیر شما با آگاهی معنوی و رسالتی برای کمک به دیگران مشخص می‌شود.",
  22: "شما سازنده بزرگ، متحول‌کننده و بصیر هستید. به عنوان یک عدد استاد، مسیر شما با توانایی تبدیل رویاها به واقعیت و ساخت برای آینده مشخص می‌شود.",
  33: "شما معلم بزرگ، درمانگر و عاشق هستید. به عنوان یک عدد استاد، مسیر شما با عشق بی‌قید و شرط و خدمت به بشریت مشخص می‌شود."
};

// Destiny number meanings
const DESTINY_MEANINGS = {
  1: "توانایی شما در رهبری و خلاقیت، شما را به سمت فرصت‌های جدید و نوآوری هدایت می‌کند. سرنوشت شما با استقلال و پیشگامی همراه است.",
  2: "شما استعداد زیادی در ایجاد هماهنگی و همکاری دارید. سرنوشت شما با روابط مهم، دیپلماسی و حمایت از دیگران همراه است.",
  3: "بیان خلاقانه و شادی، بخش مهمی از سرنوشت شماست. استعداد شما در هنر، نویسندگی یا سخنرانی می‌تواند مسیر زندگی شما را شکل دهد.",
  4: "ساختن پایه‌های محکم و قابل اعتماد، سرنوشت شماست. نظم، قابلیت اعتماد و سخت‌کوشی شما را به سمت موفقیت پایدار هدایت می‌کند.",
  5: "تغییر، تجربه و آزادی، بخش‌های اصلی سرنوشت شما هستند. سازگاری و ماجراجویی شما را به سمت زندگی پر از تنوع و یادگیری هدایت می‌کند.",
  6: "مسئولیت‌پذیری و مراقبت، در سرنوشت شما نقش مهمی دارند. استعداد شما در ایجاد هماهنگی و حمایت از دیگران، شما را به سمت خدمت و عشق هدایت می‌کند.",
  7: "جستجوی حقیقت و خرد، سرنوشت شماست. ذهن تحلیلگر و گرایش معنوی شما را به سمت کشف و درک عمیق‌تر از زندگی هدایت می‌کند.",
  8: "سرنوشت شما با موفقیت مالی و سازمانی مرتبط است. توانایی‌های مدیریتی و رهبری شما را به سمت دستاوردها و مسئولیت‌های بزرگ هدایت می‌کند.",
  9: "سرنوشت شما با خدمت به بشریت و عشق جهانی پیوند خورده است. بصیرت و دلسوزی شما را به سمت کمک به دیگران و تأثیرگذاری مثبت بر جهان هدایت می‌کند.",
  11: "سرنوشت شما به عنوان یک الهام‌بخش و روشن‌بین است. توانایی‌های شهودی و معنوی شما را به سمت روشنگری و کمک به آگاهی دیگران هدایت می‌کند.",
  22: "سرنوشت شما به عنوان یک سازنده بزرگ است. بصیرت و توانایی‌های عملی شما را به سمت ایجاد تغییرات بزرگ و پایدار در جهان هدایت می‌کند.",
  33: "سرنوشت شما به عنوان یک معلم و راهنما برای بشریت است. عشق بی‌قید و شرط و توانایی‌های درمانگری شما را به سمت خدمت و ارتقاء آگاهی جمعی هدایت می‌کند."
};

// Month compatibility
const COMPATIBLE_MONTHS: Record<number, number[]> = {
  1: [3, 5, 7],
  2: [4, 6, 8],
  3: [1, 5, 9],
  4: [2, 6, 8],
  5: [1, 3, 7],
  6: [2, 4, 9],
  7: [1, 5, 9],
  8: [2, 4, 6],
  9: [3, 6, 7]
};

// Personality traits for each number
const PERSONALITY_TRAITS: Record<number, string[]> = {
  1: ['مستقل', 'مصمم', 'خلاق', 'رهبر', 'آغازگر'],
  2: ['همکار', 'حساس', 'دیپلمات', 'صبور', 'متعادل‌کننده'],
  3: ['خوش‌مشرب', 'خلاق', 'بیانگر', 'خوش‌بین', 'اجتماعی'],
  4: ['منظم', 'قابل اعتماد', 'سخت‌کوش', 'عملی', 'ساختارمند'],
  5: ['انعطاف‌پذیر', 'ماجراجو', 'متنوع', 'آزادی‌طلب', 'کنجکاو'],
  6: ['مسئولیت‌پذیر', 'مراقب', 'هماهنگ‌کننده', 'وفادار', 'عاشق'],
  7: ['متفکر', 'تحلیلگر', 'معنوی', 'فلسفی', 'مستقل فکر'],
  8: ['قدرتمند', 'جاه‌طلب', 'سازمان‌یافته', 'کارآمد', 'مصمم'],
  9: ['انسان‌دوست', 'از خودگذشته', 'مهربان', 'بصیر', 'الهام‌بخش'],
  11: ['شهودی', 'حساس', 'روشن‌بین', 'آگاه', 'الهام‌بخش'],
  22: ['سازنده', 'عمل‌گرا', 'بصیر', 'ماموریت‌گرا', 'پیشرو'],
  33: ['معلم', 'درمانگر', 'مهربان', 'بخشنده', 'فداکار']
};

export const Numerology: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [lifePathNumber, setLifePathNumber] = useState(0);
  const [destinyNumber, setDestinyNumber] = useState(0);
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([]);
  const [compatibleWith, setCompatibleWith] = useState<number[]>([]);
  const [auspiciousColors, setAuspiciousColors] = useState<string[]>([]);
  const [luckyDays, setLuckyDays] = useState<string[]>([]);
  const [interpretation, setInterpretation] = useState('');

  // Calculate numerology values
  const calculateNumerology = () => {
    if (!name || !birthDate) {
      toast.error("لطفاً نام و تاریخ تولد خود را وارد کنید");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      try {
        // Calculate life path number from birth date
        const dateObj = new Date(birthDate);
        if (isNaN(dateObj.getTime())) {
          throw new Error("تاریخ تولد نامعتبر است");
        }
        
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        
        // Calculate life path number
        const lifePath = calculateLifePath(day, month, year);
        setLifePathNumber(lifePath);
        
        // Calculate destiny number from name
        const destiny = calculateDestiny(name);
        setDestinyNumber(destiny);
        
        // Set personality traits
        setPersonalityTraits(PERSONALITY_TRAITS[lifePath] || PERSONALITY_TRAITS[reduceToSingleDigit(lifePath)]);
        
        // Set compatible months
        const lifePathSingleDigit = reduceToSingleDigit(lifePath);
        setCompatibleWith(COMPATIBLE_MONTHS[lifePathSingleDigit] || []);
        
        // Set auspicious colors
        setAuspiciousColors(getAuspiciousColors(lifePath));
        
        // Set lucky days
        setLuckyDays(getLuckyDays(lifePath));
        
        // Generate interpretation
        const lifePathDesc = LIFE_PATH_MEANINGS[lifePath] || LIFE_PATH_MEANINGS[reduceToSingleDigit(lifePath)];
        const destinyDesc = DESTINY_MEANINGS[destiny] || DESTINY_MEANINGS[reduceToSingleDigit(destiny)];
        
        const fullInterpretation = `**عدد مسیر زندگی: ${lifePath}**\n${lifePathDesc}\n\n**عدد سرنوشت: ${destiny}**\n${destinyDesc}`;
        setInterpretation(fullInterpretation);
        
        setIsLoading(false);
        setIsRevealed(true);
        toast.success("اعداد شناسی با موفقیت انجام شد!");
      } catch (error: any) {
        toast.error(error.message || "خطا در برآورد اعداد شناسی");
        setIsLoading(false);
      }
    }, 1500);
  };
  
  const calculateLifePath = (day: number, month: number, year: number): number => {
    // Calculate life path number: sum of birth date digits reduced to single digit
    // Special numbers 11, 22, and 33 are kept as master numbers
    
    // First reduce each component
    const reducedDay = reduceNumber(day);
    const reducedMonth = reduceNumber(month);
    const reducedYear = reduceNumber(year);
    
    // Sum them
    const sum = reducedDay + reducedMonth + reducedYear;
    
    // Check for master numbers
    if (sum === 11 || sum === 22 || sum === 33) {
      return sum;
    }
    
    // Reduce to single digit
    return reduceToSingleDigit(sum);
  };
  
  const calculateDestiny = (name: string): number => {
    // Calculate destiny number based on the numerological value of name
    // Each letter has a value based on its position in the alphabet
    // A=1, B=2, ..., Z=26
    
    // Skip punctuation and spaces
    const cleanName = name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
    
    // Convert each character to its numerological value
    const numerologicalValue = Array.from(cleanName.toLowerCase()).reduce((sum, char) => {
      // Get character code (a=97, b=98, ...)
      const charCode = char.charCodeAt(0);
      
      // Convert to numerological value (a=1, b=2, ...)
      let value = 0;
      
      // English letters
      if (charCode >= 97 && charCode <= 122) {
        value = (charCode - 96) % 9;
        if (value === 0) value = 9;
      }
      // Persian/Arabic letters (simplified approach)
      // This is a simplified mapping and might need adjustment
      else if (charCode >= 1570 && charCode <= 1610) {
        // Map Persian/Arabic letters to values 1-9
        value = (charCode - 1569) % 9;
        if (value === 0) value = 9;
      }
      
      return sum + value;
    }, 0);
    
    // Check for master numbers
    if (numerologicalValue === 11 || numerologicalValue === 22 || numerologicalValue === 33) {
      return numerologicalValue;
    }
    
    // Reduce to single digit
    return reduceToSingleDigit(numerologicalValue);
  };
  
  const reduceNumber = (num: number): number => {
    // Reduce a number to a single digit by summing its digits
    // e.g., 24 -> 2+4 = 6
    
    // Convert to string to process each digit
    const numStr = num.toString();
    
    // Sum the digits
    const sum = numStr.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    
    // Check for master numbers
    if (sum === 11 || sum === 22 || sum === 33) {
      return sum;
    }
    
    // If sum is still more than one digit, recurse
    if (sum > 9) {
      return reduceNumber(sum);
    }
    
    return sum;
  };
  
  const reduceToSingleDigit = (num: number): number => {
    // Always reduce to single digit, even for master numbers
    if (num <= 9) return num;
    
    // Convert to string to process each digit
    const numStr = num.toString();
    
    // Sum the digits
    const sum = numStr.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    
    // If sum is still more than one digit, recurse
    if (sum > 9) {
      return reduceToSingleDigit(sum);
    }
    
    return sum;
  };
  
  const getAuspiciousColors = (num: number): string[] => {
    // Get auspicious colors based on life path number
    const singleDigit = reduceToSingleDigit(num);
    
    const colorMap: Record<number, string[]> = {
      1: ['قرمز', 'نارنجی', 'زرد'],
      2: ['سبز آبی', 'سبز روشن', 'سفید'],
      3: ['زرد', 'بنفش', 'صورتی'],
      4: ['سبز', 'آبی', 'قهوه‌ای'],
      5: ['آبی آسمانی', 'خاکستری', 'نقره‌ای'],
      6: ['صورتی', 'آبی روشن', 'سبز روشن'],
      7: ['بنفش', 'آبی نیلی', 'خاکستری'],
      8: ['سبز تیره', 'آبی تیره', 'بژ'],
      9: ['طلایی', 'سفید', 'نارنجی روشن']
    };
    
    return colorMap[singleDigit] || ['سفید', 'آبی', 'سبز'];
  };
  
  const getLuckyDays = (num: number): string[] => {
    // Get lucky days based on life path number
    const singleDigit = reduceToSingleDigit(num);
    
    const dayMap: Record<number, string[]> = {
      1: ['یکشنبه', 'دوشنبه'],
      2: ['دوشنبه', 'جمعه'],
      3: ['سه‌شنبه', 'پنج‌شنبه'],
      4: ['چهارشنبه', 'شنبه'],
      5: ['پنج‌شنبه', 'چهارشنبه'],
      6: ['جمعه', 'سه‌شنبه'],
      7: ['شنبه', 'دوشنبه'],
      8: ['یکشنبه', 'شنبه'],
      9: ['سه‌شنبه', 'جمعه']
    };
    
    return dayMap[singleDigit] || ['چهارشنبه', 'جمعه'];
  };
  
  const copyNumerology = () => {
    if (interpretation) {
      const compatibleMonths = compatibleWith.map(m => {
        const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        return monthNames[m-1] || m;
      }).join('، ');
      
      const textToCopy = 
        `اعداد شناسی برای: ${name}\n` +
        `تاریخ تولد: ${new Date(birthDate).toLocaleDateString('fa-IR')}\n\n` +
        `عدد مسیر زندگی: ${lifePathNumber}\n` +
        `عدد سرنوشت: ${destinyNumber}\n\n` +
        `ویژگی‌های شخصیتی: ${personalityTraits.join('، ')}\n` +
        `رنگ‌های خوش یمن: ${auspiciousColors.join('، ')}\n` +
        `روزهای خوش یمن: ${luckyDays.join('، ')}\n` +
        `سازگاری با متولدین ماه‌های: ${compatibleMonths}\n\n` +
        interpretation.replace(/\*\*/g, '');
      
      copyToClipboard(textToCopy);
      toast.success("نتایج اعداد شناسی کپی شد!");
    }
  };
  
  const resetNumerology = () => {
    setIsRevealed(false);
    setLifePathNumber(0);
    setDestinyNumber(0);
    setPersonalityTraits([]);
    setCompatibleWith([]);
    setAuspiciousColors([]);
    setLuckyDays([]);
    setInterpretation('');
  };
  
  const translateMonthNumber = (monthNum: number): string => {
    const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    return monthNames[monthNum - 1] || monthNum.toString();
  };

  return (
    <Card className="bg-gradient-to-b from-[#eef9ff] to-[#e0f2ff] border-[#b3d7ff] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#b3d7ff] to-[#8fbbee] text-center pb-2 py-2 relative border-b border-[#b3d7ff]">
        <h2 className="text-sm font-bold text-[#1a365d] flex items-center justify-center">
          <Hash className="mr-2" size={16} />
          اعداد شناسی (نومرولوژی)
        </h2>
      </CardHeader>
      
      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#b3d7ff]/30 text-center">
                <p className="text-sm text-[#1a365d]">
                  اعداد شناسی یا نومرولوژی، علم باستانی مطالعه تأثیر اعداد بر زندگی و شخصیت انسان‌هاست. با وارد کردن نام و تاریخ تولد، اعداد مهم زندگی و معنای آن‌ها را کشف کنید.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-[#b3d7ff]/20">
                  <label className="block text-[#1a365d] text-xs mb-1.5 font-medium flex items-center">
                    <User size={14} className="ml-1" />
                    نام و نام خانوادگی:
                  </label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2 border border-[#b3d7ff]/30 rounded-md focus:ring-1 focus:ring-[#8fbbee] focus:outline-none"
                    placeholder="نام کامل خود را وارد کنید"
                  />
                </div>
                
                <div className="bg-white/50 p-3 rounded-lg border border-[#b3d7ff]/20">
                  <label className="block text-[#1a365d] text-xs mb-1.5 font-medium flex items-center">
                    <Calendar size={14} className="ml-1" />
                    تاریخ تولد:
                  </label>
                  <input 
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full text-xs p-2 border border-[#b3d7ff]/30 rounded-md focus:ring-1 focus:ring-[#8fbbee] focus:outline-none"
                  />
                  <p className="mt-1.5 text-[10px] text-[#1a365d]/70">تاریخ تولد میلادی (روز/ماه/سال)</p>
                </div>
              </div>
              
              <div className="flex justify-center py-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#e0f2ff] to-[#b3d7ff] flex items-center justify-center border border-[#b3d7ff] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{
                    background: "radial-gradient(circle at center, white 0%, transparent 70%)"
                  }}></div>
                  <Hash size={32} className="text-[#1a365d] opacity-60" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center space-x-4 rtl:space-x-reverse py-3">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff9a9a] to-[#ffd89a] border-2 border-white shadow-lg flex items-center justify-center mx-auto">
                    <div className="text-2xl font-bold text-white">{lifePathNumber}</div>
                  </div>
                  <p className="mt-2 text-xs font-medium text-[#1a365d]">عدد مسیر زندگی</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9ab5ff] to-[#9ad6ff] border-2 border-white shadow-lg flex items-center justify-center mx-auto">
                    <div className="text-2xl font-bold text-white">{destinyNumber}</div>
                  </div>
                  <p className="mt-2 text-xs font-medium text-[#1a365d]">عدد سرنوشت</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-white/50 p-3 rounded-lg border border-[#b3d7ff]/20">
                  <h4 className="text-xs font-medium text-[#1a365d] mb-2">ویژگی‌های شخصیتی:</h4>
                  <div className="flex flex-wrap gap-1">
                    {personalityTraits.map((trait, i) => (
                      <span 
                        key={i}
                        className="text-[10px] bg-[#e0f2ff] text-[#1a365d] px-2 py-1 rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/50 p-3 rounded-lg border border-[#b3d7ff]/20">
                  <h4 className="text-xs font-medium text-[#1a365d] mb-2">سازگار با متولدین:</h4>
                  <div className="flex flex-wrap gap-1">
                    {compatibleWith.map((month, i) => (
                      <span 
                        key={i}
                        className="text-[10px] bg-[#e0f2ff] text-[#1a365d] px-2 py-1 rounded-full"
                      >
                        {translateMonthNumber(month)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/50 p-3 rounded-lg border border-[#b3d7ff]/20">
                  <h4 className="text-xs font-medium text-[#1a365d] mb-2">رنگ‌های خوش یمن:</h4>
                  <div className="flex flex-wrap gap-1">
                    {auspiciousColors.map((color, i) => (
                      <span 
                        key={i}
                        className="text-[10px] bg-[#e0f2ff] text-[#1a365d] px-2 py-1 rounded-full"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/50 p-3 rounded-lg border border-[#b3d7ff]/20">
                  <h4 className="text-xs font-medium text-[#1a365d] mb-2">روزهای خوش یمن:</h4>
                  <div className="flex flex-wrap gap-1">
                    {luckyDays.map((day, i) => (
                      <span 
                        key={i}
                        className="text-[10px] bg-[#e0f2ff] text-[#1a365d] px-2 py-1 rounded-full"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg border border-[#b3d7ff]/30 shadow-sm">
                <h4 className="text-sm font-medium text-[#1a365d] mb-2">تفسیر اعداد:</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-xs font-bold text-[#1a365d]">عدد مسیر زندگی: {lifePathNumber}</h5>
                    <p className="text-xs text-[#1a365d]/90">{LIFE_PATH_MEANINGS[lifePathNumber] || LIFE_PATH_MEANINGS[reduceToSingleDigit(lifePathNumber)]}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-bold text-[#1a365d]">عدد سرنوشت: {destinyNumber}</h5>
                    <p className="text-xs text-[#1a365d]/90">{DESTINY_MEANINGS[destinyNumber] || DESTINY_MEANINGS[reduceToSingleDigit(destinyNumber)]}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#b3d7ff]/20">
        {!isRevealed ? (
          <Button
            onClick={calculateNumerology}
            disabled={isLoading || !name || !birthDate}
            className="bg-[#8fbbee] hover:bg-[#75a9e3] text-white text-xs h-9 px-4 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {isLoading ? 
              <RefreshCw className="animate-spin mr-1" size={14} /> : 
              <Sparkles className="mr-1" size={14} />
            }
            محاسبه اعداد شناسی
          </Button>
        ) : (
          <>
            <Button
              onClick={resetNumerology}
              variant="outline"
              size="sm"
              className="border-[#8fbbee] text-[#1a365d] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              محاسبه مجدد
            </Button>
            
            <Button
              onClick={copyNumerology}
              variant="outline"
              size="sm"
              className="border-[#8fbbee] text-[#1a365d] text-xs h-9 px-3"
            >
              <Copy size={14} className="mr-1" />
              کپی نتایج
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default Numerology;
