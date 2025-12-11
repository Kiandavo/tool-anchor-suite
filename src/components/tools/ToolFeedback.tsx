import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Human-readable error messages in Persian
export const errorMessages: Record<string, string> = {
  // Input errors
  'empty_input': 'لطفاً متن یا مقداری وارد کنید',
  'input_too_long': 'متن وارد شده بیش از حد مجاز است',
  'input_too_short': 'متن وارد شده کوتاه‌تر از حد لازم است',
  'invalid_format': 'فرمت وارد شده صحیح نیست',
  'invalid_number': 'عدد وارد شده معتبر نیست',
  'invalid_email': 'ایمیل وارد شده معتبر نیست',
  'invalid_url': 'آدرس اینترنتی معتبر نیست',
  
  // File errors
  'file_too_large': 'حجم فایل بیش از حد مجاز است',
  'invalid_file_type': 'نوع فایل پشتیبانی نمی‌شود',
  'file_upload_failed': 'آپلود فایل با خطا مواجه شد',
  
  // Processing errors
  'processing_failed': 'پردازش با خطا مواجه شد. لطفاً دوباره تلاش کنید',
  'network_error': 'خطا در اتصال به اینترنت',
  'timeout': 'زمان پردازش به پایان رسید',
  
  // Generic
  'unknown': 'خطای نامشخصی رخ داد',
};

export const getErrorMessage = (errorKey: string, customMessage?: string): string => {
  return customMessage || errorMessages[errorKey] || errorMessages['unknown'];
};

interface ToolErrorProps {
  error: string | null;
  errorKey?: string;
  onRetry?: () => void;
  className?: string;
}

export const ToolError: React.FC<ToolErrorProps> = ({
  error,
  errorKey,
  onRetry,
  className,
}) => {
  if (!error) return null;

  const message = errorKey ? getErrorMessage(errorKey, error) : error;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          "flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20",
          className
        )}
      >
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-destructive font-medium">{message}</p>
          {onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRetry}
              className="mt-2 h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <RefreshCw className="w-3 h-3 ml-1" />
              تلاش مجدد
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Copy result component with visual feedback
interface CopyResultProps {
  result: string;
  label?: string;
  className?: string;
}

export const CopyResult: React.FC<CopyResultProps> = ({
  result,
  label = 'کپی نتیجه',
  className,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = result;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={cn("gap-2", className)}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-green-600">کپی شد!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label}
        </>
      )}
    </Button>
  );
};

// Keyboard shortcut hint
interface ShortcutHintProps {
  shortcut: string;
  action: string;
  className?: string;
}

export const ShortcutHint: React.FC<ShortcutHintProps> = ({
  shortcut,
  action,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}>
      <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono">
        {shortcut}
      </kbd>
      <span>{action}</span>
    </div>
  );
};
