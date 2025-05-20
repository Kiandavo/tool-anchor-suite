
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { Download, Calendar, FileText, Eye, ExternalLink, Check, ArrowLeft } from 'lucide-react';
import { EnhancedGradientBackground } from '@/components/ui/enhanced-gradient-background';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Types for our template data
interface TemplateData {
  title: string;
  category: string;
  categoryTitle: string;
  description: string;
  formats: string[];
  downloads: number;
  preview: string;
  thumbnail: string;
  lastUpdate: string;
  fileSize: string;
  variant: 'purple' | 'blue' | 'green' | 'orange' | 'readings';
  features: string[];
  fileUrl?: string;
}

// Mock data for templates
const templateData: Record<string, TemplateData> = {
  'modern-cv': {
    title: 'قالب رزومه مدرن فارسی',
    category: 'resume-templates',
    categoryTitle: 'قالب‌های رزومه فارسی',
    description: 'یک قالب رزومه مدرن و حرفه‌ای به زبان فارسی با طراحی تمیز و خوانا برای معرفی تخصص‌ها و تجربیات شما',
    formats: ['Word', 'PDF'],
    downloads: 2450,
    preview: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    lastUpdate: '۱۵ فروردین ۱۴۰۴',
    fileSize: '۲.۵ مگابایت',
    variant: 'purple',
    fileUrl: '/templates/resume/modern-cv.docx',
    features: [
      'طراحی مدرن و حرفه‌ای',
      'قابل ویرایش در Word',
      'فونت‌های فارسی استاندارد',
      'بخش‌بندی منظم اطلاعات',
      'بخش مهارت‌ها با نمودار',
      'سازگار با چاپ'
    ]
  },
  'freelance-agreement': {
    title: 'قرارداد فریلنسری',
    category: 'legal-contracts',
    categoryTitle: 'قراردادهای حقوقی فریلنسری',
    description: 'قالب استاندارد قرارداد فریلنسری با بندهای حقوقی لازم برای حفاظت از حقوق فریلنسرها و کارفرمایان',
    formats: ['Word', 'PDF'],
    downloads: 3800,
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    lastUpdate: '۱۰ اردیبهشت ۱۴۰۴',
    fileSize: '۳.۲ مگابایت',
    variant: 'blue',
    fileUrl: '/templates/legal/freelance-agreement.docx',
    features: [
      'مطابق با قوانین کار ایران',
      'بندهای حفاظت از مالکیت فکری',
      'توضیحات کامل برای هر بند',
      'قابل ویرایش در Word',
      'فونت‌های فارسی استاندارد',
      'بخش تعیین شرایط پرداخت'
    ]
  },
  'project-tracker': {
    title: 'قالب پیگیری پروژه نوشن',
    category: 'notion-templates',
    categoryTitle: 'قالب‌های فارسی نوشن',
    description: 'قالب حرفه‌ای برای مدیریت و پیگیری پروژه‌ها در نوشن با ویژگی‌های پیشرفته و قابل شخصی‌سازی',
    formats: ['Notion'],
    downloads: 1850,
    preview: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    lastUpdate: '۵ خرداد ۱۴۰۴',
    fileSize: '۱.۱ مگابایت',
    variant: 'green',
    fileUrl: '/templates/notion/project-tracker.html',
    features: [
      'داشبورد مدیریت پروژه',
      'قابلیت پیگیری وظایف',
      'نمودار گانت تعبیه شده',
      'بخش مدیریت تیم',
      'قابلیت اتصال به تقویم',
      'گزارش‌گیری پیشرفته'
    ]
  },
  'invoice-template': {
    title: 'قالب فاکتور فارسی',
    category: 'business-documents',
    categoryTitle: 'اسناد تجاری قابل ویرایش',
    description: 'قالب حرفه‌ای فاکتور فارسی با محاسبات خودکار و طراحی زیبا برای کسب‌وکارها و فریلنسرها',
    formats: ['Excel', 'Word', 'PDF'],
    downloads: 4200,
    preview: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    lastUpdate: '۲۰ اردیبهشت ۱۴۰۴',
    fileSize: '۲.۸ مگابایت',
    variant: 'orange',
    fileUrl: '/templates/business/invoice-template.xlsx',
    features: [
      'محاسبه خودکار مالیات بر ارزش افزوده',
      'طراحی حرفه‌ای و مدرن',
      'قابلیت درج لوگو',
      'فرمت‌های مختلف قابل استفاده',
      'مطابق با استانداردهای حسابداری',
      'قابلیت چاپ با کیفیت بالا'
    ]
  },
};

export default function Template() {
  const { slug } = useParams<{ slug: string }>();
  const template = slug ? templateData[slug] : null;
  const [downloading, setDownloading] = useState<string | null>(null);

  if (!template) {
    return (
      <Layout backUrl="/all-templates">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">قالب یافت نشد</h1>
          <p className="text-gray-600 mb-6">متاسفانه قالب مورد نظر شما در سیستم موجود نیست.</p>
          <Link to="/all-templates" className="text-primary hover:underline">بازگشت به صفحه قالب‌ها</Link>
        </div>
      </Layout>
    );
  }

  // Convert the variant to a valid type or use default
  const backgroundVariant = (
    template.variant === 'purple' || 
    template.variant === 'blue' || 
    template.variant === 'green' || 
    template.variant === 'orange' || 
    template.variant === 'readings' 
  ) ? template.variant : 'default';

  // Handle download with feedback
  const handleDownload = (format: string) => {
    setDownloading(format);
    
    // Simulate download process
    toast({
      title: "فایل در حال دانلود",
      description: `دانلود ${template.title} با فرمت ${format} آغاز شد.`,
    });
    
    // Simulate download completion
    setTimeout(() => {
      setDownloading(null);
      toast({
        title: "دانلود تکمیل شد",
        description: "فایل با موفقیت دانلود شد.",
      });
    }, 1500);
  };

  return (
    <Layout backUrl={`/template-category/${template.category}`}>
      <SeoHead 
        title={`${template.title} | دانلود رایگان | لنگر`}
        description={template.description}
        keywords={`${template.title}, قالب فارسی, دانلود رایگان, فایل قابل ویرایش, لنگر, ${template.categoryTitle}`}
      />
      
      <EnhancedGradientBackground variant={backgroundVariant}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/80 neo-glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Dialog>
                <DialogTrigger className="w-full cursor-zoom-in">
                  <OptimizedImage 
                    src={template.preview} 
                    alt={template.title}
                    className="w-full h-auto hover:opacity-90 transition-opacity"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-2">
                  <OptimizedImage 
                    src={template.preview} 
                    alt={template.title}
                    className="w-full h-auto"
                  />
                </DialogContent>
              </Dialog>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold text-gray-800">{template.title}</h1>
              <p className="text-gray-600">{template.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="neo-glass">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">فرمت‌های فایل</div>
                    <div className="font-medium">{template.formats.join('، ')}</div>
                  </CardContent>
                </Card>
                
                <Card className="neo-glass">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">تعداد دانلود</div>
                    <div className="font-medium">{template.downloads.toLocaleString()}</div>
                  </CardContent>
                </Card>
                
                <Card className="neo-glass">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">حجم فایل</div>
                    <div className="font-medium">{template.fileSize}</div>
                  </CardContent>
                </Card>
                
                <Card className="neo-glass">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">آخرین به‌روزرسانی</div>
                    <div className="font-medium">{template.lastUpdate}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100/80">
                <h3 className="font-medium mb-3">ویژگی‌های قالب</h3>
                <ul className="space-y-2">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-5 h-5 mr-2 rounded-full bg-green-100 flex items-center justify-center">
                        <Check size={12} className="text-green-600" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={() => handleDownload(template.formats[0])}
                  className="w-full py-3 px-6 bg-primary text-white font-medium rounded-lg text-center hover:bg-primary/90 transition-colors duration-300 hover:shadow-lg"
                  disabled={downloading !== null}
                >
                  <Download className="inline-block ml-2" size={20} />
                  {downloading 
                    ? `در حال دانلود...` 
                    : `دانلود رایگان`
                  }
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-700 text-sm">
                <p>تمامی قالب‌های ما به صورت رایگان قابل دانلود و استفاده هستند. لطفاً نام لنگر را در استفاده‌های خود ذکر کنید.</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            id="download" 
            className="mt-12 neo-glass rounded-2xl p-8" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">دانلود {template.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {template.formats.map((format, index) => (
                <motion.div 
                  key={format} 
                  className="border border-gray-200 rounded-lg p-5 bg-white/70 backdrop-blur-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText size={24} className="text-gray-400 ml-3" />
                      <div>
                        <h3 className="font-medium text-gray-800">{template.title}</h3>
                        <p className="text-sm text-gray-500">فرمت {format}</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleDownload(format)}
                      className="py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-300 flex items-center hover:shadow-sm"
                      variant="ghost"
                      disabled={downloading === format}
                    >
                      {downloading === format ? (
                        <div className="flex items-center">
                          <span className="animate-pulse">در حال دانلود...</span>
                        </div>
                      ) : (
                        <>
                          <Download size={18} className="ml-1.5" />
                          دانلود
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-gray-500 mb-4">برای دانلود سایر قالب‌های {template.categoryTitle}:</p>
              <Link 
                to={`/template-category/${template.category}`}
                className="inline-flex items-center py-2 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-300"
              >
                <Eye size={18} className="ml-1.5" />
                مشاهده تمام قالب‌ها
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-10 rounded-2xl p-6 neo-glass"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">نحوه استفاده از قالب</h3>
            <ol className="space-y-3 text-gray-600 list-decimal pr-5">
              <li>فایل مورد نظر را دانلود کنید.</li>
              <li>برای فایل‌های Word، آن را با نرم‌افزار Microsoft Word یا برنامه‌های مشابه باز کنید.</li>
              <li>اطلاعات خود را جایگزین متن‌های نمونه کنید.</li>
              <li>تصاویر را با تصاویر شخصی خود جایگزین کنید.</li>
              <li>پس از اعمال تغییرات، فایل را در فرمت مورد نظر خود ذخیره کنید.</li>
            </ol>
          </motion.div>
        </div>
      </EnhancedGradientBackground>
    </Layout>
  );
}
