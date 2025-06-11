
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Compass, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { ParallelUniverse } from './types';
import { getUniverseTypeColor } from './universeStyleUtils';

// Import components
import UniverseHeader from './components/UniverseHeader';
import DecorativeBackground from './components/DecorativeBackground';
import UniverseContent from './components/UniverseContent';
import UniverseBrowser from './components/UniverseBrowser';

// Session storage keys
const FAVORITES_KEY = 'parallel_universe_favorites';
const HISTORY_KEY = 'parallel_universe_history';

export const ParallelUniverseExplorer = () => {
  const [currentUniverse, setCurrentUniverse] = useState<ParallelUniverse | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('browser');

  // Load saved data on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save favorites when they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Save history when it changes
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const handleSelectUniverse = (universe: ParallelUniverse) => {
    setCurrentUniverse(universe);
    setActiveTab('universe');
    
    // Add to history if not already there
    if (!history.includes(universe.id)) {
      const newHistory = [universe.id, ...history.slice(0, 19)]; // Keep only last 20
      setHistory(newHistory);
    }
    
    toast.success(`جهان "${universe.name}" انتخاب شد!`);
  };

  const handleToggleFavorite = (universeId: number) => {
    if (favorites.includes(universeId)) {
      setFavorites(favorites.filter(id => id !== universeId));
      toast.success("از علاقه‌مندی‌ها حذف شد");
    } else {
      setFavorites([...favorites, universeId]);
      toast.success("به علاقه‌مندی‌ها اضافه شد");
    }
  };

  const copyUniverseDetails = () => {
    if (currentUniverse) {
      const text = `جهان موازی: ${currentUniverse.name}\n\n${currentUniverse.description}\n\nویژگی‌ها:\n${currentUniverse.characteristics.map(c => `• ${c}`).join('\n')}\n\nشما در این جهان:\n${currentUniverse.youInThisUniverse}\n\nاحتمال وجود: ${(currentUniverse.probability * 100).toFixed(4)}%`;
      
      copyToClipboard(text);
      toast.success("اطلاعات جهان موازی کپی شد!");
    }
  };

  return (
    <Card className={`shadow-md overflow-hidden relative ${currentUniverse ? getUniverseTypeColor(currentUniverse.type) : 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200'}`}>
      {/* Decorative background */}
      <DecorativeBackground />
      
      {/* Header */}
      <UniverseHeader />
      
      {/* Content */}
      <CardContent className="pt-3 px-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="browser" className="flex items-center gap-2">
              <Compass size={16} />
              مرور جهان‌ها
            </TabsTrigger>
            <TabsTrigger value="universe" className="flex items-center gap-2" disabled={!currentUniverse}>
              <BookOpen size={16} />
              جهان انتخابی
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browser" className="space-y-4">
            <UniverseBrowser
              onSelectUniverse={handleSelectUniverse}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              history={history}
            />
          </TabsContent>

          <TabsContent value="universe" className="space-y-4">
            {currentUniverse ? (
              <div>
                <UniverseContent 
                  universe={currentUniverse}
                  hasNewUniverse={false}
                />
                
                {/* Action buttons */}
                <div className="flex gap-2 mt-4 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyUniverseDetails}
                    className="flex items-center gap-1"
                  >
                    <Copy size={14} />
                    کپی جزئیات
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFavorite(currentUniverse.id)}
                    className="flex items-center gap-1"
                  >
                    {favorites.includes(currentUniverse.id) ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('browser')}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw size={14} />
                    انتخاب جهان دیگر
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Compass size={48} className="mx-auto mb-2 opacity-50" />
                <p>لطفاً ابتدا یک جهان انتخاب کنید</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setActiveTab('browser')}
                >
                  مرور جهان‌ها
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Animation styles */}
      <style>{`
        .universe-appear {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Card>
  );
};
