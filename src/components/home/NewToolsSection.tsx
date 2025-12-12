import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getNewTools } from '@/data/tools';

export const NewToolsSection: React.FC = () => {
  const newTools = getNewTools().slice(0, 6);

  if (newTools.length === 0) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              ابزارهای جدید
            </h2>
          </div>
          <Link 
            to="/all-tools?sort=newest"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            مشاهده همه
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {newTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.slug}`}
              className="group relative flex flex-col items-center p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all text-center"
            >
              {/* New badge */}
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">
                جدید
              </span>
              
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {tool.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
