
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Flower, RefreshCw, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { motion } from 'framer-motion';

const FLOWERS = [
  { name: 'گل رز', meaning: 'عشق و محبت', color: '#ff69b4', symbol: '🌹' },
  { name: 'گل یاس', meaning: 'امید و خوشبختی', color: '#ffffff', symbol: '🤍' },
  { name: 'گل نرگس', meaning: 'تجدید حیات', color: '#ffff00', symbol: '🌼' },
  { name: 'گل بنفشه', meaning: 'فروتنی و صداقت', color: '#8a2be2', symbol: '💜' },
  { name: 'گل لاله', meaning: 'عشق کامل', color: '#ff0000', symbol: '🌷' },
  { name: 'گل آفتابگردان', meaning: 'وفاداری و امید', color: '#ffd700', symbol: '🌻' },
  { name: 'گل زنبق', meaning: 'پاکی و معصومیت', color: '#ffffff', symbol: '🤍' },
  { name: 'گل رز صورتی', meaning: 'مهربانی و سپاسگزاری', color: '#ffb6c1', symbol: '🌸' },
  { name: 'گل اطلسی', meaning: 'شجاعت و قدرت', color: '#4169e1', symbol: '💙' },
  { name: 'گل بابونه', meaning: 'آرامش و صلح', color: '#ffffff', symbol: '🌼' }
];

const PETALS_MESSAGES = [
  'دوست دارد',
  'دوست ندارد', 
  'بسیار دوست دارد',
  'کمی دوست دارد',
  'فکرت را می‌کند',
  'فراموشت کرده',
  'به زودی خواهد آمد',
  'هرگز نخواهد آمد'
];

export const FlowerReading: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<typeof FLOWERS[0] | null>(null);
  const [question, setQuestion] = useState('');
  const [readingType, setReadingType] = useState<'meaning' | 'petals'>('meaning');
  const [result, setResult] = useState('');

  const performReading = () => {
    if (!question.trim()) {
      toast.error("لطفاً ابتدا سوال خود را بنویسید");
      return;
    }

    setIsReading(true);
    
    setTimeout(() => {
      const flower = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
      setSelectedFlower(flower);
      
      let reading = '';
      if (readingType === 'meaning') {
        reading = `گل ${flower.name} برای شما انتخاب شد. این گل نماد ${flower.meaning} است. `;
        
        if (flower.name.includes('رز')) {
          reading += 'پیام طبیعت این است که عشق و احساسات در مسیر زندگی شما اهمیت ویژه‌ای دارد.';
        } else if (flower.name.includes('یاس') || flower.name.includes('آفتابگردان')) {
          reading += 'روزهای روشن و پر امیدی در انتظار شماست. نگاه مثبت خود را حفظ کنید.';
        } else if (flower.name.includes('نرگس') || flower.name.includes('لاله')) {
          reading += 'زمان تغییر و تحول مثبت در زندگی شما فرا رسیده است.';
        } else {
          reading += 'طبیعت از شما می‌خواهد که به قدرت درونی خود اعتماد کنید.';
        }
      } else {
        const petalMessage = PETALS_MESSAGES[Math.floor(Math.random() * PETALS_MESSAGES.length)];
        reading = `با کندن گلبرگ‌های ${flower.name}، پیام "${petalMessage}" برای شما آشکار شد.`;
      }
      
      setResult(reading);
      setIsReading(false);
      setIsRevealed(true);
      toast.success("پیام گل دریافت شد!");
    }, 2000);
  };

  const copyReading = () => {
    const textToCopy = `فال گل\n\nسوال: ${question}\nگل انتخابی: ${selectedFlower?.name}\n\nپیام: ${result}`;
    copyToClipboard(textToCopy);
    toast.success("فال گل کپی شد!");
  };

  const resetReading = () => {
    setIsRevealed(false);
    setSelectedFlower(null);
    setResult('');
  };

  return (
    <Card className="bg-gradient-to-b from-[#f0fff0] to-[#e8f5e8] border-[#90ee90] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#90ee90] to-[#98fb98] text-center pb-2 py-2 relative border-b border-[#90ee90]">
        <h2 className="text-sm font-bold text-[#2d5016] flex items-center justify-center">
          <Flower className="mr-2" size={16} />
          فال گل
        </h2>
      </CardHeader>

      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#90ee90]/30 text-center">
                <p className="text-sm text-[#2d5016]">
                  با انتخاب گلبرگ‌ها و گل‌های مختلف، از زبان طبیعت پیام‌های عاشقانه و زندگی را بشنوید. هر گل رازی از دل طبیعت برای شما دارد.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-[#90ee90]/20">
                  <label className="block text-[#2d5016] text-xs mb-1.5 font-medium">نوع فال:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={readingType === 'meaning' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReadingType('meaning')}
                      className={`text-[10px] h-auto py-2 ${readingType === 'meaning' ? 
                        "bg-[#98fb98] hover:bg-[#90ee90] text-[#2d5016]" : 
                        "border-[#90ee90] text-[#2d5016]"}`}
                    >
                      معنای گل
                    </Button>
                    <Button
                      variant={readingType === 'petals' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReadingType('petals')}
                      className={`text-[10px] h-auto py-2 ${readingType === 'petals' ? 
                        "bg-[#98fb98] hover:bg-[#90ee90] text-[#2d5016]" : 
                        "border-[#90ee90] text-[#2d5016]"}`}
                    >
                      کندن گلبرگ
                    </Button>
                  </div>
                </div>

                <div className="bg-white/50 p-3 rounded-lg border border-[#90ee90]/20">
                  <label className="block text-[#2d5016] text-xs mb-1.5 font-medium">سوال شما:</label>
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full text-xs p-2 border border-[#90ee90]/30 rounded-md focus:ring-1 focus:ring-[#98fb98] focus:outline-none"
                    placeholder="سوال خود را اینجا بنویسید..."
                    rows={2}
                  />
                </div>
              </div>

              {isReading ? (
                <div className="flex justify-center py-6">
                  <motion.div 
                    className="relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#98fb98] to-[#90ee90] flex items-center justify-center">
                      <Flower size={32} className="text-[#2d5016]" />
                    </div>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-pink-300 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          transformOrigin: '0 0'
                        }}
                        animate={{
                          rotate: i * 60,
                          x: 40,
                          y: -6
                        }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </motion.div>
                </div>
              ) : (
                <div className="flex justify-center py-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#e8f5e8] to-[#f0fff0] border-2 border-[#90ee90] flex items-center justify-center">
                    <Flower size={24} className="text-[#2d5016] opacity-60" />
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
                  {selectedFlower?.symbol}
                </motion.div>
                <h3 className="text-sm font-medium text-[#2d5016]">{selectedFlower?.name}</h3>
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg border border-[#90ee90]/30 shadow-sm">
                <p className="text-sm text-[#2d5016] leading-relaxed">{result}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#90ee90]/20">
        {!isRevealed ? (
          <Button
            onClick={performReading}
            disabled={isReading || !question.trim()}
            className="bg-[#98fb98] hover:bg-[#90ee90] text-[#2d5016] text-xs h-9 px-4"
          >
            {isReading ? (
              <>
                <RefreshCw className="animate-spin mr-1" size={14} />
                در حال انتخاب گل...
              </>
            ) : (
              <>
                <Sparkles className="mr-1" size={14} />
                انتخاب گل
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#98fb98] text-[#2d5016] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              فال جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-[#98fb98] text-[#2d5016] text-xs h-9 px-3"
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

export default FlowerReading;
