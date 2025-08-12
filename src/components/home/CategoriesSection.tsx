
import React from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { ToolCategory, categoryLabels, getToolsByCategory } from '@/data/tools';
import { Grid3X3, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CategoriesSection = () => {
  // Get counts for each category
  const categories = Object.keys(categoryLabels) as ToolCategory[];
  const categoryCounts = categories.map(category => ({
    category,
    count: getToolsByCategory(category).length
  }));

  return (
    <section className="mb-16 sm:mb-24 animate-slide-up px-2">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-apple-blue/20 to-apple-blue/10 flex items-center justify-center mr-3 shadow-sm">
            <Grid3X3 size={20} className="text-apple-blue" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
            دسته‌بندی‌ها
          </h2>
        </div>
        
        <Link to="/all-tools" className="text-apple-blue flex items-center text-sm font-medium hover:underline group bg-apple-blue/5 py-1.5 px-3 rounded-full">
          مشاهده همه
          <ChevronLeft size={18} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
        </Link>
      </div>
      
      <div className="px-2 sm:px-0 mb-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          دسته‌بندی‌های متنوع لنگر به شما کمک می‌کند ابزار مناسب را سریع پیدا کنید؛ از محاسبه‌گر و متن تا تصویر، سئو، فرهنگ فارسی و طالع‌بینی.
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {categoryCounts.map(({ category, count }, index) => (
          <div 
            key={category} 
            className="animate-fade-in" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CategoryCard category={category} count={count} />
          </div>
        ))}
      </div>
    </section>
  );
};
