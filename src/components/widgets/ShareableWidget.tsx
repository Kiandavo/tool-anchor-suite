import React, { useState } from 'react';
import { Code, Copy, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { copyToClipboard } from '@/utils/socialShare';
import { useToast } from '@/hooks/use-toast';

export const ShareableWidget: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = async (code: string, type: string) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(type);
      toast({ title: 'کد کپی شد', description: 'کد ویجت در کلیپ‌بورد کپی شد' });
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const badgeCode = `<a href="https://abzarino.ir" target="_blank" rel="noopener">
  <img src="https://abzarino.ir/badge.svg" alt="ابزارینو - ابزارهای آنلاین فارسی" />
</a>`;

  const buttonCode = `<a href="https://abzarino.ir" 
   style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-family:Vazirmatn,sans-serif;"
   target="_blank" rel="noopener">
  استفاده از ابزارهای ابزارینو
</a>`;

  const textLinkCode = `<a href="https://abzarino.ir" target="_blank" rel="noopener">ابزارهای آنلاین فارسی ابزارینو</a>`;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">ویجت‌های قابل اشتراک‌گذاری</h2>
        </div>
        <p className="text-muted-foreground">
          با قرار دادن این ویجت‌ها در سایت خود، به ابزارینو لینک دهید
        </p>
      </div>

      <Tabs defaultValue="badge" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="badge">نشان</TabsTrigger>
          <TabsTrigger value="button">دکمه</TabsTrigger>
          <TabsTrigger value="text">لینک متنی</TabsTrigger>
        </TabsList>

        <TabsContent value="badge" className="space-y-4">
          <div className="border rounded-lg p-6 bg-muted/30 text-center">
            <a href="https://abzarino.ir" target="_blank" rel="noopener">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                <Code className="h-4 w-4" />
                ساخته شده با ابزارینو
              </div>
            </a>
          </div>
          
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{badgeCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 left-2"
              onClick={() => handleCopy(badgeCode, 'badge')}
            >
              {copied === 'badge' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="button" className="space-y-4">
          <div className="border rounded-lg p-6 bg-muted/30 text-center">
            <a
              href="https://abzarino.ir"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              target="_blank"
              rel="noopener"
            >
              استفاده از ابزارهای ابزارینو
            </a>
          </div>
          
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{buttonCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 left-2"
              onClick={() => handleCopy(buttonCode, 'button')}
            >
              {copied === 'button' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div className="border rounded-lg p-6 bg-muted/30 text-center">
            <a
              href="https://abzarino.ir"
              className="text-primary hover:underline font-medium"
              target="_blank"
              rel="noopener"
            >
              ابزارهای آنلاین فارسی ابزارینو
            </a>
          </div>
          
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{textLinkCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 left-2"
              onClick={() => handleCopy(textLinkCode, 'text')}
            >
              {copied === 'text' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold mb-2">چرا به ابزارینو لینک دهیم؟</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>✓ به کاربران خود ابزارهای رایگان معرفی کنید</li>
          <li>✓ اعتبار سایت خود را با لینک به منابع معتبر افزایش دهید</li>
          <li>✓ از پروژه‌های اپن سورس فارسی حمایت کنید</li>
        </ul>
      </div>
    </div>
  );
};
