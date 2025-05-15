
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Sparkles } from "lucide-react";
import { getToolsByCategory } from '@/data/tools';

export const ReadingsSection = () => {
  const readingsTools = getToolsByCategory("readings");
  
  return (
    <section className="mb-12 space-y-6 animate-fade-in rounded-3xl border border-[#b0c8e6]/30 neo-glass p-8" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-center mb-6">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#b0c8e6] to-transparent w-1/4"></div>
        <div className="px-4 py-1.5 bg-[#f8faff] rounded-full shadow-sm border border-[#b0c8e6]/20">
          <h2 className="text-center text-[#143a5c] font-bold text-xl flex items-center">
            <Star size={20} className="ml-2 text-[#b0c8e6]" />
            فال و طالع‌بینی
          </h2>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-[#b0c8e6] via-[#b0c8e6] to-transparent w-1/4"></div>
      </div>
      
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {readingsTools.map(tool => (
          <Link 
            key={tool.id}
            to={`/tool/${tool.slug}`} 
            className="bg-white/80 hover:bg-white/90 rounded-2xl p-4 border border-[#b0c8e6]/20 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] neo-glass"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f0f7ff] mr-3 border border-[#b0c8e6]/20">
                {tool.icon === 'sparkles' && <Sparkles size={20} className="text-[#3a88f5]" />}
                {tool.icon === 'star' && <Star size={20} className="text-[#3a88f5]" />}
                {tool.icon === 'book' && <Star size={20} className="text-[#3a88f5]" />}
                {tool.icon === 'book-open' && <Star size={20} className="text-[#3a88f5]" />}
                {tool.icon === 'globe' && <Star size={20} className="text-[#3a88f5]" />}
              </div>
              <div>
                <h3 className="text-gray-800 font-medium text-sm">{tool.name}</h3>
                {tool.isNew && (
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-sm">جدید</span>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-xs mb-3 line-clamp-2">{tool.description}</p>
            <Button 
              variant="link" 
              size="sm" 
              className="text-[#3a88f5] p-0 h-auto text-xs"
            >
              مشاهده
              <ChevronRight size={14} className="mr-1 rtl:rotate-180" />
            </Button>
          </Link>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <Link to="/category/readings">
          <Button 
            variant="apple"
            size="apple-sm"
            className="bg-gradient-to-b from-[#3a88f5] to-[#2b6dd1]"
          >
            نمایش همه ابزارهای فال و طالع‌بینی
            <ChevronRight size={16} className="mr-1 rtl:rotate-180" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ReadingsSection;
