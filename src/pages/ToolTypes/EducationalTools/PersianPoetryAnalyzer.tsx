import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Wand2, FileText } from "lucide-react";
import { detectMeter, detectLiteraryDevices, detectPoetryForm } from '@/data/persian-poetry-meters';

const PersianPoetryAnalyzer = () => {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePoetry = () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const words = text.split(/\s+/);
      const lines = text.split('\n').filter(line => line.trim());
      
      // Basic rhythm analysis
      const rhythmPattern = lines.map(line => {
        const syllables = line.replace(/[^\u0600-\u06FF\s]/g, '').split(/\s+/).length * 2; // Rough estimate
        return syllables;
      });
      
      // Detect common Persian poetry meters
      const detectMeter = () => {
        const avgSyllables = rhythmPattern.reduce((a, b) => a + b, 0) / rhythmPattern.length;
        if (avgSyllables >= 10 && avgSyllables <= 12) return "بحر هزج مثمن محذوف";
        if (avgSyllables >= 12 && avgSyllables <= 14) return "بحر رمل مثمن محذوف";
        if (avgSyllables >= 8 && avgSyllables <= 10) return "بحر متقارب مثمن محذوف";
        return "بحر نامشخص";
      };

      // Find rhyme scheme
      const findRhyme = () => {
        const endings = lines.map(line => {
          const words = line.trim().split(/\s+/);
          return words[words.length - 1]?.slice(-2) || '';
        });
        
        const uniqueEndings = [...new Set(endings)];
        return uniqueEndings.length <= 2 ? "قافیه موزون" : "قافیه آزاد";
      };

      // Detect literary devices
      const findLiteraryDevices = () => {
        const devices = [];
        if (text.includes('مثل') || text.includes('چون')) devices.push('تشبیه');
        if (text.includes('گل') && text.includes('بلبل')) devices.push('استعاره');
        if (/(.)\1/.test(text)) devices.push('جناس');
        if (words.length > 20) devices.push('اطناب');
        return devices;
      };

      setAnalysis({
        meter: detectMeter(),
        rhyme: findRhyme(),
        lineCount: lines.length,
        wordCount: words.length,
        rhythmPattern,
        literaryDevices: findLiteraryDevices(),
        structure: lines.length === 2 ? "بیت" : lines.length === 4 ? "رباعی" : lines.length > 4 ? "غزل یا قصیده" : "نامشخص"
      });
      
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            تحلیل‌گر شعر فارسی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            متن شعر فارسی خود را وارد کنید تا وزن، قافیه و آرایه‌های ادبی آن تحلیل شود.
          </p>
          
          <div className="space-y-4">
            <Textarea
              placeholder="شعر فارسی خود را اینجا وارد کنید..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[150px] text-right"
              dir="rtl"
            />
            
            <Button 
              onClick={analyzePoetry} 
              disabled={!text.trim() || isAnalyzing}
              className="w-full"
            >
              <Wand2 className="w-4 h-4 ml-2" />
              {isAnalyzing ? "در حال تحلیل..." : "تحلیل شعر"}
            </Button>
          </div>

          {analysis && (
            <div className="mt-6 space-y-4 p-4 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4" />
                نتایج تحلیل
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><strong>بحر:</strong> {analysis.meter}</p>
                  <p><strong>قافیه:</strong> {analysis.rhyme}</p>
                  <p><strong>ساختار:</strong> {analysis.structure}</p>
                </div>
                <div className="space-y-2">
                  <p><strong>تعداد بیت:</strong> {analysis.lineCount}</p>
                  <p><strong>تعداد کلمه:</strong> {analysis.wordCount}</p>
                  <p><strong>الگوی آهنگ:</strong> {analysis.rhythmPattern.join('-')}</p>
                </div>
              </div>

              {analysis.literaryDevices.length > 0 && (
                <div>
                  <p className="font-medium mb-2">آرایه‌های ادبی یافت شده:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.literaryDevices.map((device: string, index: number) => (
                      <Badge key={index} variant="secondary">{device}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PersianPoetryAnalyzer;