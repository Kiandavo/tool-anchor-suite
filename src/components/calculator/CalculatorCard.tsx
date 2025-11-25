import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalculatorCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onReset?: () => void;
  className?: string;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  icon: Icon,
  children,
  onReset,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={`overflow-hidden ${className}`}>
        <CardHeader className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 backdrop-blur-sm border border-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
            </div>
            {onReset && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="gap-2 hover:bg-primary/10 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">پاک کردن</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};