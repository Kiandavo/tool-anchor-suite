import React from 'react';
import { motion } from 'framer-motion';
import { Type, Eye, Zap, RotateCcw } from 'lucide-react';
import { useAccessibility } from '@/hooks/useAccessibility';
import { cn } from '@/lib/utils';

interface AccessibilityPanelProps {
  className?: string;
}

const fontSizeLabels: Record<string, string> = {
  small: 'کوچک',
  normal: 'معمولی',
  large: 'بزرگ',
  'x-large': 'خیلی بزرگ'
};

export const AccessibilityPanel = ({ className }: AccessibilityPanelProps) => {
  const { 
    settings, 
    setFontSize, 
    toggleHighContrast, 
    toggleReducedMotion,
    resetSettings,
    fontSizes 
  } = useAccessibility();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Font Size */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
            <Type className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">اندازه فونت</h4>
            <p className="text-xs text-muted-foreground">تنظیم اندازه متن</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {fontSizes.map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFontSize(size)}
              className={cn(
                "flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all",
                settings.fontSize === size
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              {fontSizeLabels[size]}
            </motion.button>
          ))}
        </div>
      </div>

      {/* High Contrast */}
      <div>
        <button
          onClick={toggleHighContrast}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-right">
              <h4 className="font-medium text-foreground">کنتراست بالا</h4>
              <p className="text-xs text-muted-foreground">افزایش خوانایی متن</p>
            </div>
          </div>
          
          <div className={cn(
            "w-12 h-6 rounded-full transition-colors relative",
            settings.highContrast ? "bg-purple-500" : "bg-muted"
          )}>
            <motion.div
              initial={false}
              animate={{ x: settings.highContrast ? 24 : 0 }}
              className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
            />
          </div>
        </button>
      </div>

      {/* Reduced Motion */}
      <div>
        <button
          onClick={toggleReducedMotion}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500/10 to-yellow-500/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-right">
              <h4 className="font-medium text-foreground">کاهش حرکت</h4>
              <p className="text-xs text-muted-foreground">غیرفعال کردن انیمیشن‌ها</p>
            </div>
          </div>
          
          <div className={cn(
            "w-12 h-6 rounded-full transition-colors relative",
            settings.reducedMotion ? "bg-orange-500" : "bg-muted"
          )}>
            <motion.div
              initial={false}
              animate={{ x: settings.reducedMotion ? 24 : 0 }}
              className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
            />
          </div>
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetSettings}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
      >
        <RotateCcw size={16} />
        <span>بازگشت به تنظیمات پیش‌فرض</span>
      </button>
    </div>
  );
};
