
import React from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { tools, categoryLabels, getToolsByCategory } from '@/data/tools';
import { fallbackTools, fallbackCategoryLabels } from '@/data/fallback-tools';

export const CategoriesSection = () => {
  console.log('CategoriesSection: Component rendering');
  
  // Use actual tools with fallbacks
  const allTools = tools.length > 0 ? tools : fallbackTools;
  const labels = tools.length > 0 ? categoryLabels : fallbackCategoryLabels;
  
  console.log('CategoriesSection: Tools count:', allTools.length);
  
  // Calculate category counts
  const categoryData = Object.entries(labels).map(([category, label]) => {
    const count = tools.length > 0 
      ? getToolsByCategory(category as any).length 
      : allTools.filter(tool => tool.category === category).length;
    
    return {
      category: category as any,
      label,
      count
    };
  }).filter(cat => cat.count > 0); // Only show categories with tools

  console.log('CategoriesSection: Categories with tools:', categoryData.length);

  if (categoryData.length === 0) {
    console.warn('CategoriesSection: No categories available');
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">دسته‌بندی‌ها در حال بارگیری...</h2>
            <p className="text-gray-600">لطفاً چند لحظه صبر کنید</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">دسته‌بندی ابزارها</h2>
          <p className="text-gray-600">
            ابزارها را بر اساس کاربرد دسته‌بندی کرده‌ایم تا سریع‌تر پیدایشان کنید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryData.map(({ category, count }) => (
            <CategoryCard 
              key={category} 
              category={category} 
              count={count}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            مجموعاً {allTools.length} ابزار در {categoryData.length} دسته‌بندی
          </p>
        </div>
      </div>
    </section>
  );
};
