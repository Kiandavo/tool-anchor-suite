import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useRecentTools } from '@/hooks/useRecentTools';

interface RecentToolsBannerProps {
  limit?: number;
}

export const RecentToolsBanner: React.FC<RecentToolsBannerProps> = ({ limit = 5 }) => {
  const { recentTools } = useRecentTools();
  const displayTools = recentTools.slice(0, limit);

  if (displayTools.length === 0) return null;

  return (
    <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">
          اخیراً استفاده شده
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {displayTools.map((tool) => (
          <Link
            key={tool.id}
            to={`/tool/${tool.slug}`}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
