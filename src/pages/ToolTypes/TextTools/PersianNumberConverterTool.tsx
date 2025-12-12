import React, { useState, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { persianToEnglishNumbers, englishToPersianNumbers } from '@/utils/text';
import { toast } from 'sonner';
import { useToolKeyboardShortcuts } from '@/hooks/useToolKeyboardShortcuts';
import { CopyResult, ShortcutHint } from '@/components/tools/ToolFeedback';
import { motion } from 'framer-motion';
import { RotateCcw, Keyboard, Hash } from 'lucide-react';

export default function PersianNumberConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState<'toEnglish' | 'toPersian'>('toPersian');
  const [showShortcuts, setShowShortcuts] = useState(false);

  const handleProcess = useCallback(() => {
    if (!input.trim()) {
      toast.error('لطفاً متن مورد نظر را وارد کنید.');
      return;
    }

    const result = direction === 'toPersian' 
      ? englishToPersianNumbers(input)
      : persianToEnglishNumbers(input);
    
    setOutput(result);
    toast.success(direction === 'toPersian' 
      ? 'اعداد انگلیسی به فارسی تبدیل شدند.'
      : 'اعداد فارسی به انگلیسی تبدیل شدند.');
  }, [input, direction]);

  const handleReset = useCallback(() => {
    setInput('');
    setOutput('');
    toast.success('پاک شد');
  }, []);

  useToolKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      callback: handleProcess,
      description: 'اجرا',
    },
    {
      key: 'r',
      ctrlKey: true,
      shiftKey: true,
      callback: handleReset,
      description: 'پاک کردن',
    },
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
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

      <Textarea
        placeholder={direction === 'toPersian' ? '123...' : '۱۲۳...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        className="resize-none"
      />

      <Button type="button" onClick={handleProcess} className="w-full gap-2">
        <Hash className="w-4 h-4" />
        تبدیل اعداد
      </Button>

      <Textarea
        value={output}
        readOnly
        rows={5}
        placeholder="خروجی اینجا نمایش داده خواهد شد..."
        className="resize-none bg-muted/30"
      />

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
        >
          <span className="text-sm text-muted-foreground">نتیجه آماده است</span>
          <CopyResult result={output} />
        </motion.div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4" />
          پاک کردن
        </Button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>میان‌بر</span>
          </button>
          
          {showShortcuts && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <ShortcutHint shortcut="Ctrl+Enter" action="اجرا" />
              <ShortcutHint shortcut="Ctrl+Shift+R" action="پاک کردن" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
