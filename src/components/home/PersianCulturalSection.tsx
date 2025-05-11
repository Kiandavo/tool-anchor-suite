
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getToolsByCategory } from '@/data/tools';
import { BookMarked, ChevronLeft } from 'lucide-react';

export const PersianCulturalSection = () => {
  const persianTools = getToolsByCategory('persian-cultural');

  return (
    <section className="mb-16 sm:mb-24 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="rounded-3xl border border-gray-100 neo-glass shadow-sm overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 px-6 sm:px-10 pt-10">
          <div className="flex items-center">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 flex items-center justify-center mr-3 shadow-sm backdrop-blur-sm border border-white/30">
              <BookMarked size={22} className="text-violet-600" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">فرهنگ و زبان فارسی</h2>
          </div>
          <Link 
            to="/category/persian-cultural" 
            className="text-violet-600 flex items-center text-sm font-medium bg-white/70 py-1.5 px-4 rounded-full hover:bg-violet-50 transition-all duration-300 mt-2 sm:mt-0 shadow-sm border border-violet-100/50 backdrop-blur-sm group"
            aria-label="مشاهده همه ابزارهای فرهنگ و زبان فارسی"
          >
            مشاهده همه
            <ChevronLeft size={16} className="mr-1.5 group-hover:translate-x-[-2px] transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 px-6 sm:px-10 pb-10">
          {persianTools.slice(0, 4).map((tool, index) => (
            <div 
              key={tool.id} 
              className="animate-fade-in transition-transform hover:-translate-y-1 duration-300" 
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
        
        {/* Added schema.org content for better SEO */}
        <div itemScope itemType="https://schema.org/ItemList" style={{display: 'none'}}>
          <meta itemProp="name" content="ابزارهای فرهنگ و زبان فارسی" />
          <meta itemProp="description" content="مجموعه ابزارهای فرهنگ و زبان فارسی شامل آموزش زبان فارسی، تبدیل تاریخ، معانی نام‌های ایرانی و ضرب‌المثل‌های فارسی" />
          {persianTools.map((tool, index) => (
            <div 
              key={`schema-${tool.id}`} 
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={`${index + 1}`} />
              <div itemScope itemType="https://schema.org/Thing">
                <meta itemProp="name" content={tool.name} />
                <meta itemProp="description" content={tool.description} />
                <meta itemProp="url" content={`https://langar.co/tool/${tool.slug}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
