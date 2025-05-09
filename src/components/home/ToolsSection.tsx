
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
      <section className="mb-16 sm:mb-24 animate-slide-up rounded-3xl border border-[#8cc55b]/20 bg-gradient-to-br from-[#F2FCE2] to-[#F7FDF0] shadow-sm" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 px-6 sm:px-10 pt-10">
          <div className="flex items-center">
            <Sparkles size={24} className="text-[#5ca825] ml-3" />
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">ابزارهای جدید</h2>
          </div>
          <Link to="/all-tools" className="text-[#5ca825] flex items-center text-sm font-medium hover:underline group mt-2 sm:mt-0">
            مشاهده همه
            <ChevronLeft size={18} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-6 sm:px-10 pb-10">
          {newTools.map((tool, index) => (
            <div key={tool.id} className="animate-fade-in" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <ToolCard tool={tool} highlight />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="mb-16 sm:mb-24 animate-slide-up rounded-3xl border border-primary/10 bg-gradient-to-br from-[#F1F0FB] to-[#FBFAFF] shadow-sm" style={{ animationDelay: '0.4s' }}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 px-6 sm:px-10 pt-10">
          <div className="flex items-center">
            <TrendingUp size={24} className="text-primary ml-3" />
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">ابزارهای محبوب</h2>
          </div>
          <Link to="/all-tools" className="text-primary flex items-center text-sm font-medium hover:underline group mt-2 sm:mt-0">
            مشاهده همه
            <ChevronLeft size={18} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-6 sm:px-10 pb-10">
          {popularTools.map((tool, index) => (
            <div key={tool.id} className="animate-fade-in" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
