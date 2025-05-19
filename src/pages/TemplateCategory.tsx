
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { FileText, Download, Eye, ExternalLink } from 'lucide-react';

// Mock data for template categories
const categoryData = {
  'resume-templates': {
    title: 'قالب‌های رزومه فارسی',
    description: 'مجموعه قالب‌های حرفه‌ای رزومه به زبان فارسی با فرمت‌های مختلف',
    templates: [
      { id: 'modern-cv', title: 'رزومه مدرن فارسی', format: 'Word, PDF', downloads: 2450, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'minimal-resume', title: 'رزومه مینیمال', format: 'Word, PDF', downloads: 1820, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'professional-cv', title: 'رزومه حرفه‌ای', format: 'Word, PDF, InDesign', downloads: 3100, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'creative-portfolio', title: 'نمونه کار خلاقانه', format: 'PDF, PSD', downloads: 1250, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'academic-cv', title: 'رزومه آکادمیک', format: 'Word, LaTeX', downloads: 980, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'entry-level', title: 'رزومه تازه‌کار', format: 'Word, PDF', downloads: 2200, thumbnail: 'https://via.placeholder.com/300x400' },
    ]
  },
  'legal-contracts': {
    title: 'قراردادهای حقوقی فریلنسری',
    description: 'قراردادهای استاندارد برای فریلنسرها و کسب‌وکارهای مستقل در ایران',
    templates: [
      { id: 'freelance-agreement', title: 'قرارداد فریلنسری', format: 'Word, PDF', downloads: 3800, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'nda-agreement', title: 'قرارداد عدم افشا', format: 'Word, PDF', downloads: 2100, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'service-agreement', title: 'قرارداد خدمات', format: 'Word, PDF', downloads: 1750, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'consulting-agreement', title: 'قرارداد مشاوره', format: 'Word, PDF', downloads: 1300, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'digital-rights', title: 'قرارداد حقوق دیجیتال', format: 'Word, PDF', downloads: 950, thumbnail: 'https://via.placeholder.com/300x400' },
    ]
  },
  'notion-templates': {
    title: 'قالب‌های فارسی نوشن',
    description: 'قالب‌های کاربردی نوشن به زبان فارسی برای مدیریت پروژه و بهره‌وری',
    templates: [
      { id: 'project-tracker', title: 'پیگیری پروژه', format: 'Notion', downloads: 1850, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'content-calendar', title: 'تقویم محتوا', format: 'Notion', downloads: 1420, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'client-management', title: 'مدیریت مشتریان', format: 'Notion', downloads: 1230, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'task-manager', title: 'مدیریت وظایف', format: 'Notion', downloads: 2100, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'personal-dashboard', title: 'داشبورد شخصی', format: 'Notion', downloads: 1850, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'habit-tracker', title: 'پیگیری عادت‌ها', format: 'Notion', downloads: 1380, thumbnail: 'https://via.placeholder.com/300x400' },
    ]
  },
  'business-documents': {
    title: 'اسناد تجاری قابل ویرایش',
    description: 'فاکتورها، پیشنهادها و سایر اسناد تجاری به زبان فارسی',
    templates: [
      { id: 'invoice-template', title: 'قالب فاکتور', format: 'Excel, Word, PDF', downloads: 4200, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'proposal-template', title: 'قالب پیشنهاد', format: 'Word, PDF, PowerPoint', downloads: 2850, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'quotation-template', title: 'قالب پیش‌فاکتور', format: 'Excel, Word', downloads: 3100, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'receipt-template', title: 'قالب رسید', format: 'Word, PDF', downloads: 2600, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'expense-report', title: 'گزارش هزینه', format: 'Excel', downloads: 1950, thumbnail: 'https://via.placeholder.com/300x400' },
      { id: 'budget-planner', title: 'برنامه‌ریز بودجه', format: 'Excel', downloads: 1730, thumbnail: 'https://via.placeholder.com/300x400' },
    ]
  }
};

export default function TemplateCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? categoryData[categoryId as keyof typeof categoryData] : null;

  if (!category) {
    return (
      <Layout backUrl="/all-templates">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">دسته‌بندی یافت نشد</h1>
          <p className="text-gray-600 mb-6">متاسفانه دسته‌بندی مورد نظر شما در سیستم موجود نیست.</p>
          <Link to="/all-templates" className="text-primary hover:underline">بازگشت به صفحه قالب‌ها</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout backUrl="/all-templates">
      <SeoHead 
        title={`${category.title} | قالب‌های اسناد فارسی | لنگر`}
        description={category.description}
        keywords={`${category.title}, قالب فارسی, دانلود رایگان, فایل قابل ویرایش, لنگر`}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 mb-10 border border-white/40 backdrop-blur-sm shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{category.title}</h1>
          <p className="text-gray-600 max-w-3xl mb-4">{category.description}</p>
          
          <div className="flex items-center text-sm text-gray-500">
            <span>{category.templates.length} قالب</span>
            <span className="mx-2">•</span>
            <span>قابل دانلود رایگان</span>
            <span className="mx-2">•</span>
            <span>به‌روزرسانی: اردیبهشت ۱۴۰۴</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.templates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="relative aspect-[3/4] bg-gray-100">
                <img 
                  src={template.thumbnail} 
                  alt={template.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{template.title}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{template.format}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Download size={14} className="mr-1" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Link 
                    to={`/template/${template.id}`}
                    className="flex items-center justify-center flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors duration-200 text-sm"
                  >
                    <Eye size={16} className="ml-1.5" />
                    پیش‌نمایش
                  </Link>
                  
                  <Link 
                    to={`/template/${template.id}/download`}
                    className="flex items-center justify-center flex-1 py-2 px-3 bg-primary/10 hover:bg-primary/20 rounded-md text-primary transition-colors duration-200 text-sm"
                  >
                    <Download size={16} className="ml-1.5" />
                    دانلود
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
