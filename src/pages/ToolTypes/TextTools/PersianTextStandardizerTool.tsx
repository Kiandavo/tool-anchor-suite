import React, { useState, useCallback } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { useToolKeyboardShortcuts } from '@/hooks/useToolKeyboardShortcuts';
import { CopyResult, ShortcutHint } from '@/components/tools/ToolFeedback';
import { motion } from 'framer-motion';
import { RotateCcw, Keyboard, Wand2 } from 'lucide-react';
import {
  correctHalfSpaces,
  arabicToPersian,
  removePersianDiacritics
} from '@/utils/text';

export default function PersianTextStandardizerTool() {
  const [textInput, setTextInput] = useState<string>("");
  const [textOutput, setTextOutput] = useState<string>("");
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [options, setOptions] = useState({
    correctSpaces: true,
    fixArabicChars: true,
    removeDiacritics: false,
  });

  const handleProcess = useCallback(() => {
    if (!textInput.trim()) {
      toast.error("لطفاً متن مورد نظر را وارد کنید.");
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
    toast.success("متن با موفقیت استاندارد سازی شد.");
  }, [textInput, options]);

  const handleReset = useCallback(() => {
    setTextInput("");
    setTextOutput("");
    toast.success("پاک شد");
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
      dir="rtl" 
      className="flex flex-col items-stretch gap-4"
    >
      <Textarea
        placeholder="متن فارسی خود را وارد کنید..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={7}
        className="resize-none"
      />

      <div className="flex flex-col gap-3 p-4 bg-muted/30 rounded-lg border border-border">
        <Label className="text-sm font-medium">گزینه‌های استانداردسازی:</Label>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="correctSpaces" 
            checked={options.correctSpaces}
            onCheckedChange={(checked) => setOptions({...options, correctSpaces: !!checked})}
          />
          <Label htmlFor="correctSpaces" className="text-sm">تصحیح نیم‌فاصله‌ها</Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="fixArabicChars" 
            checked={options.fixArabicChars}
            onCheckedChange={(checked) => setOptions({...options, fixArabicChars: !!checked})}
          />
          <Label htmlFor="fixArabicChars" className="text-sm">تبدیل کاراکترهای عربی به فارسی</Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="removeDiacritics" 
            checked={options.removeDiacritics}
            onCheckedChange={(checked) => setOptions({...options, removeDiacritics: !!checked})}
          />
          <Label htmlFor="removeDiacritics" className="text-sm">حذف اعراب (حرکت‌های حروف)</Label>
        </div>
      </div>

      <Button type="button" onClick={handleProcess} className="gap-2">
        <Wand2 className="w-4 h-4" />
        استانداردسازی متن
      </Button>
      
      <Textarea
        value={textOutput}
        readOnly
        rows={7}
        placeholder="خروجی اینجا نمایش داده خواهد شد..."
        className="resize-none bg-muted/30"
      />

      {textOutput && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
        >
          <span className="text-sm text-muted-foreground">نتیجه آماده است</span>
          <CopyResult result={textOutput} />
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
