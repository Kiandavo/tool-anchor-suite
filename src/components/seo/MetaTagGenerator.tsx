
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { CopyIcon, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [viewport, setViewport] = useState(true);
  const [robots, setRobots] = useState(true);
  const [canonical, setCanonical] = useState('');
  const [language, setLanguage] = useState('fa');
  
  // تب شبکه‌های اجتماعی
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [ogUrl, setOgUrl] = useState('');
  const [ogType, setOgType] = useState('website');
  const [twitterCard, setTwitterCard] = useState('summary');
  
  // تولید HTML کد متاتگ‌ها
  const generateMetaTags = () => {
    let metaTags = '';
    
    // تب اصلی
    if (title) {
      metaTags += `<title>${title}</title>\n`;
      metaTags += `<meta name="title" content="${title}">\n`;
    }
    
    if (description) {
      metaTags += `<meta name="description" content="${description}">\n`;
    }
    
    if (keywords) {
      metaTags += `<meta name="keywords" content="${keywords}">\n`;
    }
    
    if (author) {
      metaTags += `<meta name="author" content="${author}">\n`;
    }
    
    if (viewport) {
      metaTags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    }
    
    if (robots) {
      metaTags += `<meta name="robots" content="index, follow">\n`;
    } else {
      metaTags += `<meta name="robots" content="noindex, nofollow">\n`;
    }
    
    if (language) {
      metaTags += `<meta http-equiv="content-language" content="${language}">\n`;
    }
    
    if (canonical) {
      metaTags += `<link rel="canonical" href="${canonical}">\n`;
    }
    
    // تب شبکه‌های اجتماعی
    if (ogTitle || title) {
      metaTags += `<meta property="og:title" content="${ogTitle || title}">\n`;
    }
    
    if (ogDescription || description) {
      metaTags += `<meta property="og:description" content="${ogDescription || description}">\n`;
    }
    
    if (ogImage) {
      metaTags += `<meta property="og:image" content="${ogImage}">\n`;
    }
    
    if (ogUrl || canonical) {
      metaTags += `<meta property="og:url" content="${ogUrl || canonical}">\n`;
    }
    
    if (ogType) {
      metaTags += `<meta property="og:type" content="${ogType}">\n`;
    }
    
    if (twitterCard) {
      metaTags += `<meta name="twitter:card" content="${twitterCard}">\n`;
      
      if (ogTitle || title) {
        metaTags += `<meta name="twitter:title" content="${ogTitle || title}">\n`;
      }
      
      if (ogDescription || description) {
        metaTags += `<meta name="twitter:description" content="${ogDescription || description}">\n`;
      }
      
      if (ogImage) {
        metaTags += `<meta name="twitter:image" content="${ogImage}">\n`;
      }
    }
    
    return metaTags;
  };
  
  // همسان‌سازی عنوان و توضیحات در تب‌ها
  const syncData = () => {
    if (title && !ogTitle) setOgTitle(title);
    if (description && !ogDescription) setOgDescription(description);
    if (canonical && !ogUrl) setOgUrl(canonical);
    toast.success('اطلاعات همسان‌سازی شد');
  };
  
  const copyToClipboard = () => {
    const metaTags = generateMetaTags();
    navigator.clipboard.writeText(metaTags);
    toast.success('متاتگ‌ها کپی شدند');
  };
  
  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6 space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="basic">اطلاعات اصلی</TabsTrigger>
            <TabsTrigger value="social">شبکه‌های اجتماعی</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4">
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
          </TabsContent>
        </Tabs>
        
        <div className="pt-4">
          <h3 className="font-medium mb-3">نتیجه (کدهای HTML):</h3>
          <div className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre className="whitespace-pre-wrap text-xs" dir="ltr">{generateMetaTags()}</pre>
          </div>
          
          <Button 
            onClick={copyToClipboard} 
            className="mt-4 w-full flex gap-2"
          >
            <CopyIcon size={18} />
            کپی کدهای متاتگ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
