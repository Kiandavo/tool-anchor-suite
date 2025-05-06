
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Book, Copy, RefreshCw, Sparkles } from "lucide-react";
import { copyToClipboard } from "@/utils/randomUtils";
import { hafezGhazals, HafezPoem } from "@/data/hafez-ghazals";

export const HafezFortune = () => {
  const [poem, setPoem] = useState<HafezPoem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasNewFortune, setHasNewFortune] = useState(false);

  // Session storage key for tracking shown poems
  const SHOWN_POEMS_KEY = 'hafez_shown_poems';
  
  const getRandomPoem = () => {
    setIsLoading(true);
    setIsAnimating(true);
    
    // Get the IDs of poems we've already shown
    const storedPoems = sessionStorage.getItem(SHOWN_POEMS_KEY);
    let shownPoemIds: number[] = storedPoems ? JSON.parse(storedPoems) : [];
    
    // If all poems have been shown, reset the list
    if (shownPoemIds.length >= hafezGhazals.length) {
      shownPoemIds = [];
    }
    
    // Find poems that haven't been shown yet
    const availablePoems = hafezGhazals.filter(p => !shownPoemIds.includes(p.id));
    
    setTimeout(() => {
      // If we have available poems, pick one randomly
      if (availablePoems.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePoems.length);
        const selectedPoem = availablePoems[randomIndex];
        
        // Update shown poems in session storage
        shownPoemIds.push(selectedPoem.id);
        sessionStorage.setItem(SHOWN_POEMS_KEY, JSON.stringify(shownPoemIds));
        
        setPoem(selectedPoem);
        setHasNewFortune(true);
        
        // Reset the "new fortune" indicator after a delay
        setTimeout(() => setHasNewFortune(false), 3000);
      } else {
        // This should never happen, but as a fallback...
        const randomIndex = Math.floor(Math.random() * hafezGhazals.length);
        setPoem(hafezGhazals[randomIndex]);
      }
      
      setIsLoading(false);
      setIsAnimating(false);
      toast.success("فال حافظ گرفته شد!");
    }, 1000);
  };
  
  const copyFortune = () => {
    if (poem) {
      copyToClipboard(`${poem.title}\n\n${poem.text}\n\nتفسیر:\n${poem.interpretation}`);
      toast.success("فال کپی شد!");
    }
  };

  return (
    <Card className="bg-[#f5f6f7] border-[#d1d5db] shadow-md overflow-hidden relative">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23333' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <CardHeader className="bg-gradient-to-r from-[#6b7280] to-[#4b5563] text-center pb-2 py-2 relative border-b border-[#d1d5db]">
        <div className="flex items-center justify-center">
          <Book className="text-white mr-2" size={16} />
          <h2 className="text-sm font-bold text-white flex items-center">
            فال حافظ
            <span className="mr-1.5 inline-block"><Sparkles size={12} className="text-white opacity-70" /></span>
          </h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 px-3">
        <div className="space-y-3">
          {!poem ? (
            <div className="text-center text-gray-600 text-sm py-4">
              <p className="mb-3">برای دریافت فال، دکمه فال حافظ را فشار دهید.</p>
              <div className="mt-3 flex justify-center">
                <div className="animate-pulse">
                  <Book size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          ) : (
            <div className={`space-y-4 ${isAnimating ? 'opacity-50' : 'reveal'}`}>
              {/* New fortune indicator */}
              {hasNewFortune && (
                <div className="text-center">
                  <span className="inline-block bg-[#6b7280]/10 text-[#4b5563] text-xs px-3 py-1 rounded-full border border-[#d1d5db]/30 animate-pulse">
                    ✨ فال جدید ✨
                  </span>
                </div>
              )}
              
              <div className="flex justify-center">
                <div className="w-16 h-0.5 bg-[#d1d5db]"></div>
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-[#4b5563] text-sm">{poem.title}</h3>
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg border border-[#d1d5db] shadow-inner">
                <pre className="text-[#4b5563] text-sm font-medium leading-6 whitespace-pre-wrap text-right">{poem.text}</pre>
              </div>
              
              <div className="bg-[#f5f6f7] p-3 rounded-lg border border-[#d1d5db]/50">
                <h4 className="font-medium text-[#4b5563] text-xs mb-2">تفسیر:</h4>
                <p className="text-[#4b5563]/80 text-xs leading-5">{poem.interpretation}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-3 bg-[#f5f6f7]/70 border-t border-[#d1d5db]/50">
        <Button 
          onClick={getRandomPoem} 
          disabled={isLoading}
          size="sm" 
          className="bg-[#6b7280] hover:bg-[#4b5563] text-white text-xs h-8 px-4 relative overflow-hidden group w-full sm:w-auto"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          {isLoading ? 
            <RefreshCw className="animate-spin mr-1" size={14} /> : 
            <Sparkles size={14} className="mr-1" />
          }
          فال حافظ
        </Button>
        
        {poem && (
          <Button 
            variant="outline"
            size="sm"
            onClick={copyFortune} 
            className="border-[#6b7280] text-[#4b5563] text-xs h-8 px-3 w-full sm:w-auto"
          >
            <Copy size={14} className="mr-1" />
            کپی فال
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
