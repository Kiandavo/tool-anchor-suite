import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tools } from '@/data/tools';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge } from '@/components/ui/badge';

export default function ToolComparison() {
  const [searchParams] = useSearchParams();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toolIds = searchParams.get('tools')?.split(',') || [];
  const compareTools = toolIds
    .map(id => tools.find(t => t.id === id || t.slug === id))
    .filter(Boolean);

  if (compareTools.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-secondary/20">
        <Header isScrolled={isScrolled} />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Card>
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl font-bold mb-4">ابزاری برای مقایسه انتخاب نشده</h2>
              <p className="text-muted-foreground mb-6">
                لطفاً حداقل دو ابزار برای مقایسه انتخاب کنید
              </p>
              <Link to="/">
                <Button>
                  بازگشت به صفحه اصلی
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const toolNames = compareTools.map(t => t?.name).join(' در مقابل ');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-secondary/20">
      <SeoHead
        title={`مقایسه: ${toolNames} | لنگر`}
        description={`مقایسه کامل ${toolNames} - انتخاب بهترین ابزار برای نیازهای شما`}
        keywords={`مقایسه، ابزارها، ${compareTools.map(t => t?.name || '').join('، ')}`}
      />
      
      <Header isScrolled={isScrolled} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              مقایسه ابزارها
            </h1>
            <p className="text-lg text-muted-foreground">
              انتخاب بهترین ابزار برای نیازهای شما
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {compareTools.map(tool => {
              if (!tool) return null;
              
              return (
                <Card key={tool.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex flex-col items-center gap-3 text-center">
                      <span className="text-5xl">{tool.icon}</span>
                      <span className="text-xl">{tool.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">توضیحات</h4>
                        <p className="text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>

                      {tool.category && (
                        <div>
                          <h4 className="font-semibold mb-2">دسته‌بندی</h4>
                          <Badge variant="secondary">{tool.category}</Badge>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-2">وضعیت</h4>
                        <div className="flex items-center gap-2">
                          {tool.isComingSoon ? (
                            <>
                              <X className="w-4 h-4 text-destructive" />
                              <span className="text-sm text-destructive">به زودی</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-500">فعال</span>
                            </>
                          )}
                        </div>
                      </div>

                      {tool.isNew && (
                        <div>
                          <Badge variant="default" className="bg-primary">جدید</Badge>
                        </div>
                      )}

                      <Link to={`/tool/${tool.slug}`}>
                        <Button className="w-full mt-4">
                          استفاده از ابزار
                          <ArrowRight className="w-4 h-4 mr-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>جدول مقایسه</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-4 px-4 font-semibold">ویژگی</th>
                      {compareTools.map(tool => (
                        <th key={tool?.id} className="text-center py-4 px-4 font-semibold">
                          {tool?.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">آیکون</td>
                      {compareTools.map(tool => (
                        <td key={tool?.id} className="text-center py-4 px-4 text-3xl">
                          {tool?.icon}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">دسته‌بندی</td>
                      {compareTools.map(tool => (
                        <td key={tool?.id} className="text-center py-4 px-4">
                          <Badge variant="secondary">{tool?.category || '-'}</Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">وضعیت</td>
                      {compareTools.map(tool => (
                        <td key={tool?.id} className="text-center py-4 px-4">
                          {tool?.isComingSoon ? (
                            <Badge variant="destructive">به زودی</Badge>
                          ) : (
                            <Badge variant="default" className="bg-green-500">فعال</Badge>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">جدید</td>
                      {compareTools.map(tool => (
                        <td key={tool?.id} className="text-center py-4 px-4">
                          {tool?.isNew ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
