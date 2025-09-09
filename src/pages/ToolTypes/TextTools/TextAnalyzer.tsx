import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, Clock, Eye } from "lucide-react";

export default function TextAnalyzer() {
  const [text, setText] = useState<string>('');

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTime: 0,
        averageWordsPerSentence: 0,
        averageSentencesPerParagraph: 0,
        longestWord: '',
        mostFrequentWords: [],
        readabilityScore: 0
      };
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    
    // Words calculation
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Sentences calculation
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;
    
    // Paragraphs calculation
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length || 1;
    
    // Lines calculation
    const lines = text.split('\n').length;
    
    // Reading time (assuming 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);
    
    // Average calculations
    const averageWordsPerSentence = sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;
    const averageSentencesPerParagraph = paragraphCount > 0 ? Math.round((sentenceCount / paragraphCount) * 10) / 10 : 0;
    
    // Find longest word
    const longestWord = words.reduce((longest, current) => 
      current.length > longest.length ? current : longest, '');
    
    // Most frequent words (excluding common Persian stop words)
    const stopWords = ['و', 'در', 'از', 'به', 'که', 'با', 'این', 'آن', 'را', 'است', 'برای', 'تا', 'یا', 'اما', 'اگر'];
    const wordFrequency: {[key: string]: number} = {};
    
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z]/g, '');
      if (cleanWord.length > 2 && !stopWords.includes(cleanWord)) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      }
    });
    
    const mostFrequentWords = Object.entries(wordFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));
    
    // Simple readability score (based on sentence length and word complexity)
    const averageWordLength = words.reduce((sum, word) => sum + word.length, 0) / wordCount || 0;
    const readabilityScore = Math.max(0, Math.min(100, 
      100 - (averageWordsPerSentence * 2) - (averageWordLength * 3)
    ));

    return {
      characters,
      charactersNoSpaces,
      words: wordCount,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      lines,
      readingTime,
      averageWordsPerSentence,
      averageSentencesPerParagraph,
      longestWord,
      mostFrequentWords,
      readabilityScore: Math.round(readabilityScore)
    };
  }, [text]);

  const getReadabilityLevel = (score: number) => {
    if (score >= 80) return { level: 'بسیار آسان', color: 'bg-green-500' };
    if (score >= 60) return { level: 'آسان', color: 'bg-blue-500' };
    if (score >= 40) return { level: 'متوسط', color: 'bg-yellow-500' };
    if (score >= 20) return { level: 'سخت', color: 'bg-orange-500' };
    return { level: 'بسیار سخت', color: 'bg-red-500' };
  };

  const readability = getReadabilityLevel(analysis.readabilityScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          تحلیل‌گر متن
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">متن خود را وارد کنید</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن خود را اینجا بنویسید تا آمار کاملی از آن دریافت کنید..."
            className="min-h-[200px]"
          />
        </div>
        
        {text.trim() && (
          <>
            {/* Basic Statistics */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">آمار پایه</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysis.characters.toLocaleString('fa-IR')}</div>
                  <div className="text-sm text-muted-foreground">کاراکتر</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysis.charactersNoSpaces.toLocaleString('fa-IR')}</div>
                  <div className="text-sm text-muted-foreground">بدون فاصله</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysis.words.toLocaleString('fa-IR')}</div>
                  <div className="text-sm text-muted-foreground">کلمه</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysis.sentences.toLocaleString('fa-IR')}</div>
                  <div className="text-sm text-muted-foreground">جمله</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysis.paragraphs.toLocaleString('fa-IR')}</div>
                  <div className="text-sm text-muted-foreground">پاراگراف</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysis.lines.toLocaleString('fa-IR')}</div>
                  <div className="text-sm text-muted-foreground">خط</div>
                </div>
              </div>
            </div>

            {/* Advanced Analysis */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">تحلیل پیشرفته</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">زمان مطالعه</span>
                  </div>
                  <div className="text-xl font-bold">{analysis.readingTime} دقیقه</div>
                  <div className="text-sm text-muted-foreground">بر اساس ۲۰۰ کلمه در دقیقه</div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-medium">میانگین کلمات هر جمله</span>
                  </div>
                  <div className="text-xl font-bold">{analysis.averageWordsPerSentence}</div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <span className="font-medium">خوانایی</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold">{analysis.readabilityScore}%</div>
                    <Badge className={readability.color + ' text-white'}>
                      {readability.level}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Word Analysis */}
            {analysis.longestWord && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">تحلیل کلمات</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <span className="font-medium">طولانی‌ترین کلمه: </span>
                    <Badge variant="secondary" className="text-lg">
                      {analysis.longestWord} ({analysis.longestWord.length} حرف)
                    </Badge>
                  </div>
                  
                  {analysis.mostFrequentWords.length > 0 && (
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="font-medium mb-2">پرتکرارترین کلمات:</div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.mostFrequentWords.map(({ word, count }, index) => (
                          <Badge key={index} variant="outline">
                            {word} ({count})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}