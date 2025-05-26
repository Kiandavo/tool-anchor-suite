
import React from 'react';
import { cn } from '@/lib/utils';

interface AppleLoadingProps {
  className?: string;
  text?: string;
  variant?: 'default' | 'fullscreen';
}

export function AppleLoading({
  className,
  text = "در حال بارگذاری...",
  variant = 'default'
}: AppleLoadingProps) {
  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          {/* Apple-style spinner */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          
          {/* Loading text */}
          <p className="text-gray-600 dark:text-gray-300 font-medium text-lg mb-2">{text}</p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1 rtl:space-x-reverse">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className="relative w-12 h-12 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-3 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-3 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">{text}</p>
    </div>
  );
}
