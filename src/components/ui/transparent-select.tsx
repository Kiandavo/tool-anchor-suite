import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';

interface TransparentSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function TransparentSelect({
  value,
  onValueChange,
  placeholder,
  children,
  className,
  disabled = false
}: TransparentSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn(
        "bg-white/10 backdrop-blur-md border-white/20 text-foreground shadow-sm",
        "hover:bg-white/15 hover:border-white/30 transition-all duration-200",
        "focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn(
        "bg-white/90 backdrop-blur-lg border-white/30 shadow-xl z-[9999]",
        "max-h-60 overflow-y-auto"
      )}>
        {children}
      </SelectContent>
    </Select>
  );
}

export { SelectItem } from "@/components/ui/select";