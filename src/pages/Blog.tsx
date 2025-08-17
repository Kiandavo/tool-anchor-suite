import React from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "راهنمای کامل استفاده از محاسبگر درصد",
      excerpt: "یادگیری نحوه محاسبه درصدها در موقعیت‌های مختلف زندگی روزمره و کاری",
      category: "راهنما",
      author: "تیم لنگر",
      date: "۱۴۰۳/۰۸/۱۵",
      readTime: "۵ دقیقه",
      slug: "percentage-calculator-guide",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "آشنایی با ابزارهای فرهنگ فارسی در لنگر",
      excerpt: "کاوشی در ابزارهای منحصر به فرد فارسی مانند فال حافظ و تبدیل تقویم",
      category: "فرهنگ فارسی",
      author: "تیم لنگر",
      date: "۱۴۰۳/۰۸/۱۰",
      readTime: "۷ دقیقه",
      slug: "persian-cultural-tools",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "بهبود بهره‌وری با ابزارهای متنی لنگر",
      excerpt: "چگونه از ابزارهای پردازش متن برای بهبود کیفیت و سرعت کار استفاده کنیم",
      category: "بهره‌وری",
      author: "تیم لنگر",
      date: "۱۴۰۳/۰۸/۰۵",
      readTime: "۶ دقیقه",
      slug: "text-tools-productivity",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "نکات مهم برای استفاده از ابزارهای SEO",
      excerpt: "راهنمای جامع برای بهینه‌سازی سایت با ابزارهای SEO موجود در لنگر",
      category: "SEO",
      author: "تیم لنگر",
      date: "۱۴۰۳/۰۷/۲۸",
      readTime: "۱۰ دقیقه",
      slug: "seo-tools-guide",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "مقایسه ابزارهای طراحی آنلاین",
      excerpt: "بررسی کامل ابزارهای طراحی لنگر و مقایسه آن‌ها با گزینه‌های موجود",
      category: "طراحی",
      author: "تیم لنگر",
      date: "۱۴۰۳/۰۷/۲۰",
      readTime: "۸ دقیقه",
      slug: "design-tools-comparison",
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = ["همه", "راهنما", "فرهنگ فارسی", "بهره‌وری", "SEO", "طراحی"];

  return (
    <Layout>
      <SeoHead 
        title="وبلاگ لنگر - مقالات و راهنماهای کاربردی"
        description="مقالات، راهنماها و نکات کاربردی در مورد استفاده از ابزارهای آنلاین فارسی لنگر"
        keywords="وبلاگ، راهنما، آموزش، ابزار آنلاین، نکات کاربردی، لنگر"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">وبلاگ لنگر</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            راهنماها، نکات کاربردی و آخرین اخبار ابزارهای لنگر
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === "همه" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-primary text-4xl">📄</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="text-center py-12 mt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">به زودی مقالات بیشتری...</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            ما مدام در حال نوشتن راهنماهای جدید و مفصل برای ابزارهای لنگر هستیم. 
            منتظر بمانید!
          </p>
        </div>
      </div>
    </Layout>
  );
}