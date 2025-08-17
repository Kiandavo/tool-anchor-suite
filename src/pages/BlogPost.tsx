import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, User, ArrowRight } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blog-posts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">مقاله یافت نشد</h1>
          <p className="text-muted-foreground mb-6">متأسفانه مقاله مورد نظر شما یافت نشد.</p>
          <Button asChild>
            <Link to="/blog">بازگشت به وبلاگ</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedPosts = getRelatedPosts(post.id);

  return (
    <Layout>
      <SeoHead 
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords.join(', ')}
      />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">خانه</Link>
          <ArrowRight className="w-4 h-4 rotate-180" />
          <Link to="/blog" className="hover:text-foreground">وبلاگ</Link>
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span className="text-foreground">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {post.excerpt}
          </p>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-muted rounded-lg mb-8 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-primary text-8xl">{post.image}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground">
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }

            if (paragraph.startsWith('- ')) {
              return (
                <li key={index} className="mb-2 text-foreground">
                  {paragraph.replace('- ', '')}
                </li>
              );
            }
            
            return (
              <p key={index} className="mb-4 text-foreground leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Keywords */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">برچسب‌ها:</h3>
          <div className="flex flex-wrap gap-2">
            {post.keywords.map((keyword) => (
              <Badge key={keyword} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground">مقالات مرتبط</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <CardHeader className="p-0">
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-primary text-4xl">{relatedPost.image}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <Badge className="mb-2 text-xs">{relatedPost.category}</Badge>
                      <h3 className="font-semibold mb-2 line-clamp-2 text-foreground">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link to="/blog">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              بازگشت به وبلاگ
            </Link>
          </Button>
        </div>
      </article>
    </Layout>
  );
}