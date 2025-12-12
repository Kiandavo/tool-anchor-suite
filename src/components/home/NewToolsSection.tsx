import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getNewTools } from '@/data/tools';

export const NewToolsSection: React.FC = () => {
  const newTools = getNewTools().slice(0, 6);

  if (newTools.length === 0) return null;

  return (
    <section className="py-8 border-t border-border/50">
      <div className="container-narrow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              جدید
            </h2>
          </div>
          <Link 
            to="/all-tools?sort=newest"
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            همه
            <ArrowLeft className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {newTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.slug}`}
              className="group p-3 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors text-center"
            >
              <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {tool.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
