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

// 6 main clusters with example tools
const categories = [
  {
    slug: 'calculators',
    name: 'محاسبات',
    examples: ['BMI', 'درصد', 'وام', 'تخفیف'],
    icon: Calculator,
    color: 'bg-blue-50 border-blue-100 hover:border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    slug: 'text',
    name: 'متن',
    examples: ['شمارش', 'JSON', 'Base64'],
    icon: FileText,
    color: 'bg-emerald-50 border-emerald-100 hover:border-emerald-200',
    iconColor: 'text-emerald-600',
  },
  {
    slug: 'image',
    name: 'تصویر',
    examples: ['فشرده‌سازی', 'تغییر سایز', 'تبدیل'],
    icon: Image,
    color: 'bg-purple-50 border-purple-100 hover:border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    slug: 'seo',
    name: 'سئو',
    examples: ['متا تگ', 'چگالی کلمات'],
    icon: Globe,
    color: 'bg-orange-50 border-orange-100 hover:border-orange-200',
    iconColor: 'text-orange-600',
  },
  {
    slug: 'persian-cultural',
    name: 'تاریخ',
    examples: ['تقویم', 'تبدیل', 'سن'],
    icon: Calendar,
    color: 'bg-rose-50 border-rose-100 hover:border-rose-200',
    iconColor: 'text-rose-600',
  },
  {
    slug: 'readings',
    name: 'فال',
    examples: ['حافظ', 'تاروت', 'استخاره'],
    icon: Sparkles,
    color: 'bg-amber-50 border-amber-100 hover:border-amber-200',
    iconColor: 'text-amber-600',
  },
];

export const CategoryLinksSection = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container-narrow">
        {/* 3x2 grid on desktop, 2x3 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={`group flex flex-col p-4 rounded-xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${category.color}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-background/80 ${category.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {category.name}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {category.examples.join('، ')}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
