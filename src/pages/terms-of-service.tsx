import React from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';

const TermsOfService = () => {
  return (
    <Layout>
      <SeoHead 
        title="شرایط استفاده - لنگر"
        description="شرایط و قوانین استفاده از وب‌سایت و ابزارهای آنلاین لنگر"
        canonical="https://laangar.com/terms-of-service"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">شرایط استفاده از خدمات</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">پذیرش شرایط</h2>
            <p className="text-muted-foreground leading-relaxed">
              با استفاده از وب‌سایت لنگر (laangar.com)، شما این شرایط و قوانین را می‌پذیرید. 
              اگر با این شرایط موافق نیستید، لطفاً از استفاده از خدمات خودداری کنید.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">خدمات ارائه شده</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>لنگر ابزارهای آنلاین رایگان در زمینه‌های زیر ارائه می‌دهد:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>ابزارهای محاسباتی (محاسبه‌گر بیمه، وام، سود و زیان)</li>
                <li>ابزارهای متنی (تبدیل حروف، شمارش کلمات)</li>
                <li>ابزارهای تصویری (تغییر اندازه، فیلتر)</li>
                <li>ابزارهای فرهنگی ایرانی (فال، طالع‌بینی)</li>
                <li>ابزارهای سئو و طراحی</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">قوانین استفاده</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">مجاز:</h3>
              <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
                <li>استفاده شخصی و تجاری از ابزارها</li>
                <li>اشتراک‌گذاری لینک‌های ابزارها</li>
                <li>دانلود نتایج تولید شده</li>
                <li>استفاده از API در صورت موجود بودن</li>
              </ul>
              
              <h3 className="text-xl font-medium">غیرمجاز:</h3>
              <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
                <li>کپی‌برداری از کدها و طراحی وب‌سایت</li>
                <li>استفاده برای اهداف غیرقانونی</li>
                <li>تلاش برای هک یا نفوذ به سیستم</li>
                <li>ارسال محتوای مضر، ویروس یا بدافزار</li>
                <li>ایجاد بار اضافی روی سرورها</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">مسئولیت‌ها</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">مسئولیت وب‌سایت:</h3>
              <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
                <li>ارائه ابزارهای کاربردی و دقیق</li>
                <li>حفظ حریم خصوصی کاربران</li>
                <li>به‌روزرسانی منظم ابزارها</li>
                <li>پشتیبانی فنی در حد امکان</li>
              </ul>
              
              <h3 className="text-xl font-medium">مسئولیت کاربر:</h3>
              <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
                <li>تأیید صحت اطلاعات ورودی</li>
                <li>بررسی نتایج قبل از استفاده نهایی</li>
                <li>رعایت قوانین کشور و بین‌المللی</li>
                <li>عدم سوء استفاده از خدمات</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">دقت اطلاعات</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800">
                <strong>هشدار مهم:</strong> اگرچه تمام تلاش ما برای ارائه نتایج دقیق است، 
                لطفاً نتایج مهم (مالی، قانونی، پزشکی) را با منابع معتبر تأیید کنید. 
                ما مسئولیتی در قبال استفاده نادرست از نتایج نداریم.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">حقوق مالکیت معنوی</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>تمام حقوق مالکیت معنوی وب‌سایت لنگر شامل:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>طراحی و کدهای وب‌سایت</li>
                <li>الگوریتم‌های محاسباتی</li>
                <li>محتوای متنی و تصویری</li>
                <li>نام تجاری و لوگو</li>
              </ul>
              <p>متعلق به ما است و حفاظت می‌شود.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">تبلیغات</h2>
            <p className="text-muted-foreground leading-relaxed">
              این وب‌سایت ممکن است تبلیغات Google AdSense و سایر شبکه‌های تبلیغاتی را نمایش دهد. 
              ما مسئولیتی در قبال محتوای تبلیغات شخص ثالث نداریم.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">تغییرات در خدمات</h2>
            <p className="text-muted-foreground leading-relaxed">
              ما حق تغییر، تعلیق یا قطع هر یک از خدمات را بدون اطلاع قبلی محفوظ می‌داریم. 
              تلاش می‌کنیم تغییرات مهم را از قبل اطلاع‌رسانی کنیم.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semبold mb-4">محدودیت مسئولیت</h2>
            <p className="text-muted-foreground leading-relaxed">
              در هیچ شرایطی ما مسئول خسارات مستقیم یا غیرمستقیم ناشی از استفاده از خدمات نیستیم. 
              استفاده از ابزارها کاملاً در مسئولیت خود کاربر است.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">قانون حاکم</h2>
            <p className="text-muted-foreground leading-relaxed">
              این شرایط تحت قوانین جمهوری اسلامی ایران تفسیر و اجرا می‌شود. 
              تمام اختلافات در دادگاه‌های صالح تهران رسیدگی خواهد شد.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">تماس</h2>
            <p className="text-muted-foreground leading-relaxed">
              برای سوالات یا نظرات در مورد این شرایط، از طریق صفحه تماس با ما در ارتباط باشید.
            </p>
          </section>

          <div className="text-sm text-muted-foreground mt-8 pt-4 border-t border-border">
            آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;