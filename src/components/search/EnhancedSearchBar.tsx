import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import { searchTools } from '@/data/tools';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  className = '',
  placeholder = 'چه ابزاری نیاز دارید؟',
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

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
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
    }, 200);

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
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
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
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        setIsFocused(false);
        inputRef.current?.blur();
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

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      {/* Main Search Container */}
      <motion.div 
        className={cn(
          "relative rounded-2xl transition-all duration-500",
          isFocused ? "shadow-2xl shadow-primary/20" : "shadow-xl"
        )}
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Gradient Border Effect */}
        <div className={cn(
          "absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-500 blur-sm",
          isFocused && "opacity-60"
        )} />
        
        {/* Input Container */}
        <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden">
          {/* Background Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          
          <div className="relative flex items-center">
            {/* Search Icon */}
            <div className="pr-5 pl-2">
              <motion.div 
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  isFocused 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}
                animate={{ rotate: isLoading ? 360 : 0 }}
                transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5" />
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
                if (query.trim()) setShowResults(true);
              }}
              placeholder={placeholder}
              className="flex-1 py-5 text-lg font-body bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
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
            <button
              onClick={() => {
                if (query.trim()) {
                  window.location.href = `/all-tools?search=${encodeURIComponent(query)}`;
                }
              }}
              className={cn(
                "ml-3 px-6 py-3 rounded-xl font-heading font-medium text-sm transition-all duration-300",
                query.trim() 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl" 
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              disabled={!query.trim()}
            >
              جستجو
            </button>
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
            className="absolute top-full left-0 right-0 mt-3 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {isLoading ? (
              <div className="p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 mx-auto mb-3 rounded-full border-2 border-primary border-t-transparent"
                />
                <p className="text-sm text-muted-foreground font-body">در حال جستجو...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="p-4 bg-muted/30 border-b border-border/50">
                  <p className="text-sm text-muted-foreground font-body flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>{results.length} نتیجه برای</span>
                    <span className="font-heading font-medium text-foreground">"{query}"</span>
                  </p>
                </div>
                <div className="p-2 max-h-80 overflow-y-auto">
                  {results.map((tool, index) => (
                    <Link
                      key={tool.id}
                      to={`/tool/${tool.slug}`}
                      onClick={handleResultClick}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group",
                        selectedIndex === index 
                          ? "bg-primary/10 border border-primary/20" 
                          : "hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                        selectedIndex === index 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted group-hover:bg-primary/20 text-muted-foreground group-hover:text-primary"
                      )}>
                        <Search className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-semibold text-foreground truncate mb-1">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-muted-foreground font-body truncate">
                          {tool.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg font-body">
                          {tool.category}
                        </span>
                        <ArrowLeft className={cn(
                          "w-4 h-4 transition-all duration-200",
                          selectedIndex === index 
                            ? "text-primary opacity-100 -translate-x-1" 
                            : "text-muted-foreground opacity-0 group-hover:opacity-100"
                        )} />
                      </div>
                    </Link>
                  ))}
                </div>
                {results.length >= 6 && (
                  <div className="p-4 border-t border-border/50 bg-muted/20">
                    <Link
                      to={`/all-tools?search=${encodeURIComponent(query)}`}
                      className="flex items-center justify-center gap-2 py-3 text-primary hover:text-primary/80 transition-colors font-heading font-medium"
                      onClick={() => setShowResults(false)}
                    >
                      <span>مشاهده همه نتایج ({searchTools(query).length} ابزار)</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-body mb-3">
                  نتیجه‌ای برای "<span className="font-heading font-medium text-foreground">{query}</span>" یافت نشد
                </p>
                <Link
                  to="/all-tools"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-heading font-medium"
                  onClick={() => setShowResults(false)}
                >
                  <span>مشاهده همه ابزارها</span>
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
