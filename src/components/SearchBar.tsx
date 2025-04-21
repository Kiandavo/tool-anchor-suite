
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "جستجو..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        onSearch(query);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, onSearch]);
  
  return (
    <div className="relative w-full max-w-md mx-auto group">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
        dir="rtl"
      />
    </div>
  );
}
