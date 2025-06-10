
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      <Input
        type="text"
        placeholder="جستجو در خرافات..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-sm"
      />
      
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="text-sm">
          <SelectValue placeholder="انتخاب دسته‌بندی" />
        </SelectTrigger>
        <SelectContent>
          {SUPERSTITION_CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SuperstitionFilters;
