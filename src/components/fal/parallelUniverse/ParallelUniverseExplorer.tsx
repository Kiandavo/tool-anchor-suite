
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Compass, Search } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { ParallelUniverse } from './types';
import { parallelUniverses, getRandomUniverse } from './universeData';
import { getUniverseTypeColor } from './universeStyleUtils';
import { useUniverseStorage } from './hooks/useUniverseStorage';

// Import components
import UniverseHeader from './components/UniverseHeader';
import DecorativeBackground from './components/DecorativeBackground';
import UniverseContent from './components/UniverseContent';
import UniverseBrowser from './components/UniverseBrowser';
import UniverseWelcomeScreen from './components/UniverseWelcomeScreen';

export const ParallelUniverseExplorer = () => {
  const [currentUniverse, setCurrentUniverse] = useState<ParallelUniverse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const { favorites, history, addToHistory, toggleFavorite } = useUniverseStorage();

  console.log('🌌 ParallelUniverseExplorer rendered:', { 
    currentUniverse: currentUniverse?.name, 
    isLoading, 
    showBrowser,
    favoritesCount: favorites.length,
    historyCount: history.length
  });

  const discoverRandomUniverse = () => {
    console.log('🚀 Starting universe discovery...');
    setIsLoading(true);
    
    // Simulate universe generation with realistic delay
    setTimeout(() => {
      try {
        const universe = getRandomUniverse();
        console.log('✨ Universe generated successfully:', universe.name);
        setCurrentUniverse(universe);
        addToHistory(universe.id);
        setIsLoading(false);
        toast.success(`🌟 جهان "${universe.name}" کشف شد!`, {
          duration: 3000,
        });
      } catch (error) {
        console.error('❌ Error generating universe:', error);
        setIsLoading(false);
        toast.error('خطا در کشف جهان موازی');
      }
    }, 2000);
  };

  const selectUniverse = (universe: ParallelUniverse) => {
    console.log('🎯 Universe selected from browser:', universe.name);
    setCurrentUniverse(universe);
    addToHistory(universe.id);
    setShowBrowser(false);
    toast.success(`✨ به جهان "${universe.name}" سفر کردید!`);
  };

  const handleToggleFavorite = (universeId?: number) => {
    const targetId = universeId || currentUniverse?.id;
    console.log('💖 Toggling favorite for universe ID:', targetId);
    
    if (!targetId) {
      console.warn('⚠️ No universe ID provided for favorite toggle');
      toast.error('خطا در افزودن به علاقه‌مندی‌ها');
      return;
    }
    
    const wasAdded = toggleFavorite(targetId);
    console.log('💝 Favorite action completed:', wasAdded ? 'added' : 'removed');
    
    const message = wasAdded ? "💖 به علاقه‌مندی‌ها اضافه شد" : "💔 از علاقه‌مندی‌ها حذف شد";
    toast.success(message);
  };

  const copyUniverseDetails = () => {
    console.log('📋 Copy universe details requested');
    
    if (!currentUniverse) {
      console.warn('⚠️ No universe to copy');
      toast.error('هیچ جهانی برای کپی وجود ندارد');
      return;
    }
    
    const text = `🌌 جهان موازی: ${currentUniverse.name}\n\n${currentUniverse.description}\n\n✨ ویژگی‌ها:\n${currentUniverse.characteristics.map(c => `• ${c}`).join('\n')}\n\n👤 شما در این جهان:\n${currentUniverse.youInThisUniverse}\n\n🎲 احتمال وجود: ${(currentUniverse.probability * 100).toFixed(4)}%`;
    
    copyToClipboard(text);
    console.log('📋 Universe details copied to clipboard');
  };

  const handleShowBrowser = () => {
    console.log('🔍 Opening universe browser');
    setShowBrowser(true);
  };

  const handleHideBrowser = () => {
    console.log('🔙 Closing universe browser');
    setShowBrowser(false);
  };

  // Browser view
  if (showBrowser) {
    return (
      <Card className="shadow-2xl overflow-hidden relative bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 min-h-[600px]">
        <DecorativeBackground />
        <UniverseHeader />
        
        <CardContent className="pt-6 px-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Search className="mr-2 text-purple-600" size={24} />
              مرورگر جهان‌های موازی
            </h3>
            <Button 
              variant="outline" 
              onClick={handleHideBrowser}
              className="border-purple-400 text-purple-700 hover:bg-purple-50 hover:scale-105 transition-all duration-200"
              size="lg"
            >
              <Compass className="mr-2" size={16} />
              بازگشت
            </Button>
          </div>
          
          <UniverseBrowser
            onSelectUniverse={selectUniverse}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            history={history}
          />
        </CardContent>
      </Card>
    );
  }

  // Main view
  return (
    <Card className={`shadow-2xl overflow-hidden relative min-h-[600px] transition-all duration-500 ${currentUniverse ? getUniverseTypeColor(currentUniverse.type) : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200'}`}>
      <DecorativeBackground />
      <UniverseHeader />
      
      <CardContent className="pt-6 px-6">
        {!currentUniverse ? (
          <UniverseWelcomeScreen
            onDiscoverUniverse={discoverRandomUniverse}
            onShowBrowser={handleShowBrowser}
            isLoading={isLoading}
            favoriteCount={favorites.length}
            totalUniverses={parallelUniverses.length}
          />
        ) : (
          <div className="space-y-8 animate-fade-in">
            <UniverseContent 
              universe={currentUniverse}
              hasNewUniverse={true}
            />
            
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button
                onClick={discoverRandomUniverse}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" size={18} />
                    در حال کاوش...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" size={18} />
                    جهان جدید
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleToggleFavorite()}
                size="lg"
                className={`border-2 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  favorites.includes(currentUniverse.id) 
                    ? 'bg-red-50 border-red-400 text-red-700 hover:bg-red-100' 
                    : 'border-red-400 text-red-600 hover:bg-red-50'
                }`}
              >
                <Heart 
                  className={`mr-2 ${favorites.includes(currentUniverse.id) ? 'fill-red-500' : ''}`} 
                  size={18} 
                />
                {favorites.includes(currentUniverse.id) ? 'محبوب است' : 'علاقه‌مندی'}
              </Button>
              
              <Button
                variant="outline"
                onClick={copyUniverseDetails}
                size="lg"
                className="border-2 border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Copy className="mr-2" size={18} />
                کپی
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShowBrowser}
                size="lg"
                className="border-2 border-purple-400 text-purple-700 hover:bg-purple-50 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Search className="mr-2" size={18} />
                مرور جهان‌ها
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
};
