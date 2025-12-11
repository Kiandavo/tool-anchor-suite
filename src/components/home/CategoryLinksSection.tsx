import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  FileText, 
  Image, 
  Globe, 
  Sparkles,
  Hash
} from 'lucide-react';

const categories = [
  {
    slug: 'calculators',
    name: 'محاسبه‌گرها',
    description: 'محاسبه BMI، درصد، وام، سن و...',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-600',
  },
  {
    slug: 'text',
    name: 'ابزارهای متنی',
    description: 'شمارش کلمات، تبدیل متن، JSON',
    icon: FileText,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-600',
  },
  {
    slug: 'image',
    name: 'ابزارهای تصویر',
    description: 'فشرده‌سازی، تغییر اندازه، تبدیل',
    icon: Image,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-600',
  },
  {
    slug: 'seo',
    name: 'سئو و وب',
    description: 'متا تگ، چگالی کلمات، robots.txt',
    icon: Globe,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-600',
  },
  {
    slug: 'readings',
    name: 'فال و طالع‌بینی',
    description: 'فال حافظ، تاروت، طالع‌بینی',
    icon: Sparkles,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
    textColor: 'text-violet-600',
  },
  {
    slug: 'number',
    name: 'ابزارهای عددی و تصادفی',
    description: 'تولید عدد، رمز عبور، QR',
    icon: Hash,
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-600',
  },
];

export const CategoryLinksSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
          دسته‌بندی‌ها
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group relative p-5 sm:p-6 rounded-2xl bg-card border border-border/60 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${category.color} p-[1px] rounded-2xl`}>
                  <div className="absolute inset-[1px] bg-card rounded-2xl" />
                </div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl ${category.bgColor} ${category.textColor} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <Link
            to="/all-tools"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            مشاهده همه ابزارها
            <span className="text-lg">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
