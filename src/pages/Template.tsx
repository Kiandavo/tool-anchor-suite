
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { Download, Calendar, FileText, Eye, ExternalLink } from 'lucide-react';

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
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={template.preview} 
              alt={template.title}
              className="w-full h-auto"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{template.title}</h1>
            <p className="text-gray-600">{template.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">فرمت‌های فایل</div>
                <div className="font-medium">{template.formats.join('، ')}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">تعداد دانلود</div>
                <div className="font-medium">{template.downloads.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">حجم فایل</div>
                <div className="font-medium">{template.fileSize}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">آخرین به‌روزرسانی</div>
                <div className="font-medium">{template.lastUpdate}</div>
              </div>
            </div>
            
            <div className="pt-4">
              <a 
                href="#download" 
                className="inline-block w-full py-3 px-6 bg-primary text-white font-medium rounded-lg text-center hover:bg-primary/90 transition-colors duration-300"
              >
                <Download className="inline-block ml-2" size={20} />
                دانلود رایگان
              </a>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-700 text-sm">
              <p>تمامی قالب‌های ما به صورت رایگان قابل دانلود و استفاده هستند. لطفاً نام لنگر را در استفاده‌های خود ذکر کنید.</p>
            </div>
          </div>
        </div>
        
        <div id="download" className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">دانلود {template.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {template.formats.map((format) => (
              <div key={format} className="border border-gray-200 rounded-lg p-5">
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
                    className="py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-300 flex items-center"
                  >
                    <Download size={18} className="ml-1.5" />
                    دانلود
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">برای دانلود سایر قالب‌های {template.categoryTitle}:</p>
            <Link 
              to={`/template-category/${template.category}`}
              className="inline-flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-300"
            >
              <Eye size={18} className="ml-1.5" />
              مشاهده تمام قالب‌ها
            </Link>
          </div>
        </div>
        
        <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">نحوه استفاده از قالب</h3>
          <ol className="space-y-3 text-gray-600 list-decimal pr-5">
            <li>فایل مورد نظر را دانلود کنید.</li>
            <li>برای فایل‌های Word، آن را با نرم‌افزار Microsoft Word یا برنامه‌های مشابه باز کنید.</li>
            <li>اطلاعات خود را جایگزین متن‌های نمونه کنید.</li>
            <li>تصاویر را با تصاویر شخصی خود جایگزین کنید.</li>
            <li>پس از اعمال تغییرات، فایل را در فرمت مورد نظر خود ذخیره کنید.</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
