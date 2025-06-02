
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ToolCategory, categoryLabels } from '@/data/tools';
import { fallbackCategoryLabels } from '@/data/fallback-tools';
import { 
  TextIcon, 
  Image, 
  Search, 
  Calculator, 
  Hash, 
  Dice6,
  BookOpen,
  CheckSquare,
  Palette,
  BookMarked,
  BookIcon
} from 'lucide-react';
import { categoryThemes } from '@/utils/categoryColors';

// Map categories to their respective icons - moved outside component to prevent recreation
const categoryIcons = {
  text: TextIcon,
  image: Image,
  seo: Search,
  calculator: Calculator,
  number: Hash,
  random: Dice6,
  educational: BookOpen,
  productivity: CheckSquare,
  design: Palette,
  "persian-cultural": BookMarked,
  "readings": BookIcon
};

interface CategoryCardProps {
  category: ToolCategory;
  count: number;
}

// Memoized component to prevent unnecessary renders
export const CategoryCard = memo(function CategoryCard({ category, count }: CategoryCardProps) {
  console.log('CategoryCard: Rendering category:', category, 'with count:', count);
  
  // Ensure category exists and has fallbacks
  if (!category) {
    console.warn('CategoryCard: Invalid category provided');
    return null;
  }
  
  const IconComponent = categoryIcons[category] || TextIcon;
  const theme = categoryThemes[category] || categoryThemes.text;
  
  // Use fallback labels if main labels are not available
  const categoryLabel = categoryLabels[category] || fallbackCategoryLabels[category] || 'دسته نامشخص';
  
  // Ensure count is a valid number
  const safeCount = typeof count === 'number' && count >= 0 ? count : 0;
  
  return (
    <Link to={`/category/${category}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-3xl">
      <div className="card-apple-gradient rounded-3xl p-5 flex flex-col items-center group hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className={`icon-container mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/30 bg-gradient-to-br ${theme.gradient}`}>
          <IconComponent size={28} className="text-white" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">{categoryLabel}</h3>
        <p className="text-sm text-gray-500 text-center bg-white/50 py-0.5 px-2 rounded-full border border-white/20">
          {safeCount} ابزار
        </p>
      </div>
    </Link>
  );
});
