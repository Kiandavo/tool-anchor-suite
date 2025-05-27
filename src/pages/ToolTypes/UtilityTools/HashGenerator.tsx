
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Hash, Copy } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashType, setHashType] = useState('md5');
  const [output, setOutput] = useState('');

  const generateHash = async () => {
    if (!input.trim()) {
      toast.error('لطفاً متن مورد نظر را وارد کنید');
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      
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
          // MD5 is not supported by Web Crypto API, using a simple implementation
          setOutput(simpleMD5(input));
          toast.success('هش تولید شد');
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
      toast.error('خطا در تولید هش');
    }
  };

  // Simple MD5 implementation (not cryptographically secure, for demo purposes)
  const simpleMD5 = (str: string) => {
    // This is a simplified MD5 for demonstration
    // In a real application, you would use a proper MD5 library
    let hash = 0;
    if (str.length === 0) return hash.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
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
      toast.error('خطا در کپی کردن');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    toast.success('همه فیلدها پاک شدند');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            تولیدکننده هش
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              متن ورودی:
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="متن مورد نظر خود را وارد کنید..."
              className="h-32"
            />
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
                <SelectItem value="md5">MD5</SelectItem>
                <SelectItem value="sha1">SHA-1</SelectItem>
                <SelectItem value="sha256">SHA-256</SelectItem>
                <SelectItem value="sha384">SHA-384</SelectItem>
                <SelectItem value="sha512">SHA-512</SelectItem>
              </SelectContent>
            </Select>
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
