import React from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "آیا متن‌هایی که وارد می‌کنم ذخیره می‌شوند؟",
      answer: "خیر. تمام متن‌ها و داده‌ها فقط در مرورگر شما پردازش می‌شوند. هیچ متنی به سرور ما ارسال یا ذخیره نمی‌شود. می‌توانید با قطع اینترنت تست کنید - اکثر ابزارها همچنان کار می‌کنند."
    },
    {
      question: "محدودیت حجم تصویر و طول متن چقدر است؟",
      answer: "برای تصاویر حداکثر ۱۰ مگابایت و برای متن تا ۵۰۰۰۰ کاراکتر پشتیبانی می‌شود. این محدودیت‌ها برای حفظ عملکرد مرورگر است. اگر فایل بزرگ‌تری دارید، آن را به بخش‌های کوچکتر تقسیم کنید."
    },
    {
      question: "می‌توانم از ابزارها برای کار تجاری استفاده کنم؟",
      answer: "بله، استفاده تجاری کاملاً آزاد است. می‌توانید از تمام ابزارهای لنگر برای پروژه‌های شخصی، شرکتی، یا فریلنسی استفاده کنید. نیازی به ذکر منبع هم نیست."
    },
    {
      question: "اگر نتیجه یک محاسبه اشتباه بود چه کار کنم؟",
      answer: "لطفاً از طریق فرم تماس گزارش دهید و ورودی و خروجی را ذکر کنید. ما سریعاً بررسی و اصلاح می‌کنیم. برای تصمیمات مهم (مالی، پزشکی) همیشه نتایج را با منابع دیگر هم تأیید کنید."
    },
    {
      question: "چه مرورگرهایی بهتر کار می‌کنند؟",
      answer: "Chrome، Firefox، Safari و Edge همه به خوبی پشتیبانی می‌شوند. توصیه می‌کنیم از آخرین نسخه مرورگر استفاده کنید. اگر مشکلی دارید، ابتدا کش مرورگر را پاک کنید."
    },
    {
      question: "آیا نیاز به ثبت‌نام یا ایجاد حساب کاربری دارم؟",
      answer: "خیر. هیچ‌کدام از ابزارهای لنگر نیاز به ثبت‌نام ندارند. بلافاصله وارد شوید و استفاده کنید."
    },
    {
      question: "آیا ابزارها روی موبایل کار می‌کنند؟",
      answer: "بله. تمام ابزارها برای موبایل، تبلت و دسکتاپ بهینه شده‌اند. رابط کاربری خودکار با اندازه صفحه تنظیم می‌شود."
    },
    {
      question: "چرا برخی ابزارها 'به زودی' نشان می‌دهند؟",
      answer: "این ابزارها در حال توسعه هستند. ما هر هفته ابزارهای جدید اضافه می‌کنیم. اگر ابزار خاصی نیاز دارید، از طریق فرم تماس پیشنهاد دهید."
    },
    {
      question: "آیا می‌توانم نتایج را دانلود کنم؟",
      answer: "بله، اکثر ابزارها دکمه کپی یا دانلود دارند. می‌توانید نتایج را به PDF، تصویر یا متن خروجی بگیرید."
    },
    {
      question: "چگونه می‌توانم ابزار جدید پیشنهاد دهم؟",
      answer: "از صفحه تماس با ما پیام بفرستید. ابزاری که نیاز دارید را توضیح دهید. اگر پرکاربرد باشد، در اولویت توسعه قرار می‌گیرد."
    },
    {
      question: "صفحه سفید می‌بینم یا ابزار کار نمی‌کند. چه کنم؟",
      answer: "۱) صفحه را رفرش کنید ۲) کش مرورگر را پاک کنید ۳) مرورگر دیگری امتحان کنید ۴) اگر هنوز مشکل دارید، از طریق تماس گزارش دهید."
    },
    {
      question: "آیا لنگر تبلیغات دارد؟",
      answer: "بله، برای پوشش هزینه‌های سرور از تبلیغات محدود Google استفاده می‌کنیم. تبلیغات هرگز محتوای اصلی را نمی‌پوشانند."
    }
  ];

  return (
    <Layout>
      <SeoHead 
        title="سوالات متداول - لنگر"
        description="پاسخ به سوالات متداول در مورد ابزارهای آنلاین لنگر، نحوه استفاده، حریم خصوصی و سایر موضوعات مهم."
        keywords="سوالات متداول، راهنما، نحوه استفاده، لنگر، ابزار آنلاین"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">سوالات متداول</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            پاسخ سوالات رایج در مورد ابزارهای لنگر
          </p>
        </div>

        <div className="mb-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center py-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            سوال دیگری دارید؟
          </h2>
          <p className="text-muted-foreground text-lg">
            اگر پاسخ سوالتان را در بالا پیدا نکردید، با ما تماس بگیرید. ما خوشحال می‌شویم که به شما کمک کنیم.
          </p>
        </div>
      </div>
    </Layout>
  );
}