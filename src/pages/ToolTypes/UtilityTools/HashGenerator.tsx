
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Hash, Copy, AlertTriangle } from 'lucide-react';

// Input sanitization function
const sanitizeInput = (input: string): string => {
  // Remove potentially dangerous characters while preserving Persian/Arabic text
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+\s*=/gi, '');
};

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashType, setHashType] = useState('sha256'); // Default to more secure SHA-256
  const [output, setOutput] = useState('');

  const generateHash = async () => {
    const sanitizedInput = sanitizeInput(input.trim());
    
    if (!sanitizedInput) {
      toast.error('لطفاً متن مورد نظر را وارد کنید');
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(sanitizedInput);
      
      let hashBuffer: ArrayBuffer;
      
      switch (hashType) {
        case 'sha1':
          hashBuffer = await crypto.subtle.digest('SHA-1', data);
          break;
        case 'sha256':
          hashBuffer = await crypto.subtle.digest('SHA-256', data);
          break;
        case 'sha384':
          hashBuffer = await crypto.subtle.digest('SHA-384', data);
          break;
        case 'sha512':
          hashBuffer = await crypto.subtle.digest('SHA-512', data);
          break;
        case 'md5':
          // Show warning for MD5 usage
          toast.error('MD5 دیگر امن نیست. لطفاً از SHA-256 یا بالاتر استفاده کنید');
          return;
        default:
          toast.error('نوع هش پشتیبانی نمی‌شود');
          return;
      }

      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOutput(hashHex);
      toast.success('هش تولید شد');
    } catch (error) {
      console.error('Hash generation error:', error);
      toast.error('خطا در تولید هش');
    }
  };

  const copyToClipboard = async () => {
    if (!output) {
      toast.error('هیچ خروجی برای کپی وجود ندارد');
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      toast.success('در کلیپ‌بورد کپی شد');
    } catch (error) {
      console.error('Copy error:', error);
      toast.error('خطا در کپی کردن');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    toast.success('همه فیلدها پاک شدند');
  };

  const handleInputChange = (value: string) => {
    // Limit input length for security
    if (value.length > 10000) {
      toast.error('متن ورودی خیلی طولانی است (حداکثر ۱۰۰۰۰ کاراکتر)');
      return;
    }
    setInput(value);
  };

  return (
    <div className="space-y-6">
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>نکته امنیتی:</strong> از الگوریتم‌های SHA-256 یا بالاتر برای کاربردهای امنیتی استفاده کنید. 
          MD5 و SHA-1 دیگر امن محسوب نمی‌شوند.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            تولیدکننده هش امن
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              متن ورودی (حداکثر ۱۰۰۰۰ کاراکتر):
            </label>
            <Textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="متن مورد نظر خود را وارد کنید..."
              className="h-32"
              maxLength={10000}
            />
            <p className="text-xs text-gray-500 mt-1">
              {input.length}/10000 کاراکتر
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              نوع هش:
            </label>
            <Select value={hashType} onValueChange={setHashType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sha256">SHA-256 (توصیه شده)</SelectItem>
                <SelectItem value="sha384">SHA-384</SelectItem>
                <SelectItem value="sha512">SHA-512</SelectItem>
                <SelectItem value="sha1">SHA-1 (غیر امن)</SelectItem>
              </SelectContent>
            </Select>
            {(hashType === 'sha1') && (
              <p className="text-xs text-amber-600 mt-1">
                ⚠️ SHA-1 دیگر امن نیست و برای کاربردهای امنیتی توصیه نمی‌شود
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={generateHash} className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              تولید هش
            </Button>
            <Button onClick={clearAll} variant="outline">
              پاک کردن
            </Button>
          </div>

          {output && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">
                  خروجی هش ({hashType.toUpperCase()}):
                </label>
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-1" />
                  کپی
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                className="h-20 font-mono text-sm bg-gray-50"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
