
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getToolsByCategory } from '@/data/tools';
import { Book, ChevronLeft } from 'lucide-react';

export const PersianCulturalSection = () => {
  const persianTools = getToolsByCategory('persian-cultural');

  return (
    <section className="mb-16 sm:mb-24 animate-slide-up rounded-3xl border border-gray-200/30 neo-glass shadow-sm" style={{ animationDelay: '0.3s' }}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 px-6 sm:px-10 pt-10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500/20 to-gray-600/10 flex items-center justify-center mr-3 shadow-sm">
            <Book size={20} className="text-gray-700" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">فرهنگ و زبان فارسی</h2>
        </div>
        <Link to="/category/persian-cultural" className="text-gray-700 flex items-center text-sm font-medium bg-gray-100 py-1.5 px-3 rounded-full hover:bg-gray-200 transition-colors group mt-2 sm:mt-0">
          مشاهده همه
          <ChevronLeft size={18} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-6 sm:px-10 pb-10">
        {persianTools.slice(0, 4).map((tool, index) => (
          <div key={tool.id} className="animate-fade-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </section>
  );
};
