import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface Tool {
  name: string;
  slug: string;
  icon: any;
  color: string;
  category: string;
  description: string;
  popularity?: string;
}

interface LazyToolGridProps {
  tools: Tool[];
  initialDisplayCount?: number;
  loadMoreCount?: number;
  renderTool: (tool: Tool, index: number) => React.ReactNode;
  gridClassName?: string;
  showMoreText?: string;
}

export const LazyToolGrid: React.FC<LazyToolGridProps> = ({
  tools,
  initialDisplayCount = 6,
  loadMoreCount = 6,
  renderTool,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  showMoreText = "نمایش ابزارهای بیشتر"
}) => {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + loadMoreCount, tools.length));
      setIsLoading(false);
    }, 300);
  };

  const displayedTools = tools.slice(0, displayCount);
  const hasMore = displayCount < tools.length;

  return (
    <>
      <div className={gridClassName}>
        {displayedTools.map((tool, index) => renderTool(tool, index))}
      </div>
      
      {hasMore && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            disabled={isLoading}
            variant="outline"
            size="lg"
            className="px-8 py-3 rounded-xl border-2 hover:bg-primary/5 transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                در حال بارگذاری...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {showMoreText}
                <ChevronDown size={16} />
              </div>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            نمایش {displayCount} از {tools.length} ابزار
          </p>
        </div>
      )}
    </>
  );
};