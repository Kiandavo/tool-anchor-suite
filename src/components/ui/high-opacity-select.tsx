
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';

interface HighOpacitySelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}

export function HighOpacitySelect({
  value,
  onValueChange,
  placeholder,
  children,
  className
}: HighOpacitySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("bg-background border-border", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-popover border border-border shadow-lg z-[9999] max-h-60 overflow-y-auto dropdown-content">
        {children}
      </SelectContent>
    </Select>
  );
}
