import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowLeft, TrendingUp, Clock, Trash2, Sparkles } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { tools, getPopularTools } from '@/data/tools';
import { categoryLabels } from '@/data/tools';
import { Tool } from '@/types/tool-types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Popular search suggestions
const POPULAR_SEARCHES = [
  'محاسبه BMI',
  'فشرده‌ساز عکس',
  'تولید QR',
  'تبدیل واحد',
  'شمارنده کلمات',
  'تولید رمز عبور',
  'محاسبه تخفیف',
  'تولید متا تگ'
];

export const SearchModal = () => {
  const { isOpen, close } = useSearchModal();
  const { history, addToHistory, clearHistory, removeFromHistory } = useSearchHistory();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [autocomplete, setAutocomplete] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(true);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const popularTools = getPopularTools().slice(0, 6);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Search with autocomplete
  useEffect(() => {
    if (query.trim()) {
      const searchQuery = query.toLowerCase().trim();
      
      const filtered = tools.filter(tool =>
        !tool.isComingSoon && (
          tool.name.toLowerCase().includes(searchQuery) ||
          tool.description.toLowerCase().includes(searchQuery) ||
          tool.slug.toLowerCase().includes(searchQuery) ||
          categoryLabels[tool.category].toLowerCase().includes(searchQuery)
        )
      );
      setResults(filtered.slice(0, 8));
      
      const suggestions = tools
        .filter(tool => 
          !tool.isComingSoon && 
          tool.name.toLowerCase().includes(searchQuery) &&
          tool.name.toLowerCase() !== searchQuery
        )
        .map(tool => tool.name)
        .slice(0, 5);
      
      setAutocomplete(suggestions);
      setSelectedIndex(0);
      setShowHistory(false);
    } else {
      setResults([]);
      setAutocomplete([]);
      setShowHistory(true);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      handleSelectTool(results[selectedIndex]);
    }
  };

  const handleSelectTool = (tool: Tool) => {
    if (query.trim()) {
      addToHistory(query);
    }
    navigate(`/tool/${tool.slug}`);
    close();
  };

  const handleSearchQuery = (searchQuery: string) => {
    setQuery(searchQuery);
    setTimeout(() => {
      const searchResults = tools.filter(tool =>
        !tool.isComingSoon && (
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      if (searchResults.length > 0) {
        handleSelectTool(searchResults[0]);
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
        onClick={close}
      />

      {/* Modal Content */}
      <div className="relative z-10 h-full flex flex-col items-center pt-16 sm:pt-24 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl"
        >
          {/* Search Input */}
          <div className="relative mb-4">
            {/* Gradient Border */}
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-l from-primary via-primary/50 to-primary/30 opacity-50" />
            
            <div className="relative bg-card rounded-2xl border border-border/30 overflow-hidden">
              <div className="flex items-center gap-4 p-5">
                {/* Search Icon */}
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                
                {/* Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="جستجو در ابزارها..."
                  className="flex-1 bg-transparent text-lg font-body outline-none text-foreground placeholder:text-muted-foreground/60"
                  dir="rtl"
                />
                
                {/* Close Button */}
                <button
                  onClick={close}
                  className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center transition-colors shrink-0"
                  aria-label="بستن"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Results, History, or Popular Tools */}
          <AnimatePresence mode="wait">
            {query.trim() ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-card rounded-2xl border border-border/30 shadow-2xl max-h-[55vh] overflow-hidden"
              >
                {/* Autocomplete Suggestions */}
                {autocomplete.length > 0 && (
                  <div className="p-4 border-b border-border/30 bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-3 font-body">پیشنهادات:</p>
                    <div className="flex flex-wrap gap-2">
                      {autocomplete.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => setQuery(suggestion)}
                          className="px-4 py-2 text-sm font-body bg-card hover:bg-primary/10 border border-border/50 hover:border-primary/30 rounded-xl transition-all duration-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="overflow-y-auto max-h-[45vh]">
                  {results.length > 0 ? (
                    <div className="p-3">
                      {results.map((tool, index) => (
                        <button
                          key={tool.id}
                          onClick={() => handleSelectTool(tool)}
                          className={cn(
                            "w-full p-4 rounded-xl transition-all duration-200 group text-right",
                            index === selectedIndex
                              ? "bg-primary/10 border border-primary/20"
                              : "hover:bg-muted/50 border border-transparent"
                          )}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                              index === selectedIndex
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                            )}>
                              <span className="text-xl">{tool.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-muted-foreground font-body truncate">
                                {tool.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg font-body hidden sm:inline">
                                {categoryLabels[tool.category]}
                              </span>
                              <ArrowLeft className={cn(
                                "w-4 h-4 transition-all duration-200",
                                index === selectedIndex
                                  ? "text-primary translate-x-1"
                                  : "text-muted-foreground opacity-0 group-hover:opacity-100"
                              )} />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Search className="w-7 h-7 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground font-body">
                        ابزاری با این نام پیدا نشد
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-card rounded-2xl border border-border/30 shadow-2xl max-h-[55vh] overflow-hidden"
              >
                <div className="overflow-y-auto max-h-[55vh]">
                  {/* Search History */}
                  {showHistory && history.length > 0 && (
                    <div className="p-5 border-b border-border/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-amber-500" />
                          </div>
                          <h3 className="font-heading font-semibold text-foreground">جستجوهای اخیر</h3>
                        </div>
                        <button
                          onClick={clearHistory}
                          className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5 font-body"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          پاک کردن
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {history.slice(0, 6).map((item, idx) => (
                          <div key={idx} className="group relative">
                            <button
                              onClick={() => handleSearchQuery(item.query)}
                              className="pl-8 pr-4 py-2 text-sm font-body bg-muted/50 hover:bg-muted border border-border/50 hover:border-border rounded-xl transition-all duration-200"
                            >
                              {item.query}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromHistory(item.query);
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                            >
                              <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div className="p-5 border-b border-border/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-foreground">جستجوهای محبوب</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((search, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSearchQuery(search)}
                          className="px-4 py-2 text-sm font-body bg-primary/5 hover:bg-primary/15 text-primary border border-primary/20 hover:border-primary/40 rounded-xl transition-all duration-200"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Tools */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                      </div>
                      <h3 className="font-heading font-semibold text-foreground">ابزارهای پرطرفدار</h3>
                    </div>
                    <div className="grid gap-2">
                      {popularTools.map((tool, index) => (
                        <button
                          key={tool.id}
                          onClick={() => handleSelectTool(tool)}
                          className="w-full p-4 rounded-xl transition-all duration-200 hover:bg-muted/50 border border-transparent hover:border-border/50 group text-right"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-muted group-hover:bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                              <span className="text-lg">{tool.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-heading font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors">
                                {tool.name}
                              </h3>
                              <p className="text-xs text-muted-foreground font-body truncate">
                                {tool.description}
                              </p>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keyboard Hints */}
          <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground font-body">
            <div className="flex items-center gap-2">
              <kbd className="px-2.5 py-1.5 bg-muted/50 rounded-lg border border-border/50 text-xs font-mono">↑↓</kbd>
              <span>حرکت</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2.5 py-1.5 bg-muted/50 rounded-lg border border-border/50 text-xs font-mono">Enter</kbd>
              <span>انتخاب</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2.5 py-1.5 bg-muted/50 rounded-lg border border-border/50 text-xs font-mono">Esc</kbd>
              <span>بستن</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
