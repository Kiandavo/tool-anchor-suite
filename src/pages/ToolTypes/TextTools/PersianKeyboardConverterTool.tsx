import React, { useState, useCallback } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { persianKeyboardConverter } from "@/utils/text";
import { toast } from 'sonner';
import { useToolKeyboardShortcuts } from '@/hooks/useToolKeyboardShortcuts';
import { CopyResult, ShortcutHint } from '@/components/tools/ToolFeedback';
import { motion } from 'framer-motion';
import { RotateCcw, Keyboard, Languages } from 'lucide-react';

export default function PersianKeyboardConverterTool() {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [showShortcuts, setShowShortcuts] = useState(false);

  const handleProcess = useCallback(() => {
    if (!textInput.trim()) {
      toast.error("لطفاً متن مورد نظر را وارد کنید.");
      return;
    }
    
    const result = persianKeyboardConverter(textInput);
    setTextOutput(result);
    toast.success("متن با موفقیت به فارسی تبدیل شد.");
  }, [textInput]);

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
        placeholder="متنی که با صفحه‌کلید فارسی تایپ کرده‌اید وارد کنید... مثال: sghl o'fdn"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={7}
        className="resize-none"
      />
      
      <Button type="button" onClick={handleProcess} className="gap-2">
        <Languages className="w-4 h-4" />
        تبدیل
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
