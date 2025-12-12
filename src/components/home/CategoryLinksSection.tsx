import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  FileText, 
  Image, 
  Globe, 
  Sparkles,
  Calendar
} from 'lucide-react';

// 6 main clusters matching meta description
const categories = [
  {
    slug: 'calculators',
    name: 'محاسبات و تبدیل اعداد',
    description: 'BMI، درصد، وام، تخفیف، تبدیل واحد',
    icon: Calculator,
  },
  {
    slug: 'text',
    name: 'ابزارهای متن و نوشتار',
    description: 'شمارش کلمات، JSON، Base64، URL',
    icon: FileText,
  },
  {
    slug: 'image',
    name: 'تصویر و فایل',
    description: 'فشرده‌سازی، تغییر اندازه، تبدیل فرمت',
    icon: Image,
  },
  {
    slug: 'seo',
    name: 'ابزارهای سئو و وب',
    description: 'متا تگ، چگالی کلمات، robots.txt',
    icon: Globe,
  },
  {
    slug: 'persian-cultural',
    name: 'تقویم و تاریخ',
    description: 'تقویم فارسی، تبدیل تاریخ، محاسبه سن',
    icon: Calendar,
  },
  {
    slug: 'readings',
    name: 'فال و طالع‌بینی',
    description: 'فال حافظ، تاروت، طالع‌بینی، استخاره',
    icon: Sparkles,
  },
];

export const CategoryLinksSection = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        {/* Category strip - 6 items, unified grid */}
        <div className="grid-categories">
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group flex flex-col items-center p-4 rounded-lg bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 text-center"
              >
                <div className="icon-box mb-2 group-hover:bg-primary/20 transition-colors">
                  <Icon className="icon-md" />
                </div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {category.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
