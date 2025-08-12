import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function buildSitemap(urls: string[]): string {
  const items = urls.map(u => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
}

export const SitemapGenerator: React.FC = () => {
  const [base, setBase] = useState('https://example.com');
  const [paths, setPaths] = useState<string>('/\n/about\n/tools');
  const urls = useMemo(() => paths.split(/\r?\n/).map(p => p.trim()).filter(Boolean).map(p => p.startsWith('http') ? p : `${base.replace(/\/$/, '')}${p.startsWith('/') ? '' : '/'}${p}`), [base, paths]);
  const xml = useMemo(() => buildSitemap(urls), [urls]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>XML Sitemap Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Label>Base URL</Label>
        <Input value={base} onChange={(e) => setBase(e.target.value)} />
        <Label>Paths (one per line)</Label>
        <Textarea value={paths} onChange={(e) => setPaths(e.target.value)} />
        <Label>Result</Label>
        <Textarea readOnly value={xml} className="font-mono" />
      </CardContent>
    </Card>
  );
};
