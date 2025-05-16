
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
import { motion } from 'framer-motion';

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
    <Link to={`/category/${category}`} className="block focus:outline-none focus:ring-2 focus:ring-apple-blue/40 rounded-3xl">
      <motion.div 
        className="card-apple-gradient rounded-3xl p-5 flex flex-col items-center group hover:shadow-lg will-change-transform transition-all duration-300"
        whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`icon-container mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/30 ${theme.gradient}`}>
          <IconComponent size={28} className={theme.iconColor} />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">{categoryLabels[category]}</h3>
        <p className="text-sm text-gray-500 text-center bg-white/50 py-0.5 px-2 rounded-full border border-white/20">{count} ابزار</p>
      </motion.div>
    </Link>
  );
});
