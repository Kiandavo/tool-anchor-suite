import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Search, Download, Share2 } from "lucide-react";
import { ParallelUniverse } from '../types';
import { parallelUniverses } from '../universeData';
import { getUniverseTypeColor } from '../universeStyleUtils';
import { EnhancedUniverseHeader } from './EnhancedUniverseHeader';
import DecorativeBackground from './DecorativeBackground';
import { EnhancedUniverseContent } from './EnhancedUniverseContent';
import { EnhancedUniverseWelcomeScreen } from './EnhancedUniverseWelcomeScreen';

interface EnhancedUniverseMainViewProps {
  currentUniverse: ParallelUniverse | null;
  isLoading: boolean;
  favorites: number[];
  onDiscoverUniverse: () => void;
  onToggleFavorite: () => void;
  onCopyDetails: () => void;
  onShowBrowser: () => void;
}

export const EnhancedUniverseMainView: React.FC<EnhancedUniverseMainViewProps> = ({
  currentUniverse,
  isLoading,
  favorites,
  onDiscoverUniverse,
  onToggleFavorite,
  onCopyDetails,
  onShowBrowser
}) => {
  return (
    <Card className={`shadow-2xl overflow-hidden relative min-h-[700px] transition-all duration-500 ${
      currentUniverse 
        ? getUniverseTypeColor(currentUniverse.type) 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-indigo-200'
    }`}>
      <DecorativeBackground />
      <EnhancedUniverseHeader />
      
      <CardContent className="pt-6 px-6 pb-8">
        {!currentUniverse ? (
          <EnhancedUniverseWelcomeScreen
            onDiscoverUniverse={onDiscoverUniverse}
            onShowBrowser={onShowBrowser}
            isLoading={isLoading}
            favoriteCount={favorites.length}
            totalUniverses={parallelUniverses.length}
          />
        ) : (
          <div className="space-y-8">
            <EnhancedUniverseContent 
              universe={currentUniverse}
              hasNewUniverse={true}
            />
            
            {/* Enhanced Action Buttons */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6 shadow-lg">
              <div className="flex flex-wrap gap-3 justify-center">
                {/* Primary Action */}
                <Button
                  onClick={onDiscoverUniverse}
                  disabled={isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                  style={{
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                  {isLoading ? (
                    <>
                      <RefreshCw className="animate-spin mr-2" size={20} />
                      در حال کاوش جهان‌ها...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={20} />
                      کشف جهان جدید
                    </>
                  )}
                </Button>
                
                {/* Secondary Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={onToggleFavorite}
                    disabled={isLoading}
                    size="lg"
                    className={`border-2 font-semibold px-6 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${
                      favorites.includes(currentUniverse.id) 
                        ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400' 
                        : 'border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400'
                    }`}
                  >
                    <Heart 
                      className={`mr-2 ${favorites.includes(currentUniverse.id) ? 'fill-red-500' : ''}`} 
                      size={18} 
                    />
                    {favorites.includes(currentUniverse.id) ? 'محبوب است' : 'افزودن به علاقه‌مندی‌ها'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={onCopyDetails}
                    disabled={isLoading}
                    size="lg"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold px-6 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Copy className="mr-2" size={18} />
                    کپی اطلاعات
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={onShowBrowser}
                    disabled={isLoading}
                    size="lg"
                    className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 font-semibold px-6 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Search className="mr-2" size={18} />
                    مرور همه جهان‌ها
                  </Button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex justify-center mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    جهان فعال: {currentUniverse.name}
                  </div>
                  <div className="text-gray-400">•</div>
                  <div>
                    احتمال: {(currentUniverse.probability * 100).toFixed(4)}%
                  </div>
                  <div className="text-gray-400">•</div>
                  <div>
                    نوع: {currentUniverse.type}
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
        
        .hover\\:scale-105:hover:not(:disabled) {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
};