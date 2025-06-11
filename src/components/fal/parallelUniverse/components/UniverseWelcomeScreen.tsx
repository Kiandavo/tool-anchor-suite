
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Search, Heart } from "lucide-react";

interface UniverseWelcomeScreenProps {
  onDiscoverUniverse: () => void;
  onShowBrowser: () => void;
  isLoading: boolean;
  favoriteCount: number;
  totalUniverses: number;
}

export default function UniverseWelcomeScreen({ 
  onDiscoverUniverse, 
  onShowBrowser, 
  isLoading,
  favoriteCount,
  totalUniverses 
}: UniverseWelcomeScreenProps) {
  console.log('UniverseWelcomeScreen rendered:', { isLoading, favoriteCount, totalUniverses });

  const handleDiscoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🎯 Discover button clicked in welcome screen');
    onDiscoverUniverse();
  };

  const handleBrowserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔍 Browser button clicked in welcome screen');
    onShowBrowser();
  };

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4 animate-pulse">🌌</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">به کاوشگر جهان‌های موازی خوش آمدید!</h3>
      <p className="text-gray-600 mb-6">آماده‌اید تا نسخه‌ای متفاوت از خودتان را در جهانی دیگر ببینید؟</p>
      
      <div className="space-y-3">
        <Button 
          onClick={handleDiscoverClick}
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
            onClick={handleBrowserClick}
            disabled={isLoading}
            className="border-purple-400 text-purple-700 hover:bg-purple-50"
          >
            <Search className="mr-2" size={16} />
            مرور جهان‌ها ({totalUniverses})
          </Button>
          
          {favoriteCount > 0 && (
            <Button 
              variant="outline"
              onClick={handleBrowserClick}
              disabled={isLoading}
              className="border-red-400 text-red-700 hover:bg-red-50"
            >
              <Heart className="mr-2" size={16} />
              علاقه‌مندی‌ها ({favoriteCount})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
