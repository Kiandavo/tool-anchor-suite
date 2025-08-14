import React, { useState, useCallback } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
}

export const SearchBox = ({ 
  onSearch, 
  placeholder = "جستجو در ابزارها...", 
  className,
  showClearButton = true 
}: SearchBoxProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    onSearch(value);
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 apple-glass border-primary/20 focus:border-primary/40 transition-all duration-200"
          dir="rtl"
        />
        {showClearButton && query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted/50"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};