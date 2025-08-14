import React, { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Search, Share, Download, ArrowLeft } from "lucide-react";
import { ParallelUniverse } from '../types';
import { parallelUniverses } from '../universeData';
import { Modern3DHeader } from './Modern3DHeader';
import { Modern3DContent } from './Modern3DContent';
import { Modern3DWelcomeScreen } from './Modern3DWelcomeScreen';
import { SimpleCosmicBackground } from './SimpleCosmicBackground';
import { ThreeJSErrorBoundary } from './ThreeJSErrorBoundary';

interface Modern3DMainViewProps {
  currentUniverse: ParallelUniverse | null;
  isLoading: boolean;
  favorites: number[];
  onDiscoverUniverse: () => void;
  onToggleFavorite: () => void;
  onCopyDetails: () => void;
  onShowBrowser: () => void;
}

export const Modern3DMainView: React.FC<Modern3DMainViewProps> = ({
  currentUniverse,
  isLoading,
  favorites,
  onDiscoverUniverse,
  onToggleFavorite,
  onCopyDetails,
  onShowBrowser
}) => {
  return (
    <div className="shadow-2xl overflow-hidden relative min-h-[700px] transition-all duration-500 glass-morphism border border-gray-200/50 rounded-2xl">
      <Modern3DHeader />
      
      <div className="p-0 relative">
        {!currentUniverse ? (
          <Modern3DWelcomeScreen
            onDiscoverUniverse={onDiscoverUniverse}
            onShowBrowser={onShowBrowser}
            isLoading={isLoading}
            favoriteCount={favorites.length}
            totalUniverses={parallelUniverses.length}
          />
        ) : (
          <div className="relative">
            {/* 3D Background for main content */}
            <ThreeJSErrorBoundary>
              <Suspense fallback={null}>
                <div className="absolute inset-0 opacity-60">
                  <SimpleCosmicBackground count={200} />
                </div>
              </Suspense>
            </ThreeJSErrorBoundary>
            
            <div className="relative z-10 p-10 space-y-10" dir="rtl">
              <Modern3DContent 
                universe={currentUniverse}
                hasNewUniverse={true}
              />
              
              {/* Action Panel matching homepage style */}
              <div className="glass-morphism rounded-2xl border border-gray-200/50 p-8 shadow-lg">
                <div className="space-y-6">
                  {/* Primary Action */}
                  <div className="flex justify-center">
                    <Button
                      onClick={onDiscoverUniverse}
                      disabled={isLoading}
                      size="lg"
                      className="shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] font-medium text-lg gradient-persian text-white interactive-element magnetic-hover min-w-[300px]"
                    >
                      <span className="flex items-center justify-center">
                        {isLoading ? (
                          <>
                            در حال کاوش کیهان...
                            <RefreshCw className="animate-spin mr-4" size={24} />
                          </>
                        ) : (
                          <>
                            کشف جهان جدید
                            <Sparkles className="mr-4" size={24} />
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                  
                  {/* Secondary Actions */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={onToggleFavorite}
                      disabled={isLoading}
                      className={`transition-all hover:scale-[1.02] font-medium text-base interactive-element magnetic-hover min-w-[200px] ${
                        favorites.includes(currentUniverse.id) 
                          ? 'glass-morphism hover:bg-red-50/50 text-red-600 border-red-200' 
                          : 'glass-morphism hover:bg-blue-50/50'
                      }`}
                    >
                      {favorites.includes(currentUniverse.id) ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                      <Heart 
                        className={`mr-3 ${favorites.includes(currentUniverse.id) ? 'fill-current text-red-500' : ''}`} 
                        size={20} 
                      />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={onCopyDetails}
                      disabled={isLoading}
                      className="glass-morphism hover:bg-blue-50/50 transition-all hover:scale-[1.02] font-medium text-base interactive-element magnetic-hover min-w-[160px]"
                    >
                      کپی اطلاعات
                      <Copy className="mr-3" size={20} />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={onShowBrowser}
                      disabled={isLoading}
                      className="glass-morphism hover:bg-purple-50/50 transition-all hover:scale-[1.02] font-medium text-base interactive-element magnetic-hover text-purple-600 border-purple-200 min-w-[180px]"
                    >
                      مرور همه جهان‌ها
                      <Search className="mr-3" size={20} />
                    </Button>
                  </div>
                </div>
                
                {/* Quantum Status Bar */}
                <div className="flex justify-center mt-6 pt-6 border-t border-gray-200/50">
                  <div className="flex items-center gap-6 text-gray-700 text-base font-light flex-wrap justify-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full ml-3 animate-pulse shadow-lg shadow-green-400/50"></div>
                      <span>{currentUniverse.name}</span>
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
          </div>
        )}
      </div>
    </div>
  );
};