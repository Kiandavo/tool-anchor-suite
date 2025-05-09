
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
  BookMarked
} from 'lucide-react';

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
  "persian-cultural": BookMarked
};

interface CategoryCardProps {
  category: ToolCategory;
  count: number;
}

// Memoized component to prevent unnecessary renders
export const CategoryCard = memo(function CategoryCard({ category, count }: CategoryCardProps) {
  const IconComponent = categoryIcons[category];
  
  return (
    <Link to={`/category/${category}`} className="block transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-apple-blue/40 rounded-3xl">
      <div className="glass-effect rounded-3xl p-6 flex flex-col items-center group hover:-translate-y-1 hover:shadow-lg will-change-transform">
        <div className="icon-container mb-4 bg-gradient-to-br from-white/90 to-white/60 shadow-sm border border-white/20 w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
          <IconComponent className="text-apple-blue transition-colors duration-300" size={28} />
        </div>
        <h3 className="text-lg font-medium text-apple-dark-gray mb-1">{categoryLabels[category]}</h3>
        <p className="text-sm text-apple-gray text-center">{count} ابزار</p>
      </div>
    </Link>
  );
});
