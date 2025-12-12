import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ToolZoneProps {
  /** Input fields section */
  children: React.ReactNode;
  /** Primary action button label */
  actionLabel?: string;
  /** Called when action button clicked */
  onAction?: () => void;
  /** Results to display */
  results?: ResultItem[];
  /** Show results section */
  showResults?: boolean;
  /** Called on copy */
  onCopy?: () => void;
  /** Is copied state */
  copied?: boolean;
  /** Called on reset */
  onReset?: () => void;
  /** Disable action button */
  actionDisabled?: boolean;
  /** Custom result component instead of default */
  customResult?: React.ReactNode;
  /** Show action button */
  showActionButton?: boolean;
}

export const ToolZone: React.FC<ToolZoneProps> = ({
  children,
  actionLabel = 'محاسبه',
  onAction,
  results,
  showResults = false,
  onCopy,
  copied = false,
  onReset,
  actionDisabled = false,
  customResult,
  showActionButton = false,
}) => {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-6 space-y-6">
        {/* Input Fields */}
        <div className="space-y-4">
          {children}
        </div>

        {/* Action Button */}
        {showActionButton && onAction && (
          <Button 
            onClick={onAction} 
            disabled={actionDisabled}
            className="w-full"
            size="lg"
          >
            {actionLabel}
          </Button>
        )}

        {/* Results Section */}
        <AnimatePresence>
          {showResults && (customResult || results) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {customResult ? (
                customResult
              ) : results && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
                  {results.map((item, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "flex justify-between items-center",
                        item.highlight && "text-lg font-semibold"
                      )}
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className={cn(
                        "font-medium",
                        item.highlight && "text-primary"
                      )}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Copy & Reset */}
              <div className="flex justify-center gap-3 pt-2">
                {onCopy && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onCopy}
                    className="rounded-full"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 ml-2" />
                    ) : (
                      <Copy className="w-4 h-4 ml-2" />
                    )}
                    کپی نتیجه
                  </Button>
                )}
                {onReset && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onReset}
                    className="rounded-full text-muted-foreground"
                  >
                    <RotateCcw className="w-4 h-4 ml-2" />
                    پاک کردن
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset when no results */}
        {!showResults && onReset && (
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onReset}
              className="rounded-full text-muted-foreground"
            >
              <RotateCcw className="w-4 h-4 ml-2" />
              پاک کردن
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
