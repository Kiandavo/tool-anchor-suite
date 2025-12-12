import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Hash, RefreshCw, Sparkles, Calendar, User, Copy } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from 'framer-motion';
import { useAdvancedNumerology } from '@/hooks/useAdvancedNumerology';
import { NumerologyChart } from './numerology/NumerologyChart';
import { PersianAbjad } from './numerology/PersianAbjad';
import { PersonalYear } from './numerology/PersonalYear';
import { RelationshipCompatibility } from './numerology/RelationshipCompatibility';
import { NumerologyGuide } from './numerology/NumerologyGuide';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedReadingWrapper } from './EnhancedReadingWrapper';
import { TutorialStep } from './TutorialSystem';
import { 
  FloatingNumbers, 
  SacredGeometryPattern, 
  NumberWheel, 
  NumerologyGrid,
  PulsingNumber 
} from '@/components/fal/graphics/NumerologyGraphics';
import { copyToClipboard } from '@/utils/randomUtils';

export const Numerology: React.FC = () => {
  const [name, setName] = useState('');
  const [persianName, setPersianName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const { chart, isLoading, generateCompleteChart } = useAdvancedNumerology();

  const handleCalculate = () => {
    if (!name || !birthDate) {
      toast.error("لطفاً نام و تاریخ تولد خود را وارد کنید");
      return;
    }
    
    const date = new Date(birthDate);
    generateCompleteChart(
      name,
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
      persianName
    );
  };

  const handleReset = () => {
    setName('');
    setPersianName('');
    setBirthDate('');
  };

  const copyResults = () => {
    if (!chart) return;
    
    const text = `
📊 اعداد شناسی ${name}
━━━━━━━━━━━━━━━━━━

🔢 عدد مسیر زندگی: ${chart.lifePathNumber}

✨ عدد بیان: ${chart.expressionNumber}
📅 عدد روح: ${chart.soulUrgeNumber}
🎯 عدد شخصیت: ${chart.personalityNumber}
🗓️ عدد تولد: ${chart.birthdayNumber}

📆 سال شخصی: ${chart.personalYear}
━━━━━━━━━━━━━━━━━━
🌐 محاسبه شده با ابزار اعداد شناسی
    `.trim();
    
    copyToClipboard(text);
    toast.success("نتایج کپی شد");
  };

  // Tutorial steps
  const tutorialSteps: TutorialStep[] = [
    {
      target: '#name-input',
      title: 'نام خود را وارد کنید',
      description: 'نام کامل خود را به انگلیسی وارد کنید تا اعداد شما محاسبه شود',
      position: 'bottom'
    },
    {
      target: '#birth-date-input',
      title: 'تاریخ تولد',
      description: 'تاریخ تولد میلادی خود را وارد کنید',
      position: 'bottom'
    },
    {
      target: '#calculate-button',
      title: 'محاسبه',
      description: 'روی این دکمه کلیک کنید تا اعداد شما محاسبه شود',
      position: 'top'
    },
  ];

  // Narration text
  const narrationText = chart ? `
    اعداد شناسی ${name}.
    عدد مسیر زندگی شما ${chart.lifePathNumber} است.
    عدد بیان شما ${chart.expressionNumber} است.
    عدد روح شما ${chart.soulUrgeNumber} است.
    سال شخصی شما ${chart.personalYear} است.
  ` : undefined;

  // Reading data for export
  const readingData = chart ? {
    type: 'numerology',
    title: `اعداد شناسی ${name}`,
    content: `عدد مسیر زندگی: ${chart.lifePathNumber}\n\nعدد بیان: ${chart.expressionNumber}\nعدد روح: ${chart.soulUrgeNumber}\nسال شخصی: ${chart.personalYear}`,
    timestamp: new Date(),
    metadata: { name, birthDate }
  } : undefined;

  return (
    <EnhancedReadingWrapper
      readingType="numerology"
      readingData={readingData}
      narrationText={narrationText}
      elementId="numerology-content"
      tutorialSteps={tutorialSteps}
      isLoading={isLoading}
      loadingType="stars"
    >
      <Card id="numerology-content" className="fortune-card-enhanced bg-gradient-to-b from-indigo-50 to-purple-50 border-indigo-200 shadow-lg overflow-hidden relative">
        {/* Enhanced graphics */}
        <FloatingNumbers />
        <SacredGeometryPattern />
        <NumerologyGrid />
        
        <CardHeader className="bg-gradient-to-r from-indigo-400 to-purple-500 text-center pb-3 py-3 relative border-b border-indigo-200">
          <div className="flex items-center justify-between">
            <NumerologyGuide />
            <div className="flex-1 flex items-center justify-center gap-2">
              <Hash className="text-white" size={18} />
              <h2 className="text-base font-bold text-white">
                اعداد شناسی (نومرولوژی)
              </h2>
              <Sparkles className="text-white/80" size={14} />
            </div>
            <div className="w-[70px]"></div> {/* Spacer for balance */}
          </div>
        </CardHeader>
        
        <CardContent className="pt-4 px-4 relative z-10">
          <AnimatePresence mode="wait">
            {!chart ? (
              <motion.div 
                key="input"
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-indigo-100 text-center">
                  <p className="text-sm text-indigo-800 leading-relaxed">
                    اعداد شناسی یا نومرولوژی، علم باستانی مطالعه تأثیر اعداد بر زندگی و شخصیت انسان‌هاست. با وارد کردن نام و تاریخ تولد، اعداد مهم زندگی و معنای آن‌ها را کشف کنید.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <motion.div 
                    id="name-input"
                    className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-indigo-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-indigo-800 text-sm mb-2 font-medium flex items-center gap-2">
                      <User size={16} />
                      نام و نام خانوادگی (انگلیسی):
                    </label>
                    <Input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border-indigo-200 focus:ring-indigo-500"
                      placeholder="مثال: John Smith"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-indigo-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-indigo-800 text-sm mb-2 font-medium flex items-center gap-2">
                      <User size={16} />
                      نام فارسی (اختیاری - برای حساب ابجد):
                    </label>
                    <Input 
                      value={persianName} 
                      onChange={(e) => setPersianName(e.target.value)} 
                      placeholder="نام فارسی شما"
                      className="border-indigo-200 focus:ring-indigo-500"
                    />
                  </motion.div>
                  
                  <motion.div 
                    id="birth-date-input"
                    className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-indigo-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-indigo-800 text-sm mb-2 font-medium flex items-center gap-2">
                      <Calendar size={16} />
                      تاریخ تولد (میلادی):
                    </label>
                    <Input 
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full border-indigo-200 focus:ring-indigo-500"
                    />
                  </motion.div>
                </div>
                
                <motion.div 
                  className="flex justify-center py-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <NumberWheel isAnimating={isLoading} />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Quick summary */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center border border-indigo-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {chart.lifePathNumber}
                    </div>
                    <p className="mt-2 text-xs font-medium text-indigo-800">مسیر زندگی</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center border border-indigo-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {chart.expressionNumber}
                    </div>
                    <p className="mt-2 text-xs font-medium text-indigo-800">عدد بیان</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center border border-indigo-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {chart.soulUrgeNumber}
                    </div>
                    <p className="mt-2 text-xs font-medium text-indigo-800">عدد روح</p>
                  </motion.div>
                </div>
                
                <Tabs defaultValue="core" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-4 bg-white/50">
                    <TabsTrigger value="core" className="text-xs">اعداد اصلی</TabsTrigger>
                    <TabsTrigger value="persian" className="text-xs">حساب ابجد</TabsTrigger>
                    <TabsTrigger value="forecast" className="text-xs">پیش‌بینی</TabsTrigger>
                    <TabsTrigger value="compatibility" className="text-xs">سازگاری</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="core">
                    <NumerologyChart data={chart} />
                  </TabsContent>
                  
                  <TabsContent value="persian">
                    <PersianAbjad />
                  </TabsContent>
                  
                  <TabsContent value="forecast">
                    <PersonalYear 
                      personalYear={chart.personalYear} 
                      personalMonth={chart.personalMonth} 
                      personalDay={chart.personalDay} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="compatibility">
                    <RelationshipCompatibility />
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        
        <CardFooter className="flex flex-wrap justify-center gap-2 pt-3 pb-4 bg-white/50 backdrop-blur-sm border-t border-indigo-100">
          {!chart ? (
            <Button
              id="calculate-button"
              onClick={handleCalculate}
              disabled={isLoading || !name || !birthDate}
              className="fortune-button-primary bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm h-10 px-6 relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-shimmer"></span>
              {isLoading ? 
                <RefreshCw className="animate-spin ml-2" size={16} /> : 
                <Sparkles className="ml-2" size={16} />
              }
              محاسبه اعداد شناسی
            </Button>
          ) : (
            <>
              <Button
                onClick={copyResults}
                variant="outline"
                size="sm"
                className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
              >
                <Copy size={14} className="ml-1" />
                کپی نتایج
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
              >
                <RefreshCw size={14} className="ml-1" />
                محاسبه مجدد
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </EnhancedReadingWrapper>
  );
};

export default Numerology;
