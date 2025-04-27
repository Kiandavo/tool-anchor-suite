
import React from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { ToolCategory, categoryLabels, getToolsByCategory } from '@/data/tools';

export const CategoriesSection = () => {
  // Get counts for each category
  const categories = Object.keys(categoryLabels) as ToolCategory[];
  const categoryCounts = categories.map(category => ({
    category,
    count: getToolsByCategory(category).length
  }));

  return (
    <section className="mb-16 sm:mb-20 animate-slide-up px-2">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-apple-dark-gray dark:text-gray-100 text-center">
        دسته‌بندی‌ها
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
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
