
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
  Activity 
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
  'hash': Hash
};

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { slug, name, description, isNew, icon } = tool;
  const IconComponent = iconMap[icon as keyof typeof iconMap] || TextIcon;
  
  return (
    <Link to={`/tool/${slug}`}>
      <div className="tool-card">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <IconComponent className="text-primary" size={18} />
          </div>
          
          {isNew && (
            <span className="badge-new">
              جدید
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-2">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
