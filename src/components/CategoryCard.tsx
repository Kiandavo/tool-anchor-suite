
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCategory, categoryLabels } from '@/data/tools';
import { 
  TextIcon, 
  Image, 
  Search, 
  Calculator, 
  Hash, 
  Dice6 
} from 'lucide-react';

// Map categories to their respective icons
const categoryIcons = {
  text: TextIcon,
  image: Image,
  seo: Search,
  calculators: Calculator,
  number: Hash,
  random: Dice6
};

interface CategoryCardProps {
  category: ToolCategory;
  count: number;
}

export function CategoryCard({ category, count }: CategoryCardProps) {
  const IconComponent = categoryIcons[category];
  
  return (
    <Link to={`/category/${category}`} className="block transition-all duration-300">
      <div className="category-card group">
        <div className="icon-container bg-primary/10 transform transition-transform duration-300 group-hover:scale-110">
          <IconComponent className="text-primary transition-colors duration-300" size={24} />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">{categoryLabels[category]}</h3>
        <p className="text-sm text-gray-500 text-center">{count} ابزار</p>
      </div>
    </Link>
  );
}
