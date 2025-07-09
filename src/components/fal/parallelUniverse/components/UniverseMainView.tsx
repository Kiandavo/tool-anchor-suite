import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, RefreshCw, Copy, Search } from "lucide-react";
import { ParallelUniverse } from '../types';
import { parallelUniverses } from '../universeData';
import { getUniverseTypeColor } from '../universeStyleUtils';
import UniverseHeader from './UniverseHeader';
import DecorativeBackground from './DecorativeBackground';
import UniverseContent from './UniverseContent';
import UniverseWelcomeScreen from './UniverseWelcomeScreen';

interface UniverseMainViewProps {
  currentUniverse: ParallelUniverse | null;
  isLoading: boolean;
  favorites: number[];
  onDiscoverUniverse: () => void;
  onToggleFavorite: () => void;
  onCopyDetails: () => void;
  onShowBrowser: () => void;
}

export const UniverseMainView: React.FC<UniverseMainViewProps> = ({
  currentUniverse,
  isLoading,
  favorites,
  onDiscoverUniverse,
  onToggleFavorite,
  onCopyDetails,
  onShowBrowser
}) => {
  return (
    <Card className={`shadow-2xl overflow-hidden relative min-h-[600px] transition-all duration-500 ${
      currentUniverse 
        ? getUniverseTypeColor(currentUniverse.type) 
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200'
    }`}>
      <DecorativeBackground />
      <UniverseHeader />
      
      <CardContent className="pt-6 px-6">
        {!currentUniverse ? (
          <UniverseWelcomeScreen
            onDiscoverUniverse={onDiscoverUniverse}
            onShowBrowser={onShowBrowser}
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
                onClick={onDiscoverUniverse}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
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
                onClick={onToggleFavorite}
                disabled={isLoading}
                size="lg"
                className={`border-2 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${
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
                onClick={onCopyDetails}
                disabled={isLoading}
                size="lg"
                className="border-2 border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Copy className="mr-2" size={18} />
                کپی
              </Button>
              
              <Button
                variant="outline"
                onClick={onShowBrowser}
                disabled={isLoading}
                size="lg"
                className="border-2 border-purple-400 text-purple-700 hover:bg-purple-50 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
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