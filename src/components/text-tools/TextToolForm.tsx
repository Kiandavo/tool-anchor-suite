import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Copy, Check, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TextToolFormProps {
  textInput: string;
  textOutput: string;
  setTextInput: (text: string) => void;
  handleProcess: () => void;
  showSortOptions?: boolean;
  sortOrder?: "asc" | "desc";
  setSortOrder?: (order: "asc" | "desc") => void;
  setOutcomeMsg: (msg: string | null) => void;
  inputPlaceholder?: string;
  processButtonText?: string;
  sampleText?: string;
}

const DEFAULT_SAMPLE = "این یک متن نمونه است. This is a SAMPLE text for testing the tool.";

export function TextToolForm({
  textInput,
  textOutput,
  setTextInput,
  handleProcess,
  showSortOptions,
  sortOrder,
  setSortOrder,
  setOutcomeMsg,
  inputPlaceholder = "متن خود را اینجا بنویسید یا پیست کنید...",
  processButtonText = "اجرا",
  sampleText = DEFAULT_SAMPLE
}: TextToolFormProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (textOutput) {
      try {
        await navigator.clipboard.writeText(textOutput);
        setCopied(true);
        toast.success("کپی شد!");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error("خطا در کپی کردن");
      }
    }
  };

  const handleClear = () => {
    setTextInput('');
    setOutcomeMsg(null);
  };

  const handleSample = () => {
    setTextInput(sampleText);
  };

  return (
    <div dir="rtl" className="flex flex-col items-stretch gap-4">
      {/* Input Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="textTool" className="text-sm font-medium">متن ورودی</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSample}
              className="h-8 text-xs"
            >
              <FileText className="w-3.5 h-3.5 ml-1.5" />
              نمونه متن
            </Button>
            {textInput && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-8 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-3.5 h-3.5 ml-1.5" />
                پاک کردن
              </Button>
            )}
          </div>
        </div>
        <Textarea
          id="textTool"
          placeholder={inputPlaceholder}
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          rows={5}
          className="resize-none"
        />
      </div>

      {/* Sort Options */}
      {showSortOptions && sortOrder && setSortOrder && (
        <RadioGroup
          value={sortOrder}
          onValueChange={val => setSortOrder(val as "asc" | "desc")}
          className="flex gap-4"
        >
          <Label>مرتب سازی:</Label>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="asc" id="asc" />
            <Label htmlFor="asc">صعودی</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="desc" id="desc" />
            <Label htmlFor="desc">نزولی</Label>
          </div>
        </RadioGroup>
      )}

      {/* Process Button */}
      <Button 
        type="button" 
        onClick={handleProcess} 
        size="lg" 
        className="w-full"
        disabled={!textInput.trim()}
      >
        {processButtonText}
      </Button>

      {/* Output Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">خروجی</Label>
          {textOutput && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className={cn(
                "h-8 text-xs transition-all",
                copied && "bg-green-500/10 text-green-600 border-green-500/30"
              )}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 ml-1.5" />
                  کپی شد
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 ml-1.5" />
                  کپی
                </>
              )}
            </Button>
          )}
        </div>
        <div className="p-4 rounded-lg bg-muted/50 border border-border min-h-[120px]">
          {textOutput ? (
            <pre className="text-sm text-foreground whitespace-pre-wrap break-words" dir="auto">
              {textOutput}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">نتیجه اینجا نمایش داده می‌شود...</p>
          )}
        </div>
      </div>
    </div>
  );
}
