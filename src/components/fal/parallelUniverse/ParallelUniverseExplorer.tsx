import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { copyToClipboard } from "@/utils/randomUtils";

// Types for parallel universe data
interface ParallelUniverse {
  id: number;
  name: string;
  description: string;
  characteristics: string[];
  youInThisUniverse: string;
  probability: number;
  type: 'utopian' | 'dystopian' | 'neutral' | 'bizarre';
}

export const ParallelUniverseExplorer = () => {
  const [universe, setUniverse] = useState<ParallelUniverse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasNewUniverse, setHasNewUniverse] = useState(false);

  // Session storage key for tracking shown universes
  const SHOWN_UNIVERSES_KEY = 'shown_parallel_universes';
  
  // Parallel universe data
  const parallelUniverses: ParallelUniverse[] = [
    {
      id: 1,
      name: "جهان هارمونی",
      description: "جهانی که در آن انسان‌ها به هماهنگی کامل با طبیعت رسیده‌اند و تکنولوژی در خدمت حفظ محیط زیست است.",
      characteristics: [
        "انرژی‌های تجدیدپذیر منبع اصلی انرژی",
        "شهرهای عمودی با باغ‌های معلق",
        "نبود پول و اقتصاد مبتنی بر مشارکت",
        "ارتباط تله‌پاتیک بین انسان‌ها"
      ],
      youInThisUniverse: "شما در این جهان یک هماهنگ‌کننده طبیعت هستید که با گیاهان ارتباط برقرار می‌کند و به حفظ تعادل اکوسیستم کمک می‌کند.",
      probability: 0.02,
      type: 'utopian'
    },
    {
      id: 2,
      name: "جهان دیجیتال",
      description: "جهانی که در آن مرز بین واقعیت فیزیکی و دیجیتال از بین رفته و ذهن انسان‌ها به یک شبکه جهانی متصل شده است.",
      characteristics: [
        "زندگی در فضاهای مجازی سفارشی",
        "جاودانگی دیجیتال ذهن",
        "هوش مصنوعی به عنوان همراهان شخصی",
        "سفر آنی به هر نقطه از جهان از طریق دروازه‌های کوانتومی"
      ],
      youInThisUniverse: "شما در این جهان یک معمار واقعیت هستید که جهان‌های مجازی را برای دیگران طراحی می‌کند.",
      probability: 0.15,
      type: 'neutral'
    },
    {
      id: 3,
      name: "جهان پسا-آخرالزمان",
      description: "جهانی که پس از یک فاجعه جهانی، بازماندگان در حال بازسازی تمدن با قوانین و ارزش‌های جدید هستند.",
      characteristics: [
        "شهرهای کوچک خودکفا",
        "تکنولوژی ترکیبی از مدرن و باستانی",
        "منابع کمیاب و ارزشمند",
        "جهش‌های ژنتیکی در برخی انسان‌ها"
      ],
      youInThisUniverse: "شما در این جهان یک جمع‌آورنده دانش هستید که به دنبال کتاب‌ها و اطلاعات از تمدن قبلی می‌گردد.",
      probability: 0.08,
      type: 'dystopian'
    },
    {
      id: 4,
      name: "جهان جادویی",
      description: "جهانی که در آن جادو واقعی است و انسان‌ها توانایی‌های فراطبیعی دارند که با تمرین و مطالعه قابل پرورش است.",
      characteristics: [
        "مدارس جادوگری و طلسم",
        "موجودات افسانه‌ای به عنوان همراهان",
        "انرژی جادویی به جای الکتریسیته",
        "درمان بیماری‌ها با شفادهندگان"
      ],
      youInThisUniverse: "شما در این جهان یک جادوگر عناصر هستید که می‌تواند آب، خاک، هوا و آتش را کنترل کند.",
      probability: 0.001,
      type: 'bizarre'
    },
    {
      id: 5,
      name: "جهان مکانیکی",
      description: "جهانی که در آن انسان‌ها با ماشین‌ها ترکیب شده‌اند و مرز بین انسان و ربات مبهم است.",
      characteristics: [
        "اندام‌های مکانیکی قابل تعویض",
        "ذخیره‌سازی خاطرات در هارد دیسک‌های بیولوژیکی",
        "شهرهای متحرک غول‌پیکر",
        "انرژی بی‌پایان از طریق فیوژن سرد"
      ],
      youInThisUniverse: "شما در این جهان یک مهندس زیست-مکانیک هستید که اندام‌های پیشرفته برای انسان‌ها طراحی می‌کند.",
      probability: 0.05,
      type: 'neutral'
    },
    {
      id: 6,
      name: "جهان زیرآبی",
      description: "جهانی که در آن سطح زمین زیر آب رفته و انسان‌ها با تغییرات ژنتیکی و تکنولوژی برای زندگی در اقیانوس‌ها سازگار شده‌اند.",
      characteristics: [
        "شهرهای حباب‌مانند زیر آب",
        "آبشش‌های مصنوعی برای تنفس",
        "ارتباط از طریق امواج صوتی",
        "پرورش جلبک‌ها به عنوان منبع اصلی غذا"
      ],
      youInThisUniverse: "شما در این جهان یک کاوشگر اعماق هستید که به دنبال بقایای تمدن خشکی می‌گردد.",
      probability: 0.03,
      type: 'neutral'
    },
    {
      id: 7,
      name: "جهان کوانتومی",
      description: "جهانی که در آن انسان‌ها به درک کامل فیزیک کوانتوم رسیده‌اند و می‌توانند واقعیت را با فکر خود تغییر دهند.",
      characteristics: [
        "تله‌پورت به عنوان روش اصلی حمل و نقل",
        "ساختمان‌هایی که با فکر ساخته می‌شوند",
        "زندگی همزمان در چندین واقعیت",
        "ارتباط فرازمانی با گذشته و آینده"
      ],
      youInThisUniverse: "شما در این جهان یک مهندس واقعیت هستید که می‌تواند جهان‌های موازی را به هم متصل کند.",
      probability: 0.0001,
      type: 'bizarre'
    },
    {
      id: 8,
      name: "جهان بدون تکنولوژی",
      description: "جهانی که در آن انسان‌ها تصمیم گرفته‌اند به زندگی ساده و در هماهنگی با طبیعت بازگردند و تکنولوژی پیشرفته را کنار گذاشته‌اند.",
      characteristics: [
        "جوامع کوچک خودکفا",
        "دانش گسترده گیاه‌شناسی و طب سنتی",
        "ارتباط نزدیک با حیوانات",
        "هنر و موسیقی به عنوان بخش مهمی از زندگی روزمره"
      ],
      youInThisUniverse: "شما در این جهان یک داستان‌سرا هستید که تاریخ و دانش را از طریق قصه‌ها به نسل بعد منتقل می‌کند.",
      probability: 0.07,
      type: 'utopian'
    },
    {
      id: 9,
      name: "جهان پرنده",
      description: "جهانی که در آن انسان‌ها بال‌دار هستند و بیشتر زندگی در آسمان و شهرهای شناور جریان دارد.",
      characteristics: [
        "خانه‌های لانه‌مانند در ارتفاعات",
        "ورزش‌های هوایی پیچیده",
        "موسیقی مبتنی بر صداهای باد",
        "سیستم‌های پیچیده جریان هوا برای حمل و نقل"
      ],
      youInThisUniverse: "شما در این جهان یک مسابقه‌دهنده بال هستید که در مسابقات سرعت شرکت می‌کند.",
      probability: 0.005,
      type: 'bizarre'
    },
    {
      id: 10,
      name: "جهان تاریک",
      description: "جهانی که در آن خورشید خاموش شده و انسان‌ها برای زندگی در تاریکی دائمی سازگار شده‌اند.",
      characteristics: [
        "بینایی فراصوت مانند خفاش‌ها",
        "منابع انرژی زمین‌گرمایی",
        "گیاهان شب‌تاب به عنوان منبع نور",
        "حس‌های تقویت‌شده لامسه و شنوایی"
      ],
      youInThisUniverse: "شما در این جهان یک راهنمای نور هستید که مسیرهای امن را با استفاده از قارچ‌های شب‌تاب نشانه‌گذاری می‌کند.",
      probability: 0.002,
      type: 'dystopian'
    },
    {
      id: 11,
      name: "جهان ذهن‌خوانی",
      description: "جهانی که در آن همه انسان‌ها توانایی خواندن افکار یکدیگر را دارند و هیچ رازی وجود ندارد.",
      characteristics: [
        "معماری باز بدون دیوار",
        "نبود جرم و جنایت",
        "زبان گفتاری منسوخ شده",
        "هنر انتزاعی برای بیان احساسات پیچیده"
      ],
      youInThisUniverse: "شما در این جهان یک محافظ خصوصی هستید که به افراد کمک می‌کند برخی افکار خود را پنهان کنند.",
      probability: 0.01,
      type: 'neutral'
    },
    {
      id: 12,
      name: "جهان مینیاتوری",
      description: "جهانی که در آن انسان‌ها به اندازه حشرات کوچک شده‌اند و در یک باغ معمولی زندگی می‌کنند.",
      characteristics: [
        "خانه‌هایی در داخل گل‌ها و قارچ‌ها",
        "حمل و نقل با حشرات اهلی‌شده",
        "فناوری میکروسکوپی پیشرفته",
        "دفاع در برابر حیوانات غول‌پیکر (حشرات معمولی)"
      ],
      youInThisUniverse: "شما در این جهان یک خلبان زنبور هستید که مسئول حمل و نقل بین شهرهای مختلف است.",
      probability: 0.0005,
      type: 'bizarre'
    },
    {
      id: 13,
      name: "جهان بی‌وزنی",
      description: "جهانی که در آن جاذبه بسیار ضعیف است و انسان‌ها در حالت شناور زندگی می‌کنند.",
      characteristics: [
        "معماری سه‌بعدی بدون کف و سقف مشخص",
        "ورزش‌های پیچیده هوایی",
        "سیستم‌های مهار برای خواب",
        "هنر متحرک سه‌بعدی"
      ],
      youInThisUniverse: "شما در این جهان یک طراح مسیر هستید که راه‌های هوایی امن برای حرکت بین ساختمان‌ها ایجاد می‌کند.",
      probability: 0.003,
      type: 'neutral'
    },
    {
      id: 14,
      name: "جهان موسیقی",
      description: "جهانی که در آن موسیقی نیرویی فیزیکی است و می‌تواند واقعیت را تغییر دهد.",
      characteristics: [
        "ساختمان‌هایی که با هارمونی نگه داشته می‌شوند",
        "درمان بیماری‌ها با فرکانس‌های صوتی",
        "ارتباط از طریق ملودی به جای کلمات",
        "جنگ‌ها به صورت مبارزات موسیقی"
      ],
      youInThisUniverse: "شما در این جهان یک شفادهنده موسیقی هستید که با نواختن ملودی‌های خاص بیماری‌ها را درمان می‌کند.",
      probability: 0.0008,
      type: 'bizarre'
    },
    {
      id: 15,
      name: "جهان رویا",
      description: "جهانی که در آن مرز بین رویا و واقعیت از بین رفته و انسان‌ها می‌توانند رویاهای خود را به واقعیت تبدیل کنند.",
      characteristics: [
        "منظره‌های متغیر بر اساس احساسات جمعی",
        "موجودات خیالی که از رویاها به واقعیت آمده‌اند",
        "معماری غیرممکن که قوانین فیزیک را نقض می‌کند",
        "سفر از طریق رویاهای دیگران"
      ],
      youInThisUniverse: "شما در این جهان یک محافظ رویا هستید که از مردم در برابر کابوس‌هایی که واقعی می‌شوند محافظت می‌کند.",
      probability: 0.0003,
      type: 'bizarre'
    }
  ];
  
  const getRandomUniverse = () => {
    setIsLoading(true);
    setIsAnimating(true);
    
    // Get the IDs of universes we've already shown
    const storedUniverses = sessionStorage.getItem(SHOWN_UNIVERSES_KEY);
    let shownUniverseIds: number[] = storedUniverses ? JSON.parse(storedUniverses) : [];
    
    // If all universes have been shown, reset the list
    if (shownUniverseIds.length >= parallelUniverses.length) {
      shownUniverseIds = [];
    }
    
    // Find universes that haven't been shown yet
    const availableUniverses = parallelUniverses.filter(u => !shownUniverseIds.includes(u.id));
    
    setTimeout(() => {
      // If we have available universes, pick one randomly
      if (availableUniverses.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableUniverses.length);
        const selectedUniverse = availableUniverses[randomIndex];
        
        // Update shown universes in session storage
        shownUniverseIds.push(selectedUniverse.id);
        sessionStorage.setItem(SHOWN_UNIVERSES_KEY, JSON.stringify(shownUniverseIds));
        
        setUniverse(selectedUniverse);
        setHasNewUniverse(true);
        
        // Reset the "new universe" indicator after a delay
        setTimeout(() => setHasNewUniverse(false), 3000);
      } else {
        // This should never happen, but as a fallback...
        const randomIndex = Math.floor(Math.random() * parallelUniverses.length);
        setUniverse(parallelUniverses[randomIndex]);
      }
      
      setIsLoading(false);
      setIsAnimating(false);
      toast.success("جهان موازی جدید کشف شد!");
    }, 1500);
  };
  
  const copyUniverseDetails = () => {
    if (universe) {
      const text = `جهان موازی: ${universe.name}\n\n${universe.description}\n\nویژگی‌ها:\n${universe.characteristics.map(c => `• ${c}`).join('\n')}\n\nشما در این جهان:\n${universe.youInThisUniverse}\n\nاحتمال وجود: ${(universe.probability * 100).toFixed(4)}%`;
      
      copyToClipboard(text);
      toast.success("اطلاعات جهان موازی کپی شد!");
    }
  };
  
  // Get a universe on first load
  useEffect(() => {
    if (!universe) {
      getRandomUniverse();
    }
  }, []);

  // Get background color based on universe type
  const getUniverseTypeColor = (type: ParallelUniverse['type']) => {
    switch (type) {
      case 'utopian': return 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200';
      case 'dystopian': return 'bg-gradient-to-r from-rose-50 to-red-50 border-rose-200';
      case 'bizarre': return 'bg-gradient-to-r from-purple-50 to-fuchsia-50 border-purple-200';
      default: return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200';
    }
  };
  
  // Get text color based on universe type
  const getUniverseTypeTextColor = (type: ParallelUniverse['type']) => {
    switch (type) {
      case 'utopian': return 'text-emerald-700';
      case 'dystopian': return 'text-rose-700';
      case 'bizarre': return 'text-purple-700';
      default: return 'text-blue-700';
    }
  };
  
  // Get badge color based on universe type
  const getUniverseTypeBadge = (type: ParallelUniverse['type']) => {
    switch (type) {
      case 'utopian': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'dystopian': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'bizarre': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  // Get universe type in Persian
  const getUniverseTypeInPersian = (type: ParallelUniverse['type']) => {
    switch (type) {
      case 'utopian': return 'آرمانی';
      case 'dystopian': return 'ویرانشهری';
      case 'bizarre': return 'عجیب';
      default: return 'خنثی';
    }
  };

  return (
    <Card className={`shadow-md overflow-hidden relative ${universe ? getUniverseTypeColor(universe.type) : 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200'}`}>
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <CardHeader className="bg-gradient-to-r from-[#2a1c64] to-[#1e1256] text-center pb-2 py-2 relative border-b border-[#2a1c64]">
        <div className="flex items-center justify-center">
          <Globe className="text-white mr-2" size={16} />
          <h2 className="text-sm font-bold text-white flex items-center">
            کاوش جهان‌های موازی
            <span className="mr-1.5 inline-block"><Sparkles size={12} className="text-white opacity-70" /></span>
          </h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 px-3">
        <div className="space-y-3">
          {!universe ? (
            <div className="text-center text-gray-600 text-sm py-4">
              <p className="mb-3">در حال جستجوی جهان‌های موازی...</p>
              <div className="mt-3 flex justify-center">
                <div className="animate-spin">
                  <Globe size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          ) : (
            <div className={`space-y-4 ${isAnimating ? 'opacity-50' : 'universe-appear'}`}>
              {/* New universe indicator */}
              {hasNewUniverse && (
                <div className="text-center">
                  <span className="inline-block bg-[#2a1c64]/10 text-[#2a1c64] text-xs px-3 py-1 rounded-full border border-[#2a1c64]/30 animate-pulse">
                    ✨ جهان موازی جدید کشف شد ✨
                  </span>
                </div>
              )}
              
              <div className="flex justify-center">
                <div className="w-16 h-0.5 bg-[#2a1c64]/30"></div>
              </div>
              
              <div className="text-center">
                <h3 className={`font-bold text-lg ${getUniverseTypeTextColor(universe.type)}`}>{universe.name}</h3>
                <div className="mt-1 flex justify-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getUniverseTypeBadge(universe.type)}`}>
                    {getUniverseTypeInPersian(universe.type)}
                  </span>
                </div>
              </div>
              
              <motion.div 
                className="bg-white/60 p-4 rounded-lg border shadow-inner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-sm leading-6 ${getUniverseTypeTextColor(universe.type)}`}>{universe.description}</p>
              </motion.div>
              
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="font-medium text-[#2a1c64] text-sm">ویژگی‌های این جهان:</h4>
                <ul className="space-y-2">
                  {universe.characteristics.map((characteristic, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                    >
                      <span className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-2 ${getUniverseTypeBadge(universe.type)}`}></span>
                      <span className="text-sm text-gray-700">{characteristic}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className={`p-4 rounded-lg border ${getUniverseTypeBadge(universe.type)} mt-2`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h4 className={`font-medium ${getUniverseTypeTextColor(universe.type)} text-sm mb-2`}>شما در این جهان:</h4>
                <p className="text-gray-700 text-sm">{universe.youInThisUniverse}</p>
              </motion.div>
              
              <motion.div 
                className="text-center text-xs text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                احتمال وجود این جهان: {(universe.probability * 100).toFixed(4)}%
              </motion.div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-3 bg-white/30 border-t border-[#2a1c64]/10">
        <Button 
          onClick={getRandomUniverse} 
          disabled={isLoading}
          size="sm" 
          className="bg-[#2a1c64] hover:bg-[#1e1256] text-white text-xs h-8 px-4 relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          {isLoading ? 
            <RefreshCw className="animate-spin mr-1" size={14} /> : 
            <Sparkles size={14} className="mr-1" />
          }
          کشف جهان دیگر
        </Button>
        
        {universe && (
          <Button 
            variant="outline"
            size="sm"
            onClick={copyUniverseDetails} 
            className="border-[#2a1c64] text-[#2a1c64] text-xs h-8 px-3"
          >
            <Copy size={14} className="mr-1" />
            کپی اطلاعات
          </Button>
        )}
      </CardFooter>
      
      {/* Animation styles */}
      <style>{`
        .universe-appear {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Card>
  );
};
