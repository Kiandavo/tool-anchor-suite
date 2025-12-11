import React from 'react';
import { Calculator, FileText, Image, Globe, Sparkles, Hash, BookMarked, BookOpen, Calendar, Palette, Dice1 } from 'lucide-react';
import { ToolCategory, categoryLabels } from '@/data/tools';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  selectedCategory: ToolCategory | null;
  onCategorySelect: (category: ToolCategory | null) => void;
  categoryCounts: Record<ToolCategory, number>;
}

const categoryIcons: Record<ToolCategory, React.ComponentType<{ className?: string }>> = {
  calculators: Calculator,
  text: FileText,
  image: Image,
  'persian-cultural': BookMarked,
  readings: Sparkles,
  seo: Globe,
  random: Dice1,
  number: Hash,
  educational: BookOpen,
  productivity: Calendar,
  design: Palette,
};

const categoryColors: Record<ToolCategory, string> = {
  calculators: 'text-blue-600 bg-blue-500/10',
  text: 'text-emerald-600 bg-emerald-500/10',
  image: 'text-purple-600 bg-purple-500/10',
  'persian-cultural': 'text-rose-600 bg-rose-500/10',
  readings: 'text-violet-600 bg-violet-500/10',
  seo: 'text-orange-600 bg-orange-500/10',
  random: 'text-cyan-600 bg-cyan-500/10',
  number: 'text-amber-600 bg-amber-500/10',
  educational: 'text-indigo-600 bg-indigo-500/10',
  productivity: 'text-teal-600 bg-teal-500/10',
  design: 'text-pink-600 bg-pink-500/10',
};

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onCategorySelect,
  categoryCounts,
}) => {
  const categories = Object.keys(categoryLabels) as ToolCategory[];
  const totalCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-20 bg-card rounded-xl border border-border p-4">
        <h2 className="font-bold text-lg mb-4 text-foreground">دسته‌بندی‌ها</h2>
        
        <nav className="space-y-1">
          {/* All tools option */}
          <button
            onClick={() => onCategorySelect(null)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            )}
          >
            <span>همه ابزارها</span>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              selectedCategory === null ? "bg-white/20" : "bg-muted"
            )}>
              {totalCount}
            </span>
          </button>

          {/* Category list */}
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const count = categoryCounts[category] || 0;
            const isSelected = selectedCategory === category;
            
            if (count === 0) return null;

            return (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-md",
                  isSelected ? "bg-white/20" : categoryColors[category]
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="flex-1 text-right font-medium">{categoryLabels[category]}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  isSelected ? "bg-white/20" : "bg-muted text-muted-foreground"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
