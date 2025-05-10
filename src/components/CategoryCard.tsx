
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

// Color themes for each category
const categoryColorThemes = {
  text: "from-[#e5deff]/20 to-[#e5deff]/10 text-purple-600",
  image: "from-[#d3e4fd]/20 to-[#d3e4fd]/10 text-blue-600",
  seo: "from-[#fec6a1]/20 to-[#fec6a1]/10 text-orange-600",
  calculators: "from-[#f2fce2]/20 to-[#f2fce2]/10 text-green-600",
  number: "from-[#fef7cd]/20 to-[#fef7cd]/10 text-yellow-600",
  random: "from-[#ffdee2]/20 to-[#ffdee2]/10 text-pink-600",
  educational: "from-[#e0f2fe]/20 to-[#e0f2fe]/10 text-blue-600",
  productivity: "from-[#dcfce7]/20 to-[#dcfce7]/10 text-green-600",
  design: "from-[#ffe4e6]/20 to-[#ffe4e6]/10 text-rose-600",
  "persian-cultural": "from-[#f1f5f9]/20 to-[#f1f5f9]/10 text-slate-600"
};

interface CategoryCardProps {
  category: ToolCategory;
  count: number;
}

// Memoized component to prevent unnecessary renders
export const CategoryCard = memo(function CategoryCard({ category, count }: CategoryCardProps) {
  const IconComponent = categoryIcons[category];
  const colorTheme = categoryColorThemes[category];
  
  return (
    <Link to={`/category/${category}`} className="block transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-apple-blue/40 rounded-3xl">
      <div className="neo-glass rounded-3xl p-5 flex flex-col items-center group hover:-translate-y-1 hover:shadow-lg will-change-transform transition-all duration-300">
        <div className={`icon-container mb-4 bg-gradient-to-br ${colorTheme} w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/30`}>
          <IconComponent size={28} />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">{categoryLabels[category]}</h3>
        <p className="text-sm text-gray-500 text-center bg-gray-50/50 py-0.5 px-2 rounded-full">{count} ابزار</p>
      </div>
    </Link>
  );
});
