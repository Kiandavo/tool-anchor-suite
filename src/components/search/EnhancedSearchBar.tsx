import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { searchTools } from '@/data/tools';
import { cn } from '@/lib/utils';

interface EnhancedSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  className = '',
  placeholder = 'جستجو در ابزارها... (مثلاً: محاسبه‌گر، QR کد، تبدیل متن)',
  onSearch
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
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
      const searchResults = searchTools(query).slice(0, 8); // Limit to 8 results
      setResults(searchResults);
      setShowResults(true);
      setIsLoading(false);
      setSelectedIndex(-1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
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

  const handleResultClick = (tool: any) => {
    setShowResults(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setShowResults(true)}
          placeholder={placeholder}
          className="w-full px-6 py-4 text-lg rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl"
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Search className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute left-12 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-6 text-center">
              <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">در حال جستجو...</p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-4 border-b border-border/30">
                <p className="text-sm text-muted-foreground">
                  {results.length} نتیجه برای "{query}"
                </p>
              </div>
              <div className="p-2">
                {results.map((tool, index) => (
                  <Link
                    key={tool.id}
                    to={`/tool/${tool.slug}`}
                    onClick={() => handleResultClick(tool)}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group",
                      selectedIndex === index && "bg-muted/70"
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Search className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">
                        {tool.name}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {tool.description}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                      {tool.category}
                    </div>
                  </Link>
                ))}
              </div>
              {results.length >= 8 && (
                <div className="p-4 border-t border-border/30">
                  <Link
                    to={`/all-tools?search=${encodeURIComponent(query)}`}
                    className="block w-full text-center py-2 text-primary hover:text-primary/80 transition-colors font-medium"
                    onClick={() => setShowResults(false)}
                  >
                    مشاهده همه نتایج ({searchTools(query).length} ابزار)
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-sm text-muted-foreground mb-2">
                نتیجه‌ای برای "{query}" یافت نشد
              </p>
              <Link
                to="/all-tools"
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                onClick={() => setShowResults(false)}
              >
                مشاهده همه ابزارها
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};