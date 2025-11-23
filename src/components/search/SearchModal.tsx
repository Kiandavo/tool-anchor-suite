import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, TrendingUp, Clock, Trash2 } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { tools, getPopularTools } from '@/data/tools';
import { categoryLabels } from '@/data/tools';
import { Tool } from '@/types/tool-types';

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
  const popularTools = getPopularTools().slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
      // Prevent body scroll
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
      
      // Filter tools
      const filtered = tools.filter(tool =>
        !tool.isComingSoon && (
          tool.name.toLowerCase().includes(searchQuery) ||
          tool.description.toLowerCase().includes(searchQuery) ||
          tool.slug.toLowerCase().includes(searchQuery) ||
          categoryLabels[tool.category].toLowerCase().includes(searchQuery)
        )
      );
      setResults(filtered.slice(0, 10));
      
      // Generate autocomplete suggestions from tool names
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
    // Wait a bit for results to populate, then select first result
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
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-fade-in"
        onClick={close}
      />

      {/* Modal Content */}
      <div className="relative z-10 h-full flex flex-col items-center pt-20 sm:pt-32 px-4">
        <div className="w-full max-w-2xl animate-scale-in">
          {/* Search Input */}
          <div className="bg-card/95 backdrop-blur-2xl rounded-3xl border border-border/50 shadow-2xl mb-6">
            <div className="flex items-center gap-4 p-6">
              <Search className="text-primary" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو در ابزارها..."
                className="flex-1 bg-transparent text-lg outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={close}
                className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
                aria-label="بستن"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Results, History, or Popular Tools */}
          {query.trim() ? (
            <div className="bg-card/95 backdrop-blur-2xl rounded-3xl border border-border/50 shadow-2xl max-h-[60vh] overflow-y-auto">
              {/* Autocomplete Suggestions */}
              {autocomplete.length > 0 && (
                <div className="p-4 border-b border-border/30">
                  <p className="text-xs text-muted-foreground mb-2 pr-2">پیشنهادات:</p>
                  <div className="flex flex-wrap gap-2">
                    {autocomplete.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(suggestion)}
                        className="px-3 py-1.5 text-sm bg-secondary/50 hover:bg-secondary rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {results.length > 0 ? (
                <div className="p-4">
                  {results.map((tool, index) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSelectTool(tool)}
                      className={`w-full text-right p-4 rounded-2xl transition-all duration-200 group ${
                        index === selectedIndex
                          ? 'bg-primary/10 border-primary/30'
                          : 'hover:bg-secondary/30'
                      } border border-transparent`}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{tool.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {tool.description}
                          </p>
                          <span className="text-xs text-primary/70 mt-1 inline-block">
                            {categoryLabels[tool.category]}
                          </span>
                        </div>
                        <ArrowRight
                          className={`flex-shrink-0 text-muted-foreground group-hover:text-primary transition-all rtl:rotate-180 ${
                            index === selectedIndex ? 'translate-x-1' : ''
                          }`}
                          size={18}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-muted-foreground" size={28} />
                  </div>
                  <p className="text-muted-foreground">
                    ابزاری با این نام پیدا نشد
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-card/95 backdrop-blur-2xl rounded-3xl border border-border/50 shadow-2xl max-h-[60vh] overflow-y-auto">
              {/* Search History */}
              {showHistory && history.length > 0 && (
                <div className="p-6 border-b border-border/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="text-primary" size={20} />
                      <h3 className="text-lg font-semibold text-foreground">جستجوهای اخیر</h3>
                    </div>
                    <button
                      onClick={clearHistory}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      پاک کردن
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {history.slice(0, 8).map((item, idx) => (
                      <div key={idx} className="group relative">
                        <button
                          onClick={() => handleSearchQuery(item.query)}
                          className="px-3 py-1.5 text-sm bg-secondary/50 hover:bg-secondary rounded-full transition-colors pr-8"
                        >
                          {item.query}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromHistory(item.query);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} className="text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div className="p-6 border-b border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="text-primary" size={20} />
                  <h3 className="text-lg font-semibold text-foreground">جستجوهای محبوب</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchQuery(search)}
                      className="px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tools */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-primary" size={20} />
                  <h3 className="text-lg font-semibold text-foreground">ابزارهای محبوب</h3>
                </div>
                <div className="grid gap-3">
                  {popularTools.map((tool, index) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSelectTool(tool)}
                      className="w-full text-right p-4 rounded-2xl transition-all duration-200 hover:bg-secondary/30 border border-transparent hover:border-primary/20 group"
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{tool.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {tool.description}
                          </p>
                        </div>
                        <ArrowRight
                          className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-all rtl:rotate-180"
                          size={18}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Keyboard Hints */}
          {!query.trim() && (
            <div className="flex justify-center gap-4 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-secondary/30 rounded border border-border/30">↑↓</kbd>
                <span>حرکت</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-secondary/30 rounded border border-border/30">Enter</kbd>
                <span>انتخاب</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-secondary/30 rounded border border-border/30">Esc</kbd>
                <span>بستن</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
