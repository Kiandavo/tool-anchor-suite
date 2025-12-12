import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '@/data/collections';
import { ArrowLeft } from 'lucide-react';

export const CollectionsSection: React.FC = () => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">
          مجموعه‌های ویژه
        </h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {collections.map(collection => (
          <Link
            key={collection.id}
            to={`/collection/${collection.slug}`}
            className="group p-5 bg-secondary/30 hover:bg-secondary/60 border border-border/50 rounded-xl transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{collection.icon}</span>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {collection.title.replace('ابزارهای ', '').replace('برای ', '')}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {collection.description}
            </p>
            <span className="inline-flex items-center gap-1 text-sm text-primary">
              مشاهده ابزارها
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
