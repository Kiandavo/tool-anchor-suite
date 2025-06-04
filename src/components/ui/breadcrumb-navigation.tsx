
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { ChevronLeft, Home } from 'lucide-react';
import { categoryLabels } from '@/types/tool-types';

interface BreadcrumbNavigationProps {
  items: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
  className?: string;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ items, className }) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center gap-1">
              <Home size={16} />
              <span>خانه</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator>
              <ChevronLeft size={16} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {item.current ? (
                <BreadcrumbPage className="font-medium">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.href || '#'}>
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Helper function to generate breadcrumbs for tools
export const generateToolBreadcrumbs = (categoryId?: string, toolName?: string) => {
  const items = [];
  
  if (categoryId && categoryLabels[categoryId as keyof typeof categoryLabels]) {
    items.push({
      label: categoryLabels[categoryId as keyof typeof categoryLabels],
      href: `/category/${categoryId}`
    });
  }
  
  if (toolName) {
    items.push({
      label: toolName,
      current: true
    });
  }
  
  return items;
};
