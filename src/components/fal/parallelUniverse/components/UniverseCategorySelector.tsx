
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { universeCategories } from '../universeTypes';

interface UniverseCategorySelectorProps {
  universeCategory: string;
  onCategoryChange: (value: string) => void;
}

export const UniverseCategorySelector: React.FC<UniverseCategorySelectorProps> = ({ 
  universeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="w-full">
      <label className="block text-xs text-[#2a1c64] mb-1">جهان را انتخاب کنید</label>
      <Select onValueChange={onCategoryChange} value={universeCategory}>
        <SelectTrigger className="w-full bg-white/70 border-[#a99af0]">
          <SelectValue placeholder={universeCategories[0].name} />
        </SelectTrigger>
        <SelectContent className="w-full min-w-[var(--radix-select-trigger-width)]">
          {universeCategories.map(category => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-[10px] text-[#2a1c64]/70 mt-1">
        {universeCategories.find(c => c.id === universeCategory)?.description}
      </p>
    </div>
  );
};
