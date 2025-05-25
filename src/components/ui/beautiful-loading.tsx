
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
            "border-3 border-transparent border-t-primary rounded-full",
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Loading text with Persian styling */}
      <motion.p
        className="mt-6 text-gray-600 font-medium text-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {text}
      </motion.p>
      
      {/* Simplified animated dots */}
      <div className="flex space-x-1 rtl:space-x-reverse mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary/60 rounded-full"
            animate={{ 
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
