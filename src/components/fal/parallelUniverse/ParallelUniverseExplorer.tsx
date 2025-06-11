
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Compass } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { ParallelUniverse } from './types';
import { parallelUniverses, getRandomUniverse } from './universeData';
import { getUniverseTypeColor } from './universeStyleUtils';

// Import components
import UniverseHeader from './components/UniverseHeader';
import DecorativeBackground from './components/DecorativeBackground';
import UniverseContent from './components/UniverseContent';

// Session storage keys
const FAVORITES_KEY = 'parallel_universe_favorites';

export const ParallelUniverseExplorer = () => {
  const [currentUniverse, setCurrentUniverse] = useState<ParallelUniverse | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load saved favorites on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites when they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const discoverRandomUniverse = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const universe = getRandomUniverse();
      setCurrentUniverse(universe);
      setIsLoading(false);
      toast.success(`🌟 جهان "${universe.name}" کشف شد!`);
    }, 1000);
  };

  const handleToggleFavorite = () => {
    if (!currentUniverse) return;
    
    if (favorites.includes(currentUniverse.id)) {
      setFavorites(favorites.filter(id => id !== currentUniverse.id));
      toast.success("💔 از علاقه‌مندی‌ها حذف شد");
    } else {
      setFavorites([...favorites, currentUniverse.id]);
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

  const getFavoriteUniverses = () => {
    return parallelUniverses.filter(u => favorites.includes(u.id));
  };

  const selectFromFavorites = (universe: ParallelUniverse) => {
    setCurrentUniverse(universe);
    setShowFavorites(false);
    toast.success(`💫 به جهان محبوب "${universe.name}" بازگشتید!`);
  };

  return (
    <Card className={`shadow-lg overflow-hidden relative ${currentUniverse ? getUniverseTypeColor(currentUniverse.type) : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'}`}>
      {/* Decorative background */}
      <DecorativeBackground />
      
      {/* Header */}
      <UniverseHeader />
      
      {/* Content */}
      <CardContent className="pt-6 px-6">
        {!currentUniverse && !showFavorites ? (
          // Welcome screen
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌌</div>
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
              
              {favorites.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={() => setShowFavorites(true)}
                  className="border-purple-400 text-purple-700 hover:bg-purple-50"
                >
                  <Heart className="mr-2" size={16} />
                  جهان‌های محبوب من ({favorites.length})
                </Button>
              )}
            </div>
          </div>
        ) : showFavorites ? (
          // Favorites screen
          <div className="py-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Heart className="mr-2 text-red-500" size={20} />
                جهان‌های محبوب شما
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFavorites(false)}
              >
                <Compass className="mr-1" size={14} />
                بازگشت
              </Button>
            </div>
            
            {getFavoriteUniverses().length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💔</div>
                <p className="text-gray-600">هنوز جهان محبوبی ندارید!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getFavoriteUniverses().map((universe) => (
                  <Card 
                    key={universe.id}
                    className={`cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${getUniverseTypeColor(universe.type)} border-2 hover:border-purple-400`}
                    onClick={() => selectFromFavorites(universe)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-2">{universe.name}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {universe.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Universe display
          <div className="space-y-6">
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
                onClick={handleToggleFavorite}
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
              
              {favorites.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowFavorites(true)}
                  className="border-purple-400 text-purple-700 hover:bg-purple-50"
                >
                  <Heart className="mr-2" size={16} />
                  محبوب‌ها
                </Button>
              )}
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
