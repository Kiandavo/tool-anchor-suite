
import React from 'react';
import { cn } from '@/lib/utils';
import { AppleLoading } from './apple-loading';

interface BeautifulLoadingProps {
  className?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BeautifulLoading({
  className,
  text = "در حال بارگذاری...",
  size = 'md'
}: BeautifulLoadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[200px] p-8", className)}>
      <AppleLoading text={text} />
    </div>
  );
}
