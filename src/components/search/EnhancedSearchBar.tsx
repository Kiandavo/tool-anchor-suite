import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Loader2, ArrowLeft, Sparkles, Calculator, BookOpen, Palette, Settings, TrendingUp } from 'lucide-react';
import { searchTools, getPopularTools } from '@/data/tools';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const quickCategories = [
  { label: 'محاسبه‌گر', icon: Calculator, query: 'محاسبه', color: 'from-blue-500 to-cyan-500' },
  { label: 'فال', icon: Sparkles, query: 'فال', color: 'from-purple-500 to-pink-500' },
  { label: 'طراحی', icon: Palette, query: 'تصویر', color: 'from-orange-500 to-red-500' },
  { label: 'متن', icon: BookOpen, query: 'متن', color: 'from-green-500 to-emerald-500' },
];

export const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  className = '',
  placeholder = 'جستجو در ۸۰+ ابزار رایگان...',
  onSearch
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popularTools = getPopularTools().slice(0, 4);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const timeoutId = setTimeout(() => {
      const searchResults = searchTools(query).slice(0, 6);
      setResults(searchResults);
      setShowResults(true);
      setIsLoading(false);
      setSelectedIndex(-1);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowResults(false);
      setSelectedIndex(-1);
      setIsFocused(false);
      inputRef.current?.blur();
      return;
    }

    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/tool/${results[selectedIndex].slug}`;
        } else if (query.trim()) {
          window.location.href = `/all-tools?search=${encodeURIComponent(query)}`;
        }
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setQuery('');
  };

  const handleQuickSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      {/* Main Search Container */}
      <motion.div 
        className={cn(
          "relative rounded-2xl transition-all duration-300",
          isFocused ? "shadow-2xl shadow-amber-500/20" : "shadow-xl shadow-black/5"
        )}
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Gradient Border Effect */}
        <div className={cn(
          "absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 transition-opacity duration-300",
          isFocused ? "opacity-100" : "opacity-0"
        )} />
        
        {/* Input Container */}
        <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="relative flex items-center">
            {/* Search Icon */}
            <div className="pr-4 pl-2">
              <motion.div 
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  isFocused 
                    ? "bg-gradient-to-br from-yellow-500 to-amber-500 text-white" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </motion.div>
            </div>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                setIsFocused(true);
                setShowResults(true);
              }}
              placeholder={placeholder}
              className="flex-1 py-5 text-lg font-body bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />

            {/* Clear Button */}
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClear}
                  className="ml-2 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={18} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (query.trim()) {
                  window.location.href = `/all-tools?search=${encodeURIComponent(query)}`;
                }
              }}
              className={cn(
                "ml-3 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300",
                query.trim() 
                  ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30" 
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              disabled={!query.trim()}
            >
              جستجو
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 bg-card border border-border/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {!query.trim() ? (
              /* Empty State - Show Quick Actions & Popular */
              <div className="p-4 space-y-4">
                {/* Quick Categories */}
                <div>
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    دسترسی سریع
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {quickCategories.map((cat, idx) => {
                      const Icon = cat.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickSearch(cat.query)}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all group"
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white",
                            cat.color
                          )}>
                            <Icon size={18} />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {cat.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Popular Tools */}
                <div>
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" />
                    پرطرفدار
                  </p>
                  <div className="space-y-1">
                    {popularTools.map((tool, index) => (
                      <Link
                        key={tool.id}
                        to={`/tool/${tool.slug}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all group"
                      >
                        <span className="text-xl">{tool.icon}</span>
                        <span className="text-sm font-medium text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {tool.name}
                        </span>
                        <ArrowLeft className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 mr-auto transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Keyboard Hint */}
                <div className="flex items-center justify-center gap-4 pt-2 border-t border-border/50 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑↓</kbd>
                    حرکت
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Enter</kbd>
                    انتخاب
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Esc</kbd>
                    بستن
                  </span>
                </div>
              </div>
            ) : isLoading ? (
              <div className="p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 mx-auto mb-3 rounded-full border-2 border-amber-500 border-t-transparent"
                />
                <p className="text-sm text-muted-foreground">در حال جستجو...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="p-3 bg-gradient-to-r from-yellow-500/5 via-amber-500/5 to-orange-500/5 border-b border-border/50">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{results.length} نتیجه برای</span>
                    <span className="font-medium text-foreground">"{query}"</span>
                  </p>
                </div>
                <div className="p-2 max-h-80 overflow-y-auto">
                  {results.map((tool, index) => (
                    <Link
                      key={tool.id}
                      to={`/tool/${tool.slug}`}
                      onClick={handleResultClick}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group",
                        selectedIndex === index 
                          ? "bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 border border-amber-500/20" 
                          : "hover:bg-muted/50"
                      )}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 text-xl",
                        selectedIndex === index 
                          ? "bg-gradient-to-br from-yellow-500 to-amber-500 text-white" 
                          : "bg-muted"
                      )}>
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={cn(
                          "font-medium truncate transition-colors",
                          selectedIndex === index ? "text-amber-600 dark:text-amber-400" : "text-foreground"
                        )}>
                          {tool.name}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {tool.description}
                        </p>
                      </div>
                      <ArrowLeft className={cn(
                        "w-4 h-4 transition-all duration-200 shrink-0",
                        selectedIndex === index 
                          ? "text-amber-500 opacity-100 -translate-x-1" 
                          : "text-muted-foreground opacity-0 group-hover:opacity-100"
                      )} />
                    </Link>
                  ))}
                </div>
                {results.length >= 6 && (
                  <div className="p-3 border-t border-border/50 bg-muted/20">
                    <Link
                      to={`/all-tools?search=${encodeURIComponent(query)}`}
                      className="flex items-center justify-center gap-2 py-2 text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors font-medium text-sm"
                      onClick={() => setShowResults(false)}
                    >
                      مشاهده همه نتایج
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-3">
                  نتیجه‌ای برای "<span className="font-medium text-foreground">{query}</span>" یافت نشد
                </p>
                <Link
                  to="/all-tools"
                  className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors font-medium text-sm"
                  onClick={() => setShowResults(false)}
                >
                  مشاهده همه ابزارها
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
