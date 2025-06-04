
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, ChevronUp, Star, Sparkles, BookOpen, Layers, Dice6, Compass, Hash, Eye, Flower, Coins, Moon, Hand, Coffee, TreePine, Palette, User } from "lucide-react";
import { getToolsByCategory } from '@/data/tools';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { EnhancedGradientBackground } from '@/components/ui/enhanced-gradient-background';
import type { LucideProps } from 'lucide-react';

// Icon mapping for tools - Updated type to match Lucide React components
const getToolIcon = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<LucideProps>> = {
    'sparkles': Sparkles,
    'star': Star,
    'book': BookOpen,
    'book-open': BookOpen,
    'compass': Compass,
    'layers': Layers,
    'dice6': Dice6,
    'hash': Hash,
    'mirror': Eye,
    'flower': Flower,
    'coins': Coins,
    'moon': Moon,
    'hand': Hand,
    'coffee-cup': Coffee,
    'tree-pine': TreePine,
    'palette': Palette,
    'user': User
  };
  
  return iconMap[iconName] || Star;
};

export const ReadingsSection = () => {
  const readingsTools = getToolsByCategory("readings");
  const [isOpen, setIsOpen] = useState(false);
  
  const toolsPreview = readingsTools.slice(0, 4); // Show only 4 tools in collapsed state
  
  return (
    <motion.section 
      className="mb-12 space-y-6 animate-fade-in rounded-3xl border border-orange-300/30 overflow-hidden" 
      style={{ animationDelay: '0.3s' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <EnhancedGradientBackground variant="orange" className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Star size={20} className="ml-2 text-white" />
            <h2 className="text-center text-white font-bold text-xl">
              فال و طالع‌بینی
            </h2>
          </div>
          
          <Button 
            variant="apple-outline" 
            size="apple-sm"
            className="rounded-full flex items-center gap-1 bg-white/20 border-white/40 hover:bg-white/30 hover:border-white/60 text-white"
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
            {toolsPreview.map((tool) => {
              const IconComponent = getToolIcon(tool.icon);
              return (
                <Link 
                  key={tool.id}
                  to={`/tool/${tool.slug}`} 
                  className="bg-white/90 hover:bg-white/95 rounded-2xl p-4 border border-white/30 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] neo-glass relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500 mr-3 border border-orange-400/20 shadow-sm">
                      <IconComponent size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-medium text-sm">{tool.name}</h3>
                      {tool.isNew && (
                        <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm">جدید</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs line-clamp-2">{tool.description}</p>
                </Link>
              );
            })}
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
                {readingsTools.slice(4).map((tool) => {
                  const IconComponent = getToolIcon(tool.icon);
                  return (
                    <Link 
                      key={tool.id}
                      to={`/tool/${tool.slug}`} 
                      className="bg-white/90 hover:bg-white/95 rounded-2xl p-4 border border-white/30 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] neo-glass relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500 mr-3 border border-orange-400/20 shadow-sm">
                          <IconComponent size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-medium text-sm">{tool.name}</h3>
                          {tool.isNew && (
                            <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm">جدید</span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{tool.description}</p>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-orange-600 p-0 h-auto text-xs font-medium hover:text-orange-700"
                      >
                        مشاهده
                        <ChevronRight size={14} className="mr-1 rtl:rotate-180" />
                      </Button>
                    </Link>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="flex justify-center mt-6">
          <Link to="/category/readings">
            <Button 
              variant="apple"
              size="apple-sm"
              className="bg-orange-500 hover:bg-orange-600 border-none text-white shadow-md"
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
