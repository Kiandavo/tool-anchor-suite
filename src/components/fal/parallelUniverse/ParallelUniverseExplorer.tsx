
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw, Copy, BookOpen, Sparkles } from "lucide-react";
import { copyToClipboard } from "@/utils/copyUtils";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParallelUniverse } from './useParallelUniverse';
import { universeCategories } from './universeTypes';

export const ParallelUniverseExplorer = () => {
  const {
    universeCategory,
    universeData,
    isLoading,
    isGenerated,
    setUniverseCategory,
    generateUniverse,
    copyUniverse
  } = useParallelUniverse();

  // Fixed the type issue by creating a handler function that correctly types the value
  const handleCategoryChange = (value: string) => {
    setUniverseCategory(value as any);
  };

  return (
    <Card className="bg-[#e5e0f7] border-[#a99af0] shadow-lg overflow-hidden relative">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-[0.05]"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 60, 
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235a42bb' fill-opacity='0.25'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' transform='scale(1.5)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px',
          }} />
          
          {/* Multiple animated orbs for cosmic effect */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#6e42ca]/5 to-[#a99af0]/10 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 180, ease: "linear", repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute top-1/3 left-2/3 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#a99af0]/5 to-[#6e42ca]/10"
            animate={{ rotate: -180, scale: [1, 1.1, 1] }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          />
        </motion.div>
      </div>
      
      <CardHeader className="bg-gradient-to-r from-[#a99af0] to-[#9179e0] text-center pb-2 py-2 relative border-b border-[#a99af0]">
        <div className="flex items-center justify-center">
          <Globe className="text-[#2a1c64] ml-2" size={16} />
          <h2 className="text-sm font-bold text-[#2a1c64] flex items-center">
            جهان های موازی
            <span className="mr-1.5 inline-block">
              <Sparkles size={12} className="text-[#2a1c64] opacity-70" />
            </span>
          </h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-3 sm:px-4 relative">
        <div className="space-y-4">
          <motion.p 
            className="text-center text-[#2a1c64] text-xs font-medium bg-white/60 p-3 rounded-md border border-[#a99af0]/30 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            در جهان‌های موازی، نسخه‌های متفاوت شما وجود دارند. کشف کنید که در دنیایی دیگر چه کسی هستید؟
          </motion.p>
          
          <div className="w-full">
            <label className="block text-xs text-[#2a1c64] mb-1">جهان را انتخاب کنید</label>
            <Select onValueChange={handleCategoryChange} value={universeCategory}>
              <SelectTrigger className="w-full bg-white/70 border-[#a99af0]">
                <SelectValue placeholder={universeCategories[0].name} />
              </SelectTrigger>
              <SelectContent className="w-full min-w-[var(--radix-select-trigger-width)]">
                {universeCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[10px] text-[#2a1c64]/70 mt-1">
              {universeCategories.find(c => c.id === universeCategory)?.description}
            </p>
          </div>
          
          <div className="relative min-h-[200px] flex items-center justify-center">
            {!isGenerated ? (
              <div className="text-center p-6 bg-white/30 rounded-lg border border-[#a99af0]/30 w-full">
                <p className="text-[#2a1c64] text-sm">برای دیدن نسخه موازی خود دکمه «کشف جهان موازی» را بزنید.</p>
              </div>
            ) : (
              <motion.div 
                className="w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-4 bg-white/40 rounded-lg shadow-md border border-[#a99af0]/30 relative overflow-hidden">
                  {/* Decorative portal frame */}
                  <div className="absolute inset-0 border-8 border-[#6e42ca]/20 rounded-lg z-0 pointer-events-none"></div>
                  <div className="absolute inset-2 border-2 border-[#a99af0]/30 rounded-md z-0 pointer-events-none"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-[#2a1c64] text-sm font-medium mb-2 border-b border-[#a99af0]/20 pb-2">
                      {universeData.title}
                    </h3>
                    
                    <div className="flex flex-col md:flex-row gap-4 py-2">
                      <div className="w-full md:w-1/3">
                        <div className="bg-gradient-to-br from-[#a99af0]/30 to-[#6e42ca]/30 p-3 rounded-lg text-center h-full flex flex-col justify-center">
                          <div className="text-[#2a1c64] font-bold mb-1 text-sm">{universeData.identity}</div>
                          <div className="text-[#2a1c64]/80 text-xs">نقش شما در این جهان</div>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-2/3 space-y-2">
                        <p className="text-xs text-[#2a1c64] leading-6">{universeData.description}</p>
                        
                        <div className="bg-white/40 p-2 rounded border border-[#a99af0]/20">
                          <h4 className="text-[#2a1c64] text-xs font-medium mb-1">ویژگی‌های شما در این جهان:</h4>
                          <ul className="space-y-1">
                            {universeData.traits.map((trait, index) => (
                              <li key={index} className="text-[#2a1c64]/90 text-xs flex items-center">
                                <span className="inline-block w-1 h-1 bg-[#6e42ca] rounded-full ml-2"></span>
                                {trait}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Social connections */}
                    <div className="mt-3 pt-2 border-t border-[#a99af0]/20">
                      <h4 className="text-[#2a1c64] text-xs font-medium mb-2">در این جهان:</h4>
                      <p className="text-xs text-[#2a1c64]/90 italic">
                        {universeData.specialNote}
                      </p>
                    </div>
                    
                    {/* Chance */}
                    <div className="mt-3 bg-[#6e42ca]/10 p-2 rounded text-center">
                      <p className="text-xs text-[#2a1c64]">
                        <span className="font-medium">احتمال وجود این نسخه از شما: </span>
                        {universeData.probability}%
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {isLoading && (
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
                <div className="text-center">
                  <RefreshCw size={24} className="animate-spin mx-auto text-[#6e42ca] mb-2" />
                  <p className="text-sm text-[#2a1c64]">در حال جستجوی جهان‌های موازی...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/40 border-t border-[#a99af0]/20">
        <Button 
          onClick={generateUniverse} 
          disabled={isLoading}
          size="sm" 
          className="bg-[#a99af0] hover:bg-[#9179e0] text-white text-[14px] h-9 px-4 transition-all duration-300 hover:shadow-md relative overflow-hidden group w-full sm:w-auto"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          {isLoading ? 
            <RefreshCw className="animate-spin ml-1" size={16} /> : 
            <Sparkles className="ml-1" size={16} />
          }
          کشف جهان موازی
        </Button>
        
        {isGenerated && (
          <Button 
            variant="outline"
            size="sm"
            onClick={copyUniverse} 
            className="border-[#a99af0] text-[#2a1c64] text-[14px] h-9 px-4 transition-all duration-300 hover:border-[#9179e0] hover:shadow-md relative overflow-hidden group w-full sm:w-auto"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            <Copy size={16} className="ml-1" />
            کپی اطلاعات
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
