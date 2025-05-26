
import React from 'react';
import { AppleLoading } from './apple-loading';

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
  return <AppleLoading className={className} text={text} />;
}
