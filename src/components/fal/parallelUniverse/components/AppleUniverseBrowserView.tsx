import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import { ParallelUniverse } from '../types';
import { AppleUniverseHeader } from './AppleUniverseHeader';
import UniverseBrowser from './UniverseBrowser';

interface AppleUniverseBrowserViewProps {
  onSelectUniverse: (universe: ParallelUniverse) => void;
  favorites: number[];
  onToggleFavorite: (universeId: number) => void;
  history: number[];
  onHideBrowser: () => void;
}

export const AppleUniverseBrowserView: React.FC<AppleUniverseBrowserViewProps> = ({
  onSelectUniverse,
  favorites,
  onToggleFavorite,
  history,
  onHideBrowser
}) => {
  return (
    <Card className="shadow-2xl overflow-hidden relative bg-white border-gray-200/50 min-h-[700px]">
      <AppleUniverseHeader />
      
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">مرورگر جهان‌های موازی</h2>
          </div>
          
          <Button 
            variant="apple-outline" 
            size="apple"
            onClick={onHideBrowser}
            className="bg-white/80 backdrop-blur-md border-gray-200/50 text-gray-700 hover:bg-gray-50/90 font-medium px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="mr-2" size={18} />
            بازگشت
          </Button>
        </div>
        
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-lg p-6">
          <UniverseBrowser
            onSelectUniverse={onSelectUniverse}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            history={history}
          />
        </div>
      </CardContent>
    </Card>
  );
};