import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Search, Share, Download, ArrowLeft } from "lucide-react";
import { ParallelUniverse } from '../types';
import { parallelUniverses } from '../universeData';
import { Modern3DHeader } from './Modern3DHeader';
import { Modern3DContent } from './Modern3DContent';
import { Modern3DWelcomeScreen } from './Modern3DWelcomeScreen';
import { CosmicBackground3D } from './CosmicBackground3D';

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
    <Card className="shadow-2xl overflow-hidden relative min-h-[700px] transition-all duration-500 bg-slate-900 border-white/10">
      <Modern3DHeader />
      
      <CardContent className="p-0 relative">
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
            <div className="absolute inset-0 opacity-20">
              <CosmicBackground3D count={2000} />
            </div>
            
            <div className="relative z-10 p-10 space-y-10" dir="rtl">
              <Modern3DContent 
                universe={currentUniverse}
                hasNewUniverse={true}
              />
              
              {/* Futuristic Action Panel */}
              <div className="sticky bottom-0 bg-black/30 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl">
                <div className="space-y-8">
                  {/* Primary Action */}
                  <div className="flex justify-center">
                    <Button
                      onClick={onDiscoverUniverse}
                      disabled={isLoading}
                      variant="apple"
                      size="apple-lg"
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-16 py-6 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-700 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group min-w-[350px] text-xl"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                      <span className="relative z-10 flex items-center justify-center">
                        {isLoading ? (
                          <>
                            <RefreshCw className="animate-spin ml-4" size={24} />
                            در حال کاوش کیهان...
                          </>
                        ) : (
                          <>
                            <Sparkles className="ml-4" size={24} />
                            کشف جهان جدید
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                  
                  {/* Secondary Actions */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      variant="apple-outline"
                      size="apple"
                      onClick={onToggleFavorite}
                      disabled={isLoading}
                      className={`font-medium px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 backdrop-blur-md text-lg ${
                        favorites.includes(currentUniverse.id) 
                          ? 'bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500/30' 
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      <Heart 
                        className={`ml-3 ${favorites.includes(currentUniverse.id) ? 'fill-red-400 text-red-400' : ''}`} 
                        size={20} 
                      />
                      {favorites.includes(currentUniverse.id) ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                    </Button>
                    
                    <Button
                      variant="apple-outline"
                      size="apple"
                      onClick={onCopyDetails}
                      disabled={isLoading}
                      className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 font-medium px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-lg"
                    >
                      <Copy className="ml-3" size={20} />
                      کپی اطلاعات
                    </Button>
                    
                    <Button
                      variant="apple-outline"
                      size="apple"
                      onClick={onShowBrowser}
                      disabled={isLoading}
                      className="bg-purple-500/10 backdrop-blur-md border-purple-400/30 text-purple-200 hover:bg-purple-500/20 font-medium px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-lg"
                    >
                      <Search className="ml-3" size={20} />
                      مرور همه جهان‌ها
                    </Button>
                  </div>
                </div>
                
                {/* Quantum Status Bar */}
                <div className="flex justify-center mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-8 text-white/80 text-lg font-light flex-wrap justify-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full ml-3 animate-pulse shadow-lg shadow-green-400/50"></div>
                      <span>{currentUniverse.name}</span>
                    </div>
                    <div className="text-white/40">•</div>
                    <div>
                      احتمال: {(currentUniverse.probability * 100).toFixed(4)}%
                    </div>
                    <div className="text-white/40">•</div>
                    <div>
                      نوع: {currentUniverse.type}
                    </div>
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
          animation: shimmer 1.2s ease-in-out;
        }
      `}</style>
    </Card>
  );
};