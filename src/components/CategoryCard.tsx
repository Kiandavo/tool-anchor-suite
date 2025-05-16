
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ToolCategory, categoryLabels } from '@/data/tools';
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
  calculators: Calculator,
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
  const IconComponent = categoryIcons[category] || TextIcon;
  const theme = categoryThemes[category] || categoryThemes.text;
  
  return (
    <Link to={`/category/${category}`} className="block transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-apple-blue/40 rounded-3xl">
      <div className="card-apple-gradient rounded-3xl p-5 flex flex-col items-center group hover:-translate-y-1 hover:shadow-lg will-change-transform transition-all duration-300">
        <div className={`icon-container mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/30 ${theme.gradient}`}>
          <IconComponent size={28} className={theme.iconColor} />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">{categoryLabels[category]}</h3>
        <p className="text-sm text-gray-500 text-center bg-gray-50/50 py-0.5 px-2 rounded-full">{count} ابزار</p>
      </div>
    </Link>
  );
});
