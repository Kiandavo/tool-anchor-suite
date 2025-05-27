
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Copy, Download, FileJson } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState(true);

  const formatJson = () => {
    if (!input.trim()) {
      toast.error('لطفاً متن JSON را وارد کنید');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
      toast.success('JSON با موفقیت فرمت شد');
    } catch (error) {
      setIsValid(false);
      toast.error('فرمت JSON نامعتبر است');
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      toast.error('لطفاً متن JSON را وارد کنید');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      toast.success('JSON فشرده شد');
    } catch (error) {
      setIsValid(false);
      toast.error('فرمت JSON نامعتبر است');
    }
  };

  const validateJson = () => {
    if (!input.trim()) {
      toast.error('لطفاً متن JSON را وارد کنید');
      return;
    }

    try {
      JSON.parse(input);
      setIsValid(true);
      toast.success('JSON معتبر است');
    } catch (error) {
      setIsValid(false);
      toast.error('JSON نامعتبر است: ' + (error as Error).message);
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
      toast.error('خطا در کپی کردن');
    }
  };

  const downloadJson = () => {
    if (!output) {
      toast.error('هیچ خروجی برای دانلود وجود ندارد');
      return;
    }

    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('فایل دانلود شد');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            فرمت‌کننده JSON
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              JSON ورودی:
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "مثال", "value": 123}'
              className="h-40 font-mono text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={formatJson} className="flex items-center gap-2">
              فرمت کردن
            </Button>
            <Button onClick={minifyJson} variant="outline" className="flex items-center gap-2">
              فشرده کردن
            </Button>
            <Button onClick={validateJson} variant="outline" className="flex items-center gap-2">
              اعتبارسنجی
            </Button>
          </div>

          {output && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">
                  JSON خروجی:
                </label>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-1" />
                    کپی
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadJson}>
                    <Download className="h-4 w-4 mr-1" />
                    دانلود
                  </Button>
                </div>
              </div>
              <Textarea
                value={output}
                readOnly
                className={`h-40 font-mono text-sm ${isValid ? 'border-green-300' : 'border-red-300'}`}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
