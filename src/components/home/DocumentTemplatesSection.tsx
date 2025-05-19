
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, FileCode, FileDigit, FilePen } from 'lucide-react';
import { motion } from 'framer-motion';

const templateCategories = [
  {
    id: 'resume-templates',
    title: 'قالب‌های رزومه فارسی',
    description: 'مجموعه قالب‌های حرفه‌ای رزومه به زبان فارسی با فرمت‌های مختلف',
    icon: FileText,
    color: 'bg-gradient-to-br from-purple-100/80 to-purple-300/80',
    iconColor: 'text-purple-600',
  },
  {
    id: 'legal-contracts',
    title: 'قراردادهای حقوقی فریلنسری',
    description: 'قراردادهای استاندارد برای فریلنسرها و کسب‌وکارهای مستقل در ایران',
    icon: FileCode,
    color: 'bg-gradient-to-br from-blue-100/80 to-blue-300/80',
    iconColor: 'text-blue-600',
  },
  {
    id: 'notion-templates',
    title: 'قالب‌های فارسی نوشن',
    description: 'قالب‌های کاربردی نوشن به زبان فارسی برای مدیریت پروژه و بهره‌وری',
    icon: FileDigit,
    color: 'bg-gradient-to-br from-green-100/80 to-green-300/80',
    iconColor: 'text-green-600',
  },
  {
    id: 'business-documents',
    title: 'اسناد تجاری قابل ویرایش',
    description: 'فاکتورها، پیشنهادها و سایر اسناد تجاری به زبان فارسی',
    icon: FilePen,
    color: 'bg-gradient-to-br from-orange-100/80 to-orange-300/80',
    iconColor: 'text-orange-600',
  }
];

export const DocumentTemplatesSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">قالب‌های اسناد فارسی</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            مجموعه قالب‌های حرفه‌ای فارسی برای رزومه، قراردادها، اسناد تجاری و قالب‌های نوشن 
            برای تسهیل کار فریلنسرها و کسب‌وکارهای ایرانی
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templateCategories.map((category) => (
            <motion.div
              key={category.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * templateCategories.indexOf(category) }}
            >
              <Link 
                to={`/category/${category.id}`} 
                className="block rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="h-full flex flex-col rounded-3xl border border-white/40 backdrop-blur-sm neo-glass">
                  <div className={`flex items-center justify-center py-6 ${category.color}`}>
                    <category.icon className={`w-12 h-12 ${category.iconColor}`} />
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600 flex-1">{category.description}</p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">۱۰+ قالب موجود</span>
                      <span className="text-primary text-sm font-medium">مشاهده &larr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/all-templates" className="inline-flex items-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all duration-300">
            مشاهده تمام قالب‌ها
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
