import React from 'react';
import { motion } from 'framer-motion';

interface VisualizationCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const VisualizationCard: React.FC<VisualizationCardProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl bg-gradient-to-br from-card via-card/95 to-muted/30 backdrop-blur-sm border border-border/50 p-6 ${className}`}
    >
      {title && (
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">{title}</h3>
      )}
      {children}
    </motion.div>
  );
};