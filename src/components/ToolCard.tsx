
import React, { memo } from 'react';
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

// Map icon strings to Lucide components - moved outside component
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
  compact?: boolean;
}

// Memoized component to prevent unnecessary renders
export const ToolCard = memo(function ToolCard({ tool, highlight = false, compact = false }: ToolCardProps) {
  const { slug, name, description, isNew, icon } = tool;
  const IconComponent = iconMap[icon as keyof typeof iconMap] || TextIcon;

  return (
    <Link to={`/tool/${slug}`} className="block transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-apple-blue/40 rounded-3xl">
      <div
        className={
          `rounded-3xl p-5 shadow-sm transition-all duration-300 border backdrop-blur-sm will-change-transform` +
          ` ${highlight 
            ? "bg-[#F2FCE2]/80 border-[#8cc55b]/20 hover:border-[#8cc55b]/30 hover:shadow-md"
            : "bg-white/80 border-white/10 hover:border-apple-blue/10 hover:shadow-md"
            } group ${compact ? 'py-4' : 'p-6'}`
        }
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 
            ${highlight 
              ? "bg-[#8cc55b]/10" 
              : "bg-gradient-to-br from-apple-blue/15 to-apple-blue/5"}`
            }>
            <IconComponent className={`${highlight ? "text-[#457a0b]" : "text-apple-blue"}`} size={22} />
          </div>
          {isNew && (
            <span className={`rounded-full px-3 py-0.5 text-xs font-medium
              ${highlight
                ? "bg-[#8cc55b]/20 text-[#457a0b]"
                : "bg-apple-blue/10 text-apple-blue"}
            `}>
              جدید
            </span>
          )}
        </div>
        <div className={`${compact ? 'space-y-1' : 'mb-2'}`}>
          <h3 className={`font-medium text-apple-dark-gray line-clamp-1 ${compact ? 'text-base' : 'text-lg'}`}>{name}</h3>
          {!compact && (
            <p className="text-sm text-apple-gray mt-2 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
});
