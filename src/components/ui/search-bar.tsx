import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "جستجو در ابزارها...",
  className
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cn("relative max-w-md", className)}>
      <div className={cn(
        "relative flex items-center transition-all duration-200",
        isFocused && "scale-105"
      )}>
        <Search 
          size={18} 
          className="absolute left-3 text-muted-foreground pointer-events-none" 
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10 h-12 text-right rounded-2xl border-2 focus:border-primary/50 transition-all duration-200"
          dir="rtl"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 h-8 w-8 p-0 hover:bg-muted/50"
          >
            <X size={16} />
          </Button>
        )}
      </div>
      
      {query && (
        <Button
          onClick={handleSearch}
          className="absolute -bottom-14 left-0 icon-text-sm px-4 py-2 rounded-xl"
          size="sm"
        >
          <Search size={16} />
          <span>جستجو</span>
        </Button>
      )}
    </div>
  );
};