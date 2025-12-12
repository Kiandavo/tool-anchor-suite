import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '@/data/collections';
import { ArrowLeft, Layers } from 'lucide-react';

export const CollectionsSection: React.FC = () => {
  return (
    <section className="py-8 border-t border-border/50">
      <div className="container-narrow">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            مجموعه‌ها
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collection/${collection.slug}`}
              className="group p-4 bg-card border border-border rounded-lg hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{collection.icon}</span>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {collection.title.replace('ابزارهای ', '').replace('برای ', '')}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {collection.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                مشاهده
                <ArrowLeft className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
