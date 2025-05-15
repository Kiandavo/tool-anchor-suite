
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Compass, RefreshCw, Copy, Sparkles, Map, Eye } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { motion } from 'framer-motion';

// Reading types
const READING_TYPES = [
  { id: 'person', name: 'شخص', description: 'دریافت بینش درباره یک شخص از راه دور', icon: <Eye size={14} className="ml-1" /> },
  { id: 'place', name: 'مکان', description: 'دریافت بینش درباره یک مکان خاص', icon: <Map size={14} className="ml-1" /> },
  { id: 'event', name: 'رویداد', description: 'دریافت بینش درباره یک رویداد آینده', icon: <Compass size={14} className="ml-1" /> }
];

// Predefined impressions for different reading types
const IMPRESSIONS: Record<string, string[]> = {
  'person': [
    "این شخص انرژی آرام و پایداری دارد. احساس می‌کنم در دوره‌ای از تأمل و خودشناسی قرار دارد.",
    "انرژی پرتلاطم و پویایی از این فرد حس می‌کنم. به نظر می‌رسد در مرحله تغییر و تحول قرار دارد.",
    "نوعی دوگانگی در این شخص احساس می‌شود - بین آنچه نشان می‌دهد و آنچه واقعاً احساس می‌کند.",
    "انرژی خلاق و روشنی از ایشان دریافت می‌کنم. استعدادهایی دارد که هنوز کاملاً شکوفا نشده‌اند.",
    "غم و اندوهی پنهان در این شخص حس می‌کنم که شاید خودش هم کاملاً از آن آگاه نباشد."
  ],
  'place': [
    "این مکان تاریخ غنی و انرژی عمیقی دارد. لایه‌های زمان در آن حس می‌شود.",
    "فضایی پر از انرژی مثبت و سرزندگی می‌بینم. مکانی که افراد در آن احساس آرامش می‌کنند.",
    "اینجا محلی است که در گذشته رویدادهای مهمی در آن رخ داده و هنوز انرژی آن رویدادها حس می‌شود.",
    "تضادی بین گذشته و حال در این مکان وجود دارد. گویی مکان در حال تغییر هویت است.",
    "آب نقش مهمی در انرژی این مکان دارد. چه به صورت فیزیکی و چه به شکل نمادین."
  ],
  'event': [
    "این رویداد تأثیر عمیقی بر افراد حاضر خواهد گذاشت و دیدگاه‌های جدیدی ایجاد می‌کند.",
    "انرژی این رویداد آشفته است. به نظر می‌رسد عوامل غیرمنتظره‌ای در آن دخیل خواهند بود.",
    "این رویداد بسیار موفق‌تر از آنچه انتظار می‌رود خواهد بود و پیامدهای مثبتی به همراه دارد.",
    "احساس می‌کنم این رویداد با تأخیر یا تغییر برنامه همراه خواهد بود.",
    "این رویداد فرصتی برای اتصال و همکاری میان افراد با دیدگاه‌های مختلف ایجاد می‌کند."
  ]
};

// Colors and their meanings for visualization
const COLORS = [
  { name: 'آبی', hex: '#3b82f6', meaning: 'آرامش، ارتباط، صداقت' },
  { name: 'سبز', hex: '#10b981', meaning: 'رشد، تعادل، شفا' },
  { name: 'بنفش', hex: '#8b5cf6', meaning: 'معنویت، بصیرت، تحول' },
  { name: 'قرمز', hex: '#ef4444', meaning: 'انرژی، اشتیاق، قدرت' },
  { name: 'نارنجی', hex: '#f97316', meaning: 'خلاقیت، شادی، انگیزه' },
  { name: 'صورتی', hex: '#ec4899', meaning: 'عشق، مهربانی، مراقبت' },
  { name: 'طلایی', hex: '#eab308', meaning: 'روشنگری، خرد، ثروت' },
  { name: 'سفید', hex: '#f9fafb', meaning: 'پاکی، وضوح، یکپارچگی' }
];

export const DistantReading: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [readingType, setReadingType] = useState(READING_TYPES[0]);
  const [subject, setSubject] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [visualizations, setVisualizations] = useState<{type: string, content: string, color: string}[]>([]);
  const [primaryColor, setPrimaryColor] = useState('');

  const performReading = () => {
    if (!subject.trim()) {
      toast.error("لطفاً موضوع خوانش را وارد کنید");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      // Generate interpretation
      const typeImpressions = IMPRESSIONS[readingType.id];
      const selectedImpression = typeImpressions[Math.floor(Math.random() * typeImpressions.length)];
      
      // Select random color for primary energy
      const selectedColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      setPrimaryColor(selectedColor.hex);
      
      // Generate visualizations (3-4 random elements)
      const numVisualizations = Math.floor(Math.random() * 2) + 3; // 3-4 visualizations
      const generatedVisualizations = [];
      
      const visualTypes = ['symbol', 'sensation', 'emotion', 'image', 'element'];
      const symbols = ['دایره', 'مثلث', 'مارپیچ', 'ستاره', 'خط افقی', 'موج', 'درخت', 'پل'];
      const sensations = ['گرما', 'سرما', 'لرزش', 'سبکی', 'سنگینی', 'فشار', 'آرامش'];
      const emotions = ['آرامش', 'نگرانی', 'امید', 'شادی', 'اندوه', 'عشق', 'ترس', 'اطمینان'];
      const images = ['آب', 'آتش', 'کوه', 'جنگل', 'آسمان', 'ساختمان', 'راه', 'پرنده'];
      const elements = ['آب', 'آتش', 'خاک', 'هوا', 'فلز', 'چوب'];
      
      // Shuffle visual types
      const shuffledTypes = [...visualTypes].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < numVisualizations; i++) {
        const type = shuffledTypes[i % shuffledTypes.length];
        let content = '';
        let colorObj = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        switch (type) {
          case 'symbol':
            content = symbols[Math.floor(Math.random() * symbols.length)];
            break;
          case 'sensation':
            content = sensations[Math.floor(Math.random() * sensations.length)];
            break;
          case 'emotion':
            content = emotions[Math.floor(Math.random() * emotions.length)];
            break;
          case 'image':
            content = images[Math.floor(Math.random() * images.length)];
            break;
          case 'element':
            content = elements[Math.floor(Math.random() * elements.length)];
            break;
        }
        
        generatedVisualizations.push({
          type,
          content,
          color: colorObj.hex
        });
      }
      
      setVisualizations(generatedVisualizations);
      
      // Generate complete interpretation
      const typeDesc = readingType.id === 'person' ? 'این شخص' : 
                        readingType.id === 'place' ? 'این مکان' : 
                        'این رویداد';
      
      const fullInterpretation = 
        `${selectedImpression}\n\n` +
        `رنگ غالب در خوانش ${subject}: ${selectedColor.name} (${selectedColor.meaning})\n\n` +
        `تصاویر و نمادهای دریافت شده:\n` +
        generatedVisualizations.map(v => `- ${v.content} (${typeToText(v.type)})`).join('\n') + '\n\n' +
        `توصیه برای ${typeDesc}: ` + getRandomAdvice(readingType.id);
      
      setInterpretation(fullInterpretation);
      setIsLoading(false);
      setIsRevealed(true);
      toast.success("خوانش از راه دور انجام شد!");
    }, 1800);
  };
  
  const typeToText = (type: string): string => {
    const typesText: Record<string, string> = {
      'symbol': 'نماد',
      'sensation': 'احساس فیزیکی',
      'emotion': 'احساس عاطفی',
      'image': 'تصویر',
      'element': 'عنصر'
    };
    
    return typesText[type] || type;
  };
  
  const getRandomAdvice = (type: string): string => {
    const advices: Record<string, string[]> = {
      'person': [
        "به این شخص فرصت بیشتری برای بیان احساسات خود بدهید.",
        "صبر و درک بیشتری در ارتباط با این فرد نشان دهید.",
        "به دنبال راه‌هایی برای ارتباط عمیق‌تر با این شخص باشید.",
        "به این شخص فضای بیشتری برای رشد شخصی بدهید."
      ],
      'place': [
        "با ذهنی باز و پذیرا از این مکان دیدن کنید.",
        "به انرژی و تاریخ پنهان این مکان احترام بگذارید.",
        "زمان بیشتری را برای درک عمیق‌تر این مکان اختصاص دهید.",
        "به دنبال لایه‌های پنهان در تجربه خود از این مکان باشید."
      ],
      'event': [
        "با آمادگی و ذهنی باز به این رویداد وارد شوید.",
        "به دنبال فرصت‌های غیرمنتظره در این رویداد باشید.",
        "به احساسات خود در طول این رویداد توجه کنید.",
        "از تجربه‌های مختلف در این رویداد استقبال کنید."
      ]
    };
    
    const typeAdvices = advices[type] || advices['person'];
    return typeAdvices[Math.floor(Math.random() * typeAdvices.length)];
  };
  
  const copyReading = () => {
    if (interpretation) {
      const textToCopy = `خوانش از راه دور برای: ${subject} (${readingType.name})\n\n${interpretation}`;
      copyToClipboard(textToCopy);
      toast.success("متن خوانش از راه دور کپی شد!");
    }
  };
  
  const resetReading = () => {
    setIsRevealed(false);
    setInterpretation('');
    setVisualizations([]);
  };
  
  return (
    <Card className="bg-gradient-to-b from-[#f1ecff] to-[#e7e0ff] border-[#c4b5ff] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#c4b5ff] to-[#a89af0] text-center pb-2 py-2 relative border-b border-[#c4b5ff]">
        <h2 className="text-sm font-bold text-[#2a1c64] flex items-center justify-center">
          <Compass className="mr-2" size={16} />
          خوانش از راه دور
        </h2>
      </CardHeader>
      
      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#c4b5ff]/30 text-center">
                <p className="text-sm text-[#2a1c64]">
                  خوانش از راه دور به توانایی دریافت اطلاعات و انرژی‌ها از افراد، مکان‌ها یا رویدادهای دور از طریق شهود و ادراک فراحسی اشاره دارد.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-[#c4b5ff]/20">
                  <label className="block text-[#2a1c64] text-xs mb-1.5 font-medium">نوع خوانش:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {READING_TYPES.map(type => (
                      <Button
                        key={type.id}
                        variant={readingType.id === type.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setReadingType(type)}
                        className={`text-[10px] h-auto py-2 ${readingType.id === type.id ? 
                          "bg-[#a89af0] hover:bg-[#9485db] text-white" : 
                          "border-[#c4b5ff] text-[#2a1c64]"}`}
                      >
                        {type.icon}
                        {type.name}
                      </Button>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-[#2a1c64]/80">{readingType.description}</p>
                </div>
                
                <div className="bg-white/50 p-3 rounded-lg border border-[#c4b5ff]/20">
                  <label className="block text-[#2a1c64] text-xs mb-1.5 font-medium">
                    {readingType.id === 'person' ? 'نام شخص مورد نظر:' :
                     readingType.id === 'place' ? 'نام مکان مورد نظر:' :
                     'عنوان رویداد مورد نظر:'}
                  </label>
                  <input 
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs p-2 border border-[#c4b5ff]/30 rounded-md focus:ring-1 focus:ring-[#a89af0] focus:outline-none"
                    placeholder={
                      readingType.id === 'person' ? 'مانند: محمد، مریم، ...' :
                      readingType.id === 'place' ? 'مانند: تهران، دریای خزر، ...' :
                      'مانند: جلسه کاری، مهمانی، سفر، ...'
                    }
                  />
                </div>
              </div>
              
              <div className="flex justify-center py-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#c4b5ff] to-[#e7e0ff] flex items-center justify-center border border-[#c4b5ff] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{
                    background: "radial-gradient(circle at center, white 0%, transparent 70%)"
                  }}></div>
                  <Eye size={32} className="text-[#2a1c64] opacity-60" />
                </div>
              </div>
            </>
          ) : (
            <>
              <motion.div 
                className="relative flex justify-center items-center h-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Energy visualization */}
                <div className="relative w-28 h-28">
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                    animate={{ 
                      opacity: [0.4, 0.7, 0.4],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {/* Visualizations */}
                  {visualizations.map((viz, index) => {
                    // Calculate position around the circle
                    const angle = (index / visualizations.length) * Math.PI * 2;
                    const radius = 65; // Distance from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ 
                          backgroundColor: viz.color,
                          left: 'calc(50% - 20px)',
                          top: 'calc(50% - 20px)',
                          boxShadow: `0 0 10px ${viz.color}80`
                        }}
                        initial={{ x, y, opacity: 0 }}
                        animate={{ 
                          x, 
                          y,
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          delay: index * 0.1,
                          duration: 2 + index * 0.3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        {viz.type === 'element' && '🔥'}
                        {viz.type === 'emotion' && '❤️'}
                        {viz.type === 'symbol' && '✨'}
                        {viz.type === 'sensation' && '👋'}
                        {viz.type === 'image' && '🌄'}
                      </motion.div>
                    );
                  })}
                  
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-white/30"
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
              </motion.div>
              
              <div className="bg-white/70 p-4 rounded-lg border border-[#c4b5ff]/30 shadow-sm mt-1">
                <h3 className="text-sm font-medium text-[#2a1c64] mb-2">خوانش برای: {subject}</h3>
                <p className="text-sm text-[#2a1c64]/90 whitespace-pre-line leading-relaxed">{interpretation}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#c4b5ff]/20">
        {!isRevealed ? (
          <Button
            onClick={performReading}
            disabled={isLoading || !subject.trim()}
            className="bg-[#a89af0] hover:bg-[#9485db] text-white text-xs h-9 px-4 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {isLoading ? 
              <RefreshCw className="animate-spin mr-1" size={14} /> : 
              <Sparkles className="mr-1" size={14} />
            }
            شروع خوانش
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#a89af0] text-[#2a1c64] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              خوانش جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-[#a89af0] text-[#2a1c64] text-xs h-9 px-3"
            >
              <Copy size={14} className="mr-1" />
              کپی خوانش
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default DistantReading;
