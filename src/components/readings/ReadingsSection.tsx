
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
      className="mb-12 space-y-6 animate-fade-in rounded-3xl border border-cyan-300/30 overflow-hidden" 
      style={{ animationDelay: '0.3s' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <EnhancedGradientBackground variant="teal" className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm mr-4 border border-white/30 shadow-lg">
              <Star size={24} className="text-white" />
            </div>
            <h2 className="text-white font-bold text-2xl">
              فال و طالع‌بینی
            </h2>
          </div>
          
          <Button 
            variant="apple-outline" 
            size="apple-sm"
            className="rounded-full flex items-center gap-2 bg-white/20 border-white/40 hover:bg-white/30 hover:border-white/60 text-white backdrop-blur-sm shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <>
                <ChevronUp size={16} />
                <span className="text-sm font-medium">بستن</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                <span className="text-sm font-medium">نمایش همه</span>
              </>
            )}
          </Button>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          {/* Preview cards (always visible) */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            {toolsPreview.map((tool) => {
              const IconComponent = getToolIcon(tool.icon);
              return (
                <Link 
                  key={tool.id}
                  to={`/tool/${tool.slug}`} 
                  className="bg-white/95 hover:bg-white rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] neo-glass relative overflow-hidden group backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-teal-600 mr-4 border border-cyan-400/20 shadow-md">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold text-base">{tool.name}</h3>
                      {tool.isNew && (
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-lg font-medium">جدید</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{tool.description}</p>
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
                className="grid md:grid-cols-4 gap-6"
              >
                {readingsTools.slice(4).map((tool) => {
                  const IconComponent = getToolIcon(tool.icon);
                  return (
                    <Link 
                      key={tool.id}
                      to={`/tool/${tool.slug}`} 
                      className="bg-white/95 hover:bg-white rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] neo-glass relative overflow-hidden group backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-teal-600 mr-4 border border-cyan-400/20 shadow-md">
                          <IconComponent size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-semibold text-base">{tool.name}</h3>
                          {tool.isNew && (
                            <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-lg font-medium">جدید</span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{tool.description}</p>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-cyan-600 p-0 h-auto text-sm font-semibold hover:text-cyan-700"
                      >
                        مشاهده
                        <ChevronRight size={16} className="mr-1 rtl:rotate-180" />
                      </Button>
                    </Link>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="flex justify-center mt-8">
          <Link to="/category/readings">
            <Button 
              variant="apple"
              size="apple-sm"
              className="bg-white text-cyan-700 hover:bg-gray-50 border-none shadow-lg font-semibold px-6 py-3 rounded-2xl"
            >
              نمایش همه ابزارهای فال و طالع‌بینی
              <ChevronRight size={18} className="mr-2 rtl:rotate-180" />
            </Button>
          </Link>
        </div>
      </EnhancedGradientBackground>
    </motion.section>
  );
};

export default ReadingsSection;
