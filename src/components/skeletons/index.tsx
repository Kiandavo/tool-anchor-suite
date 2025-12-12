import React from 'react';
import { cn } from '@/lib/utils';

// Base skeleton with shimmer effect
export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_1.5s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
      {...props}
    />
  );
};

// Tool card skeleton - compact version
export const ToolCardSkeleton = () => (
  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-card border border-border">
    <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
    <Skeleton className="h-4 w-24" />
  </div>
);

// Tool card skeleton grid
export const ToolCardSkeletonGrid = ({ count = 12 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
    {Array.from({ length: count }).map((_, i) => (
      <ToolCardSkeleton key={i} />
    ))}
  </div>
);

// Category card skeleton
export const CategoryCardSkeleton = () => (
  <div className="flex flex-col p-4 rounded-xl border bg-card">
    <div className="flex items-center gap-2 mb-2">
      <Skeleton className="w-9 h-9 rounded-lg" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-3 w-full" />
  </div>
);

// Category grid skeleton
export const CategoryGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {Array.from({ length: count }).map((_, i) => (
      <CategoryCardSkeleton key={i} />
    ))}
  </div>
);

// Quick actions strip skeleton
export const QuickActionsStripSkeleton = () => (
  <div className="flex gap-2 overflow-hidden">
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton key={i} className="flex-shrink-0 h-8 w-28 rounded-full" />
    ))}
  </div>
);

// Hero section skeleton
export const HeroSkeleton = () => (
  <div className="py-10 sm:py-14">
    <div className="flex flex-col items-center text-center gap-4">
      <Skeleton className="h-8 w-3/4 max-w-lg" />
      <Skeleton className="h-5 w-1/2 max-w-sm" />
      <Skeleton className="h-12 w-full max-w-xl rounded-xl mt-2" />
      <div className="flex gap-3 mt-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

// Content block skeleton
export const ContentBlockSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-4 w-4/5" />
  </div>
);

// Page header skeleton
export const PageHeaderSkeleton = () => (
  <div className="space-y-4 mb-8">
    <Skeleton className="h-10 w-1/2 max-w-xs" />
    <Skeleton className="h-5 w-3/4 max-w-md" />
  </div>
);

// Full page loading skeleton
export const PageLoadingSkeleton = () => (
  <div className="min-h-[60vh] py-8">
    <div className="container-narrow space-y-8">
      <PageHeaderSkeleton />
      <ContentBlockSkeleton />
      <div className="pt-4">
        <Skeleton className="h-6 w-32 mb-4" />
        <ToolCardSkeletonGrid count={8} />
      </div>
    </div>
  </div>
);

// Section skeleton with title
export const SectionSkeleton = ({ 
  title = true, 
  children 
}: { 
  title?: boolean; 
  children: React.ReactNode 
}) => (
  <div className="py-6 sm:py-8">
    <div className="container-narrow">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      )}
      {children}
    </div>
  </div>
);

// Homepage skeleton
export const HomepageSkeleton = () => (
  <div className="animate-in fade-in duration-300">
    <HeroSkeleton />
    <SectionSkeleton title={false}>
      <QuickActionsStripSkeleton />
    </SectionSkeleton>
    <SectionSkeleton title={false}>
      <CategoryGridSkeleton />
    </SectionSkeleton>
    <SectionSkeleton>
      <ToolCardSkeletonGrid />
    </SectionSkeleton>
  </div>
);
