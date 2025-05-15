
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Sparkles, RefreshCw, Camera, Copy } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";

const AURA_COLORS = [
  { color: 'red', meaning: 'نیرو و انرژی فیزیکی، شور و شجاعت', hex: '#ff5252' },
  { color: 'orange', meaning: 'خلاقیت، شادی و خودباوری', hex: '#ff9e40' },
  { color: 'yellow', meaning: 'هوش، خرد و قدرت فکری', hex: '#ffeb3b' },
  { color: 'green', meaning: 'تعادل، عشق و شفا', hex: '#4caf50' },
  { color: 'blue', meaning: 'آرامش، صداقت و توانایی بیان', hex: '#2196f3' },
  { color: 'indigo', meaning: 'شهود، بصیرت و توانایی معنوی', hex: '#3f51b5' },
  { color: 'violet', meaning: 'آگاهی روحی، اتصال به منبع و تعالی', hex: '#9c27b0' },
  { color: 'white', meaning: 'تعادل کامل، پاکی و روشنی', hex: '#ffffff' },
  { color: 'gold', meaning: 'حمایت معنوی، روشنگری و حکمت', hex: '#ffd700' }
];

export const AuraReading: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(0.5);
  const [auraInterpretation, setAuraInterpretation] = useState('');

  const generateReading = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      // Select 1-3 colors randomly
      const numColors = Math.floor(Math.random() * 3) + 1;
      const shuffled = [...AURA_COLORS].sort(() => 0.5 - Math.random());
      const colors = shuffled.slice(0, numColors).map(c => c.color);
      
      setSelectedColors(colors);
      
      // Random intensity between 0.3 and 1
      const newIntensity = 0.3 + Math.random() * 0.7;
      setIntensity(newIntensity);
      
      // Generate interpretation based on selected colors
      const interpretation = generateInterpretation(colors, newIntensity);
      setAuraInterpretation(interpretation);
      
      setIsLoading(false);
      setIsRevealed(true);
      toast.success("خوانش هاله انرژی شما با موفقیت انجام شد");
    }, 1500);
  };
  
  const generateInterpretation = (colors: string[], intensity: number) => {
    const colorMeanings = colors.map(color => {
      const colorInfo = AURA_COLORS.find(c => c.color === color);
      return colorInfo?.meaning || '';
    }).filter(Boolean);
    
    const intensityDesc = intensity < 0.4 ? 'کمرنگ و ظریف' : 
                          intensity < 0.7 ? 'متعادل و واضح' : 
                          'قوی و درخشان';
    
    return `هاله انرژی شما ${intensityDesc} است و رنگ‌های غالب آن نشان‌دهنده ${colorMeanings.join(' و ')} می‌باشد. این ترکیب رنگی نشان‌دهنده شخصیتی ${intensity > 0.6 ? 'قدرتمند' : 'حساس'} با استعدادهای ویژه است.`;
  };
  
  const copyAuraReading = () => {
    if (auraInterpretation) {
      const colorNames = selectedColors.map(color => {
        const persianColor = {
          'red': 'قرمز',
          'orange': 'نارنجی',
          'yellow': 'زرد',
          'green': 'سبز',
          'blue': 'آبی',
          'indigo': 'نیلی',
          'violet': 'بنفش',
          'white': 'سفید',
          'gold': 'طلایی'
        }[color] || color;
        
        return persianColor;
      }).join('، ');
      
      const textToCopy = `خوانش هاله انرژی:\nرنگ‌های اصلی: ${colorNames}\n\n${auraInterpretation}`;
      copyToClipboard(textToCopy);
      toast.success("متن خوانش هاله کپی شد!");
    }
  };
  
  const resetReading = () => {
    setIsRevealed(false);
    setSelectedColors([]);
    setAuraInterpretation('');
  };
  
  return (
    <Card className="bg-gradient-to-b from-[#f5f0ff] to-[#e6e0ff] border-[#d8c2ff] shadow-md overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <CardHeader className="bg-gradient-to-r from-[#c2a3ff] to-[#a68fff] text-center pb-2 py-2 relative border-b border-[#d8c2ff]">
        <h2 className="text-sm font-bold text-white flex items-center justify-center">
          <Sparkles className="mr-2" size={16} />
          خوانش هاله انرژی
        </h2>
      </CardHeader>
      
      <CardContent className="pt-4 px-4 pb-2 relative z-10">
        {!isRevealed ? (
          <div className="space-y-4">
            <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-[#d8c2ff]/30 text-center">
              <p className="text-sm text-[#6b46c1]">
                هاله انرژی یک میدان الکترومغناطیسی است که بدن شما را احاطه می‌کند. رنگ‌ها و شدت هاله می‌تواند نشان‌دهنده وضعیت احساسی، جسمی و معنوی شما باشد.
              </p>
            </div>
            
            <div className="text-center py-3">
              <div className="w-32 h-32 mx-auto rounded-full bg-white/50 border-2 border-[#d8c2ff] flex items-center justify-center shadow-inner">
                <Camera size={40} className="text-[#a68fff] opacity-60" />
              </div>
              <p className="mt-3 text-xs text-[#6b46c1]">برای شروع خوانش روی دکمه «دریافت خوانش هاله» کلیک کنید</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="relative h-40 flex items-center justify-center">
              {/* Aura visualization */}
              <div className="relative w-28 h-28">
                <div className="absolute inset-0 rounded-full bg-[#f5f0ff] border border-[#d8c2ff]"></div>
                {selectedColors.map((color, i) => {
                  const colorInfo = AURA_COLORS.find(c => c.color === color);
                  return (
                    <div 
                      key={i}
                      className="absolute inset-[-10px] rounded-full animate-pulse"
                      style={{ 
                        backgroundColor: colorInfo?.hex || '#9c27b0',
                        opacity: 0.2 + (intensity * 0.3),
                        filter: `blur(${10 + (i * 5)}px)`,
                        transform: `scale(${1 + (i * 0.2) + (intensity * 0.3)})`,
                        animation: `pulse ${3 + i}s infinite alternate`,
                        zIndex: -i
                      }}
                    ></div>
                  )
                })}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="40" height="48" viewBox="0 0 24 24" className="text-[#6b46c1]">
                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 p-4 rounded-lg border border-[#d8c2ff]/30 shadow-sm">
              <p className="text-sm text-[#6b46c1] leading-relaxed">{auraInterpretation}</p>
              
              {/* Color legend */}
              <div className="mt-3 pt-3 border-t border-[#d8c2ff]/30">
                <p className="text-xs font-medium text-[#6b46c1] mb-2">رنگ‌های هاله شما:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedColors.map((color, i) => {
                    const colorInfo = AURA_COLORS.find(c => c.color === color);
                    return (
                      <div key={i} className="flex items-center space-x-1 rtl:space-x-reverse bg-white/50 px-2 py-1 rounded-full border border-[#d8c2ff]/30">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: colorInfo?.hex || '#9c27b0' }}
                        ></div>
                        <span className="text-xs text-[#6b46c1]">{
                          {
                            'red': 'قرمز',
                            'orange': 'نارنجی',
                            'yellow': 'زرد',
                            'green': 'سبز',
                            'blue': 'آبی',
                            'indigo': 'نیلی',
                            'violet': 'بنفش',
                            'white': 'سفید',
                            'gold': 'طلایی'
                          }[color] || color
                        }</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/30 border-t border-[#d8c2ff]/20">
        {!isRevealed ? (
          <Button
            onClick={generateReading}
            disabled={isLoading}
            className="bg-[#a68fff] hover:bg-[#9370db] text-white text-xs h-9 px-4 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {isLoading ? 
              <RefreshCw className="animate-spin mr-1" size={14} /> : 
              <Sparkles className="mr-1" size={14} />
            }
            دریافت خوانش هاله
          </Button>
        ) : (
          <>
            <Button
              onClick={resetReading}
              variant="outline"
              size="sm"
              className="border-[#a68fff] text-[#6b46c1] text-xs h-9 px-3"
            >
              <RefreshCw size={14} className="mr-1" />
              خوانش جدید
            </Button>
            
            <Button
              onClick={copyAuraReading}
              variant="outline"
              size="sm"
              className="border-[#a68fff] text-[#6b46c1] text-xs h-9 px-3"
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

export default AuraReading;
