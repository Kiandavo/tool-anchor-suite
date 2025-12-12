import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowLeft, TrendingUp, Clock, Trash2, Sparkles, Calculator, BookOpen, Palette, Zap, Image, Globe, Calendar, Hash, FileText } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { tools, getPopularTools, categoryLabels } from '@/data/tools';
import { Tool } from '@/types/tool-types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Extended category filters with all main categories
const categoryFilters = [
  { key: 'all', label: 'همه', icon: Zap },
  { key: 'calculators', label: 'محاسبه‌گر', icon: Calculator },
  { key: 'text', label: 'متن', icon: FileText },
  { key: 'image', label: 'تصویر', icon: Image },
  { key: 'readings', label: 'فال', icon: Sparkles },
  { key: 'seo', label: 'سئو', icon: Globe },
  { key: 'persian-cultural', label: 'فرهنگی', icon: Calendar },
  { key: 'number', label: 'عددی', icon: Hash },
];

// Popular search suggestions
const POPULAR_SEARCHES = [
  'محاسبه BMI',
  'فشرده‌ساز عکس',
  'تولید QR',
  'تبدیل واحد',
  'شمارنده کلمات',
  'تولید رمز عبور',
  'فال حافظ',
  'تاروت'
];

export const SearchModal = () => {
  const { isOpen, close } = useSearchModal();
  const { history, addToHistory, clearHistory, removeFromHistory } = useSearchHistory();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
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
      setActiveFilter('all');
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          // This would open it - handled by useSearchModal
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Search with filter
  useEffect(() => {
    if (query.trim()) {
      const searchQuery = query.toLowerCase().trim();
      
      let filtered = tools.filter(tool =>
        !tool.isComingSoon && (
          tool.name.toLowerCase().includes(searchQuery) ||
          tool.description.toLowerCase().includes(searchQuery) ||
          tool.slug.toLowerCase().includes(searchQuery) ||
          categoryLabels[tool.category].toLowerCase().includes(searchQuery)
        )
      );

      // Apply category filter
      if (activeFilter !== 'all') {
        filtered = filtered.filter(tool => tool.category === activeFilter);
      }

      setResults(filtered.slice(0, 8));
      setSelectedIndex(0);
      setShowHistory(false);
    } else {
      setResults([]);
      setShowHistory(true);
    }
  }, [query, activeFilter]);

  // Get current filter index for Tab navigation
  const currentFilterIndex = categoryFilters.findIndex(f => f.key === activeFilter);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
    } else if (e.key === 'Tab') {
      // Tab to cycle through filters
      e.preventDefault();
      const nextIndex = e.shiftKey 
        ? (currentFilterIndex - 1 + categoryFilters.length) % categoryFilters.length
        : (currentFilterIndex + 1) % categoryFilters.length;
      setActiveFilter(categoryFilters[nextIndex].key);
    }
  }, [close, results, selectedIndex, currentFilterIndex]);

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
        className="absolute inset-0 bg-background/80 backdrop-blur-2xl"
        onClick={close}
      />

      {/* Modal Content */}
      <div className="relative z-10 h-full flex flex-col items-center pt-12 sm:pt-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl"
        >
          {/* Search Input */}
          <div className="relative mb-4">
            {/* Gradient Border */}
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 opacity-70" />
            
            <div className="relative bg-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                {/* Search Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-white" />
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
                
                {/* Keyboard Shortcut */}
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-muted rounded-lg text-xs text-muted-foreground border border-border/50">
                  <span>⌘</span>
                  <span>K</span>
                </kbd>
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={close}
                  className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center transition-colors shrink-0"
                  aria-label="بستن"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 px-4 pb-4 overflow-x-auto scrollbar-hide">
                {categoryFilters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <motion.button
                      key={filter.key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveFilter(filter.key)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                        activeFilter === filter.key
                          ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-amber-500/25"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon size={14} />
                      {filter.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <AnimatePresence mode="wait">
            {query.trim() ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-card rounded-2xl border border-border/30 shadow-2xl max-h-[55vh] overflow-hidden"
              >
                {results.length > 0 ? (
                  <div className="overflow-y-auto max-h-[55vh] p-2">
                    {results.map((tool, index) => (
                      <motion.button
                        key={tool.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => handleSelectTool(tool)}
                        className={cn(
                          "w-full p-4 rounded-xl transition-all duration-200 group text-right",
                          index === selectedIndex
                            ? "bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 border border-amber-500/20"
                            : "hover:bg-muted/50 border border-transparent"
                        )}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all text-xl",
                            index === selectedIndex
                              ? "bg-gradient-to-br from-yellow-500 to-amber-500 text-white"
                              : "bg-muted group-hover:bg-amber-500/10"
                          )}>
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={cn(
                              "text-base font-semibold mb-1 transition-colors",
                              index === selectedIndex ? "text-amber-600 dark:text-amber-400" : "text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400"
                            )}>
                              {tool.name}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {tool.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg hidden sm:inline">
                              {categoryLabels[tool.category]}
                            </span>
                            <ArrowLeft className={cn(
                              "w-4 h-4 transition-all duration-200",
                              index === selectedIndex
                                ? "text-amber-500 translate-x-1"
                                : "text-muted-foreground opacity-0 group-hover:opacity-100"
                            )} />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Search className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      ابزاری با این نام پیدا نشد
                    </p>
                  </div>
                )}
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
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/10 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-amber-500" />
                          </div>
                          <h3 className="font-semibold text-foreground">جستجوهای اخیر</h3>
                        </div>
                        <button
                          onClick={clearHistory}
                          className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5"
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
                              className="pl-8 pr-4 py-2 text-sm bg-muted/50 hover:bg-muted border border-border/50 hover:border-amber-500/30 rounded-xl transition-all duration-200"
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
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground">جستجوهای محبوب</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((search, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSearchQuery(search)}
                          className="px-4 py-2 text-sm bg-gradient-to-r from-yellow-500/5 via-amber-500/5 to-orange-500/5 hover:from-yellow-500/15 hover:via-amber-500/15 hover:to-orange-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20 hover:border-amber-500/40 rounded-xl transition-all duration-200"
                        >
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Tools */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                      </div>
                      <h3 className="font-semibold text-foreground">ابزارهای پرطرفدار</h3>
                    </div>
                    <div className="grid gap-1">
                      {popularTools.map((tool, index) => (
                        <motion.button
                          key={tool.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSelectTool(tool)}
                          className="w-full p-3 rounded-xl transition-all duration-200 hover:bg-muted/50 border border-transparent hover:border-border/50 group text-right"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-muted group-hover:bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 transition-colors text-lg">
                              {tool.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-foreground mb-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {tool.name}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate">
                                {tool.description}
                              </p>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keyboard Hints */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="px-2.5 py-1.5 bg-card rounded-lg border border-border/50 text-xs">↑↓</kbd>
              <span>حرکت</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2.5 py-1.5 bg-card rounded-lg border border-border/50 text-xs">Tab</kbd>
              <span>فیلتر</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2.5 py-1.5 bg-card rounded-lg border border-border/50 text-xs">Enter</kbd>
              <span>انتخاب</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2.5 py-1.5 bg-card rounded-lg border border-border/50 text-xs">Esc</kbd>
              <span>بستن</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
