import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, ArrowLeft } from 'lucide-react';

const tips = [
  { id: 1, text: 'برای جستجوی سریع، کلید / یا Ctrl+K را فشار دهید' },
  { id: 2, text: 'با کلیک روی نقاط پایین صفحه، بین بخش‌ها حرکت کنید' },
  { id: 3, text: 'کلید ? را برای دیدن میانبرهای صفحه‌کلید فشار دهید' },
  { id: 4, text: 'ابزارهای محبوب را در دسته‌بندی‌ها پیدا کنید' },
];

export const WelcomeTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [hasSeenTooltip, setHasSeenTooltip] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenWelcomeTooltip');
    if (!seen) {
      // Show tooltip after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenTooltip(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcomeTooltip', 'true');
    setHasSeenTooltip(true);
  };

  const nextTip = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(prev => prev + 1);
    } else {
      handleDismiss();
    }
  };

  if (hasSeenTooltip) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-28 left-1/2 z-50 w-full max-w-sm px-4"
        >
          <div className="relative p-4 rounded-2xl bg-card border border-border shadow-xl">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 left-3 p-1 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-3 pr-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20">
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-1">نکته {currentTip + 1} از {tips.length}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tips[currentTip].text}
                </p>
              </div>
            </div>

            {/* Progress and next */}
            <div className="flex items-center justify-between mt-4">
              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {tips.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index <= currentTip ? 'bg-amber-500' : 'bg-border'
                    }`}
                  />
                ))}
              </div>

              {/* Next button */}
              <button
                onClick={nextTip}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:opacity-90 transition-opacity"
              >
                {currentTip < tips.length - 1 ? 'بعدی' : 'متوجه شدم'}
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
