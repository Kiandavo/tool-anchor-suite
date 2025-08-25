import React from 'react';
import { useLocation } from 'react-router-dom';
import { BreadcrumbNavigation } from '../ui/breadcrumb-navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export const PageBreadcrumbs: React.FC = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'خانه', href: '/' }
    ];

    // Handle different route patterns
    if (pathSegments.length === 0) {
      return [{ label: 'خانه', current: true }];
    }

    // Handle /category/:categoryId
    if (pathSegments[0] === 'category' && pathSegments[1]) {
      const categoryId = pathSegments[1];
      
      // Basic category names mapping
      const categoryNames: Record<string, string> = {
        'text-tools': 'ابزارهای متن',
        'image-tools': 'ابزارهای تصویر',
        'calculation-tools': 'ابزارهای محاسبه',
        'seo-tools': 'ابزارهای سئو',
        'readings': 'فال و طالع‌بینی',
        'persian-culture': 'فرهنگ ایرانی'
      };
      
      breadcrumbs.push({
        label: categoryNames[categoryId] || 'دسته‌بندی',
        current: true
      });
    }

    // Handle /tool/:slug
    if (pathSegments[0] === 'tool' && pathSegments[1]) {
      // For now, just show generic tool breadcrumb
      // TODO: Integrate with actual tool data when available
      breadcrumbs.push({
        label: 'ابزارها',
        href: '/all-tools'
      });
      
      breadcrumbs.push({
        label: 'ابزار',
        current: true
      });
    }

    // Handle other static pages
    const pageRoutes: Record<string, string> = {
      'all-tools': 'تمام ابزارها',
      'about': 'درباره ما',
      'درباره-ما': 'درباره ما',
      'faq': 'سوالات متداول',
      'سوالات-متداول': 'سوالات متداول',
      'blog': 'وبلاگ',
      'وبلاگ': 'وبلاگ',
      'privacy-policy': 'حریم خصوصی',
      'terms-of-service': 'شرایط استفاده',
      'settings': 'تنظیمات'
    };

    if (pathSegments[0] && pageRoutes[pathSegments[0]]) {
      breadcrumbs.push({
        label: pageRoutes[pathSegments[0]],
        current: true
      });
    }

    // Handle blog posts
    if (pathSegments[0] === 'blog' && pathSegments[1]) {
      breadcrumbs.push({
        label: 'وبلاگ',
        href: '/blog'
      });
      breadcrumbs.push({
        label: 'مقاله',
        current: true
      });
    }

    if (pathSegments[0] === 'وبلاگ' && pathSegments[1]) {
      breadcrumbs.push({
        label: 'وبلاگ',
        href: '/وبلاگ'
      });
      breadcrumbs.push({
        label: 'مقاله',
        current: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Don't show breadcrumbs on homepage or if only one item
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return <BreadcrumbNavigation items={breadcrumbs} />;
};