
import React from 'react';
import { cn } from '@/lib/utils';

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
        <div
          className={cn(
            "rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin",
            sizeClasses[size]
          )}
          style={{
            animation: 'spin 1s linear infinite'
          }}
        />
      </div>
      
      {/* Loading text with Persian styling */}
      <p className="mt-4 text-gray-600 font-medium text-base text-center animate-pulse">
        {text}
      </p>
      
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
