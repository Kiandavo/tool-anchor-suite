import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, X } from 'lucide-react';
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
    <section className="py-6 bg-muted/30">
      <div className="container-narrow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-muted-foreground">
              اخیراً استفاده شده
            </h2>
          </div>
          {showClearButton && (
            <button
              onClick={handleClearRecent}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" />
              پاک کردن
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {displayTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.slug}`}
              className="group p-3 rounded-lg border border-border/50 bg-card hover:border-primary/40 transition-colors"
            >
              <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1 block mb-0.5">
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
