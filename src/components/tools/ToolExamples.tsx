import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToolExample {
  label: string;
  input: string;
  description?: string;
}

interface ToolExamplesProps {
  examples: ToolExample[];
  onSelectExample: (input: string) => void;
  className?: string;
}

export const ToolExamples: React.FC<ToolExamplesProps> = ({
  examples,
  onSelectExample,
  className,
}) => {
  if (examples.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="w-4 h-4 text-amber-500" />
        <span>امتحان کنید:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {examples.map((example, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectExample(example.input)}
            className="group flex items-center gap-2 px-3 py-2 text-sm bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 rounded-lg transition-all"
            title={example.description || example.input}
          >
            <span className="text-foreground/80 group-hover:text-foreground">
              {example.label}
            </span>
            <ArrowLeft className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
