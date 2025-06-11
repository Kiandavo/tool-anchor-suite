
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Compass, Search } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { ParallelUniverse } from './types';
import { parallelUniverses, getRandomUniverse } from './universeData';
import { getUniverseTypeColor } from './universeStyleUtils';

// Import components
import UniverseHeader from './components/UniverseHeader';
import DecorativeBackground from './components/DecorativeBackground';
import UniverseContent from './components/UniverseContent';
import UniverseBrowser from './components/UniverseBrowser';

// Session storage keys
const FAVORITES_KEY = 'parallel_universe_favorites';
const HISTORY_KEY = 'parallel_universe_history';

export const ParallelUniverseExplorer = () => {
  const [currentUniverse, setCurrentUniverse] = useState<ParallelUniverse | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);

  console.log("ParallelUniverseExplorer mounted", { currentUniverse, favorites, history });

  // Load saved data on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites);
      console.log("Loaded favorites:", parsedFavorites);
    }
    
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setHistory(parsedHistory);
      console.log("Loaded history:", parsedHistory);
    }
  }, []);

  // Save data when they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    console.log("Saved favorites:", favorites);
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    console.log("Saved history:", history);
  }, [history]);

  const discoverRandomUniverse = () => {
    console.log("Starting universe discovery...");
    setIsLoading(true);
    
    setTimeout(() => {
      const universe = getRandomUniverse();
      console.log("Selected universe:", universe);
      setCurrentUniverse(universe);
      
      // Add to history
      if (!history.includes(universe.id)) {
        setHistory(prev => [universe.id, ...prev.slice(0, 9)]); // Keep last 10
      }
      
      setIsLoading(false);
      toast.success(`🌟 جهان "${universe.name}" کشف شد!`);
    }, 1000);
  };

  const selectUniverse = (universe: ParallelUniverse) => {
    console.log("Selecting universe from browser:", universe);
    setCurrentUniverse(universe);
    
    // Add to history
    if (!history.includes(universe.id)) {
      setHistory(prev => [universe.id, ...prev.slice(0, 9)]); // Keep last 10
    }
    
    setShowBrowser(false);
    toast.success(`✨ به جهان "${universe.name}" سفر کردید!`);
  };

  const handleToggleFavorite = (universeId?: number) => {
    const targetId = universeId || currentUniverse?.id;
    if (!targetId) return;
    
    console.log("Toggling favorite for universe:", targetId);
    
    if (favorites.includes(targetId)) {
      setFavorites(favorites.filter(id => id !== targetId));
      toast.success("💔 از علاقه‌مندی‌ها حذف شد");
    } else {
      setFavorites([...favorites, targetId]);
      toast.success("💖 به علاقه‌مندی‌ها اضافه شد");
    }
  };

  const copyUniverseDetails = () => {
    if (currentUniverse) {
      const text = `🌌 جهان موازی: ${currentUniverse.name}\n\n${currentUniverse.description}\n\n✨ ویژگی‌ها:\n${currentUniverse.characteristics.map(c => `• ${c}`).join('\n')}\n\n👤 شما در این جهان:\n${currentUniverse.youInThisUniverse}\n\n🎲 احتمال وجود: ${(currentUniverse.probability * 100).toFixed(4)}%`;
      
      copyToClipboard(text);
      toast.success("📋 اطلاعات جهان کپی شد!");
    }
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
              onClick={() => setShowBrowser(false)}
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
      {/* Decorative background */}
      <DecorativeBackground />
      
      {/* Header */}
      <UniverseHeader />
      
      {/* Content */}
      <CardContent className="pt-6 px-6">
        {!currentUniverse ? (
          // Welcome screen
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-pulse">🌌</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">به کاوشگر جهان‌های موازی خوش آمدید!</h3>
            <p className="text-gray-600 mb-6">آماده‌اید تا نسخه‌ای متفاوت از خودتان را در جهانی دیگر ببینید؟</p>
            
            <div className="space-y-3">
              <Button 
                onClick={discoverRandomUniverse}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    در حال کاوش...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" size={20} />
                    کشف جهان موازی
                  </>
                )}
              </Button>
              
              <div className="flex justify-center gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowBrowser(true)}
                  className="border-purple-400 text-purple-700 hover:bg-purple-50"
                >
                  <Search className="mr-2" size={16} />
                  مرور جهان‌ها ({parallelUniverses.length})
                </Button>
                
                {favorites.length > 0 && (
                  <Button 
                    variant="outline"
                    onClick={() => setShowBrowser(true)}
                    className="border-red-400 text-red-700 hover:bg-red-50"
                  >
                    <Heart className="mr-2" size={16} />
                    علاقه‌مندی‌ها ({favorites.length})
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Universe display
          <div className="space-y-6 universe-appear">
            <UniverseContent 
              universe={currentUniverse}
              hasNewUniverse={true}
            />
            
            {/* Action buttons */}
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
                جهان جدید
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
                onClick={() => setShowBrowser(true)}
                className="border-purple-400 text-purple-700 hover:bg-purple-50"
              >
                <Search className="mr-2" size={16} />
                مرور جهان‌ها
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Animation styles */}
      <style>{`
        .universe-appear {
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Card>
  );
};
