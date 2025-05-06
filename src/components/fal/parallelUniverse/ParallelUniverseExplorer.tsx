
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Globe, Sparkles } from "lucide-react";
import { motion } from 'framer-motion';
import { useParallelUniverse } from './useParallelUniverse';
import { CosmicBackground } from './components/CosmicBackground';
import { UniverseCategorySelector } from './components/UniverseCategorySelector';
import { UniverseDisplay } from './components/UniverseDisplay';
import { UniverseActionButtons } from './components/UniverseActionButtons';

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
      <CosmicBackground />
      
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
          
          <UniverseCategorySelector 
            universeCategory={universeCategory} 
            onCategoryChange={handleCategoryChange}
          />
          
          <UniverseDisplay 
            isGenerated={isGenerated} 
            isLoading={isLoading} 
            universeData={universeData} 
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-4 bg-white/40 border-t border-[#a99af0]/20">
        <UniverseActionButtons 
          isGenerated={isGenerated}
          isLoading={isLoading}
          onGenerateUniverse={generateUniverse}
          onCopyUniverse={copyUniverse}
        />
      </CardFooter>
    </Card>
  );
};
