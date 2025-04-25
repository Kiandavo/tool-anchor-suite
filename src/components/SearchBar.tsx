
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
    <div className="relative w-full max-w-md mx-auto">
      <div className={`relative transition-all duration-300 ${isFocused ? 'ring-2 ring-primary/20 scale-102' : ''}`}>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary">
          <Search size={18} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-10 pl-10 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary/30 focus:outline-none transition-all duration-300"
          dir="rtl"
        />
        {query && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleClear}>
            <X size={16} className="text-gray-400 hover:text-gray-600" />
          </div>
        )}
      </div>

      {/* Inline search results */}
      {showInlineResults && results.length > 0 && isFocused && (
        <div 
          ref={resultsRef}
          className="absolute z-50 mt-2 w-full bg-white rounded-lg border border-gray-200 shadow-lg max-h-80 overflow-y-auto"
        >
          <div className="p-2">
            <p className="text-xs text-gray-500 mb-2 px-2">{results.length} نتیجه یافت شد</p>
            {results.map((tool) => (
              <Link
                key={tool.id}
                to={`/tool/${tool.slug}`}
                className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={handleItemClick}
              >
                <div className="flex items-center">
                  <span className="font-medium text-gray-800">{tool.name}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
