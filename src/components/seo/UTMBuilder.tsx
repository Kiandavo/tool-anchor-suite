import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const UTMBuilder: React.FC = () => {
  const [base, setBase] = useState('https://example.com');
  const [source, setSource] = useState('newsletter');
  const [medium, setMedium] = useState('email');
  const [campaign, setCampaign] = useState('spring');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (source) params.set('utm_source', source);
    if (medium) params.set('utm_medium', medium);
    if (campaign) params.set('utm_campaign', campaign);
    if (term) params.set('utm_term', term);
    if (content) params.set('utm_content', content);
    const sep = base.includes('?') ? '&' : '?';
    return `${base}${params.toString() ? sep + params.toString() : ''}`;
  }, [base, source, medium, campaign, term, content]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>UTM Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Label>Base URL</Label>
        <Input value={base} onChange={(e) => setBase(e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label>utm_source</Label>
            <Input value={source} onChange={(e) => setSource(e.target.value)} />
          </div>
          <div>
            <Label>utm_medium</Label>
            <Input value={medium} onChange={(e) => setMedium(e.target.value)} />
          </div>
          <div>
            <Label>utm_campaign</Label>
            <Input value={campaign} onChange={(e) => setCampaign(e.target.value)} />
          </div>
          <div>
            <Label>utm_term (optional)</Label>
            <Input value={term} onChange={(e) => setTerm(e.target.value)} />
          </div>
          <div>
            <Label>utm_content (optional)</Label>
            <Input value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        </div>
        <div>
          <Label>Result</Label>
          <Textarea readOnly value={url} />
        </div>
      </CardContent>
    </Card>
  );
};
