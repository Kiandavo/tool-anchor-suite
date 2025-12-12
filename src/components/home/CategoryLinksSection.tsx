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
    <section className="py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Category strip - 6 items, functional grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group flex flex-col items-center p-4 rounded-xl bg-card border border-border hover:border-amber-500/50 hover:bg-amber-50/50 transition-all duration-200 text-center"
              >
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 mb-2 group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight">
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
