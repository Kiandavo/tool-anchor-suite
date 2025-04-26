
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ToolInfoCard } from "@/components/ToolInfoCard";
import { OutcomeInfoCard } from "@/components/OutcomeInfoCard";
import { englishToPersianNumbers, persianToEnglishNumbers } from "@/utils/textUtils";
import { useToast } from "@/hooks/use-toast";

export default function PersianNumberConverterTool() {
  const { toast } = useToast();
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [conversionType, setConversionType] = useState<"toEnglish" | "toPersian">("toPersian");
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);

  const handleProcess = () => {
    if (!textInput.trim()) {
      setOutcomeMsg("لطفاً متن مورد نظر را وارد کنید.");
      return;
    }
    
    let result;
    if (conversionType === "toPersian") {
      result = englishToPersianNumbers(textInput);
      setOutcomeMsg("اعداد انگلیسی با موفقیت به اعداد فارسی تبدیل شدند.");
    } else {
      result = persianToEnglishNumbers(textInput);
      setOutcomeMsg("اعداد فارسی با موفقیت به اعداد انگلیسی تبدیل شدند.");
    }
    
    setTextOutput(result);
  };

  const handleCopy = () => {
    if (textOutput) {
      navigator.clipboard.writeText(textOutput);
      toast({
        title: "کپی شد!",
        description: "متن تبدیل شده در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
    }
  };

  return (
    <div dir="rtl" className="flex flex-col items-stretch gap-4">
      <ToolInfoCard
        name="تبدیل اعداد فارسی/انگلیسی"
        description="با این ابزار می‌توانید اعداد را بین فارسی (۱۲۳) و انگلیسی (123) تبدیل کنید."
      />
      <RadioGroup
        value={conversionType}
        onValueChange={(val) => setConversionType(val as "toEnglish" | "toPersian")}
        className="flex gap-4 mb-2"
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroup.Item value="toPersian" id="toPersian" />
          <Label htmlFor="toPersian">تبدیل اعداد انگلیسی به فارسی</Label>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroup.Item value="toEnglish" id="toEnglish" />
          <Label htmlFor="toEnglish">تبدیل اعداد فارسی به انگلیسی</Label>
        </div>
      </RadioGroup>
      
      <Textarea
        placeholder={conversionType === "toPersian" ? "اعداد انگلیسی را وارد کنید... مثال: 123" : "اعداد فارسی را وارد کنید... مثال: ۱۲۳"}
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={7}
      />
      <Button type="button" onClick={handleProcess}>تبدیل</Button>
      <Textarea
        value={textOutput}
        readOnly
        rows={7}
        placeholder="خروجی اینجا نمایش داده خواهد شد..."
      />
      <Button type="button" variant="outline" onClick={handleCopy} disabled={!textOutput}>
        کپی متن تبدیل شده
      </Button>
      {outcomeMsg && <OutcomeInfoCard outcome={outcomeMsg} />}
    </div>
  );
}
