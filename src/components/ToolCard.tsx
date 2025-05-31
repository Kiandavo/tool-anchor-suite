
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '@/data/tools';
import { Star, Sparkles } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  highlight?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, highlight = false }) => {
  if (!tool || !tool.slug) {
    console.warn('ToolCard: Invalid tool data:', tool);
    return null;
  }

  return (
    <Link to={`/tool/${tool.slug}`} className="block">
      <div className={`
        card-apple-gradient rounded-2xl p-5 h-full flex flex-col
        transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
        ${highlight ? 'ring-2 ring-green-200' : ''}
      `}>
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
            <Star size={20} className="text-white" />
          </div>
          <div className="flex gap-1">
            {tool.isNew && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                جدید
              </span>
            )}
            {tool.isPopular && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                <Sparkles size={12} />
                محبوب
              </span>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-2">{tool.name || 'ابزار بدون نام'}</h3>
        <p className="text-sm text-gray-600 flex-1 line-clamp-2">{tool.description || 'توضیحی در دسترس نیست'}</p>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <span className="text-xs text-blue-600 font-medium">
            مشاهده ابزار ←
          </span>
        </div>
      </div>
    </Link>
  );
};
