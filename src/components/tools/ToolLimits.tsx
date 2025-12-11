import React from 'react';
import { Info, FileText, Image, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPersianNumber } from '@/utils/persianNumbers';

export interface ToolLimit {
  type: 'characters' | 'fileSize' | 'format' | 'custom';
  value: string | number;
  label: string;
  unit?: string;
}

interface ToolLimitsProps {
  limits: ToolLimit[];
  className?: string;
}

const limitIcons = {
  characters: Hash,
  fileSize: FileText,
  format: Image,
  custom: Info,
};

export const ToolLimits: React.FC<ToolLimitsProps> = ({ limits, className }) => {
  if (limits.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-3 text-xs text-muted-foreground", className)}>
      <Info className="w-3.5 h-3.5" />
      {limits.map((limit, index) => {
        const Icon = limitIcons[limit.type];
        const displayValue = typeof limit.value === 'number' 
          ? formatPersianNumber(limit.value) 
          : limit.value;
        
        return (
          <span key={index} className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded">
            <Icon className="w-3 h-3" />
            <span>{limit.label}: {displayValue}{limit.unit || ''}</span>
          </span>
        );
      })}
    </div>
  );
};
