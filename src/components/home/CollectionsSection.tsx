import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '@/data/collections';
import { tools } from '@/data/tools';
import { ArrowLeft, Layers } from 'lucide-react';
import { getCollectionTheme } from '@/data/collectionThemes';
import { motion } from 'framer-motion';

export const CollectionsSection: React.FC = () => {
  return (
    <section className="py-8 border-t border-border/50">
      <div className="container-narrow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              مجموعه‌های تخصصی
            </h2>
          </div>
          <Link 
            to="/collections"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            همه مجموعه‌ها
            <ArrowLeft className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.slice(0, 6).map((collection, index) => {
            const theme = getCollectionTheme(collection.slug);
            const toolCount = collection.toolSlugs.filter(
              slug => tools.some(t => t.slug === slug)
            ).length;

            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/collection/${collection.slug}`}
                  className={`group block p-4 rounded-xl border bg-gradient-to-br ${theme.gradient} ${theme.borderColor} ${theme.hoverBorder} transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl ${theme.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{collection.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1 truncate">
                        {collection.title.replace('ابزارهای ', '').replace('برای ', '')}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText}`}>
                          {toolCount} ابزار
                        </span>
                        <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
