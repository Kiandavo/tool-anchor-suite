
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, ChevronUp, Star, Sparkles } from "lucide-react";
import { getToolsByCategory } from '@/data/tools';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const ReadingsSection = () => {
  const readingsTools = getToolsByCategory("readings");
  const [isOpen, setIsOpen] = useState(false);
  
  const toolsPreview = readingsTools.slice(0, 4); // Show only 4 tools in collapsed state
  
  return (
    <motion.section 
      className="mb-12 space-y-6 animate-fade-in rounded-3xl border border-[#b0c8e6]/30 neo-glass p-8" 
      style={{ animationDelay: '0.3s' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Star size={20} className="ml-2 text-[#b0c8e6]" />
          <h2 className="text-center text-[#143a5c] font-bold text-xl">
            فال و طالع‌بینی
          </h2>
        </div>
        
        <CollapsibleTrigger asChild onClick={() => setIsOpen(!isOpen)}>
          <Button 
            variant="apple-outline" 
            size="apple-sm"
            className="rounded-full flex items-center gap-1"
          >
            {isOpen ? (
              <>
                <ChevronUp size={16} />
                <span className="text-sm">بستن</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                <span className="text-sm">نمایش همه</span>
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <Collapsible open={isOpen}>
        {/* Preview cards (always visible) */}
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          {toolsPreview.map((tool) => (
            <Link 
              key={tool.id}
              to={`/tool/${tool.slug}`} 
              className="bg-white/80 hover:bg-white/90 rounded-2xl p-4 border border-[#b0c8e6]/20 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] neo-glass"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f0f7ff] mr-3 border border-[#b0c8e6]/20">
                  {tool.icon === 'sparkles' && <Sparkles size={20} className="text-[#3a88f5]" />}
                  {tool.icon === 'star' && <Star size={20} className="text-[#3a88f5]" />}
                  {(tool.icon === 'book' || tool.icon === 'book-open' || tool.icon === 'globe') && <Star size={20} className="text-[#3a88f5]" />}
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium text-sm">{tool.name}</h3>
                  {tool.isNew && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-sm">جدید</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Collapsible content */}
        <CollapsibleContent>
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid md:grid-cols-4 gap-4"
            >
              {readingsTools.slice(4).map((tool) => (
                <Link 
                  key={tool.id}
                  to={`/tool/${tool.slug}`} 
                  className="bg-white/80 hover:bg-white/90 rounded-2xl p-4 border border-[#b0c8e6]/20 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] neo-glass"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f0f7ff] mr-3 border border-[#b0c8e6]/20">
                      {tool.icon === 'sparkles' && <Sparkles size={20} className="text-[#3a88f5]" />}
                      {tool.icon === 'star' && <Star size={20} className="text-[#3a88f5]" />}
                      {(tool.icon === 'book' || tool.icon === 'book-open' || tool.icon === 'globe') && <Star size={20} className="text-[#3a88f5]" />}
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
            </motion.div>
          </AnimatePresence>
        </CollapsibleContent>
      </Collapsible>
      
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
    </motion.section>
  );
};

export default ReadingsSection;
