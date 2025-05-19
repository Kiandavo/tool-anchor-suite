
import React from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { FileText, FileCode, FileDigit, FilePen } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-violet-100/80 to-indigo-100/80 rounded-3xl p-8 mb-10 border border-white/40 backdrop-blur-sm shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">قالب‌های اسناد فارسی</h1>
          <p className="text-gray-600 max-w-3xl">
            مجموعه قالب‌های حرفه‌ای فارسی برای رزومه، قراردادها، اسناد تجاری و قالب‌های نوشن 
            برای تسهیل کار فریلنسرها و کسب‌وکارهای ایرانی. تمام قالب‌ها به صورت رایگان قابل دانلود و ویرایش هستند.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templateCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/template-category/${category.id}`}
              className="block group"
            >
              <div className="flex items-start p-6 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white/70 shadow-sm hover:shadow-md transition-all duration-300">
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
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-medium text-gray-800 mb-4">درخواست قالب جدید</h2>
          <p className="text-gray-600 mb-4">
            آیا قالب خاصی نیاز دارید که در لیست ما موجود نیست؟ درخواست خود را با ما در میان بگذارید.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-300"
          >
            ثبت درخواست
          </Link>
        </div>
      </div>
    </Layout>
  );
}
