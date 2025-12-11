import React, { useState, useCallback } from 'react';
import { Copy, Check, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ToolInputOutputProps {
  inputLabel?: string;
  inputPlaceholder: string;
  outputLabel?: string;
  sampleInput?: string;
  value: string;
  onChange: (value: string) => void;
  result: string;
  resultComponent?: React.ReactNode;
  inputType?: 'textarea' | 'text' | 'number';
  inputRows?: number;
  className?: string;
}

export const ToolInputOutput: React.FC<ToolInputOutputProps> = ({
  inputLabel = 'ورودی',
  inputPlaceholder,
  outputLabel = 'نتیجه',
  sampleInput,
  value,
  onChange,
  result,
  resultComponent,
  inputType = 'textarea',
  inputRows = 4,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success('کپی شد!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('خطا در کپی کردن');
    }
  }, [result]);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  const handleSample = useCallback(() => {
    if (sampleInput) {
      onChange(sampleInput);
    }
  }, [sampleInput, onChange]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Input Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            {inputLabel}
          </label>
          <div className="flex items-center gap-2">
            {sampleInput && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSample}
                className="h-8 text-xs"
              >
                <FileText className="w-3.5 h-3.5 ml-1.5" />
                نمونه
              </Button>
            )}
            {value && (
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
        
        {inputType === 'textarea' ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={inputPlaceholder}
            rows={inputRows}
            className="resize-none bg-background border-border focus:border-primary/50 focus:ring-primary/20"
            dir="auto"
          />
        ) : (
          <input
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={inputPlaceholder}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            dir="auto"
          />
        )}
      </div>

      {/* Output Section */}
      {(result || resultComponent) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {outputLabel}
            </label>
            {result && (
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
          
          {resultComponent || (
            <div className="p-4 rounded-lg bg-muted/50 border border-border min-h-[100px]">
              <pre className="text-sm text-foreground whitespace-pre-wrap break-words font-mono" dir="auto">
                {result || <span className="text-muted-foreground">نتیجه اینجا نمایش داده می‌شود...</span>}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
