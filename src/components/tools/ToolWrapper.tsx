import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToolExamples, ToolExample } from './ToolExamples';
import { ToolLimits, ToolLimit } from './ToolLimits';
import { ToolError, CopyResult, ShortcutHint } from './ToolFeedback';
import { useToolKeyboardShortcuts } from '@/hooks/useToolKeyboardShortcuts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ToolWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  examples?: ToolExample[];
  limits?: ToolLimit[];
  result?: string | null;
  error?: string | null;
  errorKey?: string;
  onReset?: () => void;
  onRun?: () => void;
  onSelectExample?: (input: string) => void;
  showKeyboardHints?: boolean;
  className?: string;
}

export const ToolWrapper: React.FC<ToolWrapperProps> = ({
  children,
  title,
  description,
  examples = [],
  limits = [],
  result,
  error,
  errorKey,
  onReset,
  onRun,
  onSelectExample,
  showKeyboardHints = true,
  className,
}) => {
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Register keyboard shortcuts
  useToolKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      callback: () => {
        if (onRun) {
          onRun();
          toast.success('اجرا شد');
        }
      },
      description: 'اجرای ابزار',
    },
    {
      key: 'r',
      ctrlKey: true,
      shiftKey: true,
      callback: () => {
        if (onReset) {
          onReset();
          toast.success('پاک شد');
        }
      },
      description: 'پاک کردن',
    },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("space-y-4", className)}
    >
      {/* Tool Header */}
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Examples */}
      {examples.length > 0 && onSelectExample && (
        <ToolExamples
          examples={examples}
          onSelectExample={onSelectExample}
        />
      )}

      {/* Limits */}
      {limits.length > 0 && (
        <ToolLimits limits={limits} />
      )}

      {/* Main Content */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Error State */}
      <ToolError 
        error={error || null} 
        errorKey={errorKey}
        onRetry={onRun}
      />

      {/* Result with Copy */}
      {result && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
        >
          <span className="text-sm text-muted-foreground">نتیجه آماده است</span>
          <CopyResult result={result} />
        </motion.div>
      )}

      {/* Actions & Shortcuts */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-2">
          {onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4" />
              پاک کردن
            </Button>
          )}
        </div>

        {showKeyboardHints && (
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
                {onRun && (
                  <ShortcutHint shortcut="Ctrl+Enter" action="اجرا" />
                )}
                {onReset && (
                  <ShortcutHint shortcut="Ctrl+Shift+R" action="پاک کردن" />
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Hook for using tool wrapper state
export const useToolState = <T extends string | number | null>(initialValue: T) => {
  const [input, setInput] = useState<T>(initialValue);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const reset = useCallback(() => {
    setInput(initialValue);
    setResult(null);
    setError(null);
  }, [initialValue]);

  const process = useCallback(async (processor: () => Promise<string> | string) => {
    setError(null);
    setIsProcessing(true);
    try {
      const output = await processor();
      setResult(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطای نامشخص');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    input,
    setInput,
    result,
    setResult,
    error,
    setError,
    isProcessing,
    reset,
    process,
  };
};
