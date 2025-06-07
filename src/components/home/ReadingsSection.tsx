
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getReadingsTools } from '@/data/tools';
import { Star, ChevronLeft } from 'lucide-react';

export const ReadingsSection = () => {
  const readingsTools = getReadingsTools();

  return (
    <section className="mb-16 sm:mb-24 animate-slide-up rounded-3xl border border-purple-200/30 neo-glass shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 px-6 sm:px-10 pt-10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3 shadow-sm">
            <Star size={20} className="text-white" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800">فال و طالع‌بینی</h2>
        </div>
        <Link to="/category/readings" className="text-purple-600 flex items-center text-sm font-medium bg-purple-50 py-1.5 px-3 rounded-full hover:bg-purple-100/70 transition-colors group mt-2 sm:mt-0">
          مشاهده همه
          <ChevronLeft size={18} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
        </Link>
      </div>
      
      <div className="px-6 sm:px-10 pb-6">
        <p className="text-gray-700 leading-relaxed max-w-3xl mb-6 bg-white/60 p-4 rounded-xl border border-gray-200/50 shadow-sm">
          دنیای اسرارآمیز فال و طالع‌بینی را با مجموعه کاملی از ابزارهای سنتی و مدرن کشف کنید. 
          از فال حافظ و استخاره با مولانا تا تاروت، طالع‌بینی و تعبیر خواب. هر ابزار پیام‌ها و 
          راهنمایی‌های منحصر به فردی برای مسیر زندگی شما دارد.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-6 sm:px-10 pb-10">
        {readingsTools.map((tool) => (
          <div key={tool.id} className="animate-fade-in">
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </section>
  );
};
