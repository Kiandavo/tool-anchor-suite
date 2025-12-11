import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, X } from 'lucide-react';
import { usePinnedTools } from '@/hooks/usePinnedTools';
import { cn } from '@/lib/utils';

interface QuickLaunchBarProps {
  className?: string;
  compact?: boolean;
}

export const QuickLaunchBar = ({ className, compact = false }: QuickLaunchBarProps) => {
  const { pinnedTools, unpinTool } = usePinnedTools();

  if (pinnedTools.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {!compact && (
        <div className="flex items-center gap-1.5 px-2 text-xs text-muted-foreground">
          <Pin size={12} />
          <span className="hidden xl:inline">سنجاق‌شده:</span>
        </div>
      )}
      
      <AnimatePresence mode="popLayout">
        {pinnedTools.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative group"
          >
            <Link
              to={`/tool/${tool.slug}`}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all",
                "bg-secondary/50 hover:bg-secondary/70 border border-border/30 hover:border-amber-500/30",
                compact && "px-2 py-1"
              )}
              title={tool.name}
            >
              <span className={cn("text-base", compact && "text-sm")}>{tool.icon}</span>
              {!compact && (
                <span className="hidden lg:inline text-foreground/80 truncate max-w-[100px]">
                  {tool.name}
                </span>
              )}
            </Link>
            
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                unpinTool(tool.id);
              }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`حذف ${tool.name} از سنجاق‌شده‌ها`}
            >
              <X size={10} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
