import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-card/95 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-shadow"
          aria-label="بازگشت به بالا"
        >
          {/* Progress ring */}
          <svg className="absolute inset-0 w-11 h-11 sm:w-12 sm:h-12 -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border/50"
            />
            <circle
              cx="50%"
              cy="50%"
              r="18"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 18}`}
              strokeDashoffset={`${2 * Math.PI * 18 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-150"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
