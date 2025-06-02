
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '@/data/tools';
import { Star, Sparkles } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  highlight?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, highlight = false }) => {
  // Enhanced null checking and fallbacks
  if (!tool) {
    console.warn('ToolCard: Tool is null or undefined');
    return null;
  }

  if (!tool.slug) {
    console.warn('ToolCard: Tool missing slug:', tool);
    return null;
  }

  // Ensure all required properties have fallbacks
  const safeToolData = {
    id: tool.id || 'unknown',
    name: tool.name || 'ابزار بدون نام',
    description: tool.description || 'توضیحی در دسترس نیست',
    slug: tool.slug,
    isNew: tool.isNew || false,
    isPopular: tool.isPopular || false
  };

  return (
    <Link to={`/tool/${safeToolData.slug}`} className="block">
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
            {safeToolData.isNew && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                جدید
              </span>
            )}
            {safeToolData.isPopular && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                <Sparkles size={12} />
                محبوب
              </span>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-2">{safeToolData.name}</h3>
        <p className="text-sm text-gray-600 flex-1 line-clamp-2">{safeToolData.description}</p>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <span className="text-xs text-blue-600 font-medium">
            مشاهده ابزار ←
          </span>
        </div>
      </div>
    </Link>
  );
};
