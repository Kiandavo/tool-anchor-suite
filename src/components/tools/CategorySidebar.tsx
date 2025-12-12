import React from 'react';
import { Calculator, FileText, Image, Globe, Sparkles, Hash, BookMarked, BookOpen, Calendar, Palette, Dice1, LucideIcon } from 'lucide-react';
import { ToolCategory, categoryLabels } from '@/data/tools';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  selectedCategory: ToolCategory | null;
  onCategorySelect: (category: ToolCategory | null) => void;
  categoryCounts: Record<ToolCategory, number>;
}

const categoryIcons: Record<ToolCategory, LucideIcon> = {
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

// Simplified category display names for sidebar
const sidebarLabels: Partial<Record<ToolCategory, string>> = {
  calculators: 'محاسبات',
  text: 'متن و نوشتار',
  image: 'تصویر',
  seo: 'سئو',
  'persian-cultural': 'تاریخ و تقویم',
  readings: 'فال و طالع‌بینی',
  random: 'تصادفی',
  number: 'اعداد',
  educational: 'آموزشی',
  productivity: 'بهره‌وری',
  design: 'طراحی',
};

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onCategorySelect,
  categoryCounts,
}) => {
  const categories = Object.keys(categoryLabels) as ToolCategory[];
  const totalCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  // Sort categories by count (descending)
  const sortedCategories = [...categories]
    .filter(cat => categoryCounts[cat] > 0)
    .sort((a, b) => categoryCounts[b] - categoryCounts[a]);

  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      <div className="sticky top-20 bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h2 className="font-bold text-foreground">دسته‌بندی‌ها</h2>
        </div>
        
        <nav className="py-1">
          {/* All tools option */}
          <button
            onClick={() => onCategorySelect(null)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
              selectedCategory === null
                ? "bg-primary/10 text-primary font-semibold border-r-2 border-primary"
                : "text-foreground hover:bg-muted"
            )}
          >
            <span>همه</span>
            <span className="text-xs text-muted-foreground font-medium tabular-nums">
              {totalCount}
            </span>
          </button>

          {/* Category list with counts */}
          {sortedCategories.map((category) => {
            const count = categoryCounts[category];
            const isSelected = selectedCategory === category;
            const label = sidebarLabels[category] || categoryLabels[category];

            return (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                  isSelected
                    ? "bg-primary/10 text-primary font-semibold border-r-2 border-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <span>{label}</span>
                <span className="text-xs text-muted-foreground font-medium tabular-nums">
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
