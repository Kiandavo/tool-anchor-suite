
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SpecialCharRemoverProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  outcomeMsg: string | null;
  setOutcomeMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

export function SpecialCharRemover({ text, setText, outcomeMsg, setOutcomeMsg }: SpecialCharRemoverProps) {
  const [result, setResult] = useState('');
  const [removePunctuation, setRemovePunctuation] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [removeSymbols, setRemoveSymbols] = useState(true);
  const [removeEmojis, setRemoveEmojis] = useState(true);

  const handleRemoveSpecialChars = () => {
    if (!text.trim()) {
      toast.warning('لطفاً متنی را وارد کنید');
      return;
    }

    let processedText = text;

    if (removePunctuation) {
      // حذف علائم نگارشی
      processedText = processedText.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');
    }

    if (removeNumbers) {
      // حذف اعداد (هم فارسی و هم انگلیسی)
      processedText = processedText.replace(/[0-9۰-۹]/g, '');
    }

    if (removeSymbols) {
      // حذف نمادهای خاص
      processedText = processedText.replace(/[§±×÷√∑∞≠≈≤≥©®™€£¥¢₹₽]/g, '');
    }

    if (removeEmojis) {
      // حذف ایموجی‌ها (تقریبی)
      processedText = processedText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/gu, '');
    }

    // حذف فاصله‌های اضافی
    processedText = processedText.replace(/\s+/g, ' ').trim();
    
    setResult(processedText);
    setOutcomeMsg('کاراکترهای خاص با موفقیت حذف شدند');
    toast.success('کاراکترهای خاص حذف شدند');
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success('متن پاک‌سازی شده کپی شد');
  };

  const handleUseResult = () => {
    setText(result);
    toast.success('متن پاک‌سازی شده جایگزین متن اصلی شد');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2 ml-2">
          <Checkbox 
            id="removePunctuation" 
            checked={removePunctuation} 
            onCheckedChange={(checked) => setRemovePunctuation(checked as boolean)} 
          />
          <Label htmlFor="removePunctuation">حذف علائم نگارشی</Label>
        </div>
        
        <div className="flex items-center space-x-2 ml-2">
          <Checkbox 
            id="removeNumbers" 
            checked={removeNumbers} 
            onCheckedChange={(checked) => setRemoveNumbers(checked as boolean)}
          />
          <Label htmlFor="removeNumbers">حذف اعداد</Label>
        </div>
        
        <div className="flex items-center space-x-2 ml-2">
          <Checkbox 
            id="removeSymbols" 
            checked={removeSymbols} 
            onCheckedChange={(checked) => setRemoveSymbols(checked as boolean)}
          />
          <Label htmlFor="removeSymbols">حذف نمادها</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="removeEmojis" 
            checked={removeEmojis} 
            onCheckedChange={(checked) => setRemoveEmojis(checked as boolean)}
          />
          <Label htmlFor="removeEmojis">حذف ایموجی‌ها</Label>
        </div>
      </div>
      
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="متن خود را وارد کنید..."
        className="min-h-32 text-right"
      />
      
      <Button onClick={handleRemoveSpecialChars} className="w-full">
        حذف کاراکترهای خاص
      </Button>
      
      {result && (
        <Card>
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">نتیجه:</h3>
              <div className="border p-3 rounded-lg bg-muted min-h-16 text-right">
                {result}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCopyResult} className="flex-1">
                کپی متن
              </Button>
              <Button variant="outline" onClick={handleUseResult} className="flex-1">
                استفاده به عنوان متن جدید
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
