import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Search, Share, Download } from "lucide-react";
import { ParallelUniverse } from '../types';
import { parallelUniverses } from '../universeData';
import { getUniverseTypeColor } from '../universeStyleUtils';
import { AppleUniverseHeader } from './AppleUniverseHeader';
import DecorativeBackground from './DecorativeBackground';
import { AppleUniverseContent } from './AppleUniverseContent';
import { AppleUniverseWelcomeScreen } from './AppleUniverseWelcomeScreen';

interface AppleUniverseMainViewProps {
  currentUniverse: ParallelUniverse | null;
  isLoading: boolean;
  favorites: number[];
  onDiscoverUniverse: () => void;
  onToggleFavorite: () => void;
  onCopyDetails: () => void;
  onShowBrowser: () => void;
}

export const AppleUniverseMainView: React.FC<AppleUniverseMainViewProps> = ({
  currentUniverse,
  isLoading,
  favorites,
  onDiscoverUniverse,
  onToggleFavorite,
  onCopyDetails,
  onShowBrowser
}) => {
  return (
    <Card className="shadow-2xl overflow-hidden relative min-h-[700px] transition-all duration-500 bg-white border-gray-200/50">
      <AppleUniverseHeader />
      
      <CardContent className="p-0">
        {!currentUniverse ? (
          <AppleUniverseWelcomeScreen
            onDiscoverUniverse={onDiscoverUniverse}
            onShowBrowser={onShowBrowser}
            isLoading={isLoading}
            favoriteCount={favorites.length}
            totalUniverses={parallelUniverses.length}
          />
        ) : (
          <div className="p-8 space-y-8">
            <AppleUniverseContent 
              universe={currentUniverse}
              hasNewUniverse={true}
            />
            
            {/* Apple-style Action Panel */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 p-8 shadow-2xl">
              <div className="space-y-6">
                {/* Primary Action */}
                <div className="flex justify-center">
                  <Button
                    onClick={onDiscoverUniverse}
                    disabled={isLoading}
                    variant="apple"
                    size="apple-lg"
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group min-w-[280px]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                    {isLoading ? (
                      <>
                        <RefreshCw className="animate-spin mr-3" size={20} />
                        در حال کاوش...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-3" size={20} />
                        کشف جهان جدید
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Secondary Actions */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    variant="apple-outline"
                    size="apple"
                    onClick={onToggleFavorite}
                    disabled={isLoading}
                    className={`font-medium px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 backdrop-blur-md ${
                      favorites.includes(currentUniverse.id) 
                        ? 'bg-red-50/80 border-red-200/50 text-red-700 hover:bg-red-100/80' 
                        : 'bg-white/70 border-gray-200/50 text-gray-700 hover:bg-gray-50/80'
                    }`}
                  >
                    <Heart 
                      className={`mr-2 ${favorites.includes(currentUniverse.id) ? 'fill-red-500 text-red-500' : ''}`} 
                      size={18} 
                    />
                    {favorites.includes(currentUniverse.id) ? 'محبوب است' : 'افزودن به علاقه‌مندی‌ها'}
                  </Button>
                  
                  <Button
                    variant="apple-outline"
                    size="apple"
                    onClick={onCopyDetails}
                    disabled={isLoading}
                    className="bg-white/70 backdrop-blur-md border-gray-200/50 text-gray-700 hover:bg-gray-50/80 font-medium px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Copy className="mr-2" size={18} />
                    کپی اطلاعات
                  </Button>
                  
                  <Button
                    variant="apple-outline"
                    size="apple"
                    onClick={onShowBrowser}
                    disabled={isLoading}
                    className="bg-white/70 backdrop-blur-md border-purple-200/50 text-purple-700 hover:bg-purple-50/80 font-medium px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Search className="mr-2" size={18} />
                    مرور جهان‌ها
                  </Button>
                </div>
              </div>
              
              {/* Apple-style Status Bar */}
              <div className="flex justify-center mt-6 pt-6 border-t border-gray-200/30">
                <div className="flex items-center gap-6 text-sm text-gray-500 font-light">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    {currentUniverse.name}
                  </div>
                  <div className="text-gray-300">•</div>
                  <div>
                    احتمال: {(currentUniverse.probability * 100).toFixed(4)}%
                  </div>
                  <div className="text-gray-300">•</div>
                  <div>
                    {currentUniverse.type}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .group:hover .group-hover\\:animate-shimmer {
          animation: shimmer 0.6s ease-in-out;
        }
      `}</style>
    </Card>
  );
};