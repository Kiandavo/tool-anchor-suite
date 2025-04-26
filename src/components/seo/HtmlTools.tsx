
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Share, RefreshCw, Code } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/utils/randomUtils';

export const HtmlTools = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [schemaType, setSchemaType] = useState<string>('Article');
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [redirectTime, setRedirectTime] = useState<string>('5');
  const [socialTitle, setSocialTitle] = useState<string>('');
  const [socialDescription, setSocialDescription] = useState<string>('');
  const [socialImage, setSocialImage] = useState<string>('');
  const [textToolOutput, setTextToolOutput] = useState<string>('');

  const extractHeadings = () => {
    const headings: string[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
      doc.querySelectorAll(tag).forEach(heading => {
        headings.push(`${tag.toUpperCase()}: ${heading.textContent}`);
      });
    });
    const result = headings.join('\n');
    setTextToolOutput(result);
    toast.success("ساختار هدینگ‌ها استخراج شد");
  };

  const generateSocialTags = () => {
    let tags = `<!-- Social Media Tags -->\n`;
    tags += `<meta property="og:title" content="${socialTitle}" />\n`;
    tags += `<meta property="og:description" content="${socialDescription}" />\n`;
    if (socialImage) {
      tags += `<meta property="og:image" content="${socialImage}" />\n`;
    }
    tags += `<meta name="twitter:card" content="summary_large_image" />\n`;
    tags += `<meta name="twitter:title" content="${socialTitle}" />\n`;
    tags += `<meta name="twitter:description" content="${socialDescription}" />\n`;
    if (socialImage) {
      tags += `<meta name="twitter:image" content="${socialImage}" />\n`;
    }
    setTextToolOutput(tags);
    toast.success("تگ‌های شبکه‌های اجتماعی ایجاد شدند");
  };

  const generateMetaRefresh = () => {
    const tag = `<meta http-equiv="refresh" content="${redirectTime};url=${redirectUrl}" />`;
    setTextToolOutput(tag);
    toast.success("تگ ریدایرکت ایجاد شد");
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": socialTitle,
      "description": socialDescription,
      "url": redirectUrl
    };
    setTextToolOutput(JSON.stringify(schema, null, 2));
    toast.success("کد Schema.org ایجاد شد");
  };

  const checkHtmlLang = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const htmlTag = doc.querySelector('html');
    const lang = htmlTag?.getAttribute('lang') || '';
    let result = '';
    
    if (!lang) {
      result = "⚠️ تگ lang یافت نشد. پیشنهاد می‌شود از <html lang=\"fa\"> استفاده کنید.";
    } else {
      result = `✅ تگ lang موجود است: ${lang}`;
    }
    
    setTextToolOutput(result);
    toast.success("بررسی زبان HTML انجام شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Select value={schemaType} onValueChange={setSchemaType}>
            <SelectTrigger>
              <SelectValue placeholder="نوع Schema" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Article">مقاله</SelectItem>
              <SelectItem value="Product">محصول</SelectItem>
              <SelectItem value="Organization">سازمان</SelectItem>
              <SelectItem value="Person">شخص</SelectItem>
              <SelectItem value="WebSite">وب‌سایت</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="عنوان"
            value={socialTitle}
            onChange={(e) => setSocialTitle(e.target.value)}
          />
          <Textarea
            placeholder="توضیحات"
            value={socialDescription}
            onChange={(e) => setSocialDescription(e.target.value)}
          />
          <Input
            placeholder="آدرس تصویر"
            value={socialImage}
            onChange={(e) => setSocialImage(e.target.value)}
          />
          <Input
            placeholder="آدرس مقصد"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
          />
          <Input
            type="number"
            placeholder="زمان تاخیر (ثانیه)"
            value={redirectTime}
            onChange={(e) => setRedirectTime(e.target.value)}
          />
          <Textarea
            placeholder="کد HTML را وارد کنید..."
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            className="min-h-32"
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={extractHeadings}>
              <FileText className="mr-2" size={18} />
              استخراج هدینگ‌ها
            </Button>
            <Button onClick={generateSocialTags}>
              <Share className="mr-2" size={18} />
              تولید تگ‌های اجتماعی
            </Button>
            <Button onClick={generateMetaRefresh}>
              <RefreshCw className="mr-2" size={18} />
              تولید تگ ریدایرکت
            </Button>
            <Button onClick={generateSchema}>
              <Code className="mr-2" size={18} />
              تولید Schema
            </Button>
            <Button onClick={checkHtmlLang}>
              <Code className="mr-2" size={18} />
              بررسی تگ lang
            </Button>
          </div>
        </div>
        
        {textToolOutput && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer font-mono text-sm whitespace-pre-wrap"
            onClick={() => copyToClipboard(textToolOutput)}
          >
            {textToolOutput}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
