
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { FileText, Download, Eye, ExternalLink, ArrowLeft } from 'lucide-react';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { EnhancedGradientBackground } from '@/components/ui/enhanced-gradient-background';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Define types for our templates
interface Template {
  id: string;
  title: string;
  format: string;
  downloads: number;
  thumbnail: string;
  fileUrl?: string;
}

interface CategoryData {
  title: string;
  description: string;
  templates: Template[];
  variant: 'purple' | 'blue' | 'green' | 'orange' | 'readings';
}

// Mock data for template categories
const categoryData: Record<string, CategoryData> = {
  'resume-templates': {
    title: 'قالب‌های رزومه فارسی',
    description: 'مجموعه قالب‌های حرفه‌ای رزومه به زبان فارسی با فرمت‌های مختلف',
    templates: [
      { id: 'modern-cv', title: 'رزومه مدرن فارسی', format: 'Word, PDF', downloads: 2450, thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/resume/modern-cv.docx' },
      { id: 'minimal-resume', title: 'رزومه مینیمال', format: 'Word, PDF', downloads: 1820, thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/resume/minimal-resume.docx' },
      { id: 'professional-cv', title: 'رزومه حرفه‌ای', format: 'Word, PDF, InDesign', downloads: 3100, thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/resume/professional-cv.docx' },
      { id: 'creative-portfolio', title: 'نمونه کار خلاقانه', format: 'PDF, PSD', downloads: 1250, thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/resume/creative-portfolio.pdf' },
      { id: 'academic-cv', title: 'رزومه آکادمیک', format: 'Word, LaTeX', downloads: 980, thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/resume/academic-cv.docx' },
      { id: 'entry-level', title: 'رزومه تازه‌کار', format: 'Word, PDF', downloads: 2200, thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/resume/entry-level.docx' },
    ],
    variant: 'purple'
  },
  'legal-contracts': {
    title: 'قراردادهای حقوقی فریلنسری',
    description: 'قراردادهای استاندارد برای فریلنسرها و کسب‌وکارهای مستقل در ایران',
    templates: [
      { id: 'freelance-agreement', title: 'قرارداد فریلنسری', format: 'Word, PDF', downloads: 3800, thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/legal/freelance-agreement.docx' },
      { id: 'nda-agreement', title: 'قرارداد عدم افشا', format: 'Word, PDF', downloads: 2100, thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/legal/nda-agreement.docx' },
      { id: 'service-agreement', title: 'قرارداد خدمات', format: 'Word, PDF', downloads: 1750, thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/legal/service-agreement.docx' },
      { id: 'consulting-agreement', title: 'قرارداد مشاوره', format: 'Word, PDF', downloads: 1300, thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/legal/consulting-agreement.docx' },
      { id: 'digital-rights', title: 'قرارداد حقوق دیجیتال', format: 'Word, PDF', downloads: 950, thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/legal/digital-rights.docx' },
    ],
    variant: 'blue'
  },
  'notion-templates': {
    title: 'قالب‌های فارسی نوشن',
    description: 'قالب‌های کاربردی نوشن به زبان فارسی برای مدیریت پروژه و بهره‌وری',
    templates: [
      { id: 'project-tracker', title: 'پیگیری پروژه', format: 'Notion', downloads: 1850, thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/notion/project-tracker.html' },
      { id: 'content-calendar', title: 'تقویم محتوا', format: 'Notion', downloads: 1420, thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/notion/content-calendar.html' },
      { id: 'client-management', title: 'مدیریت مشتریان', format: 'Notion', downloads: 1230, thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/notion/client-management.html' },
      { id: 'task-manager', title: 'مدیریت وظایف', format: 'Notion', downloads: 2100, thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/notion/task-manager.html' },
      { id: 'personal-dashboard', title: 'داشبورد شخصی', format: 'Notion', downloads: 1850, thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/notion/personal-dashboard.html' },
      { id: 'habit-tracker', title: 'پیگیری عادت‌ها', format: 'Notion', downloads: 1380, thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/notion/habit-tracker.html' },
    ],
    variant: 'green'
  },
  'business-documents': {
    title: 'اسناد تجاری قابل ویرایش',
    description: 'فاکتورها، پیشنهادها و سایر اسناد تجاری به زبان فارسی',
    templates: [
      { id: 'invoice-template', title: 'قالب فاکتور', format: 'Excel, Word, PDF', downloads: 4200, thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/business/invoice-template.xlsx' },
      { id: 'proposal-template', title: 'قالب پیشنهاد', format: 'Word, PDF, PowerPoint', downloads: 2850, thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/business/proposal-template.docx' },
      { id: 'quotation-template', title: 'قالب پیش‌فاکتور', format: 'Excel, Word', downloads: 3100, thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/business/quotation-template.xlsx' },
      { id: 'receipt-template', title: 'قالب رسید', format: 'Word, PDF', downloads: 2600, thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/business/receipt-template.docx' },
      { id: 'expense-report', title: 'گزارش هزینه', format: 'Excel', downloads: 1950, thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/business/expense-report.xlsx' },
      { id: 'budget-planner', title: 'برنامه‌ریز بودجه', format: 'Excel', downloads: 1730, thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', fileUrl: '/templates/business/budget-planner.xlsx' },
    ],
    variant: 'orange'
  }
};

export default function TemplateCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? categoryData[categoryId] : null;

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

  // Convert the variant to a valid type
  const backgroundVariant = (
    category.variant === 'purple' || 
    category.variant === 'blue' || 
    category.variant === 'green' || 
    category.variant === 'orange' || 
    category.variant === 'readings'
  ) ? category.variant : 'default';

  const handleDownload = (templateId: string) => {
    // Find the template
    const template = category.templates.find(t => t.id === templateId);
    if (template && template.fileUrl) {
      // In a real application, you would initiate download from the actual file
      // For this demo, we're just showing a success message
      toast({
        title: "فایل در حال دانلود",
        description: `دانلود ${template.title} آغاز شد.`,
      });
      
      // Increment download count (in a real app, this would be handled by a backend)
      setTimeout(() => {
        toast({
          title: "دانلود تکمیل شد",
          description: "فایل با موفقیت دانلود شد.",
        });
      }, 1500);
    }
  };

  return (
    <Layout backUrl="/all-templates">
      <SeoHead 
        title={`${category.title} | قالب‌های اسناد فارسی | لنگر`}
        description={category.description}
        keywords={`${category.title}, قالب فارسی, دانلود رایگان, فایل قابل ویرایش, لنگر`}
      />
      
      <EnhancedGradientBackground variant={backgroundVariant} className="min-h-full">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="rounded-3xl p-8 mb-10 neo-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{category.title}</h1>
            <p className="text-gray-600 max-w-3xl mb-4">{category.description}</p>
            
            <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500">
              <div className="bg-white/50 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-white/30">
                {category.templates.length} قالب
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-white/30">
                قابل دانلود رایگان
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-white/30">
                به‌روزرسانی: اردیبهشت ۱۴۰۴
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.templates.map((template, index) => (
              <TemplateCard 
                key={template.id}
                id={template.id}
                title={template.title}
                format={template.format}
                downloads={template.downloads}
                thumbnail={template.thumbnail}
                index={index}
                onDownload={() => handleDownload(template.id)}
              />
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
                <h2 className="text-xl font-medium text-gray-800">نیاز به قالب دیگری دارید؟</h2>
                <p className="text-gray-600 mt-2">
                  اگر قالب مورد نظر خود را پیدا نکرده‌اید، درخواست خود را با ما در میان بگذارید.
                </p>
              </div>
              
              <div>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  ثبت درخواست قالب جدید
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
