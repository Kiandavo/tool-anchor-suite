import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import { ParallelUniverse } from '../types';
import { Modern3DHeader } from './Modern3DHeader';
import { CosmicBackground3D } from './CosmicBackground3D';
import UniverseBrowser from './UniverseBrowser';

interface Modern3DBrowserViewProps {
  onSelectUniverse: (universe: ParallelUniverse) => void;
  favorites: number[];
  onToggleFavorite: (universeId: number) => void;
  history: number[];
  onHideBrowser: () => void;
}

export const Modern3DBrowserView: React.FC<Modern3DBrowserViewProps> = ({
  onSelectUniverse,
  favorites,
  onToggleFavorite,
  history,
  onHideBrowser
}) => {
  return (
    <Card className="shadow-2xl overflow-hidden relative bg-slate-900 border-white/10 min-h-[700px]">
      <Modern3DHeader />
      
      <CardContent className="p-10 relative" dir="rtl">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-5">
          <CosmicBackground3D count={150} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center ml-5 shadow-2xl">
                <Search className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-light text-white">مرورگر جهان‌های موازی</h2>
            </div>
            
            <Button 
              variant="apple-outline" 
              size="apple"
              onClick={onHideBrowser}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 font-medium px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-lg min-w-[140px]"
            >
              بازگشت
              <ArrowLeft className="mr-3" size={20} />
            </Button>
          </div>
          
          <div className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
            <UniverseBrowser
              onSelectUniverse={onSelectUniverse}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              history={history}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};