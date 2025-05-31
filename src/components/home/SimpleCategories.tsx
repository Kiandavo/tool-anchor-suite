
import React from 'react';

export const SimpleCategories: React.FC = () => {
  const categories = [
    { name: 'ابزارهای متنی', count: 25 },
    { name: 'ماشین‌حساب', count: 20 },
    { name: 'ابزارهای تصویری', count: 15 },
    { name: 'ابزارهای SEO', count: 12 },
    { name: 'فرهنگ ایرانی', count: 18 },
    { name: 'فال و طالع‌بینی', count: 15 },
    { name: 'ابزارهای تصادفی', count: 10 },
    { name: 'بهره‌وری', count: 8 }
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        دسته‌بندی‌ها
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500">
              {category.count} ابزار
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
