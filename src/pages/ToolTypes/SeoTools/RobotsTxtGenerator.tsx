import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Bot, Copy, Download } from "lucide-react";
import { toast } from 'sonner';

export default function RobotsTxtGenerator() {
  const [siteUrl, setSiteUrl] = useState<string>('');
  const [allowAll, setAllowAll] = useState<boolean>(true);
  const [disallowPaths, setDisallowPaths] = useState<string>('/admin/\n/private/\n/temp/');
  const [sitemapUrl, setSitemapUrl] = useState<string>('');
  const [crawlDelay, setCrawlDelay] = useState<string>('');
  const [robotsTxt, setRobotsTxt] = useState<string>('');

  const generateRobotsTxt = () => {
    let content = '';
    
    // User-agent directive
    content += 'User-agent: *\n';
    
    // Allow or disallow directives
    if (allowAll) {
      content += 'Allow: /\n';
    } else {
      content += 'Disallow: /\n';
    }
    
    // Specific disallow paths
    if (disallowPaths.trim()) {
      const paths = disallowPaths.trim().split('\n').filter(path => path.trim());
      paths.forEach(path => {
        if (!path.startsWith('/')) path = '/' + path;
        content += `Disallow: ${path.trim()}\n`;
      });
    }
    
    // Crawl delay
    if (crawlDelay && parseInt(crawlDelay) > 0) {
      content += `Crawl-delay: ${crawlDelay}\n`;
    }
    
    content += '\n';
    
    // Sitemap URL
    if (sitemapUrl.trim()) {
      let sitemap = sitemapUrl.trim();
      if (!sitemap.startsWith('http')) {
        sitemap = (siteUrl || 'https://example.com') + (sitemap.startsWith('/') ? '' : '/') + sitemap;
      }
      content += `Sitemap: ${sitemap}\n`;
    } else if (siteUrl.trim()) {
      content += `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml\n`;
    }

    setRobotsTxt(content);
    toast.success('فایل robots.txt تولید شد');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(robotsTxt);
    toast.success('محتوا کپی شد');
  };

  const downloadFile = () => {
    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('فایل دانلود شد');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          تولید فایل Robots.txt
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="siteUrl">آدرس سایت</Label>
          <Input
            id="siteUrl"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox
            id="allowAll"
            checked={allowAll}
            onCheckedChange={(checked) => setAllowAll(checked === true)}
          />
          <Label htmlFor="allowAll">اجازه دسترسی به تمام صفحات</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="disallowPaths">مسیرهای ممنوع (هر خط یک مسیر)</Label>
          <Textarea
            id="disallowPaths"
            value={disallowPaths}
            onChange={(e) => setDisallowPaths(e.target.value)}
            placeholder="/admin/&#10;/private/&#10;/temp/"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sitemapUrl">آدرес Sitemap</Label>
            <Input
              id="sitemapUrl"
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
              placeholder="/sitemap.xml یا آدرس کامل"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="crawlDelay">تاخیر خزش (ثانیه)</Label>
            <Input
              id="crawlDelay"
              type="number"
              min="0"
              value={crawlDelay}
              onChange={(e) => setCrawlDelay(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>

        <Button onClick={generateRobotsTxt} className="w-full" size="lg">
          تولید robots.txt
        </Button>

        {robotsTxt && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>فایل robots.txt تولید شده:</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-1" />
                  کپی
                </Button>
                <Button variant="outline" size="sm" onClick={downloadFile}>
                  <Download className="h-4 w-4 mr-1" />
                  دانلود
                </Button>
              </div>
            </div>
            <Textarea
              value={robotsTxt}
              readOnly
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}