import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Image, Wrench, Calendar, Star, Code, Key, Dice1, Hash, Activity, Percent, Type, Users, Utensils, Gamepad2, Sparkles, BookOpen, Moon, Hand, Coffee, Binary, Filter, SpellCheck, LucideIcon, BookMarked } from 'lucide-react';
import { Tool, ToolCategory } from '@/types/tool-types';
import { categoryLabels } from '@/data/tools';
import { cn } from '@/lib/utils';

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

const categoryColors: Record<ToolCategory, string> = {
  calculators: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
  text: 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20',
  image: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20',
  'persian-cultural': 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20',
  readings: 'bg-violet-500/10 text-violet-600 hover:bg-violet-500/20',
  seo: 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20',
  random: 'bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20',
  number: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20',
  educational: 'bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20',
  productivity: 'bg-teal-500/10 text-teal-600 hover:bg-teal-500/20',
  design: 'bg-pink-500/10 text-pink-600 hover:bg-pink-500/20',
};

export const ToolCardWithTags: React.FC<ToolCardWithTagsProps> = ({ tool, onTagClick }) => {
  const Icon = tool.icon ? (iconMap[tool.icon] || Wrench) : (categoryIconMap[tool.category] || Wrench);
  const categoryLabel = categoryLabels[tool.category as ToolCategory] || tool.category;
  const tagColor = categoryColors[tool.category as ToolCategory] || 'bg-muted text-muted-foreground';

  return (
    <article className="group block p-4 rounded-xl border transition-all duration-200 bg-card text-card-foreground border-border hover:border-primary/30 hover:shadow-lg">
      <Link to={`/tool/${tool.slug}`} className="block">
        <div className="flex items-start gap-3 mb-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
              {tool.isNew && (
                <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-medium">
                  جدید
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
          </div>
        </div>
      </Link>
      
      {/* Tag chip */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
        <button
          onClick={(e) => {
            e.preventDefault();
            onTagClick?.(tool.category as ToolCategory);
          }}
          className={cn(
            "text-xs px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer",
            tagColor
          )}
        >
          {categoryLabel}
        </button>
      </div>
    </article>
  );
};
