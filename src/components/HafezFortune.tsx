
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Book, RefreshCw, Copy } from "lucide-react";
import { copyToClipboard } from "@/utils/randomUtils";

const hafezPoems = [
  {
    verse: "به لاله‌زار چمن گر بدین نشاط روی / کند صبا به گل افشانی از تو دلجویی",
    interpretation: "اگر با نشاط و شادمانی به دامن طبیعت بروی، نسیم صبحگاهی با گل‌افشانی از تو استقبال خواهد کرد. این فال نشان می‌دهد که مسیری شاد و پر از موفقیت پیش روی شماست."
  },
  {
    verse: "دلا طمع مبر از لطف بی‌حساب که شاه / نظر به حال گدایان دل‌شکسته کند",
    interpretation: "امید داشته باش و از لطف بی‌پایان خداوند ناامید نشو، زیرا او همیشه به حال دل‌شکستگان توجه می‌کند. این فال نشان می‌دهد که پس از سختی‌ها، گشایش در راه است."
  },
  {
    verse: "چه گویمت که به میخانه دوش مست و خراب / سروش عالم غیبم چه مژده‌ها دادست",
    interpretation: "آنچنان حال خوبی در پیش است که قابل وصف نیست. این فال از خبرهای خوش و مژده‌هایی که در راه هستند خبر می‌دهد."
  },
  {
    verse: "مژده‌ای دل که مسیحا نفسی می‌آید / که ز انفاس خوشش بوی کسی می‌آید",
    interpretation: "این فال خبر از آمدن شخص یا موقعیتی تازه در زندگی شما می‌دهد که همچون مسیح، التیام‌بخش دردها و مشکلات شماست."
  },
  {
    verse: "رسید مژده که ایام غم نخواهد ماند / چنان نماند چنین نیز هم نخواهد ماند",
    interpretation: "این فال بشارت می‌دهد که دوران سختی و غم به پایان خواهد رسید. همانطور که روزهای خوش گذشت، روزهای سخت نیز خواهد گذشت."
  },
  {
    verse: "یا رب این کعبه مقصود تماشاگه کیست / که مغیلان طریقش گل و نسرین من است",
    interpretation: "این فال نشان می‌دهد که برای رسیدن به هدف ارزشمندتان، باید سختی‌ها را تحمل کنید. مسیر دشوار است اما نتیجه ارزشمند خواهد بود."
  },
  {
    verse: "نفس باد صبا مشک‌فشان خواهد شد / عالم پیر دگرباره جوان خواهد شد",
    interpretation: "این فال خبر از تغییر و تحولی بزرگ و مثبت در زندگی شما می‌دهد. دوران تازه‌ای در پیش است که با خود شادابی و نشاط به همراه دارد."
  },
  {
    verse: "گر چه بیرون ز ادب گفتم و از طریق خرد / عاشقم، عفو کنید این همه بی‌ادب مرا",
    interpretation: "این فال نشان می‌دهد که گاهی برای رسیدن به خواسته‌هایتان، باید از چارچوب‌های معمول خارج شوید و روش‌های متفاوتی را امتحان کنید."
  },
  {
    verse: "گلعذاری ز گلستان جهان ما را بس / زین چمن سایه آن سرو روان ما را بس",
    interpretation: "این فال نشان می‌دهد که باید به داشته‌هایتان قانع باشید. یک یار و همراه خوب در این دنیا برای شما کافی است."
  },
  {
    verse: "من که باشم که بر آن خاطر عاطر گذرم / لطف‌ها می‌کنی ای خاک درت تاج سرم",
    interpretation: "این فال نشان می‌دهد که مورد لطف و عنایت قرار خواهید گرفت، حتی اگر خود را لایق آن ندانید."
  }
];

const dailyFortunes = [
  "امروز روز شانس شماست! در یک موقعیت مالی، فرصتی عالی پیش رویتان قرار می‌گیرد.",
  "امروز در روابط عاطفی بسیار موفق خواهید بود. زمان مناسبی برای گفتگوهای مهم است.",
  "امروز بهتر است محتاط باشید و تصمیمات مهم را به تعویق بیندازید.",
  "امروز برای شروع پروژه‌های جدید مناسب است. انرژی و خلاقیت بالایی دارید.",
  "امروز احتمال دارد خبری خوش در زمینه کاری دریافت کنید.",
  "امروز یک دوست قدیمی با شما تماس خواهد گرفت که باعث خوشحالی شما می‌شود.",
  "امروز برای حل مشکلات گذشته زمان مناسبی است.",
  "امروز فرصت خوبی برای استراحت و تجدید قوا دارید.",
  "امروز با چالش‌هایی روبرو می‌شوید که در نهایت به نفع شما تمام خواهد شد.",
  "امروز در محیط کار مورد تحسین قرار می‌گیرید."
];

export const HafezFortune = () => {
  const [currentPoem, setCurrentPoem] = useState<typeof hafezPoems[0] | null>(null);
  const [dailyFortune, setDailyFortune] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomHafezFortune = () => {
    setIsAnimating(true);
    
    // Simulate fortune-telling animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * hafezPoems.length);
      setCurrentPoem(hafezPoems[randomIndex]);
      setIsAnimating(false);
      toast.success("فال حافظ گرفته شد!");
    }, 1000);
  };

  const getDailyFortune = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * dailyFortunes.length);
      setDailyFortune(dailyFortunes[randomIndex]);
      setIsAnimating(false);
      toast.success("شانس امروز شما مشخص شد!");
    }, 1000);
  };

  const copyPoem = () => {
    if (currentPoem) {
      copyToClipboard(`${currentPoem.verse}\n\nتعبیر: ${currentPoem.interpretation}`);
    }
  };

  return (
    <section className="mb-8 space-y-4 animate-fade-in" style={{ animationDelay: '0.15s' }}>
      <div className="grid md:grid-cols-2 gap-3">
        {/* Hafez Fortune Card */}
        <Card className="bg-[#f7f1e3] border-[#d1b980] shadow-sm overflow-hidden">
          <CardHeader className="bg-[#d1b980] text-center pb-2 py-2">
            <div className="flex items-center justify-center">
              <Book className="text-[#5c3f14] mr-2" size={16} />
              <h2 className="text-sm font-bold text-[#5c3f14]">فال حافظ</h2>
            </div>
          </CardHeader>
          
          <CardContent className="pt-2 px-3 min-h-[100px] flex flex-col justify-center">
            {currentPoem ? (
              <div className={`text-center space-y-2 ${isAnimating ? 'opacity-50' : ''}`}>
                <p className="text-[#5c3f14] text-xs font-medium leading-5">{currentPoem.verse}</p>
                <div className="h-px bg-[#d1b980] my-1 mx-auto w-2/3"></div>
                <p className="text-gray-700 text-[10px]">{currentPoem.interpretation}</p>
              </div>
            ) : (
              <div className="text-center text-gray-600 text-xs">
                <p>برای گرفتن فال حافظ، نیت کنید و دکمه زیر را بزنید.</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between pt-1 pb-2">
            <Button 
              onClick={getRandomHafezFortune} 
              disabled={isAnimating}
              size="sm" 
              className="bg-[#d1b980] hover:bg-[#c4a76b] text-[#5c3f14] text-[10px] h-7 px-2"
            >
              {isAnimating ? <RefreshCw className="animate-spin mr-1" size={12} /> : null}
              گرفتن فال
            </Button>
            
            {currentPoem && (
              <Button 
                variant="outline"
                size="sm"
                onClick={copyPoem} 
                className="border-[#d1b980] text-[#5c3f14] text-[10px] h-7 px-2"
              >
                <Copy size={12} className="mr-1" />
                کپی فال
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Daily Fortune Card */}
        <Card className="bg-[#e3f0f7] border-[#80abd1] shadow-sm overflow-hidden">
          <CardHeader className="bg-[#80abd1] text-center pb-2 py-2">
            <div className="flex items-center justify-center">
              <span className="mr-2 text-[#143a5c] text-sm">✨</span>
              <h2 className="text-sm font-bold text-[#143a5c]">شانس روزانه</h2>
            </div>
          </CardHeader>
          
          <CardContent className="pt-2 px-3 min-h-[100px] flex flex-col justify-center">
            {dailyFortune ? (
              <div className={`text-center ${isAnimating ? 'opacity-50' : ''}`}>
                <p className="text-[#143a5c] text-xs font-medium leading-5">{dailyFortune}</p>
              </div>
            ) : (
              <div className="text-center text-gray-600 text-xs">
                <p>برای دیدن شانس امروز خود، دکمه زیر را بزنید.</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center pt-1 pb-2">
            <Button 
              onClick={getDailyFortune} 
              disabled={isAnimating}
              size="sm"
              className="bg-[#80abd1] hover:bg-[#6b94c4] text-[#143a5c] text-[10px] h-7 px-2"
            >
              {isAnimating ? <RefreshCw className="animate-spin mr-1" size={12} /> : null}
              شانس امروز من
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

