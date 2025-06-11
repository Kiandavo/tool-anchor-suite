
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Search, Heart, Compass } from "lucide-react";

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
  console.log('🏠 UniverseWelcomeScreen rendered with props:', { 
    isLoading, 
    favoriteCount, 
    totalUniverses 
  });

  const handleDiscoverClick = () => {
    console.log('🎯 Discover button clicked - calling onDiscoverUniverse');
    onDiscoverUniverse();
  };

  const handleBrowserClick = () => {
    console.log('🔍 Browser button clicked - calling onShowBrowser');
    onShowBrowser();
  };

  return (
    <div className="text-center py-16 px-4">
      {/* Animated cosmic header */}
      <div className="mb-8">
        <div className="text-8xl mb-6 animate-pulse filter drop-shadow-lg">🌌</div>
        <div className="flex justify-center space-x-2 mb-4">
          <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>✨</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '200ms' }}>🪐</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '400ms' }}>⭐</span>
        </div>
      </div>

      {/* Welcome text */}
      <div className="mb-10 max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-4 leading-relaxed">
          به کاوشگر جهان‌های موازی خوش آمدید!
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          آماده‌اید تا نسخه‌ای متفاوت از خودتان را در جهانی دیگر ببینید؟
          <br />
          هر کلیک شما دری به دنیایی جدید و شگفت‌انگیز باز می‌کند.
        </p>
      </div>
      
      {/* Main action button */}
      <div className="space-y-6">
        <div className="flex justify-center">
          <Button 
            onClick={handleDiscoverClick}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[280px]"
            style={{
              background: isLoading 
                ? 'linear-gradient(45deg, #9333ea, #3b82f6, #6366f1)' 
                : undefined,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <>
                <RefreshCw className="animate-spin mr-3" size={24} />
                در حال کاوش جهان‌ها...
              </>
            ) : (
              <>
                <Sparkles className="mr-3" size={24} />
                کشف جهان موازی
              </>
            )}
          </Button>
        </div>
        
        {/* Secondary buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button 
            variant="outline"
            onClick={handleBrowserClick}
            disabled={isLoading}
            size="lg"
            className="border-2 border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-purple-200 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Search className="mr-2" size={18} />
            مرور جهان‌ها ({totalUniverses})
          </Button>
          
          {favoriteCount > 0 && (
            <Button 
              variant="outline"
              onClick={handleBrowserClick}
              disabled={isLoading}
              size="lg"
              className="border-2 border-red-400 text-red-700 hover:bg-red-50 hover:border-red-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-red-200 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Heart className="mr-2" size={18} />
              علاقه‌مندی‌ها ({favoriteCount})
            </Button>
          )}
          
          <Button 
            variant="outline"
            onClick={handleBrowserClick}
            disabled={isLoading}
            size="lg"
            className="border-2 border-blue-400 text-blue-700 hover:bg-blue-50 hover:border-blue-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Compass className="mr-2" size={18} />
            راهنما
          </Button>
        </div>

        {/* Fun stats */}
        <div className="pt-8 text-sm text-gray-500 space-y-2">
          <p>🎲 بیش از {totalUniverses.toLocaleString()} جهان موازی در انتظار کشف شما</p>
          {favoriteCount > 0 && (
            <p>💖 شما {favoriteCount} جهان را در لیست علاقه‌مندی‌هایتان دارید</p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-8px,0);
          }
          70% {
            transform: translate3d(0,-4px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .hover\\:scale-105:hover:not(:disabled) {
          transform: scale(1.05);
        }
        
        .hover\\:scale-110:hover:not(:disabled) {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
