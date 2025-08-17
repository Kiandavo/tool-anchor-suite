import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts, getBlogPostsByCategory } from '@/data/blog-posts';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const filteredArticles = getBlogPostsByCategory(selectedCategory);

  const categories = ["همه", "راهنما", "فرهنگ فارسی", "بهره‌وری", "SEO", "طراحی", "مالی"];

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
              variant={category === selectedCategory ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-primary text-6xl">{article.image}</span>
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