
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { tools } from '@/data/tools';
import { ToolRenderer } from '@/components/tool/ToolRenderer';
import { SeoHead } from '@/components/seo/SeoHead';

export default function Tool() {
  const { slug } = useParams<{ slug: string }>();
  const tool = tools.find(t => t.slug === slug);

  // Generate SEO metadata for this specific tool
  const seoData = useMemo(() => {
    if (!tool) {
      return {
        title: 'ابزار یافت نشد | لنگر',
        description: 'متاسفانه ابزار مورد نظر شما در سیستم وجود ندارد.',
        keywords: 'ابزار آنلاین, لنگر'
      };
    }

    // Default SEO data
    let seoTitle = `${tool.name} | ابزار آنلاین لنگر`;
    let seoDescription = tool.description;
    let seoKeywords = `${tool.name}, ابزار آنلاین, لنگر, ${tool.description}`;
    
    // Enhanced SEO for Persian cultural tools
    if (tool.category === 'persian-cultural') {
      switch (tool.slug) {
        case 'persian-calendar':
          seoTitle = 'تبدیل تاریخ شمسی، میلادی و قمری | ابزار تقویم فارسی';
          seoDescription = 'ابزار آنلاین تبدیل تاریخ بین تقویم‌های شمسی، قمری و میلادی. محاسبه دقیق تبدیل تاریخ با امکان نمایش مناسبت‌ها و تعطیلات رسمی.';
          seoKeywords = 'تبدیل تاریخ, تقویم شمسی, تقویم میلادی, تقویم قمری, تبدیل شمسی به میلادی, مناسبت‌ها, تعطیلات رسمی ایران, محاسبه تاریخ';
          break;
        case 'persian-names':
          seoTitle = 'معانی نام‌های ایرانی | فرهنگ نام‌های پسر و دختر ایرانی';
          seoDescription = 'جستجو و مشاهده معنی، ریشه و تاریخچه نام‌های فارسی و ایرانی. فرهنگ کامل نام‌های دختر و پسر ایرانی با معانی دقیق.';
          seoKeywords = 'معانی نام‌های ایرانی, نام‌های فارسی, معنی اسم, نام دختر ایرانی, نام پسر ایرانی, ریشه نام‌های فارسی, فرهنگ نام‌ها, معنی اسم‌های ایرانی';
          break;
        case 'persian-proverbs':
          seoTitle = 'ضرب‌المثل‌های فارسی با معنی | فرهنگ ضرب المثل‌های ایرانی';
          seoDescription = 'مجموعه کامل ضرب‌المثل‌های فارسی همراه با معنی، ریشه و کاربرد. بیش از ۱۰۰ ضرب المثل ایرانی با ترجمه انگلیسی.';
          seoKeywords = 'ضرب المثل فارسی, ضرب المثل ایرانی با معنی, معنی ضرب المثل‌ها, ضرب المثل با ترجمه انگلیسی, فرهنگ ضرب المثل, اصطلاحات فارسی';
          break;
        case 'persian-handwriting':
          seoTitle = 'تمرین خوشنویسی فارسی | تولید صفحات خوشنویسی آنلاین';
          seoDescription = 'ابزار تولید صفحات تمرین برای خوشنویسی فارسی. یادگیری و تمرین خطاطی فارسی با خطوط نستعلیق، شکسته، نسخ و ثلث.';
          seoKeywords = 'خوشنویسی فارسی, خطاطی, تمرین خوشنویسی, خط نستعلیق, صفحات تمرین خطاطی, آموزش خوشنویسی, هنر ایرانی';
          break;
        case 'word-etymology':
          seoTitle = 'ریشه‌شناسی کلمات فارسی | فرهنگ ریشه‌یابی واژگان ایرانی';
          seoDescription = 'بررسی ریشه و تاریخچه کلمات فارسی. جستجو و مطالعه ریشه‌شناسی واژگان ایرانی و سیر تحول آنها در طول تاریخ.';
          seoKeywords = 'ریشه‌شناسی کلمات فارسی, ریشه‌یابی واژگان, اتیمولوژی فارسی, تاریخچه کلمات, زبان‌شناسی, واژه‌شناسی, فرهنگ ریشه‌یابی';
          break;
        case 'farsi-learning':
          seoTitle = 'آموزش زبان فارسی برای انگلیسی زبانان | Learn Farsi for English speakers';
          seoDescription = 'آموزش آنلاین زبان فارسی برای انگلیسی زبان‌ها. یادگیری الفبای فارسی، جملات پرکاربرد، گرامر و تلفظ صحیح کلمات.';
          seoKeywords = 'آموزش زبان فارسی, learn Persian, Farsi for beginners, الفبای فارسی, Persian alphabet, جملات پرکاربرد فارسی, common Farsi phrases, گرامر زبان فارسی';
          break;
      }
    }

    // Create schema.org structured data
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": tool.name,
      "description": seoDescription,
      "url": `https://langar.co/tool/${tool.slug}`,
      "applicationCategory": "UtilityApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "operatingSystem": "Any",
      "inLanguage": "fa-IR",
      "isPartOf": {
        "@type": "WebSite",
        "name": "لنگر - ابزارهای آنلاین",
        "url": "https://langar.co"
      }
    };

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywords,
      schema
    };
  }, [tool, slug]);

  if (!tool) {
    return (
      <Layout backUrl="/" showSearch={false}>
        <SeoHead 
          title={seoData.title} 
          description={seoData.description} 
          keywords={seoData.keywords}
        />
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ابزار یافت نشد</h1>
          <p className="text-gray-600">ابزار مورد نظر شما در سیستم وجود ندارد.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout backUrl="/" showSearch={false}>
      <SeoHead 
        title={seoData.title} 
        description={seoData.description} 
        keywords={seoData.keywords}
        schema={seoData.schema}
      />
      <div className="max-w-2xl mx-auto py-6">
        <h1 className="text-2xl font-bold text-primary mb-4">{tool.name}</h1>
        <p className="mb-6 text-muted-foreground">{tool.description}</p>
        <ToolRenderer tool={tool} slug={tool.slug} />
      </div>
    </Layout>
  );
}
