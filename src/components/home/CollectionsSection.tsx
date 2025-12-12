import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '@/data/collections';
import { ArrowLeft, Layers } from 'lucide-react';
import { SectionDecorator } from './SectionDecorator';

export const CollectionsSection: React.FC = () => {
  return (
    <section className="relative py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
      
      {/* Decorative pattern */}
      <SectionDecorator variant="grid" position="right" opacity={0.05} />
      
      <div className="container-narrow relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-persian-purple/10">
              <Layers className="w-5 h-5 text-persian-purple" />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              مجموعه‌های ویژه
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/collection/${collection.slug}`}
              className="group relative p-5 bg-gradient-to-br from-card to-secondary/20 hover:from-secondary/40 hover:to-secondary/60 border border-border/50 hover:border-primary/20 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
            >
              {/* Decorative corner accent */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{collection.icon}</span>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {collection.title.replace('ابزارهای ', '').replace('برای ', '')}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 relative z-10">
                {collection.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary opacity-70 group-hover:opacity-100 transition-opacity relative z-10">
                مشاهده ابزارها
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
