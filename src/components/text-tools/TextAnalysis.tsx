
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TextAnalysisProps {
  text: string;
}

interface TextStats {
  wordCount: number;
  charCount: number;
  charCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number;
}

export const TextAnalysis: React.FC<TextAnalysisProps> = ({ text }) => {
  const [stats, setStats] = useState<TextStats>({
    wordCount: 0,
    charCount: 0,
    charCountNoSpaces: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    readingTime: 0,
  });

  useEffect(() => {
    if (!text) {
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
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s+/g, '').length;
    
    // Count sentences by splitting on .!?
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
    
    // Count paragraphs by splitting on double newlines
    const paragraphCount = text.split(/\n\s*\n/).filter(Boolean).length || 1;
    
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
  }, [text]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحلیل متن</CardTitle>
        <CardDescription>آمار و تحلیل متن شما</CardDescription>
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
  );
};
