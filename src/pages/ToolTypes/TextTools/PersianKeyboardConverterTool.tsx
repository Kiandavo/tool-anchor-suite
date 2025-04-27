
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolInfoCard } from "@/components/ToolInfoCard";
import { OutcomeInfoCard } from "@/components/OutcomeInfoCard";
import { persianKeyboardConverter } from "@/utils/text";
import { useToast } from "@/hooks/use-toast";

export default function PersianKeyboardConverterTool() {
  const { toast } = useToast();
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);

  const handleProcess = () => {
    if (!textInput.trim()) {
      setOutcomeMsg("لطفاً متن مورد نظر را وارد کنید.");
      return;
    }
    
    const result = persianKeyboardConverter(textInput);
    setTextOutput(result);
    setOutcomeMsg("متن با موفقیت به فارسی تبدیل شد.");
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
        name="تبدیل صفحه‌کلید فارسی"
        description="این ابزار متنی را که با چیدمان صفحه‌کلید فارسی اما با حروف انگلیسی تایپ شده به فارسی تبدیل می‌کند. برای مثال، اگر با صفحه‌کلید فارسی تایپ کرده باشید، ولی زبان سیستم روی انگلیسی بوده باشد."
      />
      <Textarea
        placeholder="متنی که با صفحه‌کلید فارسی تایپ کرده‌اید وارد کنید... مثال: sghl o'fdn"
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
