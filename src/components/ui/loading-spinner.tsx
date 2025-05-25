
import React from 'react';
import { BeautifulLoading } from './beautiful-loading';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function LoadingSpinner({
  size = 'md',
  className,
  text = "در حال بارگذاری..."
}: LoadingSpinnerProps) {
  return <BeautifulLoading size={size} className={className} text={text} />;
}
