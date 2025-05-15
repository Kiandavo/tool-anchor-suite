
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Dice6, RefreshCw, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { motion } from 'framer-motion';

// Define dice meanings
const DICE_MEANINGS: Record<number, string[]> = {
  1: [
    "تمرکز بر یک هدف مشخص کلید موفقیت فعلی شما است.",
    "این عدد نشان‌دهنده آغاز یک فرصت یا مسیر جدید است.",
    "تنها بودن و تأمل می‌تواند به شما در این مرحله از زندگی کمک کند."
  ],
  2: [
    "فرصتی برای همکاری یا شراکت در پیش است.",
    "تعادل و توازن در زندگی مهم‌ترین نیاز شما در این زمان است.",
    "دوگانگی در تصمیم‌گیری را رها کنید و قاطعانه انتخاب کنید."
  ],
  3: [
    "خلاقیت، رشد و توسعه در مسیر شما قرار دارد.",
    "زمان بیان خود و نشان دادن استعدادهایتان است.",
    "سه گام برای موفقیت: برنامه‌ریزی، پشتکار و باور."
  ],
  4: [
    "ثبات و امنیت در زندگی شما شکل می‌گیرد.",
    "پایه‌های محکم برای آینده بنا کنید، صبر کلید موفقیت است.",
    "چهار جهت اصلی زندگی: کار، عشق، سلامتی و دانش را متعادل کنید."
  ],
  5: [
    "تغییرات مهم و تحولات جدید در راه است.",
    "از روتین خارج شوید و تجربه‌های جدید را امتحان کنید.",
    "پنج حس خود را برای درک عمیق‌تر از محیط اطراف به کار بگیرید."
  ],
  6: [
    "تعادل، هماهنگی و عشق در زندگی شما پررنگ می‌شود.",
    "مسئولیت‌های خانوادگی و روابط نزدیک اهمیت ویژه‌ای می‌یابند.",
    "توجه به خانواده و عزیزان، کلید خوشبختی شما در این دوره است."
  ]
};

// Prediction methods
const PREDICTION_METHODS = [
  { id: 'single', name: 'تک تاس', description: 'یک تاس برای پاسخ به یک سوال مشخص', count: 1 },
  { id: 'three', name: 'سه تاس', description: 'پاسخی عمیق‌تر با استفاده از ترکیب سه تاس', count: 3 }
];

export const Cleromancy: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [predictionMethod, setPredictionMethod] = useState(PREDICTION_METHODS[0]);
  const [question, setQuestion] = useState('');
  const [interpretation, setInterpretation] = useState('');

  const rollDice = () => {
    setIsLoading(true);
    setIsRolling(true);
    
    // Animate dice rolling for a bit
    let counter = 0;
    const rollInterval = setInterval(() => {
      const tempResults = Array(predictionMethod.count).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
      setDiceResults(tempResults);
      counter++;
      
      if (counter >= 10) {
        clearInterval(rollInterval);
        const finalResults = Array(predictionMethod.count).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
        setDiceResults(finalResults);
        
        // Generate interpretation
        setTimeout(() => {
          const diceInterpretation = generateInterpretation(finalResults);
          setInterpretation(diceInterpretation);
          setIsRolling(false);
          setIsLoading(false);
          setIsRevealed(true);
          toast.success("تاس‌بینی انجام شد!");
        }, 600);
      }
    }, 100);
  };
  
  const generateInterpretation = (results: number[]) => {
    let interpretation = '';
    
    if (results.length === 1) {
      // Single dice interpretation
      const diceValue = results[0];
      const meanings = DICE_MEANINGS[diceValue];
      const selectedMeaning = meanings[Math.floor(Math.random() * meanings.length)];
      
      interpretation = `تاس شماره ${diceValue} نشان می‌دهد: ${selectedMeaning}`;
      
    } else if (results.length === 3) {
      // Three dice interpretation
      const sum = results.reduce((a, b) => a + b, 0);
      
      // Individual meanings
      interpretation = results.map((dice, index) => {
        const position = ["گذشته", "حال", "آینده"][index];
        const meanings = DICE_MEANINGS[dice];
        const selectedMeaning = meanings[Math.floor(Math.random() * meanings.length)];
        return `تاس ${index + 1} (${position}): شماره ${dice} - ${selectedMeaning}`;
      }).join("\n\n");
      
      // Sum meaning
      interpretation += "\n\n";
      if (sum <= 5) {
        interpretation += "مجموع کم تاس‌ها (مجموع: " + sum + ") نشان‌دهنده چالش‌ها و موانعی است که باید با صبر و درایت از آن‌ها عبور کنید.";
      } else if (sum <= 10) {
        interpretation += "مجموع متوسط تاس‌ها (مجموع: " + sum + ") نشان‌دهنده مسیری متعادل با چالش‌ها و فرصت‌های متناسب است.";
      } else if (sum <= 15) {
        interpretation += "مجموع بالای تاس‌ها (مجموع: " + sum + ") نشان‌دهنده فرصت‌های مناسب و مسیری رو به رشد است که می‌توانید از آن بهره ببرید.";
      } else {
        interpretation += "مجموع بسیار بالای تاس‌ها (مجموع: " + sum + ") نشان‌دهنده موفقیت‌های بزرگ و دستاوردهای قابل توجه در مسیر پیش روی شماست.";
      }
    }
    
    if (question) {
      return `در پاسخ به سوال: "${question}"\n\n${interpretation}`;
    }
    
    return interpretation;
  };
  
  const copyReading = () => {
    if (interpretation) {
      copyToClipboard(interpretation);
      toast.success("نتیجه تاس‌بینی کپی شد!");
    }
  };
  
  const resetReading = () => {
    setIsRevealed(false);
    setDiceResults([]);
    setInterpretation('');
  };
  
  // Dice component with 3D-like appearance
  const DiceDisplay: React.FC<{value: number, isRolling: boolean}> = ({ value, isRolling }) => {
    const dotPositionClassNames = {
      1: ['absolute inset-0 m-auto'],
      2: ['absolute top-2 left-2', 'absolute bottom-2 right-2'],
      3: ['absolute top-2 left-2', 'absolute inset-0 m-auto', 'absolute bottom-2 right-2'],
      4: ['absolute top-2 left-2', 'absolute top-2 right-2', 'absolute bottom-2 left-2', 'absolute bottom-2 right-2'],
      5: ['absolute top-2 left-2', 'absolute top-2 right-2', 'absolute inset-0 m-auto', 'absolute bottom-2 left-2', 'absolute bottom-2 right-2'],
      6: ['absolute top-2 left-2', 'absolute top-2 right-2', 'absolute left-2 inset-y-0 my-auto', 'absolute right-2 inset-y-0 my-auto', 'absolute bottom-2 left-2', 'absolute bottom-2 right-2']
    };
    
    const animationVariants = {
      rolling: {
        rotateX: [0, 360, 720, 1080],
        rotateY: [0, 360, 720, 1080],
        transition: { duration: 1, ease: "easeInOut" }
      },
      static: {
        rotateX: 0,
        rotateY: 0,
        transition: { duration: 0.5 }
      }
    };
    
    return (
      <motion.div
        className="w-16 h-16 bg-white rounded-lg shadow-lg relative flex items-center justify-center"
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
          perspective: '1000px'
        }}
        animate={isRolling ? "rolling" : "static"}
        variants={animationVariants}
      >
        {dotPositionClassNames[value as keyof typeof dotPositionClassNames].map((position, i) => (
          <span
            key={i}
            className={`${position} w-3 h-3 bg-[#5a3e2b] rounded-full`}
          />
        ))}
      </motion.div>
    );
  };
  
  return (
    <Card className="bg-gradient-to-b from-[#f0f7ec] to-[#e0efd6] border-[#b7d49f] shadow-md overflow-hidden relative">
      <CardHeader className="bg-gradient-to-r from-[#b7d49f] to-[#9dba87] text-center pb-2 py-2 relative border-b border-[#b7d49f]">
        <h2 className="text-sm font-bold text-[#3c4a2d] flex items-center justify-center">
          <Dice6 className="mr-2" size={16} />
          تاس‌بینی (کلرومنسی)
        </h2>
      </CardHeader>
      
      <CardContent className="pt-4 px-4 relative z-10">
        <div className="space-y-4">
          {!isRevealed ? (
            <>
              <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#b7d49f]/30 text-center">
                <p className="text-sm text-[#3c4a2d]">
                  تاس‌بینی یا کلرومنسی، هنر باستانی پیشگویی با استفاده از تاس است. با پرتاب تاس و تفسیر اعداد ظاهر شده، می‌توان به بینش‌هایی درباره سوالات خود دست یافت.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-[#b7d49f]/20">
                  <label className="block text-[#3c4a2d] text-xs mb-1.5 font-medium">روش پیشگویی:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PREDICTION_METHODS.map(method => (
                      <Button
                        key={method.id}
                        variant={predictionMethod.id === method.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPredictionMethod(method)}
                        className={`text-[10px] h-auto py-2 ${predictionMethod.id === method.id ? 
                          "bg-[#9dba87] hover:bg-[#8aa975] text-white" : 
                          "border-[#b7d49f] text-[#3c4a2d]"}`}
                      >
                        {method.name}
                      </Button>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-[#3c4a2d]/80">{predictionMethod.description}</p>
                </div>
                
                <div className="bg-white/50 p-3 rounded-lg border border-[#b7d49f]/20">
                  <label className="block text-[#3c4a2d] text-xs mb-1.5 font-medium">سوال شما (اختیاری):</label>
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full text-xs p-2 border border-[#b7d49f]/30 rounded-md focus:ring-1 focus:ring-[#9dba87] focus:outline-none"
                    placeholder="سوال خود را اینجا بنویسید..."
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="flex justify-center py-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#b7d49f]/50 to-[#e0efd6]/50 rounded-lg flex items-center justify-center border border-[#b7d49f]/30">
                  <Dice6 size={32} className="text-[#3c4a2d] opacity-60" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative flex justify-center items-center gap-4 h-32">
                {diceResults.map((result, index) => (
                  <DiceDisplay 
                    key={index} 
                    value={result}
                    isRolling={isRolling}
                  />
                ))}
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg border border-[#b7d49f]/30 shadow-sm mt-2">
                <h3 className="text-sm font-medium text-[#3c4a2d] mb-2">تفسیر تاس:</h3>
                <p className="text-sm text-[#3c4a2d]/90 whitespace-pre-line">{interpretation}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#b7d49f]/20">
        {!isRevealed ? (
          <Button
            onClick={rollDice}
            disabled={isLoading}
            className="bg-[#9dba87] hover:bg-[#8aa975] text-white text-xs h-9 px-4 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {isLoading ? 
              <RefreshCw className="animate-spin mr-1" size={14} /> : 
              <Sparkles className="mr-1" size={14} />
            }
            پرتاب تاس
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#9dba87] text-[#3c4a2d] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              تاس‌بینی جدید
            </Button>
            
            <Button
              onClick={copyReading}
              variant="outline"
              size="sm"
              className="border-[#9dba87] text-[#3c4a2d] text-xs h-9 px-3"
            >
              <Copy size={14} className="mr-1" />
              کپی تفسیر
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default Cleromancy;
