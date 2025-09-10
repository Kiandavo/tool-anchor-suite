import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, HelpCircle, BookOpen, Star, ArrowRight, Sparkles } from 'lucide-react';
import { categorySeoData } from '@/data/category-seo-content';

interface CategorySeoContentProps {
  categoryName: string;
  categorySlug: string;
  toolCount: number;
  relatedTools?: { name: string; slug: string }[];
}

export const CategorySeoContent: React.FC<CategorySeoContentProps> = ({
  categoryName,
  categorySlug,
  toolCount,
  relatedTools = []
}) => {
  const seoData = categorySeoData[categorySlug];

  if (!seoData) return null;

  return (
    <div className="space-y-8 mt-12">
      {/* Category Description */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Star className="w-6 h-6 text-primary" />
            درباره ابزارهای {categoryName}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
            {seoData.longDescription}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="text-sm">
              {toolCount} ابزار
            </Badge>
            <Badge variant="outline" className="text-sm">رایگان</Badge>
            <Badge variant="outline" className="text-sm">بدون محدودیت</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            مزایای استفاده از ابزارهای {categoryName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seoData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Use (if available) */}
      {seoData.howToUse && seoData.howToUse.length > 0 && (
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              نحوه استفاده از ابزارهای {categoryName}
            </h3>
            <ol className="space-y-4">
              {seoData.howToUse.map((item) => (
                <li key={item.step} className="flex gap-4 p-3 bg-white/60 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <span className="text-sm leading-relaxed flex-1">{item.instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* FAQ */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-purple-600" />
            سوالات متداول درباره {categoryName}
          </h3>
          <div className="space-y-6">
            {seoData.faq.map((item, index) => (
              <div key={index} className="p-4 bg-white/60 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-600" />
                  {item.question}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed pr-6">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Keywords and Related Categories */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-orange-600" />
            کلمات کلیدی و موضوعات مرتبط
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-orange-900 mb-3">کلمات کلیدی:</h4>
              <div className="flex flex-wrap gap-2">
                {seoData.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-white/60">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            {seoData.relatedCategories.length > 0 && (
              <div>
                <h4 className="font-medium text-orange-900 mb-3">دسته‌های مرتبط:</h4>
                <div className="flex flex-wrap gap-2">
                  {seoData.relatedCategories.map((category, index) => (
                    <a key={index} href={`/category/${category}`}>
                      <Badge 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                      >
                        {category}
                      </Badge>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">ابزارهای پیشنهادی در این دسته</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {relatedTools.slice(0, 8).map((tool) => (
                <a key={tool.slug} href={`/tool/${tool.slug}`}>
                  <div className="p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center">
                    <span className="text-sm font-medium">{tool.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};