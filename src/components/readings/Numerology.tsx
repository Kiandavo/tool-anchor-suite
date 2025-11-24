import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Hash, RefreshCw, Sparkles, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { useAdvancedNumerology } from '@/hooks/useAdvancedNumerology';
import { NumerologyChart } from './numerology/NumerologyChart';
import { PersianAbjad } from './numerology/PersianAbjad';
import { PersonalYear } from './numerology/PersonalYear';
import { RelationshipCompatibility } from './numerology/RelationshipCompatibility';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedReadingWrapper } from './EnhancedReadingWrapper';

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

  return (
    <EnhancedReadingWrapper
      readingType="numerology"
      readingData={chart ? {
        type: 'numerology',
        title: `اعداد شناسی ${name}`,
        content: `عدد مسیر زندگی: ${chart.lifePathNumber}، عدد بیان: ${chart.expressionNumber}`,
        timestamp: new Date()
      } : undefined}
      elementId="numerology-content"
      isLoading={isLoading}
      loadingType="moon"
    >
    <Card id="numerology-content" className="bg-gradient-to-b from-[#eef9ff] to-[#e0f2ff] border-[#b3d7ff] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#b3d7ff] to-[#8fbbee] text-center pb-2 py-2 relative border-b border-[#b3d7ff]">
        <h2 className="text-sm font-bold text-[#1a365d] flex items-center justify-center">
          <Hash className="mr-2" size={16} />
          اعداد شناسی (نومرولوژی)
        </h2>
      </CardHeader>
      
      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!chart ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#b3d7ff]/30 text-center">
                <p className="text-sm text-[#1a365d] mb-2">
                  اعداد شناسی یا نومرولوژی، علم باستانی مطالعه تأثیر اعداد بر زندگی و شخصیت انسان‌هاست. با وارد کردن نام و تاریخ تولد، اعداد مهم زندگی و معنای آن‌ها را کشف کنید.
                </p>
                <Input 
                  value={persianName} 
                  onChange={(e) => setPersianName(e.target.value)} 
                  placeholder="نام فارسی (اختیاریy)" 
                  className="mt-2" 
                />
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
            <Tabs defaultValue="core" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="core">اعداد اصلی</TabsTrigger>
                <TabsTrigger value="persian">حساب ابجد</TabsTrigger>
                <TabsTrigger value="forecast">پیش‌بینی</TabsTrigger>
                <TabsTrigger value="compatibility">سازگاریy</TabsTrigger>
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
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#b3d7ff]/20">
        {!chart ? (
          <Button
            onClick={handleCalculate}
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
          <Button
            onClick={() => {
              setName('');
              setPersianName('');
              setBirthDate('');
            }}
            variant="outline"
            size="sm"
            className="border-[#8fbbee] text-[#1a365d] text-xs h-9 px-3"
          >
            <RefreshCw size={14} className="mr-1" />
            محاسبه مجدد
          </Button>
        )}
      </CardFooter>
    </Card>
    </EnhancedReadingWrapper>
  );
};

export default Numerology;
