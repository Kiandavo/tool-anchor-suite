
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, InfoIcon, Loader2 } from "lucide-react";
import { persianWordEtymology } from '@/data/persian-word-etymology';
import { SeoHead } from '@/components/seo/SeoHead';
import { useMemorizedSearch } from '@/hooks/useMemorizedSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';
import { memoryCache } from '@/utils/performance/cache';

interface WordData {
  word: string;
  root: string;
  meaning: string;
  description: string;
  examples: string[];
}

const WordEtymology = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedWord, setSelectedWord] = useState<WordData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    searchTime: 0
  });
  
  // Debounced search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Memoized search results with caching
  const searchResults = useMemo(() => {
    const startTime = performance.now();
    const cacheKey = `search-${debouncedSearchTerm}`;
    
    // Try to get from cache first
    let results = memoryCache.get<WordData[]>(cacheKey);
    
    if (!results) {
      if (!debouncedSearchTerm.trim()) {
        results = [...persianWordEtymology].sort((a, b) => 
          a.word.localeCompare(b.word, 'fa')
        );
      } else {
        const normalizedSearchTerm = debouncedSearchTerm.trim().toLowerCase();
        results = persianWordEtymology
          .filter(item => 
            item.word.toLowerCase().includes(normalizedSearchTerm) ||
            item.examples.some(ex => ex.toLowerCase().includes(normalizedSearchTerm))
          )
          .sort((a, b) => a.word.localeCompare(b.word, 'fa'));
      }
      
      // Cache the results
      memoryCache.set(cacheKey, results, 10 * 60 * 1000); // 10 minutes
    }
    
    const searchTime = performance.now() - startTime;
    setPerformanceMetrics(prev => ({ ...prev, searchTime }));
    
    return results;
  }, [debouncedSearchTerm]);
  
  useEffect(() => {
    const startTime = performance.now();
    setIsLoading(true);
    
    setTimeout(() => {
      const renderTime = performance.now() - startTime;
      setPerformanceMetrics(prev => ({ ...prev, renderTime }));
      setIsLoading(false);
    }, 300);
  }, []);

  const handleSearch = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedWord(null);
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <div className="space-y-6">
      <SeoHead
        title="ریشه‌شناسی کلمات فارسی"
        description="با ابزار ریشه‌شناسی کلمات فارسی، ریشه و تاریخچه کلمات را کشف کنید. شامل معانی، تحولات تاریخی و کلمات هم‌خانواده."
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ریشه‌شناسی کلمات فارسی</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            با این ابزار می‌توانید ریشه و تاریخچه کلمات فارسی را جستجو کنید و با معانی و تحولات تاریخی آن‌ها آشنا شوید.
          </p>

          <div className="flex gap-2 mb-8">
            <Input 
              placeholder="کلمه مورد نظر را وارد کنید..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-lg transition-all duration-300 focus:scale-[1.02]"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSearch} 
              className="rounded-lg transition-all duration-300 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 ml-1 animate-spin" />
              ) : (
                <SearchIcon className="w-4 h-4 ml-1" />
              )}
              جستجو
            </Button>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              // Skeleton Loading
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="p-4 border rounded-lg animate-pulse">
                    <div className="space-y-2">
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="w-4 h-4 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-10 bg-muted/30 rounded-lg animate-fade-in">
                <p>نتیجه‌ای یافت نشد.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                {searchResults.map((result, index) => (
                  <div 
                    key={`${result.word}-${index}`}
                    className="p-4 border rounded-lg cursor-pointer bg-background hover:bg-muted/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                    onClick={() => setSelectedWord(result)}
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium transition-colors">{result.word}</h3>
                      <p className="text-sm text-muted-foreground">{result.meaning}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded transition-colors">
                          {result.examples.length} مثال
                        </span>
                        <InfoIcon className="text-muted-foreground transition-transform hover:scale-110" size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Performance Monitor */}
            <PerformanceMonitor
              renderTime={performanceMetrics.renderTime}
              searchTime={performanceMetrics.searchTime}
              itemsCount={searchResults.length}
            />

            {selectedWord && (
              <div className="mt-8 p-5 border rounded-lg bg-muted/30 space-y-3 animate-scale-in">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">{selectedWord.word}</h2>
                  <span className="text-sm text-muted-foreground">{selectedWord.root}</span>
                </div>
                <p className="font-medium">{selectedWord.meaning}</p>
                <p className="text-muted-foreground">{selectedWord.description}</p>
                
                <div className="mt-4">
                  <p className="font-medium mb-2">کلمات هم‌خانواده:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedWord.examples.map((example, idx) => (
                      <span 
                        key={idx} 
                        className="bg-primary/10 text-primary px-2 py-1 rounded text-sm transition-all duration-200 hover:bg-primary/20 hover:scale-105"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordEtymology;
