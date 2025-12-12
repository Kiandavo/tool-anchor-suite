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

// 6 main clusters with example tools
const categories = [
  {
    slug: 'calculators',
    name: 'محاسبات',
    examples: ['BMI', 'درصد', 'وام', 'تخفیف'],
    icon: Calculator,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    hoverBorder: 'group-hover:border-blue-300',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hoverIconBg: 'group-hover:bg-blue-500',
  },
  {
    slug: 'text',
    name: 'متن',
    examples: ['شمارش', 'JSON', 'Base64'],
    icon: FileText,
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    hoverBorder: 'group-hover:border-emerald-300',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    hoverIconBg: 'group-hover:bg-emerald-500',
  },
  {
    slug: 'image',
    name: 'تصویر',
    examples: ['فشرده‌سازی', 'تغییر سایز', 'تبدیل'],
    icon: Image,
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    hoverBorder: 'group-hover:border-purple-300',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    hoverIconBg: 'group-hover:bg-purple-500',
  },
  {
    slug: 'seo',
    name: 'سئو',
    examples: ['متا تگ', 'چگالی کلمات'],
    icon: Globe,
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100',
    hoverBorder: 'group-hover:border-orange-300',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    hoverIconBg: 'group-hover:bg-orange-500',
  },
  {
    slug: 'persian-cultural',
    name: 'تاریخ',
    examples: ['تقویم', 'تبدیل', 'سن'],
    icon: Calendar,
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-100',
    hoverBorder: 'group-hover:border-rose-300',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    hoverIconBg: 'group-hover:bg-rose-500',
  },
  {
    slug: 'readings',
    name: 'فال',
    examples: ['حافظ', 'تاروت', 'استخاره'],
    icon: Sparkles,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    hoverBorder: 'group-hover:border-amber-300',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    hoverIconBg: 'group-hover:bg-amber-500',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
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

export const CategoryLinksSection = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container-narrow">
        {/* 3x2 grid on desktop, 2x3 on mobile */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
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
                  to={`/category/${category.slug}`}
                  className="block"
                >
                  <motion.div 
                    className={`group relative flex flex-col p-4 rounded-xl border overflow-hidden transition-colors duration-300 ${category.bgColor} ${category.borderColor} ${category.hoverBorder}`}
                    whileHover={{ 
                      y: -4,
                      boxShadow: "0 12px 24px -8px rgba(0,0,0,0.12)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {/* Hover gradient overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${category.iconBg} ${category.iconColor} ${category.hoverIconBg} group-hover:text-white group-hover:shadow-lg`}
                            whileHover={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.4 }}
                          >
                            <Icon className="w-4 h-4" />
                          </motion.div>
                          <h3 className="font-bold text-sm text-foreground">
                            {category.name}
                          </h3>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          initial={{ x: 5 }}
                          whileHover={{ x: 0 }}
                        >
                          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {category.examples.join('، ')}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
