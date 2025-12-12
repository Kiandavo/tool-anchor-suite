import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Star } from 'lucide-react';
import { tools } from '@/data/tools';
import { Tool } from '@/types/tool-types';

// Get a deterministic "random" tool based on the date
const getToolOfTheDay = (): Tool => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  
  // Filter out coming soon tools
  const availableTools = tools.filter(t => !t.isComingSoon);
  
  // Use day of year to pick a tool deterministically
  const index = dayOfYear % availableTools.length;
  return availableTools[index];
};

export const ToolOfTheDay = () => {
  const tool = useMemo(() => getToolOfTheDay(), []);

  if (!tool) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 rounded-2xl" />
      
      {/* Decorative Elements */}
      <div className="absolute top-4 left-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 text-primary/30" />
        </motion.div>
      </div>
      
      <div className="relative p-6 rounded-2xl border border-primary/20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-box-lg bg-primary text-primary-foreground">
            <Star className="icon-md fill-current" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">ابزار روز</h3>
            <p className="text-xs text-muted-foreground">پیشنهاد امروز</p>
          </div>
        </div>

        {/* Tool Card */}
        <Link to={`/tool/${tool.slug}`} className="block group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Tool Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                {tool.icon}
              </div>
              
              {/* Tool Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {tool.name}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {tool.description}
                </p>
              </div>
              
              {/* Arrow */}
              <ArrowLeft className="icon-md text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all shrink-0 mt-2" />
            </div>
          </motion.div>
        </Link>

        {/* Tip */}
        <p className="text-xs text-muted-foreground mt-3 text-center">
          هر روز یک ابزار جدید کشف کنید
        </p>
      </div>
    </motion.div>
  );
};
