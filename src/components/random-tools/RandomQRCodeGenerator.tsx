import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';

export const RandomQRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://example.com');
  const [dataUrl, setDataUrl] = useState<string>('');

  const generate = async () => {
    try {
      const url = await QRCode.toDataURL(text, { margin: 1, width: 256 });
      setDataUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تولید QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="متن یا لینک را وارد کنید" />
        <Button onClick={generate} className="w-full">تولید QR</Button>
        {dataUrl && (
          <div className="flex justify-center">
            <img src={dataUrl} alt="qr code" width={256} height={256} loading="lazy" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
