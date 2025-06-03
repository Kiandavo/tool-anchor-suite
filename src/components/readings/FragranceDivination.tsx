
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Sparkles, RefreshCw, Copy, Flower2 } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { motion } from 'framer-motion';

const FRAGRANCES = [
  {
    name: 'گل رز',
    category: 'عاشقانه',
    properties: ['عشق', 'مهربانی', 'آرامش قلب'],
    message: 'عشق و محبت در مسیر شماست. قلب شما آماده پذیرش احساسات زیبا است.',
    color: '#ff6b9d',
    symbol: '🌹'
  },
  {
    name: 'یاس',
    category: 'معنوی',
    properties: ['امید', 'پاکی', 'تعادل روحی'],
    message: 'نور امید راه شما را روشن می‌کند. روحیات مثبت انتظارتان را می‌کشد.',
    color: '#ffffff',
    symbol: '🤍'
  },
  {
    name: 'نعنا',
    category: 'انرژی‌زا',
    properties: ['شفا', 'تازگی', 'شادابی'],
    message: 'انرژی تازه‌ای وارد زندگی شما می‌شود. نوسازی و تجدید قوا در راه است.',
    color: '#00ff9f',
    symbol: '🌿'
  },
  {
    name: 'لاوندر',
    category: 'آرامش‌بخش',
    properties: ['آرامش', 'خواب آرام', 'کاهش استرس'],
    message: 'زمان آرامش و تأمل است. ذهن شما نیاز به سکون و قرار دارد.',
    color: '#9f7aea',
    symbol: '💜'
  },
  {
    name: 'دارچین',
    category: 'محرک',
    properties: ['گرمی', 'انرژی', 'جذابیت'],
    message: 'قدرت جذب و کاریزما شما در حال افزایش است. با اعتماد پیش بروید.',
    color: '#d69e2e',
    symbol: '🟤'
  },
  {
    name: 'لیمو',
    category: 'پاک‌کننده',
    properties: ['پاکسازی', 'تمرکز', 'وضوح'],
    message: 'وقت پاکسازی انرژی‌های منفی است. ذهن شما به وضوح نیاز دارد.',
    color: '#f6e05e',
    symbol: '🍋'
  },
  {
    name: 'صندل',
    category: 'مقدس',
    properties: ['معنویت', 'مراقبه', 'ارتباط الهی'],
    message: 'جستجوی معنوی شما به نتیجه می‌رسد. ارتباط با عمق درون را تقویت کنید.',
    color: '#c6ad8e',
    symbol: '🕉️'
  },
  {
    name: 'کافور',
    category: 'محافظ',
    properties: ['محافظت', 'پاکسازی', 'شفا'],
    message: 'انرژی محافظ اطراف شما فعال است. از آسیب‌ها در امان خواهید بود.',
    color: '#68d391',
    symbol: '🛡️'
  }
];

export const FragranceDivination: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDivining, setIsDivining] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState<typeof FRAGRANCES[0] | null>(null);
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const performDivination = () => {
    if (!question.trim()) {
      toast.error("لطفاً ابتدا سوال خود را بنویسید");
      return;
    }

    setIsDivining(true);
    
    setTimeout(() => {
      // Filter fragrances by category if selected
      let availableFragrances = FRAGRANCES;
      if (selectedCategory) {
        availableFragrances = FRAGRANCES.filter(f => f.category === selectedCategory);
      }
      
      const fragrance = availableFragrances[Math.floor(Math.random() * availableFragrances.length)];
      setSelectedFragrance(fragrance);
      setIsDivining(false);
      setIsRevealed(true);
      toast.success("عطر راهنما انتخاب شد!");
    }, 2500);
  };

  const copyReading = () => {
    if (!selectedFragrance) return;
    
    const textToCopy = `فال عطر\n\nسوال: ${question}\nعطر راهنما: ${selectedFragrance.name}\nدسته‌بندی: ${selectedFragrance.category}\n\nخواص: ${selectedFragrance.properties.join('، ')}\n\nپیام: ${selectedFragrance.message}`;
    copyToClipboard(textToCopy);
    toast.success("فال عطر کپی شد!");
  };

  const resetReading = () => {
    setIsRevealed(false);
    setSelectedFragrance(null);
  };

  const categories = [...new Set(FRAGRANCES.map(f => f.category))];

  return (
    <Card className="bg-gradient-to-b from-[#fef7ff] to-[#f3e8ff] border-[#d8b4fe] shadow-md overflow-hidden relative">
      {/* Aromatic background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c084fc' fill-opacity='0.3'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='20' cy='5' r='1'/%3E%3Ccircle cx='5' cy='25' r='1'/%3E%3Ccircle cx='35' cy='15' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <CardHeader className="bg-gradient-to-r from-[#d8b4fe] to-[#c084fc] text-center pb-2 py-2 relative border-b border-[#d8b4fe]">
        <h2 className="text-sm font-bold text-[#581c87] flex items-center justify-center">
          <Flower2 className="mr-2" size={16} />
          فال عطر و رایحه
        </h2>
      </CardHeader>

      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#d8b4fe]/30 text-center">
                <p className="text-sm text-[#581c87]">
                  با حس بویایی و انتخاب عطرها و رایحه‌های مختلف، پیام‌های حسی و روحانی دریافت کنید و از قدرت شفابخش عطرها بهره‌مند شوید.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-[#d8b4fe]/20">
                  <label className="block text-[#581c87] text-xs mb-1.5 font-medium">دسته‌بندی عطر (اختیاری):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedCategory === '' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory('')}
                      className={`text-[10px] h-auto py-1.5 ${selectedCategory === '' ? 
                        "bg-[#c084fc] hover:bg-[#a855f7] text-white" : 
                        "border-[#d8b4fe] text-[#581c87]"}`}
                    >
                      همه
                    </Button>
                    {categories.slice(0, 3).map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={`text-[10px] h-auto py-1.5 ${selectedCategory === category ? 
                          "bg-[#c084fc] hover:bg-[#a855f7] text-white" : 
                          "border-[#d8b4fe] text-[#581c87]"}`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {categories.slice(3).map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={`text-[10px] h-auto py-1.5 ${selectedCategory === category ? 
                          "bg-[#c084fc] hover:bg-[#a855f7] text-white" : 
                          "border-[#d8b4fe] text-[#581c87]"}`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-white/50 p-3 rounded-lg border border-[#d8b4fe]/20">
                  <label className="block text-[#581c87] text-xs mb-1.5 font-medium">سوال شما:</label>
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full text-xs p-2 border border-[#d8b4fe]/30 rounded-md focus:ring-1 focus:ring-[#c084fc] focus:outline-none"
                    placeholder="سوال خود را اینجا بنویسید..."
                    rows={2}
                  />
                </div>
              </div>

              {isDivining ? (
                <div className="flex justify-center py-6">
                  <motion.div 
                    className="relative"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#f3e8ff] to-[#ddd6fe] border-2 border-[#d8b4fe] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent animate-pulse"></div>
                      <Flower2 size={32} className="text-[#581c87]" />
                    </div>
                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#c084fc] rounded-full opacity-60"
                        animate={{
                          x: [0, 20, -20, 0],
                          y: [0, -30, 30, 0],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${i * 60}deg)`
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              ) : (
                <div className="flex justify-center py-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#f3e8ff] to-[#ddd6fe] border-2 border-[#d8b4fe] flex items-center justify-center">
                    <Flower2 size={24} className="text-[#581c87] opacity-60" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center">
                <motion.div 
                  className="inline-block text-4xl mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {selectedFragrance?.symbol}
                </motion.div>
                <h3 className="text-lg font-bold text-[#581c87]">{selectedFragrance?.name}</h3>
                <p className="text-xs text-[#7c3aed] font-medium">{selectedFragrance?.category}</p>
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg border border-[#d8b4fe]/30 shadow-sm">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium text-[#581c87] mb-2">خواص:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedFragrance?.properties.map((property, i) => (
                        <span key={i} className="px-2 py-1 bg-[#f3e8ff] text-[#581c87] text-[10px] rounded-full border border-[#d8b4fe]/30">
                          {property}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-[#581c87] mb-2">پیام:</h4>
                    <p className="text-sm text-[#581c87] leading-relaxed text-center">{selectedFragrance?.message}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#d8b4fe]/20">
        {!isRevealed ? (
          <Button
            onClick={performDivination}
            disabled={isDivining || !question.trim()}
            className="bg-[#c084fc] hover:bg-[#a855f7] text-white text-xs h-9 px-4 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {isDivining ? (
              <>
                <RefreshCw className="animate-spin mr-1" size={14} />
                در حال استشمام...
              </>
            ) : (
              <>
                <Sparkles className="mr-1" size={14} />
                انتخاب عطر راهنما
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#c084fc] text-[#581c87] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              فال جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-[#c084fc] text-[#581c87] text-xs h-9 px-3"
            >
              <Copy size={14} className="mr-1" />
              کپی فال
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default FragranceDivination;
