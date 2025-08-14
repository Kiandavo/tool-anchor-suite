
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
    <section className="mb-20 sm:mb-32 animate-slide-up apple-card shadow-apple-lg p-8 sm:p-12">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-apple-blue/20 to-apple-blue/10 flex items-center justify-center mr-4 shadow-apple-sm">
            <Grid3X3 size={22} className="text-apple-blue" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-apple-dark-gray">
            دسته‌بندی‌ها
          </h2>
        </div>
        
        <Link to="/all-tools" className="text-apple-blue flex items-center text-sm font-semibold hover:underline group bg-apple-blue/10 py-2 px-4 rounded-full hover:bg-apple-blue/20 transition-all duration-200 hover-lift">
          مشاهده همه
          <ChevronLeft size={16} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
        </Link>
      </div>
      
      <div className="mb-8">
        <p className="text-apple-gray text-base leading-relaxed">
          دسته‌بندی‌های متنوع لنگر به شما کمک می‌کند ابزار مناسب را سریع پیدا کنید؛ از محاسبه‌گر و متن تا تصویر، سئو، فرهنگ فارسی و طالع‌بینی.
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
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
