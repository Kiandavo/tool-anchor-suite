import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ToolCardSkeleton: React.FC = () => {
  return (
    <div className="block p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export const ToolCardSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <ToolCardSkeleton key={index} />
      ))}
    </div>
  );
};
