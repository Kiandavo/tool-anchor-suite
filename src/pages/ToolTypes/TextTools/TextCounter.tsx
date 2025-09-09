import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

export default function TextCounter() {
  const [text, setText] = useState<string>('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;
      
      // Words: split by whitespace and filter non-empty
      const words = text.trim() ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
      
      // Sentences: split by sentence endings
      const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
      
      // Paragraphs: split by double line breaks
      const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
      
      // Lines: split by line breaks
      const lines = text ? text.split('\n').length : 0;

      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        lines
      });
    };

    calculateStats();
  }, [text]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          شمارش متن
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">متن خود را وارد کنید</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن خود را اینجا بنویسید..."
            className="min-h-[200px]"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.characters.toLocaleString('fa-IR')}</div>
            <div className="text-sm text-muted-foreground">کاراکتر</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces.toLocaleString('fa-IR')}</div>
            <div className="text-sm text-muted-foreground">کاراکتر (بدون فاصله)</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.words.toLocaleString('fa-IR')}</div>
            <div className="text-sm text-muted-foreground">کلمه</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.sentences.toLocaleString('fa-IR')}</div>
            <div className="text-sm text-muted-foreground">جمله</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.paragraphs.toLocaleString('fa-IR')}</div>
            <div className="text-sm text-muted-foreground">پاراگراف</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.lines.toLocaleString('fa-IR')}</div>
            <div className="text-sm text-muted-foreground">خط</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}