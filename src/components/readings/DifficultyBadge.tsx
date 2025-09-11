import React from 'react';
import { Clock, Zap } from 'lucide-react';

interface DifficultyBadgeProps {
  difficulty: 'quick' | 'deep';
  estimatedTime?: number;
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  estimatedTime,
  className = ""
}) => {
  const isQuick = difficulty === 'quick';
  
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
      isQuick 
        ? 'bg-green-100 text-green-700 border border-green-200' 
        : 'bg-purple-100 text-purple-700 border border-purple-200'
    } ${className}`}>
      {isQuick ? <Zap className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
      <span>
        {isQuick ? 'سریع' : 'عمیق'}
        {estimatedTime && ` (${estimatedTime} دقیقه)`}
      </span>
    </div>
  );
};