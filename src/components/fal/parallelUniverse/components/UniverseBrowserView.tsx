import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Compass } from "lucide-react";
import { ParallelUniverse } from '../types';
import UniverseHeader from './UniverseHeader';
import DecorativeBackground from './DecorativeBackground';
import UniverseBrowser from './UniverseBrowser';

interface UniverseBrowserViewProps {
  onSelectUniverse: (universe: ParallelUniverse) => void;
  favorites: number[];
  onToggleFavorite: (universeId: number) => void;
  history: number[];
  onHideBrowser: () => void;
}

export const UniverseBrowserView: React.FC<UniverseBrowserViewProps> = ({
  onSelectUniverse,
  favorites,
  onToggleFavorite,
  history,
  onHideBrowser
}) => {
  return (
    <Card className="shadow-2xl overflow-hidden relative bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 min-h-[600px]">
      <DecorativeBackground />
      <UniverseHeader />
      
      <CardContent className="pt-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Search className="mr-2 text-purple-600" size={24} />
            مرورگر جهان‌های موازی
          </h3>
          <Button 
            variant="outline" 
            onClick={onHideBrowser}
            className="border-purple-400 text-purple-700 hover:bg-purple-50 hover:scale-105 transition-all duration-200"
            size="lg"
          >
            <Compass className="mr-2" size={16} />
            بازگشت
          </Button>
        </div>
        
        <UniverseBrowser
          onSelectUniverse={onSelectUniverse}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          history={history}
        />
      </CardContent>
    </Card>
  );
};