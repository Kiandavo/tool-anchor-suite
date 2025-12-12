import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, X } from 'lucide-react';
import { useRecentTools } from '@/hooks/useRecentTools';
import { categoryLabels } from '@/data/tools';
import { ToolCategory } from '@/types/tool-types';

interface RecentlyUsedSectionProps {
  maxItems?: number;
  showClearButton?: boolean;
}

export const RecentlyUsedSection: React.FC<RecentlyUsedSectionProps> = ({ 
  maxItems = 6,
  showClearButton = false 
}) => {
  const { recentTools } = useRecentTools();
  const displayTools = recentTools.slice(0, maxItems);

  // Don't render if no recent tools
  if (displayTools.length === 0) return null;

  const handleClearRecent = () => {
    try {
      const analyticsData = localStorage.getItem('langar_analytics');
      if (analyticsData) {
        const data = JSON.parse(analyticsData);
        data.recentTools = [];
        localStorage.setItem('langar_analytics', JSON.stringify(data));
        window.location.reload();
      }
    } catch {
      // Ignore errors
    }
  };

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-bold text-foreground">
              ابزارهایی که اخیراً استفاده کرده‌اید
            </h2>
          </div>
          {showClearButton && (
            <button
              onClick={handleClearRecent}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              پاک کردن
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {displayTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.slug}`}
              className="group flex flex-col p-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
            >
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                {tool.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {categoryLabels[tool.category as ToolCategory]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
