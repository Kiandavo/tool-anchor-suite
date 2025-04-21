
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCategory, categoryLabels } from '@/data/tools';

// Icon mapping using React Icons will be added here
interface CategoryCardProps {
  category: ToolCategory;
  count: number;
}

export function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <Link to={`/category/${category}`}>
      <div className="category-card">
        <div className="icon-container bg-primary/10">
          {/* The icon would be rendered based on category */}
          <span className="text-primary text-xl">
            {/* Icon placeholder */}
            {category.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">{categoryLabels[category]}</h3>
        <p className="text-sm text-gray-500 text-center">{count} ابزار</p>
      </div>
    </Link>
  );
}
