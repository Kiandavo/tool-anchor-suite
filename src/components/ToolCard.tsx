
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '@/data/tools';
import { 
  TextIcon, 
  Image, 
  Search, 
  Calculator, 
  Hash, 
  Dice6, 
  Percent, 
  Binary, 
  Key, 
  Type, 
  Maximize, 
  Filter, 
  Activity,
  Calendar
} from 'lucide-react';

// Map icon strings to Lucide components
const iconMap = {
  'text-size': TextIcon,
  'image': Image,
  'code': Search,
  'percent': Percent,
  'binary': Binary,
  'key': Key,
  'type': Type,
  'maximize': Maximize,
  'filter': Filter,
  'activity': Activity,
  'dice': Dice6,
  'hash': Hash,
  'calendar': Calendar,
  'calculator': Calculator
};

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { slug, name, description, isNew, icon } = tool;
  const IconComponent = iconMap[icon as keyof typeof iconMap] || TextIcon;
  
  return (
    <Link to={`/tool/${slug}`} className="block transition-all duration-300">
      <div className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary/10 group">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
            <IconComponent className="text-primary" size={22} />
          </div>
          
          {isNew && (
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs">
              جدید
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
