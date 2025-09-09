import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Code, Star } from 'lucide-react';
import { toast } from 'sonner';

type SchemaType = 'article' | 'product' | 'organization' | 'person' | 'recipe' | 'event' | 'faq';

interface SchemaData {
  article: {
    headline: string;
    author: string;
    datePublished: string;
    description: string;
    url: string;
  };
  product: {
    name: string;
    description: string;
    price: string;
    currency: string;
    brand: string;
    rating: string;
    availability: string;
  };
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
    address: string;
    phone: string;
  };
  person: {
    name: string;
    jobTitle: string;
    url: string;
    image: string;
    sameAs: string;
  };
  recipe: {
    name: string;
    description: string;
    prepTime: string;
    cookTime: string;
    serves: string;
    ingredients: string;
    instructions: string;
  };
  event: {
    name: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    url: string;
  };
  faq: {
    questions: Array<{ question: string; answer: string }>;
  };
}

export const SchemaGenerator = () => {
  const [schemaType, setSchemaType] = useState<SchemaType>('article');
  const [schemaData, setSchemaData] = useState<SchemaData>({
    article: { headline: '', author: '', datePublished: '', description: '', url: '' },
    product: { name: '', description: '', price: '', currency: 'USD', brand: '', rating: '', availability: 'InStock' },
    organization: { name: '', url: '', logo: '', description: '', address: '', phone: '' },
    person: { name: '', jobTitle: '', url: '', image: '', sameAs: '' },
    recipe: { name: '', description: '', prepTime: '', cookTime: '', serves: '', ingredients: '', instructions: '' },
    event: { name: '', startDate: '', endDate: '', location: '', description: '', url: '' },
    faq: { questions: [{ question: '', answer: '' }] }
  });
  const [generatedSchema, setGeneratedSchema] = useState('');

  const generateArticleSchema = (data: SchemaData['article']) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "author": {
      "@type": "Person",
      "name": data.author
    },
    "datePublished": data.datePublished,
    "description": data.description,
    "url": data.url
  });

  const generateProductSchema = (data: SchemaData['product']) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.name,
    "description": data.description,
    "brand": {
      "@type": "Brand",
      "name": data.brand
    },
    "offers": {
      "@type": "Offer",
      "price": data.price,
      "priceCurrency": data.currency,
      "availability": `https://schema.org/${data.availability}`
    },
    ...(data.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": data.rating,
        "ratingCount": "1"
      }
    })
  });

  const generateOrganizationSchema = (data: SchemaData['organization']) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.name,
    "url": data.url,
    "logo": data.logo,
    "description": data.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address
    },
    "telephone": data.phone
  });

  const generatePersonSchema = (data: SchemaData['person']) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": data.name,
    "jobTitle": data.jobTitle,
    "url": data.url,
    "image": data.image,
    ...(data.sameAs && { "sameAs": data.sameAs.split(',').map(s => s.trim()) })
  });

  const generateRecipeSchema = (data: SchemaData['recipe']) => ({
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": data.name,
    "description": data.description,
    "prepTime": `PT${data.prepTime}M`,
    "cookTime": `PT${data.cookTime}M`,
    "recipeYield": data.serves,
    "recipeIngredient": data.ingredients.split('\n').filter(i => i.trim()),
    "recipeInstructions": data.instructions.split('\n').filter(i => i.trim()).map((instruction, index) => ({
      "@type": "HowToStep",
      "text": instruction,
      "position": index + 1
    }))
  });

  const generateEventSchema = (data: SchemaData['event']) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": data.name,
    "startDate": data.startDate,
    "endDate": data.endDate,
    "location": {
      "@type": "Place",
      "name": data.location
    },
    "description": data.description,
    "url": data.url
  });

  const generateFaqSchema = (data: SchemaData['faq']) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.questions.filter(q => q.question && q.answer).map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  });

  const generateSchema = () => {
    let schema;
    const currentData = schemaData[schemaType];

    switch (schemaType) {
      case 'article':
        schema = generateArticleSchema(currentData as SchemaData['article']);
        break;
      case 'product':
        schema = generateProductSchema(currentData as SchemaData['product']);
        break;
      case 'organization':
        schema = generateOrganizationSchema(currentData as SchemaData['organization']);
        break;
      case 'person':
        schema = generatePersonSchema(currentData as SchemaData['person']);
        break;
      case 'recipe':
        schema = generateRecipeSchema(currentData as SchemaData['recipe']);
        break;
      case 'event':
        schema = generateEventSchema(currentData as SchemaData['event']);
        break;
      case 'faq':
        schema = generateFaqSchema(currentData as SchemaData['faq']);
        break;
    }

    setGeneratedSchema(JSON.stringify(schema, null, 2));
  };

  const copySchema = () => {
    navigator.clipboard.writeText(generatedSchema);
    toast.success('Schema کپی شد!');
  };

  const updateField = (field: string, value: string) => {
    setSchemaData(prev => ({
      ...prev,
      [schemaType]: {
        ...prev[schemaType],
        [field]: value
      }
    }));
  };

  const addFaqQuestion = () => {
    const faqData = schemaData.faq;
    setSchemaData(prev => ({
      ...prev,
      faq: {
        questions: [...faqData.questions, { question: '', answer: '' }]
      }
    }));
  };

  const updateFaqQuestion = (index: number, field: 'question' | 'answer', value: string) => {
    const faqData = schemaData.faq;
    const newQuestions = [...faqData.questions];
    newQuestions[index][field] = value;
    
    setSchemaData(prev => ({
      ...prev,
      faq: {
        questions: newQuestions
      }
    }));
  };

  const renderFields = () => {
    const currentData = schemaData[schemaType];

    switch (schemaType) {
      case 'article':
        const articleData = currentData as SchemaData['article'];
        return (
          <div className="space-y-4">
            <div>
              <Label>عنوان مقاله</Label>
              <Input
                value={articleData.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                placeholder="عنوان مقاله خود را وارد کنید"
              />
            </div>
            <div>
              <Label>نویسنده</Label>
              <Input
                value={articleData.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="نام نویسنده"
              />
            </div>
            <div>
              <Label>تاریخ انتشار</Label>
              <Input
                type="date"
                value={articleData.datePublished}
                onChange={(e) => updateField('datePublished', e.target.value)}
              />
            </div>
            <div>
              <Label>توضیحات</Label>
              <Textarea
                value={articleData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="خلاصه‌ای از مقاله"
              />
            </div>
            <div>
              <Label>URL مقاله</Label>
              <Input
                value={articleData.url}
                onChange={(e) => updateField('url', e.target.value)}
                placeholder="https://example.com/article"
              />
            </div>
          </div>
        );

      case 'product':
        const productData = currentData as SchemaData['product'];
        return (
          <div className="space-y-4">
            <div>
              <Label>نام محصول</Label>
              <Input
                value={productData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="نام محصول"
              />
            </div>
            <div>
              <Label>توضیحات محصول</Label>
              <Textarea
                value={productData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="توضیحات محصول"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>قیمت</Label>
                <Input
                  value={productData.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  placeholder="99.99"
                />
              </div>
              <div>
                <Label>واحد پول</Label>
                <Select value={productData.currency} onValueChange={(value) => updateField('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="IRR">IRR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>برند</Label>
              <Input
                value={productData.brand}
                onChange={(e) => updateField('brand', e.target.value)}
                placeholder="نام برند"
              />
            </div>
            <div>
              <Label>امتیاز (اختیاری)</Label>
              <Input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={productData.rating}
                onChange={(e) => updateField('rating', e.target.value)}
                placeholder="4.5"
              />
            </div>
            <div>
              <Label>وضعیت موجودی</Label>
              <Select value={productData.availability} onValueChange={(value) => updateField('availability', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="InStock">موجود</SelectItem>
                  <SelectItem value="OutOfStock">ناموجود</SelectItem>
                  <SelectItem value="PreOrder">پیش‌سفارش</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'faq':
        const faqData = currentData as SchemaData['faq'];
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>سوالات متداول</Label>
              <Button variant="outline" onClick={addFaqQuestion}>
                افزودن سوال
              </Button>
            </div>
            {faqData.questions.map((qa, index) => (
              <Card key={index}>
                <CardContent className="pt-4 space-y-3">
                  <div>
                    <Label>سوال {index + 1}</Label>
                    <Input
                      value={qa.question}
                      onChange={(e) => updateFaqQuestion(index, 'question', e.target.value)}
                      placeholder="سوال خود را وارد کنید"
                    />
                  </div>
                  <div>
                    <Label>پاسخ</Label>
                    <Textarea
                      value={qa.answer}
                      onChange={(e) => updateFaqQuestion(index, 'answer', e.target.value)}
                      placeholder="پاسخ سوال را وارد کنید"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return <div>این نوع Schema هنوز پیاده‌سازی نشده است.</div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            تولید Schema.org
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>نوع Schema</Label>
            <Select value={schemaType} onValueChange={(value: SchemaType) => setSchemaType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="article">مقاله (Article)</SelectItem>
                <SelectItem value="product">محصول (Product)</SelectItem>
                <SelectItem value="organization">سازمان (Organization)</SelectItem>
                <SelectItem value="person">شخص (Person)</SelectItem>
                <SelectItem value="recipe">دستور پخت (Recipe)</SelectItem>
                <SelectItem value="event">رویداد (Event)</SelectItem>
                <SelectItem value="faq">سوالات متداول (FAQ)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderFields()}

          <Button onClick={generateSchema} className="w-full">
            تولید Schema
          </Button>
        </CardContent>
      </Card>

      {generatedSchema && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>کد Schema تولید شده</span>
              <Button variant="outline" onClick={copySchema}>
                <Copy className="h-4 w-4 mr-2" />
                کپی
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{generatedSchema}</code>
              </pre>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>نحوه استفاده:</strong> این کد را در بخش head صفحه HTML خود داخل تگ script با type="application/ld+json" قرار دهید.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            درباره Schema.org
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-3">
            <p>
              Schema.org استانداردی برای نشانه‌گذاری داده‌های ساختاری است که به موتورهای جستجو کمک می‌کند محتوای وب‌سایت شما را بهتر درک کنند.
            </p>
            
            <div>
              <strong>مزایای استفاده از Schema:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>نمایش بهتر در نتایج جستجو (Rich Snippets)</li>
                <li>افزایش نرخ کلیک (CTR)</li>
                <li>بهبود سئو وب‌سایت</li>
                <li>درک بهتر محتوا توسط موتورهای جستجو</li>
              </ul>
            </div>
            
            <div className="text-xs text-muted-foreground">
              نکته: پس از اضافه کردن Schema، می‌توانید آن را با ابزار Google Rich Results Test تست کنید.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};