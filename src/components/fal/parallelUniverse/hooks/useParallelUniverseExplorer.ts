import { useState } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { ParallelUniverse } from '../types';
import { getRandomUniverse } from '../universeData';
import { useUniverseStorage } from './useUniverseStorage';

export const useParallelUniverseExplorer = () => {
  const [currentUniverse, setCurrentUniverse] = useState<ParallelUniverse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const { favorites, history, addToHistory, toggleFavorite } = useUniverseStorage();

  console.log('🌌 ParallelUniverseExplorer state:', { 
    currentUniverse: currentUniverse?.name, 
    isLoading, 
    showBrowser,
    favoritesCount: favorites.length,
    historyCount: history.length
  });

  const discoverRandomUniverse = () => {
    console.log('🚀 Starting universe discovery...');
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const universe = getRandomUniverse();
        console.log('✨ Universe generated successfully:', universe.name);
        setCurrentUniverse(universe);
        addToHistory(universe.id);
        setIsLoading(false);
        toast.success(`🌟 جهان "${universe.name}" کشف شد!`, {
          duration: 3000,
        });
      } catch (error) {
        console.error('❌ Error generating universe:', error);
        setIsLoading(false);
        toast.error('خطا در کشف جهان موازی');
      }
    }, 1500);
  };

  const selectUniverse = (universe: ParallelUniverse) => {
    console.log('🎯 Universe selected from browser:', universe.name);
    setCurrentUniverse(universe);
    addToHistory(universe.id);
    setShowBrowser(false);
    toast.success(`✨ به جهان "${universe.name}" سفر کردید!`);
  };

  const handleToggleFavorite = (universeId?: number) => {
    const targetId = universeId || currentUniverse?.id;
    console.log('💖 Toggling favorite for universe ID:', targetId);
    
    if (!targetId) {
      console.warn('⚠️ No universe ID provided for favorite toggle');
      toast.error('خطا در افزودن به علاقه‌مندی‌ها');
      return;
    }
    
    const wasAdded = toggleFavorite(targetId);
    console.log('💝 Favorite action completed:', wasAdded ? 'added' : 'removed');
    
    const message = wasAdded ? "💖 به علاقه‌مندی‌ها اضافه شد" : "💔 از علاقه‌مندی‌ها حذف شد";
    toast.success(message);
  };

  const copyUniverseDetails = () => {
    console.log('📋 Copy universe details requested');
    
    if (!currentUniverse) {
      console.warn('⚠️ No universe to copy');
      toast.error('هیچ جهانی برای کپی وجود ندارد');
      return;
    }
    
    const text = `🌌 جهان موازی: ${currentUniverse.name}\n\n${currentUniverse.description}\n\n✨ ویژگی‌ها:\n${currentUniverse.characteristics.map(c => `• ${c}`).join('\n')}\n\n👤 شما در این جهان:\n${currentUniverse.youInThisUniverse}\n\n🎲 احتمال وجود: ${(currentUniverse.probability * 100).toFixed(4)}%`;
    
    copyToClipboard(text);
    toast.success('📋 اطلاعات جهان موازی کپی شد!');
    console.log('📋 Universe details copied to clipboard');
  };

  const handleShowBrowser = () => {
    console.log('🔍 Opening universe browser');
    setShowBrowser(true);
  };

  const handleHideBrowser = () => {
    console.log('🔙 Closing universe browser');
    setShowBrowser(false);
  };

  return {
    currentUniverse,
    isLoading,
    showBrowser,
    favorites,
    history,
    discoverRandomUniverse,
    selectUniverse,
    handleToggleFavorite,
    copyUniverseDetails,
    handleShowBrowser,
    handleHideBrowser
  };
};