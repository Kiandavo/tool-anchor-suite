
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getNewTools, getPopularTools } from '@/data/tools';
import { Sparkles, ChevronLeft, TrendingUp } from 'lucide-react';

export const ToolsSection = () => {
  const newTools = getNewTools();
  const popularTools = getPopularTools();

  return (
    <>
      {/* New Tools */}
      <section className="mb-20 sm:mb-32 animate-slide-up apple-card shadow-apple-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 px-8 sm:px-12 pt-12">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-apple-green to-apple-teal flex items-center justify-center mr-4 shadow-apple">
              <Sparkles size={22} className="text-white" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-apple-dark-gray">ابزارهای جدید</h2>
          </div>
          <Link to="/all-tools" className="text-apple-green flex items-center text-sm font-semibold bg-apple-green/10 py-2 px-4 rounded-full hover:bg-apple-green/20 transition-all duration-200 group mt-3 sm:mt-0 hover-lift">
            مشاهده همه
            <ChevronLeft size={16} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
          </Link>
        </div>
        <div className="px-8 sm:px-12 -mt-4 mb-4">
          <p className="text-apple-gray text-base leading-relaxed">جدیدترین ابزارهای آنلاین رایگان لنگر برای نیازهای روزانه شما.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-8 sm:px-12 pb-12">
          {newTools.map((tool) => (
            <div key={tool.id} className="animate-fade-in">
              <ToolCard tool={tool} highlight />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="mb-20 sm:mb-32 animate-slide-up apple-card shadow-apple-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 px-8 sm:px-12 pt-12">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-apple-blue to-apple-cyan flex items-center justify-center mr-4 shadow-apple">
              <TrendingUp size={22} className="text-white" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-apple-dark-gray">ابزارهای محبوب</h2>
          </div>
          <Link to="/all-tools" className="text-apple-blue flex items-center text-sm font-semibold bg-apple-blue/10 py-2 px-4 rounded-full hover:bg-apple-blue/20 transition-all duration-200 group mt-3 sm:mt-0 hover-lift">
            مشاهده همه
            <ChevronLeft size={16} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
          </Link>
        </div>
        <div className="px-8 sm:px-12 -mt-4 mb-4">
          <p className="text-apple-gray text-base leading-relaxed">محبوب‌ترین ابزارهای آنلاین و پرکاربرد لنگر؛ سریع، امن و رایگان.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-8 sm:px-12 pb-12">
          {popularTools.map((tool) => (
            <div key={tool.id} className="animate-fade-in">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
