
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '@/data/tools';
import { categoryThemes } from '@/utils/categoryColors';
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
  Calendar,
  Sparkles,
  BookOpen,
  CheckSquare,
  Palette,
  BookMarked,
  Pen,
  User,
  Book,
  FileText,
  Clock,
  Pencil,
  LayoutGrid,
  Globe,
  CalendarDays,
  School,
  PaintBucket,
  Shuffle,
  Star,
  Gift,
  Award,
  Flame
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
  'calculator': Calculator,
  'sparkles': Sparkles,
  'book-open': BookOpen,
  'list-check': CheckSquare,
  'paint-bucket': PaintBucket,
  'pen': Pen,
  'user': User,
  'book': Book,
  'file-text': FileText,
  'clock': Clock,
  'pencil': Pencil,
  'layout-grid': LayoutGrid,
  'globe': Globe,
  'calendar-days': CalendarDays,
  'school': School,
  'shuffle': Shuffle,
  'star': Star,
  'gift': Gift,
  'award': Award,
  'flame': Flame,
  'random': Dice6
};

interface ToolCardProps {
  tool: Tool;
  highlight?: boolean;
  compact?: boolean;
}

export const ToolCard = memo(function ToolCard({ tool, highlight = false, compact = false }: ToolCardProps) {
  const { slug, name, description, isNew, icon, category } = tool;
  const IconComponent = iconMap[icon as keyof typeof iconMap] || TextIcon;
  const theme = categoryThemes[category];

  return (
    <Link to={`/tool/${slug}`} className="block transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-apple-blue/40 rounded-3xl">
      <div
        className={`
          rounded-3xl shadow-sm transition-all duration-300 backdrop-blur-sm will-change-transform
          border border-white/20 hover:shadow-lg hover:scale-[1.02]
          ${compact ? 'py-4' : 'p-6'}
          ${theme.gradient}
        `}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 
            bg-white/70 backdrop-blur-sm shadow-sm border border-white/40">
            <IconComponent className={theme.iconColor} size={22} />
          </div>
          {isNew && (
            <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${theme.badgeClass} backdrop-blur-sm shadow-sm`}>
              جدید
            </span>
          )}
        </div>
        <div className={`${compact ? 'space-y-1' : 'mb-2'}`}>
          <h3 className={`font-medium text-gray-800 line-clamp-1 ${compact ? 'text-base' : 'text-lg'}`}>{name}</h3>
          {!compact && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
});
