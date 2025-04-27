
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ToolInfoCard } from "@/components/ToolInfoCard";
import { OutcomeInfoCard } from "@/components/OutcomeInfoCard";
import { useToast } from "@/hooks/use-toast";
import {
  standardizePersianText,
  correctHalfSpaces,
  arabicToPersian,
  removePersianDiacritics
} from '@/utils/text';

export default function PersianTextStandardizerTool() {
  const { toast } = useToast();
  const [textInput, setTextInput] = useState<string>("");
  const [textOutput, setTextOutput] = useState<string>("");
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);
  const [options, setOptions] = useState({
    correctSpaces: true,
    fixArabicChars: true,
    removeDiacritics: false,
  });

  const handleProcess = () => {
    if (!textInput.trim()) {
      setOutcomeMsg("لطفاً متن مورد نظر را وارد کنید.");
      return;
    }

    let processedText = textInput;

    if (options.fixArabicChars) {
      processedText = arabicToPersian(processedText);
    }

    if (options.correctSpaces) {
      processedText = correctHalfSpaces(processedText);
    }

    if (options.removeDiacritics) {
      processedText = removePersianDiacritics(processedText);
    }

    setTextOutput(processedText);
    setOutcomeMsg("متن با موفقیت استاندارد سازی شد.");
  };

  const handleCopy = () => {
    if (textOutput) {
      navigator.clipboard.writeText(textOutput);
      toast({
        title: "کپی شد!",
        description: "متن استاندارد شده در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
    }
  };

  return (
    <div dir="rtl" className="flex flex-col items-stretch gap-4">
      <ToolInfoCard
        name="استانداردسازی متن فارسی"
        description="این ابزار متن فارسی را با توجه به انتخاب‌های شما استاندارد می‌کند. می‌توانید تصحیح نیم‌فاصله‌ها، تبدیل کاراکترهای عربی به فارسی و حذف اعراب را انتخاب کنید."
      />

      <Textarea
        placeholder="متن فارسی خود را وارد کنید..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={7}
      />

      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="correctSpaces" 
            checked={options.correctSpaces}
            onCheckedChange={(checked) => setOptions({...options, correctSpaces: !!checked})}
          />
          <Label htmlFor="correctSpaces">تصحیح نیم‌فاصله‌ها</Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="fixArabicChars" 
            checked={options.fixArabicChars}
            onCheckedChange={(checked) => setOptions({...options, fixArabicChars: !!checked})}
          />
          <Label htmlFor="fixArabicChars">تبدیل کاراکترهای عربی به فارسی</Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="removeDiacritics" 
            checked={options.removeDiacritics}
            onCheckedChange={(checked) => setOptions({...options, removeDiacritics: !!checked})}
          />
          <Label htmlFor="removeDiacritics">حذف اعراب (حرکت‌های حروف)</Label>
        </div>
      </div>

      <Button type="button" onClick={handleProcess}>
        استانداردسازی متن
      </Button>
      
      <Textarea
        value={textOutput}
        readOnly
        rows={7}
        placeholder="خروجی اینجا نمایش داده خواهد شد..."
      />
      
      <Button type="button" variant="outline" onClick={handleCopy} disabled={!textOutput}>
        کپی متن استاندارد شده
      </Button>
      
      {outcomeMsg && <OutcomeInfoCard outcome={outcomeMsg} />}
    </div>
  );
}
