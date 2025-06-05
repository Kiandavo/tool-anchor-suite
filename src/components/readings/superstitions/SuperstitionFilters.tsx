
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SUPERSTITION_CATEGORIES } from '@/data/persian-superstitions';

interface SuperstitionFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SuperstitionFilters: React.FC<SuperstitionFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          placeholder="جستجو در خرافات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10 border-purple-200 focus:border-purple-400"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {SUPERSTITION_CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category 
              ? "bg-purple-600 hover:bg-purple-700 text-white text-xs" 
              : "border-purple-300 text-purple-700 hover:bg-purple-100 text-xs"
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuperstitionFilters;
