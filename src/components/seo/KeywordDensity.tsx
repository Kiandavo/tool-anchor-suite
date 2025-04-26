
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Filter } from 'lucide-react';
import { toast } from 'sonner';

export const KeywordDensity = () => {
  const [keywordText, setKeywordText] = useState<string>('');
  const [targetKeyword, setTargetKeyword] = useState<string>('');
  const [keywordDensityResult, setKeywordDensityResult] = useState<{
    totalWords: number;
    keywordCount: number;
    density: number;
  } | null>(null);

  const calculateKeywordDensity = () => {
    if (!keywordText || !targetKeyword) {
      toast.error("لطفاً متن و کلمه کلیدی را وارد کنید");
      return;
    }
    
    const words = keywordText.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const totalWords = words.length;
    
    const keyword = targetKeyword.toLowerCase();
    const keywordCount = words.filter(word => word === keyword).length;
    
    const density = totalWords > 0 ? (keywordCount / totalWords) * 100 : 0;
    
    setKeywordDensityResult({
      totalWords,
      keywordCount,
      density: parseFloat(density.toFixed(2))
    });
    
    toast.success("چگالی کلمه کلیدی محاسبه شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="متن مورد نظر را وارد کنید"
            value={keywordText}
            onChange={(e) => setKeywordText(e.target.value)}
            className="min-h-32"
          />
          
          <Input
            placeholder="کلمه کلیدی هدف"
            value={targetKeyword}
            onChange={(e) => setTargetKeyword(e.target.value)}
          />
          
          <Button 
            onClick={calculateKeywordDensity}
            className="w-full"
          >
            <Filter className="mr-2" size={18} />
            محاسبه چگالی کلمه کلیدی
          </Button>
        </div>
        
        {keywordDensityResult && (
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span>تعداد کل کلمات:</span>
              <span className="font-bold">{keywordDensityResult.totalWords}</span>
            </div>
            <div className="flex justify-between">
              <span>تعداد تکرار کلمه کلیدی:</span>
              <span className="font-bold">{keywordDensityResult.keywordCount}</span>
            </div>
            <div className="flex justify-between">
              <span>چگالی کلمه کلیدی:</span>
              <span className="font-bold">{keywordDensityResult.density}%</span>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {keywordDensityResult.density < 1 ? (
                "چگالی کلمه کلیدی کم است. برای بهبود سئو، استفاده بیشتری از کلمه کلیدی توصیه می‌شود."
              ) : keywordDensityResult.density > 5 ? (
                "چگالی کلمه کلیدی زیاد است. این ممکن است به عنوان اسپم تلقی شود."
              ) : (
                "چگالی کلمه کلیدی در محدوده مناسب قرار دارد (بین 1% تا 5%)."
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
