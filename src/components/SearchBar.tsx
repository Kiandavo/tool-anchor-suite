
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "جستجو..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, onSearch]);
  
  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className={`relative w-full max-w-md mx-auto transition-all duration-300 ${isFocused ? 'ring-2 ring-primary/20 scale-102' : ''}`}>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary">
        <Search size={18} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
  );
}
