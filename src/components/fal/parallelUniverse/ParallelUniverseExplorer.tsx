
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Compass, Search } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
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

  console.log('ParallelUniverseExplorer rendered:', { 
    currentUniverse: currentUniverse?.name, 
    isLoading, 
    showBrowser,
    favoritesCount: favorites.length,
    historyCount: history.length
  });

  const discoverRandomUniverse = () => {
    console.log('discoverRandomUniverse called');
    setIsLoading(true);
    
    setTimeout(() => {
      const universe = getRandomUniverse();
      console.log('Generated universe:', universe);
      setCurrentUniverse(universe);
      addToHistory(universe.id);
      setIsLoading(false);
      toast.success(`🌟 جهان "${universe.name}" کشف شد!`);
    }, 1500);
  };

  const selectUniverse = (universe: ParallelUniverse) => {
    console.log('selectUniverse called with:', universe.name);
    setCurrentUniverse(universe);
    addToHistory(universe.id);
    setShowBrowser(false);
    toast.success(`✨ به جهان "${universe.name}" سفر کردید!`);
  };

  const handleToggleFavorite = (universeId?: number) => {
    const targetId = universeId || currentUniverse?.id;
    console.log('handleToggleFavorite called with:', targetId);
    if (!targetId) return;
    
    const wasAdded = toggleFavorite(targetId);
    toast.success(wasAdded ? "💖 به علاقه‌مندی‌ها اضافه شد" : "💔 از علاقه‌مندی‌ها حذف شد");
  };

  const copyUniverseDetails = () => {
    console.log('copyUniverseDetails called');
    if (currentUniverse) {
      const text = `🌌 جهان موازی: ${currentUniverse.name}\n\n${currentUniverse.description}\n\n✨ ویژگی‌ها:\n${currentUniverse.characteristics.map(c => `• ${c}`).join('\n')}\n\n👤 شما در این جهان:\n${currentUniverse.youInThisUniverse}\n\n🎲 احتمال وجود: ${(currentUniverse.probability * 100).toFixed(4)}%`;
      
      copyToClipboard(text);
      toast.success("📋 اطلاعات جهان کپی شد!");
    }
  };

  const handleShowBrowser = () => {
    console.log('handleShowBrowser called');
    setShowBrowser(true);
  };

  const handleHideBrowser = () => {
    console.log('handleHideBrowser called');
    setShowBrowser(false);
  };

  if (showBrowser) {
    return (
      <Card className="shadow-lg overflow-hidden relative bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <DecorativeBackground />
        <UniverseHeader />
        
        <CardContent className="pt-6 px-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Search className="mr-2 text-purple-600" size={20} />
              مرورگر جهان‌های موازی
            </h3>
            <Button 
              variant="outline" 
              onClick={handleHideBrowser}
              className="border-purple-400 text-purple-700 hover:bg-purple-50"
            >
              <Compass className="mr-1" size={14} />
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

  return (
    <Card className={`shadow-lg overflow-hidden relative ${currentUniverse ? getUniverseTypeColor(currentUniverse.type) : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'}`}>
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
          <div className="space-y-6 universe-appear">
            <UniverseContent 
              universe={currentUniverse}
              hasNewUniverse={true}
            />
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={discoverRandomUniverse}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {isLoading ? (
                  <RefreshCw className="animate-spin mr-2" size={16} />
                ) : (
                  <Sparkles className="mr-2" size={16} />
                )}
                {isLoading ? 'در حال کاوش...' : 'جهان جدید'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleToggleFavorite()}
                className={`border-red-400 ${favorites.includes(currentUniverse.id) ? 'bg-red-50 text-red-700' : 'text-red-600 hover:bg-red-50'}`}
              >
                <Heart 
                  className={`mr-2 ${favorites.includes(currentUniverse.id) ? 'fill-red-500' : ''}`} 
                  size={16} 
                />
                {favorites.includes(currentUniverse.id) ? 'محبوب است' : 'علاقه‌مندی'}
              </Button>
              
              <Button
                variant="outline"
                onClick={copyUniverseDetails}
                className="border-gray-400 text-gray-700 hover:bg-gray-50"
              >
                <Copy className="mr-2" size={16} />
                کپی
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShowBrowser}
                className="border-purple-400 text-purple-700 hover:bg-purple-50"
              >
                <Search className="mr-2" size={16} />
                مرور جهان‌ها
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <style>{`
        .universe-appear {
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </Card>
  );
};
