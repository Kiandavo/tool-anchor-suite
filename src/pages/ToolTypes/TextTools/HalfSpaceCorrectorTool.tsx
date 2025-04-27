
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolInfoCard } from "@/components/ToolInfoCard";
import { OutcomeInfoCard } from "@/components/OutcomeInfoCard";
import { correctHalfSpaces } from "@/utils/text";
import { useToast } from "@/hooks/use-toast";

export default function HalfSpaceCorrectorTool() {
  const { toast } = useToast();
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);

  const handleProcess = () => {
    if (!textInput.trim()) {
      setOutcomeMsg("لطفاً متن مورد نظر را وارد کنید.");
      return;
    }
    
    const result = correctHalfSpaces(textInput);
    setTextOutput(result);
    setOutcomeMsg("نیم‌فاصله‌های متن با موفقیت اصلاح شدند.");
  };

  const handleCopy = () => {
    if (textOutput) {
      navigator.clipboard.writeText(textOutput);
      toast({
        title: "کپی شد!",
        description: "متن اصلاح شده در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
    }
  };

  return (
    <div dir="rtl" className="flex flex-col items-stretch gap-4">
      <ToolInfoCard
        name="تصحیح نیم‌فاصله"
        description="این ابزار نیم‌فاصله‌ها را در متن فارسی اصلاح می‌کند. برای مثال، پیشوندهایی مانند «می» و «نمی» را به درستی با کلمه بعدی ترکیب می‌کند."
      />
      <Textarea
        placeholder="متن فارسی خود را وارد کنید..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={7}
      />
      <Button type="button" onClick={handleProcess}>اصلاح نیم‌فاصله‌ها</Button>
      <Textarea
        value={textOutput}
        readOnly
        rows={7}
        placeholder="خروجی اینجا نمایش داده خواهد شد..."
      />
      <Button type="button" variant="outline" onClick={handleCopy} disabled={!textOutput}>
        کپی متن اصلاح شده
      </Button>
      {outcomeMsg && <OutcomeInfoCard outcome={outcomeMsg} />}
    </div>
  );
}
