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
      question: "آیا استفاده از ابزارهای لنگر رایگان است؟",
      answer: "بله، تمام ابزارهای لنگر کاملاً رایگان و بدون نیاز به ثبت‌نام هستند. ما معتقدیم که دسترسی به ابزارهای کاربردی باید برای همه آزاد باشد."
    },
    {
      question: "آیا نیاز به ثبت‌نام یا ایجاد حساب کاربری دارم؟",
      answer: "خیر، هیچ‌کدام از ابزارهای لنگر نیاز به ثبت‌نام ندارند. می‌توانید بلافاصله از تمام ابزارها استفاده کنید."
    },
    {
      question: "آیا اطلاعات من ذخیره می‌شود؟",
      answer: "تمام محاسبات و عملیات در مرورگر شما انجام می‌شود و هیچ اطلاعات شخصی ذخیره نمی‌شود. حریم خصوصی شما برای ما بسیار مهم است."
    },
    {
      question: "آیا ابزارها روی موبایل کار می‌کنند؟",
      answer: "بله، تمام ابزارهای لنگر طراحی واکنش‌گرا دارند و به خوبی روی تلفن همراه، تبلت و رایانه کار می‌کنند."
    },
    {
      question: "چگونه می‌توانم ابزار جدید پیشنهاد دهم؟",
      answer: "ما همیشه از پیشنهادات کاربران استقبال می‌کنیم. می‌توانید از طریق بخش تماس با ما، ابزارهای مورد نیازتان را معرفی کنید."
    },
    {
      question: "آیا دقت محاسبات تضمین شده است؟",
      answer: "ما سعی می‌کنیم بالاترین دقت را در ابزارهایمان ارائه دهیم، اما توصیه می‌کنیم برای تصمیمات مهم، نتایج را با منابع دیگری نیز بررسی کنید."
    },
    {
      question: "آیا می‌توانم از ابزارها برای کار تجاری استفاده کنم؟",
      answer: "بله، می‌توانید از تمام ابزارهای لنگر برای مقاصد شخصی و تجاری استفاده کنید."
    },
    {
      question: "چرا برخی ابزارها 'به زودی' نشان می‌دهند؟",
      answer: "ما مدام در حال توسعه ابزارهای جدید هستیم. ابزارهایی که 'به زودی' نشان می‌دهند، در حال ساخت هستند و به زودی در دسترس قرار می‌گیرند."
    },
    {
      question: "آیا می‌توانم نتایج را ذخیره کنم؟",
      answer: "در حال حاضر، اکثر ابزارها قابلیت ذخیره‌سازی ندارند، اما می‌توانید نتایج را کپی کرده یا اسکرین‌شات بگیرید. قابلیت ذخیره‌سازی در نسخه‌های آینده اضافه خواهد شد."
    },
    {
      question: "مشکل فنی دارم، چه کار کنم؟",
      answer: "اگر با مشکل فنی مواجه شدید، لطفاً مرورگرتان را بروزرسانی کنید یا کش مرورگر را پاک کنید. اگر مشکل ادامه داشت، با ما تماس بگیرید."
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