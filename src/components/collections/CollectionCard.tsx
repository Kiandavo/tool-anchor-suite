import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench, Sparkles } from 'lucide-react';
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
      whileHover={{ y: -4 }}
      className={featured ? 'sm:col-span-2 lg:col-span-1' : ''}
    >
      <Link
        to={`/collection/${collection.slug}`}
        className={`group block h-full overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-xl ${theme.borderColor} ${theme.hoverBorder}`}
      >
        {/* Gradient Background */}
        <div className={`relative bg-gradient-to-br ${theme.gradient} p-6`}>
          {/* Animated Decorative Pattern */}
          <div className="absolute inset-0 opacity-30 overflow-hidden">
            <motion.div 
              className="absolute top-4 left-4 w-20 h-20 rounded-full bg-current opacity-5"
              animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-2 right-8 w-12 h-12 rounded-full bg-current opacity-5"
              animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.08, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-current opacity-5"
              animate={{ y: [0, -10, 0], opacity: [0.03, 0.06, 0.03] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          {/* Icon with animation */}
          <motion.div 
            className={`relative w-16 h-16 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-4 shadow-lg`}
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-4xl">{collection.icon}</span>
            {/* Sparkle effect on hover */}
            <motion.div
              className="absolute -top-1 -right-1"
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.div>
          </motion.div>

          {/* Title & Description */}
          <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {collection.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {collection.description}
          </p>

          {/* Tool Previews with stagger animation */}
          <div className="flex flex-wrap gap-2 mb-4">
            {collectionTools.map((tool, i) => (
              <motion.div 
                key={tool!.slug}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 border border-border/50 text-xs group-hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + i * 0.05 }}
              >
                <Wrench className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-muted-foreground truncate max-w-[100px] group-hover:text-foreground transition-colors">
                  {tool!.name}
                </span>
              </motion.div>
            ))}
            {toolCount > 4 && (
              <motion.div 
                className={`px-2.5 py-1 rounded-full text-xs ${theme.badgeBg} ${theme.badgeText} font-medium`}
                whileHover={{ scale: 1.05 }}
              >
                +{toolCount - 4} ابزار دیگر
              </motion.div>
            )}
          </div>

          {/* Footer with animated arrow */}
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <span className={`text-sm font-medium ${theme.badgeBg} ${theme.badgeText} px-3 py-1 rounded-full`}>
              {toolCount} ابزار
            </span>
            <motion.span 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors"
              whileHover={{ x: -4 }}
            >
              مشاهده مجموعه
              <motion.span
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.span>
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
