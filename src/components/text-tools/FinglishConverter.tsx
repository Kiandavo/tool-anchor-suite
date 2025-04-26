
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { finglishToPersian } from "@/utils/text";

interface FinglishConverterProps {
  outcomeMsg: string | null;
  setOutcomeMsg: (msg: string | null) => void;
}

export function FinglishConverter({ outcomeMsg, setOutcomeMsg }: FinglishConverterProps) {
  const { toast } = useToast();
  const [finglishInput, setFinglishInput] = useState("");
  const [persianOutput, setPersianOutput] = useState("");

  const handleConvertFinglish = () => {
    setPersianOutput(finglishToPersian(finglishInput));
    setOutcomeMsg("تبدیل با موفقیت انجام شد! متن فینگلیش به فارسی تبدیل شد.");
  };

  const handleCopyFarsi = () => {
    if (persianOutput) {
      navigator.clipboard.writeText(persianOutput);
      toast({
        title: "کپی شد!",
        description: "متن فارسی در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
      setOutcomeMsg("خروجی با موفقیت کپی شد.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        placeholder="مثال: salam doste man"
        value={finglishInput}
        onChange={e => setFinglishInput(e.target.value)}
      />
      <Button type="button" onClick={handleConvertFinglish}>تبدیل</Button>
      <Textarea
        placeholder="متن فارسی معادل"
        value={persianOutput}
        readOnly
      />
      <Button type="button" variant="outline" onClick={handleCopyFarsi}>کپی متن فارسی</Button>
    </div>
  );
}
