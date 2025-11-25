import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDailyQuote, getRandomQuote, type PoetryQuote } from '@/data/poetry/persianPoetry';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PersianPoetryQuoteProps {
  className?: string;
}

export default function PersianPoetryQuote({ className = '' }: PersianPoetryQuoteProps) {
  const [quote, setQuote] = useState<PoetryQuote>(getDailyQuote());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setQuote(getRandomQuote());
      setIsRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    // Update quote at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setQuote(getDailyQuote());
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_hsl(var(--persian-turquoise))_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_hsl(var(--persian-gold))_0%,_transparent_50%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {/* Ornamental Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-persian-turquoise/40 to-transparent" />
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-persian-gold" />
            <span className="text-sm font-semibold text-muted-foreground">شعر روز</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-persian-turquoise/40 to-transparent" />
        </div>

        {/* Quote Card */}
        <div className="relative">
          {/* Decorative corners */}
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-persian-turquoise/30 rounded-tr-xl" />
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-persian-turquoise/30 rounded-tl-xl" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-persian-gold/30 rounded-br-xl" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-persian-gold/30 rounded-bl-xl" />

          <div className="relative bg-gradient-to-br from-persian-turquoise/10 via-background to-persian-gold/10 border-2 border-persian-turquoise/20 rounded-2xl p-8 backdrop-blur-sm">
            {/* Quote icon decoration */}
            <div className="absolute top-4 right-4 opacity-10">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" className="text-persian-gold">
                <path d="M10 18C10 12.477 14.477 8 20 8V12C16.686 12 14 14.686 14 18V20H18V32H10V18Z" />
                <path d="M24 18C24 12.477 28.477 8 34 8V12C30.686 12 28 14.686 28 18V20H32V32H24V18Z" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Persian text with calligraphy styling */}
                <div className="relative">
                  <p className="text-2xl md:text-3xl leading-loose text-center font-bold text-foreground persian-optimized">
                    {quote.text}
                  </p>
                  
                  {/* Decorative underline */}
                  <div className="flex justify-center mt-4">
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-persian-gold to-transparent rounded-full" />
                  </div>
                </div>

                {/* Poet name with ornament */}
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="w-4 h-4 text-persian-turquoise animate-pulse-subtle" />
                  <p className="text-lg font-semibold bg-gradient-to-l from-persian-turquoise to-persian-gold bg-clip-text text-transparent">
                    {quote.poet}
                  </p>
                  <Sparkles className="w-4 h-4 text-persian-turquoise animate-pulse-subtle" />
                </div>

                {/* English translation (if available) */}
                {quote.translation && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground italic font-serif">
                            {quote.translation}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>English Translation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Refresh button */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleRefresh}
                variant="ghost"
                size="sm"
                disabled={isRefreshing}
                className="text-muted-foreground hover:text-foreground hover:bg-persian-turquoise/10 transition-all"
              >
                <RefreshCw className={`h-4 w-4 ml-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                شعر دیگر
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom ornament */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-persian-turquoise animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-persian-gold animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 rounded-full bg-persian-turquoise animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
