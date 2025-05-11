
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface BasicMetaFormProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  keywords: string;
  setKeywords: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
  viewport: boolean;
  setViewport: (value: boolean) => void;
  robots: boolean;
  setRobots: (value: boolean) => void;
  canonical: string;
  setCanonical: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
}

export function BasicMetaForm({
  title,
  setTitle,
  description,
  setDescription,
  keywords,
  setKeywords,
  author,
  setAuthor,
  viewport,
  setViewport,
  robots,
  setRobots,
  canonical,
  setCanonical,
  language,
  setLanguage
}: BasicMetaFormProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="meta-title">عنوان صفحه</Label>
        <Input
          id="meta-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان صفحه را وارد کنید..."
          className="text-right"
          maxLength={60}
        />
        {title && (
          <p className={`text-xs ${title.length > 55 ? 'text-amber-500' : 'text-muted-foreground'}`}>
            {title.length}/60 کاراکتر
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="meta-description">توضیحات</Label>
        <Textarea
          id="meta-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="توضیحات صفحه را وارد کنید..."
          className="text-right"
          maxLength={160}
        />
        {description && (
          <p className={`text-xs ${description.length > 150 ? 'text-amber-500' : 'text-muted-foreground'}`}>
            {description.length}/160 کاراکتر
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="meta-keywords">کلمات کلیدی (با کاما جدا کنید)</Label>
        <Input
          id="meta-keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="کلمات کلیدی را وارد کنید..."
          className="text-right"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="meta-author">نویسنده</Label>
        <Input
          id="meta-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="نام نویسنده یا سازمان..."
          className="text-right"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="meta-canonical">آدرس کانونیکال (Canonical URL)</Label>
        <Input
          id="meta-canonical"
          value={canonical}
          onChange={(e) => setCanonical(e.target.value)}
          placeholder="مثال: https://example.com/page"
          dir="ltr"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="meta-language">زبان صفحه</Label>
        <Input
          id="meta-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="مثال: fa یا en"
          className="text-right"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="meta-viewport">افزودن viewport (ضروری برای موبایل)</Label>
        <Switch
          id="meta-viewport"
          checked={viewport}
          onCheckedChange={setViewport}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="meta-robots">اجازه ایندکس شدن (robots)</Label>
        <Switch
          id="meta-robots"
          checked={robots}
          onCheckedChange={setRobots}
        />
      </div>
    </div>
  );
}
