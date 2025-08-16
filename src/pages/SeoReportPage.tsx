import React from 'react';
import { Layout } from '@/components/Layout';
import { SeoReport } from '@/components/reports/SeoReport';
import { SeoHead } from '@/components/seo/SeoHead';
import { rumiSeoContent } from '@/data/rumi-seo-content';

const SeoReportPage = () => {
  return (
    <Layout>
      <SeoHead 
        title="گزارش سئو وب‌سایت لنگر - تحلیل و بهینه‌سازی"
        description="گزارش کامل وضعیت سئو وب‌سایت لنگر، تحلیل نقاط قوت و ضعف، و پیشنهادات بهبود"
        keywords="گزارش سئو, بهینه‌سازی وب‌سایت, تحلیل سئو, لنگر"
        noindex={true}
      />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">گزارش سئو وب‌سایت</h1>
        <p className="text-gray-600 text-sm">تحلیل کامل وضعیت سئو و پیشنهادات بهبود</p>
      </div>
      
      <div className="space-y-8">
        {/* Rumi Tool SEO Report */}
        <SeoReport
          toolName="استخاره با مولانا"
          title={rumiSeoContent.title}
          description={rumiSeoContent.description}
          content={`
            ${rumiSeoContent.description}
            ${rumiSeoContent.benefits.join(' ')}
            ${rumiSeoContent.howToUse.map(step => step.instruction).join(' ')}
            ${rumiSeoContent.faq.map(faq => `${faq.question} ${faq.answer}`).join(' ')}
          `}
          keywords={rumiSeoContent.keywords.split(', ')}
        />
        
        {/* General Website SEO Report */}
        <SeoReport
          toolName="وب‌سایت لنگر (کلی)"
          title="لنگر - ابزارهای آنلاین رایگان فارسی"
          description="مجموعه کامل ابزارهای آنلاین رایگان فارسی شامل فال و طالع‌بینی، ابزارهای متن، تبدیل واحد و بیش از 16 ابزار کاربردی دیگر"
          content="لنگر بزرگترین مجموعه ابزارهای آنلاین رایگان فارسی است. ما ابزارهای متنوعی در زمینه فال و طالع‌بینی، پردازش متن، تبدیل واحدها و موارد دیگر ارائه می‌دهیم. تمام ابزارها رایگان، سریع و بدون نیاز به ثبت‌نام هستند."
          keywords={['لنگر', 'ابزار آنلاین', 'رایگان', 'فارسی', 'فال', 'طالع‌بینی', 'تبدیل واحد', 'پردازش متن']}
        />
      </div>
    </Layout>
  );
};

export default SeoReportPage;