
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Star, RefreshCw, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { motion } from 'framer-motion';

// Stone definitions
const STONES = [
  { 
    name: 'آمتیست', 
    color: '#9966CC', 
    meanings: [
      'آرامش ذهنی و روحی',
      'تعادل احساسات',
      'ارتقاء معنویت',
      'تقویت شهود'
    ],
    symbol: '✨'
  },
  { 
    name: 'کوارتز صورتی', 
    color: '#FFB6C1', 
    meanings: [
      'عشق و محبت',
      'شفای احساسی',
      'آشتی و بخشش',
      'خودمراقبتی'
    ],
    symbol: '❤️'
  },
  { 
    name: 'فیروزه', 
    color: '#40E0D0', 
    meanings: [
      'محافظت',
      'شانس و موفقیت',
      'دوستی',
      'شفای کلی'
    ],
    symbol: '🔵'
  },
  { 
    name: 'یشم', 
    color: '#00A86B', 
    meanings: [
      'سلامتی و شادابی',
      'هماهنگی',
      'ثبات',
      'جذب ثروت'
    ],
    symbol: '🟢'
  },
  { 
    name: 'لاجورد', 
    color: '#2A52BE', 
    meanings: [
      'حقیقت و بصیرت',
      'ارتباطات',
      'خرد درونی',
      'آزادی بیان'
    ],
    symbol: '🔷'
  },
  { 
    name: 'سیترین', 
    color: '#FFD700', 
    meanings: [
      'خودباوری',
      'ثروت و فراوانی',
      'خلاقیت',
      'انرژی مثبت'
    ],
    symbol: '🟡'
  },
  {
    name: 'عقیق',
    color: '#B22222',
    meanings: [
      'قدرت و تمرکز',
      'پایداری',
      'شجاعت',
      'محافظت معنوی'
    ],
    symbol: '🔴'
  },
  {
    name: 'ماه سنگ',
    color: '#E6E6FA',
    meanings: [
      'شهود',
      'تعادل احساسی',
      'تغییر و تحول',
      'خلاقیت زنانه'
    ],
    symbol: '🌙'
  },
  {
    name: 'فلوریت',
    color: '#7B68EE',
    meanings: [
      'تمرکز ذهنی',
      'نظم و ساختار',
      'شفافیت فکری',
      'تعادل انرژی'
    ],
    symbol: '🔮'
  }
];

// Reading patterns
const READING_PATTERNS = [
  { id: 'three', name: 'سه سنگ', description: 'خوانش ساده با سه سنگ برای پاسخ سریع', count: 3 },
  { id: 'five', name: 'پنج سنگ', description: 'خوانش کامل‌تر با پنج سنگ برای بینش عمیق‌تر', count: 5 }
];

// Pattern positions meaning
const PATTERN_POSITIONS = {
  'three': ['گذشته', 'حال', 'آینده'],
  'five': ['موقعیت فعلی', 'چالش‌ها', 'نیروهای پنهان', 'توصیه', 'نتیجه نهایی']
};

// Define the Stone Interpretation type
type StoneInterpretation = Array<{
  stone: typeof STONES[0];
  position: string;
  meaning: string;
}>;

export const Lithomancy: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStones, setSelectedStones] = useState<typeof STONES[0][]>([]);
  const [readingPattern, setReadingPattern] = useState(READING_PATTERNS[0]);
  const [question, setQuestion] = useState('');
  const [interpretation, setInterpretation] = useState<StoneInterpretation>([]);
  const [formattedReading, setFormattedReading] = useState('');

  const performReading = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      // Randomly select stones based on pattern
      const shuffled = [...STONES].sort(() => 0.5 - Math.random());
      const selectedStones = shuffled.slice(0, readingPattern.count);
      setSelectedStones(selectedStones);
      
      // Generate interpretation
      const stoneInterpretation = generateInterpretation(selectedStones, readingPattern.id);
      setInterpretation(stoneInterpretation);
      
      // Generate formatted reading for copy
      const positions = PATTERN_POSITIONS[readingPattern.id as keyof typeof PATTERN_POSITIONS];
      const formatted = selectedStones.map((stone, i) => {
        const position = positions[i];
        const meaning = stone.meanings[Math.floor(Math.random() * stone.meanings.length)];
        return `${i+1}. ${position}: ${stone.name} - ${meaning}`;
      }).join('\n');
      
      const conclusion = getConclusion(selectedStones);
      setFormattedReading(`${formatted}\n\n${conclusion}`);
      
      setIsLoading(false);
      setIsRevealed(true);
      toast.success("سنگ‌بینی با موفقیت انجام شد!");
    }, 1500);
  };
  
  const generateInterpretation = (stones: typeof STONES[0][], pattern: string): StoneInterpretation => {
    // This is simplified - a real interpretation would be more complex
    const positions = PATTERN_POSITIONS[pattern as keyof typeof PATTERN_POSITIONS];
    
    return stones.map((stone, i) => {
      const position = positions[i];
      // Randomly select one meaning for each stone
      const meaning = stone.meanings[Math.floor(Math.random() * stone.meanings.length)];
      return { stone, position, meaning };
    });
  };
  
  const getConclusion = (stones: typeof STONES[0][]) => {
    // Simple algorithm to generate conclusion based on stones
    const stoneTypes = stones.map(s => s.name);
    
    if (stoneTypes.some(s => s === 'آمتیست' || s === 'ماه سنگ')) {
      return "به نظر می‌رسد نیاز به تأمل و خودشناسی بیشتر دارید. شهود درونی شما راهنمای خوبی برای این دوره است.";
    }
    
    if (stoneTypes.some(s => s === 'سیترین' || s === 'یشم')) {
      return "مسیر شما به سمت موفقیت و فراوانی است. اعتماد به نفس و پشتکار کلید این دوره از زندگی شما خواهد بود.";
    }
    
    if (stoneTypes.some(s => s === 'کوارتز صورتی' || s === 'فیروزه')) {
      return "ارتباطات و روابط در این دوره برای شما اهمیت ویژه‌ای دارد. گشودگی و صداقت می‌تواند مسیر را هموار کند.";
    }
    
    if (stoneTypes.some(s => s === 'لاجورد' || s === 'فلوریت')) {
      return "دوره‌ای از رشد فکری و معنوی برای شما آغاز شده است. جستجو برای دانش و خرد به شما کمک خواهد کرد.";
    }
    
    if (stoneTypes.some(s => s === 'عقیق')) {
      return "نیاز به پایداری و قدرت درونی در این مسیر احساس می‌شود. استقامت و شجاعت شما را به اهدافتان می‌رساند.";
    }
    
    // Default
    return "ترکیب سنگ‌ها نشان می‌دهد که در مرحله‌ای از تغییر و تحول هستید. با پذیرش تغییرات، مسیر هموارتری پیش رو خواهید داشت.";
  };
  
  const copyReading = () => {
    if (formattedReading) {
      const questionText = question ? `سوال: ${question}\n\n` : '';
      const textToCopy = `سنگ‌بینی و بلورخوانی\n\n${questionText}${formattedReading}`;
      copyToClipboard(textToCopy);
      toast.success("نتیجه سنگ‌بینی کپی شد!");
    }
  };
  
  const resetReading = () => {
    setIsRevealed(false);
    setSelectedStones([]);
    setInterpretation([]);
  };
  
  const StoneDisplay: React.FC<{stone: typeof STONES[0], index: number}> = ({ stone, index }) => {
    // Calculate animation delay based on index
    const delay = index * 0.2;
    
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
      >
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-lg"
          style={{ 
            backgroundColor: stone.color,
            boxShadow: `0 4px 12px ${stone.color}60, inset 0 2px 6px rgba(255, 255, 255, 0.3)`
          }}
          animate={{ 
            boxShadow: [
              `0 4px 12px ${stone.color}60, inset 0 2px 6px rgba(255, 255, 255, 0.3)`,
              `0 6px 16px ${stone.color}90, inset 0 2px 6px rgba(255, 255, 255, 0.5)`,
              `0 4px 12px ${stone.color}60, inset 0 2px 6px rgba(255, 255, 255, 0.3)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {stone.symbol}
        </motion.div>
        <div className="text-center mt-1">
          <p className="text-[10px] font-medium text-[#3c3a4e]">{stone.name}</p>
        </div>
      </motion.div>
    );
  };
  
  return (
    <Card className="bg-gradient-to-b from-[#f4f1ff] to-[#e9e3ff] border-[#d8ccff] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#d8ccff] to-[#c8b8fd] text-center pb-2 py-2 relative border-b border-[#d8ccff]">
        <h2 className="text-sm font-bold text-[#3c3a4e] flex items-center justify-center">
          <Star className="mr-2" size={16} />
          سنگ‌بینی و بلورخوانی
        </h2>
      </CardHeader>
      
      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#d8ccff]/30 text-center">
                <p className="text-sm text-[#3c3a4e]">
                  سنگ‌بینی یا لیتومنسی، هنر باستانی خواندن انرژی و پیام‌های سنگ‌های قیمتی و نیمه‌قیمتی است. هر سنگ انرژی و ارتعاش منحصر به فردی دارد که می‌تواند بینش‌هایی درباره گذشته، حال و آینده ارائه دهد.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-[#d8ccff]/20">
                  <label className="block text-[#3c3a4e] text-xs mb-1.5 font-medium">الگوی خوانش:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {READING_PATTERNS.map(pattern => (
                      <Button
                        key={pattern.id}
                        variant={readingPattern.id === pattern.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setReadingPattern(pattern)}
                        className={`text-[10px] h-auto py-2 ${readingPattern.id === pattern.id ? 
                          "bg-[#c8b8fd] hover:bg-[#b8a6f9] text-white" : 
                          "border-[#d8ccff] text-[#3c3a4e]"}`}
                      >
                        {pattern.name}
                      </Button>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-[#3c3a4e]/80">{readingPattern.description}</p>
                </div>
                
                <div className="bg-white/50 p-3 rounded-lg border border-[#d8ccff]/20">
                  <label className="block text-[#3c3a4e] text-xs mb-1.5 font-medium">سوال شما (اختیاری):</label>
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full text-xs p-2 border border-[#d8ccff]/30 rounded-md focus:ring-1 focus:ring-[#c8b8fd] focus:outline-none"
                    placeholder="سوال خود را اینجا بنویسید..."
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="flex justify-center py-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#e9e3ff] to-[#d8ccff] flex items-center justify-center border border-[#d8ccff] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{
                    background: "radial-gradient(circle at center, white 0%, transparent 70%)"
                  }}></div>
                  <Star size={32} className="text-[#c8b8fd] opacity-80" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center gap-4 py-4 flex-wrap">
                {selectedStones.map((stone, index) => (
                  <StoneDisplay 
                    key={index} 
                    stone={stone}
                    index={index}
                  />
                ))}
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg border border-[#d8ccff]/30 shadow-sm">
                <h3 className="text-sm font-medium text-[#3c3a4e] mb-2">تفسیر سنگ‌ها:</h3>
                <div className="space-y-3">
                  {interpretation.map((item, i) => (
                    <div key={i} className="p-2 bg-white/50 rounded-md border border-[#d8ccff]/20">
                      <h4 className="text-xs font-medium text-[#3c3a4e] flex items-center">
                        <span className="w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-[10px]" style={{ backgroundColor: item.stone.color }}>
                          {i+1}
                        </span>
                        {item.position}
                      </h4>
                      <p className="mt-1 text-xs text-[#3c3a4e]/90">
                        <span className="font-medium">{item.stone.name}:</span> {item.meaning}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-[#f4f1ff] rounded-md border border-[#d8ccff]/30">
                  <h4 className="text-xs font-medium text-[#3c3a4e] mb-1">نتیجه‌گیری کلی:</h4>
                  <p className="text-xs text-[#3c3a4e]/90">{getConclusion(selectedStones)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#d8ccff]/20">
        {!isRevealed ? (
          <Button
            onClick={performReading}
            disabled={isLoading}
            className="bg-[#c8b8fd] hover:bg-[#b8a6f9] text-white text-xs h-9 px-4 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {isLoading ? 
              <RefreshCw className="animate-spin mr-1" size={14} /> : 
              <Sparkles className="mr-1" size={14} />
            }
            انتخاب سنگ‌ها
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#c8b8fd] text-[#3c3a4e] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              خوانش جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-[#c8b8fd] text-[#3c3a4e] text-xs h-9 px-3"
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

export default Lithomancy;
