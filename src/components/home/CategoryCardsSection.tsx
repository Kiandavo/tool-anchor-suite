import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  FileText, 
  Image, 
  Globe, 
  Sparkles,
  Calendar,
  ArrowLeft
} from 'lucide-react';

// 6 main category cards with clean URLs
const categories = [
  {
    slug: 'calculators',
    url: '/calculators',
    name: 'محاسبه‌گرها',
    description: 'BMI، درصد، وام، تخفیف و تبدیل واحد',
    icon: Calculator,
    bgLight: 'bg-blue-50 hover:bg-blue-100',
    iconBg: 'bg-blue-500',
  },
  {
    slug: 'text',
    url: '/text-tools',
    name: 'ابزارهای متنی',
    description: 'شمارش کلمات، JSON، Base64 و تبدیل متن',
    icon: FileText,
    bgLight: 'bg-emerald-50 hover:bg-emerald-100',
    iconBg: 'bg-emerald-500',
  },
  {
    slug: 'image',
    url: '/image-tools',
    name: 'ابزارهای تصویر',
    description: 'فشرده‌سازی، تغییر سایز و تبدیل فرمت',
    icon: Image,
    bgLight: 'bg-purple-50 hover:bg-purple-100',
    iconBg: 'bg-purple-500',
  },
  {
    slug: 'seo',
    url: '/seo-tools',
    name: 'ابزارهای سئو',
    description: 'متا تگ، چگالی کلمات و تحلیل سایت',
    icon: Globe,
    bgLight: 'bg-orange-50 hover:bg-orange-100',
    iconBg: 'bg-orange-500',
  },
  {
    slug: 'persian-cultural',
    url: '/persian-tools',
    name: 'فرهنگ فارسی',
    description: 'تقویم فارسی، تبدیل تاریخ و محاسبه سن',
    icon: Calendar,
    bgLight: 'bg-rose-50 hover:bg-rose-100',
    iconBg: 'bg-rose-500',
  },
  {
    slug: 'readings',
    url: '/readings',
    name: 'فال و طالع‌بینی',
    description: 'فال حافظ، تاروت، استخاره و طالع‌بینی',
    icon: Sparkles,
    bgLight: 'bg-amber-50 hover:bg-amber-100',
    iconBg: 'bg-amber-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
};

export const CategoryCardsSection = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container-narrow">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
          دسته‌بندی ابزارها
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <motion.div key={category.slug} variants={cardVariants}>
                <Link
                  to={category.url}
                  className={`group flex items-center gap-4 p-4 rounded-xl border border-transparent transition-all duration-300 ${category.bgLight}`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${category.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <ArrowLeft className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 flex-shrink-0" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
