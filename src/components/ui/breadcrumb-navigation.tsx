
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 mb-6 animate-fade-in" dir="ltr">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronLeft className="w-3 h-3 text-apple-gray opacity-60 mx-1" />
          )}
          {item.current ? (
            <span className="modern-breadcrumb-current">
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.href || '#'} 
              className="modern-breadcrumb-link"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
