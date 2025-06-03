
import React from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { FileText, FileCode, FileDigit, FilePen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedGradientBackground } from '@/components/ui/enhanced-gradient-background';
import { motion } from 'framer-motion';

const templateCategories = [
  {
    id: 'resume-templates',
    title: 'قالب‌های رزومه فارسی',
    description: 'مجموعه قالب‌های حرفه‌ای رزومه به زبان فارسی با فرمت‌های مختلف',
    icon: FileText,
    color: 'bg-gradient-to-br from-purple-100 to-purple-300',
    iconColor: 'text-purple-600',
    count: 15
  },
  {
    id: 'legal-contracts',
    title: 'قراردادهای حقوقی فریلنسری',
    description: 'قراردادهای استاندارد برای فریلنسرها و کسب‌وکارهای مستقل در ایران',
    icon: FileCode,
    color: 'bg-gradient-to-br from-blue-100 to-blue-300',
    iconColor: 'text-blue-600',
    count: 12
  },
  {
    id: 'notion-templates',
    title: 'قالب‌های فارسی نوشن',
    description: 'قالب‌های کاربردی نوشن به زبان فارسی برای مدیریت پروژه و بهره‌وری',
    icon: FileDigit,
    color: 'bg-gradient-to-br from-green-100 to-green-300',
    iconColor: 'text-green-600',
    count: 18
  },
  {
    id: 'business-documents',
    title: 'اسناد تجاری قابل ویرایش',
    description: 'فاکتورها، پیشنهادها و سایر اسناد تجاری به زبان فارسی',
    icon: FilePen,
    color: 'bg-gradient-to-br from-orange-100 to-orange-300',
    iconColor: 'text-orange-600',
    count: 20
  }
];

export default function AllTemplates() {
  return (
    <Layout backUrl="/">
      <SeoHead 
        title="قالب‌های اسناد فارسی | لنگر"
        description="مجموعه قالب‌های حرفه‌ای فارسی برای رزومه، قراردادها، اسناد تجاری و قالب‌های نوشن برای تسهیل کار فریلنسرها و کسب‌وکارهای ایرانی"
        keywords="قالب رزومه فارسی, قراردادهای فریلنسری, فاکتور فارسی, پیشنهاد قیمت, قالب نوشن فارسی, فرم قرارداد, قالب CV فارسی, اسناد تجاری"
      />
      
      <EnhancedGradientBackground variant="readings">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="rounded-3xl p-8 mb-10 neo-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">قالب‌های اسناد فارسی</h1>
            <p className="text-gray-600 max-w-3xl">
              مجموعه قالب‌های حرفه‌ای فارسی برای رزومه، قراردادها، اسناد تجاری و قالب‌های نوشن 
              برای تسهیل کار فریلنسرها و کسب‌وکارهای ایرانی. تمام قالب‌ها به صورت رایگان قابل دانلود و ویرایش هستند.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templateCategories.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link 
                  to={`/template-category/${category.id}`}
                  className="block group h-full"
                >
                  <div className="flex h-full items-start p-6 rounded-2xl neo-glass transition-all duration-300 hover-lift">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mr-4 ${category.color}`}>
                      <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-xl font-medium text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                        {category.title}
                        <span className="text-sm text-gray-500 font-normal mr-2">({category.count} قالب)</span>
                      </h2>
                      <p className="text-gray-600">{category.description}</p>
                      
                      <div className="mt-4 flex items-center text-primary font-medium">
                        <span>مشاهده تمام قالب‌ها</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 rtl:rotate-180 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 rounded-2xl p-8 neo-glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-medium text-gray-800">درخواست قالب جدید</h2>
                <p className="text-gray-600 mt-2">
                  آیا قالب خاصی نیاز دارید که در لیست ما موجود نیست؟ درخواست خود را با ما در میان بگذارید.
                </p>
              </div>
              
              <div>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  ثبت درخواست
                  <ArrowLeft size={16} className="mr-2 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </EnhancedGradientBackground>
    </Layout>
  );
}
