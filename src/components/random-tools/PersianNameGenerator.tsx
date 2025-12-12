import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { User, Copy, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const maleNames = [
  { name: 'آرش', meaning: 'درخشان، تیرانداز افسانه‌ای' },
  { name: 'آرمان', meaning: 'آرزو، امید' },
  { name: 'آریا', meaning: 'نجیب، آزاده' },
  { name: 'امیر', meaning: 'فرمانروا، پادشاه' },
  { name: 'امیرحسین', meaning: 'فرمانروای نیکو' },
  { name: 'بهراد', meaning: 'نیک‌نهاد' },
  { name: 'پارسا', meaning: 'پرهیزگار، پاکدامن' },
  { name: 'پویا', meaning: 'جوینده، پویان' },
  { name: 'حسام', meaning: 'شمشیر تیز' },
  { name: 'داریوش', meaning: 'دارنده نیکی' },
  { name: 'رادین', meaning: 'بخشنده' },
  { name: 'سامان', meaning: 'نظم، آرامش' },
  { name: 'سپهر', meaning: 'آسمان' },
  { name: 'شایان', meaning: 'شایسته، لایق' },
  { name: 'علی', meaning: 'بلندمرتبه' },
  { name: 'کیان', meaning: 'پادشاه، سلطان' },
  { name: 'مهدی', meaning: 'هدایت‌شده' },
  { name: 'نیما', meaning: 'نام‌آور' },
  { name: 'هومن', meaning: 'نیک‌اندیش' },
  { name: 'یاسین', meaning: 'از حروف قرآن' },
];

const femaleNames = [
  { name: 'آتوسا', meaning: 'زیبا، نیکو' },
  { name: 'آناهیتا', meaning: 'الهه آب‌ها' },
  { name: 'آوا', meaning: 'صدا، آهنگ' },
  { name: 'الناز', meaning: 'ناز قوم' },
  { name: 'پریا', meaning: 'مانند پری' },
  { name: 'ترانه', meaning: 'آواز، سرود' },
  { name: 'درسا', meaning: 'درخشان' },
  { name: 'روژان', meaning: 'روز روشن' },
  { name: 'زهرا', meaning: 'درخشان، شکوفه' },
  { name: 'سارا', meaning: 'خالص، ناب' },
  { name: 'سوگند', meaning: 'قسم، پیمان' },
  { name: 'شقایق', meaning: 'گل لاله' },
  { name: 'غزل', meaning: 'شعر عاشقانه' },
  { name: 'فاطمه', meaning: 'جداکننده حق از باطل' },
  { name: 'کیمیا', meaning: 'کمیاب، ارزشمند' },
  { name: 'مریم', meaning: 'گل سپید' },
  { name: 'ملیکا', meaning: 'ملکه' },
  { name: 'نازنین', meaning: 'عزیز، محبوب' },
  { name: 'هستی', meaning: 'وجود، زندگی' },
  { name: 'یاسمین', meaning: 'گل یاسمن' },
];

interface GeneratedName {
  name: string;
  meaning: string;
  gender: 'male' | 'female';
}

export function PersianNameGenerator() {
  const [gender, setGender] = useState<'male' | 'female' | 'both'>('both');
  const [generatedName, setGeneratedName] = useState<GeneratedName | null>(null);
  const [favorites, setFavorites] = useState<GeneratedName[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateName = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let nameList: typeof maleNames;
      let selectedGender: 'male' | 'female';
      
      if (gender === 'both') {
        selectedGender = Math.random() < 0.5 ? 'male' : 'female';
        nameList = selectedGender === 'male' ? maleNames : femaleNames;
      } else {
        selectedGender = gender;
        nameList = gender === 'male' ? maleNames : femaleNames;
      }
      
      const randomIndex = Math.floor(Math.random() * nameList.length);
      const selected = nameList[randomIndex];
      
      setGeneratedName({
        ...selected,
        gender: selectedGender,
      });
      setIsGenerating(false);
    }, 500);
  };

  const addToFavorites = () => {
    if (generatedName && !favorites.some(f => f.name === generatedName.name)) {
      setFavorites([...favorites, generatedName]);
      toast({ title: 'به علاقه‌مندی‌ها اضافه شد!' });
    }
  };

  const removeFromFavorites = (name: string) => {
    setFavorites(favorites.filter(f => f.name !== name));
  };

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
    toast({ title: 'نام کپی شد!' });
  };

  const reset = () => {
    setGeneratedName(null);
    setFavorites([]);
  };

  const isFavorite = generatedName && favorites.some(f => f.name === generatedName.name);

  return (
    <div className="space-y-6">
      <CalculatorCard title="تولید نام فارسی" icon={User} onReset={reset}>
        {/* Gender Selection */}
        <div className="space-y-3">
          <Label>جنسیت</Label>
          <RadioGroup
            value={gender}
            onValueChange={(v) => setGender(v as typeof gender)}
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer">پسرانه</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="cursor-pointer">دخترانه</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both" className="cursor-pointer">هر دو</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateName}
          disabled={isGenerating}
          size="lg"
          className="w-full gap-2"
        >
          <Sparkles className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'در حال تولید...' : 'تولید نام'}
        </Button>
      </CalculatorCard>

      {/* Result */}
      <AnimatePresence mode="wait">
        {generatedName && (
          <motion.div
            key={generatedName.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <VisualizationCard>
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <span className={`inline-block px-3 py-1 rounded-full text-xs mb-4 ${
                    generatedName.gender === 'male' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-pink-100 text-pink-700'
                  }`}>
                    {generatedName.gender === 'male' ? '👦 پسرانه' : '👧 دخترانه'}
                  </span>
                  
                  <h2 className="text-5xl font-bold mb-4">{generatedName.name}</h2>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {generatedName.meaning}
                  </p>
                </motion.div>

                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => copyName(generatedName.name)}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    کپی
                  </Button>
                  <Button
                    variant={isFavorite ? 'default' : 'outline'}
                    onClick={addToFavorites}
                    disabled={isFavorite}
                    className="gap-2"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'در علاقه‌مندی‌ها' : 'علاقه‌مندی'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={generateName}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    نام دیگر
                  </Button>
                </div>
              </div>
            </VisualizationCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites */}
      {favorites.length > 0 && (
        <VisualizationCard title="علاقه‌مندی‌ها">
          <div className="space-y-2">
            {favorites.map((fav, index) => (
              <motion.div
                key={fav.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    fav.gender === 'male' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-pink-100 text-pink-700'
                  }`}>
                    {fav.gender === 'male' ? '👦' : '👧'}
                  </span>
                  <div>
                    <div className="font-medium">{fav.name}</div>
                    <div className="text-xs text-muted-foreground">{fav.meaning}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyName(fav.name)}
                    className="h-8 w-8"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromFavorites(fav.name)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Heart className="h-3 w-3 fill-current" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </VisualizationCard>
      )}
    </div>
  );
}

export default PersianNameGenerator;
