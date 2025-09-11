import React from 'react';
import { ReadingCategory } from '@/types/tool-types';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Sparkles, Moon, Scroll, Wand2, Hash, Crown } from 'lucide-react';

interface ReadingCategoryFilterProps {
  selectedCategory: ReadingCategory | null;
  onCategoryChange: (category: ReadingCategory | null) => void;
}

const categoryData: Record<ReadingCategory, { label: string; icon: React.ReactNode; color: string }> = {
  poetry: { label: 'شعر و ادب', icon: <BookOpen className="w-4 h-4" />, color: 'from-amber-500 to-orange-500' },
  astrology: { label: 'نجوم', icon: <Star className="w-4 h-4" />, color: 'from-purple-500 to-indigo-500' },
  divination: { label: 'فال‌گیری', icon: <Sparkles className="w-4 h-4" />, color: 'from-pink-500 to-rose-500' },
  dreams: { label: 'خواب و رویا', icon: <Moon className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
  traditional: { label: 'سنتی', icon: <Scroll className="w-4 h-4" />, color: 'from-emerald-500 to-teal-500' },
  modern: { label: 'مدرن', icon: <Wand2 className="w-4 h-4" />, color: 'from-violet-500 to-purple-500' },
  numerology: { label: 'اعداد شناسی', icon: <Hash className="w-4 h-4" />, color: 'from-orange-500 to-red-500' },
  cultural: { label: 'فرهنگی', icon: <Crown className="w-4 h-4" />, color: 'from-yellow-500 to-amber-500' }
};

export const ReadingCategoryFilter: React.FC<ReadingCategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className="text-xs"
      >
        همه دسته‌ها
      </Button>
      {Object.entries(categoryData).map(([key, data]) => {
        const category = key as ReadingCategory;
        const isSelected = selectedCategory === category;
        
        return (
          <Button
            key={category}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={`text-xs gap-1.5 ${isSelected ? `bg-gradient-to-r ${data.color} text-white border-0` : ''}`}
          >
            {data.icon}
            {data.label}
          </Button>
        );
      })}
    </div>
  );
};