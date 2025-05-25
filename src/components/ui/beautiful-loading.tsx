
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BeautifulLoadingProps {
  className?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BeautifulLoading({
  className,
  text = "در حال بارگذاری...",
  size = 'md'
}: BeautifulLoadingProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[200px] p-8", className)}>
      <div className="relative flex items-center justify-center">
        {/* Single smooth rotating ring */}
        <motion.div
          className={cn(
            "border-2 border-transparent border-t-primary rounded-full",
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Loading text with Persian styling */}
      <motion.p
        className="mt-4 text-gray-600 font-medium text-base text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {text}
      </motion.p>
    </div>
  );
}
