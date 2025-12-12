import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, X } from 'lucide-react';
import { useRecentTools } from '@/hooks/useRecentTools';
import { categoryLabels } from '@/data/tools';
import { ToolCategory } from '@/types/tool-types';
import { SectionDecorator } from './SectionDecorator';

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
    <section className="relative py-8 bg-gradient-to-br from-muted/40 via-muted/20 to-transparent overflow-hidden">
      {/* Decorative elements */}
      <SectionDecorator variant="circles" position="left" opacity={0.1} />
      
      {/* Subtle floating orb */}
      <div className="absolute top-4 right-[5%] w-24 h-24 rounded-full bg-gradient-to-br from-persian-turquoise/10 to-transparent blur-2xl animate-float pointer-events-none" />
      
      <div className="container-narrow relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-muted">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              ابزارهایی که اخیراً استفاده کرده‌اید
            </h2>
          </div>
          {showClearButton && (
            <button
              onClick={handleClearRecent}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              پاک کردن
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {displayTools.map((tool, index) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.slug}`}
              className="group flex flex-col p-3 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
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
