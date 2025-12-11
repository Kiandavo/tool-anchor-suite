import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getProfessionalTools } from '@/data/tools';
import { Settings, ChevronLeft, Filter, Grid, List, Briefcase } from 'lucide-react';

const categories = [
  { id: 'all', label: 'همه', icon: Grid },
  { id: 'calculator', label: 'ماشین‌حساب', icon: Settings },
  { id: 'text', label: 'متن', icon: List },
  { id: 'image', label: 'تصویر', icon: Grid },
];

export const ModernProfessionalToolsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const professionalTools = getProfessionalTools();
  
  const filteredTools = selectedCategory === 'all' 
    ? professionalTools 
    : professionalTools.filter(tool => tool.category === selectedCategory);

  return (
    <section className="mb-20 sm:mb-32 animate-slide-up">
      <div className="relative">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-indigo-500/[0.02] rounded-3xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-400/[0.04] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-indigo-400/[0.03] to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-xl">
          
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 p-8 border-b border-border/30">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Briefcase size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">ابزارهای تخصصی و کاربردی</h2>
                  <p className="text-muted-foreground">ابزارهای حرفه‌ای برای افزایش بهره‌وری</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                  <Filter size={16} />
                  <span className="text-sm font-medium">{filteredTools.length} ابزار</span>
                </div>
                <Link 
                  to="/all-tools?category=professional" 
                  className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
                >
                  مشاهده همه
                  <ChevronLeft size={16} />
                </Link>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200/50'
                    }`}
                  >
                    <Icon size={16} />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="p-8 border-b border-border/20">
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 rounded-xl p-6 border border-blue-100/50">
              <p className="text-foreground/80 leading-relaxed text-center max-w-4xl mx-auto">
                مجموعه کاملی از ابزارهای حرفه‌ای شامل ماشین‌حساب‌های تخصصی، ابزارهای پردازش متن، 
                ویرایش تصویر و بهینه‌سازی وب‌سایت. این ابزارها برای افزایش بهره‌وری و انجام سریع 
                کارهای تخصصی با دقت و کیفیت بالا طراحی شده‌اند.
              </p>
            </div>
          </div>
          
          {/* Tools Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.slice(0, 8).map((tool, index) => (
                <div 
                  key={tool.id} 
                  className="animate-fade-in hover-lift"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>

            {filteredTools.length > 8 && (
              <div className="mt-8 text-center">
                <Link 
                  to={`/all-tools?category=professional${selectedCategory !== 'all' ? `&filter=${selectedCategory}` : ''}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-8 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  مشاهده {filteredTools.length - 8} ابزار بیشتر
                  <ChevronLeft size={16} className="group-hover:translate-x-[-2px] transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};