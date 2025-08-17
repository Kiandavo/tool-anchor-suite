import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

interface PerformanceMetrics {
  renderTime: number;
  itemsCount: number;
  searchTime: number;
  memoryUsage?: number;
}

export const PerformanceMonitor: React.FC<PerformanceMetrics> = ({
  renderTime,
  itemsCount,
  searchTime,
  memoryUsage
}) => {
  const [showMetrics, setShowMetrics] = useState(false);

  // Only show if there are performance gains
  useEffect(() => {
    setShowMetrics(itemsCount > 100 || renderTime > 50);
  }, [itemsCount, renderTime]);

  if (!showMetrics) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2 text-xs">
      <Badge variant="outline" className="text-muted-foreground">
        🚀 رندر: {renderTime.toFixed(0)}ms
      </Badge>
      <Badge variant="outline" className="text-muted-foreground">
        📊 آیتم: {itemsCount.toLocaleString('fa-IR')}
      </Badge>
      <Badge variant="outline" className="text-muted-foreground">
        🔍 جستجو: {searchTime.toFixed(0)}ms
      </Badge>
      {memoryUsage && (
        <Badge variant="outline" className="text-muted-foreground">
          💾 حافظه: {(memoryUsage / 1024 / 1024).toFixed(1)}MB
        </Badge>
      )}
    </div>
  );
};