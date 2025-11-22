import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';
import { SeoHead } from '@/components/seo/SeoHead';

export default function Bookmarks() {
  const { bookmarkedTools } = useBookmarks();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-secondary/20">
      <SeoHead
        title="ابزارهای نشان‌شده | لنگر"
        description="ابزارهای ذخیره شده و نشان‌گذاری شده شما در لنگر"
        keywords="نشان‌شده، ذخیره، ابزارها"
      />
      
      <Header isScrolled={isScrolled} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <Bookmark className="w-10 h-10 text-primary" />
              ابزارهای نشان‌شده
            </h1>
            <p className="text-lg text-muted-foreground">
              ابزارهای ذخیره شده شما برای دسترسی سریع
            </p>
          </div>

          {bookmarkedTools.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="py-12 text-center">
                <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  هنوز ابزاری نشان‌گذاری نکرده‌اید
                </h3>
                <p className="text-muted-foreground mb-6">
                  برای دسترسی سریع، ابزارهای مورد علاقه خود را نشان‌گذاری کنید
                </p>
                <Link to="/">
                  <Button>
                    مشاهده ابزارها
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedTools.map(tool => (
                <Link key={tool.id} to={`/tool/${tool.slug}`}>
                  <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <span className="text-3xl">{tool.icon}</span>
                        <span className="text-lg">{tool.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                      {tool.category && (
                        <div className="mt-4">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {tool.category}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
