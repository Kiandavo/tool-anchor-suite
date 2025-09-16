
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
    <nav className="flex items-center gap-2 mb-6" dir="ltr">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
          {item.current ? (
            <span className="text-sm font-medium text-foreground">
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.href || '#'} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
