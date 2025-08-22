import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Globe, History } from 'lucide-react';

interface WordEtymology {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  origin: string;
  etymology: string;
  relatedWords: string[];
  examples: string[];
  cognates: { language: string; word: string; meaning: string }[];
}

const persianWords: WordEtymology[] = [
  {
    id: 'doost',
    word: 'دوست',
    pronunciation: 'doost',
    meaning: 'friend, beloved',
    origin: 'Middle Persian',
    etymology: 'از پهلوی میانه "دوست" که از ریشه هند و اروپایی *priyó- به معنی "محبوب" آمده است.',
    relatedWords: ['دوستی', 'دوستدار', 'دوستانه'],
    examples: ['دوست صمیمی', 'دوستی قدیمی', 'دوست داشتن'],
    cognates: [
      { language: 'Sanskrit', word: 'priya', meaning: 'beloved' },
      { language: 'Avestan', word: 'friia', meaning: 'dear' }
    ]
  },
  {
    id: 'mehr',
    word: 'مهر',
    pronunciation: 'mehr',
    meaning: 'love, sun, seal',
    origin: 'Old Persian',
    etymology: 'از فارسی باستان "مترا" (Mithra) نام خدای خورشید و پیمان در آیین زرتشتی.',
    relatedWords: ['مهربان', 'مهربانی', 'مهرگان'],
    examples: ['مهر مادری', 'مهر و محبت', 'مهرگان جشن'],
    cognates: [
      { language: 'Sanskrit', word: 'mitra', meaning: 'friend, sun god' },
      { language: 'Latin', word: 'Mithras', meaning: 'sun god' }
    ]
  },
  {
    id: 'khoda',
    word: 'خدا',
    pronunciation: 'khoda',
    meaning: 'God',
    origin: 'Middle Persian',
    etymology: 'از پهلوی میانه "خودای" که از "خود" (self) + پسوند "ای" ساخته شده است.',
    relatedWords: ['خدایی', 'خداوند', 'خدانشناس'],
    examples: ['خدای بزرگ', 'خداوند متعال', 'خدا حافظ'],
    cognates: [
      { language: 'Kurdish', word: 'xweda', meaning: 'God' },
      { language: 'Baluchi', word: 'huda', meaning: 'God' }
    ]
  }
];

export function WordEtymologyEnhanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState<WordEtymology | null>(null);

  const filteredWords = persianWords.filter(word =>
    word.word.includes(searchTerm) ||
    word.pronunciation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="gradient-persian text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Globe size={28} />
            ریشه‌شناسی واژگان فارسی
          </CardTitle>
          <p className="text-white/90">
            کاوش در تاریخ و منشأ واژگان زبان فارسی
          </p>
        </CardHeader>
      </Card>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          placeholder="جستجو در واژگان..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWords.map((word) => (
          <Card key={word.id} className="hover-lift cursor-pointer" onClick={() => setSelectedWord(word)}>
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">{word.word}</h3>
                <p className="text-sm text-muted-foreground">/{word.pronunciation}/</p>
              </div>
              <div>
                <Badge variant="secondary">{word.origin}</Badge>
              </div>
              <p className="text-sm font-medium">{word.meaning}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{word.etymology}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedWord && (
        <Card className="neo-glass">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{selectedWord.word}</CardTitle>
                <p className="text-muted-foreground">/{selectedWord.pronunciation}/</p>
              </div>
              <button onClick={() => setSelectedWord(null)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen size={16} />
                  معنی
                </h4>
                <p>{selectedWord.meaning}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <History size={16} />
                  منشأ
                </h4>
                <Badge variant="outline">{selectedWord.origin}</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">ریشه‌شناسی</h4>
              <p className="text-muted-foreground leading-relaxed">{selectedWord.etymology}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">واژگان مرتبط</h4>
              <div className="flex flex-wrap gap-2">
                {selectedWord.relatedWords.map((relatedWord, index) => (
                  <Badge key={index} variant="secondary">{relatedWord}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">نمونه‌های کاربرد</h4>
              <div className="space-y-2">
                {selectedWord.examples.map((example, index) => (
                  <div key={index} className="bg-muted/30 p-3 rounded-lg">
                    <p className="font-medium">{example}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedWord.cognates.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">همخانواده‌ها در زبان‌های دیگر</h4>
                <div className="space-y-2">
                  {selectedWord.cognates.map((cognate, index) => (
                    <div key={index} className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
                      <span className="font-medium">{cognate.language}: {cognate.word}</span>
                      <span className="text-sm text-muted-foreground">{cognate.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}