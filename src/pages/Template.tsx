
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { Download, Calendar, FileText, Eye, ExternalLink, Check, ArrowLeft } from 'lucide-react';
import { EnhancedGradientBackground } from '@/components/ui/enhanced-gradient-background';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Mock data for templates
const templateData = {
  'modern-cv': {
    title: 'قالب رزومه مدرن فارسی',
    category: 'resume-templates',
    categoryTitle: 'قالب‌های رزومه فارسی',
    description: 'یک قالب رزومه مدرن و حرفه‌ای به زبان فارسی با طراحی تمیز و خوانا برای معرفی تخصص‌ها و تجربیات شما',
    formats: ['Word', 'PDF'],
    downloads: 2450,
    preview: 'https://via.placeholder.com/600x800',
    thumbnail: 'https://via.placeholder.com/300x400',
    lastUpdate: '۱۵ فروردین ۱۴۰۴',
    fileSize: '۲.۵ مگابایت',
    variant: 'purple',
    features: [
      'طراحی مدرن و حرفه‌ای',
      'قابل ویرایش در Word',
      'فونت‌های فارسی استاندارد',
      'بخش‌بندی منظم اطلاعات',
      'بخش مهارت‌ها با نمودار',
      'سازگار با چاپ'
    ]
  },
  // Add other templates as needed
};

export default function Template() {
  const { slug } = useParams<{ slug: string }>();
  const template = slug ? templateData[slug as keyof typeof templateData] : null;

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

  return (
    <Layout backUrl={`/template-category/${template.category}`}>
      <SeoHead 
        title={`${template.title} | دانلود رایگان | لنگر`}
        description={template.description}
        keywords={`${template.title}, قالب فارسی, دانلود رایگان, فایل قابل ویرایش, لنگر, ${template.categoryTitle}`}
      />
      
      <EnhancedGradientBackground variant={template.variant || 'default'}>
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
                  <img 
                    src={template.preview} 
                    alt={template.title}
                    className="w-full h-auto hover:opacity-90 transition-opacity"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-2">
                  <img 
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
                <a 
                  href="#download" 
                  className="inline-block w-full py-3 px-6 bg-primary text-white font-medium rounded-lg text-center hover:bg-primary/90 transition-colors duration-300 hover:shadow-lg"
                >
                  <Download className="inline-block ml-2" size={20} />
                  دانلود رایگان
                </a>
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
                    
                    <a 
                      href={`#download-${format.toLowerCase()}`}
                      className="py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-300 flex items-center hover:shadow-sm"
                    >
                      <Download size={18} className="ml-1.5" />
                      دانلود
                    </a>
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
