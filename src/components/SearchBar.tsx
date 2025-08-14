
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Tool } from '@/data/tools';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  getResults?: (query: string) => Tool[];
  showInlineResults?: boolean;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "جستجو...", 
  getResults,
  showInlineResults = false 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<Tool[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Search on input change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (showInlineResults && getResults) {
      const searchResults = getResults(query);
      setResults(searchResults);
    }

    const timer = setTimeout(() => {
      if (query.trim() && !showInlineResults) {
        onSearch(query);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, onSearch, getResults, showInlineResults]);
  
  const handleClear = () => {
    setQuery('');
    setResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleItemClick = () => {
    setQuery('');
    setResults([]);
    setIsFocused(false);
  };
  
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className={`relative transition-all duration-300 ${isFocused ? 'ring-2 ring-apple-blue/30 scale-102' : ''}`}>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-apple-gray transition-colors duration-300 group-focus-within:text-apple-blue">
          <Search size={20} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full rounded-full border border-slate-200 bg-white backdrop-blur-sm py-3 pr-12 pl-12 text-base text-apple-dark-gray placeholder:text-apple-gray focus:border-apple-blue/30 focus:outline-none transition-all duration-300"
          dir="rtl"
        />
        {query && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleClear}>
            <X size={18} className="text-apple-gray hover:text-apple-dark-gray" />
          </div>
        )}
      </div>

      {/* Inline search results */}
      {showInlineResults && results.length > 0 && isFocused && (
        <div 
          ref={resultsRef}
          className="absolute z-50 mt-2 w-full bg-white backdrop-blur-lg rounded-2xl border border-slate-100 shadow-lg max-h-80 overflow-y-auto"
        >
          <div className="p-2">
            <p className="text-xs text-apple-gray mb-2 px-3">{results.length} نتیجه یافت شد</p>
            {results.map((tool) => (
              <Link
                key={tool.id}
                to={`/tool/${tool.slug}`}
                className="block px-4 py-3 hover:bg-apple-light-gray rounded-xl transition-colors"
                onClick={handleItemClick}
              >
                <div className="flex items-center">
                  <span className="font-medium text-apple-dark-gray">{tool.name}</span>
                </div>
                <p className="text-xs text-apple-gray line-clamp-1 mt-1">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
