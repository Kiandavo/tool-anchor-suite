import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { getNewTools } from '@/data/tools';

interface NewToolsBannerProps {
  limit?: number;
}

export const NewToolsBanner: React.FC<NewToolsBannerProps> = ({ limit = 6 }) => {
  const newTools = getNewTools().slice(0, limit);

  if (newTools.length === 0) return null;

  return (
    <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            ابزارهای جدید
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {newTools.map((tool) => (
          <Link
            key={tool.id}
            to={`/tool/${tool.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
