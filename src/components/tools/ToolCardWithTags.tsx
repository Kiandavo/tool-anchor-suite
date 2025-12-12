import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Image, Wrench, Calendar, Star, Code, Key, Dice1, Hash, Activity, Percent, Type, Users, Utensils, Gamepad2, Sparkles, BookOpen, Moon, Hand, Coffee, Binary, Filter, SpellCheck, LucideIcon, BookMarked, ArrowLeft } from 'lucide-react';
import { Tool, ToolCategory } from '@/types/tool-types';
import { categoryLabels } from '@/data/tools';

interface ToolCardWithTagsProps {
  tool: Tool;
  onTagClick?: (category: ToolCategory) => void;
}

// Icon mapping for consistent icon usage
const iconMap: Record<string, LucideIcon> = {
  'calculator': Calculator,
  'file-text': FileText,
  'image': Image,
  'calendar': Calendar,
  'star': Star,
  'code': Code,
  'key': Key,
  'dice': Dice1,
  'hash': Hash,
  'activity': Activity,
  'percent': Percent,
  'type': Type,
  'user': Users,
  'book': BookOpen,
  'book-open': BookOpen,
  'utensils': Utensils,
  'gamepad-2': Gamepad2,
  'sparkles': Sparkles,
  'moon': Moon,
  'hand': Hand,
  'coffee': Coffee,
  'binary': Binary,
  'filter': Filter,
  'spellcheck': SpellCheck,
  'abc': Type,
};

const categoryIconMap: Record<string, LucideIcon> = {
  'calculators': Calculator,
  'text': FileText,
  'image': Image,
  'persian-cultural': BookMarked,
  'readings': Star,
  'seo': Code,
  'random': Dice1,
  'number': Hash,
  'educational': BookOpen,
  'productivity': Calendar,
  'design': Sparkles,
};

export const ToolCardWithTags: React.FC<ToolCardWithTagsProps> = ({ tool, onTagClick }) => {
  const Icon = tool.icon ? (iconMap[tool.icon] || Wrench) : (categoryIconMap[tool.category] || Wrench);
  const categoryLabel = categoryLabels[tool.category as ToolCategory] || tool.category;

  return (
    <article className="tool-card group">
      <Link to={`/tool/${tool.slug}`} className="flex items-center gap-3 flex-1 min-w-0">
        {/* Icon */}
        <div className="icon-box group-hover:bg-primary/20 transition-colors">
          <Icon className="icon-md" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
              {tool.name}
            </h3>
            {tool.isNew && (
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                جدید
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
        </div>

        {/* Arrow */}
        <ArrowLeft className="icon-sm text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </Link>
      
      {/* Tag chip - unified primary color */}
      {onTagClick && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onTagClick(tool.category as ToolCategory);
          }}
          className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors mr-auto"
        >
          {categoryLabel}
        </button>
      )}
    </article>
  );
};
