
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getProfessionalTools } from '@/data/tools';
import { Settings, ChevronLeft } from 'lucide-react';

export const ProfessionalToolsSection = () => {
  const professionalTools = getProfessionalTools();

  return (
    <section className="mb-16 sm:mb-24 animate-slide-up rounded-3xl border border-blue-200/30 neo-glass shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 px-6 sm:px-10 pt-10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 shadow-sm">
            <Settings size={20} className="text-white" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800">ابزارهای تخصصی و کاربردی</h2>
        </div>
        <Link to="/all-tools" className="text-blue-600 flex items-center text-sm font-medium bg-blue-50 py-1.5 px-3 rounded-full hover:bg-blue-100/70 transition-colors group mt-2 sm:mt-0">
          مشاهده همه
          <ChevronLeft size={18} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
        </Link>
      </div>
      
      <div className="px-6 sm:px-10 pb-6">
        <p className="text-gray-700 leading-relaxed max-w-3xl mb-6 bg-white/60 p-4 rounded-xl border border-gray-200/50 shadow-sm">
          مجموعه کاملی از ابزارهای حرفه‌ای برای نیازهای روزانه شما شامل ماشین‌حساب‌های تخصصی، 
          ابزارهای پردازش متن، ویرایش تصویر و بهینه‌سازی وب‌سایت. این ابزارها برای افزایش بهره‌وری 
          و انجام سریع کارهای تخصصی طراحی شده‌اند.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-6 sm:px-10 pb-10">
        {professionalTools.map((tool) => (
          <div key={tool.id} className="animate-fade-in">
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </section>
  );
};
