
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedLoadingProps {
  className?: string;
  text?: string;
  variant?: 'default' | 'fullscreen' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}

export function EnhancedLoading({
  className,
  text = "در حال بارگذاری...",
  variant = 'default',
  size = 'md'
}: EnhancedLoadingProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          {/* Apple-style sophisticated spinner */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-4 rounded-full border border-blue-300 border-t-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
          </div>
          
          {/* Loading text with Persian support */}
          <h2 className="text-gray-800 dark:text-gray-200 font-medium text-xl mb-4 font-persian">
            {text}
          </h2>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1 rtl:space-x-reverse mb-4">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>

          {/* Loading progress indicator */}
          <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className={cn("border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin", sizeClasses[size])}></div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className={cn("relative mx-auto mb-4", sizeClasses[size])}>
        <div className="absolute inset-0 rounded-full border-3 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-3 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 font-medium text-sm font-persian">
        {text}{dots}
      </p>
    </div>
  );
}
