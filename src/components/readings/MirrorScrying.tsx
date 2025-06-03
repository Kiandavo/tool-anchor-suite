
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Eye, RefreshCw, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { motion } from 'framer-motion';

const VISION_TYPES = [
  'گذشته', 'حال', 'آینده', 'راهنمایی', 'هشدار', 'امید'
];

const VISIONS = {
  'گذشته': [
    'تصویری از رویدادی مهم که بر زندگی شما تأثیر گذاشته است',
    'خاطره‌ای فراموش شده که کلید حل مسئله فعلی شماست',
    'شخصی از گذشته که پیامی برای شما دارد'
  ],
  'حال': [
    'انرژی‌های پنهان اطراف شما که بر تصمیمات شما تأثیر می‌گذارد',
    'موقعیت فعلی شما از منظری متفاوت و عمیق‌تر',
    'قدرت‌های درونی که هنوز آن‌ها را کشف نکرده‌اید'
  ],
  'آینده': [
    'مسیری که در صورت ادامه روند فعلی پیش روی شماست',
    'فرصت‌هایی که به زودی در زندگی شما ظاهر خواهد شد',
    'تغییراتی که باید برای رسیدن به اهدافتان انجام دهید'
  ],
  'راهنمایی': [
    'قدم بعدی که باید در مسیر رشد شخصی خود بردارید',
    'راه حل مسئله‌ای که ذهن شما را درگیر کرده است',
    'نقطه قوت شما که باید بیشتر از آن استفاده کنید'
  ],
  'هشدار': [
    'موقعیتی که باید از آن احتراز کنید',
    'رفتاری که ممکن است به شما آسیب برساند',
    'تصمیمی که نیاز به تأمل بیشتری دارد'
  ],
  'امید': [
    'نوری در انتهای تونل که به زودی خواهید دید',
    'پشتیبانی و عشقی که همیشه اطراف شماست',
    'قدرت درونی شما برای غلبه بر چالش‌ها'
  ]
};

export const MirrorScrying: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScrying, setIsScrying] = useState(false);
  const [vision, setVision] = useState('');
  const [visionType, setVisionType] = useState('');
  const [question, setQuestion] = useState('');

  const performScrying = () => {
    if (!question.trim()) {
      toast.error("لطفاً ابتدا سوال خود را بنویسید");
      return;
    }

    setIsScrying(true);
    
    setTimeout(() => {
      const selectedType = VISION_TYPES[Math.floor(Math.random() * VISION_TYPES.length)];
      const visions = VISIONS[selectedType as keyof typeof VISIONS];
      const selectedVision = visions[Math.floor(Math.random() * visions.length)];
      
      setVisionType(selectedType);
      setVision(selectedVision);
      setIsScrying(false);
      setIsRevealed(true);
      toast.success("رؤیا در آینه مقدس ظاهر شد!");
    }, 3000);
  };

  const copyReading = () => {
    const textToCopy = `فال آینه\n\nسوال: ${question}\nنوع رؤیا: ${visionType}\n\nرؤیا: ${vision}`;
    copyToClipboard(textToCopy);
    toast.success("رؤیای آینه کپی شد!");
  };

  const resetReading = () => {
    setIsRevealed(false);
    setVision('');
    setVisionType('');
  };

  return (
    <Card className="bg-gradient-to-b from-[#f8f6ff] to-[#ede8ff] border-[#d4c5ff] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#d4c5ff] to-[#c2aeff] text-center pb-2 py-2 relative border-b border-[#d4c5ff]">
        <h2 className="text-sm font-bold text-[#4a3866] flex items-center justify-center">
          <Eye className="mr-2" size={16} />
          فال آینه (آینه‌بینی)
        </h2>
      </CardHeader>

      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#d4c5ff]/30 text-center">
                <p className="text-sm text-[#4a3866]">
                  آینه‌بینی یا میرر اسکرایینگ، هنری باستانی است که با تمرکز عمیق بر سطح آینه‌های مقدس، به دنیای نامرئی سفر می‌کنید و تصاویر و پیام‌های عرفانی از گذشته و آینده دریافت می‌کنید.
                </p>
              </div>

              <div className="bg-white/50 p-3 rounded-lg border border-[#d4c5ff]/20">
                <label className="block text-[#4a3866] text-xs mb-1.5 font-medium">سوال شما:</label>
                <textarea 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full text-xs p-2 border border-[#d4c5ff]/30 rounded-md focus:ring-1 focus:ring-[#c2aeff] focus:outline-none"
                  placeholder="سوال خود را با نیت صاف اینجا بنویسید..."
                  rows={3}
                />
              </div>

              {isScrying ? (
                <div className="flex justify-center py-8">
                  <motion.div 
                    className="w-32 h-32 rounded-full bg-gradient-to-r from-[#e5d9ff] via-[#f0ebff] to-[#e5d9ff] border-4 border-[#d4c5ff] relative overflow-hidden"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(212, 197, 255, 0.5)",
                        "0 0 40px rgba(194, 174, 255, 0.8)",
                        "0 0 20px rgba(212, 197, 255, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div 
                      className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Eye size={40} className="text-[#4a3866] opacity-60" />
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="flex justify-center py-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#e5d9ff] to-[#f0ebff] border-2 border-[#d4c5ff] flex items-center justify-center">
                    <Eye size={32} className="text-[#4a3866] opacity-60" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white/70 p-4 rounded-lg border border-[#d4c5ff]/30 shadow-sm animate-fade-in">
              <div className="text-center mb-3">
                <div className="inline-block px-3 py-1 bg-[#e5d9ff] rounded-full text-xs font-medium text-[#4a3866] mb-2">
                  نوع رؤیا: {visionType}
                </div>
              </div>
              <p className="text-sm text-[#4a3866] leading-relaxed text-center">
                {vision}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#d4c5ff]/20">
        {!isRevealed ? (
          <Button
            onClick={performScrying}
            disabled={isScrying || !question.trim()}
            className="bg-[#c2aeff] hover:bg-[#b59eff] text-white text-xs h-9 px-4"
          >
            {isScrying ? (
              <>
                <RefreshCw className="animate-spin mr-1" size={14} />
                در حال آینه‌بینی...
              </>
            ) : (
              <>
                <Sparkles className="mr-1" size={14} />
                شروع آینه‌بینی
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#c2aeff] text-[#4a3866] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              آینه‌بینی جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-[#c2aeff] text-[#4a3866] text-xs h-9 px-3"
            >
              <Copy size={14} className="mr-1" />
              کپی رؤیا
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default MirrorScrying;
