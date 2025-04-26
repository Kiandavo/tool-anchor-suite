
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TextToolForm } from '@/components/text-tools/TextToolForm';
import { persianToEnglishNumbers, englishToPersianNumbers } from '@/utils/text';

export default function PersianNumberConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState<'toEnglish' | 'toPersian'>('toPersian');
  const [outcomeMsg, setOutcomeMsg] = useState<string | null>(null);

  const handleProcess = () => {
    if (!input.trim()) {
      setOutcomeMsg('لطفاً متن مورد نظر را وارد کنید.');
      return;
    }

    const result = direction === 'toPersian' 
      ? englishToPersianNumbers(input)
      : persianToEnglishNumbers(input);
    
    setOutput(result);
    setOutcomeMsg(direction === 'toPersian' 
      ? 'اعداد انگلیسی به فارسی تبدیل شدند.'
      : 'اعداد فارسی به انگلیسی تبدیل شدند.');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>جهت تبدیل را انتخاب کنید:</Label>
        <RadioGroup
          value={direction}
          onValueChange={(val) => setDirection(val as 'toEnglish' | 'toPersian')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="toPersian" id="toPersian" />
            <Label htmlFor="toPersian">انگلیسی به فارسی</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="toEnglish" id="toEnglish" />
            <Label htmlFor="toEnglish">فارسی به انگلیسی</Label>
          </div>
        </RadioGroup>
      </div>

      <TextToolForm
        textInput={input}
        textOutput={output}
        setTextInput={setInput}
        handleProcess={handleProcess}
        setOutcomeMsg={setOutcomeMsg}
        inputPlaceholder={direction === 'toPersian' ? '123...' : '۱۲۳...'}
        processButtonText="تبدیل اعداد"
      />
    </div>
  );
}
