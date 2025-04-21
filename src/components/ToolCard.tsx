
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
  highlight?: boolean;
}

export function ToolCard({ tool, highlight = false }: ToolCardProps) {
  const { slug, name, description, isNew, icon } = tool;
  const IconComponent = iconMap[icon as keyof typeof iconMap] || TextIcon;

  return (
    <Link to={`/tool/${slug}`} className="block transition-all duration-300">
      <div
        className={
          `rounded-xl p-5 shadow-sm transition-all duration-300 border` +
          ` ${highlight 
            ? "bg-[#F2FCE2] border-[#8cc55b]/20 hover:border-[#8cc55b]/30 hover:shadow-lg"
            : "bg-white border-transparent hover:border-primary/10 hover:shadow-md"
            } group`
        }
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 ${highlight ? "bg-[#8cc55b]/10" : "bg-primary/10"}`}>
            <IconComponent className={`text-primary`} size={22} />
          </div>
          {isNew && (
            <span className={`rounded-full px-3 py-1 text-xs font-bold
              ${highlight
                ? "bg-[#8cc55b]/20 text-[#457a0b]"
                : "bg-primary/10 text-primary"}
            `}>
              جدید
            </span>
          )}
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}
