import React from 'react';
import { Link } from 'react-router-dom';
import { getNewTools } from '@/data/tools';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const NewToolsSection = () => {
  const newTools = getNewTools();

  // Don't render if no new tools
  if (newTools.length === 0) return null;

  return (
    <section className="py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1.5 rounded-lg bg-green-500/10">
            <Sparkles className="w-4 h-4 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            ابزارهای جدید
          </h2>
        </div>

        {/* New tools in horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible scrollbar-hide">
          {newTools.slice(0, 8).map((tool) => (
            <Link
              key={tool.slug}
              to={`/tool/${tool.slug}`}
              className="group flex-shrink-0 w-[200px] sm:w-auto flex flex-col p-4 rounded-xl bg-card border border-green-500/30 hover:border-green-500/60 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">
                  جدید
                </span>
                <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground group-hover:text-green-500 transition-colors" />
              </div>
              
              <h3 className="font-semibold text-sm text-foreground group-hover:text-green-600 transition-colors line-clamp-1">
                {tool.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
