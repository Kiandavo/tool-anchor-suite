import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, HelpCircle, BookOpen, Star } from 'lucide-react';

interface ToolSeoContentProps {
  toolName: string;
  category: string;
  description: string;
  benefits?: string[];
  howToUse?: { step: number; instruction: string }[];
  faq?: { question: string; answer: string }[];
  relatedTools?: { name: string; slug: string }[];
}

export const ToolSeoContent: React.FC<ToolSeoContentProps> = ({
  toolName,
  category,
  description,
  benefits = [],
  howToUse = [],
  faq = [],
  relatedTools = []
}) => {
  const defaultBenefits = [
    'کاملاً رایگان و بدون محدودیت',
    'بدون نیاز به نصب نرم‌افزار',
    'سریع، دقیق و قابل اعتماد',
    'طراحی مدرن و کاربری آسان',
    'پشتیبانی کامل از زبان فارسی',
    'سازگار با تمام دستگاه‌ها'
  ];

  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;

  return (
    <div className="space-y-8 mt-8">
      {/* Tool Description */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            درباره {toolName}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="mr-2">
              {category}
            </Badge>
            <Badge variant="outline">رایگان</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            مزایای استفاده از {toolName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {displayBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Use */}
      {howToUse.length > 0 && (
        <Card className="border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              راهنمای استفاده از {toolName}
            </h3>
            <ol className="space-y-3">
              {howToUse.map((item) => (
                <li key={item.step} className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {item.step}
                  </div>
                  <span className="text-sm leading-relaxed">{item.instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <Card className="border-purple-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              سوالات متداول درباره {toolName}
            </h3>
            <div className="space-y-4">
              {faq.map((item, index) => (
                <div key={index}>
                  <h4 className="font-medium text-purple-900 mb-2">
                    {item.question}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">ابزارهای مرتبط</h3>
            <div className="flex flex-wrap gap-2">
              {relatedTools.map((tool) => (
                <a key={tool.slug} href={`/tool/${tool.slug}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    {tool.name}
                  </Badge>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};