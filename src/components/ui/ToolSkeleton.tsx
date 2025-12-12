import React from 'react';
import { cn } from '@/lib/utils';

interface ToolSkeletonProps {
  className?: string;
}

/**
 * Individual tool page skeleton - shows instantly while tool loads
 */
export const ToolPageSkeleton = ({ title, className }: ToolSkeletonProps & { title?: string }) => {
  return (
    <div className={cn("animate-pulse space-y-6 p-4", className)}>
      {/* Tool info card skeleton */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted flex-shrink-0" />
          <div className="space-y-2 flex-1">
            {title ? (
              <h1 className="text-xl font-bold text-foreground">{title}</h1>
            ) : (
              <div className="h-6 w-48 rounded bg-muted" />
            )}
            <div className="h-4 w-full max-w-md rounded bg-muted" />
          </div>
        </div>
      </div>
      
      {/* Main tool area skeleton */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="h-32 rounded-lg bg-muted" />
        <div className="flex gap-3 justify-center">
          <div className="h-10 w-28 rounded-lg bg-muted" />
          <div className="h-10 w-28 rounded-lg bg-muted" />
        </div>
        <div className="h-24 rounded-lg bg-muted" />
      </div>
    </div>
  );
};

export const ToolCardSkeleton = ({ className }: ToolSkeletonProps) => {
  return (
    <div className={cn("p-4 rounded-xl bg-card border border-border/30 animate-pulse", className)}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-muted shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export const ToolGridSkeleton = ({ count = 6, className }: { count?: number; className?: string }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const SearchResultSkeleton = ({ className }: ToolSkeletonProps) => {
  return (
    <div className={cn("p-4 rounded-xl animate-pulse", className)}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-muted shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-3 bg-muted rounded w-3/4" />
        </div>
        <div className="w-16 h-6 bg-muted rounded-lg" />
      </div>
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6 p-8">
      <div className="h-10 bg-muted rounded w-2/3 mx-auto" />
      <div className="h-6 bg-muted rounded w-1/2 mx-auto" />
      <div className="flex justify-center gap-4 mt-8">
        <div className="h-12 w-32 bg-muted rounded-full" />
        <div className="h-12 w-32 bg-muted rounded-full" />
      </div>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-muted rounded-xl" />
        <div className="h-6 bg-muted rounded w-32" />
      </div>
      <ToolGridSkeleton count={4} />
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 p-4 bg-card rounded-xl border border-border/30">
      <div className="h-5 bg-muted rounded w-1/2" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-4 bg-muted rounded w-full" />
      ))}
    </div>
  );
};
