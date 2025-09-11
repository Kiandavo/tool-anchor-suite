import React from 'react';
import { TrendingUp, Flame } from 'lucide-react';

interface PopularBadgeProps {
  type: 'popular' | 'trending';
  className?: string;
}

export const PopularBadge: React.FC<PopularBadgeProps> = ({
  type,
  className = ""
}) => {
  const isTrending = type === 'trending';
  
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
      isTrending 
        ? 'bg-orange-100 text-orange-700 border border-orange-200 animate-pulse-subtle' 
        : 'bg-blue-100 text-blue-700 border border-blue-200'
    } ${className}`}>
      {isTrending ? <Flame className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
      <span>{isTrending ? 'ترند' : 'محبوب'}</span>
    </div>
  );
};