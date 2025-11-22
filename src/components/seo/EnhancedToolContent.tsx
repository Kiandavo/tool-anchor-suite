import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, BookOpen, HelpCircle, Star, Zap, Shield, Smartphone } from 'lucide-react';

interface EnhancedToolContentProps {
  toolName: string;
  category: string;
  comprehensiveDescription: string;
  benefits: string[];
  howToSteps: { step: number; instruction: string }[];
  faq: { question: string; answer: string }[];
  wordCount?: number;
}

export const EnhancedToolContent: React.FC<EnhancedToolContentProps> = ({
  toolName,
  category,
  comprehensiveDescription,
  benefits,
  howToSteps,
  faq,
  wordCount
}) => {
  return (
    <article className="space-y-8 mt-12" itemScope itemType="https://schema.org/Article">
      {/* Main Content with Proper Header Hierarchy */}
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl" itemProp="headline">
            <Star className="h-6 w-6 text-primary" />
            <h2>همه چیز درباره {toolName}</h2>
          </CardTitle>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{category}</Badge>
            <Badge variant="outline">رایگان</Badge>
            <Badge variant="outline">۲۰۲۵</Badge>
            {wordCount && wordCount > 800 && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                محتوای جامع ({wordCount} کلمه)
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none" itemProp="articleBody">
          <div className="text-foreground leading-relaxed space-y-4">
            {/* Render markdown content with proper headers */}
            {comprehensiveDescription.split('\n\n').map((paragraph, index) => {
              // H2 headers
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-foreground">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              // H3 headers
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg font-semibold mt-5 mb-2 text-foreground">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              // H4 headers (bold text)
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h4 key={index} className="text-base font-semibold mt-4 mb-2 text-foreground">
                    {paragraph.replace(/\*\*/g, '')}
                  </h4>
                );
              }
              // Lists
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-1 mr-4">
                    {items.map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              // Regular paragraphs
              return (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Section with Icons */}
      <Card className="border-green-500/20 bg-gradient-to-br from-green-50/50 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <h3>مزایای استفاده از {toolName}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const icons = [
                <Zap key="zap" className="h-5 w-5 text-green-600" />,
                <Shield key="shield" className="h-5 w-5 text-green-600" />,
                <Smartphone key="phone" className="h-5 w-5 text-green-600" />,
                <CheckCircle2 key="check" className="h-5 w-5 text-green-600" />
              ];
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/50 border border-green-100">
                  {icons[index % icons.length]}
                  <span className="text-sm leading-relaxed text-foreground">{benefit}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* How-to Guide with Numbered Steps */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-50/50 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h3>راهنمای گام به گام {toolName}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {howToSteps.map((step) => (
              <li key={step.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  {step.step}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {step.instruction}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* FAQ Section with Structured Data Markup */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-50/50 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="h-6 w-6 text-purple-600" />
            <h3>سوالات متداول (FAQ)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
            {faq.map((item, index) => (
              <div 
                key={index} 
                className="border-r-4 border-purple-300 pr-4 py-2"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <h4 className="font-bold text-base text-purple-900 mb-2" itemProp="name">
                  {item.question}
                </h4>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Footer Note */}
      <div className="text-center text-sm text-muted-foreground py-4">
        <p>
          آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')} | 
          {' '}{toolName} - بخشی از مجموعه ابزارهای رایگان لنگر
        </p>
      </div>
    </article>
  );
};
