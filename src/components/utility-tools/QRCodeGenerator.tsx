import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Download, QrCode } from "lucide-react";
import QRCode from 'qrcode';

export const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [size, setSize] = useState<string>('256');
  const [format, setFormat] = useState<'png' | 'svg'>('png');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text.trim()) {
      toast.error('لطفاً متن یا URL وارد کنید');
      return;
    }

    try {
      const qrSize = parseInt(size);
      
      if (format === 'png') {
        const url = await QRCode.toDataURL(text, {
          width: qrSize,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(url);
      } else {
        const svgString = await QRCode.toString(text, {
          type: 'svg',
          width: qrSize,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        setQrCodeUrl(url);
      }
      
      toast.success('QR Code تولید شد');
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('خطا در تولید QR Code');
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) {
      toast.error('ابتدا QR Code تولید کنید');
      return;
    }

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR Code دانلود شد');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          تولید کننده QR Code
        </CardTitle>
        <CardDescription>
          QR Code برای متن، URL و محتوای دیگر تولید کنید
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">متن یا URL</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن، URL یا هر محتوای دیگری که می‌خواهید به QR Code تبدیل کنید..."
            rows={4}
            maxLength={2000}
          />
          <div className="text-xs text-muted-foreground">
            {text.length}/2000 کاراکتر
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>اندازه</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="128">128x128 پیکسل</SelectItem>
                <SelectItem value="256">256x256 پیکسل</SelectItem>
                <SelectItem value="512">512x512 پیکسل</SelectItem>
                <SelectItem value="1024">1024x1024 پیکسل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>فرمت</Label>
            <Select value={format} onValueChange={(value: 'png' | 'svg') => setFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="svg">SVG</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generateQRCode} className="w-full" disabled={!text.trim()}>
          <QrCode className="w-4 h-4 mr-2" />
          تولید QR Code
        </Button>

        {qrCodeUrl && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg border">
                {format === 'png' ? (
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="max-w-full h-auto"
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: qrCodeUrl }}
                    className="flex justify-center"
                  />
                )}
              </div>
            </div>

            <Button onClick={downloadQRCode} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              دانلود {format.toUpperCase()}
            </Button>

            <div className="text-sm text-muted-foreground text-center">
              فرمت: {format.toUpperCase()} | اندازه: {size}x{size} پیکسل
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
};