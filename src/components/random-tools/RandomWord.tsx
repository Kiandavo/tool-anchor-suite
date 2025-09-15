
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Dices, Copy, Shuffle } from 'lucide-react';
import { generateRandomWord, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomWord() {
  const [word, setWord] = useState<string>('');
  const [language, setLanguage] = useState<string>('mixed');

  const handleGenerateWord = () => {
    const newWord = generateRandomWord();
    setWord(newWord);
    toast.success("کلمه تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Dices className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">تولید کلمه تصادفی</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">نوع کلمات:</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mixed">ترکیبی (فارسی و انگلیسی)</SelectItem>
                <SelectItem value="persian">فقط فارسی</SelectItem>
                <SelectItem value="english">فقط انگلیسی</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerateWord} className="w-full" size="lg">
            <Shuffle className="ml-2 h-4 w-4" />
            تولید کلمه جدید
          </Button>

          {word && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-semibold text-primary">{word}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(word)}
                >
                  <Copy className="ml-1 h-4 w-4" />
                  کپی
                </Button>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground text-center">
            شامل بیش از ۱۰۰ کلمه زیبا از طبیعت، احساسات، ادبیات و فرهنگ فارسی و انگلیسی
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
