
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getToolsByCategory } from '@/data/tools';
import { BookMarked, ChevronLeft } from 'lucide-react';

// Memoize the individual tool card to prevent unnecessary re-renders
const MemoizedToolCard = memo(ToolCard);

export const PersianCulturalSection = () => {
  // Only get the first 4 tools to avoid excessive rendering
  const persianTools = getToolsByCategory('persian-cultural').slice(0, 4);

  return (
    <section className="mb-16 sm:mb-24 animate-slide-up render-offscreen" style={{ animationDelay: '0.3s' }}>
      <div className="rounded-3xl border border-gray-200 neo-glass shadow-sm overflow-hidden backdrop-blur-sm bg-gradient-to-br from-white/90 to-gray-50/80">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 px-6 sm:px-10 pt-10">
          <div className="flex items-center">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center mr-3 shadow-sm backdrop-blur-sm border border-white/30">
              <BookMarked size={22} className="text-white" aria-hidden="true" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">فرهنگ و زبان فارسی</h2>
          </div>
          <Link 
            to="/category/persian-cultural" 
            className="text-violet-700 flex items-center text-sm font-medium bg-white/80 py-1.5 px-4 rounded-full hover:bg-violet-50 transition-all duration-300 mt-2 sm:mt-0 shadow-sm border border-violet-200 backdrop-blur-sm group"
            aria-label="مشاهده همه ابزارهای فرهنگ و زبان فارسی"
          >
            مشاهده همه
            <ChevronLeft size={16} className="mr-1.5 group-hover:translate-x-[-2px] transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Added section description with improved contrast */}
        <div className="px-6 sm:px-10 pb-6">
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-6 bg-white/60 p-4 rounded-xl border border-gray-200/50 shadow-sm">
            مجموعه ابزارهای فرهنگ و زبان فارسی به منظور آشنایی با میراث غنی ایران، شامل ادبیات کهن، ضرب‌المثل‌ها، تقویم شمسی، 
            ریشه‌شناسی واژگان، خط و خوشنویسی، موسیقی، معماری، آشپزی سنتی و جشن‌های باستانی ایجاد شده است. 
            این ابزارها به کاربران کمک می‌کند تا با عناصر هویت‌ساز فرهنگی ایران بیشتر آشنا شوند.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 px-6 sm:px-10 pb-10">
          {persianTools.map((tool, index) => (
            <div 
              key={tool.id} 
              className="animate-fade-in transition-transform hover:-translate-y-1 duration-300" 
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <MemoizedToolCard tool={tool} />
            </div>
          ))}
        </div>
        
        {/* Schema.org content for better SEO */}
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

// Export as memoized component
export default memo(PersianCulturalSection);
