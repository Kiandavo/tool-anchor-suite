import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Collection } from '@/data/collections';
import { tools } from '@/data/tools';
import { getCollectionTheme } from '@/data/collectionThemes';

interface CollectionCardProps {
  collection: Collection;
  index: number;
  featured?: boolean;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ 
  collection, 
  index,
  featured = false 
}) => {
  const theme = getCollectionTheme(collection.slug);
  
  // Get actual tools for this collection
  const collectionTools = collection.toolSlugs
    .map(slug => tools.find(t => t.slug === slug))
    .filter(Boolean)
    .slice(0, 4);
  
  const toolCount = collection.toolSlugs.filter(
    slug => tools.some(t => t.slug === slug)
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={featured ? 'sm:col-span-2 lg:col-span-1' : ''}
    >
      <Link
        to={`/collection/${collection.slug}`}
        className={`group block h-full overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg ${theme.borderColor} ${theme.hoverBorder}`}
      >
        {/* Gradient Background */}
        <div className={`relative bg-gradient-to-br ${theme.gradient} p-6`}>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-current opacity-5" />
            <div className="absolute bottom-2 right-8 w-12 h-12 rounded-full bg-current opacity-5" />
          </div>

          {/* Icon */}
          <div className={`relative w-16 h-16 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-4xl">{collection.icon}</span>
          </div>

          {/* Title & Description */}
          <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {collection.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {collection.description}
          </p>

          {/* Tool Previews */}
          <div className="flex flex-wrap gap-2 mb-4">
            {collectionTools.map((tool) => (
              <div 
                key={tool!.slug}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 border border-border/50 text-xs"
              >
                <Wrench className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground truncate max-w-[100px]">
                  {tool!.name}
                </span>
              </div>
            ))}
            {toolCount > 4 && (
              <div className={`px-2.5 py-1 rounded-full text-xs ${theme.badgeBg} ${theme.badgeText}`}>
                +{toolCount - 4} ابزار دیگر
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <span className={`text-sm font-medium ${theme.badgeBg} ${theme.badgeText} px-3 py-1 rounded-full`}>
              {toolCount} ابزار
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
              مشاهده مجموعه
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
