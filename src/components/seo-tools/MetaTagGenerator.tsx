import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export const MetaTagGenerator: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [ogTitle, setOgTitle] = useState<string>('');
  const [ogDescription, setOgDescription] = useState<string>('');
  const [ogImage, setOgImage] = useState<string>('');
  const [twitterTitle, setTwitterTitle] = useState<string>('');
  const [twitterDescription, setTwitterDescription] = useState<string>('');
  const [generatedTags, setGeneratedTags] = useState<string>('');

  const generateMetaTags = () => {
    if (!title.trim()) {
      toast.error('لطفاً عنوان صفحه را وارد کنید');
      return;
    }

    let tags = '';

    // Basic Meta Tags
    tags += `<!-- Basic Meta Tags -->\n`;
    tags += `<title>${title}</title>\n`;
    tags += `<meta charset="UTF-8">\n`;
    tags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    
    if (description) {
      tags += `<meta name="description" content="${description}">\n`;
    }
    
    if (keywords) {
      tags += `<meta name="keywords" content="${keywords}">\n`;
    }
    
    if (author) {
      tags += `<meta name="author" content="${author}">\n`;
    }

    // Open Graph Tags
    tags += `\n<!-- Open Graph Meta Tags -->\n`;
    tags += `<meta property="og:type" content="website">\n`;
    tags += `<meta property="og:title" content="${ogTitle || title}">\n`;
    
    if (ogDescription || description) {
      tags += `<meta property="og:description" content="${ogDescription || description}">\n`;
    }
    
    if (ogImage) {
      tags += `<meta property="og:image" content="${ogImage}">\n`;
    }

    // Twitter Card Tags
    tags += `\n<!-- Twitter Card Meta Tags -->\n`;
    tags += `<meta name="twitter:card" content="summary_large_image">\n`;
    tags += `<meta name="twitter:title" content="${twitterTitle || ogTitle || title}">\n`;
    
    if (twitterDescription || ogDescription || description) {
      tags += `<meta name="twitter:description" content="${twitterDescription || ogDescription || description}">\n`;
    }
    
    if (ogImage) {
      tags += `<meta name="twitter:image" content="${ogImage}">\n`;
    }

    setGeneratedTags(tags);
    toast.success('تگ‌های Meta تولید شدند');
  };

  const copyTags = () => {
    navigator.clipboard.writeText(generatedTags);
    toast.success('تگ‌ها کپی شدند');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تولید کننده Meta Tags</CardTitle>
        <CardDescription>
          تگ‌های Meta برای بهبود سئو و شبکه‌های اجتماعی تولید کنید
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات پایه</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">عنوان صفحه *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان صفحه"
                maxLength={60}
              />
              <div className="text-xs text-muted-foreground">
                {title.length}/60 کاراکتر
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">توضیحات</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیحات صفحه"
                maxLength={160}
                rows={3}
              />
              <div className="text-xs text-muted-foreground">
                {description.length}/160 کاراکتر
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">کلمات کلیدی</Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="کلمه1، کلمه2، کلمه3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">نویسنده</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="نام نویسنده"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">شبکه‌های اجتماعی</h3>
            
            <div className="space-y-2">
              <Label htmlFor="og-title">عنوان Open Graph</Label>
              <Input
                id="og-title"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                placeholder="عنوان برای شبکه‌های اجتماعی"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="og-description">توضیحات Open Graph</Label>
              <Textarea
                id="og-description"
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                placeholder="توضیحات برای شبکه‌های اجتماعی"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="og-image">تصویر Open Graph</Label>
              <Input
                id="og-image"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter-title">عنوان Twitter</Label>
              <Input
                id="twitter-title"
                value={twitterTitle}
                onChange={(e) => setTwitterTitle(e.target.value)}
                placeholder="عنوان برای Twitter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter-description">توضیحات Twitter</Label>
              <Textarea
                id="twitter-description"
                value={twitterDescription}
                onChange={(e) => setTwitterDescription(e.target.value)}
                placeholder="توضیحات برای Twitter"
                rows={3}
              />
            </div>
          </div>
        </div>

        <Button onClick={generateMetaTags} className="w-full" disabled={!title}>
          تولید Meta Tags
        </Button>

        {generatedTags && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>تگ‌های تولید شده</Label>
              <Button variant="outline" size="sm" onClick={copyTags}>
                <Copy className="w-4 h-4 mr-2" />
                کپی
              </Button>
            </div>
            <Textarea
              value={generatedTags}
              readOnly
              rows={15}
              className="font-mono text-sm"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};