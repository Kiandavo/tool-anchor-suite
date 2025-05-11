
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface SocialMetaFormProps {
  ogTitle: string;
  setOgTitle: (value: string) => void;
  ogDescription: string;
  setOgDescription: (value: string) => void;
  ogImage: string;
  setOgImage: (value: string) => void;
  ogUrl: string;
  setOgUrl: (value: string) => void;
  ogType: string;
  setOgType: (value: string) => void;
  twitterCard: string;
  setTwitterCard: (value: string) => void;
  title: string;
  description: string;
  canonical: string;
}

export function SocialMetaForm({
  ogTitle,
  setOgTitle,
  ogDescription,
  setOgDescription,
  ogImage,
  setOgImage,
  ogUrl,
  setOgUrl,
  ogType,
  setOgType,
  twitterCard,
  setTwitterCard,
  title,
  description,
  canonical
}: SocialMetaFormProps) {
  
  const syncData = () => {
    if (title && !ogTitle) setOgTitle(title);
    if (description && !ogDescription) setOgDescription(description);
    if (canonical && !ogUrl) setOgUrl(canonical);
    toast.success('اطلاعات همسان‌سازی شد');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" onClick={syncData} size="sm" className="flex gap-2">
          <RefreshCw size={16} />
          همسان‌سازی با اطلاعات اصلی
        </Button>
      </div>
      
      <Separator />
      
      <h3 className="font-medium">Open Graph (فیسبوک، لینکدین، ...)</h3>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="og-title">عنوان Open Graph</Label>
          <Input
            id="og-title"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            placeholder={title || "عنوان Open Graph را وارد کنید..."}
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="og-description">توضیحات Open Graph</Label>
          <Textarea
            id="og-description"
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            placeholder={description || "توضیحات Open Graph را وارد کنید..."}
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="og-image">آدرس تصویر</Label>
          <Input
            id="og-image"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            placeholder="مثال: https://example.com/image.jpg"
            dir="ltr"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="og-url">آدرس URL</Label>
          <Input
            id="og-url"
            value={ogUrl}
            onChange={(e) => setOgUrl(e.target.value)}
            placeholder={canonical || "مثال: https://example.com/page"}
            dir="ltr"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="og-type">نوع محتوا</Label>
          <select
            id="og-type"
            value={ogType}
            onChange={(e) => setOgType(e.target.value)}
            className="w-full border rounded-md px-3 py-2 cursor-pointer"
          >
            <option value="website">وب‌سایت (website)</option>
            <option value="article">مقاله (article)</option>
            <option value="book">کتاب (book)</option>
            <option value="profile">پروفایل (profile)</option>
            <option value="video.movie">فیلم (video.movie)</option>
            <option value="music.song">موسیقی (music.song)</option>
          </select>
        </div>
      </div>
      
      <Separator />
      
      <h3 className="font-medium">توییتر (Twitter)</h3>
      
      <div className="space-y-2">
        <Label htmlFor="twitter-card">نوع کارت توییتر</Label>
        <select
          id="twitter-card"
          value={twitterCard}
          onChange={(e) => setTwitterCard(e.target.value)}
          className="w-full border rounded-md px-3 py-2 cursor-pointer"
        >
          <option value="summary">خلاصه (summary)</option>
          <option value="summary_large_image">خلاصه با تصویر بزرگ (summary_large_image)</option>
          <option value="app">اپلیکیشن (app)</option>
          <option value="player">پخش‌کننده (player)</option>
        </select>
      </div>
    </div>
  );
}
