import React from 'react';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  variant?: 'card' | 'tool' | 'list' | 'hero';
  count?: number;
  className?: string;
}

export const LoadingSkeleton = ({ 
  variant = 'card', 
  count = 1, 
  className 
}: LoadingSkeletonProps) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className="pt-32 pb-20 sm:pt-40 sm:pb-32 mb-20">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px]">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <Skeleton className="h-16 sm:h-24 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
                <Skeleton className="h-6 w-2/3 max-w-xl mx-auto" />
                <div className="flex justify-center gap-4 mt-12">
                  <Skeleton className="h-12 w-40" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'tool':
        return (
          <div className="glass-effect rounded-3xl p-8 hover-lift">
            <div className="space-y-4">
              <Skeleton className="h-16 w-16 rounded-2xl mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mx-auto" />
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-effect rounded-2xl p-6 space-y-3">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        );

      default: // card
        return (
          <div className="glass-effect rounded-3xl p-8 space-y-4">
            <Skeleton className="h-16 w-16 rounded-2xl mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
        );
    }
  };

  return (
    <div className={cn("animate-pulse", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={count > 1 ? "mb-6" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};