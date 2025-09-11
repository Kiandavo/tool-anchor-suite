import React from 'react';
import { Tool } from '@/types/tool-types';
import { Clock, Zap, Star, TrendingUp } from 'lucide-react';

interface ReadingStatsProps {
  tools?: Tool[];
  selectedCategory?: string | null;
}

export const ReadingStats: React.FC<ReadingStatsProps> = ({ tools = [], selectedCategory }) => {
  const quickReadings = tools.filter(tool => tool.difficulty === 'quick').length;
  const deepReadings = tools.filter(tool => tool.difficulty === 'deep').length;
  const newReadings = tools.filter(tool => tool.isNew).length;

  const avgTime = tools.length > 0 ? tools.reduce((acc, tool) => acc + (tool.estimatedTime || 0), 0) / tools.length : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
      <div className="text-center">
        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
          <Zap className="w-4 h-4 text-green-600" />
        </div>
        <div className="text-lg font-bold text-gray-800">{quickReadings}</div>
        <div className="text-xs text-gray-600">سریع</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2">
          <Clock className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-lg font-bold text-gray-800">{deepReadings}</div>
        <div className="text-xs text-gray-600">عمیق</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mx-auto mb-2">
          <Star className="w-4 h-4 text-orange-600" />
        </div>
        <div className="text-lg font-bold text-gray-800">{newReadings}</div>
        <div className="text-xs text-gray-600">جدید</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-lg font-bold text-gray-800">{Math.round(avgTime)}</div>
        <div className="text-xs text-gray-600">دقیقه متوسط</div>
      </div>
    </div>
  );
};