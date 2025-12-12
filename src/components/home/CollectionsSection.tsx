import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '@/data/collections';
import { tools } from '@/data/tools';
import { ArrowLeft, Layers } from 'lucide-react';

export const CollectionsSection: React.FC = () => {
  return (
    <section className="py-8 border-t border-border/50">
      <div className="container-narrow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            مجموعه‌ها
          </h2>
          <Link 
            to="/collections"
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            همه
            <ArrowLeft className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {collections.slice(0, 6).map((collection) => {
            const toolCount = collection.toolSlugs.filter(
              slug => tools.some(t => t.slug === slug)
            ).length;

            return (
              <Link
                key={collection.id}
                to={`/collection/${collection.slug}`}
                className="group flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <span className="text-xl">{collection.icon}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {collection.title.replace('ابزارهای ', '').replace('برای ', '')}
                    </h3>
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full flex-shrink-0">
                      {toolCount}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {collection.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
