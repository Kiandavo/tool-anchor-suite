import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const OGTagGenerator: React.FC = () => {
  const [title, setTitle] = useState('Page Title');
  const [description, setDescription] = useState('A short description for social sharing.');
  const [url, setUrl] = useState('https://example.com');
  const [image, setImage] = useState('https://example.com/og.jpg');

  const tags = useMemo(() => (
`<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${description}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:image" content="${image}" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${title}" />\n<meta name="twitter:description" content="${description}" />\n<meta name="twitter:image" content="${image}" />`
  ), [title, description, url, image]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Open Graph / Social Tags</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>URL</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Image URL</Label>
            <Input value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
        </div>
        <div>
          <Label>Generated tags</Label>
          <Textarea readOnly value={tags} />
        </div>
      </CardContent>
    </Card>
  );
};
