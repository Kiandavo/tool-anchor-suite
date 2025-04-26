
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ToolInfoCard } from "@/components/ToolInfoCard";
import { OutcomeInfoCard } from "@/components/OutcomeInfoCard";
import { 
  standardizePersianText, 
  correctHalfSpaces, 
  arabicToPersian, 
  removePersianDiacritics 
} from "@/utils/textUtils";
import { useToast } from "@/hooks/use-toast";

export default function PersianTextStandardizerTool() {
  const { toast } = useToast();
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [options, setOptions] = useState({
    fixHalfSpaces: true,
    convertArabicChars: true,
    removeDiacritics: false,
    normalizeSpacing: true
  });
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);

  const handleProcess = () => {
    if (!textInput.trim()) {
      setOutcomeMsg("لطفاً متن مورد نظر را وارد کنید.");
      return;
    }
    
    let result = textInput;
    
    if (options.convertArabicChars) {
      result = arabicToPersian(result);
    }
    
    if (options.fixHalfSpaces) {
      result = correctHalfSpaces(result);
    }
    
    if (options.removeDiacritics) {
      result = removePersianDiacritics(result);
    }
    
    if (options.normalizeSpacing) {
      // Normalize spaces
      result = result.replace(/\s+/g, ' ');
      // Add space after punctuation if not present
      result = result.replace(/([.،؛:!؟])([\S])/g, '$1 $2');
    }
    
    setTextOutput(result);
    setOutcomeMsg("متن فارسی با موفقیت استاندارد شد.");
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

  const toggleOption = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div dir="rtl" className="flex flex-col items-stretch gap-4">
      <ToolInfoCard
        name="استانداردسازی متن فارسی"
        description="این ابزار متن فارسی را بر اساس استانداردهای نگارش فارسی اصلاح می‌کند. شما می‌توانید انتخاب کنید کدام ویژگی‌های استانداردسازی اعمال شوند."
      />
      
      <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-md">
        <div className="text-lg font-semibold mb-2">گزینه‌های استانداردسازی:</div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="fixHalfSpaces" 
            checked={options.fixHalfSpaces} 
            onCheckedChange={() => toggleOption('fixHalfSpaces')} 
          />
          <Label htmlFor="fixHalfSpaces">تصحیح نیم‌فاصله‌ها</Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="convertArabicChars" 
            checked={options.convertArabicChars} 
            onCheckedChange={() => toggleOption('convertArabicChars')} 
          />
          <Label htmlFor="convertArabicChars">تبدیل حروف عربی به فارسی (ي به ی، ك به ک)</Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="removeDiacritics" 
            checked={options.removeDiacritics} 
            onCheckedChange={() => toggleOption('removeDiacritics')} 
          />
          <Label htmlFor="removeDiacritics">حذف اِعراب (فتحه، کسره، ضمه و...)</Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="normalizeSpacing" 
            checked={options.normalizeSpacing} 
            onCheckedChange={() => toggleOption('normalizeSpacing')} 
          />
          <Label htmlFor="normalizeSpacing">استانداردسازی فاصله‌ها (بعد از نقطه و علائم نگارشی)</Label>
        </div>
      </div>
      
      <Textarea
        placeholder="متن فارسی خود را وارد کنید..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={7}
      />
      <Button type="button" onClick={handleProcess}>استانداردسازی متن</Button>
      <Textarea
        value={textOutput}
        readOnly
        rows={7}
        placeholder="متن استاندارد شده اینجا نمایش داده خواهد شد..."
      />
      <Button type="button" variant="outline" onClick={handleCopy} disabled={!textOutput}>
        کپی متن استاندارد شده
      </Button>
      {outcomeMsg && <OutcomeInfoCard outcome={outcomeMsg} />}
    </div>
  );
}
