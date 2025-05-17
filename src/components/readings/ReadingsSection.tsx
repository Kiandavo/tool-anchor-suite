
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, ChevronUp, Star, Sparkles, BookOpen, Layers, Dice6, Compass, Hash } from "lucide-react";
import { getToolsByCategory } from '@/data/tools';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { EnhancedGradientBackground } from '@/components/ui/enhanced-gradient-background';

export const ReadingsSection = () => {
  const readingsTools = getToolsByCategory("readings");
  const [isOpen, setIsOpen] = useState(false);
  
  const toolsPreview = readingsTools.slice(0, 4); // Show only 4 tools in collapsed state
  
  return (
    <motion.section 
      className="mb-12 space-y-6 animate-fade-in rounded-3xl border border-[#b0c8e6]/30 overflow-hidden" 
      style={{ animationDelay: '0.3s' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <EnhancedGradientBackground variant="readings" className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Star size={20} className="ml-2 text-[#6e42ca]" />
            <h2 className="text-center text-[#2a1c64] font-bold text-xl">
              فال و طالع‌بینی
            </h2>
          </div>
          
          <Button 
            variant="apple-outline" 
            size="apple-sm"
            className="rounded-full flex items-center gap-1 bg-white/50 border-[#6e42ca]/30 hover:bg-white/70 hover:border-[#6e42ca]/50 text-[#2a1c64]"
            onClick={() => setIsOpen(!isOpen)}
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
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          {/* Preview cards (always visible) */}
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            {toolsPreview.map((tool) => (
              <Link 
                key={tool.id}
                to={`/tool/${tool.slug}`} 
                className="bg-white/80 hover:bg-white/90 rounded-2xl p-4 border border-[#b0c8e6]/20 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] neo-glass relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#f7f0ff] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f0f7ff] mr-3 border border-[#b0c8e6]/20">
                    {tool.icon === 'sparkles' && <Sparkles size={20} className="text-[#6e42ca]" />}
                    {tool.icon === 'star' && <Star size={20} className="text-[#6e42ca]" />}
                    {tool.icon === 'book' && <BookOpen size={20} className="text-[#6e42ca]" />}
                    {tool.icon === 'book-open' && <BookOpen size={20} className="text-[#6e42ca]" />}
                    {tool.icon === 'globe' && <Compass size={20} className="text-[#6e42ca]" />}
                    {tool.icon === 'layers' && <Layers size={20} className="text-[#6e42ca]" />}
                    {tool.icon === 'dice6' && <Dice6 size={20} className="text-[#6e42ca]" />}
                    {tool.icon === 'compass' && <Compass size={20} className="text-[#6e42ca]" />}
                    {tool.icon === 'hash' && <Hash size={20} className="text-[#6e42ca]" />}
                  </div>
                  <div>
                    <h3 className="text-gray-800 font-medium text-sm">{tool.name}</h3>
                    {tool.isNew && (
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-sm">جدید</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-xs line-clamp-2">{tool.description}</p>
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
                    className="bg-white/80 hover:bg-white/90 rounded-2xl p-4 border border-[#b0c8e6]/20 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] neo-glass relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f7f0ff] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f0f7ff] mr-3 border border-[#b0c8e6]/20">
                        {tool.icon === 'sparkles' && <Sparkles size={20} className="text-[#6e42ca]" />}
                        {tool.icon === 'star' && <Star size={20} className="text-[#6e42ca]" />}
                        {tool.icon === 'book' && <BookOpen size={20} className="text-[#6e42ca]" />}
                        {tool.icon === 'book-open' && <BookOpen size={20} className="text-[#6e42ca]" />}
                        {tool.icon === 'globe' && <Compass size={20} className="text-[#6e42ca]" />}
                        {tool.icon === 'layers' && <Layers size={20} className="text-[#6e42ca]" />}
                        {tool.icon === 'dice6' && <Dice6 size={20} className="text-[#6e42ca]" />}
                        {tool.icon === 'compass' && <Compass size={20} className="text-[#6e42ca]" />}
                        {tool.icon === 'hash' && <Hash size={20} className="text-[#6e42ca]" />}
                      </div>
                      <div>
                        <h3 className="text-gray-800 font-medium text-sm">{tool.name}</h3>
                        {tool.isNew && (
                          <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-sm">جدید</span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{tool.description}</p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-[#6e42ca] p-0 h-auto text-xs"
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
        
        <div className="flex justify-center mt-6">
          <Link to="/category/readings">
            <Button 
              variant="apple"
              size="apple-sm"
              className="bg-gradient-to-b from-[#6e42ca] to-[#5835a9] hover:from-[#7e52da] hover:to-[#6845b9] shadow-md"
            >
              نمایش همه ابزارهای فال و طالع‌بینی
              <ChevronRight size={16} className="mr-1 rtl:rotate-180" />
            </Button>
          </Link>
        </div>
      </EnhancedGradientBackground>
    </motion.section>
  );
};

export default ReadingsSection;
