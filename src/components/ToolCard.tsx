
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Image, Wrench, Calendar, Star, Settings, BookMarked, Code, Key, Dice1, Hash, Activity, Percent, Type, Users, Utensils, Gamepad2, Sparkles, BookOpen, Moon, Hand, Coffee, Binary, Filter, SpellCheck, LucideIcon } from 'lucide-react';
import { Tool } from '@/types/tool-types';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
  highlight?: boolean;
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
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, highlight = false }) => {
  const Icon = tool.icon ? (iconMap[tool.icon] || Wrench) : (categoryIconMap[tool.category] || Wrench);

  return (
    <Link 
      to={`/tool/${tool.slug}`}
      className={cn(
        "tool-card group",
        highlight && "border-primary/20 shadow-sm"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Consistent icon container */}
        <div className="icon-box group-hover:bg-primary/20 transition-colors">
          <Icon className="icon-md" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">{tool.name}</h3>
            {tool.isNew && (
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                جدید
              </span>
            )}
            {tool.isComingSoon && (
              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-medium">
                به زودی
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
        </div>
      </div>
    </Link>
  );
};
