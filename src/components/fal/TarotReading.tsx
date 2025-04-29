
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { RefreshCw, Copy, CircleHelp, BookOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { copyToClipboard } from "@/utils/randomUtils";

// Tarot cards data
const tarotCards = [
  {
    name: "برج",
    description: "آغاز راه جدید، تغییرات ناگهانی، فروپاشی باورهای قدیمی. این کارت نشان‌دهنده تحولات بزرگ و گاه دردناک است که در نهایت به رشد می‌انجامد."
  },
  {
    name: "ماه",
    description: "ناخودآگاه، رویاها، توهمات و ترس‌های پنهان. این کارت هشدار می‌دهد که همه چیز آن‌طور که به نظر می‌رسد نیست؛ به شهود درونی خود اعتماد کنید."
  },
  {
    name: "خورشید",
    description: "موفقیت، شادمانی، انرژی مثبت و خوش‌بینی. این کارت یکی از مثبت‌ترین کارت‌ها در تاروت است و نوید روزهای روشن می‌دهد."
  },
  {
    name: "فرشته قضاوت",
    description: "بازنگری، ارزیابی، بیداری معنوی و دگرگونی. این کارت شما را به بررسی گذشته و پذیرش مسئولیت اعمال خود فرا می‌خواند."
  },
  {
    name: "جهان",
    description: "تکمیل، موفقیت، دستاورد و تحقق. این کارت نشانگر پایان یک دوره و آغاز دوره‌ای جدید با آمادگی کامل است."
  },
  {
    name: "جادوگر",
    description: "خلاقیت، استعداد، مهارت و توانایی برقراری ارتباط بین دنیای مادی و معنوی. این کارت نشان می‌دهد که ابزار لازم برای موفقیت را در اختیار دارید."
  },
  {
    name: "ملکه کاهنه",
    description: "بصیرت، شهود، دانش درونی و خرد پنهان. این کارت شما را به گوش دادن به ندای درون و اعتماد به شهودتان دعوت می‌کند."
  },
  {
    name: "امپراتور",
    description: "اقتدار، انضباط، رهبری و ساختار. این کارت نمادی از قدرت پدرانه، نظم و سازماندهی است."
  },
  {
    name: "عاشقان",
    description: "عشق، هماهنگی، انتخاب‌های مهم و ارتباطات. این کارت نشانگر تصمیم‌گیری‌های قلبی و انتخاب بین دو مسیر است."
  },
  {
    name: "ارابه",
    description: "پیروزی، عزم راسخ، اراده قوی و غلبه بر موانع. این کارت نوید موفقیت از طریق تلاش و پشتکار می‌دهد."
  },
  {
    name: "عدالت",
    description: "تعادل، عدالت، صداقت و حقیقت. این کارت نشان می‌دهد که هر عملی پیامدی دارد و هر کس به اندازه اعمالش پاداش یا مجازات می‌شود."
  },
  {
    name: "مرگ",
    description: "پایان، تغییر، دگرگونی و تولد دوباره. این کارت نه به معنای مرگ فیزیکی، بلکه نشانگر پایان یک دوره و آغاز فصلی جدید است."
  }
];

export const TarotReading = () => {
  const [selectedCards, setSelectedCards] = useState<typeof tarotCards[number][]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const drawCards = () => {
    setIsAnimating(true);
    setIsRevealed(false);
    
    // Simulate card drawing with a delay
    setTimeout(() => {
      // Shuffle the cards and select three
      const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
      const selectedThree = shuffled.slice(0, 3);
      
      setSelectedCards(selectedThree);
      setIsAnimating(false);
      setHasDrawn(true);
      toast.success("کارت‌های تاروت انتخاب شدند!");
    }, 1500);
  };

  const revealMeaning = () => {
    setIsRevealed(true);
    toast.success("معنای کارت‌ها آشکار شد!");
  };

  const copyReading = () => {
    if (selectedCards.length > 0) {
      const readingText = selectedCards.map((card, index) => {
        const position = index === 0 ? "گذشته" : index === 1 ? "حال" : "آینده";
        return `کارت ${position}: ${card.name}\n${isRevealed ? card.description : "معنی هنوز آشکار نشده است."}`;
      }).join('\n\n');
      
      copyToClipboard(readingText);
    }
  };

  // Add CSS class for card flip animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .perspective-card {
        perspective: 1000px;
      }
      .tarot-card {
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }
      .tarot-card-front, .tarot-card-back {
        backface-visibility: hidden;
      }
      .tarot-card-back {
        transform: rotateY(180deg);
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
      .glass-card {
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.2);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Card className="bg-[#e9f0f7] border-[#b0c8e6] shadow-sm overflow-hidden">
      <CardHeader className="bg-[#b0c8e6] text-center pb-2 py-2">
        <div className="flex items-center justify-center">
          <BookOpen className="text-[#143a5c] mr-2" size={16} />
          <h2 className="text-sm font-bold text-[#143a5c]">فال تاروت</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 px-3">
        <div className="space-y-3">
          <p className="text-center text-[#143a5c] text-xs">سه کارت تاروت که نشان‌دهنده گذشته، حال و آینده شماست انتخاب کنید.</p>
          
          {selectedCards.length > 0 ? (
            <div className={`grid grid-cols-3 gap-2 ${isAnimating ? 'opacity-50' : ''}`}>
              {selectedCards.map((card, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-full aspect-[2/3] mb-1 perspective-card">
                    <div className={`tarot-card absolute w-full h-full transition-all duration-700 transform ${isRevealed ? 'rotate-y-180' : ''}`}>
                      <div className="tarot-card-front absolute w-full h-full glass-card rounded-lg p-2 flex items-center justify-center border-2 border-[#b0c8e6]">
                        <span className="text-[#143a5c] text-[10px] font-bold text-center">{card.name}</span>
                      </div>
                      <div className="tarot-card-back absolute w-full h-full glass-card rounded-lg p-2 flex items-center justify-center border-2 border-[#b0c8e6] rotateY-180">
                        <span className="text-[#143a5c] text-[8px] text-center overflow-auto max-h-full">
                          {isRevealed ? card.description : "..."}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[8px] text-[#143a5c] text-center font-medium">
                    {index === 0 ? "گذشته" : index === 1 ? "حال" : "آینده"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-[#143a5c] text-xs py-4">
              <p>برای دریافت فال، دکمه کشیدن کارت را فشار دهید.</p>
              <div className="mt-4 flex justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-[#143a5c] cursor-help text-xs inline-flex items-center">
                        <CircleHelp size={14} className="mr-1" />
                        راهنمای تاروت
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-xs p-2 max-w-xs text-right">
                      <p>کارت‌های تاروت فال باستانی هستند که برای پیش‌بینی آینده، درک گذشته و بصیرت در شرایط فعلی استفاده می‌شوند.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-1 pb-2">
        <Button 
          onClick={drawCards} 
          disabled={isAnimating}
          size="sm" 
          className="bg-[#b0c8e6] hover:bg-[#95b1d6] text-[#143a5c] text-[10px] h-7 px-2"
        >
          {isAnimating ? <RefreshCw className="animate-spin mr-1" size={12} /> : null}
          کشیدن کارت
        </Button>
        
        {selectedCards.length > 0 && !isRevealed && (
          <Button 
            variant="outline"
            size="sm"
            onClick={revealMeaning} 
            className="border-[#b0c8e6] text-[#143a5c] text-[10px] h-7 px-2"
          >
            <CircleHelp size={12} className="mr-1" />
            آشکار کردن معنی
          </Button>
        )}
        
        {selectedCards.length > 0 && (
          <Button 
            variant="outline"
            size="sm"
            onClick={copyReading} 
            className="border-[#b0c8e6] text-[#143a5c] text-[10px] h-7 px-2"
          >
            <Copy size={12} className="mr-1" />
            کپی فال
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
