import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Server, Eye, Mail, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { tools } from '@/data/tools';

// Calculate actual tool counts by category
const getCategoryCounts = () => {
  const counts: Record<string, number> = {};
  tools.forEach(tool => {
    if (!tool.isComingSoon) {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    }
  });
  return counts;
};

export default function AboutUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categoryCounts = getCategoryCounts();
  const totalTools = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('لطفاً تمام فیلدها را پر کنید');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('پیام شما با موفقیت ارسال شد');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const categoryList = [
    { name: 'محاسبات و تبدیل اعداد', key: 'calculators' },
    { name: 'ابزارهای متن و نوشتار', key: 'text' },
    { name: 'تصویر و فایل', key: 'image' },
    { name: 'ابزارهای سئو و وب', key: 'seo' },
    { name: 'تقویم و تاریخ', key: 'persian' },
    { name: 'فال و طالع‌بینی', key: 'readings' },
  ];

  return (
    <Layout>
      <SeoHead 
        title="درباره لنگر - ابزارهای آنلاین رایگان فارسی"
        description="لنگر مجموعه‌ای از ابزارهای آنلاین رایگان فارسی است. بدون ثبت‌نام، بدون ذخیره اطلاعات، کاملاً در مرورگر شما."
        keywords="درباره لنگر، ابزار آنلاین فارسی، حریم خصوصی، امنیت داده"
      />
      
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            درباره لنگر
          </h1>
        </header>

        {/* Origin Story */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">داستان ما</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            لنگر از سال ۱۴۰۰ با هدف ساده‌ای شروع شد: ساخت ابزارهای کاربردی به زبان فارسی که 
            بدون نیاز به ثبت‌نام، بدون تبلیغات مزاحم و کاملاً رایگان قابل استفاده باشند. 
            ما یک تیم کوچک از توسعه‌دهندگان ایرانی هستیم که معتقدیم ابزارهای دیجیتال 
            باید ساده، سریع و قابل اعتماد باشند.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            تمام ابزارها در مرورگر شما اجرا می‌شوند - هیچ اطلاعاتی به سرور ارسال نمی‌شود.
          </p>
        </section>

        {/* Future Plans */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">برنامه‌های آینده</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              افزودن ابزارهای جدید هر هفته
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              API برای توسعه‌دهندگان
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              حساب کاربری اختیاری برای ذخیره تنظیمات
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              اپلیکیشن موبایل
            </li>
          </ul>
        </section>

        {/* What Laangar Covers */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">ابزارهای لنگر</h2>
          <p className="text-muted-foreground mb-4">
            در حال حاضر لنگر شامل <strong className="text-foreground">{totalTools} ابزار</strong> در دسته‌بندی‌های زیر است:
          </p>
          <ul className="space-y-2">
            {categoryList.map(cat => (
              <li key={cat.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-foreground">{cat.name}</span>
                <span className="text-sm text-muted-foreground font-medium">
                  {categoryCounts[cat.key] || 0} ابزار
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Privacy and Security */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            حریم خصوصی و امنیت
          </h2>
          <Card className="border-border">
            <CardContent className="p-6 space-y-6">
              <div className="flex gap-4">
                <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">متن‌هایی که وارد می‌کنید</h3>
                  <p className="text-sm text-muted-foreground">
                    تمام متن‌ها و داده‌هایی که در ابزارها وارد می‌کنید <strong>فقط در مرورگر شما</strong> پردازش می‌شوند. 
                    هیچ متنی به سرور ما ارسال نمی‌شود. می‌توانید با قطع اینترنت تست کنید - اکثر ابزارها کار می‌کنند.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Server className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">تصاویر کجا پردازش می‌شوند؟</h3>
                  <p className="text-sm text-muted-foreground">
                    ابزارهای تصویر <strong>کاملاً در مرورگر</strong> اجرا می‌شوند. تصاویر شما هرگز آپلود نمی‌شوند. 
                    پس از بستن صفحه، هیچ چیزی از تصاویر شما باقی نمی‌ماند.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Eye className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">لاگ‌ها و ردیابی</h3>
                  <p className="text-sm text-muted-foreground">
                    ما <strong>ورودی‌های شما را ذخیره نمی‌کنیم</strong>. فقط آمار کلی بازدید صفحات را برای بهبود سایت نگه می‌داریم. 
                    هیچ اطلاعات شخصی یا محتوای شما ثبت نمی‌شود.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-foreground flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>به زبان ساده:</strong> اطلاعات شما پیش ما نمی‌ماند. نه متن، نه تصویر، نه هیچ چیز دیگر.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            تماس با ما
          </h2>
          
          <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-muted-foreground">
              برای ارتباط مستقیم می‌توانید به این آدرس ایمیل بزنید:
            </p>
            <a 
              href="mailto:info@helpfuladvertising.com" 
              className="text-primary hover:underline font-medium text-lg"
            >
              info@helpfuladvertising.com
            </a>
          </div>

          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="font-medium text-foreground mb-4">فرم تماس</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">نام</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="نام شما"
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">ایمیل</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="email@example.com"
                      dir="ltr"
                      maxLength={255}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">پیام</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="پیام، پیشنهاد یا گزارش مشکل..."
                    rows={4}
                    maxLength={1000}
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    'در حال ارسال...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 ml-2" />
                      ارسال پیام
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
