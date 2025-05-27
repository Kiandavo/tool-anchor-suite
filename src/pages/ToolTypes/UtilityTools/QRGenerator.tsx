
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { QrCode, Download, Copy } from 'lucide-react';

export default function QRGenerator() {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [size, setSize] = useState('256');
  const [errorLevel, setErrorLevel] = useState('M');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) {
      toast.error('لطفاً متن مورد نظر را وارد کنید');
      return;
    }

    try {
      // Simple QR code generation using a public API
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&ecc=${errorLevel}`;
      
      // Create image and convert to data URL for download functionality
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          canvas.width = parseInt(size);
          canvas.height = parseInt(size);
          ctx?.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          setQrDataUrl(dataUrl);
        }
      };
      img.src = apiUrl;
      
      setQrDataUrl(apiUrl);
      toast.success('کد QR تولید شد');
    } catch (error) {
      toast.error('خطا در تولید کد QR');
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) {
      toast.error('ابتدا کد QR را تولید کنید');
      return;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL();
      link.click();
      toast.success('کد QR دانلود شد');
    }
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('متن در کلیپ‌بورد کپی شد');
    } catch (error) {
      toast.error('خطا در کپی کردن');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            تولیدکننده کد QR
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              متن یا لینک:
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="متن، لینک، یا اطلاعات مورد نظر خود را وارد کنید..."
              className="h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                اندازه:
              </label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="128">128x128</SelectItem>
                  <SelectItem value="256">256x256</SelectItem>
                  <SelectItem value="512">512x512</SelectItem>
                  <SelectItem value="1024">1024x1024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                سطح تصحیح خطا:
              </label>
              <Select value={errorLevel} onValueChange={setErrorLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">پایین (L)</SelectItem>
                  <SelectItem value="M">متوسط (M)</SelectItem>
                  <SelectItem value="Q">بالا (Q)</SelectItem>
                  <SelectItem value="H">بسیار بالا (H)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={generateQR} className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              تولید کد QR
            </Button>
            <Button onClick={copyText} variant="outline" className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              کپی متن
            </Button>
          </div>

          {qrDataUrl && (
            <div className="space-y-4">
              <div className="text-center">
                <img 
                  src={qrDataUrl} 
                  alt="QR Code" 
                  className="mx-auto border rounded-lg shadow-sm"
                  style={{ maxWidth: `${Math.min(parseInt(size), 400)}px` }}
                />
              </div>
              
              <div className="flex justify-center">
                <Button onClick={downloadQR} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  دانلود PNG
                </Button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </CardContent>
      </Card>
    </div>
  );
}
