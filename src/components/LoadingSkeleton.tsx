import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header skeleton */}
      <div className="h-16 border-b border-border/50 flex items-center justify-between px-4 md:px-8">
        <div className="h-10 w-24 bg-muted/50 rounded-lg animate-pulse" />
        <div className="hidden md:flex gap-4">
          <div className="h-8 w-20 bg-muted/40 rounded-md animate-pulse" />
          <div className="h-8 w-20 bg-muted/40 rounded-md animate-pulse" style={{ animationDelay: '100ms' }} />
          <div className="h-8 w-20 bg-muted/40 rounded-md animate-pulse" style={{ animationDelay: '200ms' }} />
        </div>
        <div className="h-9 w-9 bg-muted/50 rounded-full animate-pulse" />
      </div>

      {/* Hero skeleton */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="h-10 md:h-14 bg-muted/40 rounded-xl mx-auto w-3/4 animate-pulse" />
          <div className="h-6 bg-muted/30 rounded-lg mx-auto w-2/3 animate-pulse" style={{ animationDelay: '100ms' }} />
          
          {/* Search bar skeleton */}
          <div className="h-14 bg-muted/40 rounded-2xl mx-auto w-full max-w-xl mt-8 animate-pulse" style={{ animationDelay: '150ms' }} />
          
          {/* Trust badges skeleton */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="h-8 w-24 bg-muted/30 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="h-8 w-20 bg-muted/30 rounded-full animate-pulse" style={{ animationDelay: '250ms' }} />
            <div className="h-8 w-28 bg-muted/30 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Categories skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-40 bg-muted/40 rounded-lg mb-6 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="h-24 bg-muted/30 rounded-xl animate-pulse"
              style={{ animationDelay: `${350 + i * 50}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Tools grid skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-muted/40 rounded-lg mb-6 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="h-20 bg-muted/30 rounded-xl animate-pulse"
              style={{ animationDelay: `${650 + i * 50}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
