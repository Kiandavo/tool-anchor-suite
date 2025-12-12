import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRecentTools } from '@/hooks/useRecentTools';
import { cn } from '@/lib/utils';

interface RecentlyUsedSectionProps {
  className?: string;
  maxItems?: number;
}

export const RecentlyUsedSection: React.FC<RecentlyUsedSectionProps> = ({
  className,
  maxItems = 6,
}) => {
  const { recentTools } = useRecentTools();
  
  if (recentTools.length === 0) return null;

  const displayTools = recentTools.slice(0, maxItems);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("mb-8", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="icon-box-sm">
            <Clock className="icon-sm" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">اخیراً استفاده شده</h2>
        </div>
        {recentTools.length > maxItems && (
          <Link 
            to="/all-tools?filter=recent" 
            className="text-sm text-link flex items-center gap-1"
          >
            مشاهده همه
            <ArrowLeft className="icon-sm" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {displayTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              to={`/tool/${tool.slug}`}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="icon-box group-hover:bg-primary/20 transition-colors">
                {tool.icon}
              </div>
              <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                {tool.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
