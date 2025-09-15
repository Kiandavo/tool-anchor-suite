
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextAnalysisProps {
  text?: string;
}

interface TextStats {
  wordCount: number;
  charCount: number;
  charCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number;
}

export const TextAnalysis: React.FC<TextAnalysisProps> = ({ text: initialText }) => {
  const [inputText, setInputText] = useState(initialText || "");
  const [stats, setStats] = useState<TextStats>({
    wordCount: 0,
    charCount: 0,
    charCountNoSpaces: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    readingTime: 0,
  });

  useEffect(() => {
    if (!inputText) {
      setStats({
        wordCount: 0,
        charCount: 0,
        charCountNoSpaces: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        readingTime: 0,
      });
      return;
    }

    // Calculate stats
    const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const charCount = inputText.length;
    const charCountNoSpaces = inputText.replace(/\s+/g, '').length;
    
    // Count sentences by splitting on .!?
    const sentenceCount = inputText.split(/[.!?]+/).filter(Boolean).length;
    
    // Count paragraphs by splitting on double newlines
    const paragraphCount = inputText.split(/\n\s*\n/).filter(Boolean).length || 1;
    
    // Reading time (average reading speed: 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);

    setStats({
      wordCount,
      charCount,
      charCountNoSpaces,
      sentenceCount,
      paragraphCount,
      readingTime,
    });
  }, [inputText]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>تحلیل متن</CardTitle>
          <CardDescription>متن خود را وارد کنید تا آمار کاملی از آن دریافت کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">متن خود را وارد کنید</Label>
              <Textarea
                id="text-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="متن خود را اینجا بنویسید..."
                className="min-h-[120px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>آمار و تحلیل</CardTitle>
          <CardDescription>نتایج تحلیل متن شما</CardDescription>
        </CardHeader>
        <CardContent>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.wordCount}</div>
            <div className="text-sm text-muted-foreground">تعداد کلمات</div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.charCount}</div>
            <div className="text-sm text-muted-foreground">تعداد کاراکترها</div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.charCountNoSpaces}</div>
            <div className="text-sm text-muted-foreground">بدون فاصله</div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.sentenceCount}</div>
            <div className="text-sm text-muted-foreground">تعداد جمله‌ها</div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.paragraphCount}</div>
            <div className="text-sm text-muted-foreground">تعداد پاراگراف‌ها</div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.readingTime}</div>
            <div className="text-sm text-muted-foreground">زمان مطالعه (دقیقه)</div>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  );
};
